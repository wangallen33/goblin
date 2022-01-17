cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.isBoom = false;
        this.isEffect = false;
        this.shaoxue = false;
        this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
        this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
        this.colliderPlayerNode = this.mapComp.playerNode;
        this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
    },

    start () {

    },
    showBoomNode: function (tile) {
        this._tile = tile;
        this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = "Chixu";
        this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = true;

    },
    showBoomEffect: function () {
        // 展示爆炸的效果
        this.isEffect = true;
        this.isBoom = true;
        // 预警
        audio.playEffect("Skill_Goblin_Bomb");
        this._showBoom(false);
        this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = "Baozha";
        this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = false;
        this.node.getChildByName("Animaion").getComponent(sp.Skeleton).setCompleteListener(function () {
            this.node.getChildByName("Animaion").active = false;
            this._showBoom(true);
            // this.playerEffect();
            setTimeout(function () {
                this.isBoom = false;
                this.node.removeFromParent();
            }.bind(this), 1000);
        }.bind(this));
    },
    //将像素坐标转化为瓦片坐标
    getTilePos: function (posInPixel) {
        var mapSize = this.mapNode.getContentSize();
        var tileSize = this.tiledMap.getTileSize();
        var x = Math.floor(posInPixel.x / tileSize.width);
        var y = Math.floor((mapSize.height - posInPixel.y) / tileSize.height);
        return cc.v2(x, y);
    },
    _showBoom: function (isSpine) {
        var instanNode = isSpine == true ? this.node.getChildByName("effect") : this.node.getChildByName("Warn");
        for (var a = 0; a < this.node.children.length; a++) {
            if (this.node.children[a].name == "Warn") {
                this.node.children[a].active = false;
            }
        }
        var node = cc.instantiate(instanNode);
        this.node.addChild(node);
        node.setPosition(isSpine == true ? 32 : 0, isSpine == true ? 10 : 0);
        node.active = true;
        var mapSize = this.mapComp.tiledMap.getMapSize();
        var isOver = false;
        for (var i = 1; i < 4; i++) {
            var newTile = cc.v2(this._tile.x, this._tile.y);
            newTile.x = newTile.x + i;
            if (newTile.x < 0 || newTile.x >= mapSize.width) {
                isOver = true;
            } else if (isOver != true) {
                var GID = this.mapComp.block.getTileGIDAt(newTile);
                if (GID == 0 && isOver == false) {
                    var node = cc.instantiate(instanNode);
                    this.node.addChild(node);
                    node.setPosition(isSpine == true ? 64 * i + 32 : 64 * i, isSpine == true ? 10 : 0);
                    node.active = true;
                } else {
                    isOver = true;
                }
            }
        }

        isOver = false;
        for (var j = 1; j < 4; j++) {
            var newTile = cc.v2(this._tile.x, this._tile.y);
            newTile.x = newTile.x - j;
            if (newTile.x < 0 || newTile.x >= mapSize.width) {
                isOver = true;
            } else if (isOver != true) {
                var GID = this.mapComp.block.getTileGIDAt(newTile);
                if (GID == 0 && isOver == false) {
                    var node = cc.instantiate(instanNode);
                    this.node.addChild(node);
                    node.setPosition(isSpine == true ? -64 * j + 32 : -64 * j , isSpine == true ? 10 : 0);
                    node.active = true;
                }
                else {
                    isOver = true;
                }
            }

        }
        isOver = false;
        for (var k = 1; k < 4; k++) {
            var newTile = cc.v2(this._tile.x, this._tile.y);
            newTile.y = newTile.y + k;
            if (newTile.y < 0 || newTile.y >= mapSize.height) {
                isOver = true;
            } else if (isOver != true) {
                var GID = this.mapComp.block.getTileGIDAt(newTile);
                if (GID == 0 && isOver == false) {
                    // cc.log("下方添加",newTile);
                    var node = cc.instantiate(instanNode);
                    this.node.addChild(node);
                    node.setPosition(isSpine == true ? 32 : 0, isSpine == true ? -64 * k + 10 : -64 * k);
                    node.active = true;
                } else {
                    isOver = true;
                }
            }
        }
        isOver = false;
        for (var l = 1; l < 4; l++) {
            var newTile = cc.v2(this._tile.x, this._tile.y);
            newTile.y = newTile.y - l;
            if (newTile.y < 0 || newTile.y >= mapSize.height) {
                isOver = true;
            } else if (isOver != true) {
                var GID = this.mapComp.block.getTileGIDAt(newTile);
                if (GID == 0 && isOver == false) {
                    // cc.log("上方添加",newTile);
                    var node = cc.instantiate(instanNode);
                    this.node.addChild(node);
                    node.setPosition(isSpine == true ? 32 : 0, isSpine == true ? 64 * l + 10 : 64 * l);
                    node.active = true;
                } else {
                    isOver = true;
                }
            }

        }
    },
    playerEffect: function () {
        var selfPos = this.node.getPosition();
        var otherPos = this.colliderPlayerNode.getPosition();
        if (Math.abs(selfPos.x - otherPos.x) < 15
            && Math.abs(selfPos.y - otherPos.y) < 15) {
            this.node.removeFromParent();
            this.colliderPlayerNode.getComponent("Player").underAttack();
        }
    }
    ,

    update(dt){
        var selfPos = this.node.getPosition();
        var otherPos = this.colliderPlayerNode.getPosition();
        if (Math.abs(selfPos.x - otherPos.x) < 15
            && Math.abs(selfPos.y - otherPos.y) < 15 && this.isBoom == false
            && this.isEffect == false) {
            this.showBoomEffect();
        }
    }
    ,
});
