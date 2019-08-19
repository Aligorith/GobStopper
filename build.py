#!/usr/bin/python3
#
# Create zipped-up extension package from the sources directory
# in a single, easy to run operation that doesn't pollute the
# src directory.

import zipfile

##############################################
# Settings - Edit This First

# Version Number
VERSION = None
#VERSION = "0.1.0"

# Targets - The output filenames to save to
TARGETS = ["GobStopper{version_str}.xpi"]

# List of files to include (relative to the "src" directory)
SRC_ROOT = "src/"
SOURCES = [
	"manifest.json",
	
	"background.js",
	"content.js",
	
	"icon.svg",
]

##############################################

# Write zipfiles
versionStr = f"{VERSION}" if VERSION is not None else ""

for targetName in TARGETS:
	targetName = targetName.format(version_str=versionStr)
	print(f"Creating {targetName}...")
	
	with zipfile.ZipFile(targetName, 'w') as zf:
		for fileN in SOURCES:
			path = SRC_ROOT + fileN
			zf.write(path, fileN)

input("Done! Press Enter to continue...")
