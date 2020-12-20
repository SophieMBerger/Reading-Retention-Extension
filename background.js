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
        
        // Save the url the user visited
        chrome.storage.local.set({visitedUrl: sender.tab.url}, function() {
            console.log('Value is set to ' + sender.tab.url);
        });

        console.log(sender.tab ?
                    "from a content script:" + sender.tab.url :
                    "from the extension");

        if (request.message == "bottom")
            chrome.tabs.update({url:"popup.html"}); 
            sendResponse({response: "true"});
    }
);