<template>
    <div>
        <Row class="box_card" style="margin-top:10px;">
            <Col span="12" style="line-height: 20px;">
                <Row>姓名：{{current_data.name}}</Row>
                <Row>性别：{{current_data.sex}}</Row>
                <Row>年龄：{{current_data.age}}</Row>
                <Row>电话：{{current_data.phone}}</Row>
                <Row>证件号：{{current_data.card_id}}</Row>
            </Col>
            <Col span="12">
             <Avatar style="margin-left:90px;width:100px;height:100px;"><Icon type="person" size="95"></Icon></Avatar>
                <!-- <img style="margin-left:90px;" width="100" height="100" src="/dist/renxiang.jpg"> -->
            </Col>
        </Row>
        <Row class="box_card" style="margin-top:20px;">
            <Col>
                <div class="line"></div>
            </Col>
        </Row>
       <Row  class="box_card" style="margin-top:20px;line-height: 30px;">
            <Col span="12">所在公司：{{current_data.company}}</Col>
            <Col span="12">处理事件：{{current_data.event_num}}</Col>
            <Col span="12">入职时间：{{current_data.time}}</Col>
            <Col span="12">在线状态：{{current_data.status}}</Col>
        </Row>
        <Row class="box_card" style="margin-top:20px;">
            <Col>
                <div class="line"></div>
            </Col>
        </Row>
         <Row class="box_card" style="margin-top:20px;line-height: 30px;">
           <Col span="12">
                最新位置：
            </Col>
            <Col>
                <div id="map" style="height:200px;z-index:999"></div>
            </Col>
        </Row>
    </div>
</template>
<style type="text/css">
/*去除百度地图版权*/
.anchorBL {
  display: none;
}
</style>
<script>
import echarts from "echarts";
require("echarts/extension/bmap/bmap");
export default {
  name: "person_info_modal",
  props: {
    prop_value: ""
  },
  data: () => {
    return {
      current_data: ""
    };
  },
  methods: {
    showMap: function() {
      var d = this;
      var coordinate = this.$data.current_data.lastCoordinate;
      var zuobiao = [104.071503, 30.658824];
      if (coordinate)
        zuobiao = [
          parseFloat(coordinate.split(",")[0]),
          parseFloat(coordinate.split(",")[1])
        ];
      var myChart = echarts.init(document.getElementById("map"));
      myChart.setOption({
        animation: false,
        bmap: {
          center: zuobiao,
          zoom: 14,
          roam: true
          //   mapStyle: {
          //     styleJson: [
          //       {
          //         featureType: "land", //调整土地颜色
          //         elementType: "geometry",
          //         stylers: {
          //           color: "#081734"
          //         }
          //       },
          //       {
          //         featureType: "building", //调整建筑物颜色
          //         elementType: "geometry",
          //         stylers: {
          //           color: "#04406F"
          //         }
          //       },
          //       {
          //         featureType: "building", //调整建筑物标签是否可视
          //         elementType: "labels",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "highway", //调整高速道路颜色
          //         elementType: "geometry",
          //         stylers: {
          //           color: "#015B99"
          //         }
          //       },
          //       {
          //         featureType: "highway", //调整高速名字是否可视
          //         elementType: "labels",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "arterial", //调整一些干道颜色
          //         elementType: "geometry",
          //         stylers: {
          //           color: "#003051"
          //         }
          //       },
          //       {
          //         featureType: "arterial",
          //         elementType: "labels",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "green",
          //         elementType: "geometry",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "water",
          //         elementType: "geometry",
          //         stylers: {
          //           color: "#044161"
          //         }
          //       },
          //       {
          //         featureType: "subway", //调整地铁颜色
          //         elementType: "geometry.stroke",
          //         stylers: {
          //           color: "#003051"
          //         }
          //       },
          //       {
          //         featureType: "subway",
          //         elementType: "labels",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "railway",
          //         elementType: "geometry",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "railway",
          //         elementType: "labels",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "all", //调整所有的标签的边缘颜色
          //         elementType: "labels.text.stroke",
          //         stylers: {
          //           color: "#313131"
          //         }
          //       },
          //       {
          //         featureType: "all", //调整所有标签的填充颜色
          //         elementType: "labels.text.fill",
          //         stylers: {
          //           color: "#FFFFFF"
          //         }
          //       },
          //       {
          //         featureType: "manmade",
          //         elementType: "geometry",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "manmade",
          //         elementType: "labels",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "local",
          //         elementType: "geometry",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "local",
          //         elementType: "labels",
          //         stylers: {
          //           visibility: "off"
          //         }
          //       },
          //       {
          //         featureType: "subway",
          //         elementType: "geometry",
          //         stylers: {
          //           lightness: -65
          //         }
          //       },
          //       {
          //         featureType: "railway",
          //         elementType: "all",
          //         stylers: {
          //           lightness: -40
          //         }
          //       },
          //       {
          //         featureType: "boundary",
          //         elementType: "geometry",
          //         stylers: {
          //           color: "#8b8787",
          //           weight: "1",
          //           lightness: -29
          //         }
          //       }
          //     ]
          //   }
        },
        series: [
          {
            type: "scatter",
            coordinateSystem: "bmap",
            data: [[120, 30, 1]]
          }
        ]
      });

      var bmap = myChart
        .getModel()
        .getComponent("bmap")
        .getBMap();
      bmap.addControl(new BMap.MapTypeControl());
      var point = new BMap.Point(zuobiao[0], zuobiao[1]); //将标注点转化成地图上的点
      var marker = new BMap.Marker(point); //将点转化成标注点

      bmap.addOverlay(marker); //添加覆盖物
      marker.addEventListener(
        "click",
        //显示信息的方法
        function() {
          d.showInfo(this, d.$data.current_data);
        }
      );
    },
    showInfo: function(thisMarker, point) {
      //获取点的信息
      var sContent =
        '<ul style="margin:0 0 5px 0;padding:0.2em 0">' +
        '<li style="line-height: 26px;font-size: 15px;">' +
        '<span style="width: 50px;display: inline-block;">姓名：</span>' +
        point.name +
        "</li>" +
        '<li style="line-height: 26px;font-size: 15px;">' +
        '<span style="width: 50px;display: inline-block;">电话：</span>' +
        point.phone +
        "</li>" +
        '<li style="line-height: 26px;font-size: 15px;"><span style="width: 50px;display: inline-block;">查看：</span><a href="' +
        point.url +
        '">详情</a></li>' +
        "</ul>";
      var infoWindow = new BMap.InfoWindow(sContent); //创建信息窗口对象
      thisMarker.openInfoWindow(infoWindow); //图片加载完后重绘infoWindow
    }
  },
  mounted: function() {
    var d = this;
    this.$data.current_data = JSON.parse(
      JSON.stringify(this.$props.prop_value)
    );
    var t = setInterval(function() {
      if (document.getElementById("map")) {
        d.showMap();
        clearInterval(t);
      }
    }, 1000);
  }
};
</script>
<style scoped>
.box_card {
  width: 400px;
}
.row_card {
  padding: 5px;
}
.line {
  height: 1px;
  background-color: rgba(116, 116, 116, 0.63);
}
</style>
