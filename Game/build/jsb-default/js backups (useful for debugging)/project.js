window.__require = function e(t, i, o) {
function n(s, c) {
if (!i[s]) {
if (!t[s]) {
var r = s.split("/");
r = r[r.length - 1];
if (!t[r]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(r, !0);
if (a) return a(r, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var h = i[s] = {
exports: {}
};
t[s][0].call(h.exports, function(e) {
return n(t[s][1][e] || e);
}, h, h.exports, e, t, i, o);
}
return i[s].exports;
}
for (var a = "function" == typeof __require && __require, s = 0; s < o.length; s++) n(o[s]);
return n;
}({
AdMgr: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7e535XOMEdE+rhv6psFskZD", "AdMgr");
var o = {
showAdVideo: function() {
console.log("============== 展示激励广告 ==============");
if (cc.sys.os === cc.sys.OS_ANDROID) {
console.log("************* ANDROID展示激励广告 *************");
jsb.reflection.callStaticMethod("org/cocos2dx/javascript/AppActivity", "showVideo", "()V");
} else if (cc.sys.os === cc.sys.OS_IOS) {
console.log("************* IOS展示激励广告 *************");
jsb.reflection.callStaticMethod("RootViewController", "showVideo");
}
},
getReward: function() {},
loadAdFail: function() {
popup.show({
str: "加载失败!"
});
}
};
t.exports = o;
cc._RF.pop();
}, {} ],
Adefind: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "09a62+SoN9HbKiUA6h4NRfI", "Adefind");
cc.YL = {};
cc._RF.pop();
}, {} ],
Audio: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "96e44Vqy/9M4Kz04OZ3XLRK", "Audio");
var o = {
getStorageVolume: function() {
var e = cc.sys.localStorage.getItem("gameVolume");
if (e) {
e = JSON.parse(e);
cc.YL.muteMode = Boolean(e.mute);
cc.YL.effectVolume = void 0 != e.effect && null != e.effect ? e.effect : .8;
cc.YL.musicVolume = void 0 != e.music && null != e.music ? e.music : .8;
cc.YL.effectVolume = cc.YL.effectVolume < 0 ? 0 : cc.YL.effectVolume;
cc.YL.effectVolume = cc.YL.effectVolume > 1 ? 1 : cc.YL.effectVolume;
cc.YL.musicVolume = cc.YL.musicVolume < 0 ? 0 : cc.YL.musicVolume;
cc.YL.musicVolume = cc.YL.musicVolume > 1 ? 1 : cc.YL.musicVolume;
}
},
playMusic: function(e, t, i) {
var o = "Audio/Music/" + e;
cc.loader.loadRes(o, cc.AudioClip, function(e, o) {
if (e) console.error(e); else {
this.stopMusic();
var n = void 0 === t || t, a = cc.YL.muteMode ? 0 : void 0 === i ? this.getMusicVolume() : i;
this._musicId = cc.audioEngine.play(o, n, a);
}
}.bind(this));
},
pauseMusic: function() {
void 0 !== this._musicId && cc.audioEngine.pause(this._musicId);
},
resumeMusic: function() {
void 0 !== this._musicId && cc.audioEngine.resume(this._musicId);
},
stopMusic: function() {
void 0 !== this._musicId && cc.audioEngine.stop(this._musicId);
},
setMusicVolume: function(e) {
cc.YL.muteMode ? this._musicVolume = 0 : e >= 0 && e <= 1 && (this._musicVolume = e);
void 0 !== this._musicId && cc.audioEngine.setVolume(this._musicId, this._musicVolume);
},
getMusicVolume: function() {
var e = this._musicVolume;
return void 0 != e && null != e ? e : cc.YL.musicVolume;
},
isMusicPlaying: function() {
return cc.audioEngine.getState(this._musicId) === cc.audioEngine.AudioState.PLAYING;
},
playEffect: function(e) {
var t = "Audio/Effect/" + e;
cc.loader.loadRes(t, cc.AudioClip, function(e, t) {
if (e) console.error(e); else {
var i = cc.YL.muteMode ? 0 : this.getEffectVolume();
try {
this._soundId = cc.audioEngine.play(t, !1, i);
} catch (e) {}
}
}.bind(this));
},
pauseEffect: function() {
void 0 !== this._soundId && cc.audioEngine.pause(this._soundId);
},
resumeEffect: function() {
void 0 !== this._soundId && cc.audioEngine.resume(this._soundId);
},
stopEffect: function() {
void 0 !== this._soundId && cc.audioEngine.stop(this._soundId);
},
setEffectVolume: function(e) {
cc.YL.muteMode ? this._soundVolume = 0 : e >= 0 && e <= 1 && (this._soundVolume = e);
},
setEffectIsPlay: function(e) {
this._isEffectPlay = e;
},
getEffectVolume: function() {
var e = this._soundVolume;
return void 0 != e && null != e ? e : cc.YL.effectVolume;
},
pauseAll: function() {
this.setEffectIsPlay(!1);
cc.audioEngine.pauseAll();
},
resumeAll: function() {
this.setEffectIsPlay(!0);
cc.audioEngine.resumeAll();
},
stopAll: function() {
cc.audioEngine.stopAll();
},
muteOn: function() {
this.setMusicVolume(0);
this.setEffectVolume(0);
},
muteOff: function() {
this.setMusicVolume(cc.YL.musicVolume);
this.setEffectVolume(cc.YL.effectVolume);
}
};
window.audio = o;
cc._RF.pop();
}, {} ],
BoomEffect: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2be35wKjAhMk4X06xXhZwvk", "BoomEffect");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.shaoxue = !1;
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
this.colliderPlayerNode = this.mapComp.playerNode;
this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
},
start: function() {},
playerEffect: function() {
this.shaoxue = !0;
this.colliderPlayerNode.getComponent("Player").underAttack();
this.node.getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.parent.removeFromParent();
}.bind(this));
},
update: function(e) {
var t = this.colliderPlayerNode.getPosition(), i = this.node.convertToNodeSpaceAR(cc.v2(t.x, t.y));
Math.abs(i.x) <= 32 && Math.abs(i.y) <= 32 && 0 == this.shaoxue && this.playerEffect();
}
});
cc._RF.pop();
}, {} ],
Boom: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3be1cv1S1hDXpKIEIxREVdJ", "Boom");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.isBoom = !1;
this.isEffect = !1;
this.shaoxue = !1;
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
this.colliderPlayerNode = this.mapComp.playerNode;
this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
},
start: function() {},
showBoomNode: function(e) {
this._tile = e;
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = "Chixu";
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !0;
},
showBoomEffect: function() {
this.isEffect = !0;
this.isBoom = !0;
audio.playEffect("Skill_Goblin_Bomb");
this._showBoom(!1);
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = "Baozha";
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.getChildByName("Animaion").active = !1;
this._showBoom(!0);
setTimeout(function() {
this.isBoom = !1;
this.node.removeFromParent();
}.bind(this), 1e3);
}.bind(this));
},
getTilePos: function(e) {
var t = this.mapNode.getContentSize(), i = this.tiledMap.getTileSize(), o = Math.floor(e.x / i.width), n = Math.floor((t.height - e.y) / i.height);
return cc.v2(o, n);
},
_showBoom: function(e) {
for (var t = 1 == e ? this.node.getChildByName("effect") : this.node.getChildByName("Warn"), i = 0; i < this.node.children.length; i++) "Warn" == this.node.children[i].name && (this.node.children[i].active = !1);
var o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? 32 : 0, 1 == e ? 10 : 0);
o.active = !0;
for (var n = this.mapComp.tiledMap.getMapSize(), a = !1, s = 1; s < 4; s++) {
(h = cc.v2(this._tile.x, this._tile.y)).x = h.x + s;
if (h.x < 0 || h.x >= n.width) a = !0; else if (1 != a) {
if (0 == this.mapComp.block.getTileGIDAt(h) && 0 == a) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? 64 * s + 32 : 64 * s, 1 == e ? 10 : 0);
o.active = !0;
} else a = !0;
}
}
a = !1;
for (var c = 1; c < 4; c++) {
(h = cc.v2(this._tile.x, this._tile.y)).x = h.x - c;
if (h.x < 0 || h.x >= n.width) a = !0; else if (1 != a) {
if (0 == this.mapComp.block.getTileGIDAt(h) && 0 == a) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? -64 * c + 32 : -64 * c, 1 == e ? 10 : 0);
o.active = !0;
} else a = !0;
}
}
a = !1;
for (var r = 1; r < 4; r++) {
(h = cc.v2(this._tile.x, this._tile.y)).y = h.y + r;
if (h.y < 0 || h.y >= n.height) a = !0; else if (1 != a) {
if (0 == this.mapComp.block.getTileGIDAt(h) && 0 == a) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? 32 : 0, 1 == e ? -64 * r + 10 : -64 * r);
o.active = !0;
} else a = !0;
}
}
a = !1;
for (var l = 1; l < 4; l++) {
var h;
(h = cc.v2(this._tile.x, this._tile.y)).y = h.y - l;
if (h.y < 0 || h.y >= n.height) a = !0; else if (1 != a) {
if (0 == this.mapComp.block.getTileGIDAt(h) && 0 == a) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? 32 : 0, 1 == e ? 64 * l + 10 : 64 * l);
o.active = !0;
} else a = !0;
}
}
},
playerEffect: function() {
var e = this.node.getPosition(), t = this.colliderPlayerNode.getPosition();
if (Math.abs(e.x - t.x) < 15 && Math.abs(e.y - t.y) < 15) {
this.node.removeFromParent();
this.colliderPlayerNode.getComponent("Player").underAttack();
}
},
update: function(e) {
var t = this.node.getPosition(), i = this.colliderPlayerNode.getPosition();
Math.abs(t.x - i.x) < 15 && Math.abs(t.y - i.y) < 15 && 0 == this.isBoom && 0 == this.isEffect && this.showBoomEffect();
}
});
cc._RF.pop();
}, {} ],
Diamond: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "38fadmA+n1IN6bT09+2SZfE", "Diamond");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
},
start: function() {},
show: function(e, t, i) {
this.info = e;
var o = this.mapNode.getContentSize(), n = this.tiledMap.getTileSize();
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !1;
this.node.zIndex = 100;
var a = 0 == i ? (parseInt(t) + 1).toString() : (parseInt(t) + 7).toString();
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = a;
this.node.setPosition(e.x * n.width, o.height - n.height * (e.y + 1));
if (1 == i) setTimeout(function() {
if (this.node) {
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = (parseInt(t) + 1).toString();
}
}.bind(this), 500); else {
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = a;
}
}
});
cc._RF.pop();
}, {} ],
GameRes: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "75c19SxeORA763xuFbqFe0e", "GameRes");
var o = {
TEXTURE: "TEXTURE"
}, n = {
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
TEXTURE: "Texture/LoadFile"
},
_parseRes: function(e, t, i, o) {
e.forEach(function(e, i) {
if (e instanceof cc.Texture2D) {
var o = "";
if (cc.sys.isNative) o = e._glID; else {
var n = e.url.split("/");
o = n[n.length - 1].split(".")[0].toUpperCase();
}
e.resTag = t;
this.texture2D[o] = e;
} else if (e instanceof cc.SpriteFrame) {
e.resTag = t;
this.spriteFrame[e.name.toUpperCase()] = e;
} else if (e instanceof cc.Prefab) {
e.resTag = t;
this.prefab[e.name.toUpperCase()] = e;
} else if (e instanceof cc.BitmapFont) {
e.resTag = t;
this.front[e.name.toUpperCase()] = e;
} else if (e instanceof cc.SpriteAtlas) {
var a = e.name.split("."), s = {};
_.forEach(e._spriteFrames, function(e) {
s[e.name.toUpperCase()] = e;
});
e.resTag = t;
this.atlas[a[0].toUpperCase() + "_ATLAS"] = e;
this.atlas[a[0].toUpperCase()] = s;
} else if (e instanceof cc.AnimationClip) {
this.animation[e.name.toUpperCase()] = e;
e.resTag = t;
} else if (e instanceof cc.AudioClip || e instanceof cc.AudioSource || e instanceof cc.Action) {
this.audio[e.name.toUpperCase()] = e;
e.resTag = t;
} else if (e instanceof Object && e.name) {
this.json[e.name.toUpperCase()] = e.data;
e.resTag = t;
}
}.bind(this));
},
_preloadRes: function(e, t, i) {
var o, n = e;
o = this.resources[e];
cc.loader.loadResDir(o, function(e, t, o) {
i && i(e, t);
}, function(e, i) {
console.log("=== loadResAll( '%s' ) finish callback, filelist.count:%s err:%s ", o, i.length, e);
if (e) console.error("cc.loader.loadResAll('%s') fail error: %s", o, e); else {
this._parseRes(i, n, void 0, t);
this.endTime = new Date();
var a = this.endTime.getTime() - this.startTime.getTime(), s = a % 864e5, c = s % 36e5, r = c % 6e4, l = Math.floor(s / 36e5) + "小时" + Math.floor(c / 6e4) + "分" + Math.round(r / 1e3) + "秒" + r % 1e3 + "毫秒";
console.info(a + ">>>本次资源所有加载完成 资源加载类" + this.type + "  [总共耗时" + l + "] 资源加载完成");
t && t();
}
}.bind(this));
},
releaseResTag: function(e) {
var t;
t = o[o[e]];
var i = [];
_.forEach(this.texture2D, function(e) {
e.resTag == t && i.push(e);
}.bind(this));
_.forEach(this.spriteFrame, function(e) {
e.resTag == t && i.push(e);
}.bind(this));
_.forEach(this.prefab, function(e) {
e.resTag == t && i.push(e);
}.bind(this));
_.forEach(this.front, function(e) {
e.resTag == t && i.push(e);
}.bind(this));
_.forEach(this.animation, function(e) {
e.resTag == t && i.push(e);
}.bind(this));
_.forEach(this.atlas, function(e) {
e instanceof cc.SpriteAtlas && e.resTag == t && i.push(e);
});
_.forEach(this.audio, function(e) {
e.resTag == t && i.push(e);
}.bind(this));
cc.loader.release(i);
},
_preloadResSingle: function(e, t, i) {
e instanceof Array ? this._preloadRes(e[this.count++], t, i) : this._preloadRes(e, t, i);
},
getInstance: function(e, t, i) {
this.count = 0;
this.loadFileIndex = 0;
this.type = e;
this.startTime = new Date();
console.info("[资源加载类型] %s", e);
this._preloadResSingle(e, t, i);
},
destroy: function() {
this.atlas = null;
this.front = null;
this.prefab = null;
this.texture2D = null;
this.spriteFrame = null;
this.animation = null;
this.audio = null;
cc.loader.releaseAll();
}
};
n.ResTag = o;
t.exports = n;
cc._RF.pop();
}, {} ],
GameTouch: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "968aaK4EtpAvIa7Uzs65OPX", "GameTouch");
var o = e("./Guide");
cc.Class({
extends: cc.Component,
start: function() {
this.node.on("touchend", this.onEndTouch.bind(this), this.node);
this.node.on("touchcancel", this.onCancelTouch.bind(this), this.node);
this.node.on("touchmove", this.onMoveTouch.bind(this), this.node);
this.node.on("touchstart", this.onStartTouch.bind(this), this.node);
cc.YL.TouchMoveDir = "";
},
onEndTouch: function(e) {
if (!cc.YL.isOver && cc.YL.canTouch) {
this.endTouchPos = e.getLocation();
this.calculateDir();
}
},
onCancelTouch: function(e) {
if (!cc.YL.isOver && cc.YL.canTouch) {
this.endTouchPos = e.getLocation();
this.calculateDir();
}
},
onMoveTouch: function(e) {},
onStartTouch: function(e) {
cc.YL.isOver || cc.YL.canTouch && (this.startTouchPos = e.getStartLocation());
},
calculateDir: function() {
var e = this.startTouchPos.x, t = this.startTouchPos.y, i = this.endTouchPos.x, n = this.endTouchPos.y, a = i - e, s = n - t;
if (0 != a || 0 != s) {
var c = "";
0 == a && (c = s > 0 ? "up" : "down");
0 == s && (c = a > 0 ? "right" : "left");
if (0 != s && 0 != a) {
var r = this.getAngle(i, n, e, t);
(r >= 0 && r < 45 || r >= 315 && r <= 360) && (c = "down");
r >= 45 && r < 135 && (c = "left");
r >= 135 && r < 225 && (c = "up");
r >= 225 && r < 315 && (c = "right");
}
0 != cc.YL.IsCanMove && (cc.YL.loadMapStage < 1 && !o.getInstance().checkOperateDir(c) || (cc.YL.TouchMoveDir = c));
} else {
if (cc.YL.loadMapStage < 1 && !o.getInstance().checkOperateDir("")) return;
cc.YL.TouchMoveDir = "";
}
},
getAngle: function(e, t, i, o) {
var n = 180 * Math.atan((t - o) / (e - i)) / Math.PI;
e < i && t < o ? n = 90 - n : e < i && t > o ? n = Math.abs(n) + 90 : e > i && t > o ? n = 270 - n : e > i && t < o && (n = 270 + Math.abs(n));
return Math.round(n);
}
});
cc._RF.pop();
}, {
"./Guide": "Guide"
} ],
Guide: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "f47eeEgIAlAMYl+/48oh0BH", "Guide");
var o = e("./GameRes"), n = cc.Class({
statics: {
_inst: null,
target: null,
callBack: null,
getInstance: function(e) {
this._inst || (this._inst = new n());
e && (this._inst.target = e);
return this._inst;
}
},
initOperateGuide: function() {
var e = this.target;
this.deciding = !1;
this.guide_1_Desc = {
1: "欢迎来到路特戈登训练营，我是教官露易丝！我将在最短的时间内把你训练成为一名合格的猎宝人，你准备好了吗？",
2: "那我们从最基本的移动开始——<color=#ff0000>手指滑动屏幕，可控制角色朝滑动方向移动</>。",
3: "看来你已经掌握基本的移动技能。接下来学习如何让角色停止移动！",
4: "<color=#ff0000>点击场景中任意位置，可以让角色停止移动</>。",
5: "资质不错嘛，这么快就学会了。那么，运用你刚才学到的知识，<color=#ff0000>移动到目的地吧</>！",
6: "厉害！厉害！接下来，我们要学习猎宝人必备的技能——收集宝石。"
};
this.guide_2_Desc = {
1: "作为一个猎宝人，首要目的是收集藏在哥布林营地的宝石。现在，我就教你如何收集宝石",
2: "看到这些宝石了没？<color=#ff0000>走到宝石所在位置，就可以完成对宝石的收集</>！现在你来试试看吧！",
3: "看！是不是很简单？",
4: "是不是很疑惑刚才发生了什么？让我告诉你吧，其实<color=#ff0000>宝石是会升级的</>。",
5: "奥加特尔大陆的宝石多种多样，按<color=#ff0000>等级由低到高</>分为<outline color=#474545 width=2><color=#ffffff>白</></>、<outline color=#474545 width=2><color=#00ff00>绿</></>、<outline color=#474545 width=2><color=#00A5FF>蓝</></>、<outline color=#474545 width=2><color=#DE00FF>紫</></>、<outline color=#474545 width=2><color=#FF8200>橙</></>、<outline color=#474545 width=2><color=#ff0000>红</></>这六种颜色。",
6: "只要你<color=#ff0000>连续收集两个颜色相同的宝石</>，会使营地中的一颗<color=#ff0000>白色宝石</>变为更高级的宝石。但是这个<color=#ff0000>变化是随机</>的，也就是说我们并不知道哪个白色会变化。",
7: "尽管如此，宝石变化的方式是不会变的，都会遵循这个规则。",
8: "好了，讲了这么多，你该亲自去试试了！把营地的宝石全部收集了吧。",
9: "恭喜你掌握了猎宝人的全部基础知识，你……毕业了！"
};
this.guide_1_Spine_Info = {
1: {
pos: cc.v2(154, -264),
desc: "",
offPos: cc.v2(0, 93),
sp: "Shou_Right"
},
2: {
pos: cc.v2(151, -377),
desc: "",
offPos: cc.v2(0, 121),
sp: "Shou_Down"
},
3: {
pos: cc.v2(73, -537),
desc: "",
offPos: cc.v2(0, 93),
sp: "Shou_Left"
},
4: {
pos: cc.v2(-165, -396),
desc: "",
offPos: cc.v2(212, -117),
sp: "Shou_Up"
},
5: {
pos: cc.v2(-137, -283),
desc: "",
offPos: cc.v2(63, 90),
sp: "Shou_DianjiTing"
},
6: {
pos: cc.v2(65, 383),
desc: "",
offPos: cc.v2(182, 68),
sp: "Shuangjiantou2"
}
};
this.guide_2_Spine_Info = {
1: {
pos: cc.v2(0, -385),
sp: "Shuangjiantou1"
},
2: {
pos: cc.v2(126, -385),
sp: "Shuangjiantou1"
}
};
cc.YL.OperateIdx = 1;
cc.YL.DialogueIdx = 1;
cc.YL.GuideSpIdx = 1;
this.player = e.playerNode.getComponent("Player");
this.showGuideDialogue();
e.clickBlock.active = !1;
},
showGuideDialogue: function() {
var e = this.target, t = void 0;
if (1 == cc.YL.GuideMap) {
if (1 != cc.YL.OperateIdx && 5 != cc.YL.OperateIdx && 6 != cc.YL.OperateIdx && 7 != cc.YL.OperateIdx) return;
t = this.show_Guide_1_Dialogue.bind(this);
} else {
if (2 != cc.YL.GuideMap) return;
t = this.show_Guide_2_Dialogue.bind(this);
}
var i = e.node.parent.getChildByName("Dialogue");
i || (i = cc.instantiate(e.DialoguePre)).on("click", t);
utils.show(i);
var o = i.getChildByName("box"), n = i.getChildByName("tips");
o.opacity = 0;
n.opacity = 0;
this.dialogueNum = 0;
o.runAction(cc.fadeIn(.2));
n.runAction(cc.fadeIn(.2));
t();
},
showGuideSpine: function() {
var e = void 0;
if (1 == cc.YL.GuideMap) e = this.guide_1_Spine_Info[cc.YL.GuideSpIdx]; else {
if (2 != cc.YL.GuideMap) return;
e = this.guide_2_Spine_Info[cc.YL.GuideSpIdx];
}
var t = this.target;
if (e) {
t.guide.active = !0;
t.guide.setPosition(e.pos);
var i = t.guide.getChildByName("desc"), o = t.guide.getChildByName("sp");
i.active = !1;
o.getComponent(sp.Skeleton).setAnimation(0, e.sp, !0);
cc.YL.GuideSpIdx++;
} else this.hideGuideSpine();
},
hideGuideSpine: function() {
var e = this.target, t = e.guide.getChildByName("sp");
t.getComponent(sp.Skeleton).animation = 1;
t.getComponent(sp.Skeleton).loop = !1;
e.guide.active = !1;
},
checkOperateDir: function(e) {
var t = !0;
if (1 == cc.YL.GuideMap) {
if (cc.YL.OperateIdx > 5) return !0;
t = this.check_Guide_1_Move(e);
} else if (2 == cc.YL.GuideMap) {
if (cc.YL.OperateIdx > 2) return !0;
t = this.check_Guide_2_Move(e);
}
return t;
},
updateOperateIdx: function() {
1 == cc.YL.GuideMap ? this.update_Guide_1_Operate() : 2 == cc.YL.GuideMap && this.update_Guide_2_Operate();
},
show_Guide_1_Dialogue: function() {
var e = this.guide_1_Desc;
if (cc.YL.DialogueIdx > utils.getCvsLength(e)) {
cc.YL.GuideMap = 2;
cc.YL.OperateIdx = 1;
cc.YL.DialogueIdx = 1;
cc.YL.GuideSpIdx = 1;
cc.YL.SceneManager.LoadScene("Map");
} else {
var t = void 0;
if (1 == cc.YL.OperateIdx) t = 2; else if (5 == cc.YL.OperateIdx) t = 4; else if (6 == cc.YL.OperateIdx) t = 5; else {
if (7 != cc.YL.OperateIdx) return;
t = 6;
}
var i = this.target.node.parent.getChildByName("Dialogue");
if (i) if (cc.YL.DialogueIdx > t) {
i.active = !1;
this.showGuideSpine();
} else {
6 == cc.YL.DialogueIdx && this.hideGuideSpine();
var n = i.getChildByName("box"), a = n.getChildByName("left"), s = n.getChildByName("right");
i.getChildByName("tips");
a.opacity = 0;
s.opacity = 0;
var c = a;
c.stopAllActions();
c.getChildByName("head").getComponent(cc.Sprite).spriteFrame = o.spriteFrame["Plot_Guide".toUpperCase()];
c.getChildByName("dialogue").getComponent(cc.RichText).string = e[cc.YL.DialogueIdx];
var r = cc.fadeIn(.2);
c.runAction(r);
cc.YL.DialogueIdx++;
}
}
},
check_Guide_1_Move: function(e) {
var t = this.target, i = e == {
1: "right",
2: "down",
3: "left",
4: "up",
5: ""
}[cc.YL.OperateIdx];
if (i) {
if ("" == e) {
cc.YL.OperateIdx++;
t.playerNode.getComponent("Player").paused = !1;
this.showGuideDialogue();
}
this.hideGuideSpine();
}
return i;
},
update_Guide_1_Operate: function() {
var e = this.target, t = {
1: cc.v2(11, 18),
2: cc.v2(11, 22),
3: cc.v2(3, 22),
4: cc.v2(3, 18),
6: cc.v2(8, 7)
}, i = !1;
for (var o in t) {
var n = 64 * t[o].x, a = this.player.getTileYToPos(t[o].y);
if (Math.abs(e.playerNode.x - n) <= this.player.moveSpeed && Math.abs(e.playerNode.y - a) <= this.player.moveSpeed && parseInt(o) == cc.YL.OperateIdx) {
i = !0;
break;
}
}
if (i) {
if (this.deciding) {
this.deciding = !1;
cc.YL.OperateIdx++;
console.log("OperateIdx:", cc.YL.OperateIdx);
5 == cc.YL.OperateIdx ? this.player.paused = !0 : 7 == cc.YL.OperateIdx ? cc.YL.TouchMoveDir = "" : this.showGuideSpine();
this.showGuideDialogue();
}
} else this.deciding = !0;
},
show_Guide_2_Dialogue: function() {
var e = this.guide_2_Desc;
if (cc.YL.DialogueIdx > utils.getCvsLength(e)) {
cc.YL.GuideInfo[0] = 1;
cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
cc.YL.DialogueIdx = 1;
cc.YL.GuideSpIdx = 1;
cc.YL.SceneManager.LoadScene("Hall");
} else {
var t = this.target.node.parent.getChildByName("Dialogue");
if (t) {
var i = void 0;
if (1 == cc.YL.OperateIdx) i = 2; else if (2 == cc.YL.OperateIdx) i = 3; else {
if (3 == cc.YL.OperateIdx) {
t.active = !1;
this.upgradeDiamond();
return;
}
if (4 == cc.YL.OperateIdx) i = 8; else {
if (5 != cc.YL.OperateIdx) return;
i = 9;
}
}
if (cc.YL.DialogueIdx > i) {
t.active = !1;
this.showGuideSpine();
} else {
t.getChildByName("rule").active = 7 == cc.YL.DialogueIdx;
var n = t.getChildByName("box"), a = n.getChildByName("left"), s = n.getChildByName("right");
t.getChildByName("tips");
a.opacity = 0;
s.opacity = 0;
var c = a;
c.stopAllActions();
c.getChildByName("head").getComponent(cc.Sprite).spriteFrame = o.spriteFrame["Plot_Guide".toUpperCase()];
c.getChildByName("dialogue").getComponent(cc.RichText).string = e[cc.YL.DialogueIdx];
var r = cc.fadeIn(.2);
c.runAction(r);
cc.YL.DialogueIdx++;
}
}
}
},
check_Guide_2_Move: function(e) {
return e == {
1: "right",
2: "right"
}[cc.YL.OperateIdx];
},
update_Guide_2_Operate: function() {
var e = this.target, t = {
1: cc.v2(7, 19),
2: cc.v2(9, 19)
}, i = !1;
for (var o in t) {
var n = 64 * t[o].x, a = this.player.getTileYToPos(t[o].y);
if (Math.abs(e.playerNode.x - n) <= this.player.moveSpeed && Math.abs(e.playerNode.y - a) <= this.player.moveSpeed && parseInt(o) == cc.YL.OperateIdx) {
i = !0;
break;
}
}
if (i) {
if (this.deciding) {
this.deciding = !1;
cc.YL.OperateIdx++;
console.log("OperateIdx:", cc.YL.OperateIdx);
cc.YL.TouchMoveDir = "";
this.showGuideSpine();
}
} else this.deciding = !0;
},
upgradeDiamond: function() {
var e = this.target;
e.clickBlock.active = !0;
var t = cc.v2(11, 19);
e.mask.setScale(9);
e.mask.active = !0;
e.mask.runAction(cc.sequence(cc.scaleTo(.5, 1), cc.delayTime(.5), cc.callFunc(function() {
e._showDiamond(t, 1, !0);
e.diamond.setTileGIDAt(e.diamondFirstGID + 1, t);
setTimeout(function() {
e.clickBlock.active = !1;
e.mask.active = !1;
cc.YL.OperateIdx++;
this.showGuideDialogue();
}.bind(this), 500);
}.bind(this))));
},
initNormalStageGuide: function() {
this.normal_1_Desc = {
1: "恭喜你正式成为路特戈登的一员，相信你已经掌握了作为猎宝人的基础知识，接下来我要告诉你猎宝过程的一些注意事项。",
2: "在猎宝过程中，我们有许多任务需要完成，不同的关卡有不同的任务，<color=#ff0000>只有完成这些任务，才算猎宝成功</>。",
3: "由于哥布林的营地存在很多潜在的危险，你<color=#ff0000>必须在指定的时间内完成任务，否则猎宝失败</>！",
4: "当然，完成任务的前提是你必须活着，这个代表你的生命值，<color=#ff0000>如果它变为0，那么猎宝也就失败了</>！",
5: "这是金币，是你在营地的收益。<color=#ff0000>收集的宝石等级越高，获得金币越多</>。但是需要你成功完成之后才能获得，失败是没有的哦！",
6: "好了，就这么了，开始你的冒险吧！"
};
this.normal_2_Spine_Info = {
1: {
pos: cc.v2(-305, 670),
rotation: -45,
sp: "Danjiantou"
},
2: {
pos: cc.v2(-70, 670),
rotation: 0,
sp: "Danjiantou"
},
3: {
pos: cc.v2(125, 670),
rotation: 0,
sp: "Danjiantou"
},
4: {
pos: cc.v2(300, 670),
rotation: 0,
sp: "Danjiantou"
}
};
cc.YL.DialogueIdx = 1;
cc.YL.GuideSpIdx = 1;
this.showNormalStageDialogue();
},
showNormalStageDialogue: function() {
var e = this.target, t = void 0;
if (1 == cc.YL.CurrStageCfg.INT_ID) {
t = this.show_Normal_1_Dialogue.bind(this);
var i = e.node.parent.getChildByName("Dialogue");
i || (i = cc.instantiate(e.DialoguePre)).on("click", t);
utils.show(i);
var o = i.getChildByName("box"), n = i.getChildByName("tips");
o.opacity = 0;
n.opacity = 0;
this.dialogueNum = 0;
o.runAction(cc.fadeIn(.2));
n.runAction(cc.fadeIn(.2));
t();
} else e.showStageFlow(!0);
},
showNormalStageSpine: function() {
var e = void 0;
if (1 == cc.YL.CurrStageCfg.INT_ID) {
e = this.normal_2_Spine_Info[cc.YL.GuideSpIdx];
var t = this.target;
if (e) {
t.guide.active = !0;
t.guide.setPosition(e.pos);
t.guide.zIndex = 100;
var i = t.guide.getChildByName("desc"), o = t.guide.getChildByName("sp");
i.active = !1;
o.rotation = e.rotation;
o.getComponent(sp.Skeleton).setAnimation(0, e.sp, !0);
cc.YL.GuideSpIdx++;
} else this.hideGuideSpine();
}
},
show_Normal_1_Dialogue: function() {
var e = this.target, t = this.normal_1_Desc, i = e.node.parent.getChildByName("Dialogue");
if (i) if (cc.YL.DialogueIdx > utils.getCvsLength(t)) {
cc.YL.GuideInfo[1] = 1;
cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
cc.YL.DialogueIdx = 1;
cc.YL.GuideSpIdx = 1;
i.removeFromParent();
i.destroy();
e.showStageFlow(!0);
} else {
cc.YL.DialogueIdx > 1 && cc.YL.DialogueIdx < 6 ? this.showNormalStageSpine() : this.hideGuideSpine();
var n = i.getChildByName("box"), a = n.getChildByName("left"), s = n.getChildByName("right");
i.getChildByName("tips");
a.opacity = 0;
s.opacity = 0;
var c = a;
c.stopAllActions();
c.getChildByName("head").getComponent(cc.Sprite).spriteFrame = o.spriteFrame["Plot_Guide".toUpperCase()];
c.getChildByName("dialogue").getComponent(cc.RichText).string = t[cc.YL.DialogueIdx];
var r = cc.fadeIn(.2);
c.runAction(r);
cc.YL.DialogueIdx++;
}
},
showCompleteGuide: function() {
if (1 == cc.YL.ClearStage && !cc.YL.GuideInfo.h1) {
var e = this.target, t = e.node.parent.getChildByName("StageComplete");
if (!t) return;
var i = t.getChildByName("guide");
i.active = !0;
i.getChildByName("block").getChildByName("receive").on("click", function() {
e.clickBlock.active = !0;
audio.playEffect("UI_Button");
t.active = !1;
this.hideGuideSpine();
e.cloud.getComponent(sp.Skeleton).setCompleteListener(function() {
cc.YL.SceneManager.LoadScene("Hall");
});
e.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", !1);
}.bind(this));
e.guide.active = !0;
e.guide.setPosition(140, -145);
e.guide.zIndex = 100;
var o = e.guide.getChildByName("desc"), n = e.guide.getChildByName("sp");
o.active = !1;
n.rotation = 180;
n.getComponent(sp.Skeleton).setAnimation(0, "Danjiantou", !0);
}
},
initHallGuide: function() {
this.hall_1_Desc = {
1: "哟！不错嘛，是块当猎宝人的料！作为奖励，这里有一个哥布林的箱子送你，<color=#ff0000>只要达到开箱要求</>，你都可以领取奖励！"
};
this.hall_2_Desc = {
1: "嗨！好久不见了，看来你成长了不少！是时候传授你一些知识了！",
2: "我们路特戈登有自己的商会，专门为各位猎宝人提供各种便利道具。下面，我们就来看看有哪些东西吧！",
3: "",
4: "目前以你的实力，商会只能向你提供一个道具。等你强大了，就可以获得更多的道具了。",
5: "这些道具都是要收费，你可以使用你闯关获得的<color=#ff0000>金币来购买这些道具</>！已经拥有的道具，可以<color=#ff0000>在闯关过程中使用</>。",
6: "这些道具都有使用次数的限制，买的越多，使用次数也越多。接下来你尝试一下购买<color=#ff0000>3个恢复生命</>的道具吧！",
7: "嗯！看来你准备好了，赶紧去冒险吧！"
};
this.hall_2_Spine_Info = {
1: {
pos: cc.v2(-305, 670),
rotation: -45,
sp: "Danjiantou"
},
2: {
pos: cc.v2(-70, 670),
rotation: 0,
sp: "Danjiantou"
},
3: {
pos: cc.v2(125, 670),
rotation: 0,
sp: "Danjiantou"
},
4: {
pos: cc.v2(300, 670),
rotation: 0,
sp: "Danjiantou"
}
};
cc.YL.DialogueIdx = 1;
cc.YL.GuideSpIdx = 1;
this.showHallDialogue();
},
showHallDialogue: function() {
var e = cc.find("Canvas").getComponent("Hall"), t = void 0;
if (cc.YL.FirstEnter || cc.YL.GuideInfo.h1) {
if (7 != cc.YL.ClearStage || cc.YL.GuideInfo.h2) return;
t = this.show_Hall_2_Dialogue.bind(this);
} else t = this.show_Hall_1_Dialogue.bind(this);
var i = e.node.getChildByName("Dialogue");
i || (i = cc.instantiate(e.DialoguePre)).on("click", t);
utils.show(i);
var o = i.getChildByName("box"), n = i.getChildByName("tips");
o.opacity = 0;
n.opacity = 0;
this.dialogueNum = 0;
o.runAction(cc.fadeIn(.2));
n.runAction(cc.fadeIn(.2));
t();
},
show_Hall_1_Dialogue: function() {
var e = this.hall_1_Desc, t = cc.find("Canvas").getComponent("Hall"), i = t.node.getChildByName("Dialogue");
if (cc.YL.DialogueIdx > utils.getCvsLength(e)) {
i.active = !1;
var n = t.node.getChildByName("GuideTreasure"), a = n.getChildByName("mask");
a.setScale(9);
n.active = !0;
a.runAction(cc.sequence(cc.scaleTo(.2, 1), cc.callFunc(function() {
n.getChildByName("sp").getComponent(sp.Skeleton).setAnimation(0, "Danjiantou", !0);
}.bind(this))));
n.getChildByName("block").getChildByName("treasure").on("click", function() {
cc.YL.GuideInfo.h1 = 1;
cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
n.getChildByName("sp").getComponent(sp.Skeleton).animation = 1;
n.getChildByName("sp").getComponent(sp.Skeleton).loop = !1;
n.active = !1;
t.onTreasureBoxClick();
});
} else {
var s = i.getChildByName("box"), c = s.getChildByName("left"), r = s.getChildByName("right");
i.getChildByName("tips");
c.opacity = 0;
r.opacity = 0;
var l = c;
l.stopAllActions();
l.getChildByName("head").getComponent(cc.Sprite).spriteFrame = o.spriteFrame["Plot_Guide".toUpperCase()];
l.getChildByName("dialogue").getComponent(cc.RichText).string = e[cc.YL.DialogueIdx];
var h = cc.fadeIn(.2);
l.runAction(h);
cc.YL.DialogueIdx++;
}
},
show_Hall_2_Dialogue: function() {
var e = this.hall_2_Desc, t = cc.find("Canvas").getComponent("Hall"), i = t.node.getChildByName("Dialogue");
i.zIndex = 100;
if (cc.YL.DialogueIdx > utils.getCvsLength(e)) {
i.active = !1;
cc.YL.GuideInfo.h2 = 1;
cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
} else if (3 != cc.YL.DialogueIdx) if (6 != cc.YL.DialogueIdx) {
i.active = !0;
var n = i.getChildByName("box"), a = n.getChildByName("left"), s = n.getChildByName("right");
i.getChildByName("tips");
a.opacity = 0;
s.opacity = 0;
var c = a;
c.stopAllActions();
c.getChildByName("head").getComponent(cc.Sprite).spriteFrame = o.spriteFrame["Plot_Guide".toUpperCase()];
c.getChildByName("dialogue").getComponent(cc.RichText).string = e[cc.YL.DialogueIdx];
var r = cc.fadeIn(.2);
c.runAction(r);
cc.YL.DialogueIdx++;
} else {
this.skillBuy = 0;
i.active = !1;
var l = t.node.getChildByName("SkillInfo"), h = l.getChildByName("guide");
h.active = !0;
h.getChildByName("sp").getComponent(sp.Skeleton).setAnimation(0, "Shou_Dianji", !0);
h.getChildByName("block").getChildByName("buy").on("click", function() {
cc.YL.PlayerInfo.coin -= 50;
t.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
cc.YL.SkillInfo.Heart++;
l.getChildByName("box").getChildByName("skill").getChildByName("skill1").getChildByName("count").getChildByName("num").getComponent(cc.Label).string = cc.YL.SkillInfo.Heart || 0;
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
this.skillBuy++;
if (this.skillBuy >= 3) {
h.active = !1;
this.show_Hall_2_Dialogue();
}
}.bind(this));
cc.YL.DialogueIdx++;
} else {
i.active = !1;
var d = t.node.getChildByName("GuideSkill"), m = d.getChildByName("mask");
m.setScale(9);
d.active = !0;
m.runAction(cc.sequence(cc.scaleTo(.2, 1), cc.callFunc(function() {
d.getChildByName("sp").getComponent(sp.Skeleton).setAnimation(0, "Danjiantou", !0);
}.bind(this))));
d.getChildByName("block").getChildByName("treasure").on("click", function() {
d.getChildByName("sp").getComponent(sp.Skeleton).animation = 1;
d.getChildByName("sp").getComponent(sp.Skeleton).loop = !1;
d.active = !1;
t.onBtnSkillClick();
this.show_Hall_2_Dialogue();
cc.YL.PlayerInfo.coin += 400;
t.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
}.bind(this));
cc.YL.DialogueIdx++;
}
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes"
} ],
Hall: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "062d4yQrCZDro7Pl/Djv9xd", "Hall");
var o = e("./funCsv"), n = e("./GameRes"), a = e("./Guide");
cc.Class({
extends: cc.Component,
properties: {
StagePartPre: cc.Prefab,
StageInfoPre: cc.Prefab,
RoleChoice: cc.Prefab,
SkillInfoPre: cc.Prefab,
SettingPre: cc.Prefab,
PlayerPre: cc.Prefab,
TreasurePre: cc.Prefab,
DialoguePre: cc.Prefab
},
onLoad: function() {
utils.init();
popup.init();
audio.playMusic("BGM_Main");
this.bindNode();
this.cloud.x = 0;
o.turnCsvToJson("Csv/stage", function(e) {
cc.YL.loadMapStage = -1;
cc.YL.StageConfig = e;
this.initUI();
this.loadCurRole();
}.bind(this));
this.initAdCount();
this.initEnergy();
},
bindNode: function() {
this.cloud = this.node.getChildByName("Cloud");
this.stageView = this.node.getChildByName("stageView");
this.stageContent = this.stageView.getChildByName("content");
this.stars = this.node.getChildByName("Stars");
this.coin = this.node.getChildByName("Coin");
this.energy = this.node.getChildByName("Energy");
this.treasure = this.node.getChildByName("Box");
this.block = this.node.getChildByName("ClickBlock");
this.block.zIndex = 1e4;
},
initUI: function() {
this.stars.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.stars;
this.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
o.turnCsvToJson("Csv/area", function(e) {
cc.YL.PageConfig = e;
this.getLocalData();
this.addStagePart();
cc.YL.FirstEnter && (this.node.getChildByName("GuideCover").active = !0);
this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Xiaosan", !1);
}.bind(this));
o.turnCsvToJson("Csv/goblinbox", function(e) {
cc.YL.TreasureCfg = e;
cc.YL.TreasureIdx = 0;
var t = cc.sys.localStorage.getItem("treasureIdx");
t && (cc.YL.TreasureIdx = JSON.parse(t));
var i = e[cc.YL.TreasureIdx + 1];
i && cc.YL.PlayerInfo.stars >= parseInt(i.INT_NeedStar) && cc.YL.ClearStage >= parseInt(i.INT_NeedStage) && cc.find("Canvas/Box/sp").getComponent(sp.Skeleton).setAnimation(0, "Youjiang", !0);
this.treasure.getComponent(cc.Button).interactable = !0;
setTimeout(function() {
a.getInstance().initHallGuide();
}, 500);
}.bind(this));
},
getLocalData: function() {
cc.YL.StageInfo = [];
cc.YL.ClearStage = 0;
var e = cc.sys.localStorage.getItem("stageInfo");
e && (cc.YL.StageInfo = JSON.parse(e));
var t = cc.sys.localStorage.getItem("currStage");
if (t) {
t = JSON.parse(t);
cc.YL.ClearStage = parseInt(t);
this.stagePage = parseInt(t) / 10;
console.log("当前关卡:", t);
} else this.stagePage = 1;
this.totalPage = o.getJsonLength(cc.YL.PageConfig);
this.stagePage < 1 && (this.stagePage = 1);
this.stagePage > this.totalPage && (this.stagePage = this.totalPage);
var i = cc.sys.localStorage.getItem("unlockPage");
i = i ? parseInt(JSON.parse(i)) : 0;
for (var n = 1; n <= this.totalPage; ++n) {
if (!(cc.YL.PageConfig[n].INT_LockStar <= 0 || n <= i)) {
cc.YL.UnlockPage < Math.ceil(this.stagePage) && (cc.YL.UnlockPage = Math.ceil(this.stagePage));
break;
}
cc.YL.UnlockPage = n;
}
},
addStagePart: function() {
for (var e = 0; e < cc.YL.UnlockPage; ++e) this.initUnitPage(e);
var t = (cc.YL.ClearStage + 1) / 10, i = t <= 1 ? 0 : t / cc.YL.UnlockPage;
this.stageView.getComponent(cc.ScrollView).scrollToPercentVertical(i, 0);
},
initUnitPage: function(e) {
var t = this, i = cc.instantiate(this.StagePartPre), a = cc.YL.PageConfig[e + 1].STR_Resource;
n.spriteFrame[a.toUpperCase()] && (i.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[a.toUpperCase()]);
if (e + 1 == cc.YL.UnlockPage && e + 1 < this.totalPage) {
var s = i.getChildByName("unlock");
s.active = !0;
s.getChildByName("btn_unlock").getChildByName("lab").getComponent(cc.Label).string = "解锁" + cc.YL.PageConfig[e + 1 + 1].STR_Name;
s.getChildByName("btn_unlock").getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.stars + "/" + cc.YL.PageConfig[e + 1 + 1].INT_LockStar;
s.getChildByName("btn_unlock").on("click", this.onBtnUnlockClick, this);
var c = parseInt(cc.YL.PageConfig[e + 1 + 1].INT_LockStar);
if (cc.YL.PlayerInfo.stars >= c) {
s.getChildByName("btn_unlock").getChildByName("sp").getComponent(sp.Skeleton).animation = "Shanyao";
utils.shake(s.getChildByName("btn_unlock").getChildByName("count"), !0);
}
}
if (e + 1 == this.totalPage) {
i.getChildByName("develop").active = !0;
}
for (var r = cc.YL.PageConfig[e + 1].STR_Button, l = i.getChildByName("stage").children, h = o.getJsonLength(cc.YL.StageConfig), d = function(i) {
if (cc.YL.StageConfig[i + 1 + 10 * e]) {
l[i].zIndex = h - (i + 1 + 10 * e);
if (i + 1 + 10 * e == cc.YL.ClearStage + 1 || i + 1 + 10 * e == cc.YL.ClearStage && i + 1 + 10 * e == 10 * cc.YL.UnlockPage) {
t.playerShow = t.playerShow || cc.instantiate(t.PlayerPre);
l[i].addChild(t.playerShow);
t.playerShow.setPosition(-30, 0);
t.playerShow.getComponent("Player").hallStand = !0;
}
i + 1 + 10 * e <= cc.YL.ClearStage + 1 && (l[i].getChildByName("star").active = !0);
l[i].id = i + 1 + 10 * e;
var o = cc.YL.StageInfo.find(function(t) {
return t.id == i + 1 + 10 * e;
});
n.spriteFrame[r.toUpperCase()] && (l[i].getComponent(cc.Sprite).spriteFrame = n.spriteFrame[r.toUpperCase()]);
if (o && o.star > 0) for (var a = l[i].getChildByName("star").children, s = 0; s < o.star; ++s) a[s].getChildByName("reach").active = !0;
l[i].getChildByName("lab").getComponent(cc.Label).string = i + 1 + 10 * e;
var c = parseInt(cc.YL.StageConfig[i + 1 + 10 * e].INT_X), d = parseInt(cc.YL.StageConfig[i + 1 + 10 * e].INT_Y);
l[i].setPosition(c, d);
l[i].on("click", t.onStageClick, t);
} else l[i].active = !1;
}, m = 0; m < l.length; ++m) d(m);
this.stageContent.addChild(i);
},
showStageInfo: function(e) {
var t = cc.YL.StageConfig[e];
if (t) {
cc.YL.CurrStageCfg = t;
cc.YL.CurrStageInfo = cc.YL.StageInfo.find(function(t) {
return t.id == e;
});
cc.YL.CurrStageInfo || (cc.YL.CurrStageInfo = {
id: cc.YL.CurrStageCfg.INT_ID,
story: 0,
guide: 0,
star: 0,
highScore: 0,
time: 0
});
var i = this.node.getChildByName("StageInfo");
i || (i = cc.instantiate(this.StageInfoPre));
utils.show(i);
i.getChildByName("box").getChildByName("stageNum").getChildByName("lab").getComponent(cc.Label).string = "第" + t.INT_ID + "关";
var o = i.getChildByName("box").getChildByName("rate");
if (cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.star > 0) for (var a = o.children, s = 0; s < cc.YL.CurrStageInfo.star; ++s) a[s].getChildByName("reach").active = !0;
for (var c = i.getChildByName("box").getChildByName("goal").getChildByName("goals").children, r = 0; r < c.length; ++r) {
var l = parseInt(t["INT_Condition_" + (r + 1)]);
if (l) {
c[r].active = !0;
var h = "Stage_Target_" + l;
c[r].getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[h.toUpperCase()];
var d = "x" + t["INT_Count_" + (r + 1)];
1 == l && (d = "全部收集");
c[r].getChildByName("desc").getComponent(cc.Label).string = d;
} else c[r].active = !1;
}
i.getChildByName("box").getChildByName("btnStart").on("click", function() {
audio.playEffect("UI_Button");
this.initSkillInfo(!0);
}.bind(this));
i.getChildByName("box").getChildByName("btnClose").on("click", function() {
audio.playEffect("UI_Button");
utils.hide(i);
});
}
},
loadCurRole: function() {
var e = cc.sys.localStorage.getItem("playerRole");
e && (cc.YL.PlayerRole = e);
var t = cc.sys.localStorage.getItem("unlockRole");
if (t) cc.YL.unlockRole = JSON.parse(t); else {
cc.YL.unlockRole = [];
cc.sys.localStorage.setItem("unlockRole", JSON.stringify(cc.YL.unlockRole));
}
},
initEnergy: function() {
cc.YL.MaxEnergy = 12;
cc.YL.EnergyInterval = 300;
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
this.energy.getChildByName("time").active = !1;
cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
} else if (cc.YL.EnergyInfo.lastTime) {
var e = Date.now() - cc.YL.EnergyInfo.lastTime;
if (e > 1e3 * cc.YL.EnergyInterval) {
cc.YL.EnergyInfo.curr += Math.floor(e / (1e3 * cc.YL.EnergyInterval));
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
utils.stopEnergyRecover();
} else {
cc.YL.EnergyInfo.lastTime += Math.floor(e / (1e3 * cc.YL.EnergyInterval)) * cc.YL.EnergyInterval * 1e3;
var t = e % (1e3 * cc.YL.EnergyInterval);
cc.YL.RecoverTime = cc.YL.EnergyInterval - Math.floor(t / 1e3);
utils.startEnergyRecover();
}
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
} else {
cc.YL.RecoverTime = cc.YL.EnergyInterval - Math.floor(e / 1e3);
utils.startEnergyRecover();
}
} else {
utils.startEnergyRecover(!0);
cc.YL.EnergyInfo.lastTime = Date.now();
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
}
this.energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
},
initAdCount: function() {
cc.YL.MaxAdCount = 3;
cc.YL.AdCount = 0;
var e = cc.sys.localStorage.getItem("adCount");
e && (cc.YL.AdCount = JSON.parse(e));
var t = cc.sys.localStorage.getItem("enterTime");
if (t) {
var i = JSON.parse(t), o = new Date(i).getDate();
new Date().getDate() > o && (cc.YL.AdCount = 0);
} else cc.YL.AdCount = 0;
cc.sys.localStorage.setItem("enterTime", JSON.stringify(Date.now()));
},
initSkillInfo: function(e) {
o.turnCsvToJson("Csv/skill", function(t) {
if (t[1].INT_LockStage > cc.YL.ClearStage && e) {
this.block.active = !0;
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.lastTime = Date.now();
utils.startEnergyRecover(!0);
} else cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
this.energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
var i = this.node.getChildByName("StageInfo");
if (i) {
var o = i.getChildByName("box").getChildByName("btnStart").getChildByName("energy");
o.active = !0;
o.opacity = 0;
o.y = 15;
o.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.moveBy(.5, 0, 70)), cc.fadeOut(.2), cc.callFunc(function() {
utils.hide(i);
this.cloud.getComponent(sp.Skeleton).setCompleteListener(function() {
cc.YL.SceneManager.LoadScene("Map");
});
this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", !1);
}.bind(this))));
}
} else this.showSkillInfo(e);
}.bind(this));
},
showSkillInfo: function(e) {
o.turnCsvToJson("Csv/skill", function(t) {
var i = this, o = this.node.getChildByName("StageInfo");
o && utils.hide(o);
var a = this.node.getChildByName("SkillInfo");
a || (a = cc.instantiate(this.SkillInfoPre));
utils.show(a);
a.getChildByName("box").getChildByName("bg1_1").active = e && !0;
a.getChildByName("box").getChildByName("bg2_1").active = e && !0;
a.getChildByName("box").getChildByName("bg1").active = !e;
a.getChildByName("box").getChildByName("bg2").active = !e;
a.getChildByName("box").getChildByName("title").y = e ? 358 : 316;
a.getChildByName("box").getChildByName("btnClose").y = e ? 358 : 316;
a.getChildByName("box").getChildByName("skill").y = e ? 310 : 255;
a.getChildByName("box").getChildByName("lock").y = e ? 310 : 255;
var s = a.getChildByName("box").getChildByName("skill"), c = a.getChildByName("box").getChildByName("lock");
s.active = !0;
c.active = !0;
var r = function(e) {
var o = s.getChildByName("skill" + t[e].INT_ID);
if (o) {
var a = "Skill_" + t[e].INT_Type;
o.getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[a.toUpperCase()];
o.getChildByName("name").getComponent(cc.Label).string = t[e].STR_Name;
o.getChildByName("desc").getComponent(cc.Label).string = t[e].STR_Desc;
o.getChildByName("price").getChildByName("num").getComponent(cc.Label).string = t[e].INT_Gold;
var r = o.getChildByName("count").getChildByName("num");
r.getComponent(cc.Label).string = cc.YL.SkillInfo[t[e].STR_CodeInfo] || 0;
o.active = parseInt(t[e].INT_LockStage) <= cc.YL.ClearStage;
parseInt(t[e].INT_Gold) > cc.YL.PlayerInfo.coin && (o.getChildByName("btnBuy").getComponent(cc.Button).interactable = !1);
o.getChildByName("btnBuy").on("click", function() {
if (cc.YL.SkillInfo[t[e].STR_CodeInfo] >= 0 && cc.YL.PlayerInfo.coin >= parseInt(t[e].INT_Gold)) {
cc.YL.PlayerInfo.coin -= parseInt(t[e].INT_Gold);
this.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
cc.YL.SkillInfo[t[e].STR_CodeInfo]++;
r.getComponent(cc.Label).string = cc.YL.SkillInfo[t[e].STR_CodeInfo] || 0;
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
} else popup.show({
str: "金币不足！"
});
}.bind(i));
}
var l = c.getChildByName("lock" + t[e].INT_ID);
if (l) {
l.getChildByName("desc").getComponent(cc.Label).string = "第" + t[e].INT_LockStage + "关解锁";
l.active = parseInt(t[e].INT_LockStage) > cc.YL.ClearStage;
}
};
for (var l in t) r(l);
a.getChildByName("box").getChildByName("btnEnter").active = e && !0;
a.getChildByName("box").getChildByName("btnClose").on("click", this.onSkillCloseClick, this);
a.getChildByName("box").getChildByName("btnEnter").on("click", this.onSkillEnterClick, this);
}.bind(this));
},
onBtnUnlockClick: function(e) {
audio.playEffect("UI_Button");
if (cc.YL.PageConfig[cc.YL.UnlockPage + 1]) {
if (parseInt(cc.YL.PageConfig[cc.YL.UnlockPage + 1].INT_LockStar) <= cc.YL.PlayerInfo.stars) {
this.block.active = !0;
cc.YL.UnlockPage += 1;
cc.sys.localStorage.setItem("unlockPage", JSON.stringify(cc.YL.UnlockPage));
e.target.getComponent(cc.Button).interactable = !1;
e.target.runAction(cc.fadeOut(.2));
this.playerShow && cc.YL.ClearStage + 1 > 10 * (cc.YL.UnlockPage - 1) && this.playerShow.removeFromParent();
this.initUnitPage(cc.YL.UnlockPage - 1);
var t = e.target.parent.getChildByName("spine");
t.getComponent(sp.Skeleton).setCompleteListener(function() {
var e = (cc.YL.ClearStage + 1) / 10, t = e <= 1 ? 0 : e / cc.YL.UnlockPage;
this.stageView.getComponent(cc.ScrollView).scrollToPercentVertical(t, .5);
this.block.active = !1;
}.bind(this));
t.getComponent(sp.Skeleton).setAnimation(0, "Xiaosan", !1);
} else popup.show({
str: "星星不足！通关关卡获取更多星星吧！"
});
}
},
onStageClick: function(e) {
audio.playEffect("UI_Button");
this.stageView.getComponent(cc.ScrollView).stopAutoScroll();
cc.YL.loadMapStage = e.target.id;
e.target.id > cc.YL.ClearStage + 1 ? popup.show({
str: "请先完成当前关卡"
}) : this.showStageInfo(e.target.id);
},
onAddEnergyClick: function() {
audio.playEffect("UI_Button");
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) popup.show({
str: "体力已满！"
}); else {
cc.YL.EnergyInfo.curr += 4;
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
utils.stopEnergyRecover();
}
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
}
},
onTreasureBoxClick: function() {
audio.playEffect("UI_Button");
var e = this.node.getChildByName("TreasureBox");
e || (e = cc.instantiate(this.TreasurePre));
utils.show(e);
},
onClickPlayRole: function() {
audio.playEffect("UI_Button");
var e = this.node.getChildByName("RoleChoice") ? this.node.getChildByName("RoleChoice") : cc.instantiate(this.RoleChoice);
utils.show(e);
},
onBtnSkillClick: function() {
audio.playEffect("UI_Button");
this.initSkillInfo();
},
onSkillCloseClick: function() {
audio.playEffect("UI_Button");
var e = this.node.getChildByName("SkillInfo");
e && utils.hide(e);
},
onSkillEnterClick: function() {
audio.playEffect("UI_Button");
var e = function() {
var e = this.node.getChildByName("SkillInfo");
if (e) {
this.block.active = !0;
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.lastTime = Date.now();
utils.startEnergyRecover(!0);
} else cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
this.energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
var t = e.getChildByName("box").getChildByName("btnEnter").getChildByName("energy");
t.active = !0;
t.opacity = 0;
t.y = 15;
t.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.moveBy(.5, 0, 70)), cc.fadeOut(.2), cc.callFunc(function() {
utils.hide(e);
this.cloud.getComponent(sp.Skeleton).setCompleteListener(function() {
cc.YL.SceneManager.LoadScene("Map");
});
this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", !1);
}.bind(this))));
}
}.bind(this);
utils.checkEnergyAndAd(e);
},
onBtnFileClick: function() {
audio.playEffect("UI_Button");
popup.show({
str: "敬请期待!!"
});
},
onBtnCommunityClick: function() {
audio.playEffect("UI_Button");
cc.sys.openURL("https://www.taptap.com/app/164414");
},
onBtnSetClick: function() {
audio.playEffect("UI_Button");
var e = this.node.getChildByName("Setting");
e || (e = cc.instantiate(this.SettingPre));
e.getChildByName("box").getChildByName("btnReplay").active = !1;
e.getChildByName("box").getChildByName("btnExit").active = !1;
utils.show(e);
},
onBtnStarClick: function() {
this.clickStar = this.clickStar || 0;
this.clickStar += 1;
if (3 == this.clickStar) {
this.node.getChildByName("WriteData").active = !0;
this.clickStar = 0;
}
},
onBtnCoinClick: function() {
this.node.getChildByName("WriteData").active = !1;
},
onBtnWriteDataClick: function() {
audio.playEffect("UI_Button");
this.node.getChildByName("WriteBoard").active = !0;
},
onBtnResetClick: function() {
audio.playEffect("UI_Button");
cc.sys.localStorage.removeItem("readStory");
for (var e = 0; e < cc.YL.StageInfo.length; ++e) {
cc.YL.StageInfo[e].story = 0;
cc.YL.StageInfo[e].guide = 0;
}
cc.sys.localStorage.setItem("stageInfo", JSON.stringify(cc.YL.StageInfo));
cc.sys.localStorage.removeItem("guideFinish");
cc.YL.SceneManager.LoadScene("Login");
},
onBtnResetBoxClick: function() {
audio.playEffect("UI_Button");
cc.sys.localStorage.removeItem("treasureIdx");
cc.YL.SceneManager.LoadScene("Hall");
},
onBtnResetSkillClick: function() {
for (var e in cc.YL.SkillInfo) cc.YL.SkillInfo[e] = 0;
cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
cc.YL.SceneManager.LoadScene("Hall");
},
onBtnResetStageClick: function() {
for (var e = 0; e < cc.YL.StageInfo.length; ++e) cc.YL.StageInfo[e].star = 0;
cc.YL.PlayerInfo.stars = 0;
cc.sys.localStorage.setItem("stageInfo", JSON.stringify(cc.YL.StageInfo));
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
cc.YL.SceneManager.LoadScene("Hall");
},
onBtnConfirmWriteClick: function(e) {
audio.playEffect("UI_Button");
var t = e.target.parent, i = t.getChildByName("star"), o = t.getChildByName("coin"), n = t.getChildByName("currStage"), a = t.getChildByName("unlockPage"), s = parseInt(i.getChildByName("editBox").getComponent(cc.EditBox).string), c = parseInt(o.getChildByName("editBox").getComponent(cc.EditBox).string), r = parseInt(n.getChildByName("editBox").getComponent(cc.EditBox).string), l = parseInt(a.getChildByName("editBox").getComponent(cc.EditBox).string);
s >= 0 && (cc.YL.PlayerInfo.stars = s);
c >= 0 && (cc.YL.PlayerInfo.coin = c);
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
r > 0 && cc.sys.localStorage.setItem("currStage", JSON.stringify(r));
l > 0 && cc.sys.localStorage.setItem("unlockPage", JSON.stringify(l));
cc.YL.SceneManager.LoadScene("Hall");
},
onBtnCloseWriteClick: function() {
audio.playEffect("UI_Button");
this.node.getChildByName("WriteBoard").active = !1;
},
onBtnFirstEnterClick: function() {
audio.playEffect("UI_Button");
this.stageView.getComponent(cc.ScrollView).stopAutoScroll();
cc.YL.loadMapStage = 1;
this.showStageInfo(1);
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes",
"./Guide": "Guide",
"./funCsv": "funCsv"
} ],
Ice: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "7d3d13RHEhDv7q4TS2XVdBX", "Ice");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.colliderPlayerNode = this.mapComp.playerNode;
},
onDisable: function() {
this.node.getComponent(sp.Skeleton).animation = "Chuxian";
},
start: function() {
this.node.zIndex = 100;
},
showIceNode: function() {
this.isIce = !1;
this.node.getComponent(sp.Skeleton).animation = "Chuxian";
this.node.active = !0;
this.node.getComponent(sp.Skeleton).loop = !1;
this.node.getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.getComponent(sp.Skeleton).animation = "Chixu";
this.node.getComponent(sp.Skeleton).loop = !0;
}.bind(this));
},
showIceEffect: function() {
cc.log("冰冻到了玩家");
this.mapComp.stageGoal.ice++;
this.mapComp.checkStageGoal();
this.node.active = !1;
this.isIce = !0;
this.colliderPlayerNode.getComponent("Player").underIce();
},
update: function(e) {}
});
cc._RF.pop();
}, {} ],
Login: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "3f6eaqcNYJMxasFc5fmBUgp", "Login");
var o = e("./GameRes");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
utils.init();
popup.init();
this.bindNode();
this.initLoginUI();
},
start: function() {
this.getLocalPlayerInfo();
this.getGameRes();
this.initGameVolume();
audio.playMusic("BGM_Login");
},
bindNode: function() {
this.loginBtn = this.node.getChildByName("loginBtn");
this.progressBar = this.node.getChildByName("progress");
this.logo = this.node.getChildByName("logo");
this.loading = this.node.getChildByName("loading");
this.sky = this.node.getChildByName("bg").getChildByName("bg_Sky");
this.field = this.node.getChildByName("bg").getChildByName("bg_Field");
this.road = this.node.getChildByName("bg").getChildByName("bg_Road");
this.monster = this.node.getChildByName("bg").getChildByName("monster");
this.female = this.node.getChildByName("bg").getChildByName("female");
this.male = this.node.getChildByName("bg").getChildByName("male");
this.flowerL = this.node.getChildByName("bg").getChildByName("flower1");
this.flowerR = this.node.getChildByName("bg").getChildByName("flower2");
this.story = this.node.getChildByName("story");
this.storyPage = this.story.getChildByName("storyPage");
},
initLoginUI: function() {
this.loginBtn.scale = .2;
this.loginBtn.opacity = 0;
this.loginBtn.active = !1;
this.loading.opacity = 0;
this.loading.active = !1;
this.logo.y = 1100;
this.sky.scale = 1.1;
this.field.scale = 1.1;
this.field.y = -630;
this.road.scale = 1.1;
this.road.y = -890;
this.monster.scale = 1.1;
this.monster.setPosition(-170, -760);
this.female.scale = 1.1;
this.female.setPosition(-500, -435);
this.male.scale = 1.1;
this.male.setPosition(555, -465);
this.flowerL.scale = 1.1;
this.flowerL.setPosition(-410, -765);
this.flowerR.scale = 1.1;
this.flowerR.setPosition(340, -745);
},
getLocalPlayerInfo: function() {
var e = cc.sys.localStorage.getItem("playerRole");
if (e) cc.YL.PlayerRole = e; else {
cc.YL.PlayerRole = 1;
cc.sys.localStorage.setItem("playerRole", cc.YL.PlayerRole);
}
cc.YL.PlayerInfo = {
stars: 0,
coin: 0
};
var t = cc.sys.localStorage.getItem("playerInfo");
t && (cc.YL.PlayerInfo = JSON.parse(t));
cc.YL.SkillInfo = {
Ice: 0,
Heart: 0,
Water: 0,
Fire: 0
};
var i = cc.sys.localStorage.getItem("skillInfo");
i && (cc.YL.SkillInfo = JSON.parse(i));
this.readStory = cc.sys.localStorage.getItem("readStory");
cc.YL.GuideInfo = {};
var o = cc.sys.localStorage.getItem("guideFinish");
o && (cc.YL.GuideInfo = JSON.parse(o));
cc.YL.EnergyInfo = {
curr: 12,
lastTime: 0
};
var n = cc.sys.localStorage.getItem("energyInfo");
n && (cc.YL.EnergyInfo = JSON.parse(n));
},
getGameRes: function() {
this.loading.active = !0;
this.loading.runAction(cc.fadeIn(.2));
o.getInstance(o.ResTag.TEXTURE, function() {
this.gameLoadFinish();
}.bind(this), function(e, t) {
this.updateProgress(e, t);
}.bind(this));
},
initGameVolume: function() {
cc.YL.muteMode = !1;
cc.YL.effectVolume = .8;
cc.YL.musicVolume = .8;
audio.getStorageVolume();
audio.setEffectVolume(cc.YL.effectVolume);
audio.setMusicVolume(cc.YL.musicVolume);
},
showFakeProgress: function() {
for (var e = this, t = function(t) {
setTimeout(function() {
this.updateProgress(t + 1, 188);
}.bind(e), 16 * t);
}, i = 0; i < 188; ++i) t(i);
},
gameLoadFinish: function(e) {
var t = e ? e + 500 : 500;
setTimeout(function() {
this.runLoginAction();
this._chargeHotUpdate();
}.bind(this), t);
},
runLoginAction: function() {
this.loading.stopAllActions();
this.loading.runAction(cc.fadeOut(.2));
this.sky.stopAllActions();
this.sky.runAction(cc.scaleTo(.2, 1));
this.logo.stopAllActions();
this.logo.runAction(cc.moveTo(.2, 0, 295));
this.field.stopAllActions();
this.field.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, 0, -470)));
this.road.stopAllActions();
this.road.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, 0, -468)));
this.monster.stopAllActions();
this.monster.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, -114, -280)));
this.female.stopAllActions();
this.female.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, -245, -290)));
this.male.stopAllActions();
this.male.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, 200, -265)));
this.flowerL.stopAllActions();
this.flowerL.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, -311, -630)));
this.flowerR.stopAllActions();
this.flowerR.runAction(cc.spawn(cc.scaleTo(.2, 1), cc.moveTo(.2, 267, -610)));
},
updateProgress: function(e, t) {
this.loading.getComponent(cc.Label).string = "资源加载中(" + Math.floor(100 * (e / t || 0)) + "%)";
},
_chargeHotUpdate: function() {
cc.sys.isNative, setTimeout(function() {
this.loginBtn.active = !0;
this.loginBtn.runAction(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.2, 1).easing(cc.easeBackOut())));
}.bind(this), 400);
},
showStory: function() {
this.storyPage.stopAllActions();
if (this.storyPageNum > 3) {
if (!this.closeStory) {
this.closeStory = !0;
cc.YL.FirstEnter = !0;
this.storyPage.runAction(cc.fadeOut(.5));
this.showGuideMap();
}
} else {
this.story.active = !0;
this.storyPage.opacity = 0;
var e = "Manga_" + this.storyPageNum;
this.storyPage.getComponent(cc.Sprite).spriteFrame = o.spriteFrame[e.toUpperCase()];
var t = cc.sequence(cc.fadeIn(.5), cc.delayTime(4), cc.fadeOut(.5), cc.callFunc(function() {
this.showStory();
}.bind(this)));
3 == this.storyPageNum && (t = cc.sequence(cc.fadeIn(.5), cc.delayTime(4), cc.callFunc(function() {
this.showStory();
}.bind(this))));
this.storyPage.runAction(t);
this.storyPageNum++;
}
},
showGuideMap: function() {
cc.YL.loadMapStage = 0;
cc.YL.GuideMap = 1;
cc.YL.SceneManager.LoadScene("Map");
},
onClickLoginBtn: function() {
audio.playEffect("UI_Button");
if (this.readStory) cc.YL.GuideInfo[0] ? cc.YL.SceneManager.LoadScene("Hall") : this.showGuideMap(); else {
this.storyPageNum = 1;
this.showStory();
cc.sys.localStorage.setItem("readStory", 1);
}
},
onBtnReadStoryClick: function() {
this.showStory();
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes"
} ],
Map: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "320339hlK1Lsr3rBNvJBIX/", "Map");
var o = e("./funCsv"), n = e("./GameRes"), a = e("./Guide"), s = {
2: "white",
3: "green",
4: "blue",
5: "purple",
6: "orange",
7: "red",
8: "type1",
9: "type2",
10: "venom",
11: "ice"
};
cc.Class({
extends: cc.Component,
properties: {
playerNode: cc.Prefab,
monsterBriNode: cc.Prefab,
triggerNode: cc.Prefab,
triggerProgPre: cc.Prefab,
diamondNode: cc.Prefab,
DialoguePre: cc.Prefab,
GuidePre: cc.Prefab,
StageGoalPre: cc.Prefab,
StageCompletePre: cc.Prefab,
StageFailPre: cc.Prefab,
SettingPre: cc.Prefab
},
onLoad: function() {
utils.init();
popup.init();
a.getInstance(this);
var e = "BGM_Area_" + Math.ceil(cc.YL.loadMapStage / 10);
cc.YL.loadMapStage < 1 && (e = "BGM_Area_1");
audio.playMusic(e);
this.monsterDelay = 1e3;
this.diamondPosArr = [];
this.mapUrl = "Map/stage_" + cc.YL.loadMapStage;
cc.YL.loadMapStage < 1 ? this.mapUrl = "Map/stage_0_" + cc.YL.GuideMap : cc.YL.FirstEnter = !1;
this._initUI();
this._loadMap();
cc.YL.offsetY = 64;
cc.YL.SpliterList = [];
cc.YL.IsCanMove = !0;
cc.YL.slimeDiamondArr = [];
cc.YL.iceDiamondArr = [];
cc.YL.isClickPause = !1;
},
start: function() {},
update: function(e) {},
_initUI: function() {
this.cloud = this.node.parent.getChildByName("Cloud");
this.scoreNode = this.node.parent.getChildByName("Score");
this.lifeNode = this.node.parent.getChildByName("Life");
this.limitNode = this.node.parent.getChildByName("Time");
this.miniGoal = this.node.parent.getChildByName("Goal");
this.emoji = this.node.parent.getChildByName("Emoji");
this.coinJump = this.node.parent.getChildByName("CoinJump");
this.guide = this.node.parent.getChildByName("GuideSp");
this.mask = this.node.parent.getChildByName("Mask");
this.clickBlock = this.node.parent.getChildByName("ClickBlock");
this.clickBlock.zIndex = 1e4;
this.cloud.x = 0;
this.scoreNode.y = this.lifeNode.y = this.limitNode.y = this.miniGoal.y = 1200;
this.stageGoal = {
white: 0,
green: 0,
blue: 0,
purple: 0,
orange: 0,
red: 0,
type1: 0,
type2: 0,
venom: 0,
ice: 0
};
if (cc.YL.loadMapStage < 1) this.clickBlock.active = !0; else {
this.stageTime = cc.YL.CurrStageCfg.INT_Time;
this.limitNode.getChildByName("num").getComponent(cc.Label).string = utils.transTimeFormat(this.stageTime, !0);
for (var e = this.miniGoal.children, t = 2; t < e.length; ++t) {
var i = parseInt(cc.YL.CurrStageCfg["INT_Condition_" + (t - 1)]);
if (i) {
e[t].active = !0;
var o = "Stage_Target_" + i;
e[t].getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[o.toUpperCase()];
var a = "0 / " + cc.YL.CurrStageCfg["INT_Count_" + (t - 1)];
1 == i && (a = "全部宝石");
e[t].getChildByName("desc").getComponent(cc.Label).string = a;
this.miniGoal.getChildByName("bg").width = 108 + 94 * (t - 2);
} else e[t].active = !1;
}
}
},
_loadMap: function() {
cc.loader.loadRes(this.mapUrl, cc.TiledMapAsset, function(e, t) {
if (e) cc.log("err", e); else {
this.node.destroyAllChildren();
var i = new cc.Node();
i.name = "map";
this.node.addChild(i);
i.addComponent(cc.TiledMap).tmxAsset = t;
this._initMap();
cc.YL.isOver = !1;
cc.YL.isPause = !1;
this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Xiaosan", !1);
}
}.bind(this));
},
_initMap: function() {
this.mapNode = this.node.getChildByName("map");
this.mapNode.setAnchorPoint(0, 0);
this.mapNode.setPosition(-this.mapNode.width / 2, -this.mapNode.height / 2);
this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
this.node.parent.getChildByName("TouchNode").width = this.mapNode.width;
this.node.parent.getChildByName("TouchNode").height = this.mapNode.height;
this.mapNode.getChildByName("all_top_2").zIndex = 900;
this.mapNode.getChildByName("all_top_1").zIndex = 899;
for (var e = 0; e < this.mapNode.children.length; e++) this.mapNode.children[e].setAnchorPoint(0, 0);
this.background = this.tiledMap.getLayer("background");
this.block = this.tiledMap.getLayer("block");
this.diamond = this.tiledMap.getLayer("diamond");
this.diamondFirstGID = this._findDiamondFirstGID();
this.playersInfo = this.tiledMap.getObjectGroup("player");
this.monsterInfo = this.tiledMap.getObjectGroup("monster");
this.triggerInfo = this.tiledMap.getObjectGroup("trigger");
this.monsterArr = [];
this.triggerArr = [];
this.stoveArr = [];
var t = this.playersInfo.getObjects(), i = t.find(function(e) {
return "move_1" == e.name;
});
this._initPlayerNode(cc.v2(i.x, i.y - cc.YL.offsetY));
this._findDiamondPos();
this._initDiamondAni();
this._initTrigger();
var o = cc.instantiate(this.coinJump);
this.mapNode.addChild(o);
this.coinJump = o;
this.coinJump.zIndex = 1002;
this.playerDestPos = t.find(function(e) {
return "move_3" == e.name;
});
this._gameInit();
},
_findDiamondFirstGID: function() {
for (var e = this.tiledMap.getMapSize(), t = e.width, i = e.height, o = 1e3, n = 0; n < t; n++) for (var a = 0; a < i; a++) {
var s = cc.v2(0, 0);
s.x = n;
s.y = a;
var c = this.diamond.getTileGIDAt(s);
0 != c && c <= o && (o = c);
}
return o;
},
_initDiamondAni: function() {
for (var e = 0; e < this.mapNode.children.length; e++) "Diamond" == this.mapNode.children[e].name && this.mapNode.children[e].destroy();
var t = this.tiledMap.getMapSize(), i = t.width, o = t.height;
for (e = 0; e < i; e++) for (var n = 0; n < o; n++) {
var a = cc.v2(0, 0);
a.x = e;
a.y = n;
var s = this.diamond.getTileGIDAt(a);
0 != s && this._showDiamond(a, s - this.diamondFirstGID, !1);
}
},
_showDiamond: function(e, t, i) {
for (var o = 0; o < this.mapNode.children.length; o++) if ("Diamond" == this.mapNode.children[o].name && this.mapNode.children[o].getComponent("Diamond").info.x == e.x && this.mapNode.children[o].getComponent("Diamond").info.y == e.y) {
this.mapNode.children[o].getComponent("Diamond").show(e, t, i);
return;
}
var n = cc.instantiate(this.diamondNode);
this.mapNode.addChild(n);
n.getComponent("Diamond").show(e, t, i);
},
_deletedDiamond: function(e) {
for (var t = 0; t < this.mapNode.children.length; t++) "Diamond" == this.mapNode.children[t].name && this.mapNode.children[t].getComponent("Diamond").info.x == e.x && this.mapNode.children[t].getComponent("Diamond").info.y == e.y && this.mapNode.children[t].destroy();
},
_findDiamondPos: function() {
var e = this.tiledMap.getMapSize();
this.diamondPosArr = [];
for (var t = e.width, i = e.height, o = 0; o < t; o++) for (var n = 0; n < i; n++) {
var a = cc.v2(0, 0);
a.x = o;
a.y = n;
var s = this.diamond.getTileGIDAt(a);
s - this.diamondFirstGID == 0 && this.diamondPosArr.push({
type: s - this.diamondFirstGID,
pos: a
});
}
},
_initPlayerNode: function(e) {
this.playerNode = this.mapNode.getChildByName("playerNode") ? this.mapNode.getChildByName("playerNode") : cc.instantiate(this.playerNode);
this.mapNode.getChildByName("playerNode") ? this.mapNode.getChildByName("playerNode") : this.mapNode.addChild(this.playerNode);
this.playerNode.setPosition(e);
},
_initTrigger: function() {
for (var e = this.triggerInfo.getObjects(), t = 0; t < e.length; t++) {
var i = cc.instantiate(this.triggerNode);
i.getComponent("Trigger").idx = t;
this.triggerArr.push(i);
2 == e[t].Type && this.stoveArr.push(i);
}
if (this.stoveArr.length > 0) {
var o = Math.floor(Math.random() * this.stoveArr.length) || 0;
cc.YL.currStove = this.stoveArr[o].getComponent("Trigger").idx;
}
for (var n = 0; n < this.triggerArr.length; ++n) {
this.mapNode.addChild(this.triggerArr[n]);
this.triggerArr[n].getComponent("Trigger").initTrigger(e[n]);
}
},
_gameInit: function() {
cc.YL.playerTile = this.getTilePos(cc.v2(this.playerDestPos.x, this.playerDestPos.y));
if (cc.YL.loadMapStage < 1) {
this.node.parent.getChildByName("Pause").active = !1;
setTimeout(function() {
a.getInstance().initOperateGuide();
cc.YL.canTouch = !0;
}.bind(this), 500);
} else {
if (![ 1 ].find(function(e) {
return e == cc.YL.CurrStageCfg.INT_ID;
}) || cc.YL.GuideInfo[cc.YL.CurrStageCfg.INT_ID]) this.showStageFlow(); else {
this.scoreNode.runAction(cc.moveTo(.2, cc.v2(this.scoreNode.x, 796)).easing(cc.easeBackOut()));
this.lifeNode.runAction(cc.moveTo(.2, cc.v2(this.lifeNode.x, 796)).easing(cc.easeBackOut()));
this.limitNode.runAction(cc.moveTo(.2, cc.v2(this.limitNode.x, 796)).easing(cc.easeBackOut()));
this.miniGoal.runAction(cc.moveTo(.2, cc.v2(this.miniGoal.x, 796)).easing(cc.easeBackOut()));
setTimeout(function() {
a.getInstance().initNormalStageGuide();
}.bind(this), 500);
}
}
},
showStageFlow: function(e) {
var t = cc.v2(this.playerDestPos.x, this.playerDestPos.y - cc.YL.offsetY), i = cc.YL.CurrStageCfg.STR_Story, o = cc.YL.CurrStageCfg.STR_Guide, n = e ? 0 : 500;
if (i.length > 1) if (1 == cc.YL.CurrStageInfo.story) {
this.playerNode.setPosition(t);
o.length <= 0 || 1 == cc.YL.CurrStageInfo.guide ? setTimeout(function() {
this._showStageGoal();
}.bind(this), n) : setTimeout(function() {
this._showGuide();
}.bind(this), n);
} else this._showStory(); else o.length > 0 ? setTimeout(function() {
this._showGuide();
}.bind(this), n) : setTimeout(function() {
this._showStageGoal();
}.bind(this), n);
},
_showStory: function() {
var e = cc.v2(this.playerDestPos.x, this.playerDestPos.y - cc.YL.offsetY);
this.playerNode.runAction(cc.sequence(cc.moveTo(.4, e), cc.delayTime(.5), cc.callFunc(function() {
cc.YL.playerTile = this.getTilePos(cc.v2(this.playerDestPos.x, this.playerDestPos.y));
var e = "Story/" + cc.YL.CurrStageCfg.STR_Story;
o.turnCsvToJson(e, function(e) {
cc.YL.CurrStageInfo.story = 1;
this.setStageStorage();
this.storyInfo = e;
var t = this.node.parent.getChildByName("Dialogue");
t || (t = cc.instantiate(this.DialoguePre)).on("click", this.onStoryBlankClick, this);
utils.show(t);
var i = t.getChildByName("box"), o = t.getChildByName("tips");
i.opacity = 0;
o.opacity = 0;
this.dialogueNum = 0;
i.runAction(cc.fadeIn(.2));
o.runAction(cc.fadeIn(.2));
this._showDialogue();
}.bind(this));
}.bind(this))));
},
_showDialogue: function() {
var e = this.node.parent.getChildByName("Dialogue");
if (e) {
var t = o.getJsonLength(this.storyInfo);
if (this.dialogueNum >= t) {
if (!this.closeStory) {
this.closeStory = !0;
e.active = !1;
this._showGuide();
}
} else {
var i = e.getChildByName("box"), a = i.getChildByName("left"), s = i.getChildByName("right");
e.getChildByName("tips");
a.opacity = 0;
s.opacity = 0;
var c = a;
1 == this.storyInfo[this.dialogueNum + 1].INT_Direction && (c = s);
c.stopAllActions();
var r = this.storyInfo[this.dialogueNum + 1].STR_Head;
c.getChildByName("head").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[r.toUpperCase()];
var l = this.storyInfo[this.dialogueNum + 1].STR_Desc;
c.getChildByName("dialogue").getComponent(cc.RichText).string = l;
var h = cc.sequence(cc.fadeIn(.2), cc.delayTime(4), cc.callFunc(function() {
this._showDialogue();
}.bind(this)));
c.runAction(h);
this.dialogueNum++;
}
}
},
_showGuide: function() {
if (cc.YL.CurrStageCfg.STR_Guide.length > 0) {
cc.YL.CurrStageInfo.guide = 1;
this.setStageStorage();
var e = this.node.parent.getChildByName("Dialogue");
e && (e.active = !1);
var t = this.node.parent.getChildByName("Guide");
if (!t) {
(t = cc.instantiate(this.GuidePre)).getChildByName("box").getChildByName("btnPrev").on("click", this.onGuidePrevPageClick, this);
t.getChildByName("box").getChildByName("btnNext").on("click", this.onGuideNextPageClick, this);
t.getChildByName("box").getChildByName("btnStart").on("click", this.onGuideStartClick, this);
}
var i = t.getChildByName("box").getChildByName("guideSpine"), o = {
Guide_NormalGoblin: [ "bg", "player", "goblin_normal", "emoji" ],
Guide_DiamonGoblin: [ "bg", "diamond", "player", "goblin_white", "emoji" ],
Guide_HeartSkill: [ "bg", "player", "goblin_normal", "emoji", "ui", "action", "heart" ],
Guide_MucusGoblin: [ "bg", "diamond_normal", "diamond_venom", "player", "goblin_venom", "player_venom", "emoji" ],
Guide_TriggerStove: [ "bg", "trigger_stove", "player", "emoji", "ui" ],
Guide_IceGoblin: [ "bg", "diamond_normal", "diamond_ice", "player", "goblin_ice", "emoji" ],
Guide_BombGoblin: [ "bg", "boom_area", "boom", "player", "goblin_boom", "effect_boom", "emoji" ],
Guide_TriggerBurrow: [ "bg", "trigger_burrow", "player", "goblin_normal", "emoji", "ui" ]
}[cc.YL.CurrStageCfg.STR_Guide];
if (o) {
i.getChildByName("bg").getComponent(sp.Skeleton).setCompleteListener(function() {
t.getChildByName("box").getChildByName("btnStart").active = !0;
});
for (var n = 0; n < o.length; ++n) {
i.getChildByName(o[n]).active = !0;
i.getChildByName(o[n]).getComponent(sp.Skeleton).animation = cc.YL.CurrStageCfg.STR_Guide;
i.getChildByName(o[n]).getComponent(sp.Skeleton).loop = !1;
}
} else t.getChildByName("box").getChildByName("btnStart").active = !0;
utils.open(t);
} else this._showStageGoal();
},
_showStageGoal: function() {
var e = this.node.parent.getChildByName("StageGoal");
e || (e = cc.instantiate(this.StageGoalPre)).on("click", this.onGoalBlankClick, this);
utils.show(e);
e.getChildByName("box").getChildByName("stageNum").getComponent(cc.Label).string = "第" + cc.YL.CurrStageCfg.INT_ID + "关";
var t = e.getChildByName("box").getChildByName("desc"), i = utils.transTimeFormat(cc.YL.CurrStageCfg.INT_Time, !0);
t.getComponent(cc.Label).string = "在" + i + "内完成以下目标";
for (var o = e.getChildByName("box").getChildByName("rate").children, a = 0; a < o.length; ++a) {
cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.star > a && (o[a].getChildByName("reach").active = !0);
var s = "INT_Star_" + (a + 1);
o[a].getChildByName("time").getComponent(cc.Label).string = utils.transTimeFormat(cc.YL.CurrStageCfg[s], !0);
}
for (var c = e.getChildByName("box").getChildByName("goal").children, r = 0; r < c.length; ++r) {
var l = parseInt(cc.YL.CurrStageCfg["INT_Condition_" + (r + 1)]);
if (l) {
c[r].active = !0;
var h = "Stage_Target_" + l;
c[r].getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[h.toUpperCase()];
var d = "x" + cc.YL.CurrStageCfg["INT_Count_" + (r + 1)];
1 == l && (d = "全部收集");
c[r].getChildByName("desc").getComponent(cc.Label).string = d;
} else c[r].active = !1;
}
},
_startCountdown: function() {
cc.YL.loadMapStage < 1 || this.schedule(this._gameCountdown, 1);
},
_gameCountdown: function() {
if (this.stageTime >= 0) this.limitNode.getChildByName("num").getComponent(cc.Label).string = utils.transTimeFormat(this.stageTime--, !0); else {
this.playerNode.getComponent("Player").showStatus("Lose");
this.stageFail(1);
cc.log("时间结束");
}
},
_stopCountdown: function() {
this.unschedule(this._gameCountdown);
},
_loadMonsterBri: function() {
if (this.mapNode) for (var e = this.monsterInfo.getObjects(), t = 0; t < e.length; t++) {
var i = cc.instantiate(this.monsterBriNode);
this.mapNode.addChild(i);
i.name = "B" + t;
i.getComponent("MonsterBrith").initMonster(e[t]);
}
},
_showComplete: function() {
if (this.playerNode.getComponent("Player").lifeNum <= 0 || this.stageTime < 0) console.log("不满足关卡完成条件：玩家生命过低或时间结束"); else {
var e = void 0;
if (parseInt(cc.YL.CurrStageCfg.INT_ID) > cc.YL.ClearStage) {
e = !0;
cc.YL.ClearStage = parseInt(cc.YL.CurrStageCfg.INT_ID);
cc.sys.localStorage.setItem("currStage", JSON.stringify(cc.YL.CurrStageCfg.INT_ID));
}
this.stageTime += 1;
var t = parseInt(cc.YL.CurrStageCfg.INT_Star_1), i = parseInt(cc.YL.CurrStageCfg.INT_Star_2), o = parseInt(cc.YL.CurrStageCfg.INT_Star_3), n = 0;
this.stageTime >= o ? n = 3 : this.stageTime >= i && this.stageTime < o ? n = 2 : this.stageTime >= t && (n = 1);
n > cc.YL.CurrStageInfo.star && (cc.YL.CurrStageInfo.star = n);
this.stageTime > cc.YL.CurrStageInfo.time && (cc.YL.CurrStageInfo.time = this.stageTime);
var a = this.node.parent.getChildByName("StageComplete");
a || (a = cc.instantiate(this.StageCompletePre));
var s = a.getChildByName("box"), c = function(e) {
s.getChildByName("btnDouble").getComponent(cc.Button).interactable = e;
s.getChildByName("btnShare").getComponent(cc.Button).interactable = e;
s.getChildByName("btnReplay").getComponent(cc.Button).interactable = e;
s.getChildByName("btnNext").getComponent(cc.Button).interactable = e;
s.getChildByName("btnReceive").getComponent(cc.Button).interactable = e;
s.getChildByName("btnReturn").getComponent(cc.Button).interactable = e;
s.getChildByName("btnClose").getComponent(cc.Button).interactable = e;
a.getChildByName("btnShow").getComponent(cc.Button).interactable = e;
};
utils.show(a);
this._showUnlockRoleAndSkill(e);
c(!1);
var r = s.getChildByName("sp");
(r.getChildByName("sp" + cc.YL.PlayerRole) || r.getChildByName("sp1")).active = !0;
for (var l = s.getChildByName("rate").children, h = 0; h < l.length; ++h) {
l[h].getChildByName("time").getComponent(cc.Label).string = "剩余时间\n" + utils.transTimeFormat(cc.YL.CurrStageCfg["INT_Star_" + (h + 1)], !0);
}
setTimeout(function() {
this._showCompleteStars(n, c);
this._showCompleteTime(n);
}.bind(this), 500);
var d = this.playerNode.getComponent("Player").playerScore || 0;
d > cc.YL.CurrStageInfo.highScore && (cc.YL.CurrStageInfo.highScore = d);
s.getChildByName("award").getChildByName("num").getComponent(cc.Label).string = "x" + d;
cc.YL.PlayerInfo.coin += d;
this.setStageStorage();
s.getChildByName("btnDouble").on("click", this.onBtnDoubleClick, this);
s.getChildByName("btnShare").on("click", this.onBtnShareClick, this);
s.getChildByName("btnReplay").on("click", this.onBtnReplayClick, this);
s.getChildByName("btnReceive").on("click", this._showCompleteCoinFly, this);
s.getChildByName("btnReturn").on("click", this.onBtnReturnClick, this);
s.getChildByName("btnClose").on("click", this.closeComplete, this);
a.getChildByName("btnShow").on("click", this.showComplete, this);
var m = s.getChildByName("Settle");
this._initSettle(m);
}
},
_showUnlockRoleAndSkill: function(e) {
var t = this.node.parent.getChildByName("StageComplete");
if (t) {
if (e) {
o.turnCsvToJson("Csv/player", function(e) {
for (var i in e) if (e[i].INT_UnlockMission == cc.YL.CurrStageCfg.INT_ID) {
var o = t.getChildByName("unlockRole");
o.active = !0;
o.getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[e[i].STR_Head.toUpperCase()];
o.getChildByName("lab").getComponent(cc.Label).string = e[i].STR_UnlockDesc;
break;
}
}.bind(this));
o.turnCsvToJson("Csv/skill", function(e) {
for (var i in e) if (e[i].INT_LockStage == cc.YL.CurrStageCfg.INT_ID) {
var o = t.getChildByName("unlockSkill");
o.active = !0;
var a = o.getChildByName("spr"), s = "Skill_" + e[i].INT_Type;
a.getComponent(cc.Sprite).spriteFrame = n.spriteFrame[s.toUpperCase()];
o.getChildByName("lab").getComponent(cc.Label).string = e[i].STR_Desc;
break;
}
}.bind(this));
}
} else console.log("未找到通关节点");
},
_showCompleteStars: function(e, t) {
var i = this.node.parent.getChildByName("StageComplete");
if (i) {
var o = i.getChildByName("box"), n = function(i) {
o.stopAllActions();
if (i >= e) {
t && t(!0);
a.getInstance().showCompleteGuide();
} else {
var s = o.getChildByName("rate").children[i].getChildByName("reach");
s.scale = 1.5;
s.opacity = 0;
s.active = !0;
i++;
o.runAction(cc.sequence(cc.spawn(cc.sequence(cc.scaleTo(.1, .95), cc.scaleTo(.1, 1)), cc.callFunc(function() {
s.runAction(cc.spawn(cc.scaleTo(.2, 1).easing(cc.easeBackInOut()), cc.fadeIn(.2)));
})), cc.callFunc(function() {
n(i);
})));
}
}.bind(this);
n(0);
} else console.log("未找到通关节点");
},
_showCompleteTime: function(e) {
var t = this.node.parent.getChildByName("StageComplete");
if (t) for (var i = t.getChildByName("box").getChildByName("leftTime"), o = 200 * e / this.stageTime, n = function(e) {
setTimeout(function() {
i && (i.getComponent(cc.Label).string = e + "秒");
}, o * e);
}, a = 0; a < this.stageTime; ++a) n(a); else console.log("未找到通关节点");
},
_showCompleteCoinFly: function() {
var e = this;
this.clickBlock.active = !0;
audio.playEffect("UI_Button");
var t = this.node.parent.getChildByName("StageComplete");
if (t) {
var i = this.playerNode.getComponent("Player").playerScore || 0;
i > 0 && function() {
var o = t.getChildByName("box"), n = o.getChildByName("coinFly"), a = o.getChildByName("award").getChildByName("num");
n.active = !0;
n.getComponent(sp.Skeleton).setCompleteListener(function() {
n.getComponent(sp.Skeleton).animation = null;
n.active = !1;
t.active = !1;
this.cloud.getComponent(sp.Skeleton).setCompleteListener(function() {
cc.YL.SceneManager.LoadScene("Hall");
});
this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", !1);
}.bind(e));
n.getComponent(sp.Skeleton).setAnimation(0, "animation", !1);
for (var s = 1e3 / i, c = function(e) {
setTimeout(function() {
a.getComponent(cc.Label).string = "x" + e;
}, s * (i - e));
}, r = i; r >= 0; --r) c(r);
}();
} else console.log("未找到通关节点");
},
_initSettle: function(e) {
for (var t = e.children, i = 0; i < t.length; ++i) {
var o = this.stageGoal[t[i].name];
t[i].getChildByName("count").getComponent(cc.Label).string = o || 0;
}
},
_showStageFail: function(e) {
var t = this.node.parent.getChildByName("StageFail");
t || (t = cc.instantiate(this.StageFailPre));
utils.show(t);
var i = t.getChildByName("box"), o = i.getChildByName("sp");
(o.getChildByName("sp" + cc.YL.PlayerRole) || o.getChildByName("sp1")).active = !0;
var n = i.getChildByName("tips").getChildByName("lab"), a = i.getChildByName("btnContinue").getChildByName("life"), s = i.getChildByName("btnContinue").getChildByName("time");
if (1 == e) {
n.getComponent(cc.Label).string = "时间不足!";
a.active = !1;
s.active = !0;
s.getChildByName("lab").getComponent(cc.Label).string = "+" + cc.YL.CurrStageCfg.INT_Star_1;
} else if (e > 1) {
i.getChildByName("btnReplay").x = 0;
n.getComponent(cc.Label).string = "没有更多" + ({
2: "白色宝石",
3: "绿色宝石",
4: "蓝色宝石",
5: "紫色宝石",
6: "橙色宝石",
7: "红色宝石",
10: "毒液",
11: "冰块"
}[e] || "") + "可收集";
} else {
n.getComponent(cc.Label).string = "生命不足!";
a.active = !0;
s.active = !1;
}
i.getChildByName("btnReplay").on("click", this.onBtnReplayClick, this);
i.getChildByName("btnContinue").on("click", this.onBtnContinueClick, this);
i.getChildByName("btnReturn").on("click", this.onBtnReturnClick, this);
i.getChildByName("btnClose").on("click", this.closeFail, this);
t.getChildByName("btnShow").on("click", this.showFail, this);
var c = i.getChildByName("Settle");
this._initSettle(c);
},
PlayerMove: function(e) {
this.playerNode.getComponent("Player").PlayerMove(e);
},
getTilePos: function(e) {
var t = this.mapNode.getContentSize(), i = this.tiledMap.getTileSize(), o = Math.floor(e.x / i.width), n = Math.floor((t.height - e.y) / i.height);
return cc.v2(o, n);
},
StopAllMap: function() {
this.playerNode.stopAllActions();
cc.YL.TouchMoveDir = "";
for (var e = 0; e < this.mapNode.children.length; e++) {
var t = this.mapNode.children[e].name.toString().slice(0, 1), i = this.mapNode.children[e].name.toString().slice(-1);
this.mapNode.children[e].stopAllActions();
"B" == t && "M" != i && this.mapNode.children[e].getComponent("MonsterBrith") && this.mapNode.children[e].getComponent("MonsterBrith").clearTime();
"B" == t && "M" == i && this.mapNode.children[e].getComponent("Monster") && this.mapNode.children[e].getComponent("Monster").clearTime();
}
},
PauseAllMap: function() {
cc.YL.TouchMoveDir = "";
cc.YL.isPause = !0;
this.playerNode.stopAllActions();
for (var e = 0; e < this.mapNode.children.length; e++) {
this.mapNode.children[e].stopAllActions();
var t = this.mapNode.children[e].name.toString().slice(0, 1), i = this.mapNode.children[e].name.toString().slice(-1);
"B" == t && "M" == i && this.mapNode.children[e].getComponent("Monster") && this.mapNode.children[e].getComponent("Monster").clearTime();
}
},
ResumeAllMap: function() {
this._startCountdown();
cc.YL.isPause = !1;
this.playerNode.getComponent("Player").removeFunc();
this.playerNode.getComponent("Player").goOnEffect();
for (var e = 0; e < this.mapNode.children.length; e++) {
var t = this.mapNode.children[e].name.toString().slice(0, 1), i = this.mapNode.children[e].name.toString().slice(-1);
if ("B" == t && "M" == i && this.mapNode.children[e].getComponent("Monster")) {
this.mapNode.children[e].getComponent("Monster")._monsterReStart();
1 == this.mapNode.children[e].getComponent("Monster")._underAttack && 1 == this.mapNode.children[e].getComponent("Monster").isIce && 1 == this.iceTimeOver && this.mapNode.children[e].getComponent("Monster").removeIceAttacked();
}
}
},
setStageStorage: function() {
var e = cc.YL.StageInfo.findIndex(function(e) {
return e.id == cc.YL.CurrStageInfo.id;
});
e >= 0 ? cc.YL.StageInfo.splice(e, 1, cc.YL.CurrStageInfo) : cc.YL.StageInfo.push(cc.YL.CurrStageInfo);
cc.sys.localStorage.setItem("stageInfo", JSON.stringify(cc.YL.StageInfo));
for (var t = 0, i = 0; i < cc.YL.StageInfo.length; ++i) t += cc.YL.StageInfo[i].star;
cc.YL.PlayerInfo.stars = t || cc.YL.PlayerInfo.stars;
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
},
checkStageStatus: function(e) {
s[e] && this.stageGoal[s[e]]++;
if (cc.YL.loadMapStage > 0) this.checkStageGoal(); else {
if (0 == this._getDiamondCount()) {
cc.YL.OperateIdx++;
a.getInstance().showGuideDialogue();
}
}
},
checkStageGoal: function() {
for (var e = !0, t = 1; t < 4; ++t) {
var i = cc.YL.CurrStageCfg["INT_Condition_" + t], o = cc.YL.CurrStageCfg["INT_Count_" + t];
if (i) {
this.diamondCount = this._getDiamondCount();
if (1 == i && this.diamondCount > 0) e = !1; else {
var n = 0;
s[parseInt(i)] && (n = this.stageGoal[s[parseInt(i)]] || 0);
var a = this.miniGoal.getChildByName("goal" + t);
if (n < o) {
var c = this._checkDiamondCount(i, o);
if (c) {
this.stageFail(parseInt(c));
return;
}
e = !1;
if (a) {
a.getChildByName("desc").active = !0;
a.getChildByName("ok").active = !1;
a.getChildByName("desc").getComponent(cc.Label).string = n + " / " + o;
}
} else if (a) {
a.getChildByName("desc").active = !1;
a.getChildByName("ok").active = !0;
}
}
}
}
if (e) {
this.playerNode.getComponent("Player").showStatus("Stand");
this.stageComplete();
}
},
_getDiamondCount: function() {
var e = this.tiledMap.getMapSize(), t = e.width, i = e.height, o = 0;
this.whiteDiamond = 0;
this.greenDiamond = 0;
this.blueDiamond = 0;
this.purpleDiamond = 0;
this.orangeDiamond = 0;
this.redDiamond = 0;
this.venomDiamond = 0;
this.iceDiamond = 0;
for (var n = 0; n < t; n++) for (var a = 0; a < i; a++) {
var s = cc.v2(0, 0);
s.x = n;
s.y = a;
var c = this.diamond.getTileGIDAt(s);
0 != c && o++;
switch (c - this.diamondFirstGID) {
case 0:
this.whiteDiamond++;
break;

case 1:
this.greenDiamond++;
break;

case 2:
this.blueDiamond++;
break;

case 3:
this.purpleDiamond++;
break;

case 4:
this.orangeDiamond++;
break;

case 5:
this.redDiamond++;
}
}
for (var r = 0; r < this.mapNode.children.length; r++) {
var l = this.mapNode.children[r];
"Diamond" == l.name && (l.getChildByName("Slime").active ? this.venomDiamond++ : l.getChildByName("Ice").active && this.iceDiamond++);
}
return o;
},
_checkDiamondCount: function(e, t) {
if (8 == e || 9 == e) return null;
var i = {
2: this.whiteDiamond,
3: this.greenDiamond,
4: this.blueDiamond,
5: this.purpleDiamond,
6: this.orangeDiamond,
7: this.redDiamond,
10: this.venomDiamond,
11: this.iceDiamond
}, o = this.whiteDiamond, n = this.greenDiamond, a = this.blueDiamond, c = this.purpleDiamond, r = this.orangeDiamond, l = this.redDiamond;
switch (cc.YL.currCatch) {
case 0:
o += 1;
break;

case 1:
n += 1;
break;

case 2:
a += 1;
break;

case 3:
c += 1;
break;

case 4:
r += 1;
break;

case 5:
l += 1;
}
var h = {
2: o,
3: 3 * n,
4: 7 * a,
5: 15 * c,
6: 31 * r,
7: 63 * l
}, d = 0;
for (var m in h) m < e && (d += h[m]);
var g = {
3: 3,
4: 7,
5: 15,
6: 31,
7: 63
}, p = this.whiteDiamond, u = 0;
if (e > 2 && e < 10) for (;p > 0 && d >= g[e]; ) {
d -= g[e];
p--;
u++;
} else 10 == e ? u = this.diamondCount - this.iceDiamond : 11 == e && (u = this.diamondCount - this.venomDiamond);
return i[e] + u + (this.stageGoal[s[parseInt(e)]] || 0) < parseInt(t) ? e : null;
},
stageComplete: function() {
if (1 != cc.YL.isOver) {
cc.YL.isOver = !0;
audio.playEffect("UI_WinFrame");
this.PauseAllMap();
this._stopCountdown();
this._showComplete();
}
},
stageFail: function(e) {
if (1 != cc.YL.isOver) {
cc.YL.isOver = !0;
audio.playEffect("UI_LoseFrame");
this.PauseAllMap();
this._stopCountdown();
this._showStageFail(e);
}
},
onStoryBlankClick: function() {
this._showDialogue();
},
onGuidePrevPageClick: function() {
var e = this.node.parent.getChildByName("Guide").getChildByName("box").getChildByName("guideView").getComponent(cc.PageView), t = e.getCurrentPageIndex(), i = t - 1 < 0 ? 0 : t - 1;
e.scrollToPage(i);
},
onGuideNextPageClick: function() {
var e = this.node.parent.getChildByName("Guide").getChildByName("box").getChildByName("guideView").getComponent(cc.PageView), t = e.getCurrentPageIndex(), i = t + 1 >= e.getPages().length ? e.getPages().length - 1 : t + 1;
e.scrollToPage(i);
},
onGuideStartClick: function() {
var e = this.node.parent.getChildByName("Guide");
e && (e.active = !1);
this._showStageGoal();
},
onGoalBlankClick: function() {
if (!this.monsterBrith) {
this.monsterBrith = !0;
var e = this.node.parent.getChildByName("StageGoal");
e && utils.hide(e);
this.scoreNode.stopAllActions();
this.lifeNode.stopAllActions();
this.limitNode.stopAllActions();
this.miniGoal.stopAllActions();
this.scoreNode.runAction(cc.moveTo(.2, cc.v2(this.scoreNode.x, 796)).easing(cc.easeBackOut()));
this.lifeNode.runAction(cc.moveTo(.2, cc.v2(this.lifeNode.x, 796)).easing(cc.easeBackOut()));
this.limitNode.runAction(cc.moveTo(.2, cc.v2(this.limitNode.x, 796)).easing(cc.easeBackOut()));
this.miniGoal.runAction(cc.moveTo(.2, cc.v2(this.miniGoal.x, 796)).easing(cc.easeBackOut()));
this._startCountdown();
cc.YL.canTouch = !0;
setTimeout(function() {
this._loadMonsterBri();
}.bind(this), this.monsterDelay);
}
},
onBtnPauseClick: function() {
audio.playEffect("UI_Button");
this.PauseAllMap();
this._stopCountdown();
cc.YL.isClickPause = !0;
var e = this.node.parent.getChildByName("Setting");
e || (e = cc.instantiate(this.SettingPre));
utils.show(e);
},
onBtnDoubleClick: function() {
audio.playEffect("UI_Button");
},
onBtnShareClick: function() {
audio.playEffect("UI_Button");
},
onBtnReplayClick: function(e) {
audio.playEffect("UI_Button");
var t = function() {
cc.find("Canvas/ClickBlock").active = !0;
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.lastTime = Date.now();
utils.startEnergyRecover(!0);
} else cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
var t = e.target.getChildByName("energy");
t.active = !0;
t.opacity = 0;
t.y = 15;
t.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.moveBy(.5, 0, 70)), cc.fadeOut(.2), cc.callFunc(function() {
var e = this.node.parent.getChildByName("StageComplete");
e && (e.active = !1);
var t = this.node.parent.getChildByName("StageFail");
t && (t.active = !1);
cc.YL.SceneManager.LoadScene("Map");
}.bind(this))));
}.bind(this);
utils.checkEnergyAndAd(t);
},
onBtnNextClick: function() {
audio.playEffect("UI_Button");
var e = this.node.parent.getChildByName("StageComplete");
if (e) {
var t = e.getChildByName("box"), i = t.getChildByName("leftTime");
t.stopAllActions();
i.stopAllActions();
e.active = !1;
}
cc.YL.loadMapStage += 1;
var n = cc.YL.StageConfig[cc.YL.loadMapStage];
if (n) {
cc.YL.CurrStageCfg = n;
cc.YL.CurrStageInfo = cc.YL.StageInfo.find(function(e) {
return e.id == cc.YL.loadMapStage;
});
cc.YL.CurrStageInfo || (cc.YL.CurrStageInfo = {
id: cc.YL.CurrStageCfg.INT_ID,
story: 0,
guide: 0,
star: 0,
highScore: 0,
time: 0
});
}
cc.YL.loadMapStage > o.getJsonLength(cc.YL.StageConfig) ? popup.show({
str: "恭喜全部通关！",
confirm: function() {
cc.YL.SceneManager.LoadScene("Hall");
}
}) : cc.YL.SceneManager.LoadScene("Map");
},
onBtnContinueClick: function() {
audio.playEffect("UI_Button");
},
onBtnReturnClick: function(e) {
this.clickBlock.active = !0;
audio.playEffect("UI_Button");
e.target.parent.parent.active = !1;
this.cloud.getComponent(sp.Skeleton).setCompleteListener(function() {
cc.YL.SceneManager.LoadScene("Hall");
});
this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", !1);
},
changeZIndex: function() {
this.playerNode.zIndex = cc.YL.playerTile.y + 610;
for (var e = !1, t = 0, i = 0; i < this.mapNode.children.length; i++) {
var o = this.mapNode.children[i].name.toString().slice(0, 1), n = this.mapNode.children[i].name.toString().slice(-1);
if ("B" == o && "M" == n && this.mapNode.children[i].getComponent("Monster")) {
this.mapNode.children[i].zIndex = this.getTilePos(this.mapNode.children[i]).y + 610;
if (this.mapNode.children[i].zIndex == this.playerNode.zIndex) {
e = !0;
t = this.mapNode.children[i].zIndex;
}
}
}
1 == e && (this.playerNode.zIndex = t + 1);
},
getDiamondNode: function(e) {
for (var t = this.node.getChildByName("map").getContentSize(), i = this.tiledMap.getTileSize(), o = 0; o < this.node.getChildByName("map").children.length; o++) if ("Diamond" == this.node.getChildByName("map").children[o].name && this.node.getChildByName("map").children[o].x == e.x * i.width && this.node.getChildByName("map").children[o].y == t.height - i.height * (e.y + 1)) return this.node.getChildByName("map").children[o];
return null;
},
closeComplete: function() {
var e = this.node.parent.getChildByName("StageComplete");
if (e) {
var t = e.getChildByName("box");
t.stopAllActions();
t.runAction(cc.moveTo(.5, 0, -1550).easing(cc.easeBackInOut()));
}
},
showComplete: function() {
var e = this.node.parent.getChildByName("StageComplete");
if (e) {
var t = e.getChildByName("box");
t.stopAllActions();
t.runAction(cc.moveTo(.5, 0, 0).easing(cc.easeBackInOut()));
}
},
closeFail: function() {
var e = this.node.parent.getChildByName("StageFail");
if (e) {
var t = e.getChildByName("box");
t.stopAllActions();
t.runAction(cc.moveTo(.5, 0, -1550).easing(cc.easeBackInOut()));
}
},
showFail: function() {
var e = this.node.parent.getChildByName("StageFail");
if (e) {
var t = e.getChildByName("box");
t.stopAllActions();
t.runAction(cc.moveTo(.5, 0, 0).easing(cc.easeBackInOut()));
}
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes",
"./Guide": "Guide",
"./funCsv": "funCsv"
} ],
MonsterBrith: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "30a58W5svhKlo0qVxCyS6u2", "MonsterBrith");
cc.Class({
extends: cc.Component,
properties: {
monsterNode: cc.Prefab
},
onLoad: function() {
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.mapNode = this.mapComp.mapNode;
},
start: function() {},
initMonster: function(e) {
this.monsterInfos = e;
this.point = 0;
this.alreadyTime = 0;
this.brithPos = cc.v2(e.x, e.y - 64);
this.node.setPosition(this.brithPos);
this.dirArr = this.monsterInfos.Direction_Arr.toString();
this.monsterArr = this.monsterInfos.ID_Arr.toString();
this.intTime = parseInt(this.monsterInfos.Interval);
this.order = parseInt(this.monsterInfos.Order);
this.times = parseInt(this.monsterInfos.Time);
this.moveArr = this.monsterInfos.Move_Arr;
this.dirArr = this.dirArr.split(",");
this.monsterArr = this.monsterArr.split(",");
this.moveArr = this.moveArr.split(",");
this._initMonster();
},
_initMonster: function(e) {
this.alreadyTime++;
var t = cc.instantiate(this.monsterNode);
this.animationFunc = setTimeout(function() {
this.node.getChildByName("Animaion").active = !0;
this.brithFunc = setTimeout(function() {
if (this.node) {
this.node.getChildByName("Animaion").active = !1;
this.mapNode.addChild(t);
this.mapComp.monsterArr.push(t);
t.setPosition(this.brithPos);
t.name = this.node.name + "_" + this.point + "_M";
t.getComponent("Monster").initMonster(this._getMonsterInfo(), this.mapComp.getTilePos(cc.v2(this.monsterInfos.x, this.monsterInfos.y)));
}
}.bind(this), 400);
}.bind(this), 1 == e ? this.intTime : 50);
},
createNewMonster: function() {
0 != this.times && this.alreadyTime < this.times || setTimeout(function() {
this._initMonster();
}.bind(this), this.intTime);
},
_getMonsterInfo: function() {
if (0 == this.order) var e = Math.floor(Math.random() * this.monsterArr.length); else if (this.point == this.monsterArr.length - 1) e = this.point = 0;
var t = {
dir: this.dirArr[e],
id: this.monsterArr[e],
moveType: this.moveArr[e]
};
this.point++;
return t;
},
clearTime: function() {
clearTimeout(this.animationFunc);
clearTimeout(this.brithFunc);
}
});
cc._RF.pop();
}, {} ],
Monster: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "4baedUMSLFF56sTE0LHMMvs", "Monster");
var o = e("./funCsv");
cc.Class({
extends: cc.Component,
properties: {
boomNode: cc.Prefab,
iceNode: cc.Prefab,
slimeNode: cc.Prefab
},
onLoad: function() {
this.isNotUpdate = !0;
this.isIce = !1;
this.isSlime = !1;
this.underAttack = !1;
this.attackAction = !1;
this.scanTime = 0;
this.BoomNum = 0;
this.BoomArr = [];
this.tilePoint = 0;
this.scanBlock = !1;
this.isNothasDiamond = !1;
},
start: function() {},
onDestroy: function() {
this.clearTime();
},
update: function(e) {
if (1 != cc.YL.isPause) {
if (1 != this.isNotUpdate) if (1 != this.underAttack) if (1 != cc.YL.isOver) if (1 != this.isIce) {
var t = this.node.getPosition(), i = this.colliderPlayerNode.getPosition(), o = Math.abs(t.x - i.x), n = Math.abs(t.y - i.y), a = Math.sqrt(o * o + n * n);
if ((o < this.monsterAccleRag && n <= 10 || n < this.monsterAccleRag && o <= 10) && 0 != this.isScan && 0 == this._moveType && cc.YL.PlayerTileArr.length > 1) {
this.tilePoint = cc.YL.PlayerTileArr.length - 1;
this.monsterScaning = !0;
}
if (a >= this.monsterAccleRag && 0 != this.isScan && 0 == this._moveType) {
this.monsterScaning = !1;
this.scanTime = 0;
}
o < this.monsterAccleRag && t.y == i.y && 0 != this.isScan && Math.abs(t.x - i.x) >= this.monsterAttackRag && 1 == this._moveType && cc.YL.PlayerTileArr.length > 1 && (this.monsterScaning = !0);
if ((o >= this.monsterAccleRag || t.y != i.y) && 0 != this.isScan && 1 == this._moveType) {
this.monsterScaning = !1;
this.scanTime = 0;
}
n < this.monsterAccleRag && 0 != this.isScan && Math.abs(t.y - i.y) >= this.monsterAttackRag && 2 == this._moveType && t.x == i.x && cc.YL.PlayerTileArr.length > 1 && (this.monsterScaning = !0);
if ((n >= this.monsterAccleRag || t.x != i.x) && 0 != this.isScan && 2 == this._moveType) {
this.monsterScaning = !1;
this.scanTime = 0;
}
if (a <= this.monsterAttackRag && 0 == this.targetIsDead && 0 == this.colliderPlayerNode.getComponent("Player").allCanStatus) {
this.targetIsDead = !0;
this._monsterAttack(t.x, i.x);
}
this._updateEmoji();
} else this.node.stopAllActions(); else this.node.stopAllActions(); else this.node.stopAllActions();
} else this.node.stopAllActions();
},
initMonster: function(e, t) {
cc.log("初始化哥布林", e);
o.turnCsvToJson("Csv/monster", function(i) {
this.cvsJson = i;
this.node.zIndex = 500;
this.monsterScaning = !1;
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.colliderPlayerNode = this.mapComp.playerNode;
this.targetIsDead = !1;
this.isNotUpdate = !0;
this.mosterStep = 0;
this.monsterTile = t;
this._monsterID = parseInt(e.id);
this._dir = e.dir;
this._moveType = e.moveType;
this._loadMonsterSet();
setTimeout(function() {
this.isNotUpdate = !1;
}.bind(this), 1e3);
var o = cc.instantiate(this.mapComp.emoji);
this.mapComp.mapNode.addChild(o);
this.emoji = o;
this.emoji.zIndex = 1001;
}.bind(this));
},
_loadMonsterSet: function() {
this.isScan = 0;
this.monsterAttackRag = 64;
this.monsterAccleRag = 0;
this.monsterSpeed = .66;
this.monsterAcclSpeed = .33;
if (this.cvsJson) for (var e = 1; e <= utils.getCvsLength(this.cvsJson); e++) if (parseInt(this.cvsJson[e].INT_ID) == parseInt(this._monsterID)) {
this.isScan = parseInt(this.cvsJson[e].INT_View);
this.monsterAttackRag = parseInt(this.cvsJson[e].INT_Attack);
this.monsterAccleRag = parseInt(this.cvsJson[e].INT_Follow);
this.monsterSpeed = 64 / parseInt(this.cvsJson[e].INT_WalkSpeed);
this.monsterAcclSpeed = 64 / parseInt(this.cvsJson[e].INT_RunSpeed);
this._monsterType = parseInt(this.cvsJson[e].INT_Type);
cc.log(this.cvsJson[e]);
}
this._showType();
},
_showType: function() {
for (var e = 0; e < this.node.children.length; e++) this.node.children[e].active = !1;
switch (this._monsterType) {
case 1:
this.monsterNode = this.node.getChildByName("normal");
break;

case 9:
this.monsterNode = this.node.getChildByName("ice");
break;

case 2:
this.monsterNode = this.node.getChildByName("white");
break;

case 3:
this.monsterNode = this.node.getChildByName("green");
break;

case 4:
this.monsterNode = this.node.getChildByName("blue");
break;

case 5:
this.monsterNode = this.node.getChildByName("purple");
break;

case 6:
this.monsterNode = this.node.getChildByName("orange");
break;

case 7:
this.monsterNode = this.node.getChildByName("red");
break;

case 8:
this.monsterNode = this.node.getChildByName("mucus");
break;

case 10:
this.monsterNode = this.node.getChildByName("boom");
break;

default:
this.monsterNode = this.node.getChildByName("normal");
}
this.monsterNode.active = !0;
this.monsterNode.getChildByName("right").active = !0;
this.monsterNode.getChildByName("left").active = !1;
this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = !1;
this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).animation = "Born";
setTimeout(function() {
this._monsterStart();
}.bind(this), 1500);
},
_monsterStart: function() {
this._startMove();
this.specialMonster();
},
_monsterReStart: function() {
if (0 == this.isIce) {
this.isNotUpdate = !1;
this.specialMonster();
this.monsterAutoMove();
}
cc.director.getScheduler().resumeTarget(this);
},
_getRandomDir: function(e, t) {
if (++t >= 10) this.startDir = e[0]; else {
var i = Math.floor(Math.random() * e.length);
1 == this.chargeTile(e[i]) ? this.startDir = e[i] : this._getRandomDir(e, t);
}
},
_startMove: function() {
this.startDir = "";
var e = [ "left", "right", "up", "down" ];
0 == this._moveType ? 0 == this._dir ? this._getRandomDir(e, 0) : this.startDir = e[parseInt(this._dir) - 1] : 1 == this._moveType ? 0 == this._dir ? this._getRandomDir([ "left", "right" ], 0) : this.startDir = e[parseInt(this._dir) - 1] : 2 == this._moveType && (0 == this._dir ? this._getRandomDir([ "up", "down" ], 0) : this.startDir = e[parseInt(this._dir) - 1]);
this.monsterAutoMove();
},
showDirSpr: function(e) {
this.monsterNode.getChildByName("left").active = !1;
this.monsterNode.getChildByName("right").active = !1;
this.monsterNode.getChildByName(e).active = !0;
},
monsterAutoMove: function() {
if (1 != cc.YL.isOver && this.mapComp) {
if (1 == this.monsterScaning && 0 == this.scanBlock) {
this.scanTime++;
this._showTanhao();
} else {
if ("" == this.startDir) {
this.monsterReAutoMove();
this.monsterAutoMove();
return;
}
0 == this._moveType && 1 != this.monsterScaning && 0 == this._dir && (this.startDir = this._getRandomDirSpecial(this.startDir));
var e = cc.v2(this.monsterTile.x, this.monsterTile.y);
switch (this.startDir) {
case "up":
e.y -= 1;
break;

case "down":
e.y += 1;
break;

case "left":
e.x -= 1;
break;

case "right":
e.x += 1;
}
var t = this.mapComp.tiledMap.getMapSize();
if (e.x < 0 || e.x >= t.width) {
this.monsterReAutoMove();
this.monsterAutoMove();
return;
}
if (e.y < 0 || e.y >= t.height) {
this.monsterReAutoMove();
this.monsterAutoMove();
return;
}
if (0 != this.mapComp.block.getTileGIDAt(e)) {
this.monsterReAutoMove();
this.monsterAutoMove();
return;
}
}
if (1 == this.monsterScaning && 0 == this.scanBlock && this.monsterTile && cc.YL.PlayerTileArr && this.tilePoint && this.tilePoint < cc.YL.PlayerTileArr.length) {
if (this.monsterTile.x != cc.YL.PlayerTileArr[this.tilePoint].x && this.monsterTile.y != cc.YL.PlayerTileArr[this.tilePoint].y) {
this.tilePoint--;
this.scanBlock = !0;
this.monsterAutoMove();
return;
}
if (0 == this._chargeBlock(this.monsterTile, cc.YL.PlayerTileArr[this.tilePoint])) {
this.tilePoint--;
this.scanBlock = !0;
this.monsterAutoMove();
return;
}
cc.YL.PlayerTileArr[this.tilePoint].x == this.monsterTile.x && (cc.YL.PlayerTileArr[this.tilePoint].y - this.monsterTile.y > 0 ? this.startDir = "down" : this.startDir = "up");
cc.YL.PlayerTileArr[this.tilePoint].y == this.monsterTile.y && (cc.YL.PlayerTileArr[this.tilePoint].x - this.monsterTile.x > 0 ? this.startDir = "right" : this.startDir = "left");
var i = this.monsterAcclSpeed;
"left" == this.startDir ? this.showDirSpr("left") : this.showDirSpr("right");
this._showStatus("Run");
this.monsterTile = e = cc.YL.PlayerTileArr[this.tilePoint];
if (!this.followUp) {
this.followUp = !0;
this._emojiAnim("surprise");
this.colliderPlayerNode.getComponent("Player")._emojiAnim("terrified");
}
} else {
i = this.monsterSpeed;
"left" == this.startDir ? this.showDirSpr("left") : this.showDirSpr("right");
this._showStatus("Walk");
this.monsterTile = e;
if (this.followUp) {
this.followUp = !1;
this._emojiAnim("daze");
this.colliderPlayerNode.getComponent("Player")._emojiAnim("sigh");
}
}
this.mosterStep++;
this.node.stopAllActions();
if (this.monsterTile) {
var o = this.mapComp.block.getPositionAt(this.monsterTile);
this.isAction = !0;
this.tilePoint++;
var n = this.node.getPosition().x - o.x, a = this.node.getPosition().y - o.y;
if (1 == this.monsterScaning && 1 == this.scanTime) {
Math.abs(n) > 64 && (i = 1 * this.monsterAcclSpeed * (Math.abs(n) / 64));
Math.abs(a) > 64 && (i = 1 * this.monsterAcclSpeed * (Math.abs(a) / 64));
} else {
Math.abs(n) > 64 && (i *= Math.abs(n) / 64);
Math.abs(a) > 64 && (i *= Math.abs(a) / 64);
}
this.node.runAction(cc.sequence(cc.moveTo(i, o), cc.callFunc(function() {
this.ice(e, this.startDir);
this._monsterCatch(e);
this.mapComp.changeZIndex();
}.bind(this)), cc.callFunc(function() {
this.isAction = !1;
if (0 == this.boomer(e) && 0 == this.isIce && !this.trigger && 0 == this.targetIsDead && 0 == this.attackAction) {
this.scanBlock = !1;
this.monsterAutoMove();
}
}.bind(this))));
}
}
},
_chargeBlock: function(e, t) {
if (e.x == t.x && t.y != e.y) if (e.y < t.y) for (var i = 0; i <= t.y - e.y; i++) {
(o = cc.v2(e.x, e.y)).y += i;
if (0 != this.mapComp.block.getTileGIDAt(o)) return !1;
} else for (i = 0; i <= e.y - t.y; i++) {
(o = cc.v2(t.x, t.y)).y += i;
if (0 != this.mapComp.block.getTileGIDAt(o)) return !1;
}
if (e.x != t.x && t.y == e.y) if (e.x < t.x) for (i = 0; i <= t.x - e.x; i++) {
(o = cc.v2(e.x, e.y)).x += i;
if (0 != this.mapComp.block.getTileGIDAt(o)) return !1;
} else for (i = 0; i <= e.x - t.x; i++) {
var o;
(o = cc.v2(t.x, t.y)).x += i;
if (0 != this.mapComp.block.getTileGIDAt(o)) return !1;
}
return !0;
},
_getRandomArr: function(e) {
for (var t = this.mapComp.tiledMap.getMapSize(), i = [], o = 0; o < e.length; o++) e[o].x < 0 || e[o].x >= t.width ? i.push(!1) : e[o].y < 0 || e[o].y >= t.height ? i.push(!1) : this.mapComp.block.getTileGIDAt(e[o]) ? i.push(!1) : i.push(!0);
return i;
},
_returnDir: function(e) {
switch (e) {
case "up":
return "down";

case "down":
return "up";

case "left":
return "right";

case "right":
return "left";
}
},
_getRandomDirSpecial: function(e) {
if (this.mapComp && this.monsterTile) {
for (var t = this._returnDir(e), i = cc.v2(this.monsterTile.x, this.monsterTile.y), o = this._getRandomArr([ cc.v2(i.x, i.y -= 1), cc.v2(i.x, i.y += 2), cc.v2(i.x -= 1, i.y -= 1), cc.v2(i.x += 2, i.y) ]), n = [ "up", "down", "left", "right" ], a = [], s = 0; s < o.length; s++) 1 == o[s] && t != n[s] && a.push(n[s]);
return 0 == a.length ? t : a[Math.floor(Math.random() * a.length)];
}
},
monsterReAutoMove: function() {
0 == this._moveType ? 0 == this._dir ? this.startDir = this._getRandomDirSpecial(this.startDir) : this.startDir = [ "left", "right", "up", "down" ][parseInt(this._dir) - 1] : 1 == this._moveType ? "left" == this.startDir ? this.startDir = "right" : this.startDir = "left" : 2 == this._moveType && ("up" == this.startDir ? this.startDir = "down" : this.startDir = "up");
},
chargeTile: function(e) {
if (this.mapComp) {
var t = cc.v2(0, 0);
t.x = this.monsterTile.x;
t.y = this.monsterTile.y;
switch (e) {
case "up":
t.y -= 1;
break;

case "down":
t.y += 1;
break;

case "left":
t.x -= 1;
break;

case "right":
t.x += 1;
}
var i = this.mapComp.tiledMap.getMapSize();
return !(t.x < 0 || t.x >= i.width) && (!(t.y < 0 || t.y >= i.height) && !this.mapComp.block.getTileGIDAt(t));
}
},
_monsterAttack: function(e, t) {
this._monsterAction(e, t);
},
specialMonster: function() {
8 == this._monsterType && (this.slimeTimer = setTimeout(function() {
this.slime();
}.bind(this), 1e4));
},
_monsterAction: function(e, t) {
if (1 != this.attackAction) {
e - t >= 0 ? this.showDirSpr("left") : this.showDirSpr("right");
this.attackAction = !0;
this._showStatus("Attack");
switch (this._monsterType) {
case 1:
audio.playEffect("Skill_Goblin_Attack_Normal");
break;

case 2:
case 3:
case 4:
case 5:
case 6:
case 7:
audio.playEffect("Skill_Goblin_Attack_Diamond");
break;

case 8:
audio.playEffect("Skill_Goblin_Attack_Mucus");
break;

case 9:
audio.playEffect("Skill_Goblin_Attack_Ice");
break;

case 10:
audio.playEffect("Skill_Goblin_Attack_Bomb");
}
audio.playEffect("Skill_Goblin_Attack_Normal");
this.node.stopAllActions();
this.colliderPlayerNode.getComponent("Player").underAttack();
setTimeout(function() {
this._showStatus("Stand");
this.targetIsDead = !1;
this.attackAction = !1;
this.monsterAutoMove();
}.bind(this), 3e3);
}
},
_monsterCatch: function(e) {
var t = this.mapComp.getDiamondNode(e);
if (null == t || 1 != t.getChildByName("Slime").active && 1 != t.getChildByName("Ice").active) {
var i = this.mapComp.diamond.getTileGIDAt(e);
switch (this._monsterType) {
case 2:
if (0 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this.mapComp.checkStageGoal();
1 == Math.floor(2 * Math.random()) && this._emojiAnim("nice");
}
break;

case 3:
if (1 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this.mapComp.checkStageGoal();
1 == Math.floor(2 * Math.random()) && this._emojiAnim("nice");
}
break;

case 4:
if (2 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this.mapComp.checkStageGoal();
1 == Math.floor(2 * Math.random()) && this._emojiAnim("nice");
}
break;

case 5:
if (3 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this.mapComp.checkStageGoal();
1 == Math.floor(2 * Math.random()) && this._emojiAnim("nice");
}
break;

case 6:
if (4 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this.mapComp.checkStageGoal();
1 == Math.floor(2 * Math.random()) && this._emojiAnim("nice");
}
break;

case 7:
if (5 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this.mapComp.checkStageGoal();
1 == Math.floor(2 * Math.random()) && this._emojiAnim("nice");
}
}
}
},
clearTime: function() {
clearTimeout(this.showSpliter);
clearTimeout(this.slimeTimer);
this.isNotUpdate = !0;
cc.director.getScheduler().pauseTarget(this);
},
_showStatus: function(e) {
if (this.monsterNode) {
if ("Run" == e || "Walk" == e) {
this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).loop = !0;
this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = !0;
}
if ("Attack" == e || "Bing_Xiaochu" == e) {
this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).loop = !1;
this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = !1;
}
var t = "";
if (this.monsterNode.getChildByName("left") || this.monsterNode.getChildByName("right")) if (this.monsterNode.getChildByName("left").active) {
t = "left";
this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).animation = e;
} else {
this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).animation = e;
t = "right";
}
return t;
}
},
boomer: function(e) {
if (10 == this._monsterType) {
if (this.mosterStep < 6) return !1;
for (var t = !1, i = this.mapNode.getContentSize(), o = this.tiledMap.getTileSize(), n = 0; n < this.mapNode.children.length; n++) "Boom" == this.mapNode.children[n].name && this.mapNode.children[n].x == e.x * o.width && this.mapNode.children[n].y == i.height - o.height * (e.y + 1) && (t = !0);
if (1 == t) return !1;
this.mosterStep = 0;
this.node.stopAllActions();
this._showStatus("Attack");
var a = cc.instantiate(this.boomNode);
this.mapNode.addChild(a);
a.setPosition(e.x * o.width, i.height - o.height * (e.y + 1));
a.getComponent("Boom").showBoomNode(e);
this.BoomArr.push(a);
setTimeout(function() {
this.fixMonsterPos(2);
this.monsterAutoMove();
}.bind(this), 1e3);
this.BoomNum++;
if (this.BoomNum >= 4) {
this.BoomArr[0].getComponent("Boom").showBoomEffect(e);
this.BoomArr.splice(0, 1);
this.BoomNum--;
return !0;
}
return !0;
}
return !1;
},
ice: function(e, t) {
if (this.mapComp && 9 == this._monsterType) {
var i = cc.v2(e.x, e.y), o = !1;
switch (t) {
case "up":
i.y -= 1;
break;

case "down":
i.y += 1;
break;

case "left":
i.x -= 1;
break;

case "right":
i.x += 1;
}
var n = this.mapComp.tiledMap.getMapSize();
if (i.x < 0 || i.x >= n.width) return;
if (i.y < 0 || i.y >= n.height) return;
if (this.mapComp.block.getTileGIDAt(i)) return;
var a = this.mapComp.getDiamondNode(i);
if (null == a) return;
1 != a.getChildByName("Slime").active && 1 != a.getChildByName("Ice").active || (o = !0);
if (1 == o) return;
if (0 != this.mapComp.diamond.getTileGIDAt(i)) {
this.isIce = !0;
clearTimeout(this.showIce);
this.node.stopAllActions();
audio.playEffect("Skill_Goblin_Ice");
this._showStatus("Attack");
a.getChildByName("Ice").getComponent("Ice").showIceNode();
this.showIce = setTimeout(function() {
this.isIce = !1;
this.isNotUpdate = !1;
this.fixMonsterPos(3);
this.monsterAutoMove();
}.bind(this), 1e3);
}
}
},
slime: function() {
if (1 != this.isNothasDiamond && this.mapComp) {
this.mapComp._findDiamondPos();
if (this.mapComp.diamondPosArr.length <= 0) this.isNothasDiamond = !0; else {
for (var e = !1, t = 0; t < this.mapComp.diamondPosArr.length; t++) {
var i = this.mapComp.diamondPosArr[t], o = this.mapComp.getDiamondNode(i.pos);
0 == o.getChildByName("Slime").active && 0 == o.getChildByName("Ice").active && (e = !0);
}
if (0 != e) {
var n = function() {
if (1 != this.isNothasDiamond) {
var e = Math.floor(Math.random() * this.mapComp.diamondPosArr.length), t = this.mapComp.diamondPosArr[e], i = !1, o = this.mapComp.getDiamondNode(t.pos);
if (null != o) {
1 != o.getChildByName("Slime").active && 1 != o.getChildByName("Ice").active || (i = !0);
if (1 == i) n(); else {
var a = this.node.getPosition().x;
t.pos.x - a >= 0 ? this.showDirSpr("right") : this.showDirSpr("left");
audio.playEffect("Skill_Goblin_Mucus");
this._showStatus("Attack");
this.node.stopAllActions();
o.getChildByName("Slime").active = !0;
o.getChildByName("Slime").getComponent("Slime").showSlimeNode();
this.showSpliter = setTimeout(function() {
this.isNotUpdate = !1;
this.fixMonsterPos(4);
this.monsterAutoMove();
this.specialMonster();
}.bind(this), 1e3);
}
}
}
}.bind(this);
n();
}
}
}
},
stopSelf: function() {
this._showStatus("Stand");
this.clearTime();
this.node.stopAllActions();
},
underIceAttacked: function(e) {
if (1 != this._underAttack) {
this._underAttack = !0;
this.node.stopAllActions();
this.isIce = !0;
this._showStatus("Stand");
this._emojiAnim("cry");
this.node.stopAllActions();
var t = this.node.getPosition(), i = t.x - e.x, o = t.y - e.y, n = (180 + 180 * Math.atan2(-o, -i) / Math.PI + 360) % 360;
n = 360 - n - 90;
var a = this.node.convertToNodeSpace(cc.v2(e.x, e.y));
this.node.getChildByName("arrow").active = !0;
this.node.getChildByName("arrow").setPosition(a);
this.node.getChildByName("arrow").rotation = n;
var s = cc.callFunc(function() {
this.node.getChildByName("arrow").active = !1;
this.node.getChildByName("underAttack").active = !0;
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).animation = "Chuxian";
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.getChildByName("underAttack").active = !1;
this._showStatus("Bing_Chixu");
}.bind(this));
}.bind(this));
this.node.getChildByName("arrow").runAction(cc.sequence(cc.moveTo(.5, 0, 0), s));
this.iceTimeOver = !1;
this.underIceTimer = function() {
0 == cc.YL.isClickPause && this.removeIceAttacked();
this.iceTimeOver = !0;
}.bind(this);
this.scheduleOnce(this.underIceTimer, 5);
}
},
removeIceAttacked: function() {
this._showStatus("Bing_Xiaochu");
this.xiaoChuTimer = function() {
this._underAttack = !1;
this.isIce = !1;
cc.YL.isPause = !1;
this.isNotUpdate = !1;
this.fixMonsterPos(1);
this.specialMonster();
this.monsterAutoMove();
}.bind(this);
this.scheduleOnce(this.xiaoChuTimer, 1);
},
_showTanhao: function() {
if (!(1 == this.node.getChildByName("Tanhao").active || this.scanTime > 1)) {
this.node.getChildByName("Tanhao").active = !0;
setTimeout(function() {
this.node.getChildByName("Tanhao").active = !1;
}.bind(this), 500);
}
},
_updateEmoji: function() {
this.emoji.setPosition(this.node.x + 55, this.node.y + 108);
},
_emojiAnim: function(e) {
if (this.emojiType != e) {
console.log("monster's emoji type", e);
this.emojiId && clearTimeout(this.emojiId);
this.emojiType = e;
this.emoji.active = !0;
this.emoji.getComponent(sp.Skeleton).setAnimation(0, {
nice: "Face_Nice",
terrified: "Face_Terrified",
sigh: "Face_Sigh",
cry: "Face_Cry",
daze: "Face_Daze",
laugh: "Face_Laugh",
sweat: "Face_Sweat",
ill: "Face_Ill",
surprise: "Face_Surprise"
}[e], !0);
setTimeout(function() {
this.emojiType = null;
this.emoji.active = !1;
}.bind(this), 1500);
}
},
fixMonsterPos: function(e) {}
});
cc._RF.pop();
}, {
"./funCsv": "funCsv"
} ],
PlayerSkill: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "619f9+OgVFLJKcBPdQ2oSIw", "PlayerSkill");
var o = e("./funCsv");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
o.turnCsvToJson("Csv/skill", function(e) {
cc.YL.SkillCsvJson = e;
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
this._playerNode = this.mapComp.playerNode;
cc.YL.isSkillingIce = !1;
cc.YL.isSkillingWater = !1;
cc.YL.isSkillingHerat = !1;
cc.YL.isSkillingFire = !1;
this._initBtn(e);
}.bind(this));
},
onClickSkill: function(e, t) {
this._playerNode = this.mapComp.playerNode;
this.startSkill(t, e.target);
},
startSkill: function(e, t) {
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
cc.loader.loadRes("Texture/singleColor", cc.SpriteFrame, function(i, o) {
if (i) cc.log(i); else switch (e) {
case "Ice":
this.skillIce(e, o, t);
break;

case "Water":
this.skillWater(e, o, t);
break;

case "Heart":
this.skillHeart(e, o, t);
break;

case "Fire":
this.skillFire(e, o, t);
}
}.bind(this));
},
update: function() {},
chargeBtnStatus: function(e) {
var t = {
0: "Ice",
3: "Heart",
1: "Water",
2: "Fire"
}, i = cc.YL.SkillInfo[e];
i -= 1;
cc.YL.SkillInfo[e] = i;
cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
cc.find("Canvas/PlayerSkill").getChildByName(e).getChildByName("Balck").active = !0;
this.TimerStart(e);
for (var o = 0; o < 4; o++) if (cc.YL.SkillInfo[t[o]] > 0) {
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getComponent(cc.Button).interactable = !0;
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).active = !0;
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string = cc.YL.SkillInfo[t[o]];
} else {
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getChildByName("Balck").active = !0;
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getComponent(cc.Button).interactable = !1;
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getChildByName("Balck").getChildByName("Time").active = !1;
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string = 0;
}
},
TimerStart: function(e) {
cc.find("Canvas/PlayerSkill").getChildByName(e).getComponent("SkillTimer").startTimer();
},
showCover: function(e, t, i) {
cc.YL.canTouch = !1;
this.mapComp.PauseAllMap();
cc.YL.IsCanMove = !1;
this._playerNode.getComponent("Player").showStatus("Stand");
for (var o = 0; o < this.mapNode.children.length; o++) {
var n = this.mapNode.children[o].name.toString().slice(0, 1), a = this.mapNode.children[o].name.toString().slice(-1);
"B" == n && "M" == a && this.mapNode.children[o].getComponent("Monster")._showStatus("Stand");
}
if (this.mapNode.getChildByName("Cover")) this.Cover = this.mapNode.getChildByName("Cover"); else {
this.Cover = new cc.Node();
this.Cover.name = "Cover";
this.Cover.addComponent(cc.Sprite);
this.Cover.getComponent(cc.Sprite).spriteFrame = t;
this.mapNode.addChild(this.Cover);
}
this.Cover.active = !0;
this.Cover.width = 3e4;
this.Cover.height = 3e4;
this.Cover.setPosition(0, 0);
this.Cover.color = new cc.color(0, 0, 0);
this.Cover.opacity = 100;
this.Cover.zIndex = 609;
this.mapNode.getChildByName("all_top_2").zIndex = this.Cover.zIndex - 5;
this.mapNode.getChildByName("all_top_1").zIndex = this.Cover.zIndex - 10;
this.chargeBtnStatus(e);
},
endIceSkill: function() {
if (!this._playerNode.getComponent("Player")._underIce) {
cc.YL.canTouch = !0;
cc.YL.IsCanMove = !0;
this._playerNode.getComponent("Player").isAction = !1;
}
this.mapNode.getChildByName("all_top_2").zIndex = 900;
this.mapNode.getChildByName("all_top_1").zIndex = 899;
if (this.mapNode.getChildByName("Cover")) {
this.Cover = this.mapNode.getChildByName("Cover");
this.Cover.destroy();
}
this.mapComp._startCountdown();
},
endSkill: function() {
cc.log("endSkill");
if (!this._playerNode.getComponent("Player")._underIce) {
cc.YL.canTouch = !0;
cc.YL.IsCanMove = !0;
this._playerNode.getComponent("Player").isAction = !1;
}
if (this.mapNode.getChildByName("Cover")) {
this.Cover = this.mapNode.getChildByName("Cover");
this.Cover.destroy();
}
this.mapNode.getChildByName("all_top_2").zIndex = 900;
this.mapNode.getChildByName("all_top_1").zIndex = 899;
this.mapComp.ResumeAllMap();
},
skillIce: function(e, t, i) {
if (1 != cc.YL.isSkillingIce) {
for (var o = !1, n = 0; n < this.mapNode.children.length; n++) {
var a = this.mapNode.children[n].name.toString().slice(0, 1), s = this.mapNode.children[n].name.toString().slice(-1);
this.mapNode.children[n].stopAllActions();
"B" == a && "M" == s && (o = !0);
}
if (0 != o) {
cc.YL.isSkillingIce = !0;
this._playerNode.getComponent("Player")._emojiAnim("laugh");
audio.playEffect("Skill_Player_Ice");
this.showCover(e, t, i);
this._playerNode.getChildByName("IceAnimation").active = !0;
this._playerNode.getChildByName("IceAnimation").getComponent(sp.Skeleton).animation = "Shan";
this._playerNode.getChildByName("IceAnimation").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("IceAnimation").getComponent(sp.Skeleton).setCompleteListener(function() {
for (var e = 0; e < this.mapNode.children.length; e++) {
var t = this.mapNode.children[e].name.toString().slice(0, 1), i = this.mapNode.children[e].name.toString().slice(-1);
this.mapNode.children[e].stopAllActions();
if ("B" == t && "M" == i) {
this.mapNode.children[e].getComponent("Monster").stopSelf();
this.mapNode.children[e].getComponent("Monster").underIceAttacked(this._playerNode.getPosition());
}
}
}.bind(this));
setTimeout(function() {
this.endIceSkill();
}.bind(this), 2e3);
} else cc.YL.isSkillingIce = !1;
}
},
skillHeart: function(e, t, i) {
if (1 != cc.YL.isSkillingHerat) {
cc.YL.isSkillingHerat = !0;
if (this._playerNode.getComponent("Player").getBlood() >= 3) {
this._failureEmoji();
this.mapNode.getChildByName("all_top_2").zIndex = 604;
this.mapNode.getChildByName("all_top_1").zIndex = 599;
this._playerNode.getChildByName("HeartAnimation").active = !0;
this._playerNode.getChildByName("HeartAnimation").scale = 2;
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).animation = "Shibai";
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).setCompleteListener(function() {
this.mapNode.getChildByName("all_top_2").zIndex = 900;
this.mapNode.getChildByName("all_top_1").zIndex = 899;
cc.YL.isSkillingHerat = !1;
this._playerNode.getChildByName("HeartAnimation").active = !1;
}.bind(this));
} else {
this._playerNode.getComponent("Player")._emojiAnim("laugh");
audio.playEffect("Skill_Player_Heart");
this.showCover(e, t, i);
this._playerNode.getChildByName("HeartAnimation").active = !0;
this._playerNode.getChildByName("HeartAnimation").scale = 2;
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).animation = "Shouhu";
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).loop = !1;
setTimeout(function() {
this._playerNode.getChildByName("HeartAnimation").active = !1;
this._playerNode.getComponent("Player").addBlood();
this.endSkill();
}.bind(this), 1e3);
}
}
},
skillWater: function(e, t, i) {
if (1 != cc.YL.isSkillingWater) {
cc.YL.isSkillingWater = !0;
if (0 == cc.YL.PlayerSlime) {
this._failureEmoji();
this.mapNode.getChildByName("all_top_2").zIndex = 604;
this.mapNode.getChildByName("all_top_1").zIndex = 599;
this._playerNode.getChildByName("WaterAniamtion").active = !0;
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).animation = "Shibai";
this._playerNode.getChildByName("WaterAniamtion").scale = 2;
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).setCompleteListener(function() {
this._playerNode.getChildByName("WaterAniamtion").scale = 1;
this._playerNode.getChildByName("WaterAniamtion").active = !1;
cc.YL.isSkillingWater = !1;
this.mapNode.getChildByName("all_top_2").zIndex = 900;
this.mapNode.getChildByName("all_top_1").zIndex = 899;
}.bind(this));
} else {
this._playerNode.getComponent("Player")._emojiAnim("laugh");
audio.playEffect("Skill_Player_Mucus");
this._playerNode.getChildByName("WaterAniamtion").active = !0;
this.showCover(e, t, i);
this._playerNode.getChildByName("WaterAniamtion").scale = 1;
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).animation = "Jineng";
setTimeout(function() {
this._playerNode.getChildByName("WaterAniamtion").active = !1;
cc.YL.PlayerSlime = !1;
this._playerNode.getComponent("Player").removeSlime();
this.endSkill();
}.bind(this), 1500);
}
}
},
skillFire: function(e, t, i) {
if (1 != cc.YL.isSkillingFire) {
cc.YL.isSkillingFire = !0;
if (0 == cc.YL.PlayerIce) {
this._failureEmoji();
this.mapNode.getChildByName("all_top_2").zIndex = 604;
this.mapNode.getChildByName("all_top_1").zIndex = 599;
this._playerNode.getChildByName("FireAniamtion").active = !0;
this._playerNode.getChildByName("FireAniamtion").scale = 2;
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).animation = "Shibai";
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).setCompleteListener(function() {
this._playerNode.getChildByName("FireAniamtion").active = !1;
this.mapNode.getChildByName("all_top_2").zIndex = 900;
this.mapNode.getChildByName("all_top_1").zIndex = 899;
this._playerNode.getChildByName("FireAniamtion").scale = 1;
cc.YL.isSkillingFire = !1;
}.bind(this));
} else {
this._playerNode.getComponent("Player")._emojiAnim("laugh");
audio.playEffect("Skill_Player_Fire");
this.showCover(e, t, i);
this._playerNode.getChildByName("FireAniamtion").active = !0;
this._playerNode.getChildByName("FireAniamtion").scale = 1;
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).animation = "Jineng";
setTimeout(function() {
this._playerNode.getChildByName("FireAniamtion").active = !1;
this._playerNode.getComponent("Player").removeIce();
this.endSkill();
}.bind(this), 1e3);
}
}
},
_initBtn: function(e) {
var t = {
0: "Ice",
3: "Heart",
1: "Water",
2: "Fire"
};
cc.YL.ClearStage = void 0 == cc.YL.ClearStage ? 1 : cc.YL.ClearStage;
for (var i = 1; i < 5; i++) cc.find("Canvas/PlayerSkill").getChildByName(cc.YL.SkillCsvJson[i].STR_CodeInfo).getComponent("SkillTimer").CDTime = cc.YL.SkillCsvJson[i].INT_CD;
for (var o = 0; o < 4; o++) if (0 != cc.YL.SkillInfo[t[o]]) {
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getComponent(cc.Button).interactable = !0;
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).active = !0;
cc.find("Canvas/PlayerSkill").getChildByName(t[o]).getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string = cc.YL.SkillInfo[t[o]];
}
for (var n = 1; n < 5; n++) cc.YL.ClearStage < parseInt(cc.YL.SkillCsvJson[n].INT_LockStage) && (cc.find("Canvas/PlayerSkill").getChildByName(t[parseInt(cc.YL.SkillCsvJson[n].INT_Type) - 1]).active = !1);
},
_failureEmoji: function() {
this._playerNode.getComponent("Player")._emojiAnim("daze");
for (var e = 0; e < this.mapNode.children.length; e++) {
var t = this.mapNode.children[e].name.toString().slice(0, 1), i = this.mapNode.children[e].name.toString().slice(-1);
if ("B" == t && "M" == i) {
1 == Math.floor(2 * Math.random()) && this.mapNode.children[e].getComponent("Monster")._emojiAnim("laugh");
}
}
}
});
cc._RF.pop();
}, {
"./funCsv": "funCsv"
} ],
Player: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e2cb465FQxDw5YqImEnhkM8", "Player");
var o = e("./funCsv"), n = e("./Guide");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
o.turnCsvToJson("Csv/player", function(e) {
this.moveSpeed = 1;
this.lowSpeed = 2;
for (var t = 1; t <= utils.getCvsLength(e); t++) if (parseInt(e[t].INT_ID) == cc.YL.PlayerRole) {
this.moveSpeed = e[t].INT_MoveSpeed / 60;
this.lowSpeed = e[t].INT_MoveSpeed / 120;
this._showType(e[t].STR_Resource);
}
this.lowSpeed = this.lowSpeed = this.lowSpeed;
this.moveSpeed = this.moveSpeed = this.moveSpeed;
this.lowSpeed = parseInt(this.lowSpeed) + .5;
this.moveSpeed = parseInt(this.moveSpeed) + .5;
cc.log("玩家速度", this.moveSpeed, this.lowSpeed);
cc.YL.PlayerIce = !1;
cc.YL.PlayerSlime = !1;
cc.YL.PlayerAttack = !1;
cc.find("Canvas/PlayerSkill") && (this.skillNodeCom = cc.find("Canvas/PlayerSkill").getComponent("PlayerSkill"));
this.lifeNum = 3;
this.allCanStatus = !1;
this.isLow = !1;
cc.find("Canvas/MapRoot") && (this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map"));
this.catchArr = [];
this.node.zIndex = 700;
this.mapComp && (this.mapComp.lifeNode.getChildByName("num").getComponent(cc.Label).string = this.lifeNum);
cc.YL.PlayerTileArr = [];
cc.YL.playerTile && cc.YL.PlayerTileArr.push(new cc.v2(cc.YL.playerTile.x, cc.YL.playerTile.y));
this.slimeTime = 5e3;
this.iceTime = 5e3;
this.playerStatus = "Stand";
this.playerDir = "right";
if (this.mapComp) {
var i = cc.instantiate(this.mapComp.emoji);
this.mapComp.mapNode.addChild(i);
this.emoji = i;
this.emoji.zIndex = 1001;
this._updateEmojiCoinJump();
}
this.deciding = !0;
}.bind(this));
},
start: function() {
this.showStatus("Stand");
},
removeFunc: function() {
this.showStatus("Stand");
cc.YL.IsCanMove = !0;
this.isAction = !1;
},
showDifferentDir: function(e) {
if (this.playerDir != e) {
this.playerDir = e;
if ("left" == e) {
this.roleNode.getChildByName("left").active = !0;
this.roleNode.getChildByName("right").active = !1;
this.roleNode.getChildByName("left").getComponent(sp.Skeleton).animation = this.playerStatus;
} else {
this.roleNode.getChildByName("left").active = !1;
this.roleNode.getChildByName("right").active = !0;
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).animation = this.playerStatus;
}
}
},
_tryToCatchDiamond: function(e) {
var t = this.mapComp.diamond.getTileGIDAt(e);
if (0 != t) {
audio.playEffect("Player_Collect");
cc.YL.currCatch = t - this.mapComp.diamondFirstGID;
var i = cc.find("Canvas/Score/num").getComponent(cc.Label).string, o = parseInt(i) + parseInt(cc.YL.SkillCsvJson[parseInt(t - this.mapComp.diamondFirstGID) + 5].INT_Gold);
this.playerScore = cc.find("Canvas/Score/num").getComponent(cc.Label).string = o;
if (cc.YL.loadMapStage > 0) {
t - this.mapComp.diamondFirstGID > 1 && this._emojiAnim("nice");
this._coinJumpAnim();
}
this.catchArr.push(t - this.mapComp.diamondFirstGID);
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this._createNewDiamond();
this._removeDiamondEffect(e);
this.mapComp.checkStageStatus(t - this.mapComp.diamondFirstGID + 2);
}
},
_createNewDiamond: function() {
2 == this.catchArr.length && this._analysisCatchArr();
if (3 == this.catchArr.length) {
this.catchArr.splice(0, 1);
this._analysisCatchArr();
}
},
_removeDiamondEffect: function(e) {
var t = this.mapComp.getDiamondNode(e);
if (null != t) {
var i = !1;
if (1 == t.getChildByName("Slime").active) {
i = !0;
t.getChildByName("Slime").getComponent("Slime").showSlimeEffect();
}
1 == t.getChildByName("Ice").active && 0 == i && t.getChildByName("Ice").getComponent("Ice").showIceEffect();
if (1 == t.getChildByName("Slime").active || 1 == t.getChildByName("Ice").active) {
t.getChildByName("Slime").active = !1;
t.getChildByName("Ice").active = !1;
}
}
},
_analysisCatchArr: function() {
this.catchArr[0] == this.catchArr[1] && this._initNewDiamond(this.catchArr[0]);
},
_initNewDiamond: function(e) {
if (5 != e) if (e >= 6 && e < 11) this.catchArr = []; else if (e >= 12 && e < 18) this.catchArr = []; else {
this.mapComp._findDiamondPos();
if (0 != this.mapComp.diamondPosArr.length) {
if (cc.YL.loadMapStage < 1 && !this.guideUpgrade) {
this.guideUpgrade = !0;
n.getInstance().showGuideDialogue();
} else {
var t = Math.floor(Math.random() * this.mapComp.diamondPosArr.length);
this.mapComp._showDiamond(this.mapComp.diamondPosArr[t].pos, e + 1, !0);
this.mapComp.diamond.setTileGIDAt(e + this.mapComp.diamondFirstGID + 1, this.mapComp.diamondPosArr[t].pos);
}
this.catchArr = [];
cc.YL.currCatch = null;
} else this.catchArr = [];
}
},
allCanDo: function() {
this.showStatus("Hurt");
this.scheduleOnce(function() {
this.allCanStatus = !1;
}.bind(this, 3));
},
showStatus: function(e) {
1 == cc.YL.PlayerIce && (e = "Bing_Chixu");
if (1 != cc.YL.PlayerAttack || "Stand" != e) {
1 == cc.YL.PlayerSlime && (e = "Du_" + e);
if (this.playerStatus != e) {
this.playerStatus = e;
console.log("玩家播放的动画状态", e);
if (!this.roleNode) {
var t = cc.YL.PlayerRole ? cc.YL.PlayerRole : 1;
this.roleNode = null;
this.roleNode = this.node.getChildByName(t.toString());
}
if ("Lose" == e || "Win" == e || "Hurt" == e || "Du_Lose" == e || "Du_Win" == e || "Du_Hurt" == e) {
this.roleNode.getChildByName("left").getComponent(sp.Skeleton).loop = !1;
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).loop = !1;
} else {
this.roleNode.getChildByName("left").getComponent(sp.Skeleton).loop = !0;
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).loop = !0;
}
if (this.roleNode.getChildByName("left").active) {
var i = "left";
this.roleNode.getChildByName("left").getComponent(sp.Skeleton).animation = e;
} else {
i = "right";
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).animation = e;
}
"Hurt" != e && "Du_Hurt" != e || this.roleNode.getChildByName(i).getComponent(sp.Skeleton).setCompleteListener(function() {
cc.YL.PlayerAttack = !1;
}.bind(this));
return i;
}
}
},
underSlime: function() {
if (1 != this.isLow) {
this.effectTimer(this.slimeTime);
this._emojiAnim("sweat");
audio.playEffect("Status_Mucus");
this.isLow = !0;
cc.YL.PlayerSlime = !0;
setTimeout(function(e) {
1 != cc.YL.isPause && this.removeSlime();
}.bind(this), this.slimeTime);
}
},
removeSlime: function() {
this.isLow = !1;
cc.YL.PlayerSlime = !1;
this.unschedule(this._timer);
},
underIce: function() {
if (1 != this._underIce) {
this.effectTimer(this.iceTime);
cc.YL.TouchMoveDir = "";
this._emojiAnim("ill");
audio.playEffect("Status_Ice");
this._underIce = !0;
cc.YL.IsCanMove = !1;
cc.YL.PlayerIce = !0;
this.showStatus("Bing_Chixu");
this.underIceTime = setTimeout(function(e) {
cc.log("冰冻时间", e);
1 != cc.YL.isPause && this.removeIce();
}.bind(this), this.iceTime);
}
},
removeIce: function() {
clearTimeout(this.underIceTime);
cc.YL.PlayerIce = !1;
cc.YL.IsCanMove = !0;
this._underIce = !1;
this.isAction = !1;
cc.YL.canTouch = !0;
this.showStatus("Stand");
this.unschedule(this._timer);
},
effectTimer: function(e) {
this._startTime = e / 1e3;
cc.log("对玩家的特效时间记录", this._startTime);
this.schedule(this._timer, .1);
},
_timer: function() {
1 != cc.YL.isPause && (this._startTime = this._startTime - .1);
this._startTime <= 0 && this.unschedule(this._timer);
},
goOnEffect: function() {
cc.log("暂停回来", this._startTime);
if (this._startTime > 0) setTimeout(function() {
this.removeIce();
this.removeSlime();
}.bind(this), 1e3 * this._startTime); else {
this.removeIce();
this.removeSlime();
}
},
reduceBlood: function() {
var e = this.mapComp.lifeNode;
e.getChildByName("num").getComponent(cc.Label).string = parseInt(e.getChildByName("num").getComponent(cc.Label).string) - 1;
this.lifeNum--;
},
addBlood: function() {
var e = this.mapComp.lifeNode;
e.getChildByName("num").getComponent(cc.Label).string = parseInt(e.getChildByName("num").getComponent(cc.Label).string) + 1;
this.lifeNum++;
},
getBlood: function() {
var e = this.mapComp.lifeNode;
return parseInt(e.getChildByName("num").getComponent(cc.Label).string);
},
_showType: function() {
var e = cc.YL.PlayerRole;
this.roleNode = null;
this.roleNode = this.node.getChildByName(e.toString());
this.node.getChildByName("1").active = !1;
this.node.getChildByName("2").active = !1;
this.node.getChildByName("3").active = !1;
this.roleNode.active = !0;
this.hallStand && this._showIdle();
},
_showIdle: function() {
this.showId && clearTimeout(this.showId);
this.showId = setTimeout(function() {
if (this.roleNode) {
var e = "Idle" + (Math.floor(2 * Math.random()) + 1);
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setCompleteListener(function() {
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setAnimation(0, "Stand", !0);
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setCompleteListener(function() {});
this._showIdle();
}.bind(this));
this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setAnimation(0, e, !1);
}
}.bind(this), 5e3);
},
underAttack: function() {
if (1 != this.allCanStatus && 1 != cc.YL.isOver) {
cc.YL.TouchMoveDir = "";
cc.YL.PlayerIce = !1;
this.allCanStatus = !0;
cc.YL.PlayerAttack = !0;
this.node.pauseAllActions();
this.node.stopAllActions();
this.isAction = !1;
this.reduceBlood();
this._emojiAnim("cry");
if (this.lifeNum <= 0) {
this.showStatus("Lose");
this.node.stopAllActions();
this.mapComp.StopAllMap();
this.mapComp.stageFail();
cc.YL.isOver = !0;
} else this.allCanDo();
}
},
getTileYToPos: function(e) {
return [ 1664, 1600, 1536, 1472, 1408, 1344, 1280, 1216, 1152, 1088, 1024, 960, 896, 832, 768, 704, 640, 576, 512, 448, 384, 320, 256, 192, 128, 64, 0 ][e];
},
fixPos: function(e, t) {
if (e > t) {
(e - t) % 4 == 0 ? t += 4 : (e - t) % 2 == 0 && (t += 2);
t += 1;
} else {
if (!(e < t)) return t;
(t - e) % 4 == 0 ? t -= 4 : (t - e) % 2 == 0 && (t -= 2);
t -= 1;
}
return t;
},
update: function(e) {
if (this.roleNode) {
var t = void 0;
t = this.roleNode.getChildByName("left").active ? "left" : "right";
if (this.paused) {
this.node.stopAllActions();
this.roleNode.getChildByName(t).getComponent(sp.Skeleton).paused = !0;
} else {
this.roleNode.getChildByName(t).getComponent(sp.Skeleton).paused = !1;
this.playerMove();
}
}
},
playerMove: function() {
var e = cc.YL.TouchMoveDir;
if (e) {
var t = 0 == cc.YL.PlayerSlime ? this.moveSpeed : this.lowSpeed, i = this.node.x, o = this.node.y, a = this.chargeDirBlock(e, cc.YL.playerTile.x, cc.YL.playerTile.y), s = this.getTileYToPos(cc.YL.playerTile.y);
if (0 == a) {
var c = 64 * cc.YL.playerTile.x, r = this.getTileYToPos(cc.YL.playerTile.y);
if ("up" == e && this.node.y <= r && Math.abs(64 * cc.YL.playerTile.x - i) <= 32) {
this.node.y += t;
this.node.x = this.fixPos(64 * cc.YL.playerTile.x, this.node.x);
} else if ("down" == e && this.node.y >= r && Math.abs(64 * cc.YL.playerTile.x - i) <= 32) {
this.node.y -= t;
this.node.x = this.fixPos(64 * cc.YL.playerTile.x, this.node.x);
} else if ("left" == e && this.node.x >= c && Math.abs(s - o) <= 32) {
this.node.x -= t;
this.node.y = this.fixPos(this.getTileYToPos(cc.YL.playerTile.y), this.node.y);
this.showDifferentDir(e);
} else {
if (!("right" == e && this.node.x <= c && Math.abs(s - o) <= 32)) {
cc.YL.TouchMoveDir = "";
this.showStatus("Stand");
return;
}
this.node.x += t;
this.node.y = this.fixPos(this.getTileYToPos(cc.YL.playerTile.y), this.node.y);
this.showDifferentDir(e);
}
} else if (("up" == e || "down" == e) && Math.abs(64 * cc.YL.playerTile.x - i) <= 32) {
"up" === e ? this.node.y += t : this.node.y -= t;
this.node.x = this.fixPos(64 * cc.YL.playerTile.x, this.node.x);
} else if (("left" == e || "right" == e) && Math.abs(s - o) <= 32) {
"left" === e ? this.node.x -= t : this.node.x += t;
this.node.y = this.fixPos(this.getTileYToPos(cc.YL.playerTile.y), this.node.y);
this.showDifferentDir(e);
}
this.showStatus("Run");
this._updateEmojiCoinJump();
if ((i % 64 <= 32 || i % 64 >= 32) && ((o - 640) % 64 <= 32 || (o - 640) % 64 >= 32)) {
var l = Math.round(i / 64), h = Math.round(16 - (o - 640) / 64);
cc.YL.playerTile.x = l;
cc.YL.playerTile.y = h;
this.pushTileOnly(new cc.v2(l, h));
this._tryToCatchDiamond(cc.YL.playerTile);
this.mapComp.changeZIndex();
}
cc.YL.loadMapStage < 1 && n.getInstance().updateOperateIdx();
} else {
cc.YL.TouchMoveDir = "";
this.showStatus("Stand");
}
},
pushTileOnly: function(e) {
if (0 != cc.YL.PlayerTileArr.length) {
if (cc.YL.PlayerTileArr[cc.YL.PlayerTileArr.length - 1].x != e.x || cc.YL.PlayerTileArr[cc.YL.PlayerTileArr.length - 1].y != e.y) {
cc.YL.PlayerTileArr.push(e);
audio.playEffect("Player_Run");
}
} else cc.YL.PlayerTileArr.push(e);
},
chargeDirBlock: function(e, t, i) {
var o = cc.v2(t, i);
switch (e) {
case "up":
o.y -= 1;
break;

case "down":
o.y += 1;
break;

case "left":
o.x -= 1;
break;

case "right":
o.x += 1;
}
var n = this.mapComp.tiledMap.getMapSize();
return !(o.x < 0 || o.x >= n.width) && (!(o.y < 0 || o.y >= n.height) && 0 == this.mapComp.block.getTileGIDAt(o));
},
_updateEmojiCoinJump: function() {
this.emoji.setPosition(this.node.x + 55, this.node.y + 108);
this.mapComp.coinJump.setPosition(this.node.x + 30, this.node.y + 136);
},
_coinJumpAnim: function() {
var e = this.mapComp.coinJump;
e.active = !0;
e.getComponent(sp.Skeleton).setCompleteListener(function() {
e.active = !1;
e.getComponent(sp.Skeleton).animation = null;
});
e.getComponent(sp.Skeleton).setAnimation(0, "Coin", !1);
},
_emojiAnim: function(e) {
if (this.emojiType != e) {
console.log("player's emoji type", e);
this.emojiId && clearTimeout(this.emojiId);
this.emojiType = e;
this.emoji.active = !0;
this.emoji.getComponent(sp.Skeleton).setAnimation(0, {
nice: "Face_Nice",
terrified: "Face_Terrified",
sigh: "Face_Sigh",
cry: "Face_Cry",
daze: "Face_Daze",
laugh: "Face_Laugh",
sweat: "Face_Sweat",
ill: "Face_Ill",
surprise: "Face_Surprise"
}[e], !0);
this.emojiId = setTimeout(function() {
this.emojiType = null;
this.emoji.active = !1;
}.bind(this), 1500);
}
}
});
cc._RF.pop();
}, {
"./Guide": "Guide",
"./funCsv": "funCsv"
} ],
Popup: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0476b1OWV1GpI3nOKbdju24", "Popup");
var o = {
init: function() {
this.rootNode = cc.find("Canvas");
},
show: function(e) {
if (this.rootNode) {
this.hide();
cc.loader.loadRes("Prefab/Utils/Popup", cc.Prefab, function(t, i) {
if (t) console.error(t); else {
var o = cc.instantiate(i), n = this.rootNode.getContentSize();
n.width < 960 && (o.scale = n.width / 960);
var a = o.getChildByName("box");
a.getChildByName("content").getComponent(cc.Label).string = e.str.toString();
var s = a.getChildByName("btnConfirm"), c = a.getChildByName("btnCancel");
e.confirmStr && (s.getChildByName("lab").getComponent(cc.Label).string = e.confirmStr);
e.cancelStr && (c.getChildByName("lab").getComponent(cc.Label).string = e.cancelStr);
var r = e.confirm, l = e.cancel;
if (!l) {
c.active = !1;
s.x = 0;
}
s.on("click", function() {
audio.playEffect("UI_Button");
r && "function" == typeof r && r();
this.hide();
}.bind(this));
c.on("click", function() {
audio.playEffect("UI_Button");
l && "function" == typeof l && l();
this.hide();
}.bind(this));
a.opacity = 0;
a.scale = .1;
this.rootNode.addChild(o, 9999);
a.runAction(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.2, 1).easing(cc.easeBackOut())));
}
}.bind(this));
} else console.error("未找到根节点Canvas!!");
},
hide: function() {
if (this.rootNode) {
var e = this.rootNode.getChildByName("Popup");
e && e.runAction(cc.sequence(cc.spawn(cc.fadeOut(.2), cc.scaleTo(.2, .1).easing(cc.easeBackIn())), cc.callFunc(function() {
e.removeFromParent();
e.destroy();
})));
}
}
};
window.popup = o;
cc._RF.pop();
}, {} ],
RoleChoice: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e07f9s+IYxDeLipaiTPmVt2", "RoleChoice");
var o = e("./funCsv");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {},
start: function() {
o.turnCsvToJson("Csv/player", function(e) {
this._csvJson = e;
this._init();
}.bind(this));
},
_init: function() {
cc.log("当前关卡", cc.YL.ClearStage);
for (var e = this.node.getChildByName("box").getChildByName("BigRole"), t = 0; t < e.children.length; t++) {
e.children[t].getChildByName("ChoiceBtn").active = !0;
e.children[t].getChildByName("chose").active = !1;
e.children[t].active = !1;
}
var i = this.node.getChildByName("box").getChildByName("RoleList").getChildByName("view").getChildByName("content");
for (t = 0; t < i.children.length; t++) {
i.children[t].getChildByName("Label").getComponent(cc.Label).string = "";
i.children[t].getChildByName("select").active = !1;
}
for (var o in this._csvJson) {
var n = this._csvJson[o].INT_UnlockMission;
if (parseInt(n) && cc.YL.ClearStage < parseInt(n)) {
i.getChildByName(o).getComponent(cc.Button).interactable = !1;
i.getChildByName(o).getChildByName("SprNot").active = !0;
i.getChildByName(o).getChildByName("Spr").active = !1;
i.getChildByName(o).getChildByName("Label").getComponent(cc.Label).string = "第" + (parseInt(n) + 1) + "关解锁";
} else {
i.getChildByName(o).getComponent(cc.Button).interactable = !0;
i.getChildByName(o).getChildByName("SprNot").active = !1;
i.getChildByName(o).getChildByName("Spr").active = !0;
}
e.getChildByName(o).getChildByName("nameBG").getChildByName("name").getComponent(cc.Label).string = this._csvJson[o].STR_Name;
var a = this._csvJson[o].INT_MoveSpeed, s = this._csvJson[o].INT_RecoverSpeed, c = e.getChildByName(o).getChildByName("speed"), r = e.getChildByName(o).getChildByName("reset");
c.getChildByName("percent").getComponent(cc.Label).string = parseInt(a) || 0;
c.getComponent(cc.ProgressBar).progress = parseInt(a) / 300;
r.getChildByName("percent").getComponent(cc.Label).string = parseInt(s) || 0;
r.getComponent(cc.ProgressBar).progress = parseInt(s) / 4e3;
this.checkRoleStatus(o);
if (o == cc.YL.PlayerRole.toString()) {
i.getChildByName(o).getChildByName("select").active = !0;
i.getChildByName(o).getChildByName("Label").getComponent(cc.Label).string = "出场中";
e.getChildByName(o).active = !0;
e.getChildByName(o).getChildByName("ChoiceBtn").active = !1;
e.getChildByName(o).getChildByName("chose").active = !0;
this.showIdle(e.getChildByName(o));
}
}
},
showIdle: function(e) {
this.timeId && clearTimeout(this.timeId);
this.timeId = setTimeout(function() {
var t = "Idle" + (Math.floor(2 * Math.random()) + 1);
e.getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener(function() {
e.getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "Stand", !0);
e.getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener(function() {});
this.showIdle(e);
}.bind(this));
e.getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, t, !1);
}.bind(this), 5e3);
},
checkRoleStatus: function(e) {
if (!(parseInt(e) > o.getJsonLength(this._csvJson))) {
var t = this.node.getChildByName("box").getChildByName("BigRole"), i = t.getChildByName(e).getChildByName("btnBuy");
if (i) {
var n = t.getChildByName(e).getChildByName("ChoiceBtn");
if (cc.YL.unlockRole.find(function(t) {
return t == e;
})) {
i.active = !1;
n.active = !0;
} else {
i.active = !!parseInt(this._csvJson[e].INT_Gold);
n.active = !parseInt(this._csvJson[e].INT_Gold);
}
i.getChildByName("Label").getComponent(cc.Label).string = this._csvJson[e].INT_Gold || 0;
}
}
},
onClickChoiceList: function(e) {
audio.playEffect("UI_Button");
for (var t = e.target.name, i = this.node.getChildByName("box").getChildByName("BigRole"), o = 0; o < i.children.length; o++) i.children[o].active = !1;
i.getChildByName(t).active = !0;
this.showIdle(i.getChildByName(t));
var n = this.node.getChildByName("box").getChildByName("RoleList").getChildByName("view").getChildByName("content");
for (o = 0; o < n.children.length; o++) n.children[o].getChildByName("select").active = !1;
e.target.getChildByName("select").active = !0;
},
onBtnBuyClick: function(e) {
audio.playEffect("UI_Button");
var t = parseInt(e.target.getChildByName("Label").getComponent(cc.Label).string);
if (cc.YL.PlayerInfo.coin < t) popup.show({
str: "金币不足！通关关卡获取更多金币吧！"
}); else {
cc.YL.PlayerInfo.coin -= t;
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
cc.YL.unlockRole.push(e.target.parent.name);
cc.sys.localStorage.setItem("unlockRole", JSON.stringify(cc.YL.unlockRole));
cc.find("Canvas").getComponent("Hall").coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
e.target.active = !1;
e.target.parent.getChildByName("ChoiceBtn").active = !0;
}
},
onClickComfire: function(e) {
audio.playEffect("UI_Button");
var t = e.target.parent.name;
cc.YL.PlayerRole = parseInt(t);
this._init();
cc.sys.localStorage.setItem("playerRole", cc.YL.PlayerRole);
cc.find("Canvas").getComponent("Hall").playerShow.getComponent("Player")._showType();
},
onClickClose: function() {
audio.playEffect("UI_Button");
this.timeId && clearTimeout(this.timeId);
utils.hide(this.node);
}
});
cc._RF.pop();
}, {
"./funCsv": "funCsv"
} ],
SceneManager: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "fa8a604p3JG9L54sZj8ON/2", "SceneManager");
var o = cc.Class({});
o.LoadScene = function(e) {
this._loadScene(e);
};
o.PreLoadScene = function(e) {
this._preLoadScene(e);
};
o._loadScene = function(e) {
cc.director.loadScene(e, function() {
console.log("场景加载完成：", e);
cc.YL.nowSceneName = e;
}.bind(this));
};
o._preLoadScene = function(e) {
cc.director.preloadScene(e, function() {
console.log("场景预加载完成：", e);
cc.YL.nowSceneName = e;
}.bind(this));
};
cc.YL.SceneManager = o;
t.exports = o;
cc._RF.pop();
}, {} ],
Setting: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "77697MQc39LToX24WST7Ijc", "Setting");
cc.Class({
extends: cc.Component,
properties: {},
onEnable: function() {
this.rootNode = cc.find("Canvas");
var e = this.rootNode.getContentSize();
e.width < 960 && (this.node.scale = e.width / 960);
this.mute = this.node.getChildByName("box").getChildByName("mute");
this.effect = this.node.getChildByName("box").getChildByName("effect");
this.music = this.node.getChildByName("box").getChildByName("music");
this.version = this.node.getChildByName("box").getChildByName("version");
this.version.getComponent(cc.Label).string = "当前版本1.1.0";
this.initGameVolume();
},
initGameVolume: function() {
var e = this.mute.getChildByName("switch");
e.getChildByName("on").active = cc.YL.muteMode;
e.getChildByName("off").active = !cc.YL.muteMode;
var t = this.effect.getChildByName("progress"), i = this.effect.getChildByName("slider");
t.getComponent(cc.ProgressBar).progress = cc.YL.effectVolume;
i.getComponent(cc.Slider).progress = cc.YL.effectVolume;
var o = this.music.getChildByName("progress"), n = this.music.getChildByName("slider");
o.getComponent(cc.ProgressBar).progress = cc.YL.musicVolume;
n.getComponent(cc.Slider).progress = cc.YL.musicVolume;
},
onSwitchMuteClick: function() {
audio.playEffect("UI_Button");
var e = this.mute.getChildByName("switch");
if (cc.YL.muteMode) {
cc.YL.muteMode = !1;
e.getChildByName("on").active = !1;
e.getChildByName("off").active = !0;
audio.muteOff();
} else {
cc.YL.muteMode = !0;
e.getChildByName("on").active = !0;
e.getChildByName("off").active = !1;
audio.muteOn();
}
},
onHandleEffectSlider: function(e) {
cc.YL.effectVolume = e.progress;
this.effect.getChildByName("progress").getComponent(cc.ProgressBar).progress = e.progress;
audio.setEffectVolume(e.progress);
},
onHandleMusicSlider: function(e) {
cc.YL.musicVolume = e.progress;
this.music.getChildByName("progress").getComponent(cc.ProgressBar).progress = e.progress;
audio.setMusicVolume(e.progress);
},
onBtnExitClick: function() {
audio.playEffect("UI_Button");
popup.show({
str: "确定放弃当前进度并退出关卡？",
confirm: function() {
cc.YL.SceneManager.LoadScene("Hall");
},
cancel: 1
});
},
onBtnReplayClick: function() {
audio.playEffect("UI_Button");
var e = function() {
cc.find("Canvas/ClickBlock").active = !0;
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.lastTime = Date.now();
utils.startEnergyRecover(!0);
} else cc.YL.EnergyInfo.curr--;
cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
var e = this.node.getChildByName("box").getChildByName("btnReplay").getChildByName("energy");
e.active = !0;
e.opacity = 0;
e.y = 15;
e.runAction(cc.sequence(cc.spawn(cc.fadeIn(.2), cc.moveBy(.5, 0, 70)), cc.fadeOut(.2), cc.callFunc(function() {
utils.hide(this.node);
cc.YL.SceneManager.LoadScene("Map");
}.bind(this))));
}.bind(this);
popup.show({
str: "确定重新挑战本关？",
confirm: function() {
utils.checkEnergyAndAd(e);
}.bind(this),
cancel: 1
});
},
onBtnCloseClick: function() {
audio.playEffect("UI_Button");
utils.hide(this.node);
var e = {
mute: cc.YL.muteMode,
effect: cc.YL.effectVolume,
music: cc.YL.musicVolume
};
cc.YL.isClickPause = !1;
cc.sys.localStorage.setItem("gameVolume", JSON.stringify(e));
cc.find("Canvas/MapRoot") && cc.find("Canvas/MapRoot").getComponent("Map").ResumeAllMap();
}
});
cc._RF.pop();
}, {} ],
SkillTimer: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "6e9d1NWlQFAiIMwsYBuIKr5", "SkillTimer");
cc.Class({
extends: cc.Component,
properties: {
CDTime: 3
},
start: function() {},
startTimer: function() {
this.time = this.CDTime / 1e3;
this.time = this.time.toFixed(1);
this.schedule(this._timer, .1);
},
_timer: function() {
if (1 != cc.YL.isPause) {
this.time -= .1;
this.time = this.time.toFixed(1);
}
if (this.time <= 0) {
if ("0" == this.node.getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string) {
this.node.getChildByName("Balck").getChildByName("Time").active = !1;
this.node.getChildByName("Balck").active = !0;
} else this.node.getChildByName("Balck").active = !1;
this.unschedule(this._timer);
switch (this.node.name) {
case "Ice":
cc.YL.isSkillingIce = !1;
break;

case "Heart":
cc.YL.isSkillingHerat = !1;
break;

case "Water":
cc.YL.isSkillingWater = !1;
break;

case "Fire":
cc.YL.isSkillingFire = !1;
break;

default:
cc.YL.isSkillingIce = !1;
cc.YL.isSkillingHerat = !1;
cc.YL.isSkillingWater = !1;
cc.YL.isSkillingFire = !1;
}
} else this.node.getChildByName("Balck").getChildByName("Time").getComponent(cc.Label).string = this.time;
}
});
cc._RF.pop();
}, {} ],
Slime: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "bfba9BRyU5PU68ytArLi0Bq", "Slime");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.colliderPlayerNode = this.mapComp.playerNode;
},
start: function() {
this.node.zIndex = 101;
},
showSlimeNode: function() {
this.isSlime = !1;
this.node.getComponent(sp.Skeleton).animation = "Chuxian";
this.node.getComponent(sp.Skeleton).loop = !1;
this.node.getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.getComponent(sp.Skeleton).animation = "Chixu";
this.node.getComponent(sp.Skeleton).loop = !0;
}.bind(this));
},
showSlimeEffect: function() {
this.mapComp.stageGoal.venom++;
this.mapComp.checkStageGoal();
this.isSlime = !0;
this.colliderPlayerNode.getComponent("Player").underSlime();
},
update: function(e) {}
});
cc._RF.pop();
}, {} ],
TreasureBox: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "73a5buPyadMTJHvGdFskU7i", "TreasureBox");
e("./funCsv");
var o = e("./GameRes");
cc.Class({
extends: cc.Component,
onEnable: function() {
this.initTreasureBox();
},
initTreasureBox: function() {
var e = this.node.getChildByName("box"), t = e.getChildByName("goals"), i = t.getChildByName("star"), o = t.getChildByName("stage");
i.getChildByName("prog").getChildByName("curr").getComponent(cc.Label).string = cc.YL.PlayerInfo.stars;
o.getChildByName("prog").getChildByName("curr").getComponent(cc.Label).string = cc.YL.ClearStage;
e.getChildByName("btnOpen").getComponent(cc.Button).interactable = !1;
e.getChildByName("boxSp").getComponent(sp.Skeleton).animation = "Kaiqian";
var n = cc.YL.TreasureCfg[cc.YL.TreasureIdx + 1];
if (n) {
i.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/" + n.INT_NeedStar;
o.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/" + n.INT_NeedStage;
cc.YL.PlayerInfo.stars >= parseInt(n.INT_NeedStar) ? i.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0) : i.getChildByName("prog").getChildByName("curr").color = cc.color(255, 0, 0);
cc.YL.ClearStage >= parseInt(n.INT_NeedStage) ? o.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0) : o.getChildByName("prog").getChildByName("curr").color = cc.color(255, 0, 0);
if (cc.YL.PlayerInfo.stars >= parseInt(n.INT_NeedStar) && cc.YL.ClearStage >= parseInt(n.INT_NeedStage)) {
this.treasureInfo = n;
e.getChildByName("btnOpen").getComponent(cc.Button).interactable = !0;
}
} else {
i.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0);
o.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0);
i.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/-";
o.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/-";
}
},
onBtnOpenClick: function() {
audio.playEffect("UI_Button");
for (var e = this.node.getChildByName("box"), t = this.node.getChildByName("receive"), i = 0, n = 1; n < 4; ++n) t.getChildByName("award").getChildByName("award" + n).active = !1;
for (var a = 1; a < 4; ++a) {
var s = "INT_Type_" + a;
if (parseInt(this.treasureInfo[s]) > 0) {
var c = "award" + ++i, r = t.getChildByName("award").getChildByName(c);
r.getChildByName("coin").active = 1 == parseInt(this.treasureInfo[s]);
r.getChildByName("skill").active = 2 == parseInt(this.treasureInfo[s]);
if (1 == parseInt(this.treasureInfo[s])) cc.YL.PlayerInfo.coin += parseInt(this.treasureInfo["INT_Count_" + a]); else if (2 == parseInt(this.treasureInfo[s])) {
cc.YL.SkillInfo[this.treasureInfo["STR_CodeInfo_" + a]] += parseInt(this.treasureInfo["INT_Count_" + a]);
var l = "Skill_" + this.treasureInfo["INT_PriceID_" + a];
r.getChildByName("skill").getComponent(cc.Sprite).spriteFrame = o.spriteFrame[l.toUpperCase()];
}
r.getChildByName("count").getComponent(cc.Label).string = "x" + this.treasureInfo["INT_Count_" + a];
}
}
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
cc.YL.TreasureIdx++;
cc.sys.localStorage.setItem("treasureIdx", JSON.stringify(cc.YL.TreasureIdx));
e.getChildByName("boxSp").getComponent(sp.Skeleton).setCompleteListener(function() {
e.getChildByName("boxSp").getComponent(sp.Skeleton).animation = "Kaihou";
t.active = !0;
cc.find("Canvas").getComponent("Hall").coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
for (var o = 1; o <= i; ++o) {
var n = "award" + o, a = t.getChildByName("award").getChildByName(n);
a.active = !0;
a.setScale(.1);
var s = i / 2;
a.x = 150 * (o - .5 - s);
a.runAction(cc.scaleTo(.2, 1).easing(cc.easeBackOut()));
}
});
e.getChildByName("boxSp").getComponent(sp.Skeleton).setAnimation(0, "Kaizhong", !1);
},
onBtnCloseClick: function() {
audio.playEffect("UI_Button");
utils.hide(this.node);
},
onReceiveCoverClick: function() {
this.node.getChildByName("box");
this.node.getChildByName("receive").active = !1;
this.initTreasureBox();
var e = cc.YL.TreasureCfg[cc.YL.TreasureIdx + 1];
e ? (cc.YL.PlayerInfo.stars < parseInt(e.INT_NeedStar) || cc.YL.ClearStage < parseInt(e.INT_NeedStage)) && cc.find("Canvas/Box/sp").getComponent(sp.Skeleton).setAnimation(0, "Meijiang", !1) : cc.find("Canvas/Box/sp").getComponent(sp.Skeleton).setAnimation(0, "Meijiang", !1);
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes",
"./funCsv": "funCsv"
} ],
Trigger: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "8db96oAI/JJ/4caGzNPt0kZ", "Trigger");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
this.playerNode = this.mapComp.playerNode;
},
initTrigger: function(e) {
this.triggerInfo = e;
this.mapNode.getContentSize(), this.tiledMap.getTileSize();
var t = this.node.getChildByName(e.Resource);
t && (t.active = !0);
this.triggerNode = t || this.node.getChildByName("Trigger_Burrow");
2 == this.triggerInfo.Type && this.idx == cc.YL.currStove && this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off2", !0);
this.node.setPosition(e.x, e.y - 64);
},
showTriggerProg: function(e) {
this.timeId = setTimeout(function() {
if (cc.YL.isOver) {
this.progress.getComponent(cc.ProgressBar).progress = 0;
this.progress.removeFromParent();
this.progress.destroy();
this.progress = null;
} else {
this.progress.getComponent(cc.ProgressBar).progress += .008;
if (this.progress.getComponent(cc.ProgressBar).progress >= 1) {
this.progress.getComponent(cc.ProgressBar).progress = 0;
this.progress.removeFromParent();
this.progress.destroy();
this.progress = null;
if (e) {
audio.playEffect("Trgger_Off");
console.log("怪物关闭机关");
this.monsterTriggerOff();
} else {
audio.playEffect("Trigger_On");
console.log("玩家开启机关type", this.triggerInfo.Type);
this.playerTrigger();
}
} else this.showTriggerProg(e);
}
}.bind(this), 16);
},
monsterTriggerOff: function() {
this.mapComp.stageGoal.type1--;
this.mapComp.checkStageGoal();
this.monsterNode.getComponent("Monster").trigger = !1;
this.monsterNode.getComponent("Monster").monsterAutoMove();
this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "On_to_Off", !1);
setTimeout(function() {
this.triggerStatus = 0;
this.triggering = !1;
this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off", !0);
}.bind(this), 800);
},
playerTrigger: function() {
if (1 == this.triggerInfo.Type) this.mapComp.stageGoal.type1++; else if (2 == this.triggerInfo.Type) {
this.mapComp.stageGoal.type2++;
this.getNextStove();
}
this.mapComp.checkStageGoal();
this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off_to_On", !1);
this.triggerNode.getComponent(sp.Skeleton).setCompleteListener(function() {
this.triggerStatus = 1;
this.triggering = !1;
this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "On", !0);
this.triggerNode.getComponent(sp.Skeleton).setCompleteListener(function() {});
}.bind(this));
},
getNextStove: function() {
var e = [];
this.mapComp.stoveArr.forEach(function(t) {
var i = t.getComponent("Trigger");
i.idx == cc.YL.currStove || i.triggerStatus || e.push(t);
});
if (e.length > 0) {
var t = e[Math.floor(Math.random() * e.length)];
cc.YL.currStove = t.getComponent("Trigger").idx;
t.getComponent("Trigger").triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off2", !0);
}
},
getMonsterTrigger: function() {
for (var e = this.node.getPosition(), t = this.mapComp.monsterArr, i = 0; i < t.length; ++i) if (Math.abs(e.x - t[i].x) < 10 && Math.abs(e.y - t[i].y) < 10) return t[i];
return null;
},
monsterTriggerOn: function() {
if (!this.triggering && this.triggerStatus && 1 == this.triggerInfo.Type) {
this.triggering = !0;
this.monsterNode.stopAllActions();
this.monsterNode.getComponent("Monster").trigger = !0;
this.monsterNode.getComponent("Monster").stopSelf();
if (!this.progress) {
var e = cc.instantiate(this.mapComp.triggerProgPre);
this.mapNode.addChild(e);
e.zIndex = 901;
e.setPosition(this.node.x + 35, this.node.y + 170);
this.progress = e;
}
this.showTriggerProg(!0);
}
},
playerTriggerOn: function() {
if (!this.triggering && !this.triggerStatus) {
if (2 == this.triggerInfo.Type && this.idx != cc.YL.currStove) return;
this.triggering = !0;
if (!this.progress) {
var e = cc.instantiate(this.mapComp.triggerProgPre);
this.mapNode.addChild(e);
e.zIndex = 901;
e.setPosition(this.node.x + 35, this.node.y + 170);
this.progress = e;
}
this.showTriggerProg();
}
},
removeProgress: function() {
this.triggering = !1;
this.timeId && clearTimeout(this.timeId);
if (this.progress) {
this.progress.getComponent(cc.ProgressBar).progress = 0;
this.progress.removeFromParent();
this.progress.destroy();
this.progress = null;
}
},
update: function(e) {
if (!cc.YL.isOver) {
var t = this.node.getPosition(), i = this.playerNode.getPosition();
if (this.triggerStatus) {
var o = this.getMonsterTrigger();
if (o) {
this.monsterNode = o;
this.monsterTriggerOn();
} else this.removeProgress();
} else {
var n = cc.YL.PlayerRole ? cc.YL.PlayerRole : 1, a = this.playerNode.getChildByName(n.toString());
Math.abs(t.x - i.x) < 15 && Math.abs(t.y - i.y) < 15 && ("Stand" == a.getChildByName("left").getComponent(sp.Skeleton).animation || "Stand" == a.getChildByName("right").getComponent(sp.Skeleton).animation) ? this.playerTriggerOn() : this.removeProgress();
}
}
}
});
cc._RF.pop();
}, {} ],
Utils: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2eb8bUZWLNNLJ062QhX4OUU", "Utils");
var o = {
init: function() {
this.rootNode = cc.find("Canvas");
},
show: function(e, t) {
if (this.rootNode) {
var i = e.getChildByName("box");
if (i) {
e.opacity = 255;
e.scale = 1;
var o = this.rootNode.getContentSize();
"Dialogue" == e.name && o.width < 960 && (e.scale = .78125);
i.opacity = 0;
i.scale = .1;
this.rootNode.getChildByName(e.name) || (void 0 != t && null != t ? this.rootNode.addChild(e, t) : this.rootNode.addChild(e));
e.active = !0;
i.runAction(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.2, 1).easing(cc.easeBackOut())));
} else console.log("节点%s不适用utils.show", e.name);
} else console.error("未找到根节点Canvas!!");
},
hide: function(e) {
e.runAction(cc.sequence(cc.spawn(cc.fadeOut(.2), cc.scaleTo(.2, .1).easing(cc.easeBackIn())), cc.callFunc(function() {
e.removeFromParent();
e.destroy();
})));
},
drop: function(e) {
e.getChildByName("box").getChildByName("btnClose").on("click", function() {
this.litre(e);
}.bind(this));
this.rootNode.addChild(e);
e.getChildByName("box").setPosition(0, 720);
e.getChildByName("box").runAction(cc.moveTo(.3, cc.p(0, 0)).easing(cc.easeBackOut()));
},
litre: function(e) {
e.getChildByName("box").runAction(cc.sequence(cc.moveTo(.3, cc.p(0, 720)).easing(cc.easeBackIn()), cc.callFunc(function() {
e.active = !1;
})));
},
open: function(e, t) {
if (this.rootNode) {
var i = e.getChildByName("box");
if (i) {
e.opacity = 255;
e.scale = 1;
var o = this.rootNode.getContentSize();
"Dialogue" == e.name && o.width < 960 && (e.scale = .78125);
i.opacity = 0;
i.scaleY = .1;
this.rootNode.getChildByName(e.name) || (void 0 != t && null != t ? this.rootNode.addChild(e, t) : this.rootNode.addChild(e));
e.active = !0;
i.runAction(cc.spawn(cc.fadeIn(.4), cc.scaleTo(.4, 1).easing(cc.easeBackOut())));
} else console.log("节点%s不适用utils.open", e.name);
} else console.error("未找到根节点Canvas!!");
},
shake: function(e, t, i, o, n) {
o = parseFloat(o) || .1;
n = parseFloat(n) || .3;
i = parseInt(i) || 5;
var a = cc.sequence(cc.rotateTo(o, i), cc.rotateTo(o, 0), cc.rotateTo(o, -i), cc.rotateTo(o, 0), cc.delayTime(n));
t ? e.runAction(a.repeatForever()) : e.runAction(a);
},
getCvsLength: function(e) {
var t = 0;
for (var i in e) e.hasOwnProperty(i) && t++;
return t;
},
transTimeFormat: function(e, t) {
e = parseInt(e);
var i = t ? "" : "0:", o = Math.floor(e / 60);
i += (o < 10 ? "0" + o : o) + ":";
var n = e % 60;
return i += n < 10 ? "0" + n : n;
},
startEnergyRecover: function(e) {
e && (cc.YL.RecoverTime = cc.YL.EnergyInterval);
var t = cc.find("Canvas/Energy");
if (t) {
t.getChildByName("time").active = !0;
t.getChildByName("time").getComponent(cc.Label).string = this.transTimeFormat(cc.YL.RecoverTime, !0);
}
if (this.intervalId) {
clearInterval(this.intervalId);
this.intervalId = null;
}
this.intervalId = setInterval(function() {
(t = cc.find("Canvas/Energy")) && (t.getChildByName("time").getComponent(cc.Label).string = this.transTimeFormat(cc.YL.RecoverTime--, !0));
if (cc.YL.RecoverTime < 0) {
cc.YL.EnergyInfo.curr++;
cc.YL.EnergyInfo.lastTime = Date.now();
cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
t && (t.getChildByName("time").active = !1);
this.intervalId && clearInterval(this.intervalId);
} else cc.YL.RecoverTime = cc.YL.EnergyInterval;
t && (t.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy);
}
}.bind(this), 1e3);
},
stopEnergyRecover: function() {
this.intervalId && clearInterval(this.intervalId);
cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy && (cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy);
var e = cc.find("Canvas/Energy");
if (e) {
e.getChildByName("time").active = !1;
e.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
}
},
checkEnergyAndAd: function(e) {
cc.YL.EnergyInfo.curr <= 0 ? (cc.YL.AdCount, cc.YL.MaxAdCount, popup.show({
str: "体力不足，无法闯关！"
})) : e && "function" == typeof e && e();
}
};
window.utils = o;
cc._RF.pop();
}, {} ],
funCsv: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "62ab0rgmzxCdK+B9tMLT8Vc", "funCsv");
var o = e("papaparse.min"), n = {
turnCsvToJson: function(e, t) {
cc.loader.loadRes(e, function(e, i) {
if (e) cc.error(e.message || e); else o.parse(i.text, {
complete: function(e) {
t(function(e) {
for (var t = {}, i = 1; i < e.length; ++i) for (var o = {}, n = 0; n < e[0].length; ++n) {
o[e[0][n].trim()] = e[i][n];
t[i] = o;
}
return t;
}(e.data));
}
});
});
},
getJsonLength: function(e) {
var t = 0;
for (var i in e) e.hasOwnProperty(i) && t++;
return t;
}
};
t.exports = n;
cc._RF.pop();
}, {
"papaparse.min": "papaparse.min"
} ],
"papaparse.min": [ function(e, t, i) {
"use strict";
cc._RF.push(t, "d0ba6a+8mxOvJJbde8xYDZR", "papaparse.min");
var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
};
!function(e) {
function i(t) {
this._handle = null, this._paused = !1, this._finished = !1, this._input = null, 
this._baseIndex = 0, this._partialLine = "", this._rowCount = 0, this._start = 0, 
this._nextChunk = null, this.isFirstChunk = !0, this._completeResults = {
data: [],
errors: [],
meta: {}
}, function(e) {
var t = m(e);
t.chunkSize = parseInt(t.chunkSize), e.step || e.chunk || (t.chunkSize = null), 
this._handle = new c(t), this._handle.streamer = this, this._config = t;
}.call(this, t), this.parseChunk = function(t) {
if (this.isFirstChunk && p(this._config.beforeFirstChunk)) {
var i = this._config.beforeFirstChunk(t);
void 0 !== i && (t = i);
}
this.isFirstChunk = !1;
var o = this._partialLine + t;
this._partialLine = "";
var n = this._handle.parse(o, this._baseIndex, !this._finished);
if (!this._handle.paused() && !this._handle.aborted()) {
var a = n.meta.cursor;
this._finished || (this._partialLine = o.substring(a - this._baseIndex), this._baseIndex = a), 
n && n.data && (this._rowCount += n.data.length);
var s = this._finished || this._config.preview && this._rowCount >= this._config.preview;
if (C) e.postMessage({
results: n,
workerId: S.WORKER_ID,
finished: s
}); else if (p(this._config.chunk)) {
if (this._config.chunk(n, this._handle), this._paused) return;
n = void 0, this._completeResults = void 0;
}
return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n.data), 
this._completeResults.errors = this._completeResults.errors.concat(n.errors), this._completeResults.meta = n.meta), 
!s || !p(this._config.complete) || n && n.meta.aborted || this._config.complete(this._completeResults), 
s || n && n.meta.paused || this._nextChunk(), n;
}
}, this._sendError = function(t) {
p(this._config.error) ? this._config.error(t) : C && this._config.error && e.postMessage({
workerId: S.WORKER_ID,
error: t,
finished: !1
});
};
}
function n(e) {
(e = e || {}).chunkSize || (e.chunkSize = S.RemoteChunkSize), i.call(this, e);
var t;
this._nextChunk = f ? function() {
this._readChunk(), this._chunkLoaded();
} : function() {
this._readChunk();
}, this.stream = function(e) {
this._input = e, this._nextChunk();
}, this._readChunk = function() {
if (this._finished) this._chunkLoaded(); else {
if (t = new XMLHttpRequest(), f || (t.onload = g(this._chunkLoaded, this), t.onerror = g(this._chunkError, this)), 
t.open("GET", this._input, !f), this._config.chunkSize) {
var e = this._start + this._config.chunkSize - 1;
t.setRequestHeader("Range", "bytes=" + this._start + "-" + e), t.setRequestHeader("If-None-Match", "webkit-no-cache");
}
try {
t.send();
} catch (e) {
this._chunkError(e.message);
}
f && 0 == t.status ? this._chunkError() : this._start += this._config.chunkSize;
}
}, this._chunkLoaded = function() {
if (4 == t.readyState) {
if (t.status < 200 || t.status >= 400) return void this._chunkError();
this._finished = !this._config.chunkSize || this._start > function(e) {
var t = e.getResponseHeader("Content-Range");
return parseInt(t.substr(t.lastIndexOf("/") + 1));
}(t), this.parseChunk(t.responseText);
}
}, this._chunkError = function(e) {
var i = t.statusText || e;
this._sendError(i);
};
}
function a(e) {
(e = e || {}).chunkSize || (e.chunkSize = S.LocalChunkSize), i.call(this, e);
var t, o, n = "undefined" != typeof FileReader;
this.stream = function(e) {
this._input = e, o = e.slice || e.webkitSlice || e.mozSlice, n ? ((t = new FileReader()).onload = g(this._chunkLoaded, this), 
t.onerror = g(this._chunkError, this)) : t = new FileReaderSync(), this._nextChunk();
}, this._nextChunk = function() {
this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
}, this._readChunk = function() {
var e = this._input;
if (this._config.chunkSize) {
var i = Math.min(this._start + this._config.chunkSize, this._input.size);
e = o.call(e, this._start, i);
}
var a = t.readAsText(e, this._config.encoding);
n || this._chunkLoaded({
target: {
result: a
}
});
}, this._chunkLoaded = function(e) {
this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, 
this.parseChunk(e.target.result);
}, this._chunkError = function() {
this._sendError(t.error);
};
}
function s(e) {
e = e || {}, i.call(this, e);
var t;
this.stream = function(e) {
return e, t = e, this._nextChunk();
}, this._nextChunk = function() {
if (!this._finished) {
var e = this._config.chunkSize, i = e ? t.substr(0, e) : t;
return t = e ? t.substr(e) : "", this._finished = !t, this.parseChunk(i);
}
};
}
function c(e) {
function t() {
if (C && c && (n("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + S.DefaultDelimiter + "'"), 
c = !1), e.skipEmptyLines) for (var t = 0; t < C.data.length; t++) 1 == C.data[t].length && "" == C.data[t][0] && C.data.splice(t--, 1);
return i() && function() {
if (C) {
for (var e = 0; i() && e < C.data.length; e++) for (var t = 0; t < C.data[e].length; t++) f.push(C.data[e][t]);
C.data.splice(0, 1);
}
}(), function() {
if (!C || !e.header && !e.dynamicTyping) return C;
for (var t = 0; t < C.data.length; t++) {
for (var i = {}, a = 0; a < C.data[t].length; a++) {
if (e.dynamicTyping) {
var s = C.data[t][a];
C.data[t][a] = "true" == s || "TRUE" == s || "false" != s && "FALSE" != s && o(s);
}
e.header && (a >= f.length ? (i.__parsed_extra || (i.__parsed_extra = []), i.__parsed_extra.push(C.data[t][a])) : i[f[a]] = C.data[t][a]);
}
e.header && (C.data[t] = i, a > f.length ? n("FieldMismatch", "TooManyFields", "Too many fields: expected " + f.length + " fields but parsed " + a, t) : a < f.length && n("FieldMismatch", "TooFewFields", "Too few fields: expected " + f.length + " fields but parsed " + a, t));
}
return e.header && C.meta && (C.meta.fields = f), C;
}();
}
function i() {
return e.header && 0 == f.length;
}
function o(e) {
return l.test(e) ? parseFloat(e) : e;
}
function n(e, t, i, o) {
C.errors.push({
type: e,
code: t,
message: i,
row: o
});
}
var a, s, c, l = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i, h = this, d = 0, g = !1, u = !1, f = [], C = {
data: [],
errors: [],
meta: {}
};
if (p(e.step)) {
var y = e.step;
e.step = function(o) {
if (C = o, i()) t(); else {
if (t(), 0 == C.data.length) return;
d += o.data.length, e.preview && d > e.preview ? s.abort() : y(C, h);
}
};
}
this.parse = function(i, o, n) {
if (e.newline || (e.newline = function(e) {
var t = (e = e.substr(0, 1048576)).split("\r");
if (1 == t.length) return "\n";
for (var i = 0, o = 0; o < t.length; o++) "\n" == t[o][0] && i++;
return i >= t.length / 2 ? "\r\n" : "\r";
}(i)), c = !1, !e.delimiter) {
var l = function(t) {
for (var i, o, n, a = [ ",", "\t", "|", ";", S.RECORD_SEP, S.UNIT_SEP ], s = 0; s < a.length; s++) {
var c = a[s], l = 0, h = 0;
n = void 0;
for (var d = new r({
delimiter: c,
preview: 10
}).parse(t), m = 0; m < d.data.length; m++) {
var g = d.data[m].length;
h += g, "undefined" != typeof n ? g > 1 && (l += Math.abs(g - n), n = g) : n = g;
}
d.data.length > 0 && (h /= d.data.length), ("undefined" == typeof o || o > l) && h > 1.99 && (o = l, 
i = c);
}
return e.delimiter = i, {
successful: !!i,
bestDelimiter: i
};
}(i);
l.successful ? e.delimiter = l.bestDelimiter : (c = !0, e.delimiter = S.DefaultDelimiter), 
C.meta.delimiter = e.delimiter;
}
var h = m(e);
return e.preview && e.header && h.preview++, a = i, s = new r(h), C = s.parse(a, o, n), 
t(), g ? {
meta: {
paused: !0
}
} : C || {
meta: {
paused: !1
}
};
}, this.paused = function() {
return g;
}, this.pause = function() {
g = !0, s.abort(), a = a.substr(s.getCharIndex());
}, this.resume = function() {
g = !1, h.streamer.parseChunk(a);
}, this.aborted = function() {
return u;
}, this.abort = function() {
u = !0, s.abort(), C.meta.aborted = !0, p(e.complete) && e.complete(C), a = "";
};
}
function r(e) {
var t = (e = e || {}).delimiter, i = e.newline, o = e.comments, n = e.step, a = e.preview, s = e.fastMode;
if (("string" != typeof t || S.BAD_DELIMITERS.indexOf(t) > -1) && (t = ","), o === t) throw "Comment character same as delimiter";
!0 === o ? o = "#" : ("string" != typeof o || S.BAD_DELIMITERS.indexOf(o) > -1) && (o = !1), 
"\n" != i && "\r" != i && "\r\n" != i && (i = "\n");
var c = 0, r = !1;
this.parse = function(e, l, h) {
function d(e) {
S.push(e), _ = c;
}
function m(t) {
return h ? p() : ("undefined" == typeof t && (t = e.substr(c)), I.push(t), c = f, 
d(I), v && u(), p());
}
function g(t) {
c = t, d(I), I = [], Y = e.indexOf(i, c);
}
function p(e) {
return {
data: S,
errors: B,
meta: {
delimiter: t,
linebreak: i,
aborted: r,
truncated: !!e,
cursor: _ + (l || 0)
}
};
}
function u() {
n(p()), S = [], B = [];
}
if ("string" != typeof e) throw "Input must be a string";
var f = e.length, C = t.length, y = i.length, N = o.length, v = "function" == typeof n;
c = 0;
var S = [], B = [], I = [], _ = 0;
if (!e) return p();
if (s || !1 !== s && -1 === e.indexOf('"')) {
for (var L = e.split(i), k = 0; k < L.length; k++) {
I = L[k];
if (c += I.length, k !== L.length - 1) c += i.length; else if (h) return p();
if (!o || I.substr(0, N) != o) {
if (v) {
if (S = [], d(I.split(t)), u(), r) return p();
} else d(I.split(t));
if (a && k >= a) return S = S.slice(0, a), p(!0);
}
}
return p();
}
for (var T = e.indexOf(t, c), Y = e.indexOf(i, c); ;) if ('"' != e[c]) if (o && 0 === I.length && e.substr(c, N) === o) {
if (-1 == Y) return p();
c = Y + y, Y = e.indexOf(i, c), T = e.indexOf(t, c);
} else if (-1 !== T && (Y > T || -1 === Y)) I.push(e.substring(c, T)), c = T + C, 
T = e.indexOf(t, c); else {
if (-1 === Y) break;
if (I.push(e.substring(c, Y)), g(Y + y), v && (u(), r)) return p();
if (a && S.length >= a) return p(!0);
} else {
var b = c;
for (c++; ;) {
if (-1 === (b = e.indexOf('"', b + 1))) return h || B.push({
type: "Quotes",
code: "MissingQuotes",
message: "Quoted field unterminated",
row: S.length,
index: c
}), m();
if (b === f - 1) {
return m(e.substring(c, b).replace(/""/g, '"'));
}
if ('"' != e[b + 1]) {
if (e[b + 1] == t) {
I.push(e.substring(c, b).replace(/""/g, '"')), c = b + 1 + C, T = e.indexOf(t, c), 
Y = e.indexOf(i, c);
break;
}
if (e.substr(b + 1, y) === i) {
if (I.push(e.substring(c, b).replace(/""/g, '"')), g(b + 1 + y), T = e.indexOf(t, c), 
v && (u(), r)) return p();
if (a && S.length >= a) return p(!0);
break;
}
} else b++;
}
}
return m();
}, this.abort = function() {
r = !0;
}, this.getCharIndex = function() {
return c;
};
}
function l(e) {
var t = e.data, i = N[t.workerId], o = !1;
if (t.error) i.userError(t.error, t.file); else if (t.results && t.results.data) {
var n = {
abort: function() {
o = !0, h(t.workerId, {
data: [],
errors: [],
meta: {
aborted: !0
}
});
},
pause: d,
resume: d
};
if (p(i.userStep)) {
for (var a = 0; a < t.results.data.length && (i.userStep({
data: [ t.results.data[a] ],
errors: t.results.errors,
meta: t.results.meta
}, n), !o); a++) ;
delete t.results;
} else p(i.userChunk) && (i.userChunk(t.results, n, t.file), delete t.results);
}
t.finished && !o && h(t.workerId, t.results);
}
function h(e, t) {
var i = N[e];
p(i.userComplete) && i.userComplete(t), i.terminate(), delete N[e];
}
function d() {
throw "Not implemented.";
}
function m(e) {
if ("object" != ("undefined" == typeof e ? "undefined" : o(e))) return e;
var t = e instanceof Array ? [] : {};
for (var i in e) t[i] = m(e[i]);
return t;
}
function g(e, t) {
return function() {
e.apply(t, arguments);
};
}
function p(e) {
return "function" == typeof e;
}
var u, f = !e.document && !!e.postMessage, C = f && /(\?|&)papaworker(=|&|$)/.test(e.location.search), y = !1, N = {}, v = 0, S = {};
if (S.parse = function(t, i) {
if ((i = i || {}).worker && S.WORKERS_SUPPORTED) {
var o = function() {
if (!S.WORKERS_SUPPORTED) return !1;
if (!y && null === S.SCRIPT_PATH) throw new Error("Script path cannot be determined automatically when Papa Parse is loaded asynchronously. You need to set Papa.SCRIPT_PATH manually.");
var t = S.SCRIPT_PATH || u;
t += (-1 !== t.indexOf("?") ? "&" : "?") + "papaworker";
var i = new e.Worker(t);
return i.onmessage = l, i.id = v++, N[i.id] = i, i;
}();
return o.userStep = i.step, o.userChunk = i.chunk, o.userComplete = i.complete, 
o.userError = i.error, i.step = p(i.step), i.chunk = p(i.chunk), i.complete = p(i.complete), 
i.error = p(i.error), delete i.worker, void o.postMessage({
input: t,
config: i,
workerId: o.id
});
}
var c = null;
return "string" == typeof t ? c = i.download ? new n(i) : new s(i) : (e.File && t instanceof File || t instanceof Object) && (c = new a(i)), 
c.stream(t);
}, S.unparse = function(e, t) {
function i(e) {
if ("object" != ("undefined" == typeof e ? "undefined" : o(e))) return [];
var t = [];
for (var i in e) t.push(i);
return t;
}
function n(e, t) {
var i = "";
"string" == typeof e && (e = JSON.parse(e)), "string" == typeof t && (t = JSON.parse(t));
var o = e instanceof Array && e.length > 0, n = !(t[0] instanceof Array);
if (o) {
for (var s = 0; s < e.length; s++) s > 0 && (i += c), i += a(e[s], s);
t.length > 0 && (i += r);
}
for (var l = 0; l < t.length; l++) {
for (var h = o ? e.length : t[l].length, d = 0; h > d; d++) {
d > 0 && (i += c);
var m = o && n ? e[d] : d;
i += a(t[l][m], d);
}
l < t.length - 1 && (i += r);
}
return i;
}
function a(e, t) {
if ("undefined" == typeof e || null === e) return "";
e = e.toString().replace(/"/g, '""');
return "boolean" == typeof s && s || s instanceof Array && s[t] || function(e, t) {
for (var i = 0; i < t.length; i++) if (e.indexOf(t[i]) > -1) return !0;
return !1;
}(e, S.BAD_DELIMITERS) || e.indexOf(c) > -1 || " " == e.charAt(0) || " " == e.charAt(e.length - 1) ? '"' + e + '"' : e;
}
var s = !1, c = ",", r = "\r\n";
if ("object" == ("undefined" == typeof t ? "undefined" : o(t)) && ("string" == typeof t.delimiter && 1 == t.delimiter.length && -1 == S.BAD_DELIMITERS.indexOf(t.delimiter) && (c = t.delimiter), 
("boolean" == typeof t.quotes || t.quotes instanceof Array) && (s = t.quotes), "string" == typeof t.newline && (r = t.newline)), 
"string" == typeof e && (e = JSON.parse(e)), e instanceof Array) {
if (!e.length || e[0] instanceof Array) return n(null, e);
if ("object" == o(e[0])) return n(i(e[0]), e);
} else if ("object" == ("undefined" == typeof e ? "undefined" : o(e))) return "string" == typeof e.data && (e.data = JSON.parse(e.data)), 
e.data instanceof Array && (e.fields || (e.fields = e.data[0] instanceof Array ? e.fields : i(e.data[0])), 
e.data[0] instanceof Array || "object" == o(e.data[0]) || (e.data = [ e.data ])), 
n(e.fields || [], e.data || []);
throw "exception: Unable to serialize unrecognized input";
}, S.RECORD_SEP = String.fromCharCode(30), S.UNIT_SEP = String.fromCharCode(31), 
S.BYTE_ORDER_MARK = "\ufeff", S.BAD_DELIMITERS = [ "\r", "\n", '"', S.BYTE_ORDER_MARK ], 
S.WORKERS_SUPPORTED = !f && !!e.Worker, S.SCRIPT_PATH = null, S.LocalChunkSize = 10485760, 
S.RemoteChunkSize = 5242880, S.DefaultDelimiter = ",", S.Parser = r, S.ParserHandle = c, 
S.NetworkStreamer = n, S.FileStreamer = a, S.StringStreamer = s, "undefined" != typeof t && t.exports ? t.exports = S : p(e.define) && e.define.amd ? define(function() {
return S;
}) : e.Papa = S, e.jQuery) {
var B = e.jQuery;
B.fn.parse = function(t) {
function i() {
if (0 != s.length) {
var e = s[0];
if (p(t.before)) {
var i = t.before(e.file, e.inputElem);
if ("object" == ("undefined" == typeof i ? "undefined" : o(i))) {
if ("abort" == i.action) return void function(e, i, o, n) {
p(t.error) && t.error({
name: e
}, i, o, n);
}("AbortError", e.file, e.inputElem, i.reason);
if ("skip" == i.action) return void n();
"object" == o(i.config) && (e.instanceConfig = B.extend(e.instanceConfig, i.config));
} else if ("skip" == i) return void n();
}
var a = e.instanceConfig.complete;
e.instanceConfig.complete = function(t) {
p(a) && a(t, e.file, e.inputElem), n();
}, S.parse(e.file, e.instanceConfig);
} else p(t.complete) && t.complete();
}
function n() {
s.splice(0, 1), i();
}
var a = t.config || {}, s = [];
return this.each(function() {
if (!("INPUT" == B(this).prop("tagName").toUpperCase() && "file" == B(this).attr("type").toLowerCase() && e.FileReader) || !this.files || 0 == this.files.length) return !0;
for (var t = 0; t < this.files.length; t++) s.push({
file: this.files[t],
inputElem: this,
instanceConfig: B.extend({}, a)
});
}), i(), this;
};
}
C ? e.onmessage = function(t) {
var i = t.data;
if ("undefined" == typeof S.WORKER_ID && i && (S.WORKER_ID = i.workerId), "string" == typeof i.input) e.postMessage({
workerId: S.WORKER_ID,
results: S.parse(i.input, i.config),
finished: !0
}); else if (e.File && i.input instanceof File || i.input instanceof Object) {
var o = S.parse(i.input, i.config);
o && e.postMessage({
workerId: S.WORKER_ID,
results: o,
finished: !0
});
}
} : S.WORKERS_SUPPORTED && (u = function() {
var e = document.getElementsByTagName("script");
return e.length ? e[e.length - 1].src : "";
}(), document.body ? document.addEventListener("DOMContentLoaded", function() {
y = !0;
}, !0) : y = !0), n.prototype = Object.create(i.prototype), n.prototype.constructor = n, 
a.prototype = Object.create(i.prototype), a.prototype.constructor = a, s.prototype = Object.create(s.prototype), 
s.prototype.constructor = s;
}("undefined" != typeof window ? window : void 0);
cc._RF.pop();
}, {} ]
}, {}, [ "papaparse.min", "Adefind", "Boom", "BoomEffect", "Diamond", "GameRes", "GameTouch", "Guide", "Hall", "Ice", "Login", "Map", "Monster", "MonsterBrith", "Player", "PlayerSkill", "RoleChoice", "SceneManager", "Setting", "SkillTimer", "Slime", "TreasureBox", "Trigger", "AdMgr", "Audio", "Popup", "Utils", "funCsv" ]);