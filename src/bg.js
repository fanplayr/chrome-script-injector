chrome.runtime.onMessage.addListener(function ( request, sender, sendResponse ) {
  sendResponse({ storage: localStorage });
});

// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    id:       "root",
    title:    "Fanplayr",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id:       "script-injector-options",
    parentId: "root",
    title:    "Script Injector",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id:       "expire-session",
    parentId: "root",
    title:    "Expire Session",
    contexts: ["all"]
  });

  chrome.contextMenus.create({
    id:       "show-session-key",
    parentId: "root",
    title:    "Show Session Key",
    contexts: ["all"]
  });
});

chrome.contextMenus.onClicked.addListener(function ( info, tab ) {
  if ( info.menuItemId === "script-injector-options" ) {
    chrome.tabs.create({
      "url": chrome.extension.getURL("src/options.html")
    });
  }
  else if ( info.menuItemId === "expire-session" ) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "expire-session"
      });
    });
  }
  else if ( info.menuItemId === "show-session-key" ) {
    chrome.tabs.query({
      active: true,
      currentWindow: true
    }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {
        action: "show-session-key"
      });
    });
  }
});
