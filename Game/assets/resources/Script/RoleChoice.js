const funCsv = require("./funCsv");

const MAXSPEED = 300;
const MAXRESPEED = 4000;

cc.Class({
    extends: cc.Component,

    properties: {
    },

    onLoad () {


    },

    start () {
        funCsv.turnCsvToJson('Csv/player', function (csvJson) {
            this._csvJson = csvJson;
            this._init();
        }.bind(this));

    },
    _init: function () {
        cc.log("当前关卡", cc.YL.ClearStage);
        const bigRole = this.node.getChildByName("box").getChildByName("BigRole");
        for (var i = 0; i < bigRole.children.length; i++) {
            bigRole.children[i].getChildByName("ChoiceBtn").active = true;
            bigRole.children[i].getChildByName("chose").active = false;
            bigRole.children[i].active = false;
        }
        var showNode = this.node.getChildByName("box").getChildByName("RoleList").getChildByName("view").getChildByName("content");
        for (var i = 0; i < showNode.children.length; i++) {
            showNode.children[i].getChildByName("Label").getComponent(cc.Label).string = "";
            showNode.children[i].getChildByName("select").active = false;
        }
        for (let i in this._csvJson) {
            const unlock = this._csvJson[i].INT_UnlockMission;
            if (parseInt(unlock) && cc.YL.ClearStage < parseInt(unlock)) {
                showNode.getChildByName(i).getComponent(cc.Button).interactable = false;
                showNode.getChildByName(i).getChildByName("SprNot").active = true;
                showNode.getChildByName(i).getChildByName("Spr").active = false;
                showNode.getChildByName(i).getChildByName("Label").getComponent(cc.Label).string = "第" + (parseInt(unlock) + 1) + "关解锁";
            } else {
                showNode.getChildByName(i).getComponent(cc.Button).interactable = true;
                showNode.getChildByName(i).getChildByName("SprNot").active = false;
                showNode.getChildByName(i).getChildByName("Spr").active = true;
            }
            bigRole.getChildByName(i).getChildByName("nameBG").getChildByName("name").getComponent(cc.Label).string = this._csvJson[i].STR_Name;
            const speed = this._csvJson[i].INT_MoveSpeed;
            const reSpeed = this._csvJson[i].INT_RecoverSpeed;
            const speedNode = bigRole.getChildByName(i).getChildByName("speed");
            const reSpeedNode = bigRole.getChildByName(i).getChildByName("reset");
            speedNode.getChildByName("percent").getComponent(cc.Label).string = parseInt(speed) || 0;
            speedNode.getComponent(cc.ProgressBar).progress = parseInt(speed) / MAXSPEED;
            reSpeedNode.getChildByName("percent").getComponent(cc.Label).string = parseInt(reSpeed) || 0;
            reSpeedNode.getComponent(cc.ProgressBar).progress = parseInt(reSpeed) / MAXRESPEED;
            this.checkRoleStatus(i);
            if (i == cc.YL.PlayerRole.toString()) {
                showNode.getChildByName(i).getChildByName("select").active = true;
                showNode.getChildByName(i).getChildByName("Label").getComponent(cc.Label).string = "出场中";
                bigRole.getChildByName(i).active = true;
                bigRole.getChildByName(i).getChildByName("ChoiceBtn").active = false;
                bigRole.getChildByName(i).getChildByName("chose").active = true;
                this.showIdle(bigRole.getChildByName(i));
            }
        }
    },

    showIdle(role) {
        if (this.timeId) {
            clearTimeout(this.timeId);
        }
        this.timeId = setTimeout(function () {
            const idle = "Idle" + (Math.floor(Math.random() * 2) + 1);
            role.getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener(function () {
                role.getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, "Stand", true);
                role.getChildByName("spine").getComponent(sp.Skeleton).setCompleteListener(function () {});
                this.showIdle(role);
            }.bind(this));
            role.getChildByName("spine").getComponent(sp.Skeleton).setAnimation(0, idle, false);
        }.bind(this), 5000);
    },

    checkRoleStatus(idx) {
        if (parseInt(idx) > funCsv.getJsonLength(this._csvJson)) {
            return;
        }
        const bigRole = this.node.getChildByName("box").getChildByName("BigRole");
        const gold = bigRole.getChildByName(idx).getChildByName("btnBuy");
        if (gold) {
            const choice = bigRole.getChildByName(idx).getChildByName("ChoiceBtn");
            const role = cc.YL.unlockRole.find(function (item) {
                return item == idx;
            });
            if (role) {
                gold.active = false;
                choice.active = true;
            } else {
                gold.active = !!parseInt(this._csvJson[idx].INT_Gold);
                choice.active = !parseInt(this._csvJson[idx].INT_Gold);
            }
            gold.getChildByName("Label").getComponent(cc.Label).string = this._csvJson[idx].INT_Gold || 0;
        }
    },

    onClickChoiceList: function (event) {
        audio.playEffect('UI_Button');
        var choiceNum = event.target.name;
         const bigRole = this.node.getChildByName("box").getChildByName("BigRole");
        for (var i = 0; i < bigRole.children.length; i++) {
            bigRole.children[i].active = false;
        }
        bigRole.getChildByName(choiceNum).active = true;
        this.showIdle(bigRole.getChildByName(choiceNum));
        var showNode = this.node.getChildByName("box").getChildByName("RoleList").getChildByName("view").getChildByName("content");
        for (var i = 0; i < showNode.children.length; i++) {
            showNode.children[i].getChildByName("select").active = false;
        }
        event.target.getChildByName("select").active = true;
    },

    onBtnBuyClick(event) {
        audio.playEffect('UI_Button');
        const price = parseInt(event.target.getChildByName("Label").getComponent(cc.Label).string);
        if (cc.YL.PlayerInfo.coin < price) {
            popup.show({str: "金币不足！通关关卡获取更多金币吧！"});
            return;
        }
        cc.YL.PlayerInfo.coin -= price;
        cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
        cc.YL.unlockRole.push(event.target.parent.name);
        cc.sys.localStorage.setItem("unlockRole", JSON.stringify(cc.YL.unlockRole));
        cc.find("Canvas").getComponent("Hall").coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
        event.target.active = false;
        event.target.parent.getChildByName("ChoiceBtn").active = true;
    },

    onClickComfire: function (event) {
        audio.playEffect('UI_Button');
        var comfireNum = event.target.parent.name;
        cc.YL.PlayerRole = parseInt(comfireNum);
        this._init();
        cc.sys.localStorage.setItem("playerRole", cc.YL.PlayerRole);
        cc.find("Canvas").getComponent("Hall").playerShow.getComponent("Player")._showType();
    },
    onClickClose: function () {
        audio.playEffect('UI_Button');
        if (this.timeId) {
            clearTimeout(this.timeId);
        }
        utils.hide(this.node);
    },
});
