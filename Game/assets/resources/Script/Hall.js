const funCsv = require("./funCsv");
const GameRes = require("./GameRes");
const Guide = require("./Guide");

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
        DialoguePre: cc.Prefab,
    },

    onLoad() {
        utils.init();
        popup.init();
        audio.playMusic("BGM_Main");
        this.bindNode();
        this.cloud.x = 0;
        funCsv.turnCsvToJson('Csv/stage', function (csvJson) {
            cc.YL.loadMapStage = -1;
            cc.YL.StageConfig = csvJson;
            this.initUI();
            this.loadCurRole();
        }.bind(this));
        this.initAdCount();
        this.initEnergy();
    },

    bindNode() {
        this.cloud = this.node.getChildByName("Cloud");
        this.stageView = this.node.getChildByName("stageView");
        this.stageContent = this.stageView.getChildByName("content");
        this.stars = this.node.getChildByName("Stars");
        this.coin = this.node.getChildByName("Coin");
        this.energy = this.node.getChildByName("Energy");
        this.treasure = this.node.getChildByName("Box");
        this.block = this.node.getChildByName("ClickBlock");
        this.block.zIndex = 10000;
    },

    initUI() {
        this.stars.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.stars;
        this.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
        funCsv.turnCsvToJson('Csv/area', function (csvJson) {
            cc.YL.PageConfig = csvJson;
            this.getLocalData();
            this.addStagePart();
            if (cc.YL.FirstEnter) {
                this.node.getChildByName("GuideCover").active = true;
            }
            this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Xiaosan", false);
        }.bind(this));
        funCsv.turnCsvToJson('Csv/goblinbox', function (csvJson) {
            cc.YL.TreasureCfg = csvJson;
            cc.YL.TreasureIdx = 0;
            let treasureIdx = cc.sys.localStorage.getItem("treasureIdx");
            if (treasureIdx) {
                cc.YL.TreasureIdx = JSON.parse(treasureIdx);
            }
            const goalCfg = csvJson[cc.YL.TreasureIdx + 1];
            if (goalCfg) {
                if (cc.YL.PlayerInfo.stars >= parseInt(goalCfg.INT_NeedStar) && cc.YL.ClearStage >= parseInt(goalCfg.INT_NeedStage)) {
                    cc.find("Canvas/Box/sp").getComponent(sp.Skeleton).setAnimation(0, "Youjiang", true);
                }
            }
            this.treasure.getComponent(cc.Button).interactable = true;
            setTimeout(function () {
                Guide.getInstance().initHallGuide();
            }, 500);
        }.bind(this));
    },

    getLocalData() {
        cc.YL.StageInfo = [];       // 本地存储的关卡数据
        cc.YL.ClearStage = 0;
        let stageInfo = cc.sys.localStorage.getItem("stageInfo");
        if (stageInfo) {
            cc.YL.StageInfo = JSON.parse(stageInfo);
        }
        let currStage = cc.sys.localStorage.getItem("currStage");
        if (currStage) {
            currStage = JSON.parse(currStage);
            cc.YL.ClearStage = parseInt(currStage);
            this.stagePage = parseInt(currStage) / 10;
            console.log("当前关卡:", currStage);
        } else {
            this.stagePage = 1;
        }
        this.totalPage = funCsv.getJsonLength(cc.YL.PageConfig);
        if (this.stagePage < 1) {
            this.stagePage = 1;
        }
        if (this.stagePage > this.totalPage) {
            this.stagePage = this.totalPage;
        }
        // console.log("当前关卡页:", this.stagePage);
        // cc.YL.ClearStage = 8;

        let unlockPage = cc.sys.localStorage.getItem("unlockPage");
        if (unlockPage) {
            unlockPage = parseInt(JSON.parse(unlockPage));
        } else {
            unlockPage = 0;
        }
        // 找到当前解锁的最高区域
        for (let i = 1; i <= this.totalPage; ++i) {
            if (cc.YL.PageConfig[i].INT_LockStar <= 0 || i <= unlockPage) {
                cc.YL.UnlockPage = i;
            } else {
                if (cc.YL.UnlockPage < Math.ceil(this.stagePage)) {
                    cc.YL.UnlockPage = Math.ceil(this.stagePage);
                }
                break;
            }
        }
        // cc.YL.ClearStage = 190;
        // cc.YL.UnlockPage = 4;
    },

    addStagePart() {
        for (let i = 0; i < cc.YL.UnlockPage; ++i) {
            this.initUnitPage(i);
        }
        const stagePage = (cc.YL.ClearStage + 1) / 10;
        const progress = stagePage <= 1 ? 0 : stagePage / cc.YL.UnlockPage;
        this.stageView.getComponent(cc.ScrollView).scrollToPercentVertical(progress, 0);
    },

    initUnitPage(idx) {
        const stagePart = cc.instantiate(this.StagePartPre);
        const bgStr = cc.YL.PageConfig[idx + 1].STR_Resource;
        if (GameRes.spriteFrame[bgStr.toUpperCase()]) {
            stagePart.getChildByName("bg").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[bgStr.toUpperCase()];
        }
        if (idx + 1 == cc.YL.UnlockPage && idx + 1 < this.totalPage) {
            const unlock = stagePart.getChildByName("unlock");
            unlock.active = true;
            const lab = unlock.getChildByName("btn_unlock").getChildByName("lab");
            lab.getComponent(cc.Label).string = "解锁" + cc.YL.PageConfig[idx + 1 + 1].STR_Name;
            const count = unlock.getChildByName("btn_unlock").getChildByName("count");
            count.getComponent(cc.Label).string = cc.YL.PlayerInfo.stars + "/" + cc.YL.PageConfig[idx + 1 + 1].INT_LockStar;
            unlock.getChildByName("btn_unlock").on('click', this.onBtnUnlockClick, this);
            const stars = parseInt(cc.YL.PageConfig[idx + 1 + 1].INT_LockStar);
            if (cc.YL.PlayerInfo.stars >= stars) {
                unlock.getChildByName("btn_unlock").getChildByName("sp").getComponent(sp.Skeleton).animation = "Shanyao";
                utils.shake(unlock.getChildByName("btn_unlock").getChildByName("count"), true);
            }
        }
        if (idx + 1 == this.totalPage) {
            const develop = stagePart.getChildByName("develop");
            develop.active = true;
        }
        const btnStr = cc.YL.PageConfig[idx + 1].STR_Button;
        const stages = stagePart.getChildByName("stage").children;
        const totalStage = funCsv.getJsonLength(cc.YL.StageConfig);
        for (let j = 0; j < stages.length; ++j) {
            if (cc.YL.StageConfig[j + 1 + idx * 10]) {
                stages[j].zIndex = totalStage - (j + 1 + idx * 10);
                if (j + 1 + idx * 10 == cc.YL.ClearStage + 1 ||
                    (j + 1 + idx * 10 == cc.YL.ClearStage && j + 1 + idx * 10 == cc.YL.UnlockPage * 10)) {
                    this.playerShow = this.playerShow || cc.instantiate(this.PlayerPre);
                    stages[j].addChild(this.playerShow);
                    this.playerShow.setPosition(-30, 0);
                    this.playerShow.getComponent("Player").hallStand = true;
                }
                if (j + 1 + idx * 10 <= cc.YL.ClearStage + 1) {
                    stages[j].getChildByName("star").active = true;
                }
                stages[j].id = j + 1 + idx * 10;
                const stageInfo = cc.YL.StageInfo.find(function (item) {
                    return item.id == j + 1 + idx * 10;
                });
                if (GameRes.spriteFrame[btnStr.toUpperCase()]) {
                    stages[j].getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[btnStr.toUpperCase()];
                }
                if (stageInfo && stageInfo.star > 0) {
                    const stars = stages[j].getChildByName("star").children;
                    for (let i = 0; i < stageInfo.star; ++i) {
                        stars[i].getChildByName("reach").active = true;
                    }
                }
                stages[j].getChildByName("lab").getComponent(cc.Label).string = j + 1 + idx * 10;
                const x = parseInt(cc.YL.StageConfig[j + 1 + idx * 10].INT_X);
                const y = parseInt(cc.YL.StageConfig[j + 1 + idx * 10].INT_Y);
                stages[j].setPosition(x, y);
                stages[j].on('click', this.onStageClick, this);
            } else {
                stages[j].active = false;
            }
        }
        this.stageContent.addChild(stagePart);
    },

    showStageInfo(stageId) {
        const stageCsv = cc.YL.StageConfig[stageId];
        if (stageCsv) {
            cc.YL.CurrStageCfg = stageCsv;
            cc.YL.CurrStageInfo = cc.YL.StageInfo.find(function (item) {
                return item.id == stageId;
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
            let stageInfo = this.node.getChildByName("StageInfo");
            if (!stageInfo) {
                stageInfo = cc.instantiate(this.StageInfoPre);
            }
            utils.show(stageInfo);
            const stageNum = stageInfo.getChildByName("box").getChildByName("stageNum");
            stageNum.getChildByName("lab").getComponent(cc.Label).string = "第" + stageCsv.INT_ID + "关";
            const rate = stageInfo.getChildByName("box").getChildByName("rate");
            if (cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.star > 0) {
                const stars = rate.children;
                for (let i = 0; i < cc.YL.CurrStageInfo.star; ++i) {
                    stars[i].getChildByName("reach").active = true;
                }
            }
            const goals = stageInfo.getChildByName("box").getChildByName("goal").getChildByName("goals").children;
            for (let i = 0; i < goals.length; ++i) {
                const condition = parseInt(stageCsv["INT_Condition_" + (i + 1)]);
                if (condition) {
                    goals[i].active = true;
                    const str = "Stage_Target_" + condition;
                    const target = goals[i].getChildByName("spr");
                    target.getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[str.toUpperCase()];
                    let desc = "x" + stageCsv["INT_Count_" + (i + 1)];
                    if (condition == 1) {
                        desc = "全部收集";
                    }
                    goals[i].getChildByName("desc").getComponent(cc.Label).string = desc;
                } else {
                    goals[i].active = false;
                }

            }
            // const highScore = stageInfo.getChildByName("box").getChildByName("highScore").getChildByName("score");
            // if (cc.YL.CurrStageInfo && cc.YL.CurrStageInfo.highScore > 0) {
            //     highScore.getComponent(cc.Label).string = cc.YL.CurrStageInfo.highScore;
            // } else {
            //     highScore.getComponent(cc.Label).string = 0;
            // }
            stageInfo.getChildByName("box").getChildByName("btnStart").on('click', function () {
                audio.playEffect('UI_Button');
                this.initSkillInfo(true);
            }.bind(this));
            stageInfo.getChildByName("box").getChildByName("btnClose").on('click', function () {
                audio.playEffect('UI_Button');
                utils.hide(stageInfo);
            });
        }
    },

    loadCurRole: function () {
        const playerRole = cc.sys.localStorage.getItem("playerRole");
        if (playerRole) {
            cc.YL.PlayerRole = playerRole;
        }
        const unlockRole = cc.sys.localStorage.getItem("unlockRole");
        if (unlockRole) {
            cc.YL.unlockRole = JSON.parse(unlockRole);
        } else {
            cc.YL.unlockRole = [];
            cc.sys.localStorage.setItem("unlockRole", JSON.stringify(cc.YL.unlockRole));
        }
    },

    initEnergy() {
        cc.YL.MaxEnergy = 12;
        cc.YL.EnergyInterval = 300;
        if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
            this.energy.getChildByName("time").active = false;
            cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
        } else {
            if (cc.YL.EnergyInfo.lastTime) {
                const currTime = Date.now();
                const intervalTime = currTime - cc.YL.EnergyInfo.lastTime;
                if (intervalTime > cc.YL.EnergyInterval * 1000) {
                    cc.YL.EnergyInfo.curr += Math.floor(intervalTime / (cc.YL.EnergyInterval * 1000));
                    if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
                        cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
                        utils.stopEnergyRecover();
                    } else {
                        cc.YL.EnergyInfo.lastTime += Math.floor(intervalTime / (cc.YL.EnergyInterval * 1000)) * cc.YL.EnergyInterval * 1000;
                        const offTime = intervalTime % (cc.YL.EnergyInterval * 1000);
                        cc.YL.RecoverTime = cc.YL.EnergyInterval - Math.floor(offTime / 1000);
                        utils.startEnergyRecover();
                    }
                    cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
                } else {
                    cc.YL.RecoverTime = cc.YL.EnergyInterval - Math.floor(intervalTime / 1000);
                    utils.startEnergyRecover();
                }
            } else {
                utils.startEnergyRecover(true);
                cc.YL.EnergyInfo.lastTime = Date.now();
                cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
            }
        }
        this.energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
    },

    initAdCount() {
        cc.YL.MaxAdCount = 3;
        cc.YL.AdCount = 0;
        const adCountStorage = cc.sys.localStorage.getItem("adCount");
        if (adCountStorage) {
            cc.YL.AdCount = JSON.parse(adCountStorage);
        }
        const timeStorage = cc.sys.localStorage.getItem("enterTime");
        if (timeStorage) {
            const enterTime = JSON.parse(timeStorage);
            const lastDate = new Date(enterTime);
            const lastDay = lastDate.getDate();
            const currDate = new Date();
            const currDay = currDate.getDate();
            if (currDay > lastDay) {
                cc.YL.AdCount = 0;
            }
        } else {
            cc.YL.AdCount = 0;
        }
        cc.sys.localStorage.setItem("enterTime", JSON.stringify(Date.now()));
    },

    initSkillInfo(flag) {
        funCsv.turnCsvToJson('Csv/skill', function (csvJson) {
            if (csvJson[1].INT_LockStage > cc.YL.ClearStage && flag) {
                this.block.active = true;
                if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
                    cc.YL.EnergyInfo.curr--;
                    cc.YL.EnergyInfo.lastTime = Date.now();
                    utils.startEnergyRecover(true);
                } else {
                    cc.YL.EnergyInfo.curr--;
                }
                cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
                cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
                this.energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
                const stageInfo = this.node.getChildByName("StageInfo");
                if (stageInfo) {
                    const enterBtn = stageInfo.getChildByName("box").getChildByName("btnStart");
                    const energy = enterBtn.getChildByName("energy");
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
                            utils.hide(stageInfo);
                            this.cloud.getComponent(sp.Skeleton).setCompleteListener(function () {
                                cc.YL.SceneManager.LoadScene("Map");
                            });
                            this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", false);
                        }.bind(this))
                    ));
                }
                return;
            }
            this.showSkillInfo(flag);
        }.bind(this));
    },

    showSkillInfo(flag) {
        funCsv.turnCsvToJson('Csv/skill', function (csvJson) {
            const stageInfo = this.node.getChildByName("StageInfo");
            if (stageInfo) {
                utils.hide(stageInfo);
            }
            let skillInfo = this.node.getChildByName("SkillInfo");
            if (!skillInfo) {
                skillInfo = cc.instantiate(this.SkillInfoPre);
            }
            utils.show(skillInfo);
            skillInfo.getChildByName("box").getChildByName("bg1_1").active = flag && true;
            skillInfo.getChildByName("box").getChildByName("bg2_1").active = flag && true;
            skillInfo.getChildByName("box").getChildByName("bg1").active = !flag;
            skillInfo.getChildByName("box").getChildByName("bg2").active = !flag;
            skillInfo.getChildByName("box").getChildByName("title").y = flag ? 358 : 316;
            skillInfo.getChildByName("box").getChildByName("btnClose").y = flag ? 358 : 316;
            skillInfo.getChildByName("box").getChildByName("skill").y = flag ? 310 : 255;
            skillInfo.getChildByName("box").getChildByName("lock").y = flag ? 310 : 255;
            const skills = skillInfo.getChildByName("box").getChildByName("skill");
            const locks = skillInfo.getChildByName("box").getChildByName("lock");
            skills.active = true;
            locks.active = true;
            for (let i in csvJson) {
                const skill = skills.getChildByName("skill" + csvJson[i].INT_ID);
                if (skill) {
                    const str = "Skill_" + (csvJson[i].INT_Type);
                    skill.getChildByName("spr").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[str.toUpperCase()];
                    skill.getChildByName("name").getComponent(cc.Label).string = csvJson[i].STR_Name;
                    skill.getChildByName("desc").getComponent(cc.Label).string = csvJson[i].STR_Desc;
                    const price = skill.getChildByName("price").getChildByName("num");
                    price.getComponent(cc.Label).string = csvJson[i].INT_Gold;
                    const count = skill.getChildByName("count").getChildByName("num");
                    count.getComponent(cc.Label).string = cc.YL.SkillInfo[csvJson[i].STR_CodeInfo] || 0;
                    skill.active = parseInt(csvJson[i].INT_LockStage) <= cc.YL.ClearStage;
                    if (parseInt(csvJson[i].INT_Gold) > cc.YL.PlayerInfo.coin) {
                        skill.getChildByName("btnBuy").getComponent(cc.Button).interactable = false;
                    }
                    skill.getChildByName("btnBuy").on('click', function () {
                        if (cc.YL.SkillInfo[csvJson[i].STR_CodeInfo] >= 0 && cc.YL.PlayerInfo.coin >= parseInt(csvJson[i].INT_Gold)) {
                            cc.YL.PlayerInfo.coin -= parseInt(csvJson[i].INT_Gold);
                            this.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
                            cc.YL.SkillInfo[csvJson[i].STR_CodeInfo]++;
                            count.getComponent(cc.Label).string = cc.YL.SkillInfo[csvJson[i].STR_CodeInfo] || 0;
                            cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
                            cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
                        } else {
                            popup.show({str: "金币不足！"});
                        }
                    }.bind(this));
                }
                const lock = locks.getChildByName("lock" + csvJson[i].INT_ID);
                if (lock) {
                    lock.getChildByName("desc").getComponent(cc.Label).string = "第" + csvJson[i].INT_LockStage + "关解锁";
                    lock.active = parseInt(csvJson[i].INT_LockStage) > cc.YL.ClearStage;
                }
            }
            skillInfo.getChildByName("box").getChildByName("btnEnter").active = flag && true;
            skillInfo.getChildByName("box").getChildByName("btnClose").on("click", this.onSkillCloseClick, this);
            skillInfo.getChildByName("box").getChildByName("btnEnter").on("click", this.onSkillEnterClick, this);
        }.bind(this));
    },

    onBtnUnlockClick(event) {
        audio.playEffect('UI_Button');
        if (cc.YL.PageConfig[cc.YL.UnlockPage + 1]) {
            const stars = parseInt(cc.YL.PageConfig[cc.YL.UnlockPage + 1].INT_LockStar);
            if (stars <= cc.YL.PlayerInfo.stars) {
                this.block.active = true;
                cc.YL.UnlockPage += 1;
                cc.sys.localStorage.setItem("unlockPage", JSON.stringify(cc.YL.UnlockPage));
                event.target.getComponent(cc.Button).interactable = false;
                event.target.runAction(cc.fadeOut(0.2));
                if (this.playerShow && cc.YL.ClearStage + 1 > (cc.YL.UnlockPage - 1) * 10) {
                    this.playerShow.removeFromParent();
                }
                this.initUnitPage(cc.YL.UnlockPage - 1);
                const lockCloud = event.target.parent.getChildByName("spine");
                lockCloud.getComponent(sp.Skeleton).setCompleteListener(function () {
                    const stagePage = (cc.YL.ClearStage + 1) / 10;
                    const progress = stagePage <= 1 ? 0 : stagePage / cc.YL.UnlockPage;
                    this.stageView.getComponent(cc.ScrollView).scrollToPercentVertical(progress, 0.5);
                    this.block.active = false;
                }.bind(this));
                lockCloud.getComponent(sp.Skeleton).setAnimation(0, "Xiaosan", false);
            } else {
                popup.show({str: "星星不足！通关关卡获取更多星星吧！"});
            }
        }
    },

    onStageClick(event) {
        audio.playEffect('UI_Button');
        this.stageView.getComponent(cc.ScrollView).stopAutoScroll();
        cc.YL.loadMapStage = event.target.id;
        if (event.target.id > cc.YL.ClearStage + 1) {
            popup.show({str: "请先完成当前关卡"});
            // const stagePage = (cc.YL.ClearStage + 1) / 10;
            // const progress = stagePage <= 1 ? 0 : stagePage / cc.YL.UnlockPage;
            // this.stageView.getComponent(cc.ScrollView).scrollToPercentVertical(progress, 0);
            return;
        }
        this.showStageInfo(event.target.id);
    },

    onAddEnergyClick() {
        audio.playEffect('UI_Button');
        if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
            popup.show({str: "体力已满！"});
        } else {
            cc.YL.EnergyInfo.curr += 4;
            if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
                cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
                utils.stopEnergyRecover();
            }
            cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
            // popup.show({str: "是否观看广告获得4个体力奖励？", confirm: function () {
            //     cc.YL.EnergyInfo.curr += 4;
            //     utils.stopEnergyRecover();
            //     cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
            // }.bind(this), cancel: 1});
        }
    },

    onTreasureBoxClick() {
        audio.playEffect('UI_Button');
        let treasure = this.node.getChildByName("TreasureBox");
        if (!treasure) {
            treasure = cc.instantiate(this.TreasurePre);
        }
        utils.show(treasure);
    },

    onClickPlayRole: function () {
        audio.playEffect('UI_Button');
        var node = this.node.getChildByName("RoleChoice") ?
            this.node.getChildByName("RoleChoice") : cc.instantiate(this.RoleChoice);
        utils.show(node);
    },

    onBtnSkillClick() {
        audio.playEffect('UI_Button');
        this.initSkillInfo();
    },

    onSkillCloseClick() {
        audio.playEffect('UI_Button');
        const skillInfo = this.node.getChildByName("SkillInfo");
        if (skillInfo) {
            utils.hide(skillInfo);
        }
    },

    onSkillEnterClick() {
        audio.playEffect('UI_Button');
        const enterFun = function () {
            const skillInfo = this.node.getChildByName("SkillInfo");
            if (skillInfo) {
                this.block.active = true;
                if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
                    cc.YL.EnergyInfo.curr--;
                    cc.YL.EnergyInfo.lastTime = Date.now();
                    utils.startEnergyRecover(true);
                } else {
                    cc.YL.EnergyInfo.curr--;
                }
                cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
                cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
                this.energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
                const enterBtn = skillInfo.getChildByName("box").getChildByName("btnEnter");
                const energy = enterBtn.getChildByName("energy");
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
                        utils.hide(skillInfo);
                        this.cloud.getComponent(sp.Skeleton).setCompleteListener(function () {
                            cc.YL.SceneManager.LoadScene("Map");
                        });
                        this.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", false);
                    }.bind(this))
                ));
            }
        }.bind(this);
        utils.checkEnergyAndAd(enterFun);
    },

    onBtnFileClick() {
        audio.playEffect('UI_Button');
        popup.show({str: "敬请期待!!"});
    },

    onBtnCommunityClick() {
        audio.playEffect('UI_Button');
        cc.sys.openURL('https://www.taptap.com/app/164414');
    },

    onBtnSetClick() {
        audio.playEffect('UI_Button');
        let setting = this.node.getChildByName("Setting");
        if (!setting) {
            setting = cc.instantiate(this.SettingPre);
        }
        setting.getChildByName("box").getChildByName("btnReplay").active = false;
        setting.getChildByName("box").getChildByName("btnExit").active = false;
        utils.show(setting);
    },

    onBtnStarClick() {
        this.clickStar = this.clickStar || 0;
        this.clickStar += 1;
        if (this.clickStar == 3) {
            this.node.getChildByName("WriteData").active = true;
            this.clickStar = 0;
        }
    },

    onBtnCoinClick() {
        this.node.getChildByName("WriteData").active = false;
    },

    onBtnWriteDataClick() {
        audio.playEffect('UI_Button');
        this.node.getChildByName("WriteBoard").active = true;
    },

    onBtnResetClick() {
        audio.playEffect('UI_Button');
        cc.sys.localStorage.removeItem("readStory");
        for (let i = 0; i < cc.YL.StageInfo.length; ++i) {
            cc.YL.StageInfo[i].story = 0;
            cc.YL.StageInfo[i].guide = 0;
        }
        cc.sys.localStorage.setItem("stageInfo", JSON.stringify(cc.YL.StageInfo));
        cc.sys.localStorage.removeItem("guideFinish");
        cc.YL.SceneManager.LoadScene("Login");
    },

    onBtnResetBoxClick() {
        audio.playEffect('UI_Button');
        cc.sys.localStorage.removeItem("treasureIdx");
        cc.YL.SceneManager.LoadScene("Hall");
    },

    onBtnResetSkillClick() {
        for (let i in cc.YL.SkillInfo) {
            cc.YL.SkillInfo[i] = 0;
        }
        cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
        cc.YL.SceneManager.LoadScene("Hall");
    },

    onBtnResetStageClick() {
        for (let i = 0; i < cc.YL.StageInfo.length; ++i) {
            cc.YL.StageInfo[i].star = 0;
        }
        cc.YL.PlayerInfo.stars = 0;
        cc.sys.localStorage.setItem("stageInfo", JSON.stringify(cc.YL.StageInfo));
        cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
        cc.YL.SceneManager.LoadScene("Hall");
    },

    onBtnConfirmWriteClick(event) {
        audio.playEffect('UI_Button');
        const box = event.target.parent;
        const star = box.getChildByName("star");
        const coin = box.getChildByName("coin");
        const currStage = box.getChildByName("currStage");
        const unlockPage = box.getChildByName("unlockPage");
        const starData = parseInt(star.getChildByName("editBox").getComponent(cc.EditBox).string);
        const coinData = parseInt(coin.getChildByName("editBox").getComponent(cc.EditBox).string);
        const currStageData = parseInt(currStage.getChildByName("editBox").getComponent(cc.EditBox).string);
        const unlockPageData = parseInt(unlockPage.getChildByName("editBox").getComponent(cc.EditBox).string);
        if (starData >= 0) {
            cc.YL.PlayerInfo.stars = starData;
        }
        if (coinData >= 0) {
            cc.YL.PlayerInfo.coin = coinData;
        }
        cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
        if (currStageData > 0) {
            cc.sys.localStorage.setItem("currStage", JSON.stringify(currStageData));
        }
        if (unlockPageData > 0) {
            cc.sys.localStorage.setItem("unlockPage", JSON.stringify(unlockPageData));
        }
        cc.YL.SceneManager.LoadScene("Hall");
    },

    onBtnCloseWriteClick() {
        audio.playEffect('UI_Button');
        this.node.getChildByName("WriteBoard").active = false;
    },

    onBtnFirstEnterClick() {
        audio.playEffect('UI_Button');
        this.stageView.getComponent(cc.ScrollView).stopAutoScroll();
        cc.YL.loadMapStage = 1;
        this.showStageInfo(1);
    },
});
