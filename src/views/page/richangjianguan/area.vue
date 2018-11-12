<template>
    <div>
        <Row class="box_card">
            <Col span="3" style="padding-right:10px">
                <Input placeholder="查询条件"></Input>
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
            <Card>
                <p slot="title">
                    <Icon type="code-working"></Icon>
                    区域列表
                </p>
                <a href="javascript:void(0);" slot="extra"  v-on:click="add_area()">
                    <Icon type="ios-plus-empty"></Icon>
                    新增区域
                </a>
                <Table stripe :columns="areas_column" :data="areas"></Table>
            </Card>
            
        </Row>
        <Row class="box_card">
            <Page :total="pageCount" :current="pageCurrent" :page-size="pageSize" size="small" show-total show-elevator @on-change="get_data"></Page>
        </Row>
    </div>
</template>
<script>
import edit_cell from "../components/edit_cell.vue";
import area_edit_modal from "./area_edit_modal.vue";
import area_add_modal from "./area_add_modal.vue";
export default {
  data() {
    return {
      pageSize: 10,
      pageCount: 100,
      pageCurrent: 1,
      areaList: [],
      areas: [],
      areas_column: [
        { title: "编号", key: "areaNumber", width: 80 },
        {
          title: "名称",
          key: "name"
          // minWidth: 200,
          // render: (h, params) => {
          //   return h(edit_cell, {
          //     props: {
          //       prop_value: params.row.name
          //     }
          //   });
          // }
        },
        { title: "所属区域", key: "parentAreaName" },
        { title: "类型", key: "type" },
        {
          title: "重点区域",
          align: "center",
          render: (h, params) => {
            let type = "info";
            if (params.row.important && params.row.important == "重要") {
              type = "error";
            }
            return h(
              "Button",
              {
                props: {
                  type: type,
                  size: "small",
                  shape: "circle"
                },
                on: {
                  click: () => {
                    if (
                      params.row.important &&
                      params.row.important == "重要"
                    ) {
                      params.row.important = "普通";
                    } else {
                      params.row.important = "重要";
                    }
                  }
                }
              },
              params.row.important
            );
          }
        },
        {
          title: "标签",
          align: "center",
          render: (h, params) => {
            let block = [];
            if (params.row.tags) {
              let tag_array = params.row.tags.split(",");
              for (let i in tag_array) {
                if (tag_array[i]) {
                  let bt = h(
                    "Tag",
                    {
                      props: {
                        color: "blue",
                        fade: true
                      }
                    },
                    tag_array[i]
                  );
                  block.push(bt);
                }
              }
            }

            return h("div", block);
          }
        },
        {
          title: "阈值",
          key: "limit"
          // minWidth: 200,
          // render: (h, params) => {
          //   return h(edit_cell, {
          //     props: {
          //       prop_value: params.row.limit
          //     }
          //   });
          // }
        },
        { title: "当前数量", key: "bike_num" },
        {
          title: "操作",
          align: "center",
          minWidth: 300,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  on: {
                    click: () => {
                      let current_data = "";
                      this.$Modal.confirm({
                        title: "编辑区域",
                        onOk: () => {
                          if (current_data) {
                            let params = new URLSearchParams();
                            params.append(
                              "param",
                              JSON.stringify(current_data)
                            );
                            this.$ajax({
                              method: "post",
                              url: this.$uri + "mapInterface/updateArea",
                              data: params
                            })
                              .then(function(res) {
                                params.row.name = current_data.name;
                                params.row.important = current_data.important;
                                params.row.limit = current_data.limit;
                                params.row.type = current_data.type;
                                params.row.tags = current_data.tags.join();
                                params.row.parentAreaId =
                                  current_data.parentAreaId;
                              })
                              .catch(function(err) {
                                console.log(err);
                              });
                          }
                        },
                        render: h => {
                          return h(area_edit_modal, {
                            props: {
                              prop_value: {
                                rows: params.row,
                                areaList: this.$data.areaList
                              }
                            },
                            on: {
                              recieveData: v => {
                                current_data = v;
                              }
                            }
                          });
                        }
                      });
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      // if (params.row.type == "行政区域") {
                      //   this.$Message.warning("不能编辑行政区域");
                      // } else {
                      this.$router.push({
                        path: "/richangjianguan/addRegion",
                        query: { id: params.row.id }
                      });
                      // }
                    }
                  }
                },
                "区域编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small",
                    type: "error"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      if (params.row.type == "行政区域") {
                        this.$Message.warning("不能删除行政区域");
                      } else {
                        this.$data.areas.splice(params.index, 1);
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    add_area: function() {
      let area = {
        id: "",
        tags: "",
        name: "",
        limit: "",
        bike_num: "",
        important: "不重要",
        type: "自定义区域"
      };
      this.$Modal.confirm({
        title: "添加区域",
        onOk: () => {
          console.log(area.tags);
          area.tags = area.tags.join();
          this.$data.areas.push(area);
        },
        render: h => {
          return h(area_add_modal, {
            props: { prop_value: area }
          });
        }
      });
    }
  },
  methods: {
    area_info: function(params) {
      this.$router.push({
        path: "/richangjianguan/area_info_modal",
        query: { params: params.row }
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
            value: "6941139967a311e8a93e1843420641b8",
            label: "成都市"
          });
          d.$data.areaList = res.data.rows;
        })
        .catch(function(err) {
          console.log(err);
        });
    },
    add_area: function() {
      let area = {
        id: "",
        tags: "",
        name: "",
        limit: "",
        bike_num: "",
        important: "不重要",
        type: "自定义区域"
      };
      this.$Modal.confirm({
        title: "添加区域",
        onOk: () => {
          console.log(area.tags);
          area.tags = area.tags.join();
          this.$data.areas.push(area);
        },
        render: h => {
          return h(area_add_modal, {
            props: { prop_value: area }
          });
        }
      });
    },
    get_data: function(e) {
      var d = this;
      let area = this.$refs.area.publicValue;
      let params = new URLSearchParams();
      var param = {};
      if (area != "" && area) param.parentAreaId = area;
      else param.parentAreaId = "6941139967a311e8a93e1843420641b8";
      if (e && typeof e == "number") params.append("pagenum", parseInt(e));
      params.append("param", JSON.stringify(param));
      this.$ajax({
        method: "post",
        url: this.$uri + "mapInterface/getAreaListByPage",
        data: params
      })
        .then(function(res) {
          d.$data.areas = res.data.rows;
          d.$data.pageCount = res.data.total;
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  },
  mounted: function() {
    this.get_data();
    this.get_area_date();
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
