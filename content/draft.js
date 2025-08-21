function hookDraftEstimator(){
  const composer = findComposer();
  if (!composer){ setTimeout(hookDraftEstimator, 800); return; }
  let last=-1, tId=null;
  const pump = ()=>{
    const text = composer.value || composer.innerText || "";
    const est = estimateLocal(text);
    if (est !== last){ last=est; sendToBG({ type:"draftEstimate", tokens: est }); }
  };
  const schedule = ()=>{ clearTimeout(tId); tId=setTimeout(pump,120); };
  composer.addEventListener("input", schedule);
  composer.addEventListener("keyup", schedule);
  pump();
}
