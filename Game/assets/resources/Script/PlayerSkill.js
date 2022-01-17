const funCsv = require("./funCsv");
cc.Class({
    extends: cc.Component,

    properties: {},

    onLoad () {
        funCsv.turnCsvToJson('Csv/skill', function (csvJson) {
            cc.YL.SkillCsvJson = csvJson;
            this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
            this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
            this._playerNode = this.mapComp.playerNode;
            cc.YL.isSkillingIce = false;
            cc.YL.isSkillingWater = false;
            cc.YL.isSkillingHerat = false;
            cc.YL.isSkillingFire = false;
            this._initBtn(csvJson);
        }.bind(this));

    },
    onClickSkill: function (event, custom) {
        // 技能释放

        this._playerNode = this.mapComp.playerNode;
        this.startSkill(custom, event.target);

    },
    startSkill: function (custom, node) {

        this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
        cc.loader.loadRes("Texture/singleColor", cc.SpriteFrame, function (err, sprite) {
            if (err) {
                cc.log(err);
                return;
            }

            switch (custom) {
                case "Ice": {
                    this.skillIce(custom, sprite, node);
                    break;
                }
                case "Water": {
                    this.skillWater(custom, sprite, node);
                    break;
                }
                case "Heart": {
                    this.skillHeart(custom, sprite, node);
                    break;
                }
                case "Fire": {
                    this.skillFire(custom, sprite, node);
                    break;
                }
            }
        }.bind(this));


    },
    update(){

    },
    chargeBtnStatus: function(custom){
        var skillMap = {
            0: "Ice",
            3: "Heart",
            1: "Water",
            2: "Fire",
        };
        var useSkillNum = cc.YL.SkillInfo[custom];
        useSkillNum -=1;
        cc.YL.SkillInfo[custom] = useSkillNum;
        cc.sys.localStorage.setItem("skillInfo",JSON.stringify(cc.YL.SkillInfo));
        cc.find("Canvas/PlayerSkill").getChildByName(custom).getChildByName("Balck").active = true;
        this.TimerStart(custom);
        for(var i = 0 ; i < 4;i++){
            if(cc.YL.SkillInfo[skillMap[i]] > 0 ){
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getComponent(cc.Button).interactable = true;
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).active = true;
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string = cc.YL.SkillInfo[skillMap[i]];
            }else {
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getChildByName("Balck").active = true;
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getComponent(cc.Button).interactable = false;
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getChildByName("Balck").getChildByName("Time").active = false;
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string =0;
            }
        }
    },

    TimerStart: function(custom){
        cc.find("Canvas/PlayerSkill").getChildByName(custom).getComponent("SkillTimer").startTimer()

    },
    showCover: function (custom, sprite, node) {
        cc.YL.canTouch = false;
        this.mapComp.PauseAllMap();
        cc.YL.IsCanMove = false;
        this._playerNode.getComponent("Player").showStatus("Stand");
        for (var i = 0; i < this.mapNode.children.length; i++) {
            var first = this.mapNode.children[i].name.toString().slice(0, 1);
            var last = this.mapNode.children[i].name.toString().slice(-1);
            if (first == "B" && last == "M") {
                this.mapNode.children[i].getComponent("Monster")._showStatus("Stand");
            }
        }
        if (this.mapNode.getChildByName("Cover")) {
            this.Cover = this.mapNode.getChildByName("Cover");
        } else {
            this.Cover = new cc.Node;
            this.Cover.name = "Cover";
            this.Cover.addComponent(cc.Sprite);
            this.Cover.getComponent(cc.Sprite).spriteFrame = sprite;
            /* parseInt(custom) == 1 ? this.Cover.zIndex = 490 : */
            this.mapNode.addChild(this.Cover);

        }
        this.Cover.active = true;
        this.Cover.width = 30000;
        this.Cover.height = 30000;
        this.Cover.setPosition(0, 0);
        this.Cover.color = new cc.color(0, 0, 0);
        this.Cover.opacity = 100;
        this.Cover.zIndex = 609;
        this.mapNode.getChildByName("all_top_2").zIndex = this.Cover.zIndex - 5;//todo
        this.mapNode.getChildByName("all_top_1").zIndex = this.Cover.zIndex - 10;//todo
        this.chargeBtnStatus(custom);


    },

    endIceSkill: function () {
        if(!this._playerNode.getComponent("Player")._underIce){
            cc.YL.canTouch = true;
            cc.YL.IsCanMove = true;
            this._playerNode.getComponent("Player").isAction = false;
        }
        this.mapNode.getChildByName("all_top_2").zIndex = 900;//todo
        this.mapNode.getChildByName("all_top_1").zIndex = 899;
        if (this.mapNode.getChildByName("Cover")) {
            this.Cover = this.mapNode.getChildByName("Cover");
            this.Cover.destroy();
        }

        this.mapComp._startCountdown();
        // this.isSkilling = false;

    },
    endSkill: function () {
        // 关闭黑

        cc.log("endSkill");
        if(!this._playerNode.getComponent("Player")._underIce){
            cc.YL.canTouch = true;
            cc.YL.IsCanMove = true;
            this._playerNode.getComponent("Player").isAction = false;
        }
        if (this.mapNode.getChildByName("Cover")) {
            this.Cover = this.mapNode.getChildByName("Cover");
            this.Cover.destroy();
        }
        this.mapNode.getChildByName("all_top_2").zIndex = 900;//todo
        this.mapNode.getChildByName("all_top_1").zIndex = 899;
        this.mapComp.ResumeAllMap();
        // this.isSkilling = false;


    },
    skillIce: function (custom, sprite, node) {
        if( cc.YL.isSkillingIce  == true){
            return;
        }
        var hasMonster = false;
        for (var i = 0; i < this.mapNode.children.length; i++) {
            var first = this.mapNode.children[i].name.toString().slice(0, 1);
            var last = this.mapNode.children[i].name.toString().slice(-1);
            this.mapNode.children[i].stopAllActions();
            if (first == "B" && last == "M") {
                hasMonster = true;
            }
        }
        if (hasMonster == false) {
            cc.YL.isSkillingIce = false;
            return;
        }
        cc.YL.isSkillingIce = true;
        this._playerNode.getComponent("Player")._emojiAnim("laugh");
        audio.playEffect("Skill_Player_Ice");
        this.showCover(custom, sprite, node);
        this._playerNode.getChildByName("IceAnimation").active = true;
        this._playerNode.getChildByName("IceAnimation").getComponent(sp.Skeleton).animation = "Shan";
        this._playerNode.getChildByName("IceAnimation").getComponent(sp.Skeleton).loop = false;
        this._playerNode.getChildByName("IceAnimation").getComponent(sp.Skeleton).setCompleteListener(function () {
            for (var i = 0; i < this.mapNode.children.length; i++) {
                var first = this.mapNode.children[i].name.toString().slice(0, 1);
                var last = this.mapNode.children[i].name.toString().slice(-1);
                this.mapNode.children[i].stopAllActions();
                if (first == "B" && last == "M") {
                    this.mapNode.children[i].getComponent("Monster").stopSelf();
                    this.mapNode.children[i].getComponent("Monster").underIceAttacked(this._playerNode.getPosition());
                }
            }

        }.bind(this));
        setTimeout(function () {
            this.endIceSkill();
        }.bind(this), 2000);
    },
    skillHeart: function (custom, sprite, node) {
        if(cc.YL.isSkillingHerat == true){
            return;
        }
        cc.YL.isSkillingHerat = true;
        // 播放动画
        var playerBloodNum = this._playerNode.getComponent("Player").getBlood();
        if (playerBloodNum >= 3) {
            this._failureEmoji();
            this.mapNode.getChildByName("all_top_2").zIndex = 604;//todo
            this.mapNode.getChildByName("all_top_1").zIndex = 599;//todo
            this._playerNode.getChildByName("HeartAnimation").active = true;
            this._playerNode.getChildByName("HeartAnimation").scale = 2;
            this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).animation = "Shibai";
            this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).loop = false;
            this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).setCompleteListener(function () {
                this.mapNode.getChildByName("all_top_2").zIndex = 900;//todo
                this.mapNode.getChildByName("all_top_1").zIndex = 899;//todo
                cc.YL.isSkillingHerat = false;
                this._playerNode.getChildByName("HeartAnimation").active = false;
            }.bind(this));

        } else {
            this._playerNode.getComponent("Player")._emojiAnim("laugh");
            audio.playEffect("Skill_Player_Heart");
            this.showCover(custom, sprite, node);
            this._playerNode.getChildByName("HeartAnimation").active = true;
            this._playerNode.getChildByName("HeartAnimation").scale = 2;
            this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).animation = "Shouhu";
            this._playerNode.getChildByName("HeartAnimation").getComponent(sp.Skeleton).loop = false;
            setTimeout(function () {
                this._playerNode.getChildByName("HeartAnimation").active = false;
                this._playerNode.getComponent("Player").addBlood();
                this.endSkill();
            }.bind(this), 1000);
        }

    },
    skillWater: function (custom, sprite, node) {
        if( cc.YL.isSkillingWater == true){
            return;
        }
        cc.YL.isSkillingWater = true;
        if (cc.YL.PlayerSlime == false) {
            this._failureEmoji();
            this.mapNode.getChildByName("all_top_2").zIndex = 604;//todo
            this.mapNode.getChildByName("all_top_1").zIndex = 599;//todo
            this._playerNode.getChildByName("WaterAniamtion").active = true;
            this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).loop = false;
            this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).animation = "Shibai";
            this._playerNode.getChildByName("WaterAniamtion").scale = 2;
            this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).setCompleteListener(function () {
                this._playerNode.getChildByName("WaterAniamtion").scale = 1;
                this._playerNode.getChildByName("WaterAniamtion").active = false;
                cc.YL.isSkillingWater = false;
                this.mapNode.getChildByName("all_top_2").zIndex = 900;//todo
                this.mapNode.getChildByName("all_top_1").zIndex = 899;//todo

            }.bind(this));
        } else {
            this._playerNode.getComponent("Player")._emojiAnim("laugh");
            audio.playEffect("Skill_Player_Mucus");
            this._playerNode.getChildByName("WaterAniamtion").active = true;
            this.showCover(custom, sprite, node);
            this._playerNode.getChildByName("WaterAniamtion").scale = 1;
            this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).loop = false;
            this._playerNode.getChildByName("WaterAniamtion").getComponent(sp.Skeleton).animation = "Jineng";
            setTimeout(function () {
                this._playerNode.getChildByName("WaterAniamtion").active = false;
                cc.YL.PlayerSlime = false;
                this._playerNode.getComponent("Player").removeSlime();
                this.endSkill();
            }.bind(this), 1500);
        }
    },
    skillFire: function (custom, sprite, node) {
        if(cc.YL.isSkillingFire == true){
            return;
        }
        cc.YL.isSkillingFire = true;
        if (cc.YL.PlayerIce == false) {
            this._failureEmoji();
            this.mapNode.getChildByName("all_top_2").zIndex = 604;//todo
            this.mapNode.getChildByName("all_top_1").zIndex = 599;//todo
            this._playerNode.getChildByName("FireAniamtion").active = true;
            this._playerNode.getChildByName("FireAniamtion").scale = 2;
            this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).loop = false;
            this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).animation = "Shibai";
            this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).setCompleteListener(function () {
                this._playerNode.getChildByName("FireAniamtion").active = false;
                this.mapNode.getChildByName("all_top_2").zIndex = 900;//todo
                this.mapNode.getChildByName("all_top_1").zIndex = 899;//todo
                this._playerNode.getChildByName("FireAniamtion").scale = 1;
                cc.YL.isSkillingFire = false;
            }.bind(this));
        } else {
            this._playerNode.getComponent("Player")._emojiAnim("laugh");
            audio.playEffect("Skill_Player_Fire");
            this.showCover(custom, sprite, node);
            this._playerNode.getChildByName("FireAniamtion").active = true;
            this._playerNode.getChildByName("FireAniamtion").scale = 1;
            this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).loop = false;
            this._playerNode.getChildByName("FireAniamtion").getComponent(sp.Skeleton).animation = "Jineng";
            setTimeout(function () {
                this._playerNode.getChildByName("FireAniamtion").active = false;
                this._playerNode.getComponent("Player").removeIce();
                this.endSkill();
            }.bind(this), 1000);
        }
    },
    _initBtn: function (cvsJson) {
        var skillMap = {
            0: "Ice",
            3: "Heart",
            1: "Water",
            2: "Fire",
        };
        cc.YL.ClearStage = cc.YL.ClearStage == undefined ? 1 : cc.YL.ClearStage;
        // cc.YL.SkillInfo = {Ice: 100, Heart: 100, Water: 0, Fire:100};
        for(var j =1;j < 5;j++){
            cc.find("Canvas/PlayerSkill").getChildByName(cc.YL.SkillCsvJson[j].STR_CodeInfo).getComponent("SkillTimer").CDTime = cc.YL.SkillCsvJson[j].INT_CD;

        }
        for(var i = 0 ; i < 4;i++){
            if(cc.YL.SkillInfo[skillMap[i]] != 0 ){
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getComponent(cc.Button).interactable = true;
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).active = true;
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[i]).getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string = cc.YL.SkillInfo[skillMap[i]];
            }
        }

        for (var k = 1; k < 5; k++) {
            if(cc.YL.ClearStage < parseInt(cc.YL.SkillCsvJson[k].INT_LockStage) ){
                cc.find("Canvas/PlayerSkill").getChildByName(skillMap[parseInt(cc.YL.SkillCsvJson[k].INT_Type)-1]).active = false;
            }
        }
    },


    _failureEmoji() {
        this._playerNode.getComponent("Player")._emojiAnim("daze");
        for (var i = 0; i < this.mapNode.children.length; i++) {
            var first = this.mapNode.children[i].name.toString().slice(0, 1);
            var last = this.mapNode.children[i].name.toString().slice(-1);
            if (first == "B" && last == "M") {
                const random = Math.floor(Math.random() * 2);
                if (random == 1) {
                    this.mapNode.children[i].getComponent("Monster")._emojiAnim("laugh");
                }
            }
        }
    },

});
