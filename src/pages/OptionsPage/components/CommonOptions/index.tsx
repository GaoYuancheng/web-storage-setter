import React from "react";
import OptionsFormWrapper from "../OptionsForm";

interface Props {}

const CommonOptions: React.FC<Props> = () => {
  return (
    <div>
      <h1>公共设置</h1>
    </div>
    // <OptionsFormWrapper
    //   options={[
    //     {
    //       label: "去除灰度",
    //       name: "removeGray",
    //       type: "checkbox",
    //       formItemProps: {
    //         valuePropName: "checked",
    //       },
    //     },
    //     {
    //       label: "去除设置",
    //       name: "removeSetting",
    //       type: "checkbox",
    //       formItemProps: {
    //         valuePropName: "checked",
    //       },
    //     },
    //   ]}
    //   optionKey="localStorage"
    // />
  );
};

export default CommonOptions;
