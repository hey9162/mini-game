var ctx; //工具
var canvas; //画布
var canalpha = 0;
var ins = true; //是否可以触发insert动画
var num = 0; //针的编号
var angel = [];
var speed = 100; //旋转速度
var over = false; //游戏结束标志
var INTERID; //周期函数ID

var checkPoint = 1;

showRun = true;


function drawmap() {
  var img = document.getElementById("pan");
  ctx.translate(160, 160);
  
  

  ctx.rotate(canalpha);
  ctx.drawImage(img, -72.5, -72.5, 145, 145);
  if (!ins) {
    drawTree(num);
  }
  for (var j = 0; j < angel.length; j++) {
    var tree = document.getElementById("tree");
    if (j - 1 >= 0) {
      ctx.rotate(-angel[j].deg + angel[j - 1].deg);
    } else {
      ctx.rotate(-angel[j].deg);
    }
    ctx.drawImage(tree, -25, 56, 50, 110);
  }
}

function mapact() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  if (!over) {
    
    /**第一关结束 */
    if( checkPoint === 1 && angel.length === 3 && showRun){
      // over = true;
      startPonit(2)
    }
    /**第二关结束 */
    if( checkPoint === 2 && angel.length === 6 && showRun){
      // over = true;
      startPonit(3)
    }

    if( checkPoint === 3 && angel.length === 9){
      end()
      LM.alert.Wechat("恭喜你闯关成功");
      setTimeout(() => {
        window.location.href = "./result.html?result=can_draw"
      }, 2000);
    }

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //清空给定矩形内的指定像素。
    ctx.save(); //方法保存当前图像状态的一份拷贝
    drawmap();
    ctx.restore(); //从栈中弹出存储的图形状态并恢复 CanvasRenderingContext2D 对象的属性、剪切路径和变换矩阵的值。
    overgame();
    if(checkPoint == 1){
      canalpha += (Math.PI / speed)
    }
    if(checkPoint == 2){
      canalpha += Math.PI / speed * 1.5
    }
    if(checkPoint == 3){
      canalpha += Math.PI / speed * 2
    }
    if(canalpha>6.283185307179586){
      canalpha = 0
    }
  } else {
    window.clearInterval(INTERID);
    
  }
}
function drawTree(i) {
  angel.push({ deg: canalpha, num: num++ });
  ins = true;
}
function run() {
  // mapact();
  INTERID = setInterval(mapact, 30);
}

function insert() {
  ins = false;
}
function overgame() {
  //判断游戏是否结束
  if(angel.length>0){
    var bol = angel.every(item => {
      let arr2 = angel.filter(_ => _ != item)
      return arr2.every(itemC => Math.abs(itemC.deg - item.deg) > 0.52)
    })
    if(!bol){
      over = true;
      window.clearInterval(INTERID);
      LM.alert.Wechat("游戏结束")
      setTimeout(function(){
        window.location.href = "./result.html?result=loser"
      },2000);
    }
  }
}

function startPonit(num){
  var $modal = $("#modal");
  $modal.show();
  $modal.find('#checkPoint'+num).show().siblings().hide();
  ins = true;
  // over = true;
  showRun = false;
  $("#ins").prop("disabled",true);
  setTimeout(function(){
    checkPoint = num;
    angel = [];
    $modal.hide();
    over = false;
    showRun = true;
    $("#ins").prop("disabled",false);
    // run()
  },2000);
};
function end(){
  over = true;
  window.clearInterval(INTERID);
  $("#ins").prop("disabled",true);
}