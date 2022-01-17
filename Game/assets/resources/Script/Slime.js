
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
        this.mapComp = cc.find("Canvas/MapRoot").getComponent("Map");
        this.colliderPlayerNode = this.mapComp.playerNode;
    },

    start () {
        this.node.zIndex = 101;
    },
    showSlimeNode: function(){
        this.isSlime = false;
        this.node.getComponent(sp.Skeleton).animation = "Chuxian";
        this.node.getComponent(sp.Skeleton).loop = false;
        this.node.getComponent(sp.Skeleton).setCompleteListener(function(){
            this.node.getComponent(sp.Skeleton).animation = "Chixu";
            this.node.getComponent(sp.Skeleton).loop = true;
        }.bind(this));

    },
    showSlimeEffect: function(){
        // 展示效果
        // console.log("粘液处理");
        this.mapComp.stageGoal.venom++;
        this.mapComp.checkStageGoal();
        this.isSlime = true;
        this.colliderPlayerNode.getComponent("Player").underSlime();

    },


    update (dt) {
        //
        // var selfPos = this.node.parent.getPosition();
        // var otherPos = this.colliderPlayerNode.getPosition();
        //
        // if (Math.abs(selfPos.x - otherPos.x) <= 11
        //     && Math.abs(selfPos.y - otherPos.y) <= 11 && this.isSlime == false) {
        //     // console.log("slime的坐标",selfPos,otherPos);
        //     this.showSlimeEffect();
        //
        // }

    },
});
