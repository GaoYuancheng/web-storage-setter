import { WSS_CONFIG, WssConfig } from "@/constants";
import { GlobalContext } from "@/models/useGlobalContext";
import { getLocalStorageFunc, setLocalStorageFunc } from "@/utils";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, {
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Checkbox } from "antd";

interface Props {
  // 在localStorage中记录的key
  name: keyof WssConfig;
  children: ReactNode;
}

const ConfigCheckbox: React.FC<Props> = ({ name, children }) => {
  const { currentTab, refresh, currentLocalStorage } =
    useContext(GlobalContext);

  const [checked, setChecked] = useState(false);

  const wssConfigRef = useRef<WssConfig>({});

  const init = async () => {
    if (!currentTab?.id || !currentLocalStorage) return;

    const wssConfig = JSON.parse(currentLocalStorage[WSS_CONFIG] || "{}");
    const { [name]: target } = wssConfig;
    wssConfigRef.current = wssConfig;
    setChecked(!!target);
  };

  const onChange = async (e: CheckboxChangeEvent) => {
    if (!currentTab?.id) return;
    const checked = e.target.checked;
    const storeValue = {
      ...wssConfigRef.current,
      [name]: checked,
    };

    await chrome.scripting.executeScript({
      target: { tabId: currentTab.id },
      func: setLocalStorageFunc,
      args: [{ [WSS_CONFIG]: JSON.stringify(storeValue) }] as any,
    });

    setChecked(e.target.checked);
  };

  useEffect(() => {
    init();
  }, [currentTab]);

  return (
    <Checkbox checked={checked} onChange={onChange}>
      {children}
    </Checkbox>
  );
};

export default ConfigCheckbox;
