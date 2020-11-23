<template>
  <div>
    <div id="main"></div>
  </div>
</template>

<script>
import Echart from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
console.log(this,'组件实例')
    let myChart = Echart.init(document.getElementById("main"));
    let options = {
        title:{
            text:"本系统的周访问量",
            textStyle:{
                color:'red',
                fontSize:30
            },
             textAlign:'auto'
        },
      xAxis: {
        type: "category",
        data: ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"]
      },
      yAxis: {
        type: "value"
      },
      series: [
        {
          data: [66, 500, 999, 1400, 800, 500, 1500],
          type: "line"
        }
      ]
    };
    //设置创建好的配置项
    myChart.setOption(options)
  }};
</script>

<style lang="" scoped>
#main {
  width: 800px;
  height: 500px;
  margin: 20 auto;
}
</style>
