const iconRules = [{
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'medium.com'},
        }),
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'en.wikipedia.org'}
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}];
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules(iconRules);
});

// Receive message from contentScript when bottom of page is reached
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.message == "bottom")
        // window.open("popup.html", window.name, "width=500,height=500,status=no,scrollbars=no,resizable=yes, top=0, left=0");
        chrome.tabs.update({url:"popup.html"}); 
        // create({url:"popup.html"});
        sendResponse({response: "true"});
    }
  );