import { WssConfig } from "@/constants";
const WSS_CONFIG = "WSS_CONFIG";

// 跳过登录
const skipLoginFunc = () => {
  let __PMS_CONSOLE__TEMP__: any;
  // 用来获取 user.type 绕过环境变化的提示 不然在项目级每次切换都会触发弹窗
  const currentUser = window.localStorage.getItem("currentUser") || "{}";
  const currentUserObj = JSON.parse(currentUser);

  Object.defineProperty(window, "__PMS_CONSOLE__", {
    get: function () {
      return __PMS_CONSOLE__TEMP__;
    },
    set: function (newVal) {
      if (newVal?.user) {
        // 去除这个属性 User类中只有get set会报错
        const newCurrentUserObj = { ...currentUserObj };
        delete newCurrentUserObj.businessTypeTitle;
        // 有些应用是根据 __PMS_CONSOLE__.user 获取组织信息，所以需要填充到user上面
        Object.assign(newVal?.user, {
          ...newCurrentUserObj,
          login: () => {},
        });
        // console.log("跳过登录设置成功-----------");
      }
      __PMS_CONSOLE__TEMP__ = newVal;
    },
  });
};

(() => {
  const wssConfigObj = window.localStorage.getItem(WSS_CONFIG) || "{}";

  const { skipPmsLogin } = JSON.parse(wssConfigObj) as WssConfig;
  if (skipPmsLogin) {
    skipLoginFunc();
  }
})();
