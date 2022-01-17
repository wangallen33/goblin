cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad() {
        this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
        this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
        this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
        this.playerNode = this.mapComp.playerNode;
    },

    initTrigger(triggerInfo) {
        this.triggerInfo = triggerInfo;
        const mapSize = this.mapNode.getContentSize();
        const tileSize = this.tiledMap.getTileSize();
        const trigger = this.node.getChildByName(triggerInfo.Resource);
        if (trigger) {
            trigger.active = true;
        }
        this.triggerNode = trigger ? trigger : this.node.getChildByName("Trigger_Burrow");
        if (this.triggerInfo.Type == 2 && this.idx == cc.YL.currStove) {
            this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off2", true);
        }
        this.node.setPosition(triggerInfo.x, triggerInfo.y - 64);
    },

    showTriggerProg(isMost) {
        // 模拟update更新progress进度 默认加载2s 2000 / 16 = 125
        this.timeId = setTimeout(function () {
            if (cc.YL.isOver) {
                this.progress.getComponent(cc.ProgressBar).progress = 0;
                this.progress.removeFromParent();
                this.progress.destroy();
                this.progress = null;
                return;
            }
            this.progress.getComponent(cc.ProgressBar).progress += (1 / (2000 / 16));
            if (this.progress.getComponent(cc.ProgressBar).progress >= 1) {
                this.progress.getComponent(cc.ProgressBar).progress = 0;
                this.progress.removeFromParent();
                this.progress.destroy();
                this.progress = null;
                if (isMost) {
                    // 怪物触发
                    audio.playEffect('Trgger_Off');
                    console.log("怪物关闭机关");
                    this.monsterTriggerOff();
                } else {
                    // 玩家触发
                    audio.playEffect('Trigger_On');
                    console.log("玩家开启机关type", this.triggerInfo.Type);
                    this.playerTrigger();
                }
            } else {
                this.showTriggerProg(isMost);
            }
        }.bind(this), 16);
    },

    monsterTriggerOff() {
        this.mapComp.stageGoal.type1--;
        this.mapComp.checkStageGoal();
        this.monsterNode.getComponent("Monster").trigger = false;
        this.monsterNode.getComponent("Monster").monsterAutoMove();
        this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "On_to_Off", false);
        setTimeout(function () {
            this.triggerStatus = 0;
            this.triggering = false;
            this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off", true);
        }.bind(this), 800);
        // 当前引擎版本 ccc 2.0.8 同一个spine在频繁使用setCompleteListener时会出现贴图错乱 先用延时代替
        // this.triggerNode.getComponent(sp.Skeleton).setCompleteListener(function () {
        //     this.triggering = false;
        //     this.triggerStatus = 0;
        //     this.mapComp.stageGoal.type1--;
        //     this.monsterNode.getComponent("Monster").trigger = false;
        //     this.monsterNode.getComponent("Monster").monsterAutoMove();
        //     this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off", true);
        //     this.triggerNode.getComponent(sp.Skeleton).setCompleteListener(function () {});
        // }.bind(this));
    },

    playerTrigger() {
        if (this.triggerInfo.Type == 1) {
            this.mapComp.stageGoal.type1++;
        } else if (this.triggerInfo.Type == 2) {
            this.mapComp.stageGoal.type2++;
            this.getNextStove();
        }
        this.mapComp.checkStageGoal();
        this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off_to_On", false);
        this.triggerNode.getComponent(sp.Skeleton).setCompleteListener(function () {
            this.triggerStatus = 1;
            this.triggering = false;
            this.triggerNode.getComponent(sp.Skeleton).setAnimation(0, "On", true);
            this.triggerNode.getComponent(sp.Skeleton).setCompleteListener(function () {});
        }.bind(this));
    },

    getNextStove() {
        const stoves = [];
        this.mapComp.stoveArr.forEach(function (item) {
            const trigger = item.getComponent("Trigger");
            if (trigger.idx != cc.YL.currStove && !trigger.triggerStatus) {
                stoves.push(item);
            }
        });
        if (stoves.length > 0) {
            const stove = stoves[Math.floor(Math.random() * stoves.length)];
            cc.YL.currStove = stove.getComponent("Trigger").idx;
            stove.getComponent("Trigger").triggerNode.getComponent(sp.Skeleton).setAnimation(0, "Off2", true);
        }
    },
    // 一个陷阱同时只能被一个对象触发  所以玩家和怪物的触发放在一起讨论
    getMonsterTrigger() {
        const selfPos = this.node.getPosition();
        const monsters = this.mapComp.monsterArr;
        for (let i = 0; i < monsters.length; ++i) {
            if (Math.abs(selfPos.x - monsters[i].x) < 10 && Math.abs(selfPos.y - monsters[i].y) < 10) {
                return monsters[i];
            }
        }
        return null;
    },

    monsterTriggerOn() {
        // 怪物触发机关
        if (!this.triggering && this.triggerStatus && this.triggerInfo.Type == 1) {
            this.triggering = true;
            this.monsterNode.stopAllActions();
            this.monsterNode.getComponent("Monster").trigger = true;
            this.monsterNode.getComponent("Monster").stopSelf();
            if (!this.progress) {
                const progress = cc.instantiate(this.mapComp.triggerProgPre);
                this.mapNode.addChild(progress);
                progress.zIndex = 901;
                progress.setPosition(this.node.x + 35, this.node.y + 170);
                this.progress = progress;
            }
            this.showTriggerProg(true);
        }
    },

    playerTriggerOn() {
        // 玩家触发机关
        if (!this.triggering && !this.triggerStatus) {
            if (this.triggerInfo.Type == 2 && this.idx != cc.YL.currStove) {
                return;
            }
            this.triggering = true;
            if (!this.progress) {
                const progress = cc.instantiate(this.mapComp.triggerProgPre);
                this.mapNode.addChild(progress);
                progress.zIndex = 901;
                progress.setPosition(this.node.x + 35, this.node.y + 170);
                this.progress = progress;
            }
            this.showTriggerProg();
        }
    },

    removeProgress() {
        this.triggering = false;
        if (this.timeId) {
            clearTimeout(this.timeId);
        }
        if (this.progress) {
            this.progress.getComponent(cc.ProgressBar).progress = 0;
            this.progress.removeFromParent();
            this.progress.destroy();
            this.progress = null;
        }
    },

    update (dt) {
        if (cc.YL.isOver) {
            return;
        }
        const selfPos = this.node.getPosition();
        const playerPos = this.playerNode.getPosition();
        if (!this.triggerStatus) {
            const choiceNum = cc.YL.PlayerRole ? cc.YL.PlayerRole : 1;
            const role = this.playerNode.getChildByName(choiceNum.toString());
            if (Math.abs(selfPos.x - playerPos.x) < 15 && Math.abs(selfPos.y - playerPos.y) < 15
            && (role.getChildByName("left").getComponent(sp.Skeleton).animation == "Stand"
                || role.getChildByName("right").getComponent(sp.Skeleton).animation == "Stand")) {
                this.playerTriggerOn();
            } else {
                this.removeProgress();
            }
        } else {
            const monster = this.getMonsterTrigger();
            if (monster) {
                this.monsterNode = monster;
                this.monsterTriggerOn();
            } else {
                this.removeProgress();
            }
        }
    },


});
