const funCsv = require("./funCsv");
const GameRes = require("./GameRes");

cc.Class({
    extends: cc.Component,

    onEnable() {
        this.initTreasureBox();
    },

    initTreasureBox() {
        const box = this.node.getChildByName("box");
        const goals = box.getChildByName("goals");
        const star = goals.getChildByName("star");
        const stage = goals.getChildByName("stage");
        star.getChildByName("prog").getChildByName("curr").getComponent(cc.Label).string = cc.YL.PlayerInfo.stars;
        stage.getChildByName("prog").getChildByName("curr").getComponent(cc.Label).string = cc.YL.ClearStage;
        box.getChildByName("btnOpen").getComponent(cc.Button).interactable = false;
        box.getChildByName("boxSp").getComponent(sp.Skeleton).animation = "Kaiqian";
        const goalCfg = cc.YL.TreasureCfg[cc.YL.TreasureIdx + 1];
        if (goalCfg) {
            star.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/" + goalCfg.INT_NeedStar;
            stage.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/" + goalCfg.INT_NeedStage;
            if (cc.YL.PlayerInfo.stars >= parseInt(goalCfg.INT_NeedStar)) {
                star.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0);
            } else {
                star.getChildByName("prog").getChildByName("curr").color = cc.color(255, 0, 0);
            }
            if (cc.YL.ClearStage >= parseInt(goalCfg.INT_NeedStage)) {
                stage.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0);
            } else {
                stage.getChildByName("prog").getChildByName("curr").color = cc.color(255, 0, 0);
            }
            if (cc.YL.PlayerInfo.stars >= parseInt(goalCfg.INT_NeedStar) && cc.YL.ClearStage >= parseInt(goalCfg.INT_NeedStage)) {
                this.treasureInfo = goalCfg;
                box.getChildByName("btnOpen").getComponent(cc.Button).interactable = true;
            }
        } else {
            star.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0);
            stage.getChildByName("prog").getChildByName("curr").color = cc.color(0, 255, 0);
            star.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/-";
            stage.getChildByName("prog").getChildByName("goal").getComponent(cc.Label).string = "/-";
        }
    },

    onBtnOpenClick() {
        audio.playEffect('UI_Button');
        const box = this.node.getChildByName("box");
        const receive = this.node.getChildByName("receive");
        let count = 0;
        for (let i = 1; i < 4; ++i) {
            receive.getChildByName("award").getChildByName("award" + i).active = false;
        }
        for (let i = 1; i < 4; ++i) {
            const type = "INT_Type_" + i;
            if (parseInt(this.treasureInfo[type]) > 0) {
                count++;
                const str = "award" + count;
                const award = receive.getChildByName("award").getChildByName(str);
                award.getChildByName("coin").active = parseInt(this.treasureInfo[type]) == 1;
                award.getChildByName("skill").active = parseInt(this.treasureInfo[type]) == 2;
                if (parseInt(this.treasureInfo[type]) == 1) {
                    cc.YL.PlayerInfo.coin += parseInt(this.treasureInfo["INT_Count_" + i]);
                } else if (parseInt(this.treasureInfo[type]) == 2) {
                    cc.YL.SkillInfo[this.treasureInfo["STR_CodeInfo_" + i]] += parseInt(this.treasureInfo["INT_Count_" + i]);
                    const skill = "Skill_" + this.treasureInfo["INT_PriceID_" + i];
                    award.getChildByName("skill").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame[skill.toUpperCase()];
                }
                award.getChildByName("count").getComponent(cc.Label).string = "x" + this.treasureInfo["INT_Count_" + i];
            }
        }
        cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
        cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
        cc.YL.TreasureIdx++;
        cc.sys.localStorage.setItem("treasureIdx", JSON.stringify(cc.YL.TreasureIdx));
        box.getChildByName("boxSp").getComponent(sp.Skeleton).setCompleteListener(function () {
            box.getChildByName("boxSp").getComponent(sp.Skeleton).animation = "Kaihou";
            receive.active = true;
            cc.find("Canvas").getComponent("Hall").coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
            for (let i = 1; i <= count; ++i) {
                const str = "award" + i;
                const award = receive.getChildByName("award").getChildByName(str);
                award.active = true;
                award.setScale(0.1);
                const mid = count / 2;
                award.x = (i - 0.5 - mid) * 150;
                award.runAction(cc.scaleTo(0.2, 1).easing(cc.easeBackOut()));
            }
        });
        box.getChildByName("boxSp").getComponent(sp.Skeleton).setAnimation(0, "Kaizhong", false);
    },

    onBtnCloseClick() {
        audio.playEffect('UI_Button');
        utils.hide(this.node);
    },

    onReceiveCoverClick() {
        const box = this.node.getChildByName("box");
        const receive = this.node.getChildByName("receive");
        receive.active = false;
        this.initTreasureBox();
        const goalCfg = cc.YL.TreasureCfg[cc.YL.TreasureIdx + 1];
        if (goalCfg) {
            if (cc.YL.PlayerInfo.stars < parseInt(goalCfg.INT_NeedStar) || cc.YL.ClearStage < parseInt(goalCfg.INT_NeedStage)) {
                cc.find("Canvas/Box/sp").getComponent(sp.Skeleton).setAnimation(0, "Meijiang", false);
            }
        } else {
            cc.find("Canvas/Box/sp").getComponent(sp.Skeleton).setAnimation(0, "Meijiang", false);
        }
    },
});
