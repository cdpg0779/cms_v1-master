<template>
    <div>
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
          minWidth: 170,
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
                        width: "1280px",
                        onOk: () => {
                          if (current_data) {
                            params.row.name = current_data.name;
                            params.row.areacCoordinate =
                              current_data.areacCoordinate;
                            params.row.important = current_data.important;
                            params.row.limit = current_data.limit;
                            params.row.type = current_data.type;
                            params.row.tags = current_data.tags.join();
                          }
                        },
                        render: h => {
                          return h(area_edit_modal, {
                            props: {
                              prop_value: params.row
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
                    size: "small",
                    type: "info"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      let current_data = "";
                      this.$router.push({
                        path: "/richangjianguan/area_info_modal",
                        query: { param: JSON.stringify(params.row) }
                      });
                      // this.$Modal.confirm({
                      //   title: "区域详情",
                      //   onOk: () => {
                      //     if (current_data) {
                      //       params.row.name = current_data.name;
                      //       params.row.areacCoordinate =
                      //         current_data.areacCoordinate;
                      //       params.row.important = current_data.important;
                      //       params.row.limit = current_data.limit;
                      //       params.row.type = current_data.type;
                      //       params.row.tags = current_data.tags.join();
                      //     }
                      //   },
                      //   render: h => {
                      //     return h(area_info_modal, {
                      //       props: {
                      //         prop_value: params.row
                      //       },
                      //       on: {
                      //         recieveData: v => {
                      //           current_data = v;
                      //         }
                      //       }
                      //     });
                      //   }
                      // });
                    }
                  }
                },
                "详情"
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
                      if (window.confirm("你确定要删除该区域吗？")) {
                        if (params.row.type == "行政区域") {
                          this.$Message.warning("不能删除行政区域");
                        } else {
                          let param = new URLSearchParams();
                          if (params) {
                            param.append("id", params.row.id);
                          }
                          this.$ajax({
                            method: "post",
                            url: this.$uri + "mapInterface/deleteArea",
                            data: param
                          })
                            .then(function(res) {
                              if (res.data.state == 0)
                                this.$data.areas.splice(params.index, 1);
                              else alert("删除失败");
                            })
                            .catch(function(err) {
                              console.log(err);
                            });
                        }
                      }
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        },
        {
          title: "定义区域",
          align: "center",
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
                      if (params.row.type == "行政区域") {
                        this.$Message.warning("不能修改行政区域");
                      } else {
                        this.$Message.info("功能开发中");
                      }
                    }
                  }
                },
                "定义区域"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    area_info: function(params) {
      this.$router.push({
        path: "/richangjianguan/area_info_modal",
        query: { params: params.row }
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
      let params = new URLSearchParams();
      if (e) params.append("pagenum", parseInt(e));
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
