// content.js

// Gets all elements by the given name and return them as an array
function GetElementCollectionByTagNames(names){
	elements = [];
	names.forEach(function(name){
		for (let video of document.getElementsByTagName(name)) {
			elements.push(video);
		}	
	})
	return elements;
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		
		// First, get all possibly affected elements
		mediaElements = GetElementCollectionByTagNames(["video","audio"])
		
		// Pause playback
		if (request.message === "pause_all_media") {
			pausedSrcs = {};
			mediaElements.forEach(function(media){
				if (!media.paused) {
					pausedSrcs[media.currentSrc] = media.currentSrc
					media.pause();
				}
			})
			browser.storage.local.set(pausedSrcs);
		}

		// Restart playback
		if (request.message === "play_paused_media") {
			console.log("here");
			mediaElements.forEach(function(media){
				if (media.paused) {
					browser.storage.local.get(media.currentSrc, function(src){
						console.log("entry in storage found");
						media.play();
					})
				}
			})
			browser.storage.local.clear();
		}
	}
);
