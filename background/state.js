async function getState(){
  const st = await new Promise(r => chrome.storage.local.get(DEFAULTS, r));
  // window reset
  if (!st.windowStart || (nowMs() - st.windowStart) >= fiveHoursMs()){
    st.windowStart = nowMs();
    Object.assign(st, {
      msgCount: 0, tokenCount: 0,
      fileCount: 0, imageCount: 0,
      fileTokenCount: 0, imageTokenCount: 0,
      lastTextTokens: 0, lastFileTokens: 0, lastImageTokens: 0,
      draftTokens: 0
    });
    await new Promise(r => chrome.storage.local.set({
      windowStart: st.windowStart,
      msgCount: 0, tokenCount: 0,
      fileCount: 0, imageCount: 0,
      fileTokenCount: 0, imageTokenCount: 0,
      lastTextTokens: 0, lastFileTokens: 0, lastImageTokens: 0,
      draftTokens: 0
    }, r));
  }
  return st;
}

async function bumpCounters(incTokens, attach){
  const st = await getState();
  st.msgCount += 1;
  st.tokenCount += Math.max(0, Math.round(incTokens||0));
  st.lastTextTokens = Math.max(0, Math.round(incTokens||0));

  if (attach){
    st.fileCount += attach.fileCount||0;
    st.imageCount += attach.imageCount||0;
    st.fileTokenCount += attach.fileTokens||0;
    st.imageTokenCount += attach.imageTokens||0;
    st.lastFileTokens = attach.fileTokens||0;
    st.lastImageTokens = attach.imageTokens||0;
  } else {
    st.lastFileTokens = 0; st.lastImageTokens = 0;
  }

  await new Promise(r => chrome.storage.local.set({
    msgCount: st.msgCount, tokenCount: st.tokenCount,
    fileCount: st.fileCount, imageCount: st.imageCount,
    fileTokenCount: st.fileTokenCount, imageTokenCount: st.imageTokenCount,
    lastTextTokens: st.lastTextTokens, lastFileTokens: st.lastFileTokens, lastImageTokens: st.lastImageTokens
  }, r));
  updateBadge(st);
  try { chrome.runtime.sendMessage({ type: "stateChanged" }); } catch(e){}
  return st;
}

// keep badge synced if other scripts change storage
chrome.storage.onChanged && chrome.storage.onChanged.addListener(async (changes, area) => {
  if (area === "local" && (changes.plan || changes.msgCount)) {
    updateBadge(await getState());
  }
});
