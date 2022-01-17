#! /usr/bin/env python

import os
import os.path
import re
import sys
import math
import string
import traceback



Head = """
package xxx\n
"""

DirName = "../../module"

def traveldir(rootdir):
	global Head
	BeginTag = "MsgUsed4Net"
	EndTag = "}"

	msg = ""

	print("dir: ", os.path.join(rootdir))
	for parent,dirnames,filenames in os.walk(rootdir):
		for dirname in  dirnames:
			#print("dir is" + dirname)
			traveldir(os.path.join(parent,dirname))

		for filename in filenames:
			#print("file is:" + os.path.join(parent,filename))
			print("file: " + os.path.join(parent,filename))
			f = open(os.path.join(parent,filename), "r")
			lastLine = ""
			newLine = ""
			found = False
			
			# while True:
			# 	line = f.readline()
			# 	if line == "":
			# 		break
			# 	print(line)

			while True:
				if not found:
					newLine = f.readline()
					if newLine.find(BeginTag) >= 0:
						msg = lastLine + newLine
						found = True
						print("**********************************")

					lastLine = newLine
					
					if newLine == "":
						break
					
				else:
					newLine = f.readline()
					msg = msg + newLine
					if newLine.find(EndTag) >= 0:
						found = False
						Head = Head + msg + "\n"
						print("msg: " + msg)
						msg = ""
						print("**********************************")
					
					if newLine == "":
						break


def saveToFile(s):
	f = open("./dst/message.go", "w+")
	f.write(s)

traveldir(DirName)
saveToFile(Head)
print("...............")
print(Head)

