async function ask(msg){ return await new Promise(r=>chrome.runtime.sendMessage(msg, r)); }
async function getLocal(keys){ return await new Promise(r=>chrome.storage.local.get(keys, r)); }
