#!/usr/bin/python

import traceback

import sys
import csv
import xlrd
import codecs
import os
import math
from types import *

def write_head(module, outFile):
	print("module: " + module)
	outFile.write("local " + module + " = {}\n\n")

def write_head2(module, outFile):
	print("module: " + module)
	#outFile.write("local " + module + " = \n{\n")
	outFile.write("local " + module + " = {}\n\n")

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

def write_item(keys, row, module, outFile):
	item = get_id(module, row[0])

	if not item:
		item = module + "[\""+str(row[0])+"\"] = {"

	print("**********************")
	
	for idx, v in enumerate(row):
		#item2 = str(parse_item(keys[idx])) #+ "=" + str(parse_item(v)) + ","
		if keys[idx] != "reqDesc" and keys[idx] != "rspDesc":
			print("xx", keys[idx], parse_item(v))
			item += str(keys[idx]) + "="
			item += parse_item(v) + ","

	item = item[:-1]
	item += "}\n\n"
	outFile.write(item)

def write_item2(keys, row, module, outFile):
	#item = "\"" + row[0] + "\",\n"
	item = module + "["+parse_item(row[0])+"] = " + parse_item(row[1]) + "\n"
	outFile.write(item)

def write_tail(pattern, to):
	to.write("return "+pattern+"\n")

def write_tail2(pattern, to):
	#to.write("}\n\nreturn "+pattern+"\n")
	to.write("\nreturn "+pattern+"\n")

if __name__ == '__main__':
	print("---------------------------")
	if len(sys.argv) != 2:
		print("Usage: ./xls2lua.py #srcFile#.csv #coord#")
		sys.exit(2)

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
				luaFile = os.path.join(sub, module + ".lua")
				print("luaFile: " + module + luaFile)
				keys = sheet.row_values(2)
				#print("keys: " + keys[0] + " " + keys[1] + " " + keys[2])
				with codecs.open(luaFile, "w", "utf-8") as outFile:
					if len(keys) == 2:
						write_head2(module, outFile)
					else:
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
							if len(keys) == 2:
								write_item2(keys, row, module, outFile)
							else:
								write_item(keys, row, module, outFile)

					if len(keys) == 2:
						write_tail2(module, outFile)
					else:
						write_tail(module, outFile)
					
					print("[SUCCESS] -> " + name)
					outFile.close()
			except Exception, e:
				print traceback.format_exc()
				print("[FAILED] -> " + name)

	sys.exit(0)
