const $ = s => document.querySelector(s);
const QUOTAS = { free: 9, pro: 45, max5x: 225, max20x: 900 };
let countdownTimer = null;

function fmt(ms){
  const sec = Math.max(0, Math.floor(ms/1000));
  const h = String(Math.floor(sec/3600)).padStart(2,"0");
  const m = String(Math.floor((sec%3600)/60)).padStart(2,"0");
  const s = String(sec%60).padStart(2,"0");
  return `${h}:${m}:${s}`;
}
function startCountdown(ms){
  clearInterval(countdownTimer);
  $("#countdown").textContent = fmt(ms);
  let left = ms;
  countdownTimer = setInterval(()=>{
    left -= 1000;
    $("#countdown").textContent = fmt(left);
    if (left <= 0){ clearInterval(countdownTimer); refresh(); }
  }, 1000);
}
function toggleImgModeUI(){
  const mode = $("#imgMode").value;
  $("#imgByRes").style.display = (mode === "byResolution") ? "" : "none";
  $("#imgFlatRow").style.display = (mode === "flat") ? "" : "none";
}
