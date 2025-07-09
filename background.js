let activeTabId = null;
let activeDomain = null;
let startTime = null;

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  await switchTab(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  if (tab.active && changeInfo.status === 'complete') {
    await switchTab(tabId);
  }
});

async function switchTab(tabId) {
  const tab = await chrome.tabs.get(tabId);
  const url = new URL(tab.url || '');
  const domain = url.hostname;

  if (activeDomain) {
    const duration = Math.floor((Date.now() - startTime) / 1000);
    saveTime(activeDomain, duration);
  }

  activeTabId = tabId;
  activeDomain = domain;
  startTime = Date.now();
}

function saveTime(domain, seconds) {
  chrome.storage.local.get(['siteTimes'], (data) => {
    const siteTimes = data.siteTimes || {};
    siteTimes[domain] = (siteTimes[domain] || 0) + seconds;
    chrome.storage.local.set({ siteTimes });
  });
}
