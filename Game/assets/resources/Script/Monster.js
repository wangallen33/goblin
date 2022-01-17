const funCsv = require("./funCsv");

cc.Class({
    extends: cc.Component,

    properties: {
        boomNode: cc.Prefab,
        iceNode: cc.Prefab,
        slimeNode: cc.Prefab,
    },


    onLoad () {
        this.isNotUpdate = true;
        this.isIce = false;
        this.isSlime = false;
        this.underAttack = false;
        this.attackAction = false;
        this.scanTime = 0;
        this.BoomNum = 0;
        this.BoomArr = [];
        this.tilePoint = 0;
        this.scanBlock = false;
        this.isNothasDiamond = false;
    },

    start () {

    },
    onDestroy: function () {
        this.clearTime();
    },
    update (dt) {
        if (cc.YL.isPause == true) {
            this.node.stopAllActions();
            return;
        }
        if (this.isNotUpdate == true) {
            return;
        }
        if (this.underAttack == true) {
            this.node.stopAllActions();
            return;
        }
        if (cc.YL.isOver == true) {
            this.node.stopAllActions();
            return;
        }
        if (this.isIce == true) {
            this.node.stopAllActions();
            return;
        }
        var selfPos = this.node.getPosition();
        var otherPos = this.colliderPlayerNode.getPosition();
        var delatX = Math.abs(selfPos.x - otherPos.x);
        var delatY = Math.abs(selfPos.y - otherPos.y);
        var dis = Math.sqrt(delatX * delatX + delatY * delatY);
        if (((delatX < this.monsterAccleRag && delatY <= 10)
            || (delatY < this.monsterAccleRag && delatX <= 10))
            && this.isScan != 0 && this._moveType == 0 && cc.YL.PlayerTileArr.length > 1) {
            this.tilePoint = cc.YL.PlayerTileArr.length - 1;
            this.monsterScaning = true;
        }
        if (dis >= this.monsterAccleRag
            && this.isScan != 0 && this._moveType == 0) {
            this.monsterScaning = false;
            this.scanTime = 0;
        }
        if (delatX < this.monsterAccleRag
            && selfPos.y == otherPos.y
            && this.isScan != 0 && Math.abs(selfPos.x - otherPos.x) >= this.monsterAttackRag && this._moveType == 1
            && cc.YL.PlayerTileArr.length > 1) {
            this.monsterScaning = true;
        }
        if ((delatX >= this.monsterAccleRag || selfPos.y != otherPos.y)
            && this.isScan != 0 && this._moveType == 1) {
            this.monsterScaning = false;
            this.scanTime = 0;
        }
        if (delatY < this.monsterAccleRag
            && this.isScan != 0
            && Math.abs(selfPos.y - otherPos.y) >= this.monsterAttackRag && this._moveType == 2 && selfPos.x == otherPos.x
            && cc.YL.PlayerTileArr.length > 1) {
            this.monsterScaning = true;
        }
        if ((delatY >= this.monsterAccleRag || selfPos.x != otherPos.x)
            && this.isScan != 0 && this._moveType == 2) {
            this.monsterScaning = false;
            this.scanTime = 0;
        }
        if ((dis <= this.monsterAttackRag)
            && this.targetIsDead == false
            && this.colliderPlayerNode.getComponent("Player").allCanStatus == false) {
            this.targetIsDead = true;
            this._monsterAttack(selfPos.x, otherPos.x);
        }
        this._updateEmoji();
    },
    initMonster: function (data, tile) {
        cc.log("初始化哥布林", data);
        funCsv.turnCsvToJson('Csv/monster', function (csvJson) {
            this.cvsJson = csvJson;
            this.node.zIndex = 500;
            this.monsterScaning = false;
            this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
            this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
            this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
            this.colliderPlayerNode = this.mapComp.playerNode;
            this.targetIsDead = false;
            this.isNotUpdate = true;
            this.mosterStep = 0;
            this.monsterTile = tile;
            this._monsterID = parseInt(data.id);
            this._dir = data.dir;
            this._moveType = data.moveType;
            this._loadMonsterSet();
            setTimeout(function () {
                this.isNotUpdate = false;
            }.bind(this), 1000);
            const emoji = cc.instantiate(this.mapComp.emoji);
            this.mapComp.mapNode.addChild(emoji);
            this.emoji = emoji;
            this.emoji.zIndex = 1001;
        }.bind(this));
    },
    _loadMonsterSet: function () {
        this.isScan = 0;//  是否开启自动搜索
        this.monsterAttackRag = 64; // 攻击范围
        this.monsterAccleRag = 0; // 加速范围
        this.monsterSpeed = 0.66;
        this.monsterAcclSpeed = 0.33;
        if (this.cvsJson) {
            for (var i = 1; i <= utils.getCvsLength(this.cvsJson); i++) {
                if (parseInt(this.cvsJson[i].INT_ID) == parseInt(this._monsterID)) {
                    this.isScan = parseInt(this.cvsJson[i].INT_View);//  是否开启自动搜索
                    this.monsterAttackRag = parseInt(this.cvsJson[i].INT_Attack); // 攻击范围
                    this.monsterAccleRag = parseInt(this.cvsJson[i].INT_Follow); // 加速范围
                    this.monsterSpeed = 64 / parseInt(this.cvsJson[i].INT_WalkSpeed);
                    this.monsterAcclSpeed = 64 / parseInt(this.cvsJson[i].INT_RunSpeed);
                    this._monsterType = parseInt(this.cvsJson[i].INT_Type);
                    cc.log(this.cvsJson[i]);
                }
            }
        }
        this._showType();
    },
    _showType: function () {
        for (var i = 0; i < this.node.children.length; i++) {
            this.node.children[i].active = false;
        }
        switch (this._monsterType) {
            case 1: {
                this.monsterNode = this.node.getChildByName("normal");
                break;
            }
            case 9: {
                this.monsterNode = this.node.getChildByName("ice");
                break;
            }
            case 2: {
                this.monsterNode = this.node.getChildByName("white");
                break;
            }
            case 3: {
                this.monsterNode = this.node.getChildByName("green");
                break;
            }
            case 4: {
                this.monsterNode = this.node.getChildByName("blue");
                break;
            }
            case 5: {
                this.monsterNode = this.node.getChildByName("purple");
                break;
            }
            case 6: {
                this.monsterNode = this.node.getChildByName("orange");
                break;
            }
            case 7: {
                this.monsterNode = this.node.getChildByName("red");
                break;
            }
            case 8: {
                this.monsterNode = this.node.getChildByName("mucus");
                break;
            }
            case 10: {
                this.monsterNode = this.node.getChildByName("boom");
                break;
            }
            default: {
                this.monsterNode = this.node.getChildByName("normal");
            }
        }
        this.monsterNode.active = true;
        this.monsterNode.getChildByName("right").active = true;
        this.monsterNode.getChildByName("left").active = false;
        this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = false;
        this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).animation = "Born";
        setTimeout(function () {
            this._monsterStart();
        }.bind(this), 1500);
    },
    _monsterStart: function () {
        this._startMove();
        this.specialMonster();
    },
    _monsterReStart: function () {
        if (this.isIce == false) {
            this.isNotUpdate = false;
            this.specialMonster();
            this.monsterAutoMove();
        }
        cc.director.getScheduler().resumeTarget(this);
    },
    _getRandomDir: function (arr, maxTime) {
        maxTime++;
        if (maxTime >= 10) {
            this.startDir = arr[0];
            return;
        }
        var num = Math.floor(Math.random() * arr.length);
        var isWay = this.chargeTile(arr[num]);
        if (isWay == true) {
            this.startDir = arr[num];
        } else {
            this._getRandomDir(arr, maxTime);
        }
    },
    _startMove: function () {
        this.startDir = "";
        var monsterDirTypes = ["left", "right", "up", "down"];
        if (this._moveType == 0) {
            if (this._dir == 0) {
                this._getRandomDir(monsterDirTypes, 0);
            } else {
                this.startDir = monsterDirTypes[parseInt(this._dir) - 1];
            }
        } else if (this._moveType == 1) {
            if (this._dir == 0) {
                this._getRandomDir(["left", "right"], 0);
            } else {
                this.startDir = monsterDirTypes[parseInt(this._dir) - 1];
            }
        } else if (this._moveType == 2) {
            if (this._dir == 0) {
                this._getRandomDir(["up", "down"], 0);
            } else {
                this.startDir = monsterDirTypes[parseInt(this._dir) - 1];
            }
        }
        this.monsterAutoMove();
    },
    showDirSpr: function (dir) {
        this.monsterNode.getChildByName("left").active = false;
        this.monsterNode.getChildByName("right").active = false;
        this.monsterNode.getChildByName(dir).active = true;
    },
    monsterAutoMove: function () {
        if (cc.YL.isOver == true) {
            return;
        }

        if (!this.mapComp) {
            return;
        }
        if (this.monsterScaning == true && this.scanBlock == false) {
            this.scanTime++;
            this._showTanhao();
        } else {
            if (this.startDir == "") {
                this.monsterReAutoMove();
                this.monsterAutoMove();
                return;
            }
            if (this._moveType == 0 && this.monsterScaning != true) {
                //  随机移动
                if (this._dir == 0) {
                    this.startDir = this._getRandomDirSpecial(this.startDir);
                }
            }
            var newTile = cc.v2(this.monsterTile.x, this.monsterTile.y);
            switch (this.startDir) {
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
                this.monsterReAutoMove();
                this.monsterAutoMove();
                return;
            }
            if (newTile.y < 0 || newTile.y >= mapSize.height) {
                this.monsterReAutoMove();
                this.monsterAutoMove();
                return;
            }
            var GID = this.mapComp.block.getTileGIDAt(newTile);
            if (GID != 0) {//GID=0,则该Tile为空
                this.monsterReAutoMove();
                this.monsterAutoMove();
                return;
            }
        }
        if (this.monsterScaning == true && this.scanBlock == false
            && this.monsterTile && cc.YL.PlayerTileArr
            && this.tilePoint && this.tilePoint < cc.YL.PlayerTileArr.length) {
            if (this.monsterTile.x != cc.YL.PlayerTileArr[this.tilePoint].x
                && this.monsterTile.y != cc.YL.PlayerTileArr[this.tilePoint].y) {
                this.tilePoint--;
                this.scanBlock = true;
                this.monsterAutoMove();
                return;
            }
            if (this._chargeBlock(this.monsterTile, cc.YL.PlayerTileArr[this.tilePoint]) == false) {
                this.tilePoint--;
                this.scanBlock = true;
                this.monsterAutoMove();
                return;
            }
            if (cc.YL.PlayerTileArr[this.tilePoint].x == this.monsterTile.x) {
                cc.YL.PlayerTileArr[this.tilePoint].y - this.monsterTile.y > 0 ? this.startDir = "down" : this.startDir = "up";
            }
            if (cc.YL.PlayerTileArr[this.tilePoint].y == this.monsterTile.y) {
                cc.YL.PlayerTileArr[this.tilePoint].x - this.monsterTile.x > 0 ? this.startDir = "right" : this.startDir = "left";
            }
            // cc.log("追击方向", this.startDir, cc.YL.PlayerTileArr[this.tilePoint].x - this.monsterTile.x, cc.YL.PlayerTileArr[this.tilePoint].y - this.monsterTile.y);
            var speed = this.monsterAcclSpeed;
            this.startDir == "left" ? this.showDirSpr("left") : this.showDirSpr("right");
            this._showStatus("Run");
            // console.log("追击的tile变化1",this.monsterTile,this.node.position);
            this.monsterTile = newTile = cc.YL.PlayerTileArr[this.tilePoint];
            // console.log("追击的tile变化2",this.monsterTile,this.node.position);
            if (!this.followUp) {
                this.followUp = true;
                this._emojiAnim("surprise");
                this.colliderPlayerNode.getComponent("Player")._emojiAnim("terrified");
            }
        } else {
            var speed = this.monsterSpeed;
            this.startDir == "left" ? this.showDirSpr("left") : this.showDirSpr("right");
            this._showStatus("Walk");
            // console.log("normal的tile变化1",this.monsterTile,this.node.position);
            this.monsterTile = newTile;
            // console.log("normal的tile变化2",this.monsterTile,this.node.position);
            if (this.followUp) {
                this.followUp = false;
                this._emojiAnim("daze");
                this.colliderPlayerNode.getComponent("Player")._emojiAnim("sigh");
            }
        }
        this.mosterStep++;
        this.node.stopAllActions();
        if (!this.monsterTile) {
            return;
        }
        var pos = this.mapComp.block.getPositionAt(this.monsterTile);
        this.isAction = true;
        this.tilePoint++;
        var actionTimeX = this.node.getPosition().x - pos.x;
        var actionTimeY = this.node.getPosition().y - pos.y;
        if (this.monsterScaning == true && this.scanTime == 1) {
            if (Math.abs(actionTimeX) > 64) {
                speed = (this.monsterAcclSpeed ) * 1 * ( Math.abs(actionTimeX) / 64);
            }
            if (Math.abs(actionTimeY) > 64) {
                speed = (this.monsterAcclSpeed ) * 1 * (Math.abs(actionTimeY) / 64);
            }
        } else {
            if (Math.abs(actionTimeX) > 64) {
                speed = speed * ( Math.abs(actionTimeX) / 64);
            }
            if (Math.abs(actionTimeY) > 64) {
                speed = speed * (Math.abs(actionTimeY) / 64);
            }
        }
        this.node.runAction(cc.sequence(cc.moveTo(speed, pos),
            cc.callFunc(function () {
                this.ice(newTile, this.startDir);
                this._monsterCatch(newTile);
                this.mapComp.changeZIndex();
            }.bind(this)),
            cc.callFunc(function () {
                this.isAction = false;
                var isBoom = this.boomer(newTile);
                if (isBoom == false && this.isIce == false && !this.trigger && this.targetIsDead == false && this.attackAction == false) {
                    this.scanBlock = false;
                    this.monsterAutoMove();
                }
            }.bind(this))));

    },
    _chargeBlock: function (startTile, endTile) {

        if (startTile.x == endTile.x && endTile.y != startTile.y) {
            if (startTile.y < endTile.y) {
                for (var i = 0; i <= endTile.y - startTile.y; i++) {
                    var newTile = cc.v2(startTile.x, startTile.y);
                    newTile.y += i;
                    var GID = this.mapComp.block.getTileGIDAt(newTile);
                    if (GID != 0) {//GID=0,则该Tile为空
                        return false;
                    }
                }
            } else {
                for (var i = 0; i <= startTile.y - endTile.y; i++) {
                    var newTile = cc.v2(endTile.x, endTile.y);
                    newTile.y += i;
                    var GID = this.mapComp.block.getTileGIDAt(newTile);
                    if (GID != 0) {//GID=0,则该Tile为空
                        return false;
                    }
                }
            }
        }

        if (startTile.x != endTile.x && endTile.y == startTile.y) {
            if (startTile.x < endTile.x) {
                for (var i = 0; i <= endTile.x - startTile.x; i++) {
                    var newTile = cc.v2(startTile.x, startTile.y);
                    newTile.x += i;
                    var GID = this.mapComp.block.getTileGIDAt(newTile);
                    if (GID != 0) {//GID=0,则该Tile为空
                        return false;
                    }
                }

            } else {
                for (var i = 0; i <= startTile.x - endTile.x; i++) {
                    var newTile = cc.v2(endTile.x, endTile.y);
                    newTile.x += i;
                    var GID = this.mapComp.block.getTileGIDAt(newTile);
                    if (GID != 0) {//GID=0,则该Tile为空
                        return false;
                    }
                }
            }
        }
        return true;
    },
    _getRandomArr: function (DirArr) {
        var mapSize = this.mapComp.tiledMap.getMapSize();
        var newArr = [];
        for (var i = 0; i < DirArr.length; i++) {
            if (DirArr[i].x < 0 || DirArr[i].x >= mapSize.width) {
                newArr.push(false);
                continue;
            }
            if (DirArr[i].y < 0 || DirArr[i].y >= mapSize.height) {
                newArr.push(false);
                continue;
            }
            if (this.mapComp.block.getTileGIDAt(DirArr[i])) {//GID=0,则该Tile为空
                newArr.push(false);
                continue;
            }
            newArr.push(true);
        }
        return newArr;
    },
    _returnDir: function (type) {
        switch (type) {
            case "up": {
                return "down";
            }
            case "down": {
                return "up";
            }
            case "left": {
                return "right";
            }
            case "right": {
                return "left";
            }
        }
    },
    _getRandomDirSpecial: function (startDir) {
        if (!this.mapComp) {
            return;
        }
        if (!this.monsterTile) {
            return;
        }
        var fanDir = this._returnDir(startDir);
        var newTile = cc.v2(this.monsterTile.x, this.monsterTile.y);
        var isWayArr = this._getRandomArr([cc.v2(newTile.x, newTile.y -= 1), cc.v2(newTile.x, newTile.y += 2)
            , cc.v2(newTile.x -= 1, newTile.y -= 1), cc.v2(newTile.x += 2, newTile.y)]);
        var strMap = ["up", "down", "left", "right"];
        var canUseWay = [];
        for (var i = 0; i < isWayArr.length; i++) {
            if (isWayArr[i] == true && fanDir != strMap[i]) {
                canUseWay.push(strMap[i]);
            }
        }
        if (canUseWay.length == 0) {
            return fanDir;
        } else {
            var randomNum = Math.floor(Math.random() * canUseWay.length);
            return canUseWay[randomNum];
        }
    },
    monsterReAutoMove: function () {
        var monsterDirTypes = ["left", "right", "up", "down"];
        if (this._moveType == 0) {
            if (this._dir == 0) {
                this.startDir = this._getRandomDirSpecial(this.startDir);
            } else {
                this.startDir = monsterDirTypes[parseInt(this._dir) - 1];
            }
        } else if (this._moveType == 1) {
            if (this.startDir == "left") {
                this.startDir = "right";
            } else {
                this.startDir = "left";
            }
        } else if (this._moveType == 2) {
            if (this.startDir == "up") {
                this.startDir = "down";
            } else {
                this.startDir = "up";
            }
        }
    },
    chargeTile: function (type) {
        if (!this.mapComp) {
            return;
        }
        var newTile = cc.v2(0, 0);
        newTile.x = this.monsterTile.x;
        newTile.y = this.monsterTile.y;
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
        if (this.mapComp.block.getTileGIDAt(newTile)) {//GID=0,则该Tile为空
            return false;
        }
        return true;
    },

    _monsterAttack: function (selfx, otherx) {
        this._monsterAction(selfx, otherx);
    },
    specialMonster: function () {
        if (this._monsterType == 8) {
            this.slimeTimer = setTimeout(function () {
                this.slime();
            }.bind(this), 10000);
        }
    },
    _monsterAction: function (selfx, otherx) {
        if (this.attackAction == true) {
            return;
        }
        selfx - otherx >= 0 ? this.showDirSpr("left") : this.showDirSpr("right");
        this.attackAction = true;
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
                break;
        }
        audio.playEffect("Skill_Goblin_Attack_Normal");
        this.node.stopAllActions();
        this.colliderPlayerNode.getComponent("Player").underAttack();
        setTimeout(function () {
            this._showStatus("Stand");
            this.targetIsDead = false;
            this.attackAction = false;
            this.monsterAutoMove();
        }.bind(this), 3000);
    },
    _monsterCatch: function (newTile) {
        var node = this.mapComp.getDiamondNode(newTile);
        if (node != null) {
            if (node.getChildByName("Slime").active == true || node.getChildByName("Ice").active == true) {
                return;
            }
        }
        var GID = this.mapComp.diamond.getTileGIDAt(newTile);
        switch (this._monsterType) {
            case 2: {
                if (parseInt(GID - this.mapComp.diamondFirstGID) == 0) {
                    this.mapComp.diamond.setTileGIDAt(0, newTile);
                    this.mapComp._deletedDiamond(newTile);
                    this.mapComp.checkStageGoal();
                    const random = Math.floor(Math.random() * 2);
                    if (random == 1) {
                        this._emojiAnim("nice");
                    }
                }
                break;
            }
            case 3: {
                if (parseInt(GID - this.mapComp.diamondFirstGID) == 1) {
                    this.mapComp.diamond.setTileGIDAt(0, newTile);
                    this.mapComp._deletedDiamond(newTile);
                    this.mapComp.checkStageGoal();
                    const random = Math.floor(Math.random() * 2);
                    if (random == 1) {
                        this._emojiAnim("nice");
                    }
                }
                break;
            }
            case 4: {
                if (parseInt(GID - this.mapComp.diamondFirstGID) == 2) {
                    this.mapComp.diamond.setTileGIDAt(0, newTile);
                    this.mapComp._deletedDiamond(newTile);
                    this.mapComp.checkStageGoal();
                    const random = Math.floor(Math.random() * 2);
                    if (random == 1) {
                        this._emojiAnim("nice");
                    }
                }
                break;
            }
            case 5: {
                if (parseInt(GID - this.mapComp.diamondFirstGID) == 3) {
                    this.mapComp.diamond.setTileGIDAt(0, newTile);
                    this.mapComp._deletedDiamond(newTile);
                    this.mapComp.checkStageGoal();
                    const random = Math.floor(Math.random() * 2);
                    if (random == 1) {
                        this._emojiAnim("nice");
                    }
                }
                break;
            }
            case 6: {
                if (parseInt(GID - this.mapComp.diamondFirstGID) == 4) {
                    this.mapComp.diamond.setTileGIDAt(0, newTile);
                    this.mapComp._deletedDiamond(newTile);
                    this.mapComp.checkStageGoal();
                    const random = Math.floor(Math.random() * 2);
                    if (random == 1) {
                        this._emojiAnim("nice");
                    }
                }
                break;
            }
            case 7: {
                if (parseInt(GID - this.mapComp.diamondFirstGID) == 5) {
                    this.mapComp.diamond.setTileGIDAt(0, newTile);
                    this.mapComp._deletedDiamond(newTile);
                    this.mapComp.checkStageGoal();
                    const random = Math.floor(Math.random() * 2);
                    if (random == 1) {
                        this._emojiAnim("nice");
                    }
                }
                break;
            }

        }
    },

    clearTime: function () {
        clearTimeout(this.showSpliter);
        clearTimeout(this.slimeTimer);
        this.isNotUpdate = true;
        cc.director.getScheduler().pauseTarget(this);
    },
    _showStatus: function (status) {
        if (!this.monsterNode) {
            return;
        }
        // cc.log("monstershowstatus",status);
        if (status == "Run" || status == "Walk") {
            this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).loop = true;
            this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = true;
        }
        if (status == "Attack" || status == "Bing_Xiaochu") {
            this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).loop = false;
            this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).loop = false;
        }
        var dir = "";
        if (this.monsterNode.getChildByName("left") || this.monsterNode.getChildByName("right")) {
            if (this.monsterNode.getChildByName("left").active) {
                dir = "left";
                this.monsterNode.getChildByName("left").getComponent(sp.Skeleton).animation = status;
            } else {
                this.monsterNode.getChildByName("right").getComponent(sp.Skeleton).animation = status;
                dir = "right";
            }
        }
        return dir;

    },
    boomer: function (newTile) {
        if (this._monsterType == 10) {
            if (this.mosterStep < 6) {
                return false;
            }
            var isHasBoom = false;
            var mapSize = this.mapNode.getContentSize();
            var tileSize = this.tiledMap.getTileSize();
            for (var i = 0; i < this.mapNode.children.length; i++) {
                if (this.mapNode.children[i].name == "Boom"
                    && this.mapNode.children[i].x == newTile.x * tileSize.width
                    && this.mapNode.children[i].y == mapSize.height - tileSize.height * (newTile.y + 1)) {
                    isHasBoom = true;
                }
            }
            if (isHasBoom == true) {
                return false;
            }
            this.mosterStep = 0;
            this.node.stopAllActions();
            this._showStatus("Attack");
            var boomNode = cc.instantiate(this.boomNode);
            this.mapNode.addChild(boomNode);
            boomNode.setPosition(newTile.x * tileSize.width, mapSize.height - tileSize.height * (newTile.y + 1));
            boomNode.getComponent("Boom").showBoomNode(newTile);
            this.BoomArr.push(boomNode);
            setTimeout(function () {
                this.fixMonsterPos(2);
                this.monsterAutoMove();
            }.bind(this), 1000);
            this.BoomNum++;
            if (this.BoomNum >= 4) {
                this.BoomArr[0].getComponent("Boom").showBoomEffect(newTile);
                this.BoomArr.splice(0, 1);
                this.BoomNum--;
                return true;
            }
            return true;
        }
        return false;


    },
    ice: function (newTile, dir) {
        if (!this.mapComp) {
            return;
        }
        if (this._monsterType == 9) {
            var _newTile = cc.v2(newTile.x, newTile.y);
            var isHasIce = false;
            switch (dir) {
                case "up": {
                    _newTile.y -= 1;
                    break;
                }
                case "down": {
                    _newTile.y += 1;
                    break;
                }
                case "left": {
                    _newTile.x -= 1;
                    break;
                }
                case "right": {
                    _newTile.x += 1;
                    break;
                }
            }
            var mapSize = this.mapComp.tiledMap.getMapSize();
            if (_newTile.x < 0 || _newTile.x >= mapSize.width) {
                return;
            }
            if (_newTile.y < 0 || _newTile.y >= mapSize.height) {
                return;
            }
            if (this.mapComp.block.getTileGIDAt(_newTile)) {//GID=0,则该Tile为空
                return;
            }
            var node = this.mapComp.getDiamondNode(_newTile);
            if (node == null) {
                return;
            }
            if (node.getChildByName("Slime").active == true || node.getChildByName("Ice").active == true) {
                isHasIce = true;
            }
            if (isHasIce == true) {
                return;
            }
            var GID = this.mapComp.diamond.getTileGIDAt(_newTile);
            if (GID != 0) {
                // cc.log("冰冻成功");
                this.isIce = true;
                clearTimeout(this.showIce);
                this.node.stopAllActions();
                audio.playEffect("Skill_Goblin_Ice");
                this._showStatus("Attack");
                node.getChildByName("Ice").getComponent("Ice").showIceNode();
                this.showIce = setTimeout(function () {
                    this.isIce = false;
                    this.isNotUpdate = false;
                    this.fixMonsterPos(3);
                    this.monsterAutoMove();
                }.bind(this), 1000);
            }
        }
    },
    slime: function () {
        if (this.isNothasDiamond == true) {
            return;
        }
        if (!this.mapComp) {
            return;
        }
        this.mapComp._findDiamondPos();// 找到白色砖石
        if (this.mapComp.diamondPosArr.length <= 0) {
            this.isNothasDiamond = true;
            return;
        }
        var hasEmpty = false;
        for (var i = 0; i < this.mapComp.diamondPosArr.length; i++) {
            var randomInfo = this.mapComp.diamondPosArr[i];
            var node = this.mapComp.getDiamondNode(randomInfo.pos);
            if (node.getChildByName("Slime").active == false && node.getChildByName("Ice").active == false) {
                hasEmpty = true;
            }
        }
        if (hasEmpty == false) {
            return;
        }
        var _findNewDiamondPos = function () {
            if (this.isNothasDiamond == true) {
                return;
            }
            var randomNum = Math.floor(Math.random() * this.mapComp.diamondPosArr.length);
            var randomInfo = this.mapComp.diamondPosArr[randomNum];
            var isnotFind = false;
            var node = this.mapComp.getDiamondNode(randomInfo.pos);
            if (node == null) {
                return;
            }
            if (node.getChildByName("Slime").active == true || node.getChildByName("Ice").active == true) {
                isnotFind = true;
            }
            if (isnotFind == true) {
                _findNewDiamondPos();
            } else {
                var selfPosX = this.node.getPosition().x;
                var diamondPosX = randomInfo.pos.x;
                if (diamondPosX - selfPosX >= 0) {
                    this.showDirSpr("right");
                } else {
                    this.showDirSpr("left");
                }
                audio.playEffect("Skill_Goblin_Mucus");
                this._showStatus("Attack");
                this.node.stopAllActions();
                node.getChildByName("Slime").active = true;
                node.getChildByName("Slime").getComponent("Slime").showSlimeNode();
                this.showSpliter = setTimeout(function () {
                    this.isNotUpdate = false;
                    this.fixMonsterPos(4);
                    this.monsterAutoMove();
                    this.specialMonster();
                }.bind(this), 1000);
            }
        }.bind(this);
        _findNewDiamondPos();
    },
    stopSelf: function () {
        this._showStatus("Stand");
        this.clearTime();
        this.node.stopAllActions();
    },
    underIceAttacked: function (startPos) {
        if (this._underAttack == true) {
            return;
        }
        this._underAttack = true;
        this.node.stopAllActions();
        this.isIce = true;
        this._showStatus("Stand");
        this._emojiAnim("cry");
        this.node.stopAllActions();
        var selfPos = this.node.getPosition();
        var delatX = selfPos.x - startPos.x;
        var delatY = selfPos.y - startPos.y;
        var rota = (180 + Math.atan2(-delatY, -delatX) * 180 / Math.PI + 360) % 360;
        rota = (360 - rota - 90);
        var newVec2Start = this.node.convertToNodeSpace(cc.v2(startPos.x, startPos.y));
        this.node.getChildByName("arrow").active = true;
        this.node.getChildByName("arrow").setPosition(newVec2Start);
        this.node.getChildByName("arrow").rotation = rota;
        var callBackFunc = cc.callFunc(function () {
            // this._showStatus("Stand");
            this.node.getChildByName("arrow").active = false;
            this.node.getChildByName("underAttack").active = true;
            this.node.getChildByName("underAttack").getComponent(sp.Skeleton).loop = false;
            this.node.getChildByName("underAttack").getComponent(sp.Skeleton).animation = "Chuxian";
            this.node.getChildByName("underAttack").getComponent(sp.Skeleton).setCompleteListener(function () {
                this.node.getChildByName("underAttack").active = false;
                this._showStatus("Bing_Chixu");
                // this.node.getChildByName("underAttack").getComponent(sp.Skeleton).loop = true;
                // this.node.getChildByName("underAttack").getComponent(sp.Skeleton).animation = "Chixu";
            }.bind(this));
        }.bind(this));
        this.node.getChildByName("arrow").runAction(cc.sequence(cc.moveTo(0.5, 0, 0), callBackFunc));
        this.iceTimeOver = false;
        this.underIceTimer = function () {
            if (cc.YL.isClickPause == false) {
                this.removeIceAttacked();
            }
            this.iceTimeOver = true;
        }.bind(this);
        this.scheduleOnce(this.underIceTimer, 5);
    },
    removeIceAttacked: function () {
        // this.node.getChildByName("underAttack").getComponent(sp.Skeleton).loop = false;
        // this.node.getChildByName("underAttack").getComponent(sp.Skeleton).animation = "Xiaochu";
        // this.node.getChildByName("underAttack").getComponent(sp.Skeleton).setCompleteListener(function () {
        var dir = this._showStatus("Bing_Xiaochu");
        this.xiaoChuTimer = function () {
            this._underAttack = false;
            this.isIce = false;
            cc.YL.isPause = false;
            this.isNotUpdate = false;
            this.fixMonsterPos(1);
            this.specialMonster();
            this.monsterAutoMove();
        }.bind(this);
        this.scheduleOnce(this.xiaoChuTimer, 1);
        // this.monsterNode.getChildByName(dir).getComponent(sp.Skeleton).setCompleteListener(function () {

        // }.bind(this));

    },
    _showTanhao: function () {
        if (this.node.getChildByName("Tanhao").active == true || this.scanTime > 1) {
            return;
        }
        this.node.getChildByName("Tanhao").active = true;
        setTimeout(function () {
            this.node.getChildByName("Tanhao").active = false;
        }.bind(this), 500)
    },

    _updateEmoji() {
        const emoji = this.emoji;
        emoji.setPosition(this.node.x + 55, this.node.y + 108);
    },

    _emojiAnim(type) {
        if (this.emojiType == type) {
            return;
        }
        console.log("monster's emoji type", type);
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
        setTimeout(function () {
            this.emojiType = null;
            this.emoji.active = false;
        }.bind(this), 1500);
    },
    fixMonsterPos : function(num){
        return;
        // 暂时不用
        console.log("fixMonsterPos————————————start",this.node.position,num);
        this.node.x = this.monsterTile.x * 64;
        this.node.y = 1664 - this.monsterTile.y * 64;
        console.log("fixMonsterPos————————————end",this.node.position,num);

    },
});
