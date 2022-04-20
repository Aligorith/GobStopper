#!/usr/bin/python3
#
# Create zipped-up extension package from the sources directory
# in a single, easy to run operation that doesn't pollute the
# src directory.

import json
import shutil
import zipfile

##############################################
# Settings - Edit This First

# Include Version Number
INCLUDE_VERSION = True
#INCLUDE_VERSION = False

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
# Utilities

# Read version string from manifest
# > returns: (str) Version number string
def getVersionString():
	if INCLUDE_VERSION:
		# Read manifest to find the current version number
		with open("src/manifest.json") as f:
			manifest = json.load(f)
		
		# Read the version string
		versionStr = manifest["version"]
		
		# Reformat it for use in a filename
		# - Prefix with hypen
		# - Use underscores instead of dots (so extensions don't get weird)
		return "-%s" % (versionStr.replace('.', '_'))
	else:
		# Don't include a version number
		return ""

# Check if the given filename is writeable
# < fileN: (str) Path to check
# > returns: (bool) Whether file can be written to
def probeFilenameWriteable(fileN):
	try:
		with open(fileN, 'w') as f:
			return True
		# TODO: return False otherwise?
	except OSError:
		return False

# Write the files specified in SOURCES into a zip file
# < fileN: (str) Name/path of zip file to write to
def writeZipFile(fileN):
	with zipfile.ZipFile(fileN, 'w') as zf:
		for fileN in SOURCES:
			path = SRC_ROOT + fileN
			zf.write(path, fileN)

# Force overwrite the dst file (in spite of Windows File Locks)
# < src: (str) Temporary file name the data is currently stored in
# < dst: (str) The filename that the ZIP file should actually have
def replaceZipFile(*, src="tempName.zip", dst="realName.zip"):
	print(f"Copying '{src}' to '{dst}'...")
	shutil.move(src, dst)

##############################################

# Write zipfiles
versionStr = getVersionString()

for targetName in TARGETS:
	targetName = targetName.format(version_str=versionStr)
	print(f"Creating {targetName}...")
	
	if probeFilenameWriteable(targetName):
		writeZipFile(targetName)
	else:
		tempName = targetName + ".new.zip"
		writeZipFile(tempName)
		replaceZipFile(src=tempName, dst=targetName)

input("Done! Press Enter to continue...")
