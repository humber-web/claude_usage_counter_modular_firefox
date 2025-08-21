async function render(st){
  $("#plan").value = st.plan;
  $("#est").value = st.estimator || "chars4";
  $("#msgs").textContent = st.msgCount;
  $("#toks").textContent = st.tokenCount;
  $("#draft").textContent = st.draftTokens ?? 0;
  $("#fileCount").textContent = st.fileCount || 0;
  $("#fileTokens").textContent = st.fileTokenCount || 0;
  $("#imgCount").textContent = st.imageCount || 0;
  $("#imgTokens").textContent = st.imageTokenCount || 0;
  $("#lastText").textContent = st.lastTextTokens || 0;
  $("#lastFile").textContent = st.lastFileTokens || 0;
  $("#lastImg").textContent = st.lastImageTokens || 0;
  $("#justCount").checked = !!st.justCount;
  $("#countAtt").checked = !!st.countAttachments;
  const quota = QUOTAS[st.plan] ?? QUOTAS.pro;
  $("#left").textContent = Math.max(0, quota - st.msgCount);
  startCountdown(st.timeLeftMs ?? 0);

  const cfg = await getLocal(["bytesPerToken_text","bytesPerToken_pdf","bytesPerToken_docx","bytesPerToken_other",
    "imageCostMode","imageTokens_flat","imageTokens_small","imageTokens_medium","imageTokens_large","imageTokens_huge"]);
  $("#bpt_text").value = cfg.bytesPerToken_text ?? 4;
  $("#bpt_pdf").value = cfg.bytesPerToken_pdf ?? 12;
  $("#bpt_docx").value = cfg.bytesPerToken_docx ?? 10;
  $("#bpt_other").value = cfg.bytesPerToken_other ?? 12;
  $("#imgMode").value = cfg.imageCostMode ?? "byResolution";
  $("#imgFlat").value = cfg.imageTokens_flat ?? 600;
  $("#imgSmall").value = cfg.imageTokens_small ?? 300;
  $("#imgMed").value = cfg.imageTokens_medium ?? 600;
  $("#imgLarge").value = cfg.imageTokens_large ?? 1200;
  $("#imgHuge").value = cfg.imageTokens_huge ?? 2400;
  toggleImgModeUI();
}

async function refresh(){
  const st = await ask({ type: "getState" });
  await render(st);
}

function wireHandlers(){
  // push updates from background when messages are sent / settings change
  chrome.runtime.onMessage.addListener((req)=>{
    if (req && req.type === "stateChanged"){ refresh(); }
  });

  $("#plan").addEventListener("change", async ()=>{ await ask({ type:"setSettings", payload:{ plan: $("#plan").value }}); });
  $("#est").addEventListener("change", async ()=>{ await ask({ type:"setSettings", payload:{ estimator: $("#est").value }}); });
  $("#justCount").addEventListener("change", async ()=>{ await ask({ type:"setSettings", payload:{ justCount: $("#justCount").checked }}); });
  $("#countAtt").addEventListener("change", async ()=>{ await ask({ type:"setSettings", payload:{ countAttachments: $("#countAtt").checked }}); });

  $("#imgMode").addEventListener("change", async ()=>{
    toggleImgModeUI();
    await chrome.storage.local.set({ imageCostMode: $("#imgMode").value });
  });

  $("#save").addEventListener("click", async ()=>{
    const payload = {
      bytesPerToken_text: +$("#bpt_text").value,
      bytesPerToken_pdf: +$("#bpt_pdf").value,
      bytesPerToken_docx: +$("#bpt_docx").value,
      bytesPerToken_other: +$("#bpt_other").value,
      imageCostMode: $("#imgMode").value,
      imageTokens_flat: +$("#imgFlat").value,
      imageTokens_small: +$("#imgSmall").value,
      imageTokens_medium: +$("#imgMed").value,
      imageTokens_large: +$("#imgLarge").value,
      imageTokens_huge: +$("#imgHuge").value
    };
    await chrome.storage.local.set(payload);
    refresh();
  });

  $("#reset").addEventListener("click", async ()=>{ await ask({ type:"resetWindow" }); });
}
