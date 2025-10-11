export * from "./parse";

// 格式化cookies
export const formatCookieToString = (cookies: any[]) => {
  let cookieString = "";
  cookies.forEach((item) => {
    const { name, value } = item;
    cookieString += `${name}=${value};`;
  });
  return cookieString;
};

// 复制指定内容
export const copyToClipboard = (content: string) => {
  const copy = (e: any) => {
    e.preventDefault();
    e.clipboardData.setData("text/plain", content);
    document.removeEventListener("copy", copy);
  };
  document.addEventListener("copy", copy);
  document.execCommand("Copy");
};

// 获取当前tab
export const getCurrentTab = async () => {
  const queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

// 获取筛选obj中有的key
export const getKeysInObj = (
  obj: Record<string, string>,
  keys: string[]
): string[] => {
  const res: string[] = [];
  keys.forEach((key) => {
    if (obj[key]) res.push(key);
  });
  return res;
};

// 获取 localStorage
export const getLocalStorageFunc = () => {
  // 不使用 ... 就获取不到最新的值
  const res = { ...window.localStorage };
  return { data: res };
};

// 设置 localStorage
export const setLocalStorageFunc = (payload: Record<string, any>) => {
  Object.keys(payload).forEach((key) => {
    window.localStorage.setItem(key, payload[key]);
  });
  return { success: true };
};

// 清空 localStorage
export const clearLocalStorageFunc = () => {
  window.localStorage.clear();

  return { success: true };
};

export const templateForSetLocalStorage = `(() => {
    const params = $1
    Object.keys(params).forEach((key) => {
      window.localStorage.setItem(key, params[key]);
    });
  })()`;

// 根据url获取域名
export const getDomainFromUrl = (url: string) => {
  const domain = url.split("/")[2];
  return domain;
};

// 使用 document.execCommand 获取剪切板内容
export const getClipboardContent = async () => {
  try {
    const res = await navigator.clipboard.readText();
    return res;
  } catch (err) {
    console.log(err);
  }
};
