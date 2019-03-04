const DEFAULT_LINE_WEIGHT = 10;
const CANVAS_BORDER_WEIGHT = 4;
const GRID_COLOR = "rgba(0, 0, 200, 0.5)";
const BACKGROUND_COLOR = "rgb(255, 255, 255)";
const IMAGE_TYPE = "png";
const BUTTON_HEIGHT = 60;

function initCanvas() {
  //   创建canvas
  let canvas = document.getElementById("canvas");
  let windowHeight = window.innerHeight;
  let windowWidth = window.innerWidth;
  let canvasWidth = windowHeight > windowWidth ? windowWidth : windowHeight-BUTTON_HEIGHT;
  canvas.height = canvasWidth - CANVAS_BORDER_WEIGHT * 2;
  canvas.width = canvas.height;
  canvas.style.border = CANVAS_BORDER_WEIGHT +"px solid red";
  // canvas.style.margin = "0 " + (windowWidth - canvasWidth) / 2 + "px";
  //绘制网格
  let ctx = canvas.getContext("2d");
  reset(ctx, canvasWidth);
  return { canvas, ctx, canvasWidth, windowHeight, windowWidth };
}

//   重置方法
function reset(ctx, canvasWidth) {
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
function download(canvas, type) {
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

window.onload = () => {
  let { canvas, ctx, canvasWidth, windowHeight, windowWidth } = initCanvas();

  let startX = 0,
    startY = 0,
    startTime = 0;

  //  清空
  document.getElementById("clear").onclick = () => {
    reset(ctx, canvasWidth);
  };
  // 保存
  document.getElementById("save").onclick = () => {
    download(canvas, IMAGE_TYPE);
  };

  // 监听触摸开始
  canvas.addEventListener("touchstart", e => {
    e.preventDefault();

    console.log("touchstart");
    console.log(e.touches);
    let x = e.touches[0].clientX;
    let y = e.touches[0].clientY;
    if (e.touches.length > 0) {
      startX = x;
      startY = y;
      startTime = new Date().getTime();
      ctx.beginPath();
      ctx.lineCap = "round";
      ctx.lineJoin = "bevel";
      ctx.lineWidth = DEFAULT_LINE_WEIGHT;
      ctx.moveTo(x, y);
    }
  });

  // 监听触摸移动事件
  canvas.addEventListener("touchmove", e => {
    e.preventDefault();

    console.log("touchmove");
    console.log(e.touches);
    if (e.touches.length > 0) {
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      let endTime = new Date().getTime();
      let t = endTime - startTime;
      let s = Math.sqrt(
        (x - startX) * (x - startX) + (y - startY) * (y - startY)
      );
      // 计算笔速
      let v = s / t;
      // 笔速越快线条月窄
      ctx.lineWidth = DEFAULT_LINE_WEIGHT + v * 4;
      // 记录当前位置和时间
      startX = x;
      startY = y;
      startTime = new Date().getTime();

      ctx.lineTo(x, y);
      ctx.stroke();
    }
  });

  // 监听触摸结束
  canvas.addEventListener("touchend", e => {
    e.preventDefault();
    console.log("touchend");
    console.log(e.touches);
    if (e.touches.length > 0) {
      let x = e.touches[0].clientX;
      let y = e.touches[0].clientY;
      startX = x;
      startY = y;
      startTime = new Date().getTime();
      ctx.moveTo(x, y);
    }
  });
};
