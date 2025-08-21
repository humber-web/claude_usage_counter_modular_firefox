chrome.runtime.onMessage.addListener((req, _sender, sendResponse) => {
  (async () => {
    if (req.type === "getState") {
      const st = await getState();
      st.timeLeftMs = timeLeftMsFrom(st);
      sendResponse(st); return;
    }
    if (req.type === "setSettings") {
      await new Promise(r => chrome.storage.local.set(req.payload || {}, r));
      const st = await getState();
      st.timeLeftMs = timeLeftMsFrom(st);
      updateBadge(st);
      try { chrome.runtime.sendMessage({ type: "stateChanged" }); } catch(e){}
      sendResponse(st); return;
    }
    if (req.type === "messageSent" || req.type === "bubbleDetected") {
      const st = await getState();
      const inc = st.justCount ? 0 : estimateTokensLocal(req.text || "", st.estimator);
      const attach = (st.countAttachments && req.attach) ? req.attach : null;
      const after = await bumpCounters(inc, attach);
      after.timeLeftMs = timeLeftMsFrom(after);
      sendResponse(after); return;
    }
    if (req.type === "draftEstimate") {
      await new Promise(r => chrome.storage.local.set({ draftTokens: req.tokens|0 }, r));
      try { chrome.runtime.sendMessage({ type: "stateChanged" }); } catch(e){}
      sendResponse({ ok: true }); return;
    }
    if (req.type === "resetWindow") {
      const now = Date.now();
      await new Promise(r => chrome.storage.local.set({
        windowStart: now, msgCount: 0, tokenCount: 0,
        fileCount: 0, imageCount: 0, fileTokenCount: 0, imageTokenCount: 0,
        lastTextTokens: 0, lastFileTokens: 0, lastImageTokens: 0,
        draftTokens: 0
      }, r));
      const st = await getState();
      st.timeLeftMs = timeLeftMsFrom(st);
      updateBadge(st);
      try { chrome.runtime.sendMessage({ type: "stateChanged" }); } catch(e){}
      sendResponse(st); return;
    }
  })();
  return true;
});
