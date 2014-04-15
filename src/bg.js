chrome.runtime.onMessage.addListener(function ( request, sender, sendResponse ) {
  sendResponse({ storage: localStorage });
});

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id:       "options",
    title:    "Fanplayr Script Injector",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(function ( info, tab ) {
  if ( info.menuItemId === "options" ) {
    chrome.tabs.create({
      "url": chrome.extension.getURL("src/options.html")
    });
  }
});
