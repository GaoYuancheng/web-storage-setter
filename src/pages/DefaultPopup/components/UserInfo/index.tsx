import React, { useEffect, useContext, useState, CSSProperties } from "react";
import Styles from "./index.module.less";
import classnames from "classnames";
import { GlobalContext } from "@/models/useGlobalContext";
import { getLocalStorageFunc } from "@/utils";
import { Tooltip } from "antd";

interface Props {
  className?: string;
}

interface InfoItem {
  label: string;
  key: string;
  classNames?: string[];
  // toolTip?: boolean;
  style?: CSSProperties;
}

const typeMap: Record<
  string,
  {
    label: string;
    infoList?: InfoItem[];
  }
> = {
  1: {
    label: "企业级",
    infoList: [
      {
        label: "coName",
        key: "coName",
        classNames: [Styles.coPjSubName],
      },
      {
        label: "coId",
        key: "coId",
        classNames: [Styles.coPjSubId],
      },
    ],
  },
  2: {
    label: "项目级",
    infoList: [
      {
        label: "pjName",
        key: "pjName",
        classNames: [Styles.coPjSubName],
      },
      {
        label: "pjId",
        key: "pjId",
        classNames: [Styles.coPjSubId],
      },
    ],
  },
  3: {
    label: "子公司级",
    infoList: [
      {
        label: "subCoName",
        key: "subCoName",
        classNames: [Styles.coPjSubName],
      },
      {
        label: "currentDepartmentId",
        key: "currentDepartmentId",
        classNames: [Styles.coPjSubId],
      },
    ],
  },
  4: {
    label: "个人",
  },
  5: {
    label: "obs",
  },
};

const UserInfo: React.FC<Props> = ({ className = "", ...rest }) => {
  const { currentTab } = useContext(GlobalContext);
  const [userInfo, setUserInfo] = useState<any>({});

  const getUserInfo = async () => {
    if (!currentTab?.id) {
      return;
    }
    const [
      {
        result: { data },
      },
    ] = await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: getLocalStorageFunc,
    });

    const { currentUser = "{}" } = data;
    setUserInfo(JSON.parse(currentUser));
  };

  const infoItemRender = (item: InfoItem) => {
    const { classNames = [], style = {} } = item;
    const childDom = (
      <div className={classnames(Styles.infoItem, classNames)} style={style}>
        {userInfo[item.key]}
      </div>
    );
    return (
      <>
        {/* <Divider type="vertical" /> */}
        <Tooltip title={`${item.label}：${userInfo[item.key]}`} key={item.key}>
          {childDom}
        </Tooltip>
      </>
    );
  };

  useEffect(() => {
    // const
    // 状态管理 加一个当前tab的状态管理
    if (!currentTab) {
      return;
    }
    getUserInfo();
  }, [currentTab]);

  const isEmpty = JSON.stringify(userInfo) === "{}";
  const { type, currentDepartmentId } = userInfo || {};
  const resType = currentDepartmentId ? 3 : type;
  const targetTypeInfo = typeMap[resType as keyof typeof typeMap] || {};

  return (
    <div className={classnames(Styles.userInfo, className)} {...rest}>
      {isEmpty && "暂无用户信息"}
      {!isEmpty && (
        <>
          <Tooltip title={`用户名：${userInfo?.userName}`}>
            <div className={classnames(Styles.infoItem, Styles.userName)}>
              {userInfo?.userName}
            </div>
          </Tooltip>
          {/* <Divider type="vertical" /> */}
          <Tooltip title={`层级：${targetTypeInfo?.label}`}>
            <div className={classnames(Styles.infoItem, Styles.userLevel)}>
              {targetTypeInfo?.label}
            </div>
          </Tooltip>
          {(targetTypeInfo?.infoList || []).map(infoItemRender)}
        </>
      )}
    </div>
  );
};

export default UserInfo;
