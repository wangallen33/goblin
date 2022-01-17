#!/usr/bin/python

import traceback, sys, csv, xlrd, codecs, os, math
from types import *

def write_head(module, outFile):
	print("module: " + module)
	outFile.write("const " + module + " = {\n\n")

def write_tail(pattern, to):
	to.write("};\n\nmodule.exports = "+ pattern + ";\n")

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

def get_id(module, a):
	if isinstance(a, str):
		return module + "[\""+a+"\"] = {"
	elif isinstance(a, int):
		return module + "[%d] = {" %a
	elif isinstance(a, float):
		return module + "[%.0f] = {" %a

def write_item(keys, row, module, outFile):
	item = get_id(module, row[0])
	if not item:
		item = "\t" + str(row[0]) + ": {"
	
	for idx, v in enumerate(row):
		if keys[idx] != "reqDesc" and keys[idx] != "rspDesc" and keys[idx] != "notifyDesc":
			if keys[idx] == "id" or keys[idx] == "desc":
				item += str(keys[idx]) + ": "
				item += parse_item(v) + ", "
			else:
				item += str(keys[idx]) + ": "
				item += parse_item(int(v)) + ", "

	item = item[:-1]
	item += "},\n\n"
	outFile.write(item)

def write_item2(keys, row, module, outFile):
	item = module + "["+parse_item(row[0])+"] = " + parse_item(row[1]) + "\n"
	outFile.write(item)

if __name__ == '__main__':
	srcFile = str(sys.argv[1])
	parts = os.path.split(srcFile)
	fileName = os.path.splitext(parts[1])[0]
	sub = "dst"
	if not os.path.isdir(sub):
		os.mkdir(sub)

	with xlrd.open_workbook(srcFile) as workbook:
		sheets = workbook.sheet_names();
		for name in sheets:
			try:
				sheet = workbook.sheet_by_name(name)
				module = sheet.row_values(0)[0]
				luaFile = os.path.join(sub, fileName + ".js")
				print("luaFile: " + fileName + luaFile)
				keys = sheet.row_values(2)
				with codecs.open(luaFile, "w", "utf-8") as outFile:
					write_head(fileName, outFile)
							
					table = {}
					for idx in range(3, sheet.nrows):
						row = sheet.row_values(idx)
						if row[0] == "":
							continue
						if table.has_key(row[0]):
							print("WARNING: same id "+ row[0])
						else:
							table[row[0]] = True
							if len(keys) == 2:
								write_item2(keys, row, module, outFile)
							else:
								write_item(keys, row, module, outFile)
					write_tail(fileName, outFile)
					
					print("[SUCCESS] -> " + name)
					outFile.close()
			except Exception, e:
				print traceback.format_exc()
				print("[FAILED] -> " + name)

	sys.exit(0)
