const Utils = {
    init() {
        this.rootNode = cc.find("Canvas");
    },

    show(node, index) {
        if (!this.rootNode) {
            console.error("未找到根节点Canvas!!");
            return;
        }
        const box = node.getChildByName("box");
        if (!box) {
            console.log("节点%s不适用utils.show", node.name);
            return;
        }
        node.opacity = 255;
        node.scale = 1;
        const rootSize = this.rootNode.getContentSize();
        if (node.name == "Dialogue" && rootSize.width < 960) {
            node.scale = 750 / 960;
        }
        box.opacity = 0;
        box.scale = 0.1;
        if (!this.rootNode.getChildByName(node.name)) {
            if (index != undefined && index != null) {
                this.rootNode.addChild(node, index);
            } else {
                this.rootNode.addChild(node);
            }
        }
        node.active = true;
        box.runAction(cc.spawn(
            cc.fadeIn(0.2), cc.scaleTo(0.2, 1).easing(cc.easeBackOut())
        ));
    },

    hide(node) {
        node.runAction(cc.sequence(
            cc.spawn(cc.fadeOut(0.2), cc.scaleTo(0.2, 0.1).easing(cc.easeBackIn())),
            cc.callFunc(function () {
                node.removeFromParent();
                node.destroy();
            })
        ));
    },

    drop(node) {
        node.getChildByName("box").getChildByName("btnClose").on('click', function () {
            this.litre(node);
        }.bind(this));
        this.rootNode.addChild(node);
        node.getChildByName("box").setPosition(0, 720);
        node.getChildByName("box").runAction(cc.moveTo(0.3, cc.p(0, 0)).easing(cc.easeBackOut()));
    },

    litre(node) {
        node.getChildByName("box").runAction(cc.sequence(
            cc.moveTo(0.3, cc.p(0, 720)).easing(cc.easeBackIn()),
            cc.callFunc(function () {
                node.active = false;
            })
        ));
    },

    open(node, index) {
        if (!this.rootNode) {
            console.error("未找到根节点Canvas!!");
            return;
        }
        const box = node.getChildByName("box");
        if (!box) {
            console.log("节点%s不适用utils.open", node.name);
            return;
        }
        node.opacity = 255;
        node.scale = 1;
        const rootSize = this.rootNode.getContentSize();
        if (node.name == "Dialogue" && rootSize.width < 960) {
            node.scale = 750 / 960;
        }
        box.opacity = 0;
        box.scaleY = 0.1;
        if (!this.rootNode.getChildByName(node.name)) {
            if (index != undefined && index != null) {
                this.rootNode.addChild(node, index);
            } else {
                this.rootNode.addChild(node);
            }
        }
        node.active = true;
        box.runAction(cc.spawn(
            cc.fadeIn(0.4), cc.scaleTo(0.4, 1).easing(cc.easeBackOut())
        ));
    },

    shake(node, loop, rate, duration, interval) {
        duration = parseFloat(duration) || 0.1;
        interval = parseFloat(interval) || 0.3;
        rate = parseInt(rate) || 5;
        const act = cc.sequence(
            cc.rotateTo(duration, rate),
            cc.rotateTo(duration, 0),
            cc.rotateTo(duration, -rate),
            cc.rotateTo(duration, 0),
            cc.delayTime(interval)
        );
        if (loop) {
            node.runAction(act.repeatForever());
        } else {
            node.runAction(act);
        }
    },

    getCvsLength: function (obj) {
        let count = 0;
        for (let value in obj) {
            if (obj.hasOwnProperty(value)) {
                count++;
            }
        }
        return count;
    },

    transTimeFormat(num, isMin) {
        // isMin 是否只保留到分钟
        num = parseInt(num);
        let str = isMin ? "" : "0:";
        const min = Math.floor(num / 60);
        str += (min < 10 ? "0" + min : min) + ":";
        const sec = num % 60;
        str += sec < 10 ? "0" + sec : sec;
        return str;
    },

    startEnergyRecover(init) {
        if (init) {
            cc.YL.RecoverTime = cc.YL.EnergyInterval;
        }
        let energy = cc.find("Canvas/Energy");
        if (energy) {
            energy.getChildByName("time").active = true;
            energy.getChildByName("time").getComponent(cc.Label).string = this.transTimeFormat(cc.YL.RecoverTime, true);
        }
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
        this.intervalId = setInterval(function () {
            energy = cc.find("Canvas/Energy");
            if (energy) {
                energy.getChildByName("time").getComponent(cc.Label).string = this.transTimeFormat(cc.YL.RecoverTime--, true);
            }
            if (cc.YL.RecoverTime < 0) {
                cc.YL.EnergyInfo.curr++;
                cc.YL.EnergyInfo.lastTime = Date.now();
                cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
                if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
                    cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
                    if (energy) {
                        energy.getChildByName("time").active = false;
                    }
                    if (this.intervalId) {
                        clearInterval(this.intervalId);
                    }
                } else {
                    cc.YL.RecoverTime = cc.YL.EnergyInterval;
                }
                if (energy) {
                    energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
                }
            }
        }.bind(this), 1000);
    },

    stopEnergyRecover() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
        if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
            cc.YL.EnergyInfo.curr = cc.YL.MaxEnergy;
        }
        const energy = cc.find("Canvas/Energy");
        if (energy) {
            energy.getChildByName("time").active = false;
            energy.getChildByName("count").getComponent(cc.Label).string = cc.YL.EnergyInfo.curr + "/" + cc.YL.MaxEnergy;
        }
    },

    checkEnergyAndAd(callFun) {
        if (cc.YL.EnergyInfo.curr <= 0) {
            if (cc.YL.AdCount < cc.YL.MaxAdCount) {
                popup.show({str: "体力不足，无法闯关！"});
                // popup.show({
                //     str: "体力不足，是否观看广告获得体力？", confirm: function () {
                //         cc.YL.EnergyInfo.curr += 4;
                //         this.stopEnergyRecover();
                //         cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
                //         cc.YL.AdCount++;
                //         cc.sys.localStorage.setItem("adCount", JSON.stringify(cc.YL.AdCount));
                //         if (callFun && typeof callFun == 'function') {
                //             callFun();
                //         }
                //     }, cancel: 1
                // });
            } else {
                popup.show({str: "体力不足，无法闯关！"});
            }
        } else {
            if (callFun && typeof callFun == 'function') {
                callFun();
            }
        }
    },
};

window.utils = Utils;