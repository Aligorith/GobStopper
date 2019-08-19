// background.js

// Send a message to all the tabs to stop playback
function stopAllPlayback()
{
	console.log("[GobStopper] Stopping All Playback...")
	
	// All tabs with youtube playing a video
	// TODO: Replace this with just a query for the tabs.audible flag
	// TODO: Implement support for storing which ones we muted, so we can restore playback
	chrome.tabs.query({url: '*://www.youtube.com/watch?v*'}, function(tabs) {
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
