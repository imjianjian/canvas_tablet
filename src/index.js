import mobile from "./platform/mobile";
import pc from "./platform/pc";
import { initCanvas,getCanvas, reset, download } from "./utils/canvasUtil";
import { isMobile } from "./utils/platformUtil";
import {IMAGE_TYPE} from './config';

window.onload = () => {

  initCanvas();
  let {canvas, ctx, canvasWidth} = getCanvas();
  //  清空
  document.getElementById("clear").onclick = () => {
    reset(ctx, canvasWidth);
  };
  // 保存
  document.getElementById("save").onclick = () => {
    download(canvas, IMAGE_TYPE);
  };

  if (isMobile()) mobile();
  else pc();
};
