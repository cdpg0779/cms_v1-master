<template>
    <div>
        <Row class="box_card">
            <Col span="12" class="box_card">
                <div id="complaint_date_num" style=" height:350px"></div>
            </Col>
            <Col span="12" class="box_card">
                <div id="complaint_status_num" style=" height:350px"></div>
            </Col>
        </Row>
        <Row class="box_card">
            <Card>
                <p slot="title">
                    <Icon type="code-working"></Icon>
                    最新事件
                </p>
                <a href="#" slot="extra"  v-on:click="gosomewhere()">
                    <Icon type="ios-plus-empty"></Icon>
                    查看更多
                </a>
                <Table stripe :columns="latest_complaint_column" :data="latest_complaint"></Table>
            </Card>
            
        </Row>
    </div>
</template>
<script>
import echarts from "echarts";
export default {
  data() {
    return {
      complaint_date_num: [],
      complaint_status_num: [],
      latest_complaint: [],
      latest_complaint_column: [
        { title: "流水单号", key: "complaintNo" },
        { title: "公司", key: "company" },
        { title: "区域", key: "area" },
        { title: "时间", key: "time" },
        { title: "状态", key: "status" }
      ]
    };
  },
  methods: {
    gosomewhere() {
      this.$router.push("/richangjianguan/complaint_more");
    },
    create_complaint_date_num: function(data) {
      let myChart = echarts.init(document.getElementById("complaint_date_num"));
      let xAxis = { name: "数量", type: "category", data: [] };
      let seriesArray = [];
      var rows = data.rows;
      var labelName = [];
      var company = data.company;
      for (let i = 0; i < company.length; i++) {
        console.log(i + "a");
        var element = company[i];
        var model_series = {
          areaStyle: { normal: {} },
          name: element.abbreviation,
          type: "line",
          stack: "总量",
          data: []
        };
        seriesArray.push(model_series);
        labelName.push(element.abbreviation);
      }
      for (let i = 0; i < rows.length; i++) {
        console.log(i + "b");
        var element = rows[i];
        xAxis.data.push(element.date);
        var rowsdata = element.data;
        for (var j = 0; j < rowsdata.length; j++) {
          var model = rowsdata[j];
          for (var k = 0; k < seriesArray.length; k++) {
            var series = seriesArray[k];
            if (series.name == model.abbreviation) {
              series.data.push(model.total);
            } else {
              series.data.push(0);
            }
          }
        }
      }
      // let mobai_series = {
      //   areaStyle: { normal: {} },
      //   name: "摩拜",
      //   type: "line",
      //   stack: "总量",
      //   data: []
      // };
      // let ofo_series = {
      //   areaStyle: { normal: {} },
      //   name: "ofo",
      //   type: "line",
      //   stack: "总量",
      //   data: []
      // };
      // let etc_series = {
      //   areaStyle: { normal: {} },
      //   name: "其它",
      //   type: "line",
      //   stack: "总量",
      //   data: []
      // };
      // for (let i in data) {
      //   xAxis.data.push(data[i].date);
      //   ofo_series.data.push(data[i].ofo);
      //   mobai_series.data.push(data[i].mobai);
      //   etc_series.data.push(data[i].etc);
      // }

      let option = {
        title: { text: "投诉事件时间分布" },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: { labelName },
        xAxis: xAxis,
        yAxis: { name: "日期", type: "value" },
        series: seriesArray
      };
      myChart.setOption(option);
    },
    create_complaint_status_num: function(data) {
      let myChart = echarts.init(
        document.getElementById("complaint_status_num")
      );
      let series = {
        highlightPolicy: "ancestor",
        type: "sunburst",
        data: []
      };
      var status = data.status;
      for (let i = 0; i < status.length; i++) {
        let temp = { name: status[i].name };
        let child = [];
        child.push({ name: "完成", value: status[i].complete });
        child.push({ name: "处理中", value: status[i].deal });
        child.push({ name: "未处理", value: status[i].complaint });
        temp.children = child;
        series.data.push(temp);
      }
      let option = {
        title: { text: "投诉事件品牌分布" },
        tooltip: {},
        series: [series]
      };
      myChart.setOption(option);
    },
    get_data: function() {
      var d = this;
      this.$ajax({
        method: "post",
        url: this.$uri + "mapInterface/getComplainAll"
      })
        .then(function(res) {
          d.create_complaint_date_num(res.data);
          d.create_complaint_status_num(res.data);
          d.$data.latest_complaint = res.data.latest_complaint;
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
