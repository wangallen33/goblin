addAndRemove(){
    svn st |grep "!" |awk '{print$2}' |xargs -I [] svn rm []
    svn st |grep "?" |awk '{print$2}' |xargs -I [] svn add []
}

cd autoCocosManifestTool
addAndRemove

cd ..
cd autoExportAppIcon
addAndRemove

cd ..
cd circulationDel
addAndRemove

cd ..
cd NetProto
addAndRemove

# cd ..
# svn ci -m ""
# svn up