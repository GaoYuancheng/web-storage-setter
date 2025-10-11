import React, { useContext, CSSProperties, useState } from "react";
import Styles from "./index.module.less";
import classnames from "classnames";
import { GlobalContext } from "@/models/useGlobalContext";
import { Tooltip } from "antd";
import { InfoCircleOutlined, SwapOutlined } from "@ant-design/icons";

interface Props {
  className?: string;
}

type EnvType = "web" | "mobile";

interface UserOrgInfo {
  userName: string;
  orgLevel: string;
  orgName: string;
  orgId: string;
}

const getUserOrgInfo = (curLS: any, type: EnvType): UserOrgInfo | undefined => {
  if (type === "web") {
    const { currentUser = "{}" } = curLS;
    const userInfo = JSON.parse(currentUser);
    const {
      currentDepartmentId,
      subCoName,
      pjId,
      pjName,
      coId,
      coName,
      userName,
    } = userInfo;
    const commonUserInfo = {
      userName: userName,
    };
    // web 项目级
    if (pjId) {
      return {
        ...commonUserInfo,
        orgLevel: "项目级",
        orgName: pjName,
        orgId: pjId,
      };
    }
    // web 子公司级
    if (currentDepartmentId) {
      return {
        ...commonUserInfo,
        orgLevel: "子公司级",
        orgName: subCoName,
        orgId: currentDepartmentId,
      };
    }

    if (coId) {
      return {
        ...commonUserInfo,
        orgLevel: "企业级",
        orgName: coName,
        orgId: coId,
      };
    }
  }

  if (type === "mobile") {
    const {
      USER = "{}",
      DEPARTID = "{}",
      PROJECTID = "{}",
      COMPANYID = "{}",
      COMPANYNAME,
      DEPARTNAME,
      PROJECTNAME,
    } = curLS;
    const { data: user } = JSON.parse(USER || "{}");
    const { data: departId } = JSON.parse(DEPARTID || "{}");
    const { data: projectId } = JSON.parse(PROJECTID || "{}");
    const { data: companyId } = JSON.parse(COMPANYID || "{}");

    const { mName } = user;

    const commonUserInfo = {
      userName: mName,
    };

    if (projectId) {
      return {
        ...commonUserInfo,
        orgLevel: "项目级",
        orgName: PROJECTNAME,
        orgId: projectId,
      };
    }

    if (departId) {
      return {
        ...commonUserInfo,
        orgLevel: "子公司级",
        orgName: DEPARTNAME,
        orgId: departId,
      };
    }

    if (companyId) {
      return {
        ...commonUserInfo,
        orgLevel: "企业级",
        orgName: COMPANYNAME,
        orgId: companyId,
      };
    }
  }

  return undefined;
};

const UserInfo: React.FC<Props> = ({ className = "", ...rest }) => {
  const [envType, setEnvType] = useState<EnvType>("web");
  const { currentLocalStorage = {} } = useContext(GlobalContext);
  const { currentUser = "{}" } = currentLocalStorage;

  const userOrgInfo = getUserOrgInfo(currentLocalStorage, envType);
  const isEmpty = !userOrgInfo;
  const { userName, orgLevel, orgName, orgId } = userOrgInfo || {};
  console.log("🚀 ~ UserInfo ~ userOrgInfo:", userOrgInfo);

  return (
    <div className={classnames(Styles.userInfo, className)} {...rest}>
      <div className={Styles.infoContent}>
        {isEmpty ? (
          <div className={Styles.infoItem}>暂无用户信息</div>
        ) : (
          <>
            <Tooltip title={`用户名：${userName}`}>
              <div className={classnames(Styles.infoItem, Styles.userName)}>
                {userName}
              </div>
            </Tooltip>
            <Tooltip title={`层级：${orgLevel}`}>
              <div className={classnames(Styles.infoItem, Styles.userLevel)}>
                {orgLevel}
              </div>
            </Tooltip>
            <Tooltip title={`组织名称：${orgName}`}>
              <div className={classnames(Styles.infoItem, Styles.orgName)}>
                {orgName}
              </div>
            </Tooltip>
            <Tooltip title={`组织ID：${orgId}`}>
              <div className={classnames(Styles.infoItem, Styles.orgId)}>
                {orgId}
              </div>
            </Tooltip>
          </>
        )}
      </div>
      <div className={Styles.infoExtra}>
        <Tooltip
          getTooltipContainer={(node) => node?.parentNode as HTMLElement}
          placement="bottomLeft"
          title={
            <pre className={Styles.userInfoJson}>
              {JSON.stringify(JSON.parse(currentUser || "{}"), null, 2)}
            </pre>
          }
        >
          <div className={classnames(Styles.infoItem)}>
            <InfoCircleOutlined />
          </div>
        </Tooltip>
        <Tooltip
          getTooltipContainer={(node) => node?.parentNode as HTMLElement}
          placement="bottomLeft"
          title={`当前为 ${envType === "web" ? "web" : "mobile"} 信息 点击切换`}
        >
          <div className={classnames(Styles.infoItem)}>
            <SwapOutlined
              onClick={() =>
                setEnvType((prev) => (prev === "web" ? "mobile" : "web"))
              }
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
};

export default UserInfo;
