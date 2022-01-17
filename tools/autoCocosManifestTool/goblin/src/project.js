window.__require = function e(t, i, o) {
function n(a, r) {
if (!i[a]) {
if (!t[a]) {
var c = a.split("/");
c = c[c.length - 1];
if (!t[c]) {
var h = "function" == typeof __require && __require;
if (!r && h) return h(c, !0);
if (s) return s(c, !0);
throw new Error("Cannot find module '" + a + "'");
}
}
var l = i[a] = {
exports: {}
};
t[a][0].call(l.exports, function(e) {
return n(t[a][1][e] || e);
}, l, l.exports, e, t, i, o);
}
return i[a].exports;
}
for (var s = "function" == typeof __require && __require, a = 0; a < o.length; a++) n(o[a]);
return n;
}({
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
cc.YL.effectVolume = Number(e.effect ? e.effect : .8);
cc.YL.musicVolume = Number(e.music ? e.music : .8);
cc.YL.effectVolume = cc.YL.effectVolume < 0 ? 0 : cc.YL.effectVolume;
cc.YL.effectVolume = cc.YL.effectVolume > 1 ? 1 : cc.YL.effectVolume;
cc.YL.musicVolume = cc.YL.musicVolume < 0 ? 0 : cc.YL.musicVolume;
cc.YL.musicVolume = cc.YL.musicVolume > 1 ? 1 : cc.YL.musicVolume;
}
},
playMusic: function(e, t, i) {
var o = void 0 === t || t, n = void 0 === i ? this.getMusicVolume() : i;
this.stopMusic();
this._musicId = cc.audioEngine.play(e, o, n);
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
if (e >= 0 && e <= 1) {
this._musicVolume = e;
void 0 !== this._musicId && cc.audioEngine.setVolume(this._musicId, e);
}
},
getMusicVolume: function() {
var e = this._musicVolume;
return void 0 != e && null != e ? e : 0 === e ? e : cc.YL.musicVolume;
},
isMusicPlaying: function() {
return cc.audioEngine.getState(this._musicId) === cc.audioEngine.AudioState.PLAYING;
},
playEffect: function(e) {
var t = void 0;
switch (e) {
case "playerRun":
t = "res/raw-assets/resources/Audio/Effect/Run.mp3";
}
try {
this._soundId = cc.audioEngine.play(t, !1, this.getEffectVolume());
} catch (e) {}
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
e >= 0 && e <= 1 && (this._soundVolume = e);
},
setEffectIsPlay: function(e) {
this._isEffectPlay = e;
},
getEffectVolume: function() {
var e = this._soundVolume;
return void 0 != e && null != e ? e : 0 === e ? e : cc.YL.effectVolume;
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
this._soundVolume = 0;
this._musicVolume = 0;
},
muteOff: function() {
this._soundVolume = cc.YL.effectVolume;
this._musicVolume = cc.YL.musicVolume;
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
cc.log("boomeffect");
this.shaoxue = !0;
this.colliderPlayerNode.getComponent("Player").underAttack();
this.node.getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.parent.removeFromParent();
}.bind(this));
},
update: function(e) {
var t = this.node.parent.getPosition(), i = this.colliderPlayerNode.getPosition();
Math.abs(t.x + this.node.getPosition().x - i.x) < 10 && Math.abs(t.y + this.node.getPosition().y - i.y) < 10 && 0 == this.shaoxue && this.playerEffect();
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
this._showBoom(!1);
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = "Baozha";
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.getChildByName("Animaion").active = !1;
this._showBoom(!0);
this.playerEffect();
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
for (var n = this.mapComp.tiledMap.getMapSize(), s = !1, a = 1; a < 4; a++) {
(l = cc.v2(this._tile.x, this._tile.y)).x = l.x + a;
if (l.x < 0 || l.x >= n.width) s = !0; else if (1 != s) {
if (0 == this.mapComp.block.getTileGIDAt(l) && 0 == s) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? 64 * a + 32 : 64 * a, 1 == e ? 10 : 0);
o.active = !0;
} else s = !0;
}
}
s = !1;
for (var r = 1; r < 4; r++) {
(l = cc.v2(this._tile.x, this._tile.y)).x = l.x - r;
if (l.x < 0 || l.x >= n.width) s = !0; else if (1 != s) {
if (0 == this.mapComp.block.getTileGIDAt(l) && 0 == s) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? -64 * r + 32 : -64 * r, 1 == e ? 10 : 0);
o.active = !0;
} else s = !0;
}
}
s = !1;
for (var c = 1; c < 4; c++) {
(l = cc.v2(this._tile.x, this._tile.y)).y = l.y + c;
if (l.y < 0 || l.y >= n.height) s = !0; else if (1 != s) {
if (0 == this.mapComp.block.getTileGIDAt(l) && 0 == s) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? 32 : 0, 1 == e ? -64 * c + 10 : -64 * c);
o.active = !0;
} else s = !0;
}
}
s = !1;
for (var h = 1; h < 4; h++) {
var l;
(l = cc.v2(this._tile.x, this._tile.y)).y = l.y - h;
if (l.y < 0 || l.y >= n.height) s = !0; else if (1 != s) {
if (0 == this.mapComp.block.getTileGIDAt(l) && 0 == s) {
o = cc.instantiate(t);
this.node.addChild(o);
o.setPosition(1 == e ? 32 : 0, 1 == e ? 64 * h + 10 : 64 * h);
o.active = !0;
} else s = !0;
}
}
},
playerEffect: function() {
var e = this.node.getPosition(), t = this.colliderPlayerNode.getPosition();
if (Math.abs(e.x - t.x) < 10 && Math.abs(e.y - t.y) < 10) {
this.node.removeFromParent();
this.colliderPlayerNode.getComponent("Player").underAttack();
}
},
update: function(e) {
var t = this.node.getPosition(), i = this.colliderPlayerNode.getPosition();
Math.abs(t.x - i.x) < 10 && Math.abs(t.y - i.y) < 10 && 0 == this.isBoom && 0 == this.isEffect && this.showBoomEffect();
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
var s = 0 == i ? (parseInt(t) + 1).toString() : (parseInt(t) + 7).toString();
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = s;
this.node.setPosition(e.x * n.width, o.height - n.height * (e.y + 1));
if (1 == i) setTimeout(function() {
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = (parseInt(t) + 1).toString();
}.bind(this), 500); else {
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = s;
}
}
});
cc._RF.pop();
}, {} ],
GameRes: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "75c19SxeORA763xuFbqFe0e", "GameRes");
var o = {
COMMON: "COMMON"
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
COMMON: [ "Audio/Effect", "Prefab/Utils", "Texture/LoadFile" ]
},
_parseRes: function(e, t, i, o) {
e.forEach(function(e, i) {
if (e instanceof cc.Texture2D) {
var o = "";
if (cc.sys.isNative) o = e.getName(); else {
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
var s = e.name.split("."), a = {};
_.forEach(e._spriteFrames, function(e) {
a[e.name.toUpperCase()] = e;
});
e.resTag = t;
this.atlas[s[0].toUpperCase() + "_ATLAS"] = e;
this.atlas[s[0].toUpperCase()] = a;
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
var o, n, s = e;
o = this.resources[e][this.loadFileIndex];
n = this.resources[e].length;
cc.loader.loadResDir(o, function(a, r) {
console.log("=== loadResAll( '%s' ) finish callback, fileIdx:%s, filelist.count:%s err:%s ", o, this.loadFileIndex, r.length, a);
this.loadFileIndex++;
if (a) console.err("cc.loader.loadResAll('%s') fail error: %s", o, a); else {
this._parseRes(r, s, n, t);
if (this.loadFileIndex < n) this._preloadRes(e, t); else {
this.endTime = new Date();
var c = this.endTime.getTime() - this.startTime.getTime(), h = c % 864e5, l = h % 36e5, d = l % 6e4, m = Math.floor(h / 36e5) + "小时" + Math.floor(l / 6e4) + "分" + Math.round(d / 1e3) + "秒" + d % 1e3 + "毫秒";
console.info(c + ">>>本次资源所有加载完成 资源加载类" + this.type + "  [总共耗时" + m + "] 资源是否加载完成" + (this.loadFileIndex === n));
t && t();
}
i && i(this.loadFileIndex, n);
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
cc.Class({
extends: cc.Component,
properties: {},
start: function() {
this.node.on("touchend", this.onEndTouch.bind(this), this.node);
this.node.on("touchcancel", this.onCancelTouch.bind(this), this.node);
this.node.on("touchmove", this.onMoveTouch.bind(this), this.node);
this.node.on("touchstart", this.onStartTouch.bind(this), this.node);
},
onEndTouch: function(e) {
if (cc.YL.canTouch) {
this.endTouchPos = e.getLocation();
this.calculateDir();
}
},
onCancelTouch: function(e) {},
onMoveTouch: function(e) {},
onStartTouch: function(e) {
cc.YL.canTouch && (this.startTouchPos = e.getStartLocation());
},
calculateDir: function() {
var e = this.startTouchPos.x, t = this.startTouchPos.y, i = this.endTouchPos.x, o = this.endTouchPos.y, n = i - e, s = o - t;
if (0 != n || 0 != s) {
var a = "";
0 == n && (a = s > 0 ? "up" : "down");
0 == s && (a = n > 0 ? "right" : "left");
if (0 != s && 0 != n) {
var r = this.getAngle(i, o, e, t);
(r >= 0 && r < 45 || r >= 315 && r <= 360) && (a = "down");
r >= 45 && r < 135 && (a = "left");
r >= 135 && r < 225 && (a = "up");
r >= 225 && r < 315 && (a = "right");
}
cc.YL.moveDir != a && 0 != cc.YL.IsCanMove && cc.find("Canvas/MapRoot").getComponent("Map").PlayerMove(a);
} else cc.YL.moveDir = null;
},
getAngle: function(e, t, i, o) {
var n = 180 * Math.atan((t - o) / (e - i)) / Math.PI;
e < i && t < o ? n = 90 - n : e < i && t > o ? n = Math.abs(n) + 90 : e > i && t > o ? n = 270 - n : e > i && t < o && (n = 270 + Math.abs(n));
return Math.round(n);
}
});
cc._RF.pop();
}, {} ],
Hall: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "062d4yQrCZDro7Pl/Djv9xd", "Hall");
var o = e("./funCsv"), n = e("./GameRes");
cc.Class({
extends: cc.Component,
properties: {
StagePartPre: cc.Prefab,
StageInfoPre: cc.Prefab,
RoleChoice: cc.Prefab,
SkillInfoPre: cc.Prefab,
SettingPre: cc.Prefab
},
onLoad: function() {
utils.init();
popup.init();
o.turnCsvToJson("Csv/stage", function(e) {
cc.YL.loadMapStage = -1;
cc.YL.StageConfig = e;
this.bindNode();
this.getLocalData();
this.initUI();
this.loadCurRole();
}.bind(this));
},
bindNode: function() {
this.stageView = this.node.getChildByName("stageView");
this.stageContent = this.stageView.getChildByName("content");
this.stars = this.node.getChildByName("Stars");
this.coin = this.node.getChildByName("Coin");
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
this.totalPage = this.getPageCount();
this.stagePage < 1 && (this.stagePage = 1);
this.stagePage > this.totalPage && (this.stagePage = this.totalPage);
console.log("当前关卡页:", this.stagePage);
},
initUI: function() {
this.stars.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.stars;
this.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
this.addStagePart();
},
addStagePart: function() {
for (var e = this, t = function(t) {
var i = "area_bg_" + (t + 1), o = cc.instantiate(e.StagePartPre);
o.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[i.toUpperCase()];
for (var s = o.getChildByName("stage").children, a = function(i) {
if (cc.YL.StageConfig[i + 1 + 10 * t]) {
i + 1 + 10 * t <= cc.YL.ClearStage && (s[i].getChildByName("star").active = !0);
s[i].id = i + 1 + 10 * t;
var o = cc.YL.StageInfo.find(function(e) {
return e.id == i + 1 + 10 * t;
});
if (o && o.star > 0) for (var n = s[i].getChildByName("star").children, a = 0; a < o.star; ++a) n[a].getChildByName("reach").active = !0;
s[i].getChildByName("lab").getComponent(cc.Label).string = i + 1 + 10 * t;
var r = parseInt(cc.YL.StageConfig[i + 1 + 10 * t].INT_X), c = parseInt(cc.YL.StageConfig[i + 1 + 10 * t].INT_Y);
s[i].setPosition(r, c);
s[i].on("click", e.onStageClick, e);
} else s[i].active = !1;
}, r = 0; r < s.length; ++r) a(r);
e.stageContent.addChild(o);
}, i = 0; i < this.totalPage; ++i) t(i);
var o = this.stagePage <= 1 ? 0 : this.stagePage / this.totalPage;
this.stageView.getComponent(cc.ScrollView).scrollToPercentVertical(o, 0);
},
getPageCount: function() {
var e = 0;
for (var t in cc.YL.StageConfig) cc.YL.StageConfig.hasOwnProperty(t) && e++;
return Math.ceil(e / 10);
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
if (cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.star > 0) for (var s = o.children, a = 0; a < cc.YL.CurrStageInfo.star; ++a) s[a].getChildByName("reach").active = !0;
for (var r = i.getChildByName("box").getChildByName("goal").getChildByName("goals").children, c = 0; c < r.length; ++c) {
var h = parseInt(t["INT_Condition_" + (c + 1)]);
if (h) {
r[c].active = !0;
var l = "Stage_Target_" + h;
r[c].getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[l.toUpperCase()];
var d = "x" + t["INT_Count_" + (c + 1)];
1 == h && (d = "全部收集");
r[c].getChildByName("desc").getComponent(cc.Label).string = d;
} else r[c].active = !1;
}
var m = i.getChildByName("box").getChildByName("highScore").getChildByName("score");
cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.highScore > 0 && (m.getComponent(cc.Label).string = cc.YL.CurrStageInfo.highScore);
i.getChildByName("box").getChildByName("btnStart").on("click", function() {
cc.YL.SceneManager.LoadScene("Map");
});
i.getChildByName("box").getChildByName("btnClose").on("click", function() {
utils.hide(i);
});
}
},
loadCurRole: function() {
var e = cc.sys.localStorage.getItem("playerRole");
if (e) cc.YL.PlayerRole = e; else {
cc.YL.PlayerRole = 1;
cc.sys.localStorage.setItem("playerRole", cc.YL.PlayerRole);
}
},
onStageClick: function(e) {
this.stageView.getComponent(cc.ScrollView).stopAutoScroll();
cc.YL.loadMapStage = e.target.id;
e.target.id > cc.YL.ClearStage + 1 ? popup.show({
str: "请先完成当前关卡"
}) : this.showStageInfo(e.target.id);
},
onClickPlayRole: function() {
var e = this.node.getChildByName("RoleChoice") ? this.node.getChildByName("RoleChoice") : cc.instantiate(this.RoleChoice);
utils.show(e);
},
onBtnSkillClick: function() {
var e = this.node.getChildByName("SkillInfo");
e || (e = cc.instantiate(this.SkillInfoPre));
utils.show(e);
o.turnCsvToJson("Csv/skill", function(t) {
var i = e.getChildByName("box").getChildByName("skill"), o = e.getChildByName("box").getChildByName("lock");
i.active = !0;
o.active = !0;
for (var s in t) {
var a = i.getChildByName("skill" + t[s].INT_ID);
if (a) {
var r = "Skill_" + t[s].INT_ID;
a.getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[r.toUpperCase()];
a.getChildByName("name").getComponent(cc.Label).string = t[s].STR_Name;
a.getChildByName("desc").getComponent(cc.Label).string = t[s].STR_Desc;
a.active = parseInt(t[s].INT_LockStage) <= cc.YL.ClearStage;
}
var c = o.getChildByName("lock" + t[s].INT_ID);
if (c) {
c.getChildByName("desc").getComponent(cc.Label).string = "第" + t[s].INT_LockStage + "关解锁";
c.active = parseInt(t[s].INT_LockStage) > cc.YL.ClearStage;
}
}
e.getChildByName("box").getChildByName("btnClose").on("click", this.onSkillCloseClick, this);
}.bind(this));
},
onSkillCloseClick: function() {
var e = this.node.getChildByName("SkillInfo");
e && utils.hide(e);
},
onBtnFileClick: function() {
popup.show({
str: "敬请期待!!"
});
},
onBtnCommunityClick: function() {
popup.show({
str: "敬请期待!!"
});
},
onBtnSetClick: function() {
var e = this.node.getChildByName("Setting");
e || (e = cc.instantiate(this.SettingPre));
e.getChildByName("box").getChildByName("btnReplay").active = !1;
e.getChildByName("box").getChildByName("btnExit").active = !1;
utils.show(e);
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes",
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
start: function() {
this.node.zIndex = 100;
},
showIceNode: function() {
this.isIce = !1;
this.node.getComponent(sp.Skeleton).animation = "Chuxian";
this.node.getComponent(sp.Skeleton).loop = !1;
this.node.getComponent(sp.Skeleton).setCompleteListener(function() {
this.node.getComponent(sp.Skeleton).animation = "Chixu";
this.node.getComponent(sp.Skeleton).loop = !0;
}.bind(this));
},
showIceEffect: function() {
cc.log("冰冻到了玩家");
this.isIce = !0;
cc.YL.PlayerIce = !0;
this.colliderPlayerNode.getComponent("Player").underIce();
cc.YL.IsCanMove = !1;
setTimeout(function() {
cc.log("玩家取消冰冻");
cc.YL.IsCanMove = !0;
this.colliderPlayerNode.getComponent("Player").removeIce();
cc.YL.PlayerIce = !1;
}.bind(this), 1e3);
},
update: function(e) {
var t = this.node.parent.getPosition(), i = this.colliderPlayerNode.getPosition();
Math.abs(t.x - i.x) < 10 && Math.abs(t.y - i.y) < 10 && 0 == this.isIce && this.showIceEffect();
}
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
this.loginBtn.active = !1;
},
start: function() {
this.getLocalPlayerInfo();
this.getGameRes();
this.initGameVolume();
},
bindNode: function() {
this.loginBtn = this.node.getChildByName("loginBtn");
this.progressBar = this.node.getChildByName("progress");
},
getLocalPlayerInfo: function() {
cc.YL.PlayerInfo = {
stars: 0,
coin: 0
};
var e = cc.sys.localStorage.getItem("playerInfo");
if (e) {
var t = JSON.parse(e);
cc.YL.PlayerInfo = t;
}
},
getGameRes: function() {
o.getInstance(o.ResTag.COMMON, function() {
var e = o.endTime - o.startTime;
e < 3e3 ? this.showFakeProgress() : this.gameLoadFinish(e);
}.bind(this), function(e, t) {
o.endTime - o.startTime >= 3e3 && this.updateProgress(e, t);
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
this.gameLoadFinish(3e3);
},
gameLoadFinish: function(e) {
var t = e ? e + 1e3 : 1e3;
setTimeout(function() {
this.progressBar.active = !1;
this._chargeHotUpdate();
}.bind(this), t);
},
updateProgress: function(e, t) {
this.progressBar.getComponent(cc.ProgressBar).progress = e / t;
e / t >= 1 && this.gameLoadFinish();
},
_chargeHotUpdate: function() {
cc.sys.isNative, this.loginBtn.active = !0;
},
onClickLoginBtn: function() {
cc.YL.SceneManager.LoadScene("Hall");
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes"
} ],
Map: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "320339hlK1Lsr3rBNvJBIX/", "Map");
var o = e("./funCsv"), n = e("./GameRes"), s = {
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
this.monsterDelay = 1e3;
this.diamondPosArr = [];
this.mapUrl = "Map/stage_" + cc.YL.loadMapStage;
this._initUI();
this._loadMap();
cc.YL.offsetY = 64;
cc.YL.SpliterList = [];
cc.YL.IsCanMove = !0;
cc.YL.slimeDiamondArr = [];
cc.YL.iceDiamondArr = [];
},
start: function() {},
update: function(e) {},
_initUI: function() {
this.stageTime = cc.YL.CurrStageCfg.INT_Time;
this.scoreNode = this.node.parent.getChildByName("Score");
this.lifeNode = this.node.parent.getChildByName("Life");
this.limitNode = this.node.parent.getChildByName("Time");
this.limitNode.getChildByName("num").getComponent(cc.Label).string = this.transTimeFormat(this.stageTime, !0);
this.miniGoal = this.node.parent.getChildByName("Goal");
this.scoreNode.y = this.lifeNode.y = this.limitNode.y = 1200;
this.miniGoal.x = -830;
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
for (var e = this.miniGoal.children, t = 2; t < e.length; ++t) {
var i = parseInt(cc.YL.CurrStageCfg["INT_Condition_" + (t - 1)]);
if (i) {
e[t].active = !0;
var o = "Stage_Target_" + i;
e[t].getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[o.toUpperCase()];
var s = "0 / " + cc.YL.CurrStageCfg["INT_Count_" + (t - 1)];
1 == i && (s = "全部收集");
e[t].getChildByName("desc").getComponent(cc.Label).string = s;
this.miniGoal.getChildByName("bg").height = 140 + 90 * (t - 2);
} else e[t].active = !1;
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
var t = this.playersInfo.getObjects(), i = t.find(function(e) {
return "move_1" == e.name;
});
this._initPlayerNode(cc.v2(i.x, i.y - cc.YL.offsetY));
this._findDiamondPos();
this._initDiamondAni();
this._initTrigger();
var o = t.find(function(e) {
return "move_3" == e.name;
});
this._gameInit(o);
},
_findDiamondFirstGID: function() {
for (var e = this.tiledMap.getMapSize(), t = e.width, i = e.height, o = 1e3, n = 0; n < t; n++) for (var s = 0; s < i; s++) {
var a = cc.v2(0, 0);
a.x = n;
a.y = s;
var r = this.diamond.getTileGIDAt(a);
0 != r && r <= o && (o = r);
}
return o;
},
_initDiamondAni: function() {
for (var e = 0; e < this.mapNode.children.length; e++) "Diamond" == this.mapNode.children[e].name && this.mapNode.children[e].destroy();
var t = this.tiledMap.getMapSize(), i = t.width, o = t.height;
for (e = 0; e < i; e++) for (var n = 0; n < o; n++) {
var s = cc.v2(0, 0);
s.x = e;
s.y = n;
var a = this.diamond.getTileGIDAt(s);
0 != a && this._showDiamond(s, a - this.diamondFirstGID, !1);
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
var s = cc.v2(0, 0);
s.x = o;
s.y = n;
var a = this.diamond.getTileGIDAt(s);
a - this.diamondFirstGID == 0 && this.diamondPosArr.push({
type: a - this.diamondFirstGID,
pos: s
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
this.mapNode.addChild(i);
i.getComponent("Trigger").initTrigger(e[t]);
this.triggerArr.push(i);
}
},
_gameInit: function(e) {
cc.YL.playerTile = this.getTilePos(cc.v2(e.x, e.y));
var t = cc.v2(e.x, e.y - cc.YL.offsetY), i = cc.YL.CurrStageCfg.STR_Story, o = cc.YL.CurrStageCfg.INT_Guide;
if (i.length > 1) if (1 == cc.YL.CurrStageInfo.story) {
this.playerNode.setPosition(t);
0 == o || 1 == cc.YL.CurrStageInfo.guide ? setTimeout(function() {
this._showStageGoal();
}.bind(this), 500) : setTimeout(function() {
this._showGuide();
}.bind(this), 500);
} else this._showStory(e); else 1 == o ? setTimeout(function() {
this._showGuide();
}.bind(this), 500) : setTimeout(function() {
this._showStageGoal();
}.bind(this), 500);
},
_showStory: function(e) {
var t = cc.v2(e.x, e.y - cc.YL.offsetY);
this.playerNode.runAction(cc.sequence(cc.moveTo(.4, t), cc.delayTime(.5), cc.callFunc(function() {
cc.YL.playerTile = this.getTilePos(cc.v2(e.x, e.y));
var t = "Story/" + cc.YL.CurrStageCfg.STR_Story;
o.turnCsvToJson(t, function(e) {
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
_showDialogue: function(e) {
var t = this.node.parent.getChildByName("Dialogue"), i = o.getJsonLength(this.storyInfo);
if (this.dialogueNum >= i) {
if (!this.closeStory) {
this.closeStory = !0;
setTimeout(function() {
t.active = !1;
this._showGuide();
}.bind(this), 2e3);
}
} else {
var s = t.getChildByName("box"), a = s.getChildByName("left"), r = s.getChildByName("right");
t.getChildByName("tips");
this.storyTimeId = setTimeout(function() {
a.opacity = 0;
r.opacity = 0;
var e = a;
1 == this.storyInfo[this.dialogueNum + 1].INT_Direction && (e = r);
e.stopAllActions();
var t = this.storyInfo[this.dialogueNum + 1].STR_Head;
e.getChildByName("head").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[t.toUpperCase()];
e.getChildByName("dialogue").getComponent(cc.Label).string = this.storyInfo[this.dialogueNum + 1].STR_Desc;
e.runAction(cc.fadeIn(.2));
this.dialogueNum++;
this._showDialogue();
}.bind(this), this.dialogueNum > 0 && !e ? 2e3 : 0);
}
},
_showGuide: function() {
if (1 == cc.YL.CurrStageCfg.INT_Guide) {
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
for (var i = t.getChildByName("box").getChildByName("guideView").getChildByName("view").getChildByName("content"), o = 0; o < 5; ++o) {
var s = "Guide_" + cc.YL.CurrStageCfg.INT_ID + "_" + (o + 1), a = n.spriteFrame[s.toUpperCase()], r = i.getChildByName("page_" + (o + 1));
if (a) {
r.active = !0;
r.getComponent(cc.Sprite).spriteFrame = a;
} else {
r.removeFromParent();
r.destroy();
}
}
utils.show(t);
} else this._showStageGoal();
},
_showStageGoal: function() {
var e = this.node.parent.getChildByName("StageGoal");
e || (e = cc.instantiate(this.StageGoalPre)).on("click", this.onGoalBlankClick, this);
utils.show(e);
e.getChildByName("box").getChildByName("stageNum").getComponent(cc.Label).string = "第" + cc.YL.CurrStageCfg.INT_ID + "关";
var t = e.getChildByName("box").getChildByName("desc"), i = this.transTimeFormat(cc.YL.CurrStageCfg.INT_Time, !0);
t.getComponent(cc.Label).string = "在" + i + "内完成以下目标";
for (var o = e.getChildByName("box").getChildByName("rate").children, s = 0; s < o.length; ++s) {
cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.star > s && (o[s].getChildByName("reach").active = !0);
var a = "INT_Star_" + (s + 1);
o[s].getChildByName("time").getComponent(cc.Label).string = this.transTimeFormat(cc.YL.CurrStageCfg[a], !0);
}
for (var r = e.getChildByName("box").getChildByName("goal").children, c = 0; c < r.length; ++c) {
var h = parseInt(cc.YL.CurrStageCfg["INT_Condition_" + (c + 1)]);
if (h) {
r[c].active = !0;
var l = "Stage_Target_" + h;
r[c].getChildByName("spr").getComponent(cc.Sprite).spriteFrame = n.spriteFrame[l.toUpperCase()];
var d = "x" + cc.YL.CurrStageCfg["INT_Count_" + (c + 1)];
1 == h && (d = "全部收集");
r[c].getChildByName("desc").getComponent(cc.Label).string = d;
} else r[c].active = !1;
}
},
_startCountdown: function() {
this.schedule(this._gameCountdown, 1);
},
_gameCountdown: function() {
if (this.stageTime >= 0) this.limitNode.getChildByName("num").getComponent(cc.Label).string = this.transTimeFormat(this.stageTime--, !0); else {
this.playerNode.getComponent("Player").showStatus("Lose");
this.stageFail(!0);
cc.log("时间结束");
}
},
_stopCountdown: function() {
this.unschedule(this._gameCountdown);
},
_loadMonsterBri: function() {
for (var e = this.monsterInfo.getObjects(), t = 0; t < e.length; t++) {
var i = cc.instantiate(this.monsterBriNode);
this.mapNode.addChild(i);
i.name = "B" + t;
i.getComponent("MonsterBrith").initMonster(e[t]);
}
},
_showComplete: function() {
if (this.playerNode.getComponent("Player").lifeNum <= 0 || this.stageTime < 0) console.log("不满足关卡完成条件：玩家生命过低或时间结束"); else {
if (parseInt(cc.YL.CurrStageCfg.INT_ID) > cc.YL.ClearStage) {
cc.YL.ClearStage = parseInt(cc.YL.CurrStageCfg.INT_ID);
cc.sys.localStorage.setItem("currStage", JSON.stringify(cc.YL.CurrStageCfg.INT_ID));
}
var e = parseInt(cc.YL.CurrStageCfg.INT_Star_1), t = parseInt(cc.YL.CurrStageCfg.INT_Star_2), i = parseInt(cc.YL.CurrStageCfg.INT_Star_3), o = 0;
this.stageTime >= i ? o = 3 : this.stageTime >= t && this.stageTime < i ? o = 2 : this.stageTime >= e && (o = 1);
o > cc.YL.CurrStageInfo.star && (cc.YL.CurrStageInfo.star = o);
this.stageTime > cc.YL.CurrStageInfo.time && (cc.YL.CurrStageInfo.time = this.stageTime);
var n = this.node.parent.getChildByName("StageComplete");
n || (n = cc.instantiate(this.StageCompletePre));
utils.show(n);
for (var s = n.getChildByName("box"), a = s.getChildByName("rate").children, r = 0; r < o; ++r) a[r].getChildByName("reach").active = !0;
for (var c = 0; c < a.length; ++c) {
a[c].getChildByName("time").getComponent(cc.Label).string = this.transTimeFormat(cc.YL.CurrStageCfg["INT_Star_" + (c + 1)], !0);
}
s.getChildByName("leftTime").getComponent(cc.Label).string = "剩余时间:" + this.stageTime + "秒";
var h = this.playerNode.getComponent("Player").playerScore;
h > cc.YL.CurrStageInfo.highScore && (cc.YL.CurrStageInfo.highScore = h);
s.getChildByName("score").getComponent(cc.Label).string = h;
s.getChildByName("award").getChildByName("num").getComponent(cc.Label).string = "x" + Math.ceil(h / 10);
cc.YL.PlayerInfo.coin += Math.ceil(h / 10);
this.setStageStorage();
s.getChildByName("btnDouble").on("click", this.onBtnDoubleClick, this);
s.getChildByName("btnShare").on("click", this.onBtnShareClick, this);
s.getChildByName("btnReplay").on("click", this.onBtnReplayClick, this);
s.getChildByName("btnNext").on("click", this.onBtnNextClick, this);
s.getChildByName("btnReturn").on("click", this.onBtnReturnClick, this);
var l = s.getChildByName("Settle");
this._initSettle(l);
}
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
var i = t.getChildByName("box"), o = i.getChildByName("tips").getChildByName("lab");
o.getComponent(cc.Label).string = e ? "分享后立即获得" + cc.YL.CurrStageCfg.INT_Star_1 + "秒时间，继续游戏" : "分享后立即获得1点生命，继续游戏";
i.getChildByName("btnReplay").on("click", this.onBtnReplayClick, this);
i.getChildByName("btnContinue").on("click", this.onBtnContinueClick, this);
i.getChildByName("btnReturn").on("click", this.onBtnReturnClick, this);
var n = i.getChildByName("Settle");
this._initSettle(n);
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
for (var e = 0; e < this.mapNode.children.length; e++) {
var t = this.mapNode.children[e].name.toString().slice(0, 1), i = this.mapNode.children[e].name.toString().slice(-1);
this.mapNode.children[e].stopAllActions();
"B" == t && "M" != i && this.mapNode.children[e].getComponent("MonsterBrith") && this.mapNode.children[e].getComponent("MonsterBrith").clearTime();
"B" == t && "M" == i && this.mapNode.children[e].getComponent("Monster") && this.mapNode.children[e].getComponent("Monster").clearTime();
}
},
PauseAllMap: function() {
this.playerNode.pauseAllActions();
for (var e = 0; e < this.mapNode.children.length; e++) this.mapNode.children[e].pauseAllActions();
},
ResumeAllMap: function() {
this._startCountdown();
this.playerNode.resumeAllActions();
for (var e = 0; e < this.mapNode.children.length; e++) this.mapNode.children[e].resumeAllActions();
},
transTimeFormat: function(e, t) {
e = parseInt(e);
var i = t ? "" : "0:", o = Math.floor(e / 60);
i += (o < 10 ? "0" + o : o) + ":";
var n = e % 60;
return i += n < 10 ? "0" + n : n;
},
setStageStorage: function() {
var e = cc.YL.StageInfo.findIndex(function(e) {
return e.id == cc.YL.CurrStageInfo.id;
});
e >= 0 ? cc.YL.StageInfo.splice(e, 1, cc.YL.CurrStageInfo) : cc.YL.StageInfo.push(cc.YL.CurrStageInfo);
cc.sys.localStorage.setItem("stageInfo", JSON.stringify(cc.YL.StageInfo));
for (var t = 0, i = 0; i < cc.YL.StageInfo.length; ++i) t += cc.YL.StageInfo[i].star;
cc.YL.PlayerInfo.stars = t;
cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
},
checkStageStatus: function(e) {
s[e] && this.stageGoal[s[e]]++;
this.checkStageGoal();
},
checkStageGoal: function() {
for (var e = !0, t = 1; t < 4; ++t) {
var i = cc.YL.CurrStageCfg["INT_Condition_" + t], o = cc.YL.CurrStageCfg["INT_Count_" + t];
if (i) if (1 == i) {
this.getDiamondCount() > 0 && (e = !1);
} else {
var n = 0;
s[parseInt(i)] && (n = this.stageGoal[s[parseInt(i)]] || 0);
var a = this.miniGoal.getChildByName("goal" + t);
if (n < o) {
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
if (e) {
this.playerNode.getComponent("Player").showStatus("Stand");
this.stageComplete();
}
},
getDiamondCount: function() {
for (var e = this.tiledMap.getMapSize(), t = e.width, i = e.height, o = 0, n = 0; n < t; n++) for (var s = 0; s < i; s++) {
var a = cc.v2(0, 0);
a.x = n;
a.y = s;
0 != this.diamond.getTileGIDAt(a) && o++;
}
return o;
},
stageComplete: function() {
cc.YL.moveDir = null;
this.PauseAllMap();
this._stopCountdown();
this._showComplete();
},
stageFail: function(e) {
cc.YL.moveDir = null;
this.PauseAllMap();
this._stopCountdown();
this._showStageFail(e);
},
onStoryBlankClick: function() {
this.storyTimeId && clearTimeout(this.storyTimeId);
this._showDialogue(!0);
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
var e = this.node.parent.getChildByName("StageGoal");
e && utils.hide(e);
this.scoreNode.runAction(cc.moveTo(.2, cc.v2(this.scoreNode.x, 806)).easing(cc.easeBackOut()));
this.lifeNode.runAction(cc.moveTo(.2, cc.v2(this.lifeNode.x, 806)).easing(cc.easeBackOut()));
this.limitNode.runAction(cc.moveTo(.2, cc.v2(this.limitNode.x, 806)).easing(cc.easeBackOut()));
this.miniGoal.runAction(cc.moveTo(.2, cc.v2(-410, this.miniGoal.y)).easing(cc.easeBackOut()));
this._startCountdown();
cc.YL.canTouch = !0;
setTimeout(function() {
this._loadMonsterBri();
}.bind(this), this.monsterDelay);
},
onBtnPauseClick: function() {
this.PauseAllMap();
this._stopCountdown();
var e = this.node.parent.getChildByName("Setting");
e || (e = cc.instantiate(this.SettingPre));
utils.show(e);
},
onBtnDoubleClick: function() {},
onBtnShareClick: function() {},
onBtnReplayClick: function() {
var e = this.node.parent.getChildByName("StageComplete");
e && (e.active = !1);
var t = this.node.parent.getChildByName("StageFail");
t && (t.active = !1);
cc.YL.SceneManager.LoadScene("Map");
},
onBtnNextClick: function() {
var e = this.node.parent.getChildByName("StageComplete");
e && (e.active = !1);
cc.YL.loadMapStage += 1;
var t = cc.YL.StageConfig[cc.YL.loadMapStage];
if (t) {
cc.YL.CurrStageCfg = t;
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
onBtnContinueClick: function() {},
onBtnReturnClick: function() {
cc.YL.SceneManager.LoadScene("Hall");
},
changeZIndex: function() {
this.playerNode.zIndex = cc.YL.playerTile.y + 510;
for (var e = !1, t = 0, i = 0; i < this.mapNode.children.length; i++) {
var o = this.mapNode.children[i].name.toString().slice(0, 1), n = this.mapNode.children[i].name.toString().slice(-1);
if ("B" == o && "M" == n && this.mapNode.children[i].getComponent("Monster")) {
this.mapNode.children[i].zIndex = this.getTilePos(this.mapNode.children[i]).y + 510;
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
}
});
cc._RF.pop();
}, {
"./GameRes": "GameRes",
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
this.node.getChildByName("Animaion").active = !1;
this.mapNode.addChild(t);
this.mapComp.monsterArr.push(t);
t.setPosition(this.brithPos);
t.name = this.node.name + "_" + this.point + "_M";
t.getComponent("Monster").initMonster(this._getMonsterInfo(), this.mapComp.getTilePos(cc.v2(this.monsterInfos.x, this.monsterInfos.y)));
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
},
start: function() {},
onDestroy: function() {
this.clearTime();
},
update: function(e) {
if (1 != this.isNotUpdate) if (1 != this.underAttack) if (1 != cc.YL.isOver) {
var t = this.node.getPosition(), i = this.colliderPlayerNode.getPosition(), o = Math.abs(t.x - i.x), n = Math.abs(t.y - i.y), s = Math.sqrt(o * o + n * n);
if ((o < this.monsterAccleRag && n <= 10 || n < this.monsterAccleRag && o <= 10) && 0 != this.isScan && 0 == this._moveType) {
this.tilePoint = cc.YL.PlayerTileArr.length - 1;
this.monsterScaning = !0;
}
if (s >= this.monsterAccleRag && 0 != this.isScan && 0 == this._moveType) {
cc.log("随机追击范围外");
this.monsterScaning = !1;
this.scanTime = 0;
}
o < this.monsterAccleRag && t.y == i.y && 0 != this.isScan && Math.abs(t.x - i.x) >= this.monsterAttackRag && 1 == this._moveType && (this.monsterScaning = !0);
if ((o >= this.monsterAccleRag || t.y != i.y) && 0 != this.isScan && 1 == this._moveType) {
this.monsterScaning = !1;
this.scanTime = 0;
}
n < this.monsterAccleRag && 0 != this.isScan && Math.abs(t.y - i.y) >= this.monsterAttackRag && 2 == this._moveType && t.x == i.x && (this.monsterScaning = !0);
if ((n >= this.monsterAccleRag || t.x != i.x) && 0 != this.isScan && 2 == this._moveType) {
this.monsterScaning = !1;
this.scanTime = 0;
}
if (s < this.monsterAttackRag && 0 == this.targetIsDead && 0 == this.colliderPlayerNode.getComponent("Player").allCanStatus) {
this.targetIsDead = !0;
this._monsterAttack(t.x, i.x);
}
} else this.node.stopAllActions(); else this.node.stopAllActions();
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
}.bind(this));
},
_loadMonsterSet: function() {
this.isScan = 0;
this.monsterAttackRag = 64;
this.monsterAccleRag = 0;
this.monsterSpeed = .66;
this.monsterAcclSpeed = .33;
if (this.cvsJson) for (var e = 1; e < utils.getCvsLength(this.cvsJson); e++) if (parseInt(this.cvsJson[e].INT_ID) == parseInt(this._monsterID)) {
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
this._startMove();
this.specialMonster();
}.bind(this), 1500);
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
if (1 != cc.YL.isOver) {
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
if (1 == this.monsterScaning && 0 == this.scanBlock) {
if (this.monsterTile.x != cc.YL.PlayerTileArr[this.tilePoint].x && this.monsterTile.y != cc.YL.PlayerTileArr[this.tilePoint].y) {
cc.log("怪物和玩家不在同一直线");
this.tilePoint--;
this.scanBlock = !0;
this.monsterAutoMove();
return;
}
if (0 == this._chargeBlock(this.monsterTile, cc.YL.PlayerTileArr[this.tilePoint])) {
cc.log("怪物和玩家在同一直线但是有block");
this.tilePoint--;
this.scanBlock = !0;
this.monsterAutoMove();
return;
}
cc.YL.PlayerTileArr[this.tilePoint].x - this.monsterTile.x > 0 ? this.startDir = "left" : this.startDir = "right";
cc.YL.PlayerTileArr[this.tilePoint].y - this.monsterTile.y > 0 ? this.startDir = "up" : this.startDir = "down";
var i = this.monsterAcclSpeed;
this._showStatus("Run");
this.monsterTile = e = cc.YL.PlayerTileArr[this.tilePoint];
} else {
i = this.monsterSpeed;
this._showStatus("Walk");
this.monsterTile = e;
}
"left" == this.startDir ? this.showDirSpr("left") : this.showDirSpr("right");
this.mosterStep++;
this.node.stopAllActions();
var o = this.mapComp.block.getPositionAt(this.monsterTile);
this.isAction = !0;
this.tilePoint++;
var n = this.node.getPosition().x - o.x, s = this.node.getPosition().y - o.y;
if (1 == this.monsterScaning && 1 == this.scanTime) {
Math.abs(n) > 64 && (i = 2 * this.monsterAcclSpeed * (Math.abs(n) / 64));
Math.abs(s) > 64 && (i = 2 * this.monsterAcclSpeed * (Math.abs(s) / 64));
} else {
Math.abs(n) > 64 && (i *= Math.abs(n) / 64);
Math.abs(s) > 64 && (i *= Math.abs(s) / 64);
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
},
_chargeBlock: function(e, t) {
if (e.x == t.x && t.y != e.x) if (e.y < t.y) for (var i = 0; i <= t.y - e.y; i++) {
(o = cc.v2(e.x, e.y)).y += i;
if (0 != this.mapComp.block.getTileGIDAt(o)) return !1;
} else for (i = 0; i <= e.y - t.y; i++) {
(o = cc.v2(t.x, t.y)).y += i;
if (0 != this.mapComp.block.getTileGIDAt(o)) return !1;
}
if (e.x != t.x && t.y == e.x) if (e.x < t.x) for (i = 0; i <= t.x - e.x; i++) {
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
for (var t = this._returnDir(e), i = cc.v2(this.monsterTile.x, this.monsterTile.y), o = this._getRandomArr([ cc.v2(i.x, i.y -= 1), cc.v2(i.x, i.y += 2), cc.v2(i.x -= 1, i.y -= 1), cc.v2(i.x += 2, i.y) ]), n = [ "up", "down", "left", "right" ], s = [], a = 0; a < o.length; a++) 1 == o[a] && t != n[a] && s.push(n[a]);
return 0 == s.length ? t : s[Math.floor(Math.random() * s.length)];
},
monsterReAutoMove: function() {
0 == this._moveType ? 0 == this._dir ? this.startDir = this._getRandomDirSpecial(this.startDir) : this.startDir = [ "left", "right", "up", "down" ][parseInt(this._dir) - 1] : 1 == this._moveType ? "left" == this.startDir ? this.startDir = "right" : this.startDir = "left" : 2 == this._moveType && ("up" == this.startDir ? this.startDir = "down" : this.startDir = "up");
cc.log("monsterReAutoMove >>>>>> this.startDir", this.startDir);
},
chargeTile: function(e) {
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
},
_monsterAttack: function(e, t) {
this._monsterAction(e, t);
},
specialMonster: function() {
8 == this._monsterType && this.slime();
},
_monsterAction: function(e, t) {
if (1 != this.attackAction) {
e - t >= 0 ? this.showDirSpr("left") : this.showDirSpr("right");
this.attackAction = !0;
this._showStatus("Attack");
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
}
break;

case 3:
if (1 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
}
break;

case 4:
if (2 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
}
break;

case 5:
if (3 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
}
break;

case 6:
if (4 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
}
break;

case 7:
if (5 == parseInt(i - this.mapComp.diamondFirstGID)) {
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
}
}
}
},
clearTime: function() {
clearTimeout(this.showSpliter);
clearTimeout(this.slimeTimer);
this.isNotUpdate = !0;
},
_showStatus: function(e) {
if ("Run" == e || "Walk" == e) {
this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).loop = !0;
this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = !0;
}
if ("Attack" == e) {
this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).loop = !1;
this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = !1;
}
this.monsterNode.getChildByName("left").active ? this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).animation = e : this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).animation = e;
},
boomer: function(e) {
if (10 == this._monsterType) {
if (this.mosterStep < 6) return !1;
for (var t = !1, i = this.mapNode.getContentSize(), o = this.tiledMap.getTileSize(), n = 0; n < this.mapNode.children.length; n++) "Boom" == this.mapNode.children[n].name && this.mapNode.children[n].x == e.x * o.width && this.mapNode.children[n].y == i.height - o.height * (e.y + 1) && (t = !0);
if (1 == t) return !1;
this.mosterStep = 0;
this.node.stopAllActions();
this._showStatus("Attack");
var s = cc.instantiate(this.boomNode);
this.mapNode.addChild(s);
s.setPosition(e.x * o.width, i.height - o.height * (e.y + 1));
s.getComponent("Boom").showBoomNode(e);
this.BoomArr.push(s);
setTimeout(function() {
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
if (9 == this._monsterType) {
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
var s = this.mapComp.getDiamondNode(i);
if (null == s) return;
1 != s.getChildByName("Slime").active && 1 != s.getChildByName("Ice").active || (o = !0);
if (1 == o) return;
if (0 != this.mapComp.diamond.getTileGIDAt(i)) {
this.isIce = !0;
clearTimeout(this.showIce);
this.node.stopAllActions();
this._showStatus("Attack");
s.getChildByName("Ice").active = !0;
s.getChildByName("Ice").getComponent("Ice").showIceNode();
this.showIce = setTimeout(function() {
this.isIce = !1;
this.isNotUpdate = !1;
this.monsterAutoMove();
}.bind(this), 1e3);
}
}
},
slime: function() {
clearTimeout(this.slimeTimer);
this.mapComp._findDiamondPos();
if (0 != this.mapComp.diamondPosArr.length) {
var e = function() {
var t = Math.floor(Math.random() * this.mapComp.diamondPosArr.length), i = this.mapComp.diamondPosArr[t], o = !1, n = this.mapComp.getDiamondNode(i.pos);
if (null != n) {
1 != n.getChildByName("Slime").active && 1 != n.getChildByName("Ice").active || (o = !0);
if (1 == o) e(); else {
var s = this.node.getPosition().x;
i.pos.x - s >= 0 ? this.showDirSpr("right") : this.showDirSpr("left");
this._showStatus("Attack");
this.node.stopAllActions();
n.getChildByName("Slime").active = !0;
n.getChildByName("Slime").getComponent("Slime").showSlimeNode();
this.showSpliter = setTimeout(function() {
this.isNotUpdate = !1;
this.monsterAutoMove();
}.bind(this), 1e3);
}
}
}.bind(this);
e();
this.slimeTimer = setTimeout(function() {
this.specialMonster();
}.bind(this), 7e3);
}
},
stopSelf: function() {
this._showStatus("Stand");
this.clearTime();
this.node.stopAllActions();
},
underIceAttacked: function(e) {
if (1 != this.underAttack) {
this.underAttack = !0;
this.node.stopAllActions();
this.isIce = !0;
var t = this.node.getPosition(), i = t.x - e.x, o = t.y - e.y, n = (180 + 180 * Math.atan2(-o, -i) / Math.PI + 360) % 360;
n = 360 - n - 90;
var s = this.node.convertToNodeSpace(cc.v2(e.x, e.y));
this.node.getChildByName("arrow").active = !0;
this.node.getChildByName("arrow").setPosition(s);
this.node.getChildByName("arrow").rotation = n;
var a = cc.callFunc(function() {
this._showStatus("Stand");
this.node.stopAllActions();
this.node.getChildByName("arrow").active = !1;
this.node.getChildByName("underAttack").active = !0;
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).loop = !0;
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).animation = "Chixu";
}.bind(this));
this.node.getChildByName("arrow").runAction(cc.sequence(cc.moveTo(.5, 0, 0), a));
setTimeout(function() {
this.removeIceAttacked();
}.bind(this), 5e3);
}
},
removeIceAttacked: function() {
this.isIce = !1;
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).animation = "Xiaochu";
this.node.getChildByName("underAttack").getComponent(sp.Skeleton).setCompleteListener(function() {
this.underAttack = !1;
this.isNotUpdate = !1;
this.monsterAutoMove();
this.node.getChildByName("underAttack").active = !1;
}.bind(this));
},
_showTanhao: function() {
if (1 != this.node.getChildByName("Tanhao").active || 1 != this.scanTime) {
this.node.getChildByName("Tanhao").active = !0;
setTimeout(function() {
this.node.getChildByName("Tanhao").active = !1;
}.bind(this), 500);
}
},
_monsterStartScan: function() {
cc.log("开始追击玩家");
this._findWay();
},
_findWay: function() {
var e = "";
this.startDir = "" == e ? this.startDir : e;
},
chargeZhuijiDir: function(e) {
var t = this.mapComp.tiledMap.getMapSize();
return !(e.x < 0 || e.x >= t.width) && (!(e.y < 0 || e.y >= t.height) && !this.mapComp.block.getTileGIDAt(e));
}
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
this.isPowerFull = !1;
this.playerPower = 0;
this.maxPower = 50;
this._initBtn(e);
}.bind(this));
},
start: function() {},
onClickSkill: function(e, t) {
this._playerNode = this.mapComp.playerNode;
this.startSkill(parseInt(t));
},
updatePower: function(e) {
if (this.playerPower >= this.maxPower) {
for (var t = 0; t < this.node.children.length; t++) {
this.node.children[t].getChildByName("power").getComponent(cc.ProgressBar).progress = 1;
this.node.children[t].getChildByName("Full").active = !0;
this.isPowerFull = !0;
}
this.chargeBtnColcr(!0);
} else {
this.playerPower = this.playerPower + parseInt(cc.YL.SkillCsvJson[parseInt(e) + 5].INT_Power);
for (t = 0; t < this.node.children.length; t++) {
this.node.children[t].getChildByName("power").getComponent(cc.ProgressBar).progress = this.playerPower / this.maxPower;
if (this.playerPower >= this.maxPower) {
this.node.children[t].getChildByName("Full").active = !0;
this.isPowerFull = !0;
this.chargeBtnColcr(!0);
}
}
}
},
showCover: function(e, t) {
this.mapComp.PauseAllMap();
cc.YL.IsCanMove = !1;
this._playerNode.getComponent("Player").showStatus("Stand");
if (this.mapNode.getChildByName("Cover")) this.Cover = this.mapNode.getChildByName("Cover"); else {
this.Cover = new cc.Node();
this.Cover.name = "Cover";
this.Cover.addComponent(cc.Sprite);
this.Cover.getComponent(cc.Sprite).spriteFrame = t;
this.Cover.width = 3e4;
this.Cover.height = 3e4;
this.Cover.setPosition(0, 0);
this.Cover.color = new cc.color(0, 0, 0);
this.Cover.opacity = 100;
1 == parseInt(e) ? this.Cover.zIndex = 490 : this.Cover.zIndex = 600;
this.mapNode.addChild(this.Cover);
}
cc.YL.moveDir = null;
},
startSkill: function(e) {
this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
cc.loader.loadRes("Texture/singleColor", cc.SpriteFrame, function(t, i) {
if (t) cc.log(t); else switch (parseInt(e)) {
case 1:
this.skillIce(e, i);
break;

case 3:
this.skillWater(e, i);
break;

case 2:
this.skillHeart(e, i);
break;

case 4:
this.skillFire(e, i);
}
}.bind(this));
},
endSkill: function() {
cc.YL.IsCanMove = !0;
this.Cover.destroy();
this.mapComp.ResumeAllMap();
this._playerNode.getComponent("Player").isAction = !1;
this.isPowerFull = !1;
for (var e = 0; e < this.node.children.length; e++) {
this.node.children[e].getChildByName("power").getComponent(cc.ProgressBar).progress = 0;
this.node.children[e].getChildByName("Full").active = !1;
this.isPowerFull = !0;
}
this.chargeBtnColcr(!1);
this.playerPower = 0;
},
skillIce: function(e, t) {
for (var i = !1, o = 0; o < this.mapNode.children.length; o++) {
var n = this.mapNode.children[o].name.toString().slice(0, 1), s = this.mapNode.children[o].name.toString().slice(-1);
this.mapNode.children[o].stopAllActions();
"B" == n && "M" == s && (i = !0);
}
if (0 != i) {
this.showCover(e, t);
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
this.endSkill();
}.bind(this), 2e3);
}
},
skillHeart: function(e, t) {
if (this._playerNode.getComponent("Player").getBlood() >= 3) {
cc.log("满血");
this._playerNode.getChildByName("HeartAnimation").active = !0;
this._playerNode.getChildByName("HeartAnimation").scale = 3;
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).animation = "Shibai";
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).setCompleteListener(function() {
cc.log("结束");
this._playerNode.getChildByName("HeartAnimation").active = !1;
}.bind(this));
} else {
this.showCover(e, t);
this._playerNode.getChildByName("HeartAnimation").active = !0;
this._playerNode.getChildByName("HeartAnimation").scale = 2;
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).animation = "Shouhu";
this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).setCompleteListener(function() {
cc.log("结束");
this._playerNode.getChildByName("HeartAnimation").active = !1;
this._playerNode.getComponent("Player").addBlood();
this.endSkill();
}.bind(this));
}
},
skillWater: function(e, t) {
if (0 != cc.YL.PlayerSlime) {
this._playerNode.getChildByName("WaterAniamtion").active = !0;
this.showCover(e, t);
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).animation = "Xiaochu";
this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).setCompleteListener(function() {
this._playerNode.getChildByName("WaterAniamtion").active = !1;
cc.YL.PlayerSlime = !1;
this._playerNode.getComponent("Player").removeSlime();
this.endSkill();
cc.YL.IsCanMove = !0;
}.bind(this));
}
},
skillFire: function(e, t) {
if (0 != cc.YL.PlayerIce) {
this.showCover(e, t);
this._playerNode.getChildByName("FireAniamtion").active = !0;
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).loop = !1;
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).animation = "Xiaochu";
this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).setCompleteListener(function() {
this._playerNode.getChildByName("FireAniamtion").active = !1;
this._playerNode.getComponent("Player").removeIce();
cc.YL.PlayerIce = !1;
this.endSkill();
cc.YL.IsCanMove = !0;
}.bind(this));
}
},
_initBtn: function(e) {
cc.log("当前关卡", cc.YL.ClearStage);
cc.YL.ClearStage = void 0 == cc.YL.ClearStage ? 1 : cc.YL.ClearStage;
for (var t = {
1: "Ice",
2: "Heart",
3: "Water",
4: "Fire"
}, i = 1; i < utils.getCvsLength(e); i++) if (cc.YL.ClearStage > parseInt(e[i].INT_LockStage) && parseInt(e[i].INT_ID) < 10) {
cc.find("Canvas/PlayerSkill").getChildByName(t[parseInt(e[i].INT_ID)]).getComponent(cc.Button).interactable = !0;
cc.find("Canvas/PlayerSkill").getChildByName(t[parseInt(e[i].INT_ID)]).color = new cc.Color(95, 78, 78);
cc.find("Canvas/PlayerSkill").getChildByName(t[parseInt(e[i].INT_ID)]).active = !0;
} else if (cc.YL.ClearStage <= parseInt(e[i].INT_LockStage) && parseInt(e[i].INT_ID) < 10) {
cc.find("Canvas/PlayerSkill").getChildByName(t[parseInt(e[i].INT_ID)]).getComponent(cc.Button).interactable = !1;
cc.find("Canvas/PlayerSkill").getChildByName(t[parseInt(e[i].INT_ID)]).active = !1;
}
},
chargeBtnColcr: function(e) {
cc.YL.ClearStage = void 0 == cc.YL.ClearStage ? 1 : cc.YL.ClearStage;
for (var t = {
1: "Ice",
2: "Heart",
3: "Water",
4: "Fire"
}, i = 1; i < utils.getCvsLength(cc.YL.SkillCsvJson); i++) cc.YL.ClearStage > parseInt(cc.YL.SkillCsvJson[i].INT_LockStage) && parseInt(cc.YL.SkillCsvJson[i].INT_ID) < 10 && (cc.find("Canvas/PlayerSkill").getChildByName(t[parseInt(cc.YL.SkillCsvJson[i].INT_ID)]).color = e ? new cc.Color(255, 255, 255) : new cc.Color(95, 78, 78));
}
});
cc._RF.pop();
}, {
"./funCsv": "funCsv"
} ],
Player: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "e2cb465FQxDw5YqImEnhkM8", "Player");
var o = e("./funCsv");
cc.Class({
extends: cc.Component,
properties: {},
onLoad: function() {
o.turnCsvToJson("Csv/player", function(e) {
this.moveSpeed = 1;
this.lowSpeed = 2;
for (var t = 1; t < utils.getCvsLength(e); t++) if (parseInt(e[t].INT_ID) == cc.YL.PlayerRole) {
this.moveSpeed = 64 / e[t].INT_MoveSpeed;
this.lowSpeed = 64 / e[t].INT_MoveSpeed * 2;
this._showType(e[t].STR_Resource);
}
this.lowSpeed = this.lowSpeed = this.lowSpeed;
this.moveSpeed = this.moveSpeed = this.moveSpeed;
cc.YL.PlayerIce = !1;
cc.YL.PlayerSlime = !1;
this.skillNodeCom = cc.find("Canvas/PlayerSkill").getComponent("PlayerSkill");
this.lifeNum = 3;
this.allCanStatus = !1;
this.isLow = !1;
this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
this.catchArr = [];
this.node.zIndex = 700;
this.mapComp.lifeNode.getChildByName("num").getComponent(cc.Label).string = this.lifeNum;
cc.YL.PlayerTileArr = [];
cc.YL.PlayerTileArr.push(cc.YL.playerTile);
}.bind(this));
},
start: function() {
this.showStatus("Stand");
},
showDifferentDir: function(e) {
if ("left" == e) {
this.node.getChildByName("left").active = !0;
this.node.getChildByName("right").active = !1;
} else {
this.node.getChildByName("left").active = !1;
this.node.getChildByName("right").active = !0;
}
},
PlayerMove: function(e) {
if (e) {
cc.YL.moveDir = e;
if (1 != this.isAction) {
this.isAction = !0;
this.showStatus("Run");
this.isAction = !0;
var t = cc.v2(cc.YL.playerTile.x, cc.YL.playerTile.y);
switch (e) {
case "up":
t.y -= 1;
break;

case "down":
t.y += 1;
break;

case "left":
this.showDifferentDir("left");
t.x -= 1;
break;

case "right":
t.x += 1;
this.showDifferentDir("right");
break;

default:
this.isAction = !1;
return;
}
var i = this.mapComp.tiledMap.getMapSize();
if (t.x < 0 || t.x >= i.width) {
t.x < 0 ? t.x = i.width : t.x = -1;
cc.YL.playerTile = t;
this.node.stopAllActions();
var o = this.mapComp.block.getPositionAt(cc.YL.playerTile);
this.node.setPosition(o);
this.isAction = !1;
this.PlayerMove(cc.YL.moveDir);
} else if (t.y < 0 || t.y >= i.height) {
cc.YL.moveDir = null;
this.isAction = !1;
} else if (0 == this.mapComp.block.getTileGIDAt(t)) if (cc.YL.playerTile.x == t.x || cc.YL.playerTile.y == t.y) {
cc.YL.playerTile = t;
cc.YL.PlayerTileArr.push(t);
audio.playEffect("playerRun");
o = this.mapComp.block.getPositionAt(cc.YL.playerTile);
var n = 0 == this.isLow ? this.moveSpeed : this.lowSpeed, s = this.node.getPosition().x - o.x, a = this.node.getPosition().y - o.y;
0 != Math.abs(s) && (n *= Math.abs(s) / 64);
0 != Math.abs(a) && (n *= Math.abs(a) / 64);
n < .5 && (n = 0 == this.isLow ? this.moveSpeed : this.lowSpeed);
this.node.runAction(cc.sequence(cc.moveTo(n, o), cc.callFunc(function() {
this._tryToCatchDiamond(t);
this.mapComp.changeZIndex();
}.bind(this)), cc.callFunc(function() {
this.isAction = !1;
this.PlayerMove(cc.YL.moveDir);
}.bind(this))));
} else {
cc.YL.moveDir = null;
this.isAction = !1;
} else {
cc.log("This way is blocked!");
cc.YL.moveDir = null;
this.showStatus("Stand");
this.isAction = !1;
}
}
} else {
this.showStatus("Stand");
this.isAction = !1;
}
},
_tryToCatchDiamond: function(e) {
var t = this.mapComp.diamond.getTileGIDAt(e);
if (0 != t) {
var i = cc.find("Canvas/Score/num").getComponent(cc.Label).string;
cc.find("Canvas/Score/num").getComponent(cc.Label).string = parseInt(i) + parseInt(cc.YL.SkillCsvJson[parseInt(t - this.mapComp.diamondFirstGID) + 5].IND_Point);
this.playerScore = parseInt(i) + parseInt(cc.YL.SkillCsvJson[parseInt(t - this.mapComp.diamondFirstGID) + 5].IND_Point);
this.catchArr.push(t - this.mapComp.diamondFirstGID);
this.mapComp.diamond.setTileGIDAt(0, e);
this.mapComp._deletedDiamond(e);
this.skillNodeCom.updatePower(t - this.mapComp.diamondFirstGID);
this._createNewDiamond();
this.mapComp.checkStageStatus(t - this.mapComp.diamondFirstGID + 2);
this._removeDiamondEffect(e);
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
if (null != t && (1 == t.getChildByName("Slime").active || 1 == t.getChildByName("Ice").active)) {
t.getChildByName("Slime").active = !1;
t.getChildByName("Ice").active = !1;
}
},
_analysisCatchArr: function() {
this.catchArr[0] == this.catchArr[1] && this._initNewDiamond(this.catchArr[0]);
},
_initNewDiamond: function(e) {
if (5 != e) if (e >= 6 && e < 11) this.catchArr = []; else if (e >= 12 && e < 18) this.catchArr = []; else {
this.mapComp._findDiamondPos();
if (0 != this.mapComp.diamondPosArr.length) {
var t = Math.floor(Math.random() * this.mapComp.diamondPosArr.length);
this.mapComp._showDiamond(this.mapComp.diamondPosArr[t].pos, e + 1, !0);
this.mapComp.diamond.setTileGIDAt(e + this.mapComp.diamondFirstGID + 1, this.mapComp.diamondPosArr[t].pos);
this.catchArr = [];
} else this.catchArr = [];
}
},
allCanDo: function() {
this.showStatus("Hurt");
setTimeout(function() {
this.showStatus("Stand");
cc.YL.moveDir = "";
this.allCanStatus = !1;
}.bind(this), 3e3);
},
showStatus: function(e) {
if ("Lose" == e || "Win" == e) {
this.node.getChildByName("left").getComponent(sp.Skeleton).loop = !1;
this.node.getChildByName("right").getComponent(sp.Skeleton).loop = !1;
} else {
this.node.getChildByName("left").getComponent(sp.Skeleton).loop = !0;
this.node.getChildByName("right").getComponent(sp.Skeleton).loop = !0;
}
this.node.getChildByName("left").active ? this.node.getChildByName("left").getComponent(sp.Skeleton).animation = e : this.node.getChildByName("right").getComponent(sp.Skeleton).animation = e;
},
underSlime: function() {
this.isLow = !0;
this.node.getChildByName("WaterAniamtion").active = !0;
this.node.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).animation = "Chixu";
},
removeSlime: function() {
this.isLow = !1;
this.node.getChildByName("WaterAniamtion").active = !1;
},
underIce: function() {
this.node.stopAllActions;
cc.YL.moveDir = null;
this.showStatus("Stand");
this.node.getChildByName("FireAniamtion").active = !0;
this.node.getChildByName("FireAniamtion").getComponent(sp.Skeleton).animation = "Chixu";
},
removeIce: function() {
this.node.getChildByName("FireAniamtion").active = !1;
},
reduceBlood: function() {
cc.log("reduceBlood");
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
cc.YL.PlayerRole;
},
underAttack: function() {
if (1 != this.allCanStatus) {
this.allCanStatus = !0;
this.node.stopAllActions();
this.isAction = !1;
this.reduceBlood();
if (this.lifeNum <= 0) {
this.showStatus("Lose");
this.node.stopAllActions();
this.mapComp.StopAllMap();
this.mapComp.stageFail();
cc.YL.isOver = !0;
cc.log("玩家死亡");
} else {
cc.log("玩家少一血");
cc.YL.moveDir = null;
this.allCanDo();
}
}
}
});
cc._RF.pop();
}, {
"./funCsv": "funCsv"
} ],
Popup: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "0476b1OWV1GpI3nOKbdju24", "Popup");
var o = e("../GameRes"), n = {
init: function() {
this.rootNode = cc.find("Canvas");
},
show: function(e) {
if (this.rootNode) {
var t = cc.instantiate(o.prefab.POPUP), i = t.getChildByName("box");
i.getChildByName("content").getComponent(cc.Label).string = e.str.toString();
var n = i.getChildByName("btnConfirm"), s = i.getChildByName("btnCancel"), a = e.confirm, r = e.cancel;
if (!r) {
s.active = !1;
n.x = 0;
}
n.on("click", function() {
a && "function" == typeof a && a();
this.hide();
}.bind(this));
s.on("click", function() {
r && "function" == typeof r && r();
this.hide();
}.bind(this));
i.opacity = 0;
i.scale = .1;
this.rootNode.addChild(t, 9999);
i.runAction(cc.spawn(cc.fadeIn(.2), cc.scaleTo(.2, 1).easing(cc.easeBackOut())));
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
window.popup = n;
cc._RF.pop();
}, {
"../GameRes": "GameRes"
} ],
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
for (var e = 0; e < this.node.getChildByName("box").getChildByName("BigRole").children.length; e++) this.node.getChildByName("box").getChildByName("BigRole").children[e].active = !1;
var t = this.node.getChildByName("box").getChildByName("RoleList").getChildByName("view").getChildByName("content");
for (e = 0; e < t.children.length; e++) {
t.children[e].getChildByName("Label").getComponent(cc.Label).string = "";
t.children[e].getChildByName("select").active = !1;
}
for (var i in this._csvJson) {
var o = this._csvJson[i].INT_UnlockMission;
if (parseInt(o) && cc.YL.ClearStage < parseInt(o)) {
t.getChildByName(i).getComponent(cc.Button).interactable = !1;
t.getChildByName(i).getChildByName("SprNot").active = !0;
t.getChildByName(i).getChildByName("Spr").active = !1;
t.getChildByName(i).getChildByName("Label").getComponent(cc.Label).string = "第" + (parseInt(o) + 1) + "关解锁";
} else {
t.getChildByName(i).getComponent(cc.Button).interactable = !0;
t.getChildByName(i).getChildByName("SprNot").active = !1;
t.getChildByName(i).getChildByName("Spr").active = !0;
}
var n = this.node.getChildByName("box").getChildByName("BigRole"), s = this._csvJson[i].INT_MoveSpeed, a = this._csvJson[i].INT_RecoverSpeed, r = n.getChildByName(i).getChildByName("speed"), c = n.getChildByName(i).getChildByName("reset");
r.getChildByName("percent").getComponent(cc.Label).string = parseInt(s) || 0;
r.getComponent(cc.ProgressBar).progress = parseInt(s) / 300;
c.getChildByName("percent").getComponent(cc.Label).string = parseInt(a) || 0;
c.getComponent(cc.ProgressBar).progress = parseInt(a) / 4e3;
if (i == cc.YL.PlayerRole.toString()) {
t.getChildByName(i).getChildByName("select").active = !0;
t.getChildByName(i).getChildByName("Label").getComponent(cc.Label).string = "出场中";
n.getChildByName(i).active = !0;
}
}
},
onClickChoiceList: function(e) {
for (var t = e.target.name, i = 0; i < this.node.getChildByName("box").getChildByName("BigRole").children.length; i++) this.node.getChildByName("box").getChildByName("BigRole").children[i].active = !1;
this.node.getChildByName("box").getChildByName("BigRole").getChildByName(t).active = !0;
var o = this.node.getChildByName("box").getChildByName("RoleList").getChildByName("view").getChildByName("content");
for (i = 0; i < o.children.length; i++) o.children[i].getChildByName("select").active = !1;
e.target.getChildByName("select").active = !0;
},
onClickComfire: function(e) {
var t = e.target.parent.name;
cc.YL.PlayerRole = parseInt(t);
this._init();
cc.sys.localStorage.setItem("playerRole", cc.YL.PlayerRole);
},
onClickClose: function() {
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
this.mute = this.node.getChildByName("box").getChildByName("mute");
this.effect = this.node.getChildByName("box").getChildByName("effect");
this.music = this.node.getChildByName("box").getChildByName("music");
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
popup.show({
str: "确定放弃当前进度并退出关卡？",
confirm: function() {
cc.YL.SceneManager.LoadScene("Hall");
},
cancel: 1
});
},
onBtnReplayClick: function() {
popup.show({
str: "确定重新挑战本关？",
confirm: function() {
this.node.active = !1;
cc.YL.SceneManager.LoadScene("Map");
}.bind(this),
cancel: 1
});
},
onBtnCloseClick: function() {
utils.hide(this.node);
var e = {
mute: cc.YL.muteMode,
effect: cc.YL.effectVolume,
music: cc.YL.musicVolume
};
cc.sys.localStorage.setItem("gameVolume", JSON.stringify(e));
cc.find("Canvas/MapRoot") && cc.find("Canvas/MapRoot").getComponent("Map").ResumeAllMap();
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
cc.log("粘液处理");
this.isSlime = !0;
cc.YL.PlayerSlime = !0;
this.colliderPlayerNode.getComponent("Player").underSlime();
setTimeout(function() {
cc.log("玩家取消粘液处理");
cc.find("Canvas/MapRoot/map").getChildByName("playerNode").getComponent("Player").removeSlime();
cc.YL.PlayerSlime = !1;
}.bind(this), 5e3);
},
update: function(e) {
var t = this.node.parent.getPosition(), i = this.colliderPlayerNode.getPosition();
Math.abs(t.x - i.x) < 10 && Math.abs(t.y - i.y) < 10 && 0 == this.isSlime && this.showSlimeEffect();
}
});
cc._RF.pop();
}, {} ],
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
this.triggerType = t || this.node.getChildByName("Trigger_Burrow");
this.node.setPosition(e.x, e.y - 64);
},
playerTrigger: function() {
if (!this.triggering && !this.triggerStatus) {
this.triggering = !0;
if (!this.progress) {
var e = cc.instantiate(this.mapComp.triggerProgPre);
this.mapNode.addChild(e);
e.zIndex = 501;
e.setPosition(this.node.x + 35, this.node.y + 170);
this.progress = e;
}
this.showTriggerProg();
}
},
showTriggerProg: function(e) {
this.timeId = setTimeout(function() {
this.progress.getComponent(cc.ProgressBar).progress += .008;
if (this.progress.getComponent(cc.ProgressBar).progress >= 1) {
this.progress.getComponent(cc.ProgressBar).progress = 0;
this.progress.removeFromParent();
this.progress.destroy();
this.progress = null;
if (e) {
console.log("怪物关闭机关");
this.triggerType.getComponent(sp.Skeleton).setAnimation(0, "On_to_Off", !1);
this.triggerType.getComponent(sp.Skeleton).setCompleteListener(function() {
this.triggering = !1;
this.triggerStatus = 0;
this.mapComp.stageGoal.type1--;
this.monsterNode.getComponent("Monster").trigger = !1;
this.monsterNode.getComponent("Monster").monsterAutoMove();
}.bind(this));
} else {
console.log("玩家开启机关type", this.triggerInfo.Type);
this.triggerType.getComponent(sp.Skeleton).setAnimation(0, "Off_to_On", !1);
this.triggerType.getComponent(sp.Skeleton).setCompleteListener(function() {
this.triggering = !1;
this.triggerStatus = 1;
1 == this.triggerInfo.Type ? this.mapComp.stageGoal.type1++ : 2 == this.triggerInfo.Type && this.mapComp.stageGoal.type2++;
}.bind(this));
}
this.mapComp.checkStageGoal();
} else this.showTriggerProg(e);
}.bind(this), 16);
},
getMonsterTrigger: function() {
for (var e = this.node.getPosition(), t = this.mapComp.monsterArr, i = 0; i < t.length; ++i) if (Math.abs(e.x - t[i].x) < 10 && Math.abs(e.y - t[i].y) < 10) return t[i];
return null;
},
monsterTrigger: function() {
if (!this.triggering && this.triggerStatus) {
this.triggering = !0;
this.monsterNode.stopAllActions();
this.monsterNode.getComponent("Monster").trigger = !0;
if (!this.progress) {
var e = cc.instantiate(this.mapComp.triggerProgPre);
this.mapNode.addChild(e);
e.zIndex = 501;
e.setPosition(this.node.x + 35, this.node.y + 170);
this.progress = e;
}
this.showTriggerProg(!0);
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
var t = this.node.getPosition(), i = this.playerNode.getPosition();
if (this.triggerStatus) {
var o = this.getMonsterTrigger();
if (o) {
this.monsterNode = o;
this.monsterTrigger();
} else this.removeProgress();
} else Math.abs(t.x - i.x) < 10 && Math.abs(t.y - i.y) < 10 ? this.playerTrigger() : this.removeProgress();
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
e.active = !1;
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
getCvsLength: function(e) {
var t = 0;
for (var i in e) e.hasOwnProperty(i) && t++;
return t;
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
hotUpdate: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "2f5d7nJLZBLN64cfuUZsWee", "hotUpdate");
var o = !1;
cc.Class({
extends: cc.Component,
properties: {
manifestUrl: {
type: cc.Asset,
default: null
},
gameName: {
default: 0
},
loseFileStr: {
default: "本地文件丢失，请卸载后重新安装！"
},
loseRemoteFileStr: {
default: "下载版本文件出错，请稍后再试！"
},
foundNewStr: {
default: "发现新版本，请更新！"
},
updateErrStr: {
default: "更新出错，请重试！"
},
updatePanelPrefab: {
default: null,
type: cc.Prefab
}
},
onLoad: function() {
if (!cc.sys.isBrowser) {
var e = cc.sys.localStorage.getItem("UpdatedGame");
if (!e || !e[this.gameName]) {
var t = cc.path.join(jsb.fileUtils.getWritablePath(), "hotUpdate");
this.atManager = new jsb.AssetsManager(this.manifestUrl, t, this.versionCompare);
this.atManager.retain();
this.atManager.getState() === jsb.AssetsManager.State.UNCHECKED && this.atManager.loadLocalManifest(this.manifestUrl);
if (this.atManager.getLocalManifest() && this.atManager.getLocalManifest().isLoaded()) {
this.checkListener = new jsb.EventListenerAssetsManager(this.atManager, this.checkUpdateCB.bind(this));
cc.eventManager.addListener(this.checkListener, 1);
this.atManager.checkUpdate();
this.hasCheckListener = !0;
} else this.showError(this.loseFileStr);
}
}
},
versionCompare: function(e, t) {
var i = e.split("."), n = t.split(".");
o = n[0] > i[0];
for (var s = 0; s < i.length; ++s) {
var a = parseInt(i[s]), r = parseInt(n[s]);
if (a !== r) return a - r;
}
return n.length > i.length ? -1 : 0;
},
checkUpdateCB: function(e) {
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
this.showError(this.loseFileStr);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.showError(this.loseRemoteFileStr);
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
this.completeUpdate();
break;

case jsb.EventAssetsManager.NEW_VERSION_FOUND:
this.reqVersionDetail();
break;

default:
return;
}
if (this.hasCheckListener) {
cc.eventManager.removeListener(this.checkListener);
this.hasCheckListener = !1;
}
},
completeUpdate: function() {
var e = cc.sys.localStorage.getItem("UpdatedGame");
e[this.gameName] = this.gameName;
cc.sys.localStorage.setItem("UpdatedGame", e);
},
reqVersionDetail: function() {
this.updatePanel = cc.instantiate(this.updatePanelPrefab);
var e = this.atManager.getLocalManifest().getPackageUrl() + "ver.txt", t = new XMLHttpRequest();
t.onreadystatechange = function() {
if (4 === t.readyState && t.status >= 200 && t.status < 400) if (o) this.forceUpdate(); else {
this.updatePanel.parent = this.node;
this.updatePanel.getComponent("updatePanel").setVersionContent(t.responseText.split(":::"), this.startUpdate.bind(this));
}
}.bind(this);
t.open("GET", e, !0);
t.send();
},
forceUpdate: function() {},
startUpdate: function() {
this.hasUpdateListener = !0;
this.updateListener = new jsb.EventListenerAssetsManager(this.atManager, this.updatingCB.bind(this));
cc.eventManager.addListener(this.updateListener, 1);
this.atManager.getState() === jsb.AssetsManager.State.UNINITED && this.atManager.loadLocalManifest(this.manifestUrl);
this.atManager.update();
},
updatingCB: function(e) {
var t = !1;
switch (e.getEventCode()) {
case jsb.EventAssetsManager.ERROR_NO_LOCAL_MANIFEST:
console.log("hotUpdate", this.gameName + "updatingCB ERROR_NO_LOCAL_MANIFEST");
this.showError(this.loseFileStr);
break;

case jsb.EventAssetsManager.ERROR_DOWNLOAD_MANIFEST:
case jsb.EventAssetsManager.ERROR_PARSE_MANIFEST:
this.showError(this.loseRemoteFileStr);
break;

case jsb.EventAssetsManager.UPDATE_FAILED:
this.showError(this.updateErrStr);
break;

case jsb.EventAssetsManager.ERROR_UPDATING:
break;

case jsb.EventAssetsManager.UPDATE_PROGRESSION:
if (!this._getTotalBytes && 0 !== e.getTotalBytes()) {
this.updatePanel.getComponent("updatePanel").setSourceSize(e.getTotalBytes() / 1048576);
this._getTotalBytes = !0;
}
this.updatePanel.getComponent("updatePanel").updateProgress(e.getPercent());
break;

case jsb.EventAssetsManager.ALREADY_UP_TO_DATE:
case jsb.EventAssetsManager.UPDATE_FINISHED:
t = !0;
}
if (t) {
if (this.hasUpdateListener) {
cc.eventManager.removeListener(this.updateListener);
this.hasUpdateListener = !1;
}
var i = jsb.fileUtils.getSearchPaths(), o = this.atManager.getLocalManifest().getSearchPaths();
console.log("hotUpdatesuccess ", o);
Array.prototype.unshift(i, o);
i.unshift(cc.path.join(jsb.fileUtils.getWritablePath(), "hotUpdate"));
cc.sys.localStorage.setItem("HotUpdateSearchPaths", JSON.stringify(i));
jsb.fileUtils.setSearchPaths(i);
cc.game.restart();
}
},
showError: function(e) {},
onDestroy: function() {
this.hasCheckListener && cc.eventManager.removeListener(this.checkListener);
this.hasUpdateListener && cc.eventManager.removeListener(this.updateListener);
this.atManager && this.atManager.release();
}
});
cc._RF.pop();
}, {} ],
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
this._handle = new r(t), this._handle.streamer = this, this._config = t;
}.call(this, t), this.parseChunk = function(t) {
if (this.isFirstChunk && g(this._config.beforeFirstChunk)) {
var i = this._config.beforeFirstChunk(t);
void 0 !== i && (t = i);
}
this.isFirstChunk = !1;
var o = this._partialLine + t;
this._partialLine = "";
var n = this._handle.parse(o, this._baseIndex, !this._finished);
if (!this._handle.paused() && !this._handle.aborted()) {
var s = n.meta.cursor;
this._finished || (this._partialLine = o.substring(s - this._baseIndex), this._baseIndex = s), 
n && n.data && (this._rowCount += n.data.length);
var a = this._finished || this._config.preview && this._rowCount >= this._config.preview;
if (C) e.postMessage({
results: n,
workerId: S.WORKER_ID,
finished: a
}); else if (g(this._config.chunk)) {
if (this._config.chunk(n, this._handle), this._paused) return;
n = void 0, this._completeResults = void 0;
}
return this._config.step || this._config.chunk || (this._completeResults.data = this._completeResults.data.concat(n.data), 
this._completeResults.errors = this._completeResults.errors.concat(n.errors), this._completeResults.meta = n.meta), 
!a || !g(this._config.complete) || n && n.meta.aborted || this._config.complete(this._completeResults), 
a || n && n.meta.paused || this._nextChunk(), n;
}
}, this._sendError = function(t) {
g(this._config.error) ? this._config.error(t) : C && this._config.error && e.postMessage({
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
if (t = new XMLHttpRequest(), f || (t.onload = p(this._chunkLoaded, this), t.onerror = p(this._chunkError, this)), 
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
function s(e) {
(e = e || {}).chunkSize || (e.chunkSize = S.LocalChunkSize), i.call(this, e);
var t, o, n = "undefined" != typeof FileReader;
this.stream = function(e) {
this._input = e, o = e.slice || e.webkitSlice || e.mozSlice, n ? ((t = new FileReader()).onload = p(this._chunkLoaded, this), 
t.onerror = p(this._chunkError, this)) : t = new FileReaderSync(), this._nextChunk();
}, this._nextChunk = function() {
this._finished || this._config.preview && !(this._rowCount < this._config.preview) || this._readChunk();
}, this._readChunk = function() {
var e = this._input;
if (this._config.chunkSize) {
var i = Math.min(this._start + this._config.chunkSize, this._input.size);
e = o.call(e, this._start, i);
}
var s = t.readAsText(e, this._config.encoding);
n || this._chunkLoaded({
target: {
result: s
}
});
}, this._chunkLoaded = function(e) {
this._start += this._config.chunkSize, this._finished = !this._config.chunkSize || this._start >= this._input.size, 
this.parseChunk(e.target.result);
}, this._chunkError = function() {
this._sendError(t.error);
};
}
function a(e) {
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
function r(e) {
function t() {
if (C && r && (n("Delimiter", "UndetectableDelimiter", "Unable to auto-detect delimiting character; defaulted to '" + S.DefaultDelimiter + "'"), 
r = !1), e.skipEmptyLines) for (var t = 0; t < C.data.length; t++) 1 == C.data[t].length && "" == C.data[t][0] && C.data.splice(t--, 1);
return i() && function() {
if (C) {
for (var e = 0; i() && e < C.data.length; e++) for (var t = 0; t < C.data[e].length; t++) f.push(C.data[e][t]);
C.data.splice(0, 1);
}
}(), function() {
if (!C || !e.header && !e.dynamicTyping) return C;
for (var t = 0; t < C.data.length; t++) {
for (var i = {}, s = 0; s < C.data[t].length; s++) {
if (e.dynamicTyping) {
var a = C.data[t][s];
C.data[t][s] = "true" == a || "TRUE" == a || "false" != a && "FALSE" != a && o(a);
}
e.header && (s >= f.length ? (i.__parsed_extra || (i.__parsed_extra = []), i.__parsed_extra.push(C.data[t][s])) : i[f[s]] = C.data[t][s]);
}
e.header && (C.data[t] = i, s > f.length ? n("FieldMismatch", "TooManyFields", "Too many fields: expected " + f.length + " fields but parsed " + s, t) : s < f.length && n("FieldMismatch", "TooFewFields", "Too few fields: expected " + f.length + " fields but parsed " + s, t));
}
return e.header && C.meta && (C.meta.fields = f), C;
}();
}
function i() {
return e.header && 0 == f.length;
}
function o(e) {
return h.test(e) ? parseFloat(e) : e;
}
function n(e, t, i, o) {
C.errors.push({
type: e,
code: t,
message: i,
row: o
});
}
var s, a, r, h = /^\s*-?(\d*\.?\d+|\d+\.?\d*)(e[-+]?\d+)?\s*$/i, l = this, d = 0, p = !1, u = !1, f = [], C = {
data: [],
errors: [],
meta: {}
};
if (g(e.step)) {
var y = e.step;
e.step = function(o) {
if (C = o, i()) t(); else {
if (t(), 0 == C.data.length) return;
d += o.data.length, e.preview && d > e.preview ? a.abort() : y(C, l);
}
};
}
this.parse = function(i, o, n) {
if (e.newline || (e.newline = function(e) {
var t = (e = e.substr(0, 1048576)).split("\r");
if (1 == t.length) return "\n";
for (var i = 0, o = 0; o < t.length; o++) "\n" == t[o][0] && i++;
return i >= t.length / 2 ? "\r\n" : "\r";
}(i)), r = !1, !e.delimiter) {
var h = function(t) {
for (var i, o, n, s = [ ",", "\t", "|", ";", S.RECORD_SEP, S.UNIT_SEP ], a = 0; a < s.length; a++) {
var r = s[a], h = 0, l = 0;
n = void 0;
for (var d = new c({
delimiter: r,
preview: 10
}).parse(t), m = 0; m < d.data.length; m++) {
var p = d.data[m].length;
l += p, "undefined" != typeof n ? p > 1 && (h += Math.abs(p - n), n = p) : n = p;
}
d.data.length > 0 && (l /= d.data.length), ("undefined" == typeof o || o > h) && l > 1.99 && (o = h, 
i = r);
}
return e.delimiter = i, {
successful: !!i,
bestDelimiter: i
};
}(i);
h.successful ? e.delimiter = h.bestDelimiter : (r = !0, e.delimiter = S.DefaultDelimiter), 
C.meta.delimiter = e.delimiter;
}
var l = m(e);
return e.preview && e.header && l.preview++, s = i, a = new c(l), C = a.parse(s, o, n), 
t(), p ? {
meta: {
paused: !0
}
} : C || {
meta: {
paused: !1
}
};
}, this.paused = function() {
return p;
}, this.pause = function() {
p = !0, a.abort(), s = s.substr(a.getCharIndex());
}, this.resume = function() {
p = !1, l.streamer.parseChunk(s);
}, this.aborted = function() {
return u;
}, this.abort = function() {
u = !0, a.abort(), C.meta.aborted = !0, g(e.complete) && e.complete(C), s = "";
};
}
function c(e) {
var t = (e = e || {}).delimiter, i = e.newline, o = e.comments, n = e.step, s = e.preview, a = e.fastMode;
if (("string" != typeof t || S.BAD_DELIMITERS.indexOf(t) > -1) && (t = ","), o === t) throw "Comment character same as delimiter";
!0 === o ? o = "#" : ("string" != typeof o || S.BAD_DELIMITERS.indexOf(o) > -1) && (o = !1), 
"\n" != i && "\r" != i && "\r\n" != i && (i = "\n");
var r = 0, c = !1;
this.parse = function(e, h, l) {
function d(e) {
S.push(e), I = r;
}
function m(t) {
return l ? g() : ("undefined" == typeof t && (t = e.substr(r)), B.push(t), r = f, 
d(B), v && u(), g());
}
function p(t) {
r = t, d(B), B = [], k = e.indexOf(i, r);
}
function g(e) {
return {
data: S,
errors: _,
meta: {
delimiter: t,
linebreak: i,
aborted: c,
truncated: !!e,
cursor: I + (h || 0)
}
};
}
function u() {
n(g()), S = [], _ = [];
}
if ("string" != typeof e) throw "Input must be a string";
var f = e.length, C = t.length, y = i.length, N = o.length, v = "function" == typeof n;
r = 0;
var S = [], _ = [], B = [], I = 0;
if (!e) return g();
if (a || !1 !== a && -1 === e.indexOf('"')) {
for (var b = e.split(i), L = 0; L < b.length; L++) {
B = b[L];
if (r += B.length, L !== b.length - 1) r += i.length; else if (l) return g();
if (!o || B.substr(0, N) != o) {
if (v) {
if (S = [], d(B.split(t)), u(), c) return g();
} else d(B.split(t));
if (s && L >= s) return S = S.slice(0, s), g(!0);
}
}
return g();
}
for (var T = e.indexOf(t, r), k = e.indexOf(i, r); ;) if ('"' != e[r]) if (o && 0 === B.length && e.substr(r, N) === o) {
if (-1 == k) return g();
r = k + y, k = e.indexOf(i, r), T = e.indexOf(t, r);
} else if (-1 !== T && (k > T || -1 === k)) B.push(e.substring(r, T)), r = T + C, 
T = e.indexOf(t, r); else {
if (-1 === k) break;
if (B.push(e.substring(r, k)), p(k + y), v && (u(), c)) return g();
if (s && S.length >= s) return g(!0);
} else {
var A = r;
for (r++; ;) {
if (-1 === (A = e.indexOf('"', A + 1))) return l || _.push({
type: "Quotes",
code: "MissingQuotes",
message: "Quoted field unterminated",
row: S.length,
index: r
}), m();
if (A === f - 1) {
return m(e.substring(r, A).replace(/""/g, '"'));
}
if ('"' != e[A + 1]) {
if (e[A + 1] == t) {
B.push(e.substring(r, A).replace(/""/g, '"')), r = A + 1 + C, T = e.indexOf(t, r), 
k = e.indexOf(i, r);
break;
}
if (e.substr(A + 1, y) === i) {
if (B.push(e.substring(r, A).replace(/""/g, '"')), p(A + 1 + y), T = e.indexOf(t, r), 
v && (u(), c)) return g();
if (s && S.length >= s) return g(!0);
break;
}
} else A++;
}
}
return m();
}, this.abort = function() {
c = !0;
}, this.getCharIndex = function() {
return r;
};
}
function h(e) {
var t = e.data, i = N[t.workerId], o = !1;
if (t.error) i.userError(t.error, t.file); else if (t.results && t.results.data) {
var n = {
abort: function() {
o = !0, l(t.workerId, {
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
if (g(i.userStep)) {
for (var s = 0; s < t.results.data.length && (i.userStep({
data: [ t.results.data[s] ],
errors: t.results.errors,
meta: t.results.meta
}, n), !o); s++) ;
delete t.results;
} else g(i.userChunk) && (i.userChunk(t.results, n, t.file), delete t.results);
}
t.finished && !o && l(t.workerId, t.results);
}
function l(e, t) {
var i = N[e];
g(i.userComplete) && i.userComplete(t), i.terminate(), delete N[e];
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
function p(e, t) {
return function() {
e.apply(t, arguments);
};
}
function g(e) {
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
return i.onmessage = h, i.id = v++, N[i.id] = i, i;
}();
return o.userStep = i.step, o.userChunk = i.chunk, o.userComplete = i.complete, 
o.userError = i.error, i.step = g(i.step), i.chunk = g(i.chunk), i.complete = g(i.complete), 
i.error = g(i.error), delete i.worker, void o.postMessage({
input: t,
config: i,
workerId: o.id
});
}
var r = null;
return "string" == typeof t ? r = i.download ? new n(i) : new a(i) : (e.File && t instanceof File || t instanceof Object) && (r = new s(i)), 
r.stream(t);
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
for (var a = 0; a < e.length; a++) a > 0 && (i += r), i += s(e[a], a);
t.length > 0 && (i += c);
}
for (var h = 0; h < t.length; h++) {
for (var l = o ? e.length : t[h].length, d = 0; l > d; d++) {
d > 0 && (i += r);
var m = o && n ? e[d] : d;
i += s(t[h][m], d);
}
h < t.length - 1 && (i += c);
}
return i;
}
function s(e, t) {
if ("undefined" == typeof e || null === e) return "";
e = e.toString().replace(/"/g, '""');
return "boolean" == typeof a && a || a instanceof Array && a[t] || function(e, t) {
for (var i = 0; i < t.length; i++) if (e.indexOf(t[i]) > -1) return !0;
return !1;
}(e, S.BAD_DELIMITERS) || e.indexOf(r) > -1 || " " == e.charAt(0) || " " == e.charAt(e.length - 1) ? '"' + e + '"' : e;
}
var a = !1, r = ",", c = "\r\n";
if ("object" == ("undefined" == typeof t ? "undefined" : o(t)) && ("string" == typeof t.delimiter && 1 == t.delimiter.length && -1 == S.BAD_DELIMITERS.indexOf(t.delimiter) && (r = t.delimiter), 
("boolean" == typeof t.quotes || t.quotes instanceof Array) && (a = t.quotes), "string" == typeof t.newline && (c = t.newline)), 
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
S.RemoteChunkSize = 5242880, S.DefaultDelimiter = ",", S.Parser = c, S.ParserHandle = r, 
S.NetworkStreamer = n, S.FileStreamer = s, S.StringStreamer = a, "undefined" != typeof t && t.exports ? t.exports = S : g(e.define) && e.define.amd ? define(function() {
return S;
}) : e.Papa = S, e.jQuery) {
var _ = e.jQuery;
_.fn.parse = function(t) {
function i() {
if (0 != a.length) {
var e = a[0];
if (g(t.before)) {
var i = t.before(e.file, e.inputElem);
if ("object" == ("undefined" == typeof i ? "undefined" : o(i))) {
if ("abort" == i.action) return void function(e, i, o, n) {
g(t.error) && t.error({
name: e
}, i, o, n);
}("AbortError", e.file, e.inputElem, i.reason);
if ("skip" == i.action) return void n();
"object" == o(i.config) && (e.instanceConfig = _.extend(e.instanceConfig, i.config));
} else if ("skip" == i) return void n();
}
var s = e.instanceConfig.complete;
e.instanceConfig.complete = function(t) {
g(s) && s(t, e.file, e.inputElem), n();
}, S.parse(e.file, e.instanceConfig);
} else g(t.complete) && t.complete();
}
function n() {
a.splice(0, 1), i();
}
var s = t.config || {}, a = [];
return this.each(function() {
if (!("INPUT" == _(this).prop("tagName").toUpperCase() && "file" == _(this).attr("type").toLowerCase() && e.FileReader) || !this.files || 0 == this.files.length) return !0;
for (var t = 0; t < this.files.length; t++) a.push({
file: this.files[t],
inputElem: this,
instanceConfig: _.extend({}, s)
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
s.prototype = Object.create(i.prototype), s.prototype.constructor = s, a.prototype = Object.create(a.prototype), 
a.prototype.constructor = a;
}("undefined" != typeof window ? window : void 0);
cc._RF.pop();
}, {} ],
updatePanel: [ function(e, t, i) {
"use strict";
cc._RF.push(t, "19d30eyFLFFmLkecKPHX2ZP", "updatePanel");
cc.Class({
extends: cc.Component,
properties: {
progressNode: {
type: cc.Node,
default: null
},
btnUpdate: {
type: cc.Node,
default: null
},
gressNode: {
type: cc.Node,
default: null
},
contentFishN: {
type: cc.Node,
default: null
},
contentN: {
type: cc.Node,
default: null
},
content: {
type: cc.Label,
default: null
},
tipsNode: {
type: cc.Node,
default: null
},
sizeNode: {
type: cc.Node,
default: null
},
checkingUpdate: {
type: cc.Node,
default: null
}
},
onLoad: function() {
this.gressLabel = this.gressNode.getComponent(cc.Label);
this.progressBar = this.progressNode.getComponent(cc.ProgressBar);
this.animation = this.node.getComponent(cc.Animation);
this.clips = this.animation.getClips();
if (fun.releaseType.fisher) {
this.contentFishN.active = !0;
this.contentN.setPositionY(this.contentN.getPositionY() - 40);
}
},
onEnable: function() {
this.animation.play(this.clips[0].name);
},
onDisable: function() {
this.animation.play(this.clips[1].name);
},
setVersionContent: function(e, t) {
this.content.string = e[0].replace(/\\n/g, "\n");
this.updateCb = t;
this.btnUpdate.active = !0;
this.btnUpdate.once("click", this.onBtnUpdateClick, this);
this.checkingUpdate.active = !1;
},
setSourceSize: function(e) {
this.tipsNode.active = !1;
this.gressNode.active = !0;
this.sizeNode.active = !0;
var t = e.toFixed(2), i = this.sizeNode.getChildByName("content");
i.getComponent(cc.Label).string = t;
this.sizeNode.getChildByName("end").setPositionX(i.getPositionX() + i.getContentSize().width + 5);
},
onBtnUpdateClick: function() {
e("Audio").playEffect("hall", "button_nomal.mp3");
this.updateCb && this.updateCb();
this.tipsNode.active = !0;
this.progressNode.active = !0;
this.btnUpdate.active = !1;
},
updateProgress: function() {
var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
this.progressBar.progress = e;
var t = (100 * e).toFixed(2) + "%";
"NaN%" === t && (t = "0%");
this.gressLabel.string = t;
}
});
cc._RF.pop();
}, {
Audio: "Audio"
} ]
}, {}, [ "papaparse.min", "Adefind", "Boom", "BoomEffect", "Diamond", "GameRes", "GameTouch", "Hall", "Ice", "Login", "Map", "Monster", "MonsterBrith", "Player", "PlayerSkill", "RoleChoice", "SceneManager", "Setting", "Slime", "Trigger", "Audio", "Popup", "Utils", "funCsv", "hotUpdate", "updatePanel" ]);