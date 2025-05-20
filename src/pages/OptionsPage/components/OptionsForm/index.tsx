import { Checkbox, CheckboxProps, Form, FormItemProps, InputProps } from "antd";
import React, { useEffect } from "react";
import { CHROME_STORAGE_OPTION_KEY } from "../../_data";
import { debounce } from "lodash";

interface CommonOptions {
  name: string;
  label: string;
  formItemProps?: FormItemProps;
}

interface CheckboxOptions extends CommonOptions {
  type: "checkbox";
  fieldProps?: CheckboxProps;
}

interface InputOptions extends CommonOptions {
  type: "input";
  fieldProps?: InputProps;
}

export type Options = InputOptions | CheckboxOptions;

interface Props {
  optionKey: string;
  options: Options[];
}

const OptionsFormWrapper: React.FC<Props> = ({ optionKey, options }) => {
  const [form] = Form.useForm();

  const renderFormItemContent = (item: Options) => {
    const { type } = item;
    if (type === "checkbox") {
      const { fieldProps } = item;
      return <Checkbox {...fieldProps} />;
    }
  };

  // 设置当前配置
  const setTargetOption = async (value: any) => {
    const { [CHROME_STORAGE_OPTION_KEY]: allOptions } =
      await chrome.storage.local.get(CHROME_STORAGE_OPTION_KEY);
    const res = {
      ...allOptions,
      [optionKey]: value,
    };
    await chrome.storage.local.set({
      [CHROME_STORAGE_OPTION_KEY]: res,
    });
  };

  const init = async () => {
    const {
      [CHROME_STORAGE_OPTION_KEY]: { [optionKey]: data },
    } = await chrome.storage.local.get(CHROME_STORAGE_OPTION_KEY);
    // TODO:  根据默认值设置处理 formData
    form.setFieldsValue(data);
  };

  const onValuesChange = debounce(async (changedValues, values) => {
    setTargetOption(values);
  }, 300);

  useEffect(() => {
    init();
  }, []);

  return (
    <Form layout="inline" form={form} onValuesChange={onValuesChange}>
      {options.map((item) => {
        const { formItemProps = {} } = item;
        return (
          <Form.Item
            name={item.name}
            key={item.name}
            label={item.label}
            {...formItemProps}
          >
            {renderFormItemContent(item)}
          </Form.Item>
        );
      })}
    </Form>
  );
};

export default OptionsFormWrapper;
