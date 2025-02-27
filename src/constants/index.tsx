// -------------- localStorage
// 默认勾选上的值
export const DEFAULT_SELECT_KEYS = [
  "refreshToken",
  "accessToken",
  "site3-f-ue",
  "currentUser",
];

export const WSS_CONFIG = "WSS_CONFIG";
export const CHROME_STORAGE_OPTION_KEY = "CHROME_STORAGE_OPTION";
export const CHROME_STORAGE_OPTION_LS_KEY = "localStorage";
export interface WssConfig {
  fixPmsRootStyle?: boolean;
  skipPmsLogin?: boolean;
  hiddenGrayAside?: boolean;
}
