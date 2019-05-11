var app = new Vue({
  el:'#app',
  data:{
    timeNow:(new Date()).getTime(),
    timeBefore:1546272000*1000,//2019-01-01  秒级(10位)  毫秒级需要 *1000
    // 1min  以前显示 刚刚
    // 1min-1hour  以前显示 xx分钟前
    // 1hour-1day  以前显示 xx小时前
    // 1day-1month  以前显示 xx天前
    // 1month+  以前显示 x年x月x日
  }
})
