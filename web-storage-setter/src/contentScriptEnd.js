const o="WSS_CONFIG",s=()=>{var t,n;var e=document.createElement("style");e.innerHTML=".gray-test-aside{ display: none }",(n=(t=document==null?void 0:document.getElementsByTagName("head"))==null?void 0:t.item(0))==null||n.appendChild(e),console.log("隐藏灰度侧边栏成功！----------")},d=()=>{const e=window.localStorage.getItem(o)||"{}",{fixPmsRootStyle:t,hiddenGrayAside:n}=JSON.parse(e);n&&s()};window!=null&&window.__PMS_CONSOLE__&&d();
//# sourceMappingURL=contentScriptEnd.js.map
