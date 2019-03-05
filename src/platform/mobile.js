import {getCanvas} from '../utils/canvasUtil';
import {DEFAULT_LINE_WEIGHT} from '../config';

export default function mobile() {
  let { canvas, ctx } = getCanvas();

  let startX = 0,
    startY = 0,
    startTime = 0;

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
      ctx.moveTo(x, y);
    }
  });
}
