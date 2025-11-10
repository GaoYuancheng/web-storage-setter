const user = {
  username: "demo-user",
};

// const getLocalStorage = () => {
//   return window.localStorage;
// };

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   // 2. A page requested user data, respond with a copy of `user`
//   console.log("onMessage", message);
//   if (message.type === "getLocalStorage") {
//     sendResponse(user);
//     // const localStorage = getLocalStorage();
//     // sendResponse(localStorage);
//   }
// });

console.log("LocalStorageSetter background");
