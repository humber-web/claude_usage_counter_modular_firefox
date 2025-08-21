function sendToBG(msg){ try { chrome.runtime.sendMessage(msg, ()=>{}); } catch(e){} }
function findComposer(){
  return document.querySelector('textarea') ||
         document.querySelector('[contenteditable="true"]') ||
         document.querySelector('#composer');
}
function estimateLocal(text){
  const t = (text||"").trim();
  if (!t) return 0;
  return Math.max(1, Math.ceil(t.length/4));
}
console.log("[UsageCounter] content loaded on", location.href);
