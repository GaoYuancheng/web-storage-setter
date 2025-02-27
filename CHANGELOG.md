### v0.0.1

支持 localStorage 在页面见的转移
使用方式见 README.md

### v0.0.2

- 切换存储域名时 也会选中默认的 key

- 排序改为按时间倒排

### v0.0.3

- 使用 chrome.scripting.executeScript 方法代替 content_scripts

- 做到不用重启浏览器也能直接运行插件

### v0.0.4

- vite 升级到 v4 版本
- 修改图片存放路径，解决打包后图片资源引用不到问题

> copyTarget 不能和 outdir 一个目录，会被编译产物覆盖

### v0.0.5

- 默认开启 sourceMap

- 增加用户信息展示

- 使用 Context 存储当前 tab 信息

### v0.0.6

- 新增复制 set 方法，可以跨浏览器设置 localStorage

### v0.0.7

- localStorage 获取提升到 store 中
- 拆分 contentScripts 为 start 和 end
- 新增新框架跳过登录功能
- 新增修复新框架本地样式功能
- 布局更新

### v0.0.8

- LS 选中逻辑调整，切换域名时重新计算选中
- 新增设置页
  - 默认全选功能

### v0.0.9

- 修改了分公司的人员信息展示 原先是通过 userInfo.type 判断 现在改为 currentDepartmentId 来判断

### v0.0.10

- 去除 修复 root 样式
- 新增 隐藏灰度侧边栏

### v0.0.11

- 修复 现在页面加载时也能正常使用功能
- 新增 用户信息栏支持查看所有信息
