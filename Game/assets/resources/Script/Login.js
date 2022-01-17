const GameRes = require("./GameRes");

cc.Class({
    extends: cc.Component,
    properties: {},

    onLoad () {
        utils.init();
        popup.init();
        this.bindNode();
        this.initLoginUI();
    },


    start: function () {
        this.getLocalPlayerInfo();
        this.getGameRes();
        this.initGameVolume();
        audio.playMusic("BGM_Login");
    },


    bindNode() {
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

    initLoginUI() {
        this.loginBtn.scale = 0.2;
        this.loginBtn.opacity = 0;
        this.loginBtn.active = false;
        this.loading.opacity = 0;
        this.loading.active = false;
        this.logo.y = 1100;
        this.sky.scale = 1.1;   // 1
        this.field.scale = 1.1;
        this.field.y = -630;    // -470
        this.road.scale = 1.1;         // -468
        this.road.y = -890;         // -468
        this.monster.scale = 1.1;
        this.monster.setPosition(-170, -760);       // -114 -280
        this.female.scale = 1.1;
        this.female.setPosition(-500, -435);       // -245 -290
        this.male.scale = 1.1;
        this.male.setPosition(555, -465);       // 200 -265
        this.flowerL.scale = 1.1;
        this.flowerL.setPosition(-410, -765);       // -311 -630
        this.flowerR.scale = 1.1;
        this.flowerR.setPosition(340, -745);       // 267 -610
    },

    getLocalPlayerInfo() {
        const playerRole = cc.sys.localStorage.getItem("playerRole");
        if (playerRole) {
            cc.YL.PlayerRole = playerRole;
        } else {
            cc.YL.PlayerRole = 1;
            cc.sys.localStorage.setItem("playerRole", cc.YL.PlayerRole);
        }
        // 玩家数据 待完善
        cc.YL.PlayerInfo = {
            stars: 0,
            coin: 0,
        };
        const playerStorage = cc.sys.localStorage.getItem("playerInfo");
        if (playerStorage) {
            cc.YL.PlayerInfo = JSON.parse(playerStorage);
        }
        cc.YL.SkillInfo = {Ice: 0, Heart: 0, Water: 0, Fire: 0};
        const skillStorage = cc.sys.localStorage.getItem("skillInfo");
        if (skillStorage) {
            cc.YL.SkillInfo = JSON.parse(skillStorage);
        }
        this.readStory = cc.sys.localStorage.getItem("readStory");
        cc.YL.GuideInfo = {};
        const guideStorage = cc.sys.localStorage.getItem("guideFinish");
        if (guideStorage) {
            cc.YL.GuideInfo = JSON.parse(guideStorage);
        }
        cc.YL.EnergyInfo = {
            curr: 12,   // 当前体力值
            lastTime: 0,    // 上一次恢复的时间
        };
        const energyStorage = cc.sys.localStorage.getItem("energyInfo");
        if (energyStorage) {
            cc.YL.EnergyInfo = JSON.parse(energyStorage);
        }
    },

    getGameRes() {
        this.loading.active = true;
        this.loading.runAction(cc.fadeIn(0.2));
        GameRes.getInstance(GameRes.ResTag.TEXTURE, function () {
            this.gameLoadFinish();
        }.bind(this), function (completedCount, totalCount) {
            this.updateProgress(completedCount, totalCount);
        }.bind(this));
    },

    initGameVolume() {
        cc.YL.muteMode = false;
        cc.YL.effectVolume = 0.8;
        cc.YL.musicVolume = 0.8;
        audio.getStorageVolume();
        audio.setEffectVolume(cc.YL.effectVolume);
        audio.setMusicVolume(cc.YL.musicVolume);
    },

    showFakeProgress() {
        // 模拟update更新progress进度 默认加载3s 3000 / 16 = 188
        for (let i = 0; i < 188; ++i) {
            setTimeout(function () {
                this.updateProgress((i + 1), 188);
            }.bind(this), i * 16)
        }
    },

    gameLoadFinish(delay) {
        const time = delay ? delay + 500 : 500;
        setTimeout(function () {
            // this.progressBar.active = false;
            this.runLoginAction();
            this._chargeHotUpdate();

        }.bind(this), time);
    },

    runLoginAction() {
        this.loading.stopAllActions();
        this.loading.runAction(cc.fadeOut(0.2));
        this.sky.stopAllActions();
        this.sky.runAction(cc.scaleTo(0.2, 1));
        this.logo.stopAllActions();
        this.logo.runAction(cc.moveTo(0.2, 0, 295));
        this.field.stopAllActions();
        this.field.runAction(cc.spawn(cc.scaleTo(0.2, 1), cc.moveTo(0.2, 0, -470)));
        this.road.stopAllActions();
        this.road.runAction(cc.spawn(cc.scaleTo(0.2, 1), cc.moveTo(0.2, 0, -468)));
        this.monster.stopAllActions();
        this.monster.runAction(cc.spawn(cc.scaleTo(0.2, 1), cc.moveTo(0.2, -114, -280)));
        this.female.stopAllActions();
        this.female.runAction(cc.spawn(cc.scaleTo(0.2, 1), cc.moveTo(0.2, -245, -290)));
        this.male.stopAllActions();
        this.male.runAction(cc.spawn(cc.scaleTo(0.2, 1), cc.moveTo(0.2, 200, -265)));
        this.flowerL.stopAllActions();
        this.flowerL.runAction(cc.spawn(cc.scaleTo(0.2, 1), cc.moveTo(0.2, -311, -630)));
        this.flowerR.stopAllActions();
        this.flowerR.runAction(cc.spawn(cc.scaleTo(0.2, 1), cc.moveTo(0.2, 267, -610)));
    },

    updateProgress(completedCount, totalCount) {
        // this.progressBar.getComponent(cc.ProgressBar).progress = completedCount / totalCount;
        this.loading.getComponent(cc.Label).string = "资源加载中(" + Math.floor(((completedCount / totalCount) || 0) * 100) + "%)";
    },

    _chargeHotUpdate: function () {
        if (!cc.sys.isNative) {
            setTimeout(function () {
                this.loginBtn.active = true;
                this.loginBtn.runAction(cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.2, 1).easing(cc.easeBackOut())));
            }.bind(this), 400);
        } else {
            setTimeout(function () {
                this.loginBtn.active = true;
                this.loginBtn.runAction(cc.spawn(cc.fadeIn(0.2), cc.scaleTo(0.2, 1).easing(cc.easeBackOut())));
            }.bind(this), 400);
        }

    },

    showStory() {
        this.storyPage.stopAllActions();
        if (this.storyPageNum > 3) {
            if (!this.closeStory) {
                this.closeStory = true;
                cc.YL.FirstEnter = true;
                this.storyPage.runAction(cc.fadeOut(0.5));
                // cc.YL.SceneManager.LoadScene("Hall");
                this.showGuideMap();
            }
            return;
        }
        this.story.active = true;
        this.storyPage.opacity = 0;
        const str = "Manga_" + this.storyPageNum;
        this.storyPage.getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[str.toUpperCase()];
        let act = cc.sequence(
            cc.fadeIn(0.5), cc.delayTime(4), cc.fadeOut(0.5),
            cc.callFunc(function () {
                this.showStory();
            }.bind(this))
        );
        if (this.storyPageNum == 3) {
            act = cc.sequence(
                cc.fadeIn(0.5), cc.delayTime(4),
                cc.callFunc(function () {
                    this.showStory();
                }.bind(this))
            );
        }
        this.storyPage.runAction(act);
        this.storyPageNum++;
    },

    showGuideMap() {
        cc.YL.loadMapStage = 0;
        cc.YL.GuideMap = 1;
        cc.YL.SceneManager.LoadScene("Map");
    },

    onClickLoginBtn: function () {
        audio.playEffect('UI_Button');
        if (this.readStory) {
            if (!cc.YL.GuideInfo[0]) {
                this.showGuideMap();
            } else {
                cc.YL.SceneManager.LoadScene("Hall");
            }
            return;
        }
        this.storyPageNum = 1;
        this.showStory();
        cc.sys.localStorage.setItem("readStory", 1);
    },

    onBtnReadStoryClick() {
        this.showStory();
    },
});
