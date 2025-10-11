import { message } from "antd";

export const validateObjKey = (obj: Record<string, any>, keys: string[]) => {
  const emptyKey = keys.find((key) => obj[key] === "");

  return {
    emptyKey,
    result: !emptyKey,
  };
};

export const genH5Data = (
  webLS: Record<string, any> = {},

  /** 需要在data中的额外信息 */
  extraParams: {
    serverUrl?: string;
  } & Record<string, any> = {}
): string => {
  const { emptyKey, result } = validateObjKey(webLS, [
    "site3-f-ue",
    "currentUser",
    "accessToken",
    "refreshToken",
  ]);

  if (!result) {
    message.warning(`${emptyKey} 不能为空`);
    return "";
  }

  const {
    "site3-f-ue": token,
    currentUser,
    accessToken: accessToken,
    refreshToken: refreshToken,
  } = webLS;

  const {
    pjId,
    coId,
    pjName,
    subCoName,
    coName,
    currentDepartmentId,
    departmentId,
  } = JSON.parse(currentUser || "{}") || {};

  const orgName = pjName || subCoName || coName;

  const dataObj = {
    user: JSON.stringify({
      accessToken,
      refreshToken,
      pjName: encodeURIComponent(pjName),
      coName: encodeURIComponent(coName),
      pjId,
      currentDepartmentId,
      name: encodeURIComponent(orgName),
      coId,
    }),
    companyId: coId,
    projectId: pjId,
    departId: currentDepartmentId,
    projectDeptId: departmentId,
    departName: encodeURIComponent(subCoName),
    token, // 'site-f3-u'
  };

  Object.assign(dataObj, extraParams || {});

  const dataString = window.btoa(JSON.stringify(dataObj));
  return dataString;
};
