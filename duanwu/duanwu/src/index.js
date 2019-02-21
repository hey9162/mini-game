require('./style.less');
require('./assets/js/rem-init.js');
import '../node_modules/jquery-weui/dist/js/jquery-weui.min.js';
function zong(left, src) {
  var arrZong = [{type: 1,tit:'恭喜你，抢到一个甜粽子'},
  {type: 2,tit:'恭喜你，抢到一个咸粽子'},
  {type: 3,tit:'恭喜你，抢到一个原味粽子'},];
  var index = Math.floor((Math.random()*arrZong.length));  
  var div = document.createElement("div");
  var img = document.createElement("img");
  $(img).data("type",arrZong[index].type);
  $(img).data("tip",arrZong[index].tit);
  $(div).append($(img));
  img.className = "roll";
  img.src = src;
  div.style.left = left + "rem";
  div.className = "div";
  document.getElementById("zongBox").appendChild(div);
  setTimeout(function() {
      document.getElementById("zongBox").removeChild(div);
  }, 2000);
}
zong(5,"../assets/images/down.png");
var timer = setInterval(function() {
    var left = Math.random() * 14 .toFixed(4);
    var src = "../assets/images/down.png";
    zong(left, src);
}, 500);
var i = 10;
var activeArr = [];
var countTime = setInterval(function() {
  if(i >= 0){
    $(".count").css("background-image",`url(../assets/images/${i}.png)`);
    i--;
  }else{
    reSetTimer();
  }
}, 1000);
function reSetTimer(){
  clearInterval(countTime);
  clearInterval(timer);
  var obj = {};
  activeArr.forEach(function(value,index){
    obj[value] = [];
  });
  activeArr.forEach(function(value,index){
    obj[value].push(value);
  });
  var canDraw = false;
  for(var j in obj){
    if(obj[j].length >= 3){
      console.log(obj[j][0]);
      canDraw = true;
    }
  }
  if(canDraw){
    showDialog(0)
  }else{
    showDialog(3)
  }
}
function showDialog(state){
  switch (state) {
    case 0:
      $(".model").css("background-image",`url(../assets/images/active.png)`);
      $(".btn-draw").show();
      break;
    case 1:
      $(".model").css("background-image",`url(../assets/images/tea.png)`)
      break;
    case 2:
      $(".model").css("background-image",`url(../assets/images/money.png)`)
      break;
    case 3:
      $(".model").css("background-image",`url(../assets/images/no.png)`)
      break;
    default:
      $(".model").css("background-image",`url(../assets/images/no.png)`)
      break;
  }
  $(".mask").css("display","flex");
};
function drawFun(){
  $.showLoading()
  setTimeout(function() {
    $.hideLoading();
    $(".btn-draw").hide();
    showDialog(1);
  }, 3000)
};
$(function(){
  $("#zongBox").on('click','.div img',function(){
    if(activeArr.length == 5){
      reSetTimer()
      return
    }
    var type = $(this).data("type")
    if(type == 0){
      $.toptip($(this).data("tip"), 1500,'error');
    }else{
      $.toptip($(this).data("tip"), 1500,'success');
      activeArr.push(type);
      $(".footer").find('.no').first().css("background-image",`url(../assets/images/zong-${type}.png)`).removeClass("no"); 
    }
  });
  $(".btn-draw").click(function(){
    drawFun();
  });
  $(".close").click(function(){
    $.toptip('你点击了关闭', 1500,'error');
  });
  $(".mask").on('touchmove',function(){
    return false;
  })
});
