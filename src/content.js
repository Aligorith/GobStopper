// content.js
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === "stop_all_media") {
			// TODO: Stop every video, not just the first one
			var video = document.getElementsByTagName("video")[0];
			if (!video.paused) {
				video.pause();
			}
		}
	}
);


