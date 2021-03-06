var apiURL = 'http://oa.pingpingapp.com';
var appId	= 'wx9e9df3ea0ba1dec9'; 
var projectName = "CBN减轻茶"
var LM = {
  alert: {}
}
LM.alert.Over = function(settings) {
  var defaultSetting = {
    code:'',
    phone: "",
    src: "/code/captcha",
    title: "提示",
    toggle: function() {
      // this.src = this.base + this.src + "?" + new Date().getTime();
      $(".code-img").attr("src", this.base + this.src + "?" + new Date().getTime() + '&phone='+this.phone);
      var h=$(window).height(); 
      // $("body,html").css({"overflow":"hidden","height":h+"px"});
    },
    yes: function() {
      console.log(this.phone + "\n" + $("#img_code").val());
    },
    no: function() {
      $(".shade").remove();
      // $("body,html").css({"overflow":"auto","height":"auto"}); 
    }
  };


  $.extend(defaultSetting, settings);
  window.defaultSetting = defaultSetting;
  var htmlStr =
    '<div class="shade"><div class="shade-con"><h2>' +
    defaultSetting.title + "</h2>" + "<h2>" + '<img class="code-img" onclick="defaultSetting.toggle()" src="' +
    defaultSetting.src + '" />' + '<span class="toggle-img" onclick="defaultSetting.toggle()">换一张</span>' +
    "</h2>" + "<p>" +
    '<input type="text" id="img_code"  maxlength="5" placeholder="请输入5位验证码" />' + "</p>" + '<div class="btn">' +
    '<span class="btn-no" onclick="defaultSetting.no()">取消</span>' +
    '<span class="btn-yes" onclick="defaultSetting.yes()">确定</span>' + "</div>" + "</div>" + "</div>";
  $("body").append(htmlStr);
  defaultSetting.toggle()
  if($("#shade-style").length === 0 ){
	addCssByStyle(
		".content{margin-top: 2rem;}.mask,.shade{display: flex;justify-content: center;align-items: center; position:fixed;top:0;left:0;width:100%;height:100%;z-index:9999;background:rgba(0,0,0,.5)}.shade .shade-con{width:15rem;height:10.5rem;border-radius:.25rem;background:#fff;position:fixed;top:50%;left:50%;margin:-5.25rem 0 0 -7.5rem;padding-top:1rem}.shade-con h2{font-size:.9rem;font-weight:400;text-align:center;color:#282828;position:relative}.shade-con h2:first-child{font-size:.8rem;color:#646464}.shade-con h2 span{position:absolute;top:50%;font-size:.55rem;text-align:center;line-height:1.1rem;color:#fff;background-color:#3eb94e;border-radius:.11rem;margin-top:-.55rem;margin-left:.75rem;width:2.2rem;height:1.1rem}.shade-con img{width:4rem;margin:.7rem 0;height:2rem;border-color:none}.shade-con p{height:2rem;width:13rem;margin-left:1rem;background-color:#f5f5f5;border-radius:.25rem;margin-top:-.25rem;position:relative}.shade-con p input{padding-left:.75rem;font-size:.9rem;top:50%;margin-top:.36rem;width:100%;left:.45rem;line-height:1rem;height:1.5rem;border:none;background-color:transparent}.shade-con .btn{position:absolute;bottom:0;width:100%;text-align:center;height:2.45rem;line-height:2.45rem;}.shade-con .btn span{font-size:.9rem;float:left;width:50%;height:100%;color:#646464}.shade-con .btn span.btn-yes{color:#3eb94e;float:right;}"
	  ,'shade-style');
  }
}
LM.alert.Wechat = function(t){
  var t = t || '已收藏'
  $('#alertWechat,#alertLoading').remove();
  clearTimeout(LM.alert.Time);
  var alertWechat = '<div id="alertWechat" style="z-index:99999;position:fixed;left:50%;top:45%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%);text-align:center"><span style="background-color:rgba(0,0,0,.6);padding:0.5rem .75rem;font-size:0.75rem;min-width:100px;color:#fff;border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,.6);display:inline-block;">'+t+'</span></div>'
  $('body').append(alertWechat);
  LM.alert.Time = setTimeout(function(){
      $('#alertWechat').fadeOut(500)
  }, 1500)
}
var Load = {
alert : {}
}
Load.alert.Loading = function(x){
var x = x || '努力加载中';
$('#alertLoading,#alertWechat').remove();
clearTimeout(Load.alert.Time);
var alertLoading = '<div id="alertLoading" style="padding:1rem .5rem .5rem;background:rgba(0,0,0,.6);position: fixed;top: 45%;left: 50%;transform: translate(-50%,-50%);border-radius: 1rem;"><div style="width:2.75rem;height: 2.75rem;margin: 0 auto;background: url(https://web.rrzuzu.com/WebStatic/rry-activity/memezhao/images/load.gif) no-repeat;background-size: 100% 100%;"></div><p style="margin: .5rem auto .2rem;text-align: center;color: #fff;font-size: 1rem;">'+x+'</p></div>';
$('body').append(alertLoading);
Load.alert.Time = setTimeout(function(){
  $('#alertLoading').fadeOut(500)
},1500);
}
/**
 * 
 * @param {cssString} cssString 
 * @param {id} style标签id 
 */
function addCssByStyle(cssString,id) {
  var doc = document;
  var style = doc.createElement("style");
  style.setAttribute("type", "text/css");
  style.setAttribute("id", id);
  if (style.styleSheet) {
    // IE
    style.styleSheet.cssText = cssString;
  } else {
    // w3c
    var cssText = doc.createTextNode(cssString);
    style.appendChild(cssText);
  }
  var heads = doc.getElementsByTagName("head");
  if (heads.length) heads[0].appendChild(style);
  else doc.documentElement.appendChild(style);
}
function isIdcard(Idcard){
var searchStr = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (!searchStr.test(Idcard)) {
       return false;
  }else{
    return true;
  }
};
function isMobile(mobile) {
  var searchStr = /^(1+\d{10})$/;
  if (!searchStr.test(mobile)) {
      return false;
  }
  return true;
}
function isName(Name){
var searchStr = /^[\u4e00-\u9fa5]{2,}$/;
var searchStr2 = /^[A-Za-z][A-Za-z]{2,}$/;
  if (searchStr.test(Name) || searchStr2.test(Name)) {
    return true;
  }else{
    return false;
  }
};
var countdown = 60;
function settime(obj) {
  if(countdown == 0) {
  obj.removeAttribute('disabled'); 
  obj.value = "获取验证码";
  countdown = 60;
  return;
  } else {
    obj.setAttribute("disabled", "disabled");
    obj.value = countdown + "秒后重试";
    countdown--;
  }
    setTimeout(function() {
      settime(obj)
    }, 1000)
};
function addKeyFrames(y){
  var style = document.createElement('style');
  style.type = 'text/css';
  var keyFrames = '\
  @-webkit-keyframes rowup {\
      0% {\
          -webkit-transform: translate3d(0, 0, 0);\
          transform: translate3d(0, 0, 0);\
      }\
      100% {\
          -webkit-transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
          transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
      }\
  }\
  @keyframes rowup {\
      0% {\
          -webkit-transform: translate3d(0, 0, 0);\
          transform: translate3d(0, 0, 0);\
      }\
      100% {\
          -webkit-transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
          transform: translate3d(0, A_DYNAMIC_VALUE, 0);\
      }\
  }';
  style.innerHTML = keyFrames.replace(/A_DYNAMIC_VALUE/g, y);
  document.getElementsByTagName('head')[0].appendChild(style);
}
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]); return null;
}

var locationUrl = encodeURIComponent(window.location.href);
$.get(
  apiURL + "/wechat/portal/get/jssignature?encodeUrl=" + locationUrl,
  function(res) {
    if (!(res.code === 12000)) {
      alert("获取签名失败");
      return;
    }
    wx.config({
      debug: false,
      appId: res.data.appId,
      // appId: appId,
      timestamp: res.data.timestamp,
      nonceStr: res.data.nonceStr,
      signature: res.data.signature,
      jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage"]
    });
  }
);
function redirectUrl(){
  var url = apiURL+'/auth?redirectUrl=' +  window.location.href
  var redirect_uri = encodeURIComponent(url);
  return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+appId+'&redirect_uri='+redirect_uri+
  '&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
}



$(document).ajaxSuccess(function(event,xhr,options){
  var data=xhr.responseJSON;
  if(data!=undefined){
    if(data.code === 54000){
      // window.location.href = redirectUrl();
    }
  }
});

var headimg = 'http://pic.51fen.com/webadmin/2018110711063184908.png'
var title = "闹元宵赢好礼，点击体验！";
var desc = "恭喜您获得了抽好礼的机会，马上来试试吧！";
var shareImgUrl = "http://pic.51fen.com/webadmin/2018110711063184908.png";
var link = apiURL + "/WebStatic/jianqing/wx-test/html/into.html";
$.ajax({
  type:"POST",
  async:false,
  url:apiURL + "/user/me",
  success:function(res){
    if (res.code == 12000) {
      if (res.data.headimg) {
        headimg = res.data.headimg;
      }
    }
  },
  error:function(){

  }
})
wx.ready(function() {
  wx.onMenuShareTimeline({
    title: title,
    desc: desc,
    link: link, 
    imgUrl: shareImgUrl, 
    success: function() {
    }
  });
  wx.onMenuShareAppMessage({
    title: title,
    desc: desc,
    link: link,
    imgUrl: shareImgUrl,
    success: function() {
      
    }
  });
  if(window.location.href.indexOf('?from=')>0){
    var currentURL = window.location.href.split('?');
    window.location.href = currentURL[0];
  };
});
 
function randomNum(minNum,maxNum){
  switch(arguments.length){ 
    case 1: 
        return parseInt(Math.random()*minNum+1,10); 
    break; 
    case 2: 
        return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
    break; 
    default: 
        return 0; 
    break; 
  } 
} 