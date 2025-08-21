function hookSend(){
  const composer = findComposer();
  if (!composer){ setTimeout(hookSend, 800); return; }

  composer.addEventListener("keydown", async (e)=>{
    if (e.key==="Enter" && !e.shiftKey){
      const text = composer.value || composer.innerText || "";
      const attach = await estimateAttachments();
      setTimeout(()=>{
        sendToBG({ type:"messageSent", text, attach });
        clearPendingFiles();
      }, 50);
    }
  });

  const mo = new MutationObserver(()=>{
    const btn = document.querySelector('#send') ||
      Array.from(document.querySelectorAll('button')).find(b => /send|enviar|submit/i.test((b.textContent||b.getAttribute("aria-label")||"")));
    if (btn && !btn.dataset._bound){
      btn.dataset._bound="1";
      btn.addEventListener("click", async ()=>{
        const text = composer.value || composer.innerText || "";
        const attach = await estimateAttachments();
        setTimeout(()=>{
          sendToBG({ type:"messageSent", text, attach });
          clearPendingFiles();
        }, 50);
      });
    }
  });
  mo.observe(document.body,{childList:true,subtree:true});
}
