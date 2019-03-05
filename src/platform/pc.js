import { getCanvas } from "../utils/canvasUtil";
import { DEFAULT_LINE_WEIGHT } from "../config";
let IS_MOUSE_DOWN = false;

export default function pc() {
  let { canvas, ctx } = getCanvas();

  let startX = 0,
    startY = 0,
    startTime = 0;

  //鼠标按下
  canvas.onmousedown = function(e) {
    e.preventDefault();

    console.log("touchstart");
    console.log(e.touches);
    let x = e.clientX;
    let y = e.clientY;
    startX = x;
    startY = y;
    startTime = new Date().getTime();
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "bevel";
    ctx.lineWidth = DEFAULT_LINE_WEIGHT;
    ctx.moveTo(x, y);
    IS_MOUSE_DOWN = true;
  };

  // 鼠标移动
  canvas.onmousemove = e => {
    e.preventDefault();

    console.log("touchmove");
    console.log(e);
    if (!IS_MOUSE_DOWN) return;
    let x = e.clientX;
    let y = e.clientY;
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
  };

  // 鼠标抬起
  canvas.onmouseup = e => {
    e.preventDefault();
    console.log("touchend");
    let x = e.clientX;
    let y = e.clientY;
    startX = x;
    startY = y;
    ctx.moveTo(x, y);
    IS_MOUSE_DOWN = false;
  };
}
