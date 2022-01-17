cc.Class({
    extends: cc.Component,

    properties: {
        monsterNode: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
        this.mapNode = this.mapComp.mapNode;
    },

    start () {

    },

    // update (dt) {},
    initMonster: function (info) {
        this.monsterInfos = info;
        this.point = 0;
        this.alreadyTime = 0;
        this.brithPos = cc.v2(info.x, info.y - 64);
        this.node.setPosition(this.brithPos);
        //根据配置生成对应的怪物
        // cc.log(" 出生点：%s", this.node.name);
        // cc.log("出生点信息",info);
        this.dirArr = this.monsterInfos.Direction_Arr.toString();
        this.monsterArr = this.monsterInfos.ID_Arr.toString();
        this.intTime = parseInt(this.monsterInfos.Interval);
        this.order = parseInt(this.monsterInfos.Order);
        this.times = parseInt(this.monsterInfos.Time);
        // this.moveArr =  this.monsterInfos.Move_Arr ? this.monsterInfos.Move_Arr.toString() : "0,1,2";
        this.moveArr = this.monsterInfos.Move_Arr;
        this.dirArr = this.dirArr.split(",");
        this.monsterArr = this.monsterArr.split(",");
        this.moveArr = this.moveArr.split(",");
        this._initMonster();

    },
    _initMonster: function (reload) {
        this.alreadyTime++;
        var monsterNode = cc.instantiate(this.monsterNode);
        this.animationFunc = setTimeout(function () {
            this.node.getChildByName("Animaion").active = true;
            this.brithFunc = setTimeout(function () {
                if (!this.node) {
                    return;
                }
                this.node.getChildByName("Animaion").active = false;
                this.mapNode.addChild(monsterNode);
                this.mapComp.monsterArr.push(monsterNode);
                monsterNode.setPosition(this.brithPos);
                monsterNode.name = this.node.name + "_" + this.point+"_"+"M";
                // cc.log(this._getMonsterInfo());
                monsterNode.getComponent("Monster").initMonster(this._getMonsterInfo(),
                    this.mapComp.getTilePos(cc.v2(this.monsterInfos.x, this.monsterInfos.y)));
            }.bind(this), 400);
        }.bind(this), reload == true ? this.intTime : 50);

    },


    createNewMonster: function () {
        if (this.times != 0 && this.alreadyTime < this.times) {
            return;
        }
        setTimeout(function () {
            this._initMonster();
        }.bind(this), this.intTime);
    },
    _getMonsterInfo: function () {
        if (this.order == 0) {
            //  随机返回
            var dataNum = Math.floor(Math.random() * this.monsterArr.length);
        } else {
            if (this.point == this.monsterArr.length - 1) {
                var dataNum = this.point = 0;
            }
        }
        var data = {
            dir: this.dirArr[dataNum],
            id: this.monsterArr[dataNum],
            moveType: this.moveArr[dataNum],
        };
        this.point++;
        return data;
    },
    clearTime: function () {
        clearTimeout( this.animationFunc);
        clearTimeout(this.brithFunc);
    },
});
