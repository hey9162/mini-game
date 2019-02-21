
var LM = {
    alert: {}
}
LM.alert.Wechat = function(t){
    var t = t || '已收藏'
    $('#alertWechat,#alertLoading').remove();
    clearTimeout(LM.alert.Time);
    var alertWechat = '<div id="alertWechat" style=" position:fixed;left:50%;top:45%;transform: translate(-50%,-50%);-webkit-transform: translate(-50%,-50%);-ms-transform: translate(-50%,-50%); -moz-transform: translate(-50%,-50%);text-align:center"><span style="background-color:rgba(0,0,0,.6);padding:0.5rem .75rem;font-size:1rem;min-width:100px;color:#fff;border-radius:10px; box-shadow:0 0 10px rgba(0,0,0,.6);display:inline-block;">'+t+'</span></div>'
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
	if (!searchStr.test(Name)) {
       	return false;
    }else{
    	return true;
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

  function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
  }

  //对图片旋转处理 added by lzk
function rotateImg(img, direction,canvas) {
  //alert(img);
  //最小与最大旋转方向，图片旋转4次后回到原方向
  var min_step = 0;
  var max_step = 3;
  //var img = document.getElementById(pid);
  if (img == null)return;
  //img的高度和宽度不能在img元素隐藏后获取，否则会出错
  var height = img.height;
  var width = img.width;
  //var step = img.getAttribute('step');
  var step = 2;
  if (step == null) {
      step = min_step;
  }
  if (direction == 'right') {
      step++;
      //旋转到原位置，即超过最大值
      step > max_step && (step = min_step);
  } else {
      step--;
      step < min_step && (step = max_step);
  }
  //旋转角度以弧度值为参数
  var degree = step * 90 * Math.PI / 180;
  var ctx = canvas.getContext('2d');
  switch (step) {
      case 0:
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0);
          break;
      case 1:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, 0, -height);
          break;
      case 2:
          canvas.width = width;
          canvas.height = height;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, -height);
          break;
      case 3:
          canvas.width = height;
          canvas.height = width;
          ctx.rotate(degree);
          ctx.drawImage(img, -width, 0);
          break;
  }
}



/**
*旋转iphone拍照变横后的照片
*
* @param {*} o 传入当前的input type=file，一般在change事件里传入this 
* @param {*} callback 回调函数，照片旋转后执行的事件
* @returns
*/
function rotatePhoto(o,callback){
  var file=o.files[0];
  var Orientation = null;
  if (file) {
      console.log("正在上传,请稍后...");
      var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
      if (!rFilter.test(file.type)) {
          //showMyTips("请选择jpeg、png格式的图片", false);
          return;
      }
      // var URL = URL || webkitURL;
      //获取照片方向角属性，用户旋转控制
      EXIF.getData(file, function() {
          // alert(EXIF.pretty(this));
          EXIF.getAllTags(this);
          //alert(EXIF.getTag(this, 'Orientation'));
          Orientation = EXIF.getTag(this, 'Orientation');
          //return;
      });
      var oReader = new FileReader();
      oReader.onload = function(e) {
          //var blob = URL.createObjectURL(file);
          //_compress(blob, file, basePath);
          var image = new Image();
          image.src = e.target.result;
          image.onload = function() {
              var expectWidth = this.naturalWidth;
              var expectHeight = this.naturalHeight;
              if (this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                  expectWidth = 800;
                  expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
              } else if (this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                  expectHeight = 1200;
                  expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
              }
              var canvas = document.createElement("canvas");
              var ctx = canvas.getContext("2d");
              canvas.width = expectWidth;
              canvas.height = expectHeight;
              ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
              var u = navigator.userAgent;
              //修复ios
              if (u.match(/iphone/i)) {
                  // console.log('iphone');
                  //如果方向角不为1，都需要进行旋转 added by lzk
                  if(Orientation != "" && Orientation != 1){
                      // console.log('旋转处理');
                      switch(Orientation){
                          case 6://需要顺时针（向左）90度旋转
                              console.log('需要顺时针（向左）90度旋转');
                              rotateImg(this,'left',canvas);
                              break;
                          case 8://需要逆时针（向右）90度旋转
                              console.log('需要逆时针（向右）90度旋转');
                              rotateImg(this,'right',canvas);
                              break;
                          case 3://需要180度旋转
                              console.log('需要180度旋转');
                              rotateImg(this,'right',canvas);//转两次
                              rotateImg(this,'right',canvas);
                              break;
                      }
                  }
                  //base64 在外定义为全局变量
                  //下面base64为得到旋转后的base64图片
                  base64 = canvas.toDataURL("image/jpeg", 0.8);
                  var type = 'jpeg';
                  var fixtype = function (type) {
                      type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
                      var r = type.match(/png|jpeg|bmp|gif/)[0];
                      return 'image/' + r;
                  };
                  base64 = base64.replace(fixtype(type), 'image/jpeg');
                  // saveFile(base64, '111')  此处是如果想要保存当前图片到本地的话;
                  //这里是把已经旋转过的图片路径赋值到img中
                  callback(base64)
                  
              }  else if (u.indexOf('Android') > -1 || u.indexOf('Adr') > -1) {
                  
                  //如果安卓收到ios拍摄的照片，可以按PC端方式判断
                  callback(e.target.result)

              }
              else{
                  //修复PC端上上传ios拍出来的图片
                  if(Orientation != "" && Orientation != 1){
                      //alert('旋转处理');
                      switch(Orientation){
                          case 6://需要顺时针（向左）90度旋转
                              console.log('需要顺时针（向左）90度旋转');
                              rotateImg(this,'left',canvas);
                              break;
                          case 8://需要逆时针（向右）90度旋转
                              console.log('需要逆时针（向右）90度旋转');
                              rotateImg(this,'right',canvas);
                              break;
                          case 3://需要180度旋转
                              console.log('需要180度旋转');
                              rotateImg(this,'right',canvas);//转两次
                              rotateImg(this,'right',canvas);
                              break;
                      }
                  } 
                  base64 = canvas.toDataURL("image/jpeg", 0.8);
                  var type = 'jpeg';
                  var fixtype = function (type) {
                      type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
                      var r = type.match(/png|jpeg|bmp|gif/)[0];
                      return 'image/' + r;
                  };
                  base64 = base64.replace(fixtype(type), 'image/jpeg');
                  callback(base64)
              }

          };

      };
      oReader.readAsDataURL(file);
  }

}