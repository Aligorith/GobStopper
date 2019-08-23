// background.js

// Send a message to all the tabs to stop playback
function stopAllPlayback()
{
	console.log("[GobStopper] Stopping All Playback...")
	
	// All tabs have "audible = true" set
	//
	// In theory, all of these tabs should have one or more media elements that are generating
	// sound events, so these are the ones we should be targetting for stopping playback.
	//
	// TODO: Implement support for storing which ones we muted, so we can restore playback
	chrome.tabs.query({audible: true}, function(tabs) {
		for (let tab of tabs) {
			chrome.tabs.sendMessage(tab.id, {"message": "stop_all_media"});
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
		stopAllPlayback();
	}
});
