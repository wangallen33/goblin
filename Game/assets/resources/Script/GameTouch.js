const Guide = require("./Guide");

cc.Class({
    extends: cc.Component,

    start () {
        this.node.on("touchend", this.onEndTouch.bind(this), this.node);
        this.node.on("touchcancel", this.onCancelTouch.bind(this), this.node);
        this.node.on("touchmove", this.onMoveTouch.bind(this), this.node);
        this.node.on("touchstart", this.onStartTouch.bind(this), this.node);
        cc.YL.TouchMoveDir = "";
    },


    onEndTouch: function (event) {
        if (cc.YL.isOver) {
            return;
        }
        // cc.log("cc.YL.canTouch",cc.YL.canTouch);
        if (cc.YL.canTouch) {
            this.endTouchPos = event.getLocation();
            this.calculateDir();
        }
    },
    onCancelTouch: function (event) {
        if (cc.YL.isOver) {
            return;
        }
        if (cc.YL.canTouch) {
            this.endTouchPos = event.getLocation();
            this.calculateDir();
        }
    },
    onMoveTouch: function (event) {
    },
    onStartTouch: function (event) {
        if (cc.YL.isOver) {
            return;
        }
        // cc.log("cc.YL.canTouch",cc.YL.canTouch);
        if (cc.YL.canTouch) {
            this.startTouchPos = event.getStartLocation();
        }
    },

    calculateDir: function () {

        var startX = this.startTouchPos.x;
        var startY = this.startTouchPos.y;
        var endX = this.endTouchPos.x;
        var endY = this.endTouchPos.y;
        var deltaX = endX - startX;
        var deltaY = endY - startY;
        if (deltaX == 0 && deltaY == 0) {
            // const player = cc.find("Canvas/MapRoot").getComponent("Map").playerNode;
            // player.stopAllActions();
            if (cc.YL.loadMapStage < 1) {
                if (!Guide.getInstance().checkOperateDir("")) {
                    return;
                }
            }
            cc.YL.TouchMoveDir = "";
            // player.getComponent("Player").isAction = false;
            // player.getComponent("Player").showStatus("Stand");
            return;
        }
        var dir = "";
        if (deltaX == 0) {
            //代表左右滑动
            deltaY > 0 ? dir = "up" : dir = "down";
        }
        if (deltaY == 0) {
            //代表上下滑动
            deltaX > 0 ? dir = "right" : dir = "left";
        }
        if (deltaY != 0 && deltaX != 0) {
            //查看方向角大小
            var angle = this.getAngle(endX, endY, startX, startY);
            if ((angle >= 0 && angle < 45) || (angle >= 315 && angle <= 360)) {
                dir = "down";
            }
            if ((angle >= 45 && angle < 135)) {
                dir = "left";
            }
            if ((angle >= 135 && angle < 225)) {
                dir = "up";
            }
            if ((angle >= 225 && angle < 315)) {
                dir = "right";
            }
        }
        if (cc.YL.IsCanMove == false) {
            return;
        }
        if (cc.YL.loadMapStage < 1)  {
            if (!Guide.getInstance().checkOperateDir(dir)) {
                return;
            }
        }
        cc.YL.TouchMoveDir = dir;
        // cc.find("Canvas/MapRoot").getComponent("Map").PlayerMove(dir);
    },

    // update (dt) {},
    getAngle: function (x1, y1, x2, y2) {
        var angle = Math.atan((y1 - y2) / (x1 - x2)) * 180 / Math.PI;
        if (x1 < x2 && y1 < y2) {//象限1
            angle = 90 - angle;
        } else if (x1 < x2 && y1 > y2) {//象限2
            angle = Math.abs(angle) + 90;
        } else if (x1 > x2 && y1 > y2) {//象限3
            angle = 270 - angle;
        } else if (x1 > x2 && y1 < y2) {//象限4
            angle = 270 + Math.abs(angle);
        }
        return Math.round(angle);
    },
});
