// content.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "stop_all_media") {
			for (let video of document.getElementsByTagName("video")) {
				if (!video.paused) {
					video.pause();
				}
			}
		}
	}
);


