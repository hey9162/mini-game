function startOrStop(a){var e=$(".ball");a?(isRun=!0,$(".start-btn").addClass("disabled-btn"),$(".start-btn img").length&&$(".start-btn img").remove(),e.each(function(a){a>9&&(a=1),$(this).addClass("strike"+(a+1))})):(isRun=!1,$(".start-btn").removeClass("disabled-btn"),e.each(function(a){a>9&&(a=1),$(this).removeClass("strike"+(a+1))}))}function transHtml(a,e){var i=[];return a.length&&!e?(a.forEach(function(a){i.push('<img class="jq" src="'+a.url+'" />')}),i.join("")):e&&a.length>0?(a.forEach(function(a){var e=a.name;e&&e.length>5&&(e=e.substring(0,5)),i.push("<li>"+(e?e:"")+"已成功兑换减轻茶一盒</li>")}),i.join("")):void 0}function showModal(a){var e=$(".center-modal"),i=e.find(".img"),s=e.find(".button-img"),t=$("#bottomJq");i.attr("src",a.url),$(".mask").show(),e.show(),a.close?(e.find(".close").show(),e.find(".close").bind("click",function(){hideModal()})):(e.find(".close").hide(),e.find(".close").unbind("click")),a.isShare&&i.bind("click.share",function(){hideModal(),i.unbind("click.share")}),a.time&&setTimeout(function(){hideModal()},a.time),a.isMoney&&i.bind("click.money",function(){hideModal(),LM.alert.Wechat("红包24小时到账"),i.unbind("click.money")}),a.color&&($("#jqBox").html(transHtml(pageData.jq)),4==pageData.jq.length?$(".but-exchange").removeClass("disabled"):$(".but-exchange").addClass("disabled"),t.attr("src",a.bottomurl),t.show(),i.bind("click.color",function(){hideModal();var a=setTimeout(function(){t.attr("src",""),t.hide(),clearTimeout(a)},2e3);i.unbind("click.color")})),a.isCard&&(i.css({width:"80%"}),e.css({"text-align":"center"}),s.show(),s.bind("click.card",function(){s.hide(),hideModal(),showModal(modalData.share),s.unbind("click.card")}))}function hideModal(){$(".mask").hide(),$(".center-modal").hide(),$(".center-modal img").attr("src","")}function goPage(a){window.location.href="./"+a}function initPage(){pageData.isShowRecord&&(pageData.count=0,$("#hist").show().bind("click",function(){window.location.href="./hist.html"})),0==pageData.count&&($(".start-btn").addClass("disabled-btn"),$(".start-btn img").length&&$(".start-btn img").hide()),pageData.isShowRecord||$("#jqBox").html(transHtml(pageData.jq)),$(".carousel").html(transHtml(pageData.slideshow,!0)),$("#count").text(pageData.count),4!=pageData.jq.length||pageData.isShowRecord?$(".but-exchange").addClass("disabled"):$(".but-exchange").removeClass("disabled")}function transJq(a){var e=[];return a&&a.length?(a.forEach(function(a){e.push({url:imgBase+"/images/j"+a+".png",type:a})}),e):void 0}var imgBase="https://web.rrzuzu.com/WebStatic/jianqing/wx-test",pageData={jq:[{url:imgBase+"/images/j1.png",type:1},{url:imgBase+"/images/j2.png",type:2},{url:imgBase+"/images/j3.png",type:3},{url:imgBase+"/images/j4.png",type:4}],count:8,isShowHist:!1,slideshow:[],isShowRecord:""},modalData={share:{url:imgBase+"/images/share.png",isShare:!0},rules:{url:imgBase+"/images/rule-text.png",close:!0},money:{url:imgBase+"/images/money.png",isMoney:!0},black:{url:imgBase+"/images/black.png",color:"black",bottomurl:imgBase+"/images/jq1-black.png",jqBoxImg:imgBase+"/images/j1.png",type:1},blue:{url:imgBase+"/images/blue.png",color:"blue",bottomurl:imgBase+"/images/jq2-blue.png",jqBoxImg:imgBase+"/images/j2.png",type:2},pink:{url:imgBase+"/images/pink.png",color:"pink",bottomurl:imgBase+"/images/jq3-pink.png",jqBoxImg:imgBase+"/images/j3.png",type:3},green:{url:imgBase+"/images/green.png",color:"green",bottomurl:imgBase+"/images/jq4-green.png",jqBoxImg:imgBase+"/images/j4.png",type:4},card1:{url:imgBase+"/images/card1.png",isCard:!0,close:!0},card2:{url:imgBase+"/images/card2.png",isCard:!0,close:!0},card3:{url:imgBase+"/images/card3.png",isCard:!0,close:!0},card4:{url:imgBase+"/images/card4.png",isCard:!0,close:!0},card5:{url:imgBase+"/images/card5.png",isCard:!0,close:!0}},isRun=!1;