<template>
    <div>
        <Row>
            <Col class="box_card">
                <a href="javascript:void(0);" v-on:click="goback()"><Icon type="arrow-return-left"></Icon>返回上级</a>
                <div style="height:1px;background-color: rgba(116, 116, 116, 0.63);margin-top: 10px;"></div>
            </Col>
        </Row>
        <Row class="box_card">
            <Col span="4">当前投诉总数：<Tag color="green"><CountTo :endVal="1025564"/> </Tag></Col>
            <Col span="3">未处理：<Tag color="blue"><CountTo :endVal="900064"/> </Tag></Col>
            <Col span="3">处理中：<Tag color="red"><CountTo :endVal="25560"/> </Tag></Col>
            <Col span="2">完成：<Tag color="yellow"><CountTo :endVal="100000"/> </Tag></Col>
        </Row>
        <Row class="box_card">
            <Col span="3" style="padding-right:10px">
                <Input placeholder="输入流水单号" ref="no"></Input>
            </Col>
            <Col span="3" style="padding-right:10px;width:200px">
                <Select placeholder="选择公司" ref="company">
                    <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" style="padding-right:10px">
                <Select placeholder="选择处理状态" ref="status">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" style="padding-right:10px">
                <Select placeholder="选择区域" ref="area">
                    <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" style="padding-right:10px">
                <Button type="primary" icon="ios-search" @click="get_data">查询</Button>
            </Col>
        </Row>
        <Row class="box_card">
            <Table stripe :columns="latest_complaint_column" :data="latest_complaint"></Table>
        </Row>
        <Row class="box_card">
            <Page :total="pageCount" :current="pageCurrent" :page-size="pageSize" size="small" show-total show-elevator @on-change="get_data"></Page>
        </Row>
    </div>
</template>
<script>
import CountTo from "../components/CountTo.vue";
import complaint_more_modal from "./complaint_more_modal.vue";
export default {
  components: {
    CountTo,
    complaint_more_modal
  },
  data() {
    return {
      pageSize: 10,
      pageCount: 100,
      pageCurrent: 1,
      companyList: [],
      statusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "未处理",
          label: "未处理"
        },
        {
          value: "处理中",
          label: "处理中"
        },
        {
          value: "完成",
          label: "完成"
        }
      ],
      areaList: [],
      latest_complaint: [],
      latest_complaint_column: [
        { title: "流水单号", key: "complaintNo" },
        { title: "公司", key: "company" },
        { title: "区域", key: "area" },
        { title: "时间", key: "time" },
        {
          title: "状态",
          align: "center",
          render: (h, params) => {
            let type = "error";
            if (params.row.status && params.row.status == "处理中") {
              type = "warning";
            }
            if (params.row.status && params.row.status == "完成") {
              type = "success";
            }
            return h(
              "Button",
              {
                props: {
                  type: type,
                  size: "small",
                  shape: "circle"
                }
              },
              params.row.status
            );
          }
        },
        {
          title: "详情",
          align: "center",
          render: (h, params) => {
            let type = "info";
            return h(
              "Button",
              {
                props: {
                  type: type
                },
                on: {
                  click: () => {
                    this.$Modal.info({
                      title: "投诉详情",
                      width: "500px",
                      okText: "关闭",
                      onOk: () => {},
                      render: h => {
                        return h(complaint_more_modal, {
                          props: {
                            prop_value: params.row
                          }
                        });
                      }
                    });
                  }
                }
              },
              "查看详情"
            );
          }
        }
      ]
    };
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    },
    get_company_date: function() {
      var d = this;
      this.$ajax({
        method: "post",
        url: this.$uri + "mapInterface/getCompanyData"
      })
        .then(function(res) {
          res.data.rows.splice(0, 0, { value: "", label: "所有" });
          d.$data.companyList = res.data.rows;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    get_area_date: function(e) {
      var d = this;
      var parentId = "6941139967a311e8a93e1843420641b8";
      if (e) parentId = e;
      let params = new URLSearchParams();
      params.append("parentId", parentId);
      this.$ajax({
        method: "post",
        url: this.$uri + "mapInterface/getAreaData",
        data: params
      })
        .then(function(res) {
          res.data.rows.splice(0, 0, {
            value: "",
            label: "成都市"
          });
          d.$data.areaList = res.data.rows;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    get_data: function(e) {
      var d = this;
      let params = new URLSearchParams();
      if (e && parseInt(e)) {
        var pagenum = parseInt(e);
        if (pagenum) params.append("pagenum", pagenum);
      }
      let id = this.$refs.no.currentValue;
      let company = this.$refs.company.publicValue;
      let status = this.$refs.status.publicValue;
      let area = this.$refs.area.publicValue;
      var param = {};
      if (id != "" && id) param.id = id;
      if (company != "" && company) param.company = company;
      if (status != "" && status) param.status = status;
      if (area != "" && area) param.area = area;
      params.append("param", JSON.stringify(param));
      this.$ajax({
        method: "post",
        url: this.$uri + "mapInterface/getComplaintList",
        data: params
      })
        .then(function(res) {
          d.$data.latest_complaint = res.data.rows;
          d.$data.pageCount = res.data.total;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted: function() {
    this.get_company_date();
    this.get_area_date();
    this.get_data();
  }
};
</script>
<style scoped>
.box_card {
  padding: 15px;
}
.line {
  height: 1px;
  background-color: rgba(116, 116, 116, 0.63);
}
</style>
