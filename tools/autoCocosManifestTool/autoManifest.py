#1/usr/bin/env python
# -*- coding: utf-8 -*-

import json, hashlib, os, shutil, zipfile, datetime

# needZip = False
needZip = True

# packageUrl = "http://sh.fmgames.cn/update" #苹果审核和苹果正式热更新服务器
# targetDir = "apple"
# targetDir = "appletest"

packageUrl = "http://am.fmgames.cn:29954/hotUpdate" #Android外网正式热更新服务器
targetDir = "goblin"
# targetDir = "ccmjtest"
# targetDir = "ccmjInTest"
# targetDir = "appleInTest"

# packageUrl = "http://192.168.1.14:12345/hotUpdate"
# targetDir = "NVTest" #测试网测试



verDescFileName = "ver.txt"

verDescFile = os.path.join("../../doc/updateVerDesc", verDescFileName)
relAssetsDir = "../../Game/build/jsb-default/"
versionSplitIndex = ":::"
targetTab = {}
assetsDir = "assets"

tab = {}
tab["packageUrl"] = os.path.join(packageUrl, targetDir)
tab["remoteManifestUrl"] = tab["packageUrl"] + "/project.manifest"
tab["remoteVersionUrl"] = tab["packageUrl"] + "/version.manifest"
tab["version"] = "1.0.0"

def travelDir(path):
	for x in os.listdir(path):
		if x != ".DS_Store":
			fileName = os.path.join(path, x)
			if os.path.isdir(fileName):
				travelDir(fileName)
			elif os.path.isfile(fileName):
				travelCb(fileName)

def travelCb(file):
	fileName = os.path.relpath(file, assetsDir)
	fileName = fileName.replace('\\', '/')
	targetTab[fileName] = {}
	fd = open(file, "rb")
	targetTab[fileName]["md5"] = hashlib.md5(fd.read()).hexdigest()
	fd.close()
	targetTab[fileName]["size"] = os.path.getsize(file)

if os.path.exists(assetsDir):
	shutil.rmtree(assetsDir)
shutil.copytree(relAssetsDir+"src", assetsDir+"/src")
shutil.copytree(relAssetsDir+"res", assetsDir+"/res")

if os.path.exists(targetDir):
	shutil.rmtree(targetDir)
shutil.copytree(assetsDir, targetDir)

if os.path.exists(verDescFile):
	fd = open(verDescFile, "r")
	s = fd.read()
	fd.close()
	fd = open(os.path.join(targetDir, verDescFileName), "w")
	fd.write(s)
	fd.close()
	pos = s.find(versionSplitIndex)
	tab["version"] = s[pos + len(versionSplitIndex):].rstrip()

travelDir(assetsDir)

file = open(os.path.join(targetDir, "version.manifest"), "w")
file.write(json.dumps(tab, sort_keys=True, indent=4, separators=(',', ': ')))
file.close()

tab["assets"] = targetTab
tab["searchPaths"] = []
file = open(os.path.join(targetDir, "project.manifest"), "w")
file.write(json.dumps(tab, sort_keys=True, indent=4, separators=(',', ': ')))
file.close()


if needZip:
	zipName = "%s_%s.zip" %(targetDir, datetime.datetime.now().strftime('%Y%m%d%H%M%S'))
	file = zipfile.ZipFile(zipName, "w", zipfile.ZIP_DEFLATED)
	for dirpath, dirnames, filenames in os.walk(targetDir):
		for filename in filenames:
			file.write(os.path.join(dirpath, filename))
	file.close()
