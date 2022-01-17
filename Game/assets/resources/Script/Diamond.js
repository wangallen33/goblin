// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

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
        this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
        this.tiledMap = this.mapNode.getComponent(cc.TiledMap);

    },

    start () {

    },
    show: function (pos, type, isAdd) {
        this.info = pos;
        var mapSize = this.mapNode.getContentSize();
        var tileSize = this.tiledMap.getTileSize();
        this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = false;
        this.node.zIndex = 100;
        var typeName = isAdd == false ? (parseInt(type) + 1).toString() : (parseInt(type) + 7).toString();
        // cc.log("显示钻石typeName", typeName,pos);
        this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = typeName;
        this.node.setPosition(pos.x * tileSize.width, mapSize.height - tileSize.height * (pos.y + 1));
        if(isAdd == true){
            setTimeout(function(){
                if (this.node) {
                    this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = false;
                    this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = (parseInt(type) + 1).toString();
                }
            }.bind(this),500);
        }else{
            this.node.getChildByName("Animaion").getComponent(sp.Skeleton).loop = false;
            this.node.getChildByName("Animaion").getComponent(sp.Skeleton).animation = typeName;
        }
    },
    // update (dt) {},
});
