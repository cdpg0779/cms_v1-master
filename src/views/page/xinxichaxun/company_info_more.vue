<template>
<div>
    <Row>
        <Col class="box_card">
            <a href="javascript:void(0);" v-on:click="goback()"><Icon type="arrow-return-left"></Icon>返回上级</a>
            <div style="height:1px;background-color: rgba(116, 116, 116, 0.63);margin-top: 10px;"></div>
        </Col>
    </Row>

     <Row class="box_card">
        <Col span="24" class="title">{{current_data.name}}</Col>
        <Col span="24"><br></Col>

        <Col span="12">注册号：{{current_data.registerCode}}</Col>
        <Col span="12">组织机构代码：{{current_data.organizationCode}}</Col>
        <Col span="24">税务登记证号：{{current_data.taxCode}}</Col>
        <Col span="24"><br></Col>

        <Col span="12">法定代表人：{{current_data.linkMan}}</Col>
        <Col span="12">经营状态：{{current_data.status}}</Col>
        <Col span="12">成立日期：{{current_data.createTime}}</Col>
        <Col span="12">营业期限：{{current_data.timeLimit}}</Col>
        <Col span="24">审核/年检日期：{{current_data.checkTime}}</Col>
        <Col span="24"><br></Col>

        <Col span="12">注册资本：{{current_data.ziben}}</Col>
        <Col span="12">企业类型：{{current_data.type}}</Col>
        <Col span="24">所属行业：{{current_data.hangye}}</Col>
        <Col span="24"><br></Col>

        <Col span="12">行政区划：{{current_data.area}}</Col>
        <Col span="12">电话号码：{{current_data.linkPhone}}</Col>
        <Col span="24">登记机关：{{current_data.loginArea}}</Col>
        <Col span="24">所在地址：{{current_data.adress}}</Col>
        <Col span="24">经营范围：{{current_data.info}}</Col>
        <Col span="24"><br></Col>
    </Row>
    <Row>
        <Col  class="box_card">
            <div class="line"></div>
        </Col>
    </Row>
    <Row>
        <Col span="12" class="box_card">
            <div id="person_date_num" style=" height:350px"></div>
        </Col>
        <Col span="12" class="box_card">
            <div id="person_area_num" style=" height:350px"></div>
        </Col>
    </Row>
    <Row>
        <Col  class="box_card">
            <div class="line"></div>
        </Col>
    </Row>
    <Row>
        
        <Col  class="box_card">
            <h3>报警事件</h3>
            <Table stripe :columns="table_columns" :data="current_data.alarm"></Table>
        </Col>
    </Row>
    <Row>
        <Col  class="box_card">
            <div class="line"></div>
        </Col>
    </Row>
    <Row>
        <Col span="12" class="box_card">
            <div id="bike_date_num" style=" height:350px"></div>
        </Col>
        <Col span="12" class="box_card">
            <div id="bike_area_num" style=" height:350px"></div>
        </Col>
    </Row>
    <Row>
        <Col  class="box_card">
            <div class="line"></div>
        </Col>
    </Row>
    
</div>

</template>
<script>
import echarts from "echarts";

export default {
  data() {
    return {
      table_columns: [
        {
          title: "区域编号",
          key: "id"
        },
        {
          title: "区域名称",
          key: "name"
        },
        {
          title: "区域类型",
          key: "type"
        },
        {
          title: "车辆使用率",
          key: "vehicleUtilization"
        },
        {
          title: "报警原因",
          key: "reason"
        },
        {
          title: "企业名称",
          key: "enterprise"
        }
      ],
      company: [],
      current_data: ""
    };
  },
  methods: {
    goback: function() {
      this.$router.go(-1);
    },
    create_person_date_num: function(data) {
      let myChart = echarts.init(document.getElementById("person_date_num"));
      let xAxis = { name: "人数", type: "category", data: [] };
      let series = {
        areaStyle: { normal: {} },
        name: "人数",
        type: "line",
        data: []
      };
      for (let i in data) {
        xAxis.data.push(data[i].date);
        series.data.push(data[i].num);
      }
      let option = {
        title: { text: "运维人员时间分布" },
        tooltip: {},
        xAxis: xAxis,
        yAxis: { name: "日期", type: "value" },
        series: [series]
      };
      myChart.setOption(option);
    },
    create_person_area_num: function(data) {
      let myChart = echarts.init(document.getElementById("person_area_num"));
      let series = {
        areaStyle: { normal: {} },
        type: "pie",
        data: []
      };
      for (let i in data) {
        let temp = { name: data[i].area, value: data[i].num };
        series.data.push(temp);
      }
      let option = {
        title: { text: "运维人员区域分布" },
        tooltip: {},
        legend: {
          type: "scroll",
          bottom: 10
        },
        series: [series]
      };
      myChart.setOption(option);
    },
    create_bike_date_num: function(data) {
      let myChart = echarts.init(document.getElementById("bike_date_num"));
      let xAxis = { name: "投放数量", type: "category", data: [] };
      let series = {
        areaStyle: { normal: {} },
        name: "投放数量",
        type: "line",
        data: []
      };
      for (let i in data) {
        xAxis.data.push(data[i].date);
        series.data.push(data[i].num);
      }
      let option = {
        title: { text: "车辆投放时间分布" },
        tooltip: {},
        xAxis: xAxis,
        yAxis: { name: "日期", type: "value" },
        series: [series]
      };
      myChart.setOption(option);
    },
    create_bike_area_num: function(data) {
      let myChart = echarts.init(document.getElementById("bike_area_num"));
      let series = {
        areaStyle: { normal: {} },
        type: "pie",
        data: []
      };
      for (let i in data) {
        let temp = { name: data[i].area, value: data[i].num };
        series.data.push(temp);
      }
      let option = {
        title: { text: "车辆投放区域分布" },
        tooltip: {},
        legend: {
          type: "scroll",
          bottom: 10
        },
        series: [series]
      };
      myChart.setOption(option);
    },
    get_data: function(e) {
      var d = this;
      var id = this.$route.query.id;
      let params = new URLSearchParams();
      if (id) params.append("id", id);
      this.$ajax({
        method: "post",
        url: "http://192.168.10.243:2999/mapInterface/getCompanyInfoById",
        data: params
      })
        .then(function(res) {
          d.$data.company = res.data.info;
          d.$data.current_data = d.$data.company;
          d.create_person_date_num(res.data.person_date_num);
          d.create_person_area_num(res.data.person_area_num);
          d.create_bike_date_num(res.data.bike_date_num);
          d.create_bike_area_num(res.data.bike_area_num);
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
.card-height {
  height: 500px;
  overflow: scroll;
}
.card-height::-webkit-scrollbar {
  display: none;
}
.box_card {
  padding: 25px;
}

.line {
  height: 1px;
  background-color: rgba(116, 116, 116, 0.63);
}
.title {
  color: #ef6421;
  font-size: 20px;
}
</style>


