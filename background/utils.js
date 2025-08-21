function nowMs(){ return Date.now(); }
function fiveHoursMs(){ return 5*60*60*1000; }

function estimateTokensLocal(text, mode="chars4"){
  const t = (text||"").trim();
  if (!t) return 0;
  if (mode === "words13"){
    const words = t.split(/\s+/).filter(Boolean).length;
    return Math.round(words * 1.3);
  }
  return Math.max(1, Math.ceil(t.length/4));
}

function timeLeftMsFrom(st){ return Math.max(0, (st.windowStart + fiveHoursMs()) - Date.now()); }
