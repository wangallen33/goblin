#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os, shutil

delDirName = ("xx", )
delFileSuffix = (".gif", ".spine", ".avi", ".meta")

def trvaelDir(dirName):
	for x in os.listdir(dirName):
		fileName = os.path.join(dirName, x)
		if os.path.isdir(fileName):
			unDelFlag = True
			for delDir in delDirName:
				print x, delDir
				if delDir == x:
					unDelFlag = False
					shutil.rmtree(fileName)
					print "remove dir : ", fileName
					break
			if unDelFlag:
				trvaelDir(fileName)
		else:
			suffix = os.path.splitext(fileName)[1]
			for delSuffix in delFileSuffix:
				if suffix == delSuffix:
					os.remove(fileName)
					print "remove file : ", fileName
					break
trvaelDir("./res")