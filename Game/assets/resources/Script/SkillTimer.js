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
        CDTime : 3,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    startTimer: function(){
        this.time = this.CDTime /1000;
        this.time = this.time.toFixed(1);
        this.schedule(this._timer, 0.1);
    },
    _timer: function(){
        if( cc.YL.isPause != true){
            this.time -= 0.1;
            this.time = this.time.toFixed(1);
        }
        if(this.time <= 0){
                if( this.node.getChildByName("Count").getChildByName("Num").getComponent(cc.Label).string == "0" ){
                    this.node.getChildByName("Balck").getChildByName("Time").active = false;
                    this.node.getChildByName("Balck").active = true;
                }else {
                    this.node.getChildByName("Balck").active = false;
                }
            this.unschedule(this._timer);
            switch (this.node.name){
                case "Ice":{
                    cc.YL.isSkillingIce = false;
                    break;
                }
                case "Heart":{
                    cc.YL.isSkillingHerat = false;
                    break;
                }
                case "Water":{
                    cc.YL.isSkillingWater = false;
                    break;
                }
                case "Fire":{
                    cc.YL.isSkillingFire = false;
                    break;
                }
                default:{
                    cc.YL.isSkillingIce = false;
                    cc.YL.isSkillingHerat = false;
                    cc.YL.isSkillingWater = false;
                    cc.YL.isSkillingFire = false;
                }

            }

        }else {
            // for(var i = 0; i < cc.find("Canvas/PlayerSkill").children.length;i++ ){
                this.node.getChildByName("Balck").getChildByName("Time").getComponent(cc.Label).string = this.time;
            // }
        }
    },
    // update (dt) {},
});
