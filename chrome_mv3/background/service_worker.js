// Chrome MV3 Service Worker - combines all background functionality
// Import all background modules using importScripts

importScripts(
  'config.js',
  'utils.js', 
  'badge.js',
  'state.js',
  'bus.js'
);

// Service worker install event
chrome.runtime.onInstalled.addListener((details) => {
  console.log('Claude Usage Counter installed/updated:', details.reason);
  
  // Initialize default settings if needed
  initializeDefaults();
  
  // Set up alarms for 5-hour reset (MV3 alternative to setInterval)
  chrome.alarms.create('resetCounter', {
    delayInMinutes: 300, // 5 hours = 300 minutes
    periodInMinutes: 300
  });
});

// Handle alarms (replaces setTimeout/setInterval from MV2)
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === 'resetCounter') {
    console.log('5-hour auto-reset triggered');
    resetUsageState();
  }
});

// Service worker startup - restore state
chrome.runtime.onStartup.addListener(() => {
  console.log('Service worker starting up');
  // Restore badge from storage
  updateBadgeFromStorage();
});

// Initialize default settings
async function initializeDefaults() {
  const result = await chrome.storage.local.get(['initialized']);
  if (!result.initialized) {
    await chrome.storage.local.set({
      plan: 'pro',
      estimator: 'chars4',
      justCount: false,
      countAtt: false,
      bpt_text: 4,
      bpt_pdf: 12,
      bpt_docx: 10,
      bpt_other: 12,
      imgMode: 'byResolution',
      imgSmall: 300,
      imgMed: 600,
      imgLarge: 1200,
      imgHuge: 2400,
      imgFlat: 600,
      initialized: true
    });
  }
}

// Update badge from storage (for service worker restarts)
async function updateBadgeFromStorage() {
  try {
    const state = await chrome.storage.local.get(['plan', 'msgs']);
    if (state.plan && typeof state.msgs !== 'undefined') {
      updateBadge(state);
    }
  } catch (error) {
    console.error('Error updating badge from storage:', error);
  }
}

console.log('Claude Usage Counter service worker loaded');