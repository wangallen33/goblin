#!/usr/bin/python

import traceback

import sys, csv, xlrd, codecs, os, math
from types import *

def write_head(module, outFile):
	outFile.write("package com.youle.game.common.constant;\n\npublic class Code{\n\n")

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
			return "null"
		return "\""+item+"\""
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
			return "null"
		return "\""+item+"\""

def write_item(keys, row, module, outFile):
	itemReq = row[0].upper()
	itemRsp = row[0].upper() + "_RECEIVE"
	itemNotify = row[0].upper() + "_RADIO"

	for idx, v in enumerate(row):
		if keys[idx] == "req":			
			itemReq2 = "\tpublic static String " + itemReq +  " = \"" + parse_item(v) + "\";"
			if parse_item(v) == "nil":
				itemReq2 = ""

		if keys[idx] == "rsp":			
			itemRsp2 = "\tpublic static String " + itemRsp + " = \"" + parse_item(v) + "\";"
			if parse_item(v) == "nil":
				itemRsp2 = ""

		if keys[idx] == "notify":		
			itemNotify2 = "\tpublic static String " + itemNotify + " = \"" + parse_item(v) + "\";\n\n"
			if parse_item(v) == "nil":
				itemNotify2 = "\n\n"

	item = itemReq2 + "\n" + itemRsp2 + "\n" + itemNotify2
	outFile.write(item)


def write_tail(pattern, to):
	to.write("\n}\n")

if __name__ == '__main__':
	srcFile = str(sys.argv[1])
	parts = os.path.split(srcFile)
	sub = "dst"
	if not os.path.isdir(sub):
		os.mkdir(sub)

	with xlrd.open_workbook(srcFile) as workbook:
		sheets = workbook.sheet_names();
		for name in sheets:
			try:
				sheet = workbook.sheet_by_name(name)
				module = sheet.row_values(0)[0]
				
				luaFile = os.path.join(sub, module + ".java")
				luaFile = os.path.join(sub, "cmd.java")
				keys = sheet.row_values(2)
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
