const iconRules = [{
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {hostEquals: 'medium.com'},
            pageUrl: {hostEquals: 'wikipedia.org'}
        })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
}];
chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules(iconRules);
});