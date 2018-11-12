<template>
    <div>
        <Row class="box_card">
            <Col span="3">投放总数：<Tag color="green" ><CountTo :endVal="1025564"/> </Tag></Col>
            <Col span="2">正常：<Tag color="blue"><CountTo :endVal="900064"/> </Tag></Col>
            <Col span="2">报废：<Tag color="red"><CountTo :endVal="25560"/> </Tag></Col>
            <Col span="2">维修：<Tag color="yellow"><CountTo :endVal="100000"/> </Tag></Col>
        </Row>
        <Row class="box_card">
            <Col span="3" style="padding-right:10px">
                <Input placeholder="输入编号" ref="no"></Input>
            </Col>
            <Col span="3" style="padding-right:10px;width:200px" >
                <Select placeholder="选择公司" ref="company" >
                    <Option v-for="item in companyList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" style="padding-right:10px">
                <Select placeholder="选择单车状态" ref="status">
                    <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="3" style="padding-right:10px">
                <Select placeholder="选择区域" ref="area">
                    <Option v-for="item in areaList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="4" style="padding-right:10px">
                <Button type="primary" icon="ios-search" @click="get_bike_data">查询</Button>
            </Col>
        </Row>
        <Row class="box_card">
            <Col span="24">
                <Table stripe :columns="bike_colunm" :data="bike_data"></Table>
            </Col>
        </Row>
        <Row class="box_card">
            <Page :total="pageCount" :current="pageCurrent" :page-size="pageSize" size="small" show-total show-elevator @on-change="get_bike_data"></Page>
        </Row>
    </div>
</template>
<script>
import CountTo from "../components/CountTo.vue";

export default {
  components: {
    CountTo
  },
  data() {
    return {
      pageSize: 10,
      pageCount: 100,
      pageCurrent: 1,
      companyList: [
        {
          value: "",
          label: "所有"
        },
        {
          value: "ofo",
          label: "ofo"
        },
        {
          value: "摩拜",
          label: "摩拜"
        }
      ],
      statusList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "正常",
          label: "正常"
        },
        {
          value: "维修",
          label: "维修"
        },
        {
          value: "报废",
          label: "报废"
        }
      ],
      areaList: [],
      bike_colunm: [
        {
          title: "车辆编号",
          key: "bikeNumber"
        },
        {
          title: "公司",
          key: "company"
        },
        {
          title: "区域",
          key: "area"
        },
        {
          title: "投放时间",
          key: "start_time"
        },
        {
          title: "维修时间",
          key: "check_time"
        },
        {
          title: "报废时间",
          key: "end_time"
        },
        {
          title: "车辆状态",
          align: "center",
          render: (h, params) => {
            let type = "info";
            if (params.row.status && params.row.status == "维修") {
              type = "warning";
            }
            if (params.row.status && params.row.status == "报废") {
              type = "error";
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
          title: "里程",
          key: "mileage"
        }
      ],
      bike_data: []
    };
  },
  methods: {
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
    get_bike_data: function(e) {
      let params = new URLSearchParams();
      if (e) {
        var pagenum = parseInt(e);
        if (pagenum) params.append("pagenum", pagenum);
      }
      let bikeNumber = this.$refs.no.currentValue;
      let company = this.$refs.company.publicValue;
      let status = this.$refs.status.publicValue;
      let area = this.$refs.area.publicValue;
      var param = {};
      if (bikeNumber != "" && bikeNumber) param.bikeNumber = bikeNumber;
      if (company != "" && company) param.company = company;
      if (status != "" && status) param.status = status;
      if (area != "" && area) param.area = area;
      params.append("param", JSON.stringify(param));
      var d = this;
      this.$ajax({
        method: "post",
        url: this.$uri + "mapInterface/getBikeListByPage",
        data: params
      })
        .then(function(res) {
          d.$data.bike_data = res.data.rows;
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
    this.get_bike_data();
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
