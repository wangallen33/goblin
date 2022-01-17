const ResTag = {
    // COMMON: "COMMON",
    TEXTURE: "TEXTURE",
};

var GameDataRes = {
    audio: {},
    texture2D: {},
    spriteFrame: {},
    atlas: {},
    prefab: {},
    front: {},
    animation: {},
    json: {},
    loadFileIndex: 0,

    resources: {
        // COMMON: [
        //     "Audio",
        //     "Prefab/Utils",
        //     "Texture/LoadFile",
        // ],
        TEXTURE: "Texture/LoadFile",
    },

    /**
     * @function _parseRes
     * @description 解析资源
     * @param list 资源
     * @param tag 标签
     * @param length 长度
     * @param func 回调
     * @private
     */
    _parseRes: function (list, tag, length, func) {
        list.forEach(function (item, index) {
            // console.log("_parseRes >> item.url:%s item.name:%s", item.url, item.name);
            if (item instanceof cc.Texture2D) {
                let key = "";
                if (cc.sys.isNative) {
                    key = item._glID;//getPath();
                } else {
                    var url = item.url;
                    var split_url = url.split('/');
                    var sub_url = split_url[split_url.length - 1].split('.');
                    key = sub_url[0].toUpperCase();
                }
                item.resTag = tag;
                this.texture2D[key] = item;
            } else if (item instanceof cc.SpriteFrame) {
                //cc.log("_parseRes >> SpriteFrame item.name:%s",item.name);
                item.resTag = tag;
                this.spriteFrame[item.name.toUpperCase()] = item;
            } else if (item instanceof cc.Prefab) {
                //cc.log("_parseRes >> Prefab item.name:%s",item.name);
                item.resTag = tag;
                this.prefab[item.name.toUpperCase()] = item;
            } else if (item instanceof cc.BitmapFont) {
                //cc.log("_parseRes >> BitmapFont item.name:%s",item.name);
                item.resTag = tag;
                this.front[item.name.toUpperCase()] = item;
            } else if (item instanceof cc.SpriteAtlas) {
                //cc.log("_parseRes >> SpriteAtlas item.name:%s",item.name);
                var split_list = item.name.split('.');
                var atlas_list = {};
                _.forEach(item._spriteFrames, function (item) {
                    atlas_list[item.name.toUpperCase()] = item;
                });
                item.resTag = tag;
                this.atlas[split_list[0].toUpperCase() + "_ATLAS"] = item;
                this.atlas[split_list[0].toUpperCase()] = atlas_list;
            } else if (item instanceof cc.AnimationClip) {
                //cc.log("_parseRes >> AnimationClip item.name:%s",item.name);
                this.animation[item.name.toUpperCase()] = item;
                item.resTag = tag;
            } else if (item instanceof cc.AudioClip || item instanceof cc.AudioSource || item instanceof cc.Action) {
                //cc.log("_parseRes >> AudioClip item.name:%s",item.name);
                this.audio[item.name.toUpperCase()] = item;
                item.resTag = tag;
            } else if (item instanceof Object && item.name) {
                this.json[item.name.toUpperCase()] = item.data;
                item.resTag = tag;
            }
        }.bind(this));
    },

    /**
     * @function _preloadRes
     * @description 资源加载
     * @param type 类型
     * @param func 回调函数
     * @private 私有访问权限
     */
    /* todo 由于ccc对不同目录资源加载的总进度不支持 弃用该方法 只加载图片 其他类型文件即用即加载
    _preloadRes: function (type, func, progress) {
        let fileItem;
        let length;
        const tag = type;
        fileItem = this.resources[type][this.loadFileIndex];
        length = this.resources[type].length;
        cc.loader.loadResDir(fileItem, function (err, list) {
            console.log("=== loadResAll( '%s' ) finish callback, fileIdx:%s, filelist.count:%s err:%s ", fileItem, this.loadFileIndex, list.length, err);
            this.loadFileIndex++;
            if (err) {
                console.error("cc.loader.loadResAll('%s') fail error: %s", fileItem, err);
                return;
            }
            this._parseRes(list, tag, length, func);
            if (this.loadFileIndex < length) {
                //加载下一文件
                this._preloadRes(type, func, progress);
            } else {
                //临时变量
                this.endTime = new Date();
                const date = this.endTime.getTime() - this.startTime.getTime();
                const leave1 = date % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
                const hours = Math.floor(leave1 / (3600 * 1000));
                //计算相差分钟数
                const leave2 = leave1 % (3600 * 1000);     //计算小时数后剩余的毫秒数
                const minutes = Math.floor(leave2 / (60 * 1000));
                //计算相差秒数
                const leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
                const seconds = Math.round(leave3 / 1000);
                const leave4 = leave3 % 1000;
                const s = `${hours}小时${minutes}分${seconds}秒${leave4}毫秒`;
                console.info(`${date}>>>本次资源所有加载完成 资源加载类${this.type}  [总共耗时${s}] 资源是否加载完成${this.loadFileIndex === length}`);
                if (func) {
                    func();
                }
            }
            if (progress) {
                progress(this.loadFileIndex, length);
            }
        }.bind(this));
    }
    */
    _preloadRes: function (type, func, progress) {
        let fileItem;
        let length;
        const tag = type;
        fileItem = this.resources[type];
        const onProgress = function (completedCount, totalCount, item) {
            if (progress) {
                progress(completedCount, totalCount);
            }
        };
        cc.loader.loadResDir(fileItem, onProgress, function (err, list) {
            console.log("=== loadResAll( '%s' ) finish callback, filelist.count:%s err:%s ", fileItem, list.length, err);
            if (err) {
                console.error("cc.loader.loadResAll('%s') fail error: %s", fileItem, err);
                return;
            }
            this._parseRes(list, tag, length, func);
            //临时变量
            this.endTime = new Date();
            const date = this.endTime.getTime() - this.startTime.getTime();
            const leave1 = date % (24 * 3600 * 1000);    //计算天数后剩余的毫秒数
            const hours = Math.floor(leave1 / (3600 * 1000));
            //计算相差分钟数
            const leave2 = leave1 % (3600 * 1000);     //计算小时数后剩余的毫秒数
            const minutes = Math.floor(leave2 / (60 * 1000));
            //计算相差秒数
            const leave3 = leave2 % (60 * 1000);      //计算分钟数后剩余的毫秒数
            const seconds = Math.round(leave3 / 1000);
            const leave4 = leave3 % 1000;
            const s = `${hours}小时${minutes}分${seconds}秒${leave4}毫秒`;
            console.info(`${date}>>>本次资源所有加载完成 资源加载类${this.type}  [总共耗时${s}] 资源加载完成`);
            if (func) {
                func();
            }
        }.bind(this));
    }
};

/**
 * @function releaseResTag
 * @description 资源释放
 * @param resTag 标签
 */
GameDataRes.releaseResTag = function (resTag) {
    let tag = null;
    tag = ResTag[ResTag[resTag]];
    const release_list = [];
    //寻找纹理
    _.forEach(this.texture2D, function (item) {
        if (item.resTag == tag) {
            release_list.push(item);
        }
    }.bind(this));
    _.forEach(this.spriteFrame, function (item) {
        if (item.resTag == tag) {
            release_list.push(item);
        }
    }.bind(this));
    _.forEach(this.prefab, function (item) {
        if (item.resTag == tag) {
            release_list.push(item);
        }
    }.bind(this));
    _.forEach(this.front, function (item) {
        if (item.resTag == tag) {
            release_list.push(item);
        }
    }.bind(this));
    _.forEach(this.animation, function (item) {
        if (item.resTag == tag) {
            release_list.push(item);
        }
    }.bind(this));
    _.forEach(this.atlas, function (item) {
        if (item instanceof cc.SpriteAtlas) {
            if (item.resTag == tag) {
                release_list.push(item);
            }
        }
    });
    _.forEach(this.audio, function (item) {
        if (item.resTag == tag) {
            release_list.push(item);
        }
    }.bind(this));
    cc.loader.release(release_list);
};

GameDataRes._preloadResSingle = function (type, func, progress) {
    if (type instanceof Array) {
        this._preloadRes(type[this.count++], func, progress);
    } else {
        this._preloadRes(type, func, progress);
    }
};

/**
 * @function getInstance
 * @description 加载资源
 * @param type 加载资源的类型
 * @param func 回调函数,资源加载完时触发该函数
 */
GameDataRes.getInstance = function (type, func, progress) {
    this.count = 0;
    this.loadFileIndex = 0;
    this.type = type;
    //临时的，测试资源加载所耗费的时间
    this.startTime = new Date();
    console.info("[资源加载类型] %s", type);
    this._preloadResSingle(type, func, progress)
};

/**
 * @function destroy
 * @description 销毁所有资源
 */
GameDataRes.destroy = function () {
    this.atlas = null;
    this.front = null;
    this.prefab = null;
    this.texture2D = null;
    this.spriteFrame = null;
    this.animation = null;
    this.audio = null;
    cc.loader.releaseAll();
};

GameDataRes.ResTag = ResTag;
module.exports = GameDataRes;


