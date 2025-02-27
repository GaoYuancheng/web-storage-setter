import { WssConfig } from "@/constants";

const WSS_CONFIG = "WSS_CONFIG";

/**  修复 rootStyle */
const fixPmsRootStyleFunc = () => {
  // @ts-ignore
  const targetDom =
    document.getElementById("root") ||
    document.getElementById("root-slave") ||
    "";

  if (!targetDom) return;
  targetDom.style.display = "block";
  console.log("root-salve样式修复成功！----------");
};

/** 隐藏灰度 */
const hiddenGrayAsideFunc = () => {
  // 初始化时获取不到dom 先暂时写样式
  var style = document.createElement("style");
  style.innerHTML = ".gray-test-aside{ display: none }";
  document?.getElementsByTagName("head")?.item(0)?.appendChild(style);
  console.log("隐藏灰度侧边栏成功！----------");
};

const endInit = () => {
  const wssConfigObj = window.localStorage.getItem(WSS_CONFIG) || "{}";
  const { fixPmsRootStyle, hiddenGrayAside } = JSON.parse(
    wssConfigObj
  ) as WssConfig;
  // if (fixPmsRootStyle) {
  //   // 修复 rootStyle
  //   fixPmsRootStyleFunc();
  // }

  if (hiddenGrayAside) {
    // 隐藏 灰度侧边栏
    hiddenGrayAsideFunc();
  }
};

(() => {
  // @ts-ignore 没有 __PMS_CONSOLE__ 就直接返回
  if (!window?.__PMS_CONSOLE__) return;

  endInit();
})();
