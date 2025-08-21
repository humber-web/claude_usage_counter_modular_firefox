// Capture files and estimate attachment tokens
let pendingFiles = [];

function hookAttachmentInputs(){
  document.addEventListener("change", (e)=>{
    const el = e.target;
    if (el && el.tagName === "INPUT" && el.type === "file" && el.files){
      for (const f of el.files) pendingFiles.push(f);
    }
  }, true);

  document.addEventListener("drop", (e)=>{
    if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length){
      for (const f of e.dataTransfer.files) pendingFiles.push(f);
    }
  }, true);
}

async function estimateAttachments(){
  const cfg = await new Promise(r => chrome.storage.local.get({
    bytesPerToken_text: 4, bytesPerToken_pdf: 12, bytesPerToken_docx: 10, bytesPerToken_other: 12,
    imageCostMode: "byResolution", imageTokens_flat: 600,
    imageTokens_small: 300, imageTokens_medium: 600, imageTokens_large: 1200, imageTokens_huge: 2400
  }, r));
  let fileTokens=0, imageTokens=0, fileCount=0, imageCount=0;

  async function getImageMP(file){
    try{
      const url = URL.createObjectURL(file);
      const img = new Image();
      const p = new Promise((res)=>{
        img.onload = ()=>{ const mp = (img.naturalWidth*img.naturalHeight)/1e6; URL.revokeObjectURL(url); res(mp||0); };
        img.onerror = ()=>{ URL.revokeObjectURL(url); res(0); };
      });
      img.src = url;
      return await p;
    }catch(e){ return 0; }
  }

  for (const f of pendingFiles){
    const name = (f.name||"").toLowerCase();
    const type = (f.type||"").toLowerCase();
    const bytes = f.size||0;

    if (type.startsWith("image/") || /\.(png|jpe?g|webp|gif|bmp|tiff?)$/.test(name)){
      imageCount++;
      if (cfg.imageCostMode === "flat"){
        imageTokens += cfg.imageTokens_flat;
      } else {
        const mp = await getImageMP(f);
        let add = cfg.imageTokens_small;
        if (mp >= 6) add = cfg.imageTokens_huge;
        else if (mp >= 2) add = cfg.imageTokens_large;
        else if (mp >= 1) add = cfg.imageTokens_medium;
        imageTokens += add;
      }
      continue;
    }

    if (type.startsWith("text/") || /\.(txt|md|csv|json|log)$/i.test(name)){
      fileCount++; fileTokens += Math.ceil(bytes / (cfg.bytesPerToken_text||4)); continue;
    }
    if (type === "application/pdf" || name.endsWith(".pdf")){
      fileCount++; fileTokens += Math.ceil(bytes / (cfg.bytesPerToken_pdf||12)); continue;
    }
    if (/(vnd\.openxmlformats|vnd\.ms-)/.test(type) || /\.(docx|xlsx|pptx|doc|xls|ppt)$/i.test(name)){
      fileCount++; fileTokens += Math.ceil(bytes / (cfg.bytesPerToken_docx||10)); continue;
    }
    fileCount++; fileTokens += Math.ceil(bytes / (cfg.bytesPerToken_other||12));
  }

  return { fileTokens, imageTokens, fileCount, imageCount };
}

function clearPendingFiles(){ pendingFiles = []; }
