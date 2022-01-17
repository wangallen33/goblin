const funCsv = require("./funCsv");
const Guide = require("./Guide");

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        funCsv.turnCsvToJson('Csv/player', function (csvJson) {
            this.moveSpeed = 1;
            this.lowSpeed = 2;
            for (var i = 1; i <= utils.getCvsLength(csvJson); i++) {
                if (parseInt(csvJson[i].INT_ID) == cc.YL.PlayerRole) {
                    this.moveSpeed = csvJson[i].INT_MoveSpeed / 60;
                    this.lowSpeed = csvJson[i].INT_MoveSpeed / 120;
                    this._showType(csvJson[i].STR_Resource);
                }
            }
            this.lowSpeed = this.lowSpeed = undefined ? 1 : this.lowSpeed;
            this.moveSpeed = this.moveSpeed = undefined ? 2 : this.moveSpeed;
            this.lowSpeed = parseInt(this.lowSpeed) + 0.5;
            this.moveSpeed = parseInt(this.moveSpeed) + 0.5;
            cc.log("玩家速度", this.moveSpeed, this.lowSpeed);
            cc.YL.PlayerIce = false;
            cc.YL.PlayerSlime = false;
            cc.YL.PlayerAttack = false;
            if (cc.find("Canvas/PlayerSkill")) {
                this.skillNodeCom = cc.find("Canvas/PlayerSkill").getComponent("PlayerSkill");
            }
            this.lifeNum = 3;
            this.allCanStatus = false;
            this.isLow = false;
            if (cc.find("Canvas/MapRoot")) {
                this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
            }
            this.catchArr = [];
            this.node.zIndex = 700;//
            if (this.mapComp) {
                this.mapComp.lifeNode.getChildByName("num").getComponent(cc.Label).string = this.lifeNum;
            }
            cc.YL.PlayerTileArr = [];
            if (cc.YL.playerTile) {
                cc.YL.PlayerTileArr.push(new cc.v2(cc.YL.playerTile.x, cc.YL.playerTile.y));
            }
            this.slimeTime = 5000;
            this.iceTime = 5000;
            this.playerStatus = "Stand";
            this.playerDir = "right";
            if (this.mapComp) {
                const emoji = cc.instantiate(this.mapComp.emoji);
                this.mapComp.mapNode.addChild(emoji);
                this.emoji = emoji;
                this.emoji.zIndex = 1001;
                this._updateEmojiCoinJump();
            }
            this.deciding = true;
        }.bind(this));

    },

    start () {
        this.showStatus("Stand");
    },
    removeFunc: function () {
        this.showStatus("Stand");
        cc.YL.IsCanMove = true;
        this.isAction = false;
    },
    showDifferentDir: function (dir) {
        // console.log("showDifferentDir",dir,this.playerDir);
        if (this.playerDir == dir) {
            return;
        }
        this.playerDir = dir;
        if (dir == "left") {
            this.roleNode.getChildByName("left").active = true;
            this.roleNode.getChildByName("right").active = false;
            this.roleNode.getChildByName("left").getComponent(sp.Skeleton).animation = this.playerStatus;
        } else {
            this.roleNode.getChildByName("left").active = false;
            this.roleNode.getChildByName("right").active = true;
            this.roleNode.getChildByName("right").getComponent(sp.Skeleton).animation = this.playerStatus;
        }

    },


    _tryToCatchDiamond: function (newTile) {
        var GID = this.mapComp.diamond.getTileGIDAt(newTile);
        if (GID != 0) {
            // console.log("获取一个砖石");
            audio.playEffect('Player_Collect');
            cc.YL.currCatch = GID - this.mapComp.diamondFirstGID;       // 当前拾取的宝石种类
            var oldScore = cc.find("Canvas/Score/num").getComponent(cc.Label).string;
            //todo  分数配置公式
            const score = parseInt(oldScore) + parseInt(cc.YL.SkillCsvJson[parseInt(GID - this.mapComp.diamondFirstGID) + 5].INT_Gold);
            this.playerScore = cc.find("Canvas/Score/num").getComponent(cc.Label).string = score;
            if (cc.YL.loadMapStage > 0) {
                if (GID - this.mapComp.diamondFirstGID > 1) {
                    this._emojiAnim("nice");
                }
                this._coinJumpAnim();
            }
            this.catchArr.push(GID - this.mapComp.diamondFirstGID);
            this.mapComp.diamond.setTileGIDAt(0, newTile);
            this.mapComp._deletedDiamond(newTile);
            // this.skillNodeCom.updatePower(GID - this.mapComp.diamondFirstGID);
            this._createNewDiamond();
            this._removeDiamondEffect(newTile);
            this.mapComp.checkStageStatus(GID - this.mapComp.diamondFirstGID + 2);
        }
    },

    _createNewDiamond: function () {
        if (this.catchArr.length == 2) {
            this._analysisCatchArr();
        }
        if (this.catchArr.length == 3) {
            this.catchArr.splice(0, 1);
            this._analysisCatchArr();
        }
    },
    _removeDiamondEffect: function (newTile) {
        var node = this.mapComp.getDiamondNode(newTile);
        if (node == null) {
            return;
        }
        var isEffect = false;
        if (node.getChildByName("Slime").active == true) {
            // 启动slime
            isEffect = true;
            node.getChildByName("Slime").getComponent("Slime").showSlimeEffect();
        }
        if (node.getChildByName("Ice").active == true && isEffect == false) {
            // 启动ice
            node.getChildByName("Ice").getComponent("Ice").showIceEffect();
        }
        if (node.getChildByName("Slime").active == true || node.getChildByName("Ice").active == true) {
            node.getChildByName("Slime").active = false;
            node.getChildByName("Ice").active = false;
        }


    },
    _analysisCatchArr: function () {
        if (this.catchArr[0] == this.catchArr[1]) {
            this._initNewDiamond(this.catchArr[0]);
        }
    },
    _initNewDiamond: function (type) {
        if (type == 5) {
            return;
        }
        //毒液宝石和冰冻宝石。。。。区间内的type
        if (type >= 6 && type < 11) {
            this.catchArr = [];
            return;
        }
        if (type >= 12 && type < 18) {
            this.catchArr = [];
            return;
        }
        this.mapComp._findDiamondPos();
        if (this.mapComp.diamondPosArr.length == 0) {
            this.catchArr = [];
            return;
        }
        if (cc.YL.loadMapStage < 1 && !this.guideUpgrade) {
            this.guideUpgrade = true;
            Guide.getInstance().showGuideDialogue();
        } else {
            var randomNum = Math.floor(Math.random() * this.mapComp.diamondPosArr.length);
            this.mapComp._showDiamond(this.mapComp.diamondPosArr[randomNum].pos, (type + 1), true);
            this.mapComp.diamond.setTileGIDAt(type + this.mapComp.diamondFirstGID + 1, this.mapComp.diamondPosArr[randomNum].pos);
        }
        this.catchArr = [];
        cc.YL.currCatch = null;
    },
    allCanDo: function () {
        // this.showStatus("Stand");
        this.showStatus("Hurt");
        //
        // // this.roleNode.getChildByName(dir).getComponent(sp.Skeleton).setCompleteListener(function () {
        // // }.bind(this));
        this.scheduleOnce(function () {
            this.allCanStatus = false;

        }.bind(this, 3));
    },
    showStatus: function (status) {
        // console.log("status",status,this.playerStatus);
        if (cc.YL.PlayerIce == true) {
            status = "Bing_Chixu";
        }
        if (cc.YL.PlayerAttack == true && status == "Stand") {
            return;
        }
        if (cc.YL.PlayerSlime == true) {
            status = "Du_" + status;
        }
        if (this.playerStatus == status) {
            return;
        }
        this.playerStatus = status;
        console.log("玩家播放的动画状态", status);
        if (!this.roleNode) {
            var choiceNum = cc.YL.PlayerRole ? cc.YL.PlayerRole : 1;
            this.roleNode = null;
            this.roleNode = this.node.getChildByName(choiceNum.toString());
        }
        if (status == "Lose" || status == "Win" || status == "Hurt"
            || status == "Du_Lose" || status == "Du_Win" || status == "Du_Hurt") {

            this.roleNode.getChildByName("left").getComponent(sp.Skeleton).loop = false;
            this.roleNode.getChildByName("right").getComponent(sp.Skeleton).loop = false;
        } else {
            this.roleNode.getChildByName("left").getComponent(sp.Skeleton).loop = true;
            this.roleNode.getChildByName("right").getComponent(sp.Skeleton).loop = true;
        }

        if (this.roleNode.getChildByName("left").active) {
            var dir = "left";
            this.roleNode.getChildByName("left").getComponent(sp.Skeleton).animation = status;
        } else {
            var dir = "right";
            this.roleNode.getChildByName("right").getComponent(sp.Skeleton).animation = status;
        }
        if (status == "Hurt" || status == "Du_Hurt") {
            this.roleNode.getChildByName(dir).getComponent(sp.Skeleton).setCompleteListener(function () {
                cc.YL.PlayerAttack = false;
            }.bind(this));
        }
        // cc.log("玩家播放的动画节点",dir);
        if (status != "Run") {
            // audio.stopEffect("playerRun");
        }
        return dir;


    },
    underSlime: function () {
        if (this.isLow == true) {
            return;
        }
        this.effectTimer( this.slimeTime);
        this._emojiAnim("sweat");
        audio.playEffect("Status_Mucus");
        this.isLow = true;
        cc.YL.PlayerSlime = true;
        setTimeout(function (dt) {
            if(cc.YL.isPause != true){
                this.removeSlime();
            }

        }.bind(this), this.slimeTime);

    },
    removeSlime: function () {
        this.isLow = false;
        cc.YL.PlayerSlime = false;
        this.unschedule(this._timer);
    },
    underIce: function () {
        // 玩家被冰冻
        //todo
        if (this._underIce == true) {
            return;
        }
        this.effectTimer(this.iceTime);
        cc.YL.TouchMoveDir = "";
        // cc.log("玩家被冰冻");
        this._emojiAnim("ill");
        audio.playEffect("Status_Ice");
        this._underIce = true;
        cc.YL.IsCanMove = false;
        cc.YL.PlayerIce = true;
        this.showStatus("Bing_Chixu");
        this.underIceTime = setTimeout(function (dt) {
            cc.log("冰冻时间",dt);
            if(cc.YL.isPause != true){
                this.removeIce();
            }
        }.bind(this), this.iceTime);
    },
    removeIce: function () {
        clearTimeout(this.underIceTime);
        cc.YL.PlayerIce = false;
        cc.YL.IsCanMove = true;
        this._underIce = false;
        this.isAction = false;
        cc.YL.canTouch = true;
        this.showStatus("Stand");
        this.unschedule(this._timer);

    },
    effectTimer: function(startTime){
        // 对玩家的特效时间记录
        this._startTime = startTime/1000;
        cc.log("对玩家的特效时间记录",this._startTime);
        this.schedule(this._timer, 0.1);
    },
    _timer:function(){
        if(cc.YL.isPause != true){
            this._startTime = this._startTime - 0.1;
        }
        if(this._startTime <= 0){
            this.unschedule(this._timer);
        }
    },
    goOnEffect: function(){
        cc.log("暂停回来",this._startTime);
        if(this._startTime > 0){
            setTimeout(function(){
                this.removeIce();
                this.removeSlime();
            }.bind(this),this._startTime * 1000);
        }else {
            this.removeIce();
            this.removeSlime();
        }
    },
    reduceBlood: function () {
        // cc.log("reduceBlood");
        var lifeNode = this.mapComp.lifeNode;
        lifeNode.getChildByName("num").getComponent(cc.Label).string = parseInt(lifeNode.getChildByName("num").getComponent(cc.Label).string) - 1;
        this.lifeNum--;
        // 少一血
    },
    addBlood: function () {
        // 加一血
        var lifeNode = this.mapComp.lifeNode;
        lifeNode.getChildByName("num").getComponent(cc.Label).string = parseInt(lifeNode.getChildByName("num").getComponent(cc.Label).string) + 1;
        this.lifeNum++;
    },
    getBlood: function () {
        // 查询血量
        var lifeNode = this.mapComp.lifeNode;
        return parseInt(lifeNode.getChildByName("num").getComponent(cc.Label).string);
    },
    _showType: function () {
        // 展示不同玩家形象
        // cc.YL.PlayerRole = 2
        var choiceNum = cc.YL.PlayerRole;
        this.roleNode = null;
        this.roleNode = this.node.getChildByName(choiceNum.toString());
        this.node.getChildByName("1").active = false;
        this.node.getChildByName("2").active = false;
        this.node.getChildByName("3").active = false;
        this.roleNode.active = true;
        if (this.hallStand) {
            this._showIdle();
        }
    },

    _showIdle() {
        if (this.showId) {
            clearTimeout(this.showId);
        }
        this.showId = setTimeout(function () {
            if (!this.roleNode) {
                return;
            }
            const idle = "Idle" + (Math.floor(Math.random() * 2) + 1);
            this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setCompleteListener(function () {
                this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setAnimation(0, "Stand", true);
                this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setCompleteListener(function () {
                });
                this._showIdle();
            }.bind(this));
            this.roleNode.getChildByName("right").getComponent(sp.Skeleton).setAnimation(0, idle, false);
        }.bind(this), 5000);
    },

    underAttack: function () {
        if (this.allCanStatus == true) {
            return;
        }
        if (cc.YL.isOver == true) {
            return;
        }
        cc.YL.TouchMoveDir = "";
        cc.YL.PlayerIce = false;// todo
        this.allCanStatus = true;
        cc.YL.PlayerAttack = true;
        this.node.pauseAllActions();
        this.node.stopAllActions();
        this.isAction = false;
        this.reduceBlood();
        this._emojiAnim("cry");
        if (this.lifeNum <= 0) {
            this.showStatus("Lose");
            this.node.stopAllActions();
            this.mapComp.StopAllMap();
            this.mapComp.stageFail();
            cc.YL.isOver = true;
            // cc.log("玩家死亡");
        } else {
            // cc.log("玩家少一血");
            this.allCanDo();
        }
    },
    getTileYToPos: function (tileY) {
        var posArr = [
            1664, 1600, 1536, 1472, 1408, 1344, 1280, 1216, 1152, 1088, 1024, 960, 896, 832, 768, 704, 640, 576, 512, 448, 384, 320, 256, 192, 128, 64, 0
        ];
        return posArr[tileY];

    },
    fixPos : function(normalPos,nowPos){
        if(normalPos > nowPos){
            if((normalPos - nowPos)%4 == 0 ){
                nowPos +=4;
            }else if((normalPos - nowPos)%2 == 0){
                nowPos +=2;
            }{
                nowPos +=1;
            }

        }else if(normalPos < nowPos){
            if((nowPos - normalPos)%4 == 0 ){
                nowPos -=4;
            }else if((nowPos - normalPos)%2 == 0 ){
                nowPos -=2;
            } {
                nowPos -=1;
            }

        }else {
            return nowPos;
        }
        return nowPos;
    },
    update (dt) {
        if (!this.roleNode) {
            return;
        }
        let dir;
        if (this.roleNode.getChildByName("left").active) {
            dir = "left";
        } else {
            dir = "right";
        }
        if (this.paused) {
            this.node.stopAllActions();
            this.roleNode.getChildByName(dir).getComponent(sp.Skeleton).paused = true;
            return;
        } else {
            this.roleNode.getChildByName(dir).getComponent(sp.Skeleton).paused = false;
        }
        this.playerMove();
    },
    playerMove: function () {
        var type = cc.YL.TouchMoveDir;
        if (!type) {
            cc.YL.TouchMoveDir = "";
            this.showStatus("Stand");
            // this.showStatus("Bing_Jineng");
            return;
        }
        var playerMoveSpeed = cc.YL.PlayerSlime == false ? this.moveSpeed : this.lowSpeed;
        // var playerMoveSpeed =  cc.YL.PlayerSlime == false ? 4 :1; //todo
        var delatPos = 32;
        var delatPosY = 32;
        var nodePosX = this.node.x;
        var nodePosY = this.node.y;
        var isCanMove = this.chargeDirBlock(type, cc.YL.playerTile.x, cc.YL.playerTile.y);
        var tileYPos = this.getTileYToPos(cc.YL.playerTile.y);
        // console.log("isCanMove!!!!!!!!!!!!!!!",isCanMove);
        if (isCanMove == false) {
            var lineX = cc.YL.playerTile.x * 64;
            var lineY = this.getTileYToPos(cc.YL.playerTile.y);
            if ("up" == type && this.node.y <= lineY && Math.abs((cc.YL.playerTile.x * 64) - nodePosX) <= delatPos) {
                this.node.y += playerMoveSpeed;
                this.node.x = this.fixPos(cc.YL.playerTile.x * 64, this.node.x);
            } else if ("down" == type && this.node.y >= lineY && Math.abs((cc.YL.playerTile.x * 64) - nodePosX) <= delatPos) {
                this.node.y -= playerMoveSpeed;
                this.node.x = this.fixPos(cc.YL.playerTile.x * 64, this.node.x);
            } else if ("left" == type && this.node.x >= lineX && Math.abs(tileYPos - nodePosY) <= delatPosY) {
                this.node.x -= playerMoveSpeed;
                this.node.y = this.fixPos(this.getTileYToPos(cc.YL.playerTile.y), this.node.y);
                this.showDifferentDir(type);
            } else if ("right" == type && this.node.x <= lineX && Math.abs(tileYPos - nodePosY) <= delatPosY) {
                this.node.x += playerMoveSpeed;
                this.node.y = this.fixPos(this.getTileYToPos(cc.YL.playerTile.y), this.node.y);
                this.showDifferentDir(type);
            } else {
                cc.YL.TouchMoveDir = "";
                this.showStatus("Stand");
                return;
            }
        } else {
            if ((type == "up" || type == "down") && Math.abs((cc.YL.playerTile.x * 64) - nodePosX) <= delatPos) {
                type === "up" ? this.node.y += playerMoveSpeed : this.node.y -= playerMoveSpeed;
                this.node.x = this.fixPos(cc.YL.playerTile.x * 64, this.node.x);
            } else if ((type == "left" || type == "right") && Math.abs(tileYPos - nodePosY) <= delatPosY) {
                type === "left" ? this.node.x -= playerMoveSpeed : this.node.x += playerMoveSpeed;
                this.node.y = this.fixPos(this.getTileYToPos(cc.YL.playerTile.y), this.node.y);
                this.showDifferentDir(type);
            }
        }
        this.showStatus("Run");
        this._updateEmojiCoinJump();
        // audio.playEffect("Player_Run");
        if ((nodePosX % 64 <= delatPos || nodePosX % 64 >= (64 - delatPos))
            && ( (nodePosY - 640) % 64 <= delatPosY || (nodePosY - 640) % 64 >= (64 - delatPosY))) {
            var newTileX = Math.round(nodePosX / 64);
            var newTileY = Math.round(16 - (nodePosY - 640) / 64);
            //todo
            cc.YL.playerTile.x = newTileX;
            cc.YL.playerTile.y = newTileY;
            this.pushTileOnly(new cc.v2(newTileX, newTileY));
            this._tryToCatchDiamond(cc.YL.playerTile);
            this.mapComp.changeZIndex();
        }
        if (cc.YL.loadMapStage < 1) {
            Guide.getInstance().updateOperateIdx();
        }
    },
    pushTileOnly: function (tiles) {
        // console.log("tileArr",  cc.YL.PlayerTileArr.length,cc.YL.PlayerTileArr,tiles);
        if (cc.YL.PlayerTileArr.length != 0) {
            if (cc.YL.PlayerTileArr[cc.YL.PlayerTileArr.length - 1].x != tiles.x
                || cc.YL.PlayerTileArr[cc.YL.PlayerTileArr.length - 1].y != tiles.y) {
                cc.YL.PlayerTileArr.push(tiles);
                audio.playEffect("Player_Run");
            }
        } else {
            cc.YL.PlayerTileArr.push(tiles);
        }
    },
    chargeDirBlock: function (type, tileX, tileY) {

        // console.log("判断障碍", type, tileX, tileY);
        // 根据坐标判断上下左右障碍
        var newTile = cc.v2(tileX, tileY);
        switch (type) {
            case "up": {
                newTile.y -= 1;
                break;
            }
            case "down": {
                newTile.y += 1;

                break;
            }
            case "left": {
                newTile.x -= 1;
                break;
            }
            case "right": {
                newTile.x += 1;
                break;
            }

        }

        var mapSize = this.mapComp.tiledMap.getMapSize();
        if (newTile.x < 0 || newTile.x >= mapSize.width) {
            return false;
        }
        if (newTile.y < 0 || newTile.y >= mapSize.height) {
            return false;
        }
        if (this.mapComp.block.getTileGIDAt(newTile) != 0) {//GID=0,则该Tile为空
            return false;
        }
        return true;
    },


    _updateEmojiCoinJump() {
        const emoji = this.emoji;
        emoji.setPosition(this.node.x + 55, this.node.y + 108);
        const coin = this.mapComp.coinJump;
        coin.setPosition(this.node.x + 30, this.node.y + 136);
    },

    _coinJumpAnim() {
        const coin = this.mapComp.coinJump;
        coin.active = true;
        coin.getComponent(sp.Skeleton).setCompleteListener(function () {
            coin.active = false;
            coin.getComponent(sp.Skeleton).animation = null;
        });
        coin.getComponent(sp.Skeleton).setAnimation(0, "Coin", false);
    },

    _emojiAnim(type) {
        if (this.emojiType == type) {
            return;
        }
        console.log("player's emoji type", type);
        if (this.emojiId) {
            clearTimeout(this.emojiId);
        }
        const emojiMap = {
            nice: "Face_Nice",
            terrified: "Face_Terrified",
            sigh: "Face_Sigh",
            cry: "Face_Cry",
            daze: "Face_Daze",
            laugh: "Face_Laugh",
            sweat: "Face_Sweat",
            ill: "Face_Ill",
            surprise: "Face_Surprise",
        };
        this.emojiType = type;
        this.emoji.active = true;
        this.emoji.getComponent(sp.Skeleton).setAnimation(0, emojiMap[type], true);
        this.emojiId = setTimeout(function () {
            this.emojiType = null;
            this.emoji.active = false;
        }.bind(this), 1500);
    },
});
