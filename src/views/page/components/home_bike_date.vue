<template>
    <div  id="bike_company_date" style="height:500px;"></div>
</template>
<script>
import echarts from "echarts";
export default {
  methods: {
    dataFormatter: function(obj) {
      var pList = [
        "锦江区",
        "金牛区",
        "成华区",
        "青羊区",
        "武侯区",
        "双流区",
        "温江区",
        "龙泉驿区",
        "郫都区",
        "新都区",
        "青白江区"
      ];
      var temp;
      for (var year = 23; year <= 30; year++) {
        var max = 0;
        var sum = 0;
        temp = obj[year];
        for (var i = 0, l = temp.length; i < l; i++) {
          max = Math.max(max, temp[i]);
          sum += temp[i];
          obj[year][i] = {
            name: pList[i],
            value: temp[i]
          };
        }
        obj[year + "max"] = Math.floor(max / 100) * 100;
        obj[year + "sum"] = sum;
      }
      return obj;
    }
  },
  mounted: function() {
    console.log("bike");
    let myChart = echarts.init(document.getElementById("bike_company_date"));
    var dataMap = {};
    dataMap.dataMobai = this.dataFormatter({
      //max : 60000,
      "23": [
        1293,
        130728,
        51576,
        22755,
        4988,
        21267,
        51883,
        14582,
        69569,
        81027,
        92385
      ],
      "24": [
        36293,
        50728,
        11576,
        53755,
        125988,
        5267,
        66883,
        85582,
        59569,
        31027,
        132385
      ],
      "25": [
        16293,
        10728,
        51576,
        23755,
        325988,
        12267,
        56883,
        115582,
        139569,
        41027,
        132385
      ],
      "26": [
        116293,
        10728,
        151576,
        123755,
        135988,
        2267,
        56883,
        15582,
        119569,
        41027,
        132385
      ],
      "27": [
        16293,
        10728,
        151576,
        123755,
        35988,
        12267,
        56883,
        15582,
        119569,
        141027,
        132385
      ],
      "28": [
        16293,
        210728,
        51576,
        123755,
        135988,
        244267,
        156883,
        125582,
        19569,
        141027,
        132385
      ],
      "29": [
        16293,
        104728,
        51576,
        213755,
        35988,
        22267,
        56883,
        15582,
        19569,
        41027,
        132385
      ],
      "30": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ]
    });
    dataMap.dataOfo = this.dataFormatter({
      //max : 60000,
      "23": [
        216293,
        210728,
        51576,
        223755,
        35988,
        222267,
        56883,
        215582,
        19569,
        241027,
        232385
      ],
      "24": [
        16293,
        310728,
        251576,
        123755,
        35988,
        332267,
        156883,
        15582,
        19569,
        141027,
        32385
      ],
      "25": [
        216293,
        10728,
        251576,
        123755,
        35988,
        112267,
        56883,
        15582,
        19569,
        141027,
        32385
      ],
      "26": [
        16293,
        10728,
        51576,
        123755,
        35988,
        222267,
        356883,
        15582,
        319569,
        341027,
        32385
      ],
      "27": [
        16293,
        10728,
        51576,
        123755,
        35988,
        226337,
        56883,
        415582,
        219569,
        141027,
        32385
      ],
      "28": [
        16293,
        10728,
        51576,
        23755,
        35988,
        112267,
        156883,
        15582,
        19569,
        41027,
        132385
      ],
      "29": [
        16293,
        10728,
        51576,
        23755,
        35988,
        232267,
        56883,
        215582,
        19569,
        241027,
        32385
      ],
      "30": [
        16293,
        10728,
        251576,
        23755,
        235988,
        432267,
        56883,
        15582,
        19569,
        241027,
        132385
      ]
    });
    dataMap.dataEtc = this.dataFormatter({
      //max : 60000,
      "23": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ],
      "24": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ],
      "25": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ],
      "26": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ],
      "27": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ],
      "28": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ],
      "29": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ],
      "30": [
        16293,
        10728,
        51576,
        23755,
        35988,
        2267,
        56883,
        15582,
        19569,
        41027,
        32385
      ]
    });
    var curDate = new Date();
    var nowDate = [
      new Date(
        curDate.getTime() - 6 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      new Date(
        curDate.getTime() - 5 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      new Date(
        curDate.getTime() - 4 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      new Date(
        curDate.getTime() - 3 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      new Date(
        curDate.getTime() - 2 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      new Date(
        curDate.getTime() - 1 * 24 * 60 * 60 * 1000
      ).toLocaleDateString(),
      new Date().toLocaleDateString()
    ];

    var opArray = [];
    for (var i = 23; i < 31; i++) {
      var element = nowDate[i - 23];
      opArray.push({
        title: { text: element + "共享单车区域品牌分布" },
        series: [
          { data: dataMap.dataMobai[i + ""] },
          { data: dataMap.dataOfo[i + ""] },
          { data: dataMap.dataEtc[i + ""] },
          {
            data: [
              { name: "摩拜", value: dataMap.dataMobai[i + "sum"] },
              { name: "OFO", value: dataMap.dataOfo[i + "sum"] },
              { name: "其他", value: dataMap.dataEtc[i + "sum"] }
            ]
          }
        ]
      });
    }

    let option = {
      baseOption: {
        timeline: {
          // y: 0,
          axisType: "category",
          // realtime: false,
          // loop: false,
          autoPlay: true,
          // currentIndex: 2,
          playInterval: 3000,
          // controlStyle: {
          //     position: 'left'
          // },
          data: nowDate,
          label: {
            formatter: function(s) {
              return s;
            }
          }
        },
        tooltip: {},
        legend: {
          x: "right",
          data: ["摩拜", "ofo", "其它"]
        },
        calculable: true,
        grid: {
          top: 80,
          bottom: 100,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
              label: {
                show: true,
                formatter: function(params) {
                  return params.value.replace("\n", "");
                }
              }
            }
          }
        },
        xAxis: [
          {
            type: "category",
            axisLabel: { interval: 0 },
            data: [
              "锦江区",
              "金牛区",
              "成华区",
              "青羊区",
              "武侯区",
              "双流区",
              "温江区",
              "龙泉驿区",
              "郫都区",
              "新都区",
              "青白江区"
            ],
            splitLine: { show: false }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "辆"
          }
        ],
        series: [
          { name: "摩拜", type: "bar" },
          { name: "ofo", type: "bar" },
          { name: "其它", type: "bar" },
          {
            name: "GDP占比",
            type: "pie",
            center: ["75%", "35%"],
            radius: "28%",
            z: 100
          }
        ]
      },
      options: opArray
    };

    if (option && typeof option === "object") {
      myChart.setOption(option, true);
    }
  }
};
</script>
