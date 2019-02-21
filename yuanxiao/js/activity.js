var imgBase = 'https://web.rrzuzu.com/WebStatic/jianqing/wx-test'
var modalData = {
  rules:{type:'rule'},
  money:{ type:'money' },
  jq:{type:'jq'},
  not:{type:'not'},
  fail:{type:'fail'},
  succ:{type:'succ'},
  get:{type:'get'}
};
function goPage(pageUrl){
  window.location.href = './'+ pageUrl;
}

function showModal(config,tip){
  $(".center-modal").show()
  $('.mask').show();
  switch (config.type) {
    case 'fail':
      $(".center-modal").addClass('fail');
      $(".center-modal .tip").html(tip).show();
      $('.center-modal .again').show();
      $('.center-modal .img').show();
      break;
      case 'succ':
      $(".center-modal").addClass('succ');
      $(".center-modal .tip").html(tip).show();
      $('.center-modal .get2').show();
      $('.center-modal .img').show();
      break;
      case 'jq':
      $(".center-modal").addClass('jq');
      $(".center-modal img").hide();
      $(".center-modal .tip").hide();
      $('.center-modal .get1').show();
      break;
      case 'money':
      $(".center-modal").addClass('money');
      break;
      case 'not':
      $(".center-modal").addClass('not');
      $(".center-modal img").hide();
      $(".center-modal .tip").hide();
      $('.center-modal .continue').show();
      break;
      case 'get':
      $(".center-modal").addClass('get');
      $(".center-modal .yao").show();
      $(".center-modal .yao-img").show();
      break;
      case 'rule':
      $(".center-modal").addClass('rules');
      $(".rules").click(function(){
        hideModal();
      })
      break;
    default:
      break;
  }
};

function hideModal(){
  $(".center-modal").hide();
  $('.mask').hide();
  $(".center-modal img,.center-modal .tip,.center-modal .btn,.center-modal .yao").hide();
};