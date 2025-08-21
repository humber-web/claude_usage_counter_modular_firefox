function setBadgeText(text){
  const api = chrome.browserAction || chrome.action;
  if (api && api.setBadgeText) api.setBadgeText({ text });
}
function setBadgeBG(color){
  const api = chrome.browserAction || chrome.action;
  if (api && api.setBadgeBackgroundColor) api.setBadgeBackgroundColor({ color });
}
function updateBadge(st){
  const quota = QUOTAS[st.plan] ?? QUOTAS.pro;
  const remaining = Math.max(0, quota - st.msgCount);
  setBadgeText(String(remaining));
  setBadgeBG("#333");
}
