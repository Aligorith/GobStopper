// content.js

// Gets all elements by the given names and return them as an array
function GetElementCollectionByTagNames(names){
	elements = [];
	names.forEach(function(name){
		for (let video of document.getElementsByTagName(name)) {
			elements.push(video);
		}
	});
	return elements;
}

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		// First, get all possibly affected elements
		mediaElements = GetElementCollectionByTagNames(["video","audio"])
		
		// Pause playback
		if (request.message === "pause_all_media") {
			pausedSources = [];
			mediaElements.forEach(function(media){
				if (!media.paused) {
					media.pause();
					pausedSources.push(media.currentSrc)
				}
			});
			browser.storage.local.set({"PausedSources": pausedSources});
		}

		// Restart playback
		if (request.message === "play_paused_media") {
			browser.storage.local.get("PausedSources", function(data){
				mediaElements.forEach(function(media){
					if ((media.paused) && (data.PausedSources.indexOf(media.currentSrc) > -1)) {
						media.play();
					}
				});
			});
			// no need to keep the paused sources, everything is in play back mode again
			browser.storage.local.clear();
		}
	}
);