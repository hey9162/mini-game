var imgBase = 'https://web.rrzuzu.com/WebStatic/jianqing/wx-test'
var pageData = {
  jq: [
    {url: imgBase+'/images/j1.png',type:1},
    {url: imgBase+'/images/j2.png',type:2},
    {url: imgBase+'/images/j3.png',type:3},
    {url: imgBase+'/images/j4.png',type:4}
  ],
  count:8,
  isShowHist: false,
  slideshow:[],
  isShowRecord:''
};
var modalData = {
  share:{url:imgBase+'/images/share.png',isShare:true},
  rules:{url:imgBase+'/images/rule-text.png',close:true},
  money:{ url:imgBase+'/images/money.png',isMoney:true },
  black:{ url:imgBase+'/images/black.png',color:'black',
  bottomurl:imgBase+'/images/jq1-black.png',jqBoxImg:imgBase+'/images/j1.png',type:1},
  blue:{ url:imgBase+'/images/blue.png',color:'blue',
  bottomurl:imgBase+'/images/jq2-blue.png',jqBoxImg:imgBase+'/images/j2.png',type:2},
  pink:{ url:imgBase+'/images/pink.png',color:'pink',
  bottomurl:imgBase+'/images/jq3-pink.png',jqBoxImg:imgBase+'/images/j3.png',type:3},
  green:{ url:imgBase+'/images/green.png',color:'green',
  bottomurl:imgBase+'/images/jq4-green.png',jqBoxImg:imgBase+'/images/j4.png',type:4},
  card1:{ url:imgBase+'/images/card1.png',isCard:true,close:true},
  card2:{ url:imgBase+'/images/card2.png',isCard:true,close:true},
  card3:{ url:imgBase+'/images/card3.png',isCard:true,close:true},
  card4:{ url:imgBase+'/images/card4.png',isCard:true,close:true},
  card5:{ url:imgBase+'/images/card5.png',isCard:true,close:true}
};
var isRun = false;
function startOrStop(isSatrt){
  var ball = $('.ball');
  if(isSatrt){
    isRun = true;
    $(".start-btn").addClass('disabled-btn');
    if($(".start-btn img").length){$(".start-btn img").remove()}
    ball.each(function(i){
      if(i>9){i=1};
      $(this).addClass('strike'+(i+1));
    });
  }else{
    isRun = false;
    $(".start-btn").removeClass('disabled-btn');
    ball.each(function(i){
      if(i>9){i=1};
      $(this).removeClass('strike'+(i+1));
    });
  }
}
function transHtml(jqArr,isCarousel){
  var htmlStr = [];
  if(jqArr.length && !isCarousel){
    jqArr.forEach(function(jq){
      htmlStr.push('<img class="jq" src="'+jq.url+'" />')
    });
    return htmlStr.join('');
  }
  if(isCarousel && jqArr.length>0){
    jqArr.forEach(function(carousel){
      var name = carousel.name;
      if(name && name.length > 5){
        name=name.substring(0,5);
      }
      htmlStr.push('<li>'+(name?name:'')+'已成功兑换减轻茶一盒</li>')
    });
    return htmlStr.join('');
  }
};
function showModal(config){
  var modal = $('.center-modal');
  var img = modal.find('.img');
  var button = modal.find('.button-img')
  var bottonImg = $('#bottomJq');
  img.attr("src",config.url);
  $(".mask").show();
  modal.show();
  if(config.close){
    modal.find('.close').show();
    modal.find('.close').bind('click',function(){
      hideModal();
    });
  }else{
    modal.find('.close').hide();
    modal.find('.close').unbind('click');
  }
  if(config.isShare){
    img.bind('click.share',function(){
      hideModal();
      img.unbind('click.share');
    });
  }
  if(config.time){
    setTimeout(function(){
      hideModal();
    }, config.time);
  }
  if(config.isMoney){
    img.bind('click.money',function(){
      hideModal();
      LM.alert.Wechat('红包24小时到账');
      img.unbind('click.money');
    });
  };
  if(config.color){
    $('#jqBox').html(transHtml(pageData.jq));
    if(pageData.jq.length == 4){ $(".but-exchange").removeClass("disabled");}else{
      $(".but-exchange").addClass("disabled");
    };
    bottonImg.attr("src",config.bottomurl);
    bottonImg.show()
    img.bind('click.color',function(){
      hideModal();
      var timer = setTimeout(function(){
        bottonImg.attr("src",'');
        bottonImg.hide();
        clearTimeout(timer);
      },2000)
      img.unbind('click.color');
    });
  }
  if(config.isCard){
    img.css({ "width": "80%" });
    modal.css({ "text-align": "center" });
    button.show();
    button.bind('click.card',function(){
      button.hide();
      hideModal();
      showModal(modalData.share);
      button.unbind('click.card');
    });
  }
};
function hideModal(){
  $(".mask").hide();
  $('.center-modal').hide();
  $('.center-modal img').attr("src",'')
}

function goPage(pageUrl){
  window.location.href = './'+ pageUrl;
}
function initPage(){
  if(pageData.isShowRecord){
    pageData.count = 0;
    $("#hist").show().bind('click',function(){
      window.location.href = "./hist.html";
    })
  }
  if(pageData.count == 0){
    $(".start-btn").addClass('disabled-btn');
    if($(".start-btn img").length){$(".start-btn img").hide()}
  }
  if(!pageData.isShowRecord){
    $('#jqBox').html(transHtml(pageData.jq));
  }
  $('.carousel').html(transHtml(pageData.slideshow,true));
  $("#count").text(pageData.count);
  if(pageData.jq.length == 4 && !pageData.isShowRecord){
    $(".but-exchange").removeClass("disabled");
  }else{
    $(".but-exchange").addClass("disabled");
  };
}
function transJq(arr){
  var newArr = [];
  if(arr && arr.length){
    arr.forEach(function (ele) {
      newArr.push({url: imgBase+'/images/j'+ele+'.png',type:ele});
    })
    return newArr;
  }
}