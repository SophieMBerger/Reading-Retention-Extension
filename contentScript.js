window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
      // you're at the bottom of the page
      console.log("ContentScript is running");

      // Send message form contentScript to background Script
      chrome.runtime.sendMessage({message: "bottom"}, function(response) {
        console.log(response.response);
      });
    }
};