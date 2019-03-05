import {DEFAULT_LINE_WEIGHT,CANVAS_BORDER_WEIGHT,GRID_COLOR,BACKGROUND_COLOR,BUTTON_HEIGHT} from '../config';

export  function initCanvas() {
  //   创建canvas
  let canvas = document.getElementById("canvas");
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let canvasWidth =
    windowHeight > windowWidth ? windowWidth : windowHeight - BUTTON_HEIGHT;
  canvas.height = canvasWidth - CANVAS_BORDER_WEIGHT * 2;
  canvas.width = canvas.height;
  canvas.style.border = CANVAS_BORDER_WEIGHT + "px solid red";
  //绘制网格
  let ctx = canvas.getContext("2d");
  reset(ctx, canvasWidth);
  return true;
}

// 获取canvas
export function getCanvas(){
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let canvasWidth = canvas.width;
  return { canvas, ctx, canvasWidth};

}

//   重置方法
export function reset(ctx, canvasWidth) {
  ctx.clearRect(0, 0, canvasWidth, canvasWidth);
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvasWidth, canvasWidth);
  ctx.lineWidth = 1;
  ctx.fillStyle = GRID_COLOR;
  ctx.beginPath();
  ctx.moveTo((canvasWidth - DEFAULT_LINE_WEIGHT) / 2, 0);
  ctx.lineTo((canvasWidth - DEFAULT_LINE_WEIGHT) / 2, canvasWidth);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(0, (canvasWidth - DEFAULT_LINE_WEIGHT) / 2);
  ctx.lineTo(canvasWidth, (canvasWidth - DEFAULT_LINE_WEIGHT) / 2);
  ctx.stroke();
  ctx.moveTo(0, 0);
}

//   保存方法
export function download(canvas, type) {
  //设置保存图片的类型
  var imgdata = canvas.toDataURL(type);
  //将mime-type改为image/octet-stream,强制让浏览器下载
  var fixtype = function(type) {
    type = type.toLocaleLowerCase().replace(/jpg/i, "jpeg");
    var r = type.match(/png|jpeg|bmp|gif/)[0];
    return "image/" + r;
  };
  imgdata = imgdata.replace(fixtype(type), "image/octet-stream");
  //将图片保存到本地
  var saveFile = function(data, filename) {
    var link = document.createElement("a");
    link.href = data;
    link.download = filename;
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    link.dispatchEvent(event);
  };
  var filename = new Date().getTime() + "." + type;
  console.log(imgdata);
  saveFile(imgdata, filename);
}

