// The form the user fills out
const submittedForm = document.getElementById("filled-out-form");

// The url the user had visited
var visitedURL = ""

window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // You're at the bottom of the page
      console.log("ContentScript is running");

      // Send message from contentScript to background Script
      chrome.runtime.sendMessage({message: "bottom"}, function(response) {
        console.log(response.response);
      });
    }
};

// Go back to the url the user visited before the form was opened
submittedForm.onsubmit = function(e) {
    e.preventDefault();

    // Get the url the user visited
    chrome.storage.local.get(['visitedUrl'], function(result) {
      console.log('Value currently is ' + result.visitedUrl);
      chrome.tabs.update({url: result.visitedUrl});
    });
}