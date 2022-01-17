const funCsv = require("./funCsv");
const GameRes = require("./GameRes");
const Guide = require("./Guide");

const GoalMap = {
    2: "white",
    3: "green",
    4: "blue",
    5: "purple",
    6: "orange",
    7: "red",
    8: "type1",
    9: "type2",
    10: "venom",
    11: "ice",
};

const MAXGUIDEPAGE = 5;

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
        SettingPre: cc.Prefab,
    },


    onLoad () {

        utils.init();
        popup.init();
        Guide.getInstance(this);
        let music = "BGM_Area_" + Math.ceil(cc.YL.loadMapStage / 10);
        if (cc.YL.loadMapStage < 1) {
            music = "BGM_Area_1";
        }
        audio.playMusic(music);
        this.monsterDelay = 1000;
        this.diamondPosArr = [];

        this.mapUrl = "Map/stage_" + cc.YL.loadMapStage;
        if (cc.YL.loadMapStage < 1) {
            this.mapUrl = "Map/stage_0_" + cc.YL.GuideMap;
        } else {
            cc.YL.FirstEnter = false;
        }
        this._initUI();
        this._loadMap();
        cc.YL.offsetY = 64;
        cc.YL.SpliterList = []; // 粘液哥布林感染的地块砖石列表
        cc.YL.IsCanMove = true;
        cc.YL.slimeDiamondArr = [];
        cc.YL.iceDiamondArr = [];
        cc.YL.isClickPause = false;
    },

    start () {

    },

    update (dt) {

    },

    _initUI() {
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
        this.clickBlock.zIndex = 10000;
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
            ice: 0,
        };
        if (cc.YL.loadMapStage < 1) {
            this.clickBlock.active = true;
            return;
        }
        this.stageTime = cc.YL.CurrStageCfg.INT_Time;
        this.limitNode.getChildByName("num").getComponent(cc.Label).string = utils.transTimeFormat(this.stageTime, true);
        const goals = this.miniGoal.children;
        for (let i = 2; i < goals.length; ++i) {
            const condition = parseInt(cc.YL.CurrStageCfg["INT_Condition_" + (i - 1)]);
            if (condition) {
                goals[i].active = true;
                const str = "Stage_Target_" + condition;
                const target = goals[i].getChildByName("spr");
                target.getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[str.toUpperCase()];
                let desc = "0 / " + cc.YL.CurrStageCfg["INT_Count_" + (i - 1)];
                if (condition == 1) {
                    desc = "全部宝石";
                }
                goals[i].getChildByName("desc").getComponent(cc.Label).string = desc;
                const bg = this.miniGoal.getChildByName("bg");
                bg.width = 108 + (i - 2) * 94;
            } else {
                goals[i].active = false;
            }
        }
    },

    _loadMap: function () {//动态加载地图
        cc.loader.loadRes(this.mapUrl, cc.TiledMapAsset, function (err, tmxAsset) {
            if (err) {
                cc.log("err", err);
                return;
            }
            this.node.destroyAllChildren();
            var node = new cc.Node();
            node.name = "map";
            this.node.addChild(node);
            var tileMap = node.addComponent(cc.TiledMap);
            tileMap.tmxAsset = tmxAsset;
            this._initMap();
            cc.YL.isOver = false;
            cc.YL.isPause = false;
            this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Xiaosan", false);
        }.bind(this));
    },

    _initMap: function () {
        this.mapNode = this.node.getChildByName("map");
        this.mapNode.setAnchorPoint(0, 0);
        this.mapNode.setPosition(-(this.mapNode.width / 2), -(this.mapNode.height / 2));
        this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
        this.node.parent.getChildByName("TouchNode").width = this.mapNode.width;
        this.node.parent.getChildByName("TouchNode").height = this.mapNode.height;
        this.mapNode.getChildByName("all_top_2").zIndex = 900;//todo
        this.mapNode.getChildByName("all_top_1").zIndex = 899;
        //各种图层
        for (var i = 0; i < this.mapNode.children.length; i++) {
            this.mapNode.children[i].setAnchorPoint(0, 0);
        }
        this.background = this.tiledMap.getLayer('background');
        this.block = this.tiledMap.getLayer('block');
        this.diamond = this.tiledMap.getLayer('diamond');
        this.diamondFirstGID = this._findDiamondFirstGID();

        //players对象层
        this.playersInfo = this.tiledMap.getObjectGroup('player');
        this.monsterInfo = this.tiledMap.getObjectGroup('monster');
        this.triggerInfo = this.tiledMap.getObjectGroup('trigger');
        this.monsterArr = [];
        this.triggerArr = [];
        this.stoveArr = [];
        var startPosArr = this.playersInfo.getObjects();
        const originPos = startPosArr.find(function (item) {
            return item.name == "move_1";
        });
        this._initPlayerNode(cc.v2(originPos.x, originPos.y - cc.YL.offsetY));
        this._findDiamondPos();
        this._initDiamondAni();
        this._initTrigger();
        const coinJump = cc.instantiate(this.coinJump);
        this.mapNode.addChild(coinJump);
        this.coinJump = coinJump;
        this.coinJump.zIndex = 1002;
        this.playerDestPos = startPosArr.find(function (item) {
            return item.name == "move_3";
        });
        // console.log("创建地图的时候坐标",this.playerDestPos,originPos);
        this._gameInit();
    },

    _findDiamondFirstGID: function () {
        var size = this.tiledMap.getMapSize();
        var x = size.width;
        var y = size.height;
        var min = 1000;
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                var pos = cc.v2(0, 0);
                pos.x = i;
                pos.y = j;
                var GID = this.diamond.getTileGIDAt(pos);
                if (GID != 0) {
                    if (GID <= min) {
                        min = GID
                    }
                }
            }
        }
        return min;
    },

    _initDiamondAni: function () {
        // return;
        for (var i = 0; i < this.mapNode.children.length; i++) {
            if (this.mapNode.children[i].name == "Diamond") {
                this.mapNode.children[i].destroy();
            }
        }
        var size = this.tiledMap.getMapSize();
        var x = size.width;
        var y = size.height;
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                var pos = cc.v2(0, 0);
                pos.x = i;
                pos.y = j;
                var GID = this.diamond.getTileGIDAt(pos);
                if (GID != 0) {
                    this._showDiamond(pos, GID - this.diamondFirstGID, false)
                }
            }
        }
    },

    _showDiamond: function (pos, type, isAdd) {
        for (var i = 0; i < this.mapNode.children.length; i++) {
            if (this.mapNode.children[i].name == "Diamond"
                && this.mapNode.children[i].getComponent("Diamond").info.x == pos.x
                && this.mapNode.children[i].getComponent("Diamond").info.y == pos.y) {
                this.mapNode.children[i].getComponent("Diamond").show(pos, type, isAdd);
                return;
            }
        }
        var node = cc.instantiate(this.diamondNode);
        this.mapNode.addChild(node);
        node.getComponent("Diamond").show(pos, type, isAdd);
    },

    _deletedDiamond: function (tile) {
        for (var i = 0; i < this.mapNode.children.length; i++) {
            if (this.mapNode.children[i].name == "Diamond") {
                if (this.mapNode.children[i].getComponent("Diamond").info.x
                    == tile.x &&
                    this.mapNode.children[i].getComponent("Diamond").info.y
                    == tile.y) {
                    this.mapNode.children[i].destroy();
                }
            }
        }
    },

    _findDiamondPos: function () {
        var size = this.tiledMap.getMapSize();
        this.diamondPosArr = [];
        var x = size.width;
        var y = size.height;
        for (var i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                var pos = cc.v2(0, 0);
                pos.x = i;
                pos.y = j;
                var GID = this.diamond.getTileGIDAt(pos);
                if (GID - this.diamondFirstGID == 0) {
                    this.diamondPosArr.push({type: GID - this.diamondFirstGID, pos: pos});
                }
            }
        }
    },

    _initPlayerNode: function (pos) {
        this.playerNode = this.mapNode.getChildByName("playerNode") ?
            this.mapNode.getChildByName("playerNode") :
            cc.instantiate(this.playerNode);
        this.mapNode.getChildByName("playerNode") ?
            this.mapNode.getChildByName("playerNode") :
            this.mapNode.addChild(this.playerNode);
        this.playerNode.setPosition(pos);
    },

    _initTrigger() {
        const triggerPosArr = this.triggerInfo.getObjects();
        for (var i = 0; i < triggerPosArr.length; i++) {
            const trigger = cc.instantiate(this.triggerNode);
            trigger.getComponent("Trigger").idx = i;
            this.triggerArr.push(trigger);
            if (triggerPosArr[i].Type == 2) {
                this.stoveArr.push(trigger);
            }
        }
        if (this.stoveArr.length > 0) {
            const num = Math.floor(Math.random() * this.stoveArr.length) || 0;
            cc.YL.currStove = this.stoveArr[num].getComponent("Trigger").idx;
        }
        for (let i = 0; i < this.triggerArr.length; ++i) {
            this.mapNode.addChild(this.triggerArr[i]);
            this.triggerArr[i].getComponent("Trigger").initTrigger(triggerPosArr[i]);
        }
    },

    _gameInit() {
        cc.YL.playerTile = this.getTilePos(cc.v2(this.playerDestPos.x, this.playerDestPos.y));
        if (cc.YL.loadMapStage < 1) {
            this.node.parent.getChildByName("Pause").active = false;
            setTimeout(function () {
                Guide.getInstance().initOperateGuide();
                cc.YL.canTouch = true;
            }.bind(this), 500);
            return;
        }
        const guideStage = [1]; // 需要强制引导的关卡
        const farceGuide = guideStage.find(function (item) {
            return item == cc.YL.CurrStageCfg.INT_ID;
        });
        if (!farceGuide || cc.YL.GuideInfo[cc.YL.CurrStageCfg.INT_ID]) {
            // 当前关卡不需要强制引导 或 已经进行过强制引导
            this.showStageFlow();
        } else {
            // 当前关卡需要强制引导 且 还未进行过强制引导
            this.scoreNode.runAction(cc.moveTo(0.2, cc.v2(this.scoreNode.x, 796)).easing(cc.easeBackOut()));
            this.lifeNode.runAction(cc.moveTo(0.2, cc.v2(this.lifeNode.x, 796)).easing(cc.easeBackOut()));
            this.limitNode.runAction(cc.moveTo(0.2, cc.v2(this.limitNode.x, 796)).easing(cc.easeBackOut()));
            this.miniGoal.runAction(cc.moveTo(0.2, cc.v2(this.miniGoal.x, 796)).easing(cc.easeBackOut()));
            setTimeout(function () {
                Guide.getInstance().initNormalStageGuide();
            }.bind(this), 500);
        }
    },

    showStageFlow(isGuide) {
        const pos = cc.v2(this.playerDestPos.x, this.playerDestPos.y - cc.YL.offsetY);
        const story_path = cc.YL.CurrStageCfg.STR_Story;
        const guide = cc.YL.CurrStageCfg.STR_Guide;
        const delay = isGuide ? 0 : 500;
        if (story_path.length > 1) {
            if (cc.YL.CurrStageInfo.story == 1) {
                this.playerNode.setPosition(pos);
                if (guide.length <= 0 || cc.YL.CurrStageInfo.guide == 1) {
                    setTimeout(function () {
                        this._showStageGoal();
                    }.bind(this), delay);
                } else {
                    setTimeout(function () {
                        this._showGuide();
                    }.bind(this), delay);
                }
            } else {
                this._showStory();
            }
        } else if (guide.length > 0) {
            setTimeout(function () {
                this._showGuide();
            }.bind(this), delay);
        } else {
            setTimeout(function () {
                this._showStageGoal();
            }.bind(this), delay);
        }
    },

    _showStory() {
        const pos = cc.v2(this.playerDestPos.x, this.playerDestPos.y - cc.YL.offsetY);
        this.playerNode.runAction(cc.sequence(cc.moveTo(0.4, pos), cc.delayTime(0.5), cc.callFunc(function () {
            cc.YL.playerTile = this.getTilePos(cc.v2(this.playerDestPos.x, this.playerDestPos.y));
            const path = "Story/" + cc.YL.CurrStageCfg.STR_Story;
            funCsv.turnCsvToJson(path, function (story) {
                cc.YL.CurrStageInfo.story = 1;
                this.setStageStorage();
                this.storyInfo = story;
                let dialogue = this.node.parent.getChildByName("Dialogue");
                if (!dialogue) {
                    dialogue = cc.instantiate(this.DialoguePre);
                    dialogue.on('click', this.onStoryBlankClick, this);
                }
                utils.show(dialogue);
                const box = dialogue.getChildByName("box");
                const tips = dialogue.getChildByName("tips");
                box.opacity = 0;
                tips.opacity = 0;
                this.dialogueNum = 0;
                box.runAction(cc.fadeIn(0.2));
                tips.runAction(cc.fadeIn(0.2));
                this._showDialogue();
            }.bind(this));
        }.bind(this))));
    },

    _showDialogue() {
        const dialogue = this.node.parent.getChildByName("Dialogue");
        if (!dialogue) {
            return;
        }
        const len = funCsv.getJsonLength(this.storyInfo);
        if (this.dialogueNum >= len) {
            if (!this.closeStory) {
                this.closeStory = true;
                dialogue.active = false;
                this._showGuide();
            }
            return;
        }
        const box = dialogue.getChildByName("box");
        const left = box.getChildByName("left");
        const right = box.getChildByName("right");
        const tips = dialogue.getChildByName("tips");
        left.opacity = 0;
        right.opacity = 0;
        let dir = left;
        if (this.storyInfo[this.dialogueNum + 1].INT_Direction == 1) {
            dir = right;
        }
        dir.stopAllActions();
        const headUrl = this.storyInfo[this.dialogueNum + 1].STR_Head;
        dir.getChildByName("head").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[headUrl.toUpperCase()];
        const str = this.storyInfo[this.dialogueNum + 1].STR_Desc;
        dir.getChildByName("dialogue").getComponent(cc.RichText).string = str;
        let act = cc.sequence(cc.fadeIn(0.2), cc.delayTime(4),
            cc.callFunc(function () {
                this._showDialogue();
            }.bind(this))
        );
        dir.runAction(act);
        this.dialogueNum++;
    },

    _showGuide() {
        if (cc.YL.CurrStageCfg.STR_Guide.length > 0) {
            cc.YL.CurrStageInfo.guide = 1;
            this.setStageStorage();
            const dialogue = this.node.parent.getChildByName("Dialogue");
            if (dialogue) {
                dialogue.active = false;
            }
            let guide = this.node.parent.getChildByName("Guide");
            if (!guide) {
                guide = cc.instantiate(this.GuidePre);
                guide.getChildByName("box").getChildByName("btnPrev").on('click', this.onGuidePrevPageClick, this);
                guide.getChildByName("box").getChildByName("btnNext").on('click', this.onGuideNextPageClick, this);
                guide.getChildByName("box").getChildByName("btnStart").on('click', this.onGuideStartClick, this);
            }
            // const guideContent = guide.getChildByName("box").getChildByName("guideView").getChildByName("view").getChildByName("content");
            // for (let i = 0; i < MAXGUIDEPAGE; ++i) {
            //     const str = "Guide_" + cc.YL.CurrStageCfg.INT_ID + "_" + (i + 1);
            //     const guideSpr = GameRes.spriteFrame[str.toUpperCase()];
            //     const page = guideContent.getChildByName("page_" + (i + 1));
            //     if (guideSpr) {
            //         page.active = true;
            //         page.getComponent(cc.Sprite).spriteFrame = guideSpr;
            //     } else {
            //         page.removeFromParent();
            //         page.destroy();
            //     }
            // }
            const guideMap = {
                "Guide_NormalGoblin": ["bg", "player", "goblin_normal", "emoji"],
                "Guide_DiamonGoblin": ["bg", "diamond", "player", "goblin_white", "emoji"],
                "Guide_HeartSkill": ["bg", "player", "goblin_normal", "emoji", "ui", "action", "heart"],
                "Guide_MucusGoblin": ["bg", "diamond_normal", "diamond_venom", "player", "goblin_venom", "player_venom", "emoji"],
                "Guide_TriggerStove": ["bg", "trigger_stove", "player", "emoji", "ui"],
                "Guide_IceGoblin": ["bg", "diamond_normal", "diamond_ice", "player", "goblin_ice", "emoji"],
                "Guide_BombGoblin": ["bg", "boom_area", "boom", "player", "goblin_boom", "effect_boom", "emoji"],
                "Guide_TriggerBurrow": ["bg", "trigger_burrow", "player", "goblin_normal", "emoji", "ui"],
            };
            const guideSp = guide.getChildByName("box").getChildByName("guideSpine");
            const guideType = guideMap[cc.YL.CurrStageCfg.STR_Guide];
            if (guideType) {
                guideSp.getChildByName("bg").getComponent(sp.Skeleton).setCompleteListener(function () {
                    guide.getChildByName("box").getChildByName("btnStart").active = true;
                });
                for (let i = 0; i < guideType.length; ++i) {
                    guideSp.getChildByName(guideType[i]).active = true;
                    guideSp.getChildByName(guideType[i]).getComponent(sp.Skeleton).animation = cc.YL.CurrStageCfg.STR_Guide;
                    guideSp.getChildByName(guideType[i]).getComponent(sp.Skeleton).loop = false;
                }
            } else {
                guide.getChildByName("box").getChildByName("btnStart").active = true;
            }
            utils.open(guide);
        } else {
            this._showStageGoal();
        }
    },

    _showStageGoal() {
        let StageGoal = this.node.parent.getChildByName("StageGoal");
        if (!StageGoal) {
            StageGoal = cc.instantiate(this.StageGoalPre);
            StageGoal.on('click', this.onGoalBlankClick, this);
        }
        utils.show(StageGoal);
        const stageNum = StageGoal.getChildByName("box").getChildByName("stageNum");
        stageNum.getComponent(cc.Label).string = "第" + cc.YL.CurrStageCfg.INT_ID + "关";
        const descLab = StageGoal.getChildByName("box").getChildByName("desc");
        const t = utils.transTimeFormat(cc.YL.CurrStageCfg.INT_Time, true);
        descLab.getComponent(cc.Label).string = "在" + t + "内完成以下目标";
        const stars = StageGoal.getChildByName("box").getChildByName("rate").children;
        for (let i = 0; i < stars.length; ++i) {
            if (cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.star > i) {
                stars[i].getChildByName("reach").active = true;
            }
            const time = stars[i].getChildByName("time");
            const str = "INT_Star_" + (i + 1);
            time.getComponent(cc.Label).string = utils.transTimeFormat(cc.YL.CurrStageCfg[str], true);
            // time.getComponent(cc.Label).string = "剩余时间\n" + utils.transTimeFormat(cc.YL.CurrStageCfg[str], true);
        }
        const goals = StageGoal.getChildByName("box").getChildByName("goal").children;
        for (let i = 0; i < goals.length; ++i) {
            const condition = parseInt(cc.YL.CurrStageCfg["INT_Condition_" + (i + 1)]);
            if (condition) {
                goals[i].active = true;
                const str = "Stage_Target_" + condition;
                const target = goals[i].getChildByName("spr");
                target.getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[str.toUpperCase()];
                let desc = "x" + cc.YL.CurrStageCfg["INT_Count_" + (i + 1)];
                if (condition == 1) {
                    desc = "全部收集";
                }
                goals[i].getChildByName("desc").getComponent(cc.Label).string = desc;
            } else {
                goals[i].active = false;
            }
        }
    },

    _startCountdown() {
        if (cc.YL.loadMapStage < 1) {
            return;
        }
        this.schedule(this._gameCountdown, 1);
    },

    _gameCountdown() {
        if (this.stageTime >= 0) {
            this.limitNode.getChildByName("num").getComponent(cc.Label).string = utils.transTimeFormat(this.stageTime--, true);
        } else {

            this.playerNode.getComponent("Player").showStatus("Lose");
            this.stageFail(1);
            cc.log("时间结束");
        }
    },

    _stopCountdown() {
        this.unschedule(this._gameCountdown);
    },

    _loadMonsterBri: function () {
        if (!this.mapNode) {
            return;
        }
        // return;
        var monsterPosArr = this.monsterInfo.getObjects();
        // for (var i = 0; i < 1; i++) {
        for (var i = 0; i < monsterPosArr.length; i++) {
            var monsterNode = cc.instantiate(this.monsterBriNode);
            this.mapNode.addChild(monsterNode);
            monsterNode.name = "B" + i;
            monsterNode.getComponent("MonsterBrith").initMonster(monsterPosArr[i]);
        }
    },

    _showComplete() {
        if (this.playerNode.getComponent("Player").lifeNum <= 0 || this.stageTime < 0) {
            console.log("不满足关卡完成条件：玩家生命过低或时间结束");
            return;
        }
        let showUnlock;
        if (parseInt(cc.YL.CurrStageCfg.INT_ID) > cc.YL.ClearStage) {
            showUnlock = true;
            cc.YL.ClearStage = parseInt(cc.YL.CurrStageCfg.INT_ID);
            cc.sys.localStorage.setItem("currStage", JSON.stringify(cc.YL.CurrStageCfg.INT_ID));
        }
        this.stageTime += 1;        // 校准剩余时间
        const starTime1 = parseInt(cc.YL.CurrStageCfg.INT_Star_1);
        const starTime2 = parseInt(cc.YL.CurrStageCfg.INT_Star_2);
        const starTime3 = parseInt(cc.YL.CurrStageCfg.INT_Star_3);
        let starCount = 0;
        if (this.stageTime >= starTime3) {
            starCount = 3;
        } else if (this.stageTime >= starTime2 && this.stageTime < starTime3) {
            starCount = 2;
        } else if (this.stageTime >= starTime1) {
            starCount = 1;
        }
        if (starCount > cc.YL.CurrStageInfo.star) {
            cc.YL.CurrStageInfo.star = starCount;
        }
        if (this.stageTime > cc.YL.CurrStageInfo.time) {
            cc.YL.CurrStageInfo.time = this.stageTime;
        }
        let complete = this.node.parent.getChildByName("StageComplete");
        if (!complete) {
            complete = cc.instantiate(this.StageCompletePre);
        }
        const box = complete.getChildByName("box");
        const setBtnEnable = function (flag) {
            box.getChildByName("btnDouble").getComponent(cc.Button).interactable = flag;
            box.getChildByName("btnShare").getComponent(cc.Button).interactable = flag;
            box.getChildByName("btnReplay").getComponent(cc.Button).interactable = flag;
            box.getChildByName("btnNext").getComponent(cc.Button).interactable = flag;
            box.getChildByName("btnReceive").getComponent(cc.Button).interactable = flag;
            box.getChildByName("btnReturn").getComponent(cc.Button).interactable = flag;
            box.getChildByName("btnClose").getComponent(cc.Button).interactable = flag;
            complete.getChildByName("btnShow").getComponent(cc.Button).interactable = flag;
        };
        utils.show(complete);
        this._showUnlockRoleAndSkill(showUnlock);
        setBtnEnable(false);
        const playerSP = box.getChildByName("sp");
        const sp = playerSP.getChildByName("sp" + cc.YL.PlayerRole) || playerSP.getChildByName("sp1");
        sp.active = true;
        const stars = box.getChildByName("rate").children;
        for (let i = 0; i < stars.length; ++i) {
            const timeLab = stars[i].getChildByName("time");
            timeLab.getComponent(cc.Label).string = "剩余时间\n" + utils.transTimeFormat(cc.YL.CurrStageCfg["INT_Star_" + (i + 1)], true);
        }
        setTimeout(function () {
            this._showCompleteStars(starCount, setBtnEnable);
            this._showCompleteTime(starCount);
        }.bind(this), 500);
        const playerScore = this.playerNode.getComponent("Player").playerScore || 0;
        if (playerScore > cc.YL.CurrStageInfo.highScore) {
            cc.YL.CurrStageInfo.highScore = playerScore;
            // box.getChildByName("newRecord").active = true;
        }
        // const score = box.getChildByName("score");
        // const highScore = box.getChildByName("HighScore");
        // score.getComponent(cc.Label).string = "关卡得分:" + playerScore;
        // highScore.getComponent(cc.Label).string = "最高得分:" + cc.YL.CurrStageInfo.highScore;
        const award = box.getChildByName("award");
        const num = award.getChildByName("num");
        num.getComponent(cc.Label).string = "x" + playerScore;
        cc.YL.PlayerInfo.coin += playerScore;
        this.setStageStorage();
        box.getChildByName("btnDouble").on('click', this.onBtnDoubleClick, this);
        box.getChildByName("btnShare").on('click', this.onBtnShareClick, this);
        box.getChildByName("btnReplay").on('click', this.onBtnReplayClick, this);
        // if (parseInt(cc.YL.CurrStageCfg.INT_ID) >= cc.YL.UnlockPage * 10) {
        //     box.getChildByName("btnNext").getChildByName("lab").getComponent(cc.Label).string = "返回解锁关卡";
        //     box.getChildByName("btnNext").on('click', this.onBtnReturnClick, this);
        // } else {
        //     box.getChildByName("btnNext").on('click', this.onBtnNextClick, this);
        // }
        box.getChildByName("btnReceive").on('click', this._showCompleteCoinFly, this);
        box.getChildByName("btnReturn").on('click', this.onBtnReturnClick, this);
        box.getChildByName("btnClose").on('click', this.closeComplete, this);
        complete.getChildByName("btnShow").on('click', this.showComplete, this);
        const settle = box.getChildByName("Settle");
        this._initSettle(settle);
    },

    _showUnlockRoleAndSkill(show) {
        const complete = this.node.parent.getChildByName("StageComplete");
        if (!complete) {
            console.log("未找到通关节点");
            return;
        }
        if (!show) {
            return;
        }
        funCsv.turnCsvToJson('Csv/player', function (csvJson) {
            for (let i in csvJson) {
                if (csvJson[i].INT_UnlockMission == cc.YL.CurrStageCfg.INT_ID) {
                    const role = complete.getChildByName("unlockRole");
                    role.active = true;
                    const head = role.getChildByName("spr");
                    head.getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[csvJson[i].STR_Head.toUpperCase()];
                    const desc = role.getChildByName("lab");
                    desc.getComponent(cc.Label).string = csvJson[i].STR_UnlockDesc;
                    break;
                }
            }
        }.bind(this));
        funCsv.turnCsvToJson('Csv/skill', function (csvJson) {
            for (let i in csvJson) {
                if (csvJson[i].INT_LockStage == cc.YL.CurrStageCfg.INT_ID) {
                    const skill = complete.getChildByName("unlockSkill");
                    skill.active = true;
                    const spr = skill.getChildByName("spr");
                    const str = "Skill_" + csvJson[i].INT_Type;
                    spr.getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[str.toUpperCase()];
                    const desc = skill.getChildByName("lab");
                    desc.getComponent(cc.Label).string = csvJson[i].STR_Desc;
                    break;
                }
            }
        }.bind(this));
    },

    _showCompleteStars(starCount, setBtnEnable) {
        const complete = this.node.parent.getChildByName("StageComplete");
        if (!complete) {
            console.log("未找到通关节点");
            return;
        }
        const box = complete.getChildByName("box");
        const func = function (idx) {
            box.stopAllActions();
            if (idx >= starCount) {
                if (setBtnEnable) {
                    setBtnEnable(true);
                }
                Guide.getInstance().showCompleteGuide();
                return;
            }
            const stars = box.getChildByName("rate").children;
            const reach = stars[idx].getChildByName("reach");
            reach.scale = 1.5;
            reach.opacity = 0;
            reach.active = true;
            idx++;
            box.runAction(cc.sequence(
                cc.spawn(cc.sequence(cc.scaleTo(0.1, 0.95), cc.scaleTo(0.1, 1)),
                    cc.callFunc(function () {
                        reach.runAction(cc.spawn(cc.scaleTo(0.2, 1).easing(cc.easeBackInOut()), cc.fadeIn(0.2)))
                    })
                ),
                cc.callFunc(function () {
                    func(idx);
                })
            ));
        }.bind(this);
        func(0);
    },

    _showCompleteTime(starCount) {
        const complete = this.node.parent.getChildByName("StageComplete");
        if (!complete) {
            console.log("未找到通关节点");
            return;
        }
        const box = complete.getChildByName("box");
        const leftTime = box.getChildByName("leftTime");
        const delay = starCount * 200 / this.stageTime;
        for (let i = 0; i < this.stageTime; ++i) {
            setTimeout(function () {
                if (!leftTime) {
                    return;
                }
                leftTime.getComponent(cc.Label).string = i + "秒";
            }, delay * i);
        }
    },

    _showCompleteCoinFly() {
        this.clickBlock.active = true;
        audio.playEffect('UI_Button');
        const complete = this.node.parent.getChildByName("StageComplete");
        if (!complete) {
            console.log("未找到通关节点");
            return;
        }
        const playerScore = this.playerNode.getComponent("Player").playerScore || 0;
        if (playerScore > 0) {
            const box = complete.getChildByName("box");
            const coinFly = box.getChildByName("coinFly");
            const award = box.getChildByName("award");
            const num = award.getChildByName("num");
            coinFly.active = true;
            coinFly.getComponent(sp.Skeleton).setCompleteListener(function () {
                coinFly.getComponent(sp.Skeleton).animation = null;
                coinFly.active = false;
                complete.active = false;
                this.cloud.getComponent(sp.Skeleton).setCompleteListener(function () {
                    cc.YL.SceneManager.LoadScene("Hall");
                });
                this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", false);
            }.bind(this));
            coinFly.getComponent(sp.Skeleton).setAnimation(0, "animation", false);
            const delay = 1000 / playerScore;
            for (let i = playerScore; i >= 0; --i) {
                setTimeout(function () {
                    num.getComponent(cc.Label).string = "x" + i;
                }, delay * (playerScore - i))
            }
        }
    },

    _initSettle(settle) {
        const settles = settle.children;
        for (let i = 0; i < settles.length; ++i) {
            const goal = this.stageGoal[settles[i].name];
            settles[i].getChildByName("count").getComponent(cc.Label).string = goal || 0;
        }
    },

    _showStageFail(type) {
        let fail = this.node.parent.getChildByName("StageFail");
        if (!fail) {
            fail = cc.instantiate(this.StageFailPre);
        }
        utils.show(fail);
        const box = fail.getChildByName("box");
        const playerSP = box.getChildByName("sp");
        const sp = playerSP.getChildByName("sp" + cc.YL.PlayerRole) || playerSP.getChildByName("sp1");
        sp.active = true;
        const tips = box.getChildByName("tips").getChildByName("lab");
        const life = box.getChildByName("btnContinue").getChildByName("life");
        const time = box.getChildByName("btnContinue").getChildByName("time");
        if (type == 1) {
            tips.getComponent(cc.Label).string = "时间不足!";
            life.active = false;
            time.active = true;
            time.getChildByName("lab").getComponent(cc.Label).string = "+" + cc.YL.CurrStageCfg.INT_Star_1;
        } else if (type > 1) {
            box.getChildByName("btnReplay").x = 0;
            const failMap = {
                2: "白色宝石",
                3: "绿色宝石",
                4: "蓝色宝石",
                5: "紫色宝石",
                6: "橙色宝石",
                7: "红色宝石",
                10: "毒液",
                11: "冰块",
            };
            tips.getComponent(cc.Label).string = "没有更多" + (failMap[type] || "") + "可收集";
            // tips.getComponent(cc.Label).string = "过关目标未达成";
        } else {
            // tips.getComponent(cc.Label).string = "分享后立即获得1点生命，继续游戏";
            tips.getComponent(cc.Label).string = "生命不足!";
            life.active = true;
            time.active = false;
        }
        box.getChildByName("btnReplay").on('click', this.onBtnReplayClick, this);
        box.getChildByName("btnContinue").on('click', this.onBtnContinueClick, this);
        box.getChildByName("btnReturn").on('click', this.onBtnReturnClick, this);
        box.getChildByName("btnClose").on('click', this.closeFail, this);
        fail.getChildByName("btnShow").on('click', this.showFail, this);
        const settle = box.getChildByName("Settle");
        this._initSettle(settle);
    },

    PlayerMove: function (type) {
        this.playerNode.getComponent("Player").PlayerMove(type);
    },

    //将像素坐标转化为瓦片坐标
    getTilePos: function (posInPixel) {
        var mapSize = this.mapNode.getContentSize();
        var tileSize = this.tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        return cc.v2(x, y);
    },
    StopAllMap: function () {
        this.playerNode.stopAllActions();
        cc.YL.TouchMoveDir = "";
        for (var i = 0; i < this.mapNode.children.length; i++) {
            var first = this.mapNode.children[i].name.toString().slice(0, 1);
            var last = this.mapNode.children[i].name.toString().slice(-1);
            // cc.log(first,last, this.mapNode.children[i].name);
            this.mapNode.children[i].stopAllActions();
            if (first == "B" && last != "M") {
                if (this.mapNode.children[i].getComponent("MonsterBrith")) {
                    this.mapNode.children[i].getComponent("MonsterBrith").clearTime();
                }
            }
            if (first == "B" && last == "M") {
                if (this.mapNode.children[i].getComponent("Monster")) {
                    this.mapNode.children[i].getComponent("Monster").clearTime();
                }

            }
        }

    },
    PauseAllMap: function () {
        cc.YL.TouchMoveDir = "";
        cc.YL.isPause = true;
        this.playerNode.stopAllActions();
        for (var i = 0; i < this.mapNode.children.length; i++) {
            this.mapNode.children[i].stopAllActions();
            var first = this.mapNode.children[i].name.toString().slice(0, 1);
            var last = this.mapNode.children[i].name.toString().slice(-1);
            if (first == "B" && last == "M") {
                if (this.mapNode.children[i].getComponent("Monster")) {
                    this.mapNode.children[i].getComponent("Monster").clearTime();
                }

            }
        }
        // cc.game.pause();
    },
    ResumeAllMap: function () {
        this._startCountdown();
        cc.YL.isPause = false;
        this.playerNode.getComponent("Player").removeFunc();
        this.playerNode.getComponent("Player").goOnEffect();
        for (var i = 0; i < this.mapNode.children.length; i++) {
            // this.mapNode.children[i].resumeAllActions();
            var first = this.mapNode.children[i].name.toString().slice(0, 1);
            var last = this.mapNode.children[i].name.toString().slice(-1);
            if (first == "B" && last == "M") {
                if (this.mapNode.children[i].getComponent("Monster")) {
                    this.mapNode.children[i].getComponent("Monster")._monsterReStart();
                    if (this.mapNode.children[i].getComponent("Monster")._underAttack == true
                        && this.mapNode.children[i].getComponent("Monster").isIce == true
                        && this.iceTimeOver == true) {
                        this.mapNode.children[i].getComponent("Monster").removeIceAttacked();
                    }

                }
            }
        }
        // cc.game.resume();
    },

    setStageStorage() {
        const idx = cc.YL.StageInfo.findIndex(function (item) {
            return item.id == cc.YL.CurrStageInfo.id;
        });
        if (idx >= 0) {
            cc.YL.StageInfo.splice(idx, 1, cc.YL.CurrStageInfo);
        } else {
            cc.YL.StageInfo.push(cc.YL.CurrStageInfo);
        }
        cc.sys.localStorage.setItem("stageInfo", JSON.stringify(cc.YL.StageInfo));
        let stars = 0;
        for (let i = 0; i < cc.YL.StageInfo.length; ++i) {
            stars += cc.YL.StageInfo[i].star;
        }
        cc.YL.PlayerInfo.stars = stars || cc.YL.PlayerInfo.stars;
        cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
    },

    checkStageStatus(goalId) {
        /*
         condition  desc
         1          全部收集
         2          白色指定数量
         3          绿色指定数量
         4          蓝色指定数量
         5          紫色指定数量
         6          橙色指定数量
         7          红色指定数量
         8          开启指定机关数量
         9          摧毁指定机关数量
         10         毒液指定数量
         11         冰冻指定数量
         */
        if (GoalMap[goalId]) {
            this.stageGoal[GoalMap[goalId]]++;
        }
        if (cc.YL.loadMapStage > 0) {
            this.checkStageGoal();
        } else {
            const diamondCount = this._getDiamondCount();
            if (diamondCount == 0) {
                cc.YL.OperateIdx++;
                Guide.getInstance().showGuideDialogue();
            }
        }
    },

    checkStageGoal() {
        let goalReach = true;
        for (let i = 1; i < 4; ++i) {
            const goal = cc.YL.CurrStageCfg["INT_Condition_" + i];
            const count = cc.YL.CurrStageCfg["INT_Count_" + i];
            if (goal) {
                this.diamondCount = this._getDiamondCount();
                if (goal == 1 && this.diamondCount > 0) {
                    goalReach = false;
                } else {
                    let goalCount = 0;
                    if (GoalMap[parseInt(goal)]) {
                        goalCount = this.stageGoal[GoalMap[parseInt(goal)]] || 0;
                    }
                    const miniGoal = this.miniGoal.getChildByName("goal" + i);
                    if (goalCount < count) {
                        // // 所有宝石拾取完之后的目标判断
                        // if ((goal < 8 || goal > 9) && diamondCount <= 0) {
                        //     this.stageFail(2);
                        //     return;
                        // }
                        // 计算目标宝石的可能性
                        const failType = this._checkDiamondCount(goal, count);
                        if (failType) {
                            this.stageFail(parseInt(failType));
                            return;
                        }
                        goalReach = false;
                        if (miniGoal) {
                            miniGoal.getChildByName("desc").active = true;
                            miniGoal.getChildByName("ok").active = false;
                            miniGoal.getChildByName("desc").getComponent(cc.Label).string = goalCount + " / " + count;
                        }
                    } else {
                        if (miniGoal) {
                            miniGoal.getChildByName("desc").active = false;
                            miniGoal.getChildByName("ok").active = true;
                        }
                    }
                }
            }
        }
        if (goalReach) {
            this.playerNode.getComponent("Player").showStatus("Stand");
            this.stageComplete();
        }
    },

    _getDiamondCount() {
        const size = this.tiledMap.getMapSize();
        const x = size.width;
        const y = size.height;
        let diamondCount = 0;
        this.whiteDiamond = 0;
        this.greenDiamond = 0;
        this.blueDiamond = 0;
        this.purpleDiamond = 0;
        this.orangeDiamond = 0;
        this.redDiamond = 0;
        this.venomDiamond = 0;
        this.iceDiamond = 0;
        for (let i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                var pos = cc.v2(0, 0);
                pos.x = i;
                pos.y = j;
                var GID = this.diamond.getTileGIDAt(pos);
                if (GID != 0) {
                    diamondCount++;
                }
                // 查找不同颜色的宝石
                switch (GID - this.diamondFirstGID) {
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
                        break;
                }
            }
        }
        // 查找毒液和冰冻宝石
        for (var i = 0; i < this.mapNode.children.length; i++) {
            const unit = this.mapNode.children[i];
            if (unit.name == "Diamond") {
                if (unit.getChildByName("Slime").active) {
                    this.venomDiamond++;
                } else if (unit.getChildByName("Ice").active) {
                    this.iceDiamond++;
                }
            }
        }
        return diamondCount;
    },

    _checkDiamondCount(goal, count) {
        if (goal == 8 || goal == 9) {
            return null;
        }
        // 地图上的宝石种类及数量
        const diamondMap = {
            2: this.whiteDiamond,
            3: this.greenDiamond,
            4: this.blueDiamond,
            5: this.purpleDiamond,
            6: this.orangeDiamond,
            7: this.redDiamond,
            10: this.venomDiamond,
            11: this.iceDiamond,
        };
        let w = this.whiteDiamond;
        let g = this.greenDiamond;
        let b = this.blueDiamond;
        let p = this.purpleDiamond;
        let o = this.orangeDiamond;
        let r = this.redDiamond;
        // 当前拾取到的宝石种类
        switch (cc.YL.currCatch) {
            case 0:
                w += 1;
                break;
            case 1:
                g += 1;
                break;
            case 2:
                b += 1;
                break;
            case 3:
                p += 1;
                break;
            case 4:
                o += 1;
                break;
            case 5:
                r += 1;
                break;
        }
        // 地图上所有宝石全部转换成白色宝石
        const originMap = {
            2: w,
            3: g * 3,
            4: b * 7,
            5: p * 15,
            6: o * 31,
            7: r * 63,
        };
        // 根据当前目标 计算低于目标宝石的白色宝石总数
        let originW = 0;
        for (let i in originMap) {
            if (i < goal) {
                originW += originMap[i];
            }
        }
        // 白色宝石生成高级宝石要消耗的数量
        const consumeMap = {3: 3, 4: 7, 5: 15, 6: 31, 7: 63,};
        // 基础白色用以生成高级宝石 单独记录
        let unitW = this.whiteDiamond;
        let goalCount = 0;
        if (goal > 2 && goal < 10) {
            while (unitW > 0 && originW >= consumeMap[goal]) {
                originW -= consumeMap[goal];
                unitW--;
                goalCount++;
            }
        } else if (goal == 10) {
            goalCount = this.diamondCount - this.iceDiamond;
        } else if (goal == 11) {
            goalCount = this.diamondCount - this.venomDiamond;
        }
        // 地图上现有的宝石 + 可转化的宝石 + 已收集的宝石 < 关卡目标 即关卡失败
        if (diamondMap[goal] + goalCount + (this.stageGoal[GoalMap[parseInt(goal)]] || 0) < parseInt(count)) {
            return goal;
        }
        return null;
    },

    stageComplete(){
        if (cc.YL.isOver == true) {
            return;
        }
        cc.YL.isOver = true;
        audio.playEffect('UI_WinFrame');
        this.PauseAllMap();
        this._stopCountdown();
        this._showComplete();
    },

    stageFail(type) {
        if (cc.YL.isOver == true) {
            return;
        }
        cc.YL.isOver = true;
        audio.playEffect('UI_LoseFrame');
        this.PauseAllMap();
        this._stopCountdown();
        this._showStageFail(type);
    },

    onStoryBlankClick() {
        this._showDialogue();
    },

    onGuidePrevPageClick() {
        const guide = this.node.parent.getChildByName("Guide");
        const guideView = guide.getChildByName("box").getChildByName("guideView").getComponent(cc.PageView);
        const currPage = guideView.getCurrentPageIndex();
        const idx = currPage - 1 < 0 ? 0 : currPage - 1;
        guideView.scrollToPage(idx);
    },

    onGuideNextPageClick() {
        const guide = this.node.parent.getChildByName("Guide");
        const guideView = guide.getChildByName("box").getChildByName("guideView").getComponent(cc.PageView);
        const currPage = guideView.getCurrentPageIndex();
        const idx = currPage + 1 >= guideView.getPages().length ? guideView.getPages().length - 1 : currPage + 1;
        guideView.scrollToPage(idx);
    },

    onGuideStartClick() {
        const guide = this.node.parent.getChildByName("Guide");
        if (guide) {
            guide.active = false;
        }
        this._showStageGoal();
    },

    onGoalBlankClick() {
        if (this.monsterBrith) {
            return;
        }
        this.monsterBrith = true;
        const stageGoal = this.node.parent.getChildByName("StageGoal");
        if (stageGoal) {
            utils.hide(stageGoal);
        }
        this.scoreNode.stopAllActions();
        this.lifeNode.stopAllActions();
        this.limitNode.stopAllActions();
        this.miniGoal.stopAllActions();
        this.scoreNode.runAction(cc.moveTo(0.2, cc.v2(this.scoreNode.x, 796)).easing(cc.easeBackOut()));
        this.lifeNode.runAction(cc.moveTo(0.2, cc.v2(this.lifeNode.x, 796)).easing(cc.easeBackOut()));
        this.limitNode.runAction(cc.moveTo(0.2, cc.v2(this.limitNode.x, 796)).easing(cc.easeBackOut()));
        this.miniGoal.runAction(cc.moveTo(0.2, cc.v2(this.miniGoal.x, 796)).easing(cc.easeBackOut()));
        this._startCountdown();
        cc.YL.canTouch = true;
        setTimeout(function () {
            this._loadMonsterBri();
        }.bind(this), this.monsterDelay);
    },

    onBtnPauseClick: function () {
        audio.playEffect('UI_Button');

        this.PauseAllMap();
        this._stopCountdown();
        cc.YL.isClickPause = true;
        let setting = this.node.parent.getChildByName("Setting");
        if (!setting) {
            setting = cc.instantiate(this.SettingPre);
        }
        utils.show(setting);
    },

    onBtnDoubleClick() {
        //todo
        audio.playEffect('UI_Button');
    },

    onBtnShareClick() {
        //todo
        audio.playEffect('UI_Button');
    },

    onBtnReplayClick(event) {
        audio.playEffect('UI_Button');
        const fun = function () {
            cc.find("Canvas/ClickBlock").active = true;
            if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
                cc.YL.EnergyInfo.curr--;
                cc.YL.EnergyInfo.lastTime = Date.now();
                utils.startEnergyRecover(true);
            } else {
                cc.YL.EnergyInfo.curr--;
            }
            cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
            cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
            const energy = event.target.getChildByName("energy");
            energy.active = true;
            energy.opacity = 0;
            energy.y = 15;
            energy.runAction(cc.sequence(
                cc.spawn(
                    cc.fadeIn(0.2),
                    cc.moveBy(0.5, 0, 70)
                ),
                cc.fadeOut(0.2),
                cc.callFunc(function () {
                    const complete = this.node.parent.getChildByName("StageComplete");
                    if (complete) {
                        complete.active = false;
                    }
                    const fail = this.node.parent.getChildByName("StageFail");
                    if (fail) {
                        fail.active = false;
                    }
                    cc.YL.SceneManager.LoadScene("Map");
                }.bind(this))
            ));
        }.bind(this);
        utils.checkEnergyAndAd(fun);
    },

    onBtnNextClick() {
        audio.playEffect('UI_Button');
        const complete = this.node.parent.getChildByName("StageComplete");
        if (complete) {
            const box = complete.getChildByName("box");
            const leftTime = box.getChildByName("leftTime");
            box.stopAllActions();
            leftTime.stopAllActions();
            complete.active = false;
        }
        cc.YL.loadMapStage += 1;
        const stageCsv = cc.YL.StageConfig[cc.YL.loadMapStage];
        if (stageCsv) {
            cc.YL.CurrStageCfg = stageCsv;
            cc.YL.CurrStageInfo = cc.YL.StageInfo.find(function (item) {
                return item.id == cc.YL.loadMapStage;
            });
            if (!cc.YL.CurrStageInfo) {
                cc.YL.CurrStageInfo = {
                    id: cc.YL.CurrStageCfg.INT_ID,    // 第几关
                    story: 0,     // 剧情状态，0：未播放， 1：已播放
                    guide: 0,       // 引导状态，0：未播放，1：已播放
                    star: 0,            // 评星
                    highScore: 0,       // 最高分
                    time: 0,            // 剩余时间
                };
            }
        }
        if (cc.YL.loadMapStage > funCsv.getJsonLength(cc.YL.StageConfig)) {
            popup.show({
                str: "恭喜全部通关！", confirm: function () {
                    cc.YL.SceneManager.LoadScene("Hall");
                }
            })
        } else {
            cc.YL.SceneManager.LoadScene("Map");
        }
    },

    onBtnContinueClick() {
        audio.playEffect('UI_Button');
    },

    onBtnReturnClick(event) {
        this.clickBlock.active = true;
        audio.playEffect('UI_Button');
        event.target.parent.parent.active = false;
        this.cloud.getComponent(sp.Skeleton).setCompleteListener(function () {
            cc.YL.SceneManager.LoadScene("Hall");
        });
        this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", false);
    },


    changeZIndex: function () {
        //510------700之间变化
        this.playerNode.zIndex = cc.YL.playerTile.y + 610;
        var isEqual = false;
        var equalNum = 0;
        for (var i = 0; i < this.mapNode.children.length; i++) {
            var first = this.mapNode.children[i].name.toString().slice(0, 1);
            var last = this.mapNode.children[i].name.toString().slice(-1);
            if (first == "B" && last == "M") {
                if (this.mapNode.children[i].getComponent("Monster")) {
                    this.mapNode.children[i].zIndex = this.getTilePos(this.mapNode.children[i]).y + 610;
                    if (this.mapNode.children[i].zIndex == this.playerNode.zIndex) {
                        isEqual = true;
                        equalNum = this.mapNode.children[i].zIndex
                    }
                }

            }
        }
        if (isEqual == true) {
            this.playerNode.zIndex = equalNum + 1;
        }

    },
    getDiamondNode: function (tilePos) {
        var mapSize = this.node.getChildByName("map").getContentSize();
        var tileSize = this.tiledMap.getTileSize();
        for (var i = 0; i < this.node.getChildByName("map").children.length; i++) {
            if (this.node.getChildByName("map").children[i].name == "Diamond"
                && this.node.getChildByName("map").children[i].x == tilePos.x * tileSize.width
                && this.node.getChildByName("map").children[i].y == mapSize.height - tileSize.height * (tilePos.y + 1)) {
                return this.node.getChildByName("map").children[i];
            }
        }
        return null;
    },

    closeComplete() {
        const complete = this.node.parent.getChildByName("StageComplete");
        if (!complete) {
            return;
        }
        const box = complete.getChildByName("box");
        box.stopAllActions();
        box.runAction(cc.moveTo(0.5, 0, -1550).easing(cc.easeBackInOut()));
    },

    showComplete() {
        const complete = this.node.parent.getChildByName("StageComplete");
        if (!complete) {
            return;
        }
        const box = complete.getChildByName("box");
        box.stopAllActions();
        box.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeBackInOut()));
    },

    closeFail() {
        const fail = this.node.parent.getChildByName("StageFail");
        if (!fail) {
            return;
        }
        const box = fail.getChildByName("box");
        box.stopAllActions();
        box.runAction(cc.moveTo(0.5, 0, -1550).easing(cc.easeBackInOut()));
    },

    showFail() {
        const fail = this.node.parent.getChildByName("StageFail");
        if (!fail) {
            return;
        }
        const box = fail.getChildByName("box");
        box.stopAllActions();
        box.runAction(cc.moveTo(0.5, 0, 0).easing(cc.easeBackInOut()));
    },
});
