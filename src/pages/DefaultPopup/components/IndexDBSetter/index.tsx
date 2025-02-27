import { GlobalContext } from "@/models/useGlobalContext";
import { getLocalStorageFunc } from "@/utils";
import { AutoComplete, Form } from "antd";
import React, { useContext, useEffect, useState } from "react";

const nameList = [
  {
    label: "PMS_ZHUANG_ORGANIZATION",
    value: "PMS_ZHUANG_ORGANIZATION",
    children: {
      label: "keyvaluepairs",
      value: "keyvaluepairs",
    },
  },
  {
    label: "PMS_ZHUANG_ORGANIZATION_2.0",
    value: "PMS_ZHUANG_ORGANIZATION_2.0",
    children: {
      label: "keyvaluepairs",
      value: "keyvaluepairs",
    },
  },
  {
    label: "localforage",
    value: "localforage",
    children: {
      label: "keyvaluepairs",
      value: "keyvaluepairs",
    },
  },
];

const IndexDBSetter = () => {
  // const { currentTab } = useContext(GlobalContext);
  // const [userInfo, setUserInfo] = useState<any>({});
  // const { coId } = userInfo;

  // const getUserInfo = async () => {
  //   if (!currentTab?.id) {
  //     return;
  //   }
  //   const [
  //     {
  //       result: { data },
  //     },
  //   ] = await chrome.scripting.executeScript({
  //     target: { tabId: currentTab.id },
  //     func: getLocalStorageFunc,
  //   });

  //   const { currentUser = "{}" } = data;
  //   setUserInfo(JSON.parse(currentUser));
  // };

  // useEffect(() => {
  //   if (!currentTab) {
  //     return;
  //   }
  //   getUserInfo();

  //   console.log("IndexDBSetter");
  // }, []);
  return (
    <Form wrapperCol={{ span: 16 }} labelCol={{ span: 4 }}>
      <Form.Item label="DBname">
        <AutoComplete placeholder="PMS_ZHUANG_ORGANIZATION" />
      </Form.Item>
      <Form.Item label="storeName">
        <AutoComplete placeholder="keyvaluepairs" />
      </Form.Item>
      <Form.Item label="valueKey">
        <AutoComplete placeholder="PMS_ZHUANG_ORGANIZATION_11524" />
      </Form.Item>
    </Form>
  );
};

export default IndexDBSetter;
