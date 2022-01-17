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
        // cc.log("<><><><><><><><><><><><>>>>>>>>>>>>>>>onLoad   boomeffect");
        this.shaoxue = false;
        this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
        this.mapNode = cc.find("Canvas/MapRoot").getChildByName("map");
        this.colliderPlayerNode = this.mapComp.playerNode;
        this.tiledMap = this.mapNode.getComponent(cc.TiledMap);
    },

    start () {

    },

    playerEffect: function () {
        // cc.log("<><><><><><><><><><><><>>>>>>>>>>>>>>>boomeffect");
        this.shaoxue = true;
        this.colliderPlayerNode.getComponent("Player").underAttack();
        this.node.getComponent(sp.Skeleton).setCompleteListener(function(){
            this.node.parent.removeFromParent();
        }.bind(this));
    },

    update(dt){
        // var selfPos = this.node.getPosition();
        var otherPos = this.colliderPlayerNode.getPosition();
        var otherNodePos = this.node.convertToNodeSpaceAR(cc.v2(otherPos.x, otherPos.y));
        // cc.log("selfPos",selfPos);
        // cc.log("otherPos",otherPos);
        // cc.log("otherNodePos",otherNodePos);
        if ((Math.abs(otherNodePos.x ) <= 32
            && Math.abs(otherNodePos.y ) <= 32)
            && this.shaoxue == false) {
            //爆炸
            this.playerEffect();

        }
        // 触发爆炸

    },
});
