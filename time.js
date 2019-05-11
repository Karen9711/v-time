var time = {
  getUnix:function(){
    var date = new Date();
    return date.getTime();//返回当前时间  具体查阅getTime()  getTime 直接获得时间戳
  },
  getTodayUnix:function(){//返回今天0时0分0秒0毫秒的时间
    var date = new Date();
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  getYearUnix:function(){//返回今年1月1日0时0分0秒0毫秒的时间
    var date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  //获取标准年月日
  getLastUnix:function(time){
    var date = new Date(time);
    var month = date.getMonth() > 10 ? date.getMonth + 1 : '0' + (date.getMonth()+1);//显示为 01 02……
    var day = date.getDate() > 10 ? date.getDate : '0' + date.getDate();//显示为 01 02……
    return date.getFullYear() + "-" + month + "-" + day;
  },
  getFormatTime:function(timestamp){//这里的变量是毫秒级时间戳
    var now = this.getUnix();
    var today = this.getTodayUnix();
    var year = this.getYearUnix();
    var timer = (now - timestamp) / 1000;
    var tip = '';

    if(timer <= 0){
      tip = '刚刚';
    }
    else if(Math.floor(timer/60) <= 0){// 1min  以前显示 刚刚
      tip = '刚刚';
    }
    else if(timer < 3600){//1min-1hour  以前显示 xx分钟前
      tip = Math.floor(timer/60)+ '分钟前';
    }
    else if( timer >=3600 && (timestamp - today >=0)){
      tip = Math.floor(timer / 3600)+'小时前';
    }
    else if(timer / 86400 <= 31){ // 86400 = 60 * 60 * 24
      tip = Math.ceil(timer / 86400 )+'天前';
    }
    else{
      tip = this.getLastUnix(timestamp);
    }
    return tip;
  }
};

Vue.directive('time',{
  bind:function(el,binding){
    console.log("value",binding.value);
    el.innerHTML = time.getFormatTime(binding.value);
    el.__timeout__ = setInterval(function(){
      el.innerHTML = time.getFormatTime(binding.value);
    },60000);//???
  },
  unbind:function(){
    clearInterval(el.__timeout__);
    delete el.__timeout__;
  }
})
