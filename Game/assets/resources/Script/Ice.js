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

    onDisable: function () {//节点隐藏后
        this.node.getComponent(sp.Skeleton).animation = "Chuxian";// 恢复默认的chuxian动画
    },
    start () {
        this.node.zIndex = 100;
    },
    showIceNode: function () {
        this.isIce = false;
        this.node.getComponent(sp.Skeleton).animation = "Chuxian";// 使用出现动画
        this.node.active = true; //节点显示
        this.node.getComponent(sp.Skeleton).loop = false; //不使用循环
        this.node.getComponent(sp.Skeleton).setCompleteListener(function () { //  出现动画播放完毕后的播放持续动画
            this.node.getComponent(sp.Skeleton).animation = "Chixu";
            this.node.getComponent(sp.Skeleton).loop = true; //循环播放
        }.bind(this));

    },
    showIceEffect: function () {
        // 展示的效果
        cc.log("冰冻到了玩家");
        this.mapComp.stageGoal.ice++;
        this.mapComp.checkStageGoal();
        this.node.active = false; //节点显示
        this.isIce = true;
        this.colliderPlayerNode.getComponent("Player").underIce();

    },


    update (dt) {
        // var selfPos = this.node.parent.getPosition();
        // var otherPos = this.colliderPlayerNode.getPosition();
        // if (Math.abs(selfPos.x - otherPos.x) <= 11
        //     && Math.abs(selfPos.y - otherPos.y) <= 11 && this.isIce == false) {
        //     this.showIceEffect();
        //
        // }

    },
});
