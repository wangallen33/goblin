#!/usr/bin/python

import traceback

import sys
import csv
import xlrd
import codecs
import os
import math
from types import *

PacageName = "main"

def write_head(module, outFile):
	print("module: " + module)
	outFile.write("package " + PacageName + "\n\n" + "const (\n")

def to_lua_list(parts):
	item = "{"
	for idx, v in enumerate(parts):
		item += "\"" + str(idx+1)+"\"" + ":" + parse_item(v.strip(" \t\n\r")) + ","
	item = item[:-1]
	item += "}"
	return item

def parse_item(item):
	if isinstance(item, str):
		parts = item.split("+")
		if len(parts) > 1:
			return to_lua_list(parts)
		parts = item.split("|")
		if len(parts) > 1:
			return to_lua_list(parts)
		parts = item.split(",")
		if len(parts) > 1:
			return to_lua_list(parts)
		if item == "null" or item == "":
			return "nil"
		return "[["+item+"]]"
	elif isinstance(item, int):
		return str(item)
	elif isinstance(item, float):
		if float(math.floor(item)) == item:
			return str(int(item))
		else:
			return str(item)
	elif isinstance(item, unicode):
		parts = item.split("+")
		if len(parts) > 1:
			return to_lua_list(parts)
		parts = item.split("|")
		if len(parts) > 1:
			return to_lua_list(parts)
		parts = item.split(",")
		if len(parts) > 1:
			return to_lua_list(parts)
		if item == "null" or item == "":
			return "nil"
		return "[["+item+"]]"

def get_id(module, a):
	print(module)
	print(a)
	if isinstance(a, str):
		return module + "[\""+a+"\"] = {"
	elif isinstance(a, int):
		return module + "[%d] = {" %a
	elif isinstance(a, float):
		return module + "[%.0f] = {" %a

DebugTags = """\nvar(
DebugTags = map[int]string{
"""
def write_item(keys, row, module, outFile):
	global DebugTags
	itemReq = row[0] + "Req"
	itemRsp = row[0] + "Rsp"
	itemNotify = row[0] + "Notify"

	for idx, v in enumerate(row):
		if keys[idx] == "req":
			print("xx", keys[idx], parse_item(v))
			
			itemReq2 = "\t" + itemReq +  " = " + parse_item(v)
			if parse_item(v) == "nil":
				itemReq2 = ""
			else:
				DebugTags += itemReq + ": \"" + itemReq + "\",\n"

		if keys[idx] == "rsp":
			print("xx", keys[idx], parse_item(v))
			
			itemRsp2 = "\t" + itemRsp + " = " + parse_item(v) + ""
			if parse_item(v) == "nil":
				itemRsp2 = ""
			else:
				DebugTags += itemRsp + ": \"" + itemRsp + "\",\n"

		if keys[idx] == "notify":
			print("xx", keys[idx], parse_item(v))
		
			itemNotify2 = "\t" + itemNotify + " = " + parse_item(v) + "\n\n"
			if parse_item(v) == "nil":
				itemNotify2 = "\n\n"
			else:
				DebugTags += itemNotify + ": \"" + itemNotify + "\",\n"

	item = itemReq2 + "\n" + itemRsp2 + "\n" + itemNotify2
	outFile.write(item)


def write_tail(pattern, to):
	global DebugTags
	to.write("\n)\n")
	to.write(DebugTags+"}\n)")
	print("DebugTags", DebugTags)

if __name__ == '__main__':
	print("---------------------------")
	if len(sys.argv) < 2:
		print("Usage: ./xls2lua.py #srcFile#.csv #coord#")
		sys.exit(2)

	if len(sys.argv) == 3:
		PacageName = sys.argv[2]

	srcFile = str(sys.argv[1])
	parts = os.path.split(srcFile)
	if len(parts) != 2:
		print("Invalid File Format!")
		sys.exit(2)

	sub = "dst"
	if not os.path.isdir(sub):
		os.mkdir(sub)

	with xlrd.open_workbook(srcFile) as workbook:
		sheets = workbook.sheet_names();
		for name in sheets:
			try:
				sheet = workbook.sheet_by_name(name)
				module = sheet.row_values(0)[0]
				
				#pattern = name.split("(")[1].rsplit(")")[0]
				luaFile = os.path.join(sub, module + ".go")
				luaFile = os.path.join(sub, "cmd.go")
				print("luaFile: " + module + luaFile)
				keys = sheet.row_values(2)
				#print("keys: " + keys[0] + " " + keys[1] + " " + keys[2])
				with codecs.open(luaFile, "w", "utf-8") as outFile:
					write_head(module, outFile)
							
					table = {}
					for idx in range(3, sheet.nrows):
						row = sheet.row_values(idx)
						if row[0] == "":
							continue
						if table.has_key(row[0]):
							print("WARNING: same id "+row[0])
						else:
							table[row[0]] = True
							write_item(keys, row, module, outFile)

					write_tail(module, outFile)
					
					print("[SUCCESS] -> " + name)
					outFile.close()
			except Exception, e:
				print traceback.format_exc()
				print("[FAILED] -> " + name)

	sys.exit(0)
