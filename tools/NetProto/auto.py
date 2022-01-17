#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os, shutil

srcDir = "./src"

for x in os.listdir(srcDir):
	os.system("python ./xls2javaScript.py %s" %(os.path.join(srcDir, x)))
