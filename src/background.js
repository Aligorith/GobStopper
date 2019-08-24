// background.js

function isEmptyObject(obj){
	return Object.keys(obj).length === 0 && obj.constructor === Object
}

// Send a message to all the tabs to stop playback
function stopAllPlayback()
{
	console.log("[GobStopper] Stopping All Playback...")
	
	// All tabs have "audible = true" set
	//
	// In theory, all of these tabs should have one or more media elements that are generating
	// sound events, so these are the ones we should be targeting for stopping playback.
	chrome.tabs.query({audible: true}, function(tabs) {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(tab.id, {"message": "pause_all_media"});
		}
	});
}

// Sends a message to restore the previous audio / video play state
function restorePlaybackState(){
	console.log("[GobStopper] Restoring previous streams...")

	chrome.tabs.query({audible: true}, function(tabs) {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(tab.id, {"message": "play_paused_media"});
		}
	});
}

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
	// Send a message to all the tabs to stop playback
	stopAllPlayback();
});

// Called when the user presses the Global Stop-All hotkey.
browser.commands.onCommand.addListener(function(command) {
	if (command == "stop-all") {
		browser.storage.local.get(null, function(item){
			if (!isEmptyObject(item)) {
				restorePlaybackState();
			} else {
				stopAllPlayback();
			}
		});
	}
});