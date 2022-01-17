const GameRes = require("./GameRes");

const Guide = cc.Class({
    statics: {
        _inst: null,
        target: null,
        callBack: null,

        getInstance(target) {
            if (!this._inst) {
                this._inst = new Guide();
            }
            if (target) {
                this._inst.target = target;
            }
            return this._inst;
        },
    },

    /* todo map_0_1操作阶段
     * 1 右滑
     * 2 下滑
     * 3 左滑
     * 4 上滑
     * 5 到达停止点
     * 6 点击停止
     * 7 到达目标点
     * 8 停止操作
     */
    /* todo map_0_2操作阶段
     * 1 右滑
     * 2 右滑
     * 3 宝石变化
     * 4 自由操作
     * 5 完成目标
     */

    initOperateGuide() {
        const pThis = this.target;
        this.deciding = false;
        // 对应操作步骤的引导提示
        this.guide_1_Desc = {
            1: "欢迎来到路特戈登训练营，我是教官露易丝！我将在最短的时间内把你训练成为一名合格的猎宝人，你准备好了吗？",
            2: "那我们从最基本的移动开始——<color=#ff0000>手指滑动屏幕，可控制角色朝滑动方向移动</>。",
            3: "看来你已经掌握基本的移动技能。接下来学习如何让角色停止移动！",
            4: "<color=#ff0000>点击场景中任意位置，可以让角色停止移动</>。",
            5: "资质不错嘛，这么快就学会了。那么，运用你刚才学到的知识，<color=#ff0000>移动到目的地吧</>！",
            6: "厉害！厉害！接下来，我们要学习猎宝人必备的技能——收集宝石。",
        };
        this.guide_2_Desc = {
            1: "作为一个猎宝人，首要目的是收集藏在哥布林营地的宝石。现在，我就教你如何收集宝石",
            2: "看到这些宝石了没？<color=#ff0000>走到宝石所在位置，就可以完成对宝石的收集</>！现在你来试试看吧！",
            3: "看！是不是很简单？",
            4: "是不是很疑惑刚才发生了什么？让我告诉你吧，其实<color=#ff0000>宝石是会升级的</>。",
            5: "奥加特尔大陆的宝石多种多样，按<color=#ff0000>等级由低到高</>分为<outline color=#474545 width=2><color=#ffffff>白</></>、<outline color=#474545 width=2><color=#00ff00>绿</></>、<outline color=#474545 width=2><color=#00A5FF>蓝</></>、<outline color=#474545 width=2><color=#DE00FF>紫</></>、<outline color=#474545 width=2><color=#FF8200>橙</></>、<outline color=#474545 width=2><color=#ff0000>红</></>这六种颜色。",
            6: "只要你<color=#ff0000>连续收集两个颜色相同的宝石</>，会使营地中的一颗<color=#ff0000>白色宝石</>变为更高级的宝石。但是这个<color=#ff0000>变化是随机</>的，也就是说我们并不知道哪个白色会变化。",
            7: "尽管如此，宝石变化的方式是不会变的，都会遵循这个规则。",
            8: "好了，讲了这么多，你该亲自去试试了！把营地的宝石全部收集了吧。",
            9: "恭喜你掌握了猎宝人的全部基础知识，你……毕业了！",
        };
        this.guide_1_Spine_Info = {
            1: {pos: cc.v2(154, -264), desc: "", offPos: cc.v2(0, 93), sp: "Shou_Right"},
            2: {pos: cc.v2(151, -377), desc: "", offPos: cc.v2(0, 121), sp: "Shou_Down"},
            3: {pos: cc.v2(73, -537), desc: "", offPos: cc.v2(0, 93), sp: "Shou_Left"},
            4: {pos: cc.v2(-165, -396), desc: "", offPos: cc.v2(212, -117), sp: "Shou_Up"},
            5: {pos: cc.v2(-137, -283), desc: "", offPos: cc.v2(63, 90), sp: "Shou_DianjiTing"},
            6: {pos: cc.v2(65, 383), desc: "", offPos: cc.v2(182, 68), sp: "Shuangjiantou2"},
        };
        this.guide_2_Spine_Info = {
            1: {pos: cc.v2(0, -385), sp: "Shuangjiantou1"},
            2: {pos: cc.v2(126, -385), sp: "Shuangjiantou1"},
        };
        cc.YL.OperateIdx = 1;
        cc.YL.DialogueIdx = 1;
        cc.YL.GuideSpIdx = 1;
        this.player = pThis.playerNode.getComponent("Player");
        // 显示指引
        this.showGuideDialogue();
        pThis.clickBlock.active = false;
    },

    showGuideDialogue() {
        const pThis = this.target;
        let fun;
        if (cc.YL.GuideMap == 1) {
            if (cc.YL.OperateIdx != 1 && cc.YL.OperateIdx != 5
                && cc.YL.OperateIdx != 6 && cc.YL.OperateIdx != 7) {
                return;
            }
            fun = this.show_Guide_1_Dialogue.bind(this);
        } else if (cc.YL.GuideMap == 2) {
            fun = this.show_Guide_2_Dialogue.bind(this);
        } else {
            return;
        }
        let dialogue = pThis.node.parent.getChildByName("Dialogue");
        if (!dialogue) {
            dialogue = cc.instantiate(pThis.DialoguePre);
            dialogue.on('click', fun);
        }
        utils.show(dialogue);
        const box = dialogue.getChildByName("box");
        const tips = dialogue.getChildByName("tips");
        box.opacity = 0;
        tips.opacity = 0;
        this.dialogueNum = 0;
        box.runAction(cc.fadeIn(0.2));
        tips.runAction(cc.fadeIn(0.2));
        fun();
    },

    showGuideSpine() {
        let guideInfo;
        if (cc.YL.GuideMap == 1) {
            guideInfo = this.guide_1_Spine_Info[cc.YL.GuideSpIdx];
        } else if (cc.YL.GuideMap == 2) {
            guideInfo = this.guide_2_Spine_Info[cc.YL.GuideSpIdx];
        } else {
            return;
        }
        const pThis = this.target;
        if (guideInfo) {
            pThis.guide.active = true;
            pThis.guide.setPosition(guideInfo.pos);
            const desc = pThis.guide.getChildByName("desc");
            const spine = pThis.guide.getChildByName("sp");
            desc.active = false;
            spine.getComponent(sp.Skeleton).setAnimation(0, guideInfo.sp, true);
            cc.YL.GuideSpIdx++;
        } else {
            this.hideGuideSpine();
        }
    },

    hideGuideSpine() {
        const pThis = this.target;
        const spine = pThis.guide.getChildByName("sp");
        spine.getComponent(sp.Skeleton).animation = 1;
        spine.getComponent(sp.Skeleton).loop = false;
        pThis.guide.active = false;
    },

    checkOperateDir(dir) {
        let enable = true;
        if (cc.YL.GuideMap == 1) {
            if (cc.YL.OperateIdx > 5) {
                return true;
            }
            enable = this.check_Guide_1_Move(dir)
        } else if (cc.YL.GuideMap == 2) {
            if (cc.YL.OperateIdx > 2) {
                return true;
            }
            enable = this.check_Guide_2_Move(dir)
        }
        return enable;
    },

    updateOperateIdx() {
        if (cc.YL.GuideMap == 1) {
            this.update_Guide_1_Operate();
        } else if (cc.YL.GuideMap == 2) {
            this.update_Guide_2_Operate();
        }
    },

    show_Guide_1_Dialogue() {
        const desc = this.guide_1_Desc;
        if (cc.YL.DialogueIdx > utils.getCvsLength(desc)) {
            cc.YL.GuideMap = 2;
            cc.YL.OperateIdx = 1;
            cc.YL.DialogueIdx = 1;
            cc.YL.GuideSpIdx = 1;
            cc.YL.SceneManager.LoadScene("Map");
            return;
        }
        let maxIdx;
        if (cc.YL.OperateIdx == 1) {
            maxIdx = 2;
        } else if (cc.YL.OperateIdx == 5) {
            maxIdx = 4;
        } else if (cc.YL.OperateIdx == 6) {
            maxIdx = 5;
        } else if (cc.YL.OperateIdx == 7) {
            maxIdx = 6;
        } else {
            return;
        }
        const pThis = this.target;
        const dialogue = pThis.node.parent.getChildByName("Dialogue");
        if (!dialogue) {
            return;
        }
        if (cc.YL.DialogueIdx > maxIdx) {
            dialogue.active = false;
            this.showGuideSpine();
            return;
        }
        if (cc.YL.DialogueIdx == 6) {
            this.hideGuideSpine();
        }
        const box = dialogue.getChildByName("box");
        const left = box.getChildByName("left");
        const right = box.getChildByName("right");
        const tips = dialogue.getChildByName("tips");
        left.opacity = 0;
        right.opacity = 0;
        let dir = left;
        dir.stopAllActions();
        dir.getChildByName("head").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame["Plot_Guide".toUpperCase()];
        dir.getChildByName("dialogue").getComponent(cc.RichText).string = desc[cc.YL.DialogueIdx];
        let act = cc.fadeIn(0.2);
        dir.runAction(act);
        cc.YL.DialogueIdx++;
    },

    check_Guide_1_Move(dir) {
        const pThis = this.target;
        const operateMap = {
            1: "right",
            2: "down",
            3: "left",
            4: "up",
            5: "",
        };
        const enable = dir == operateMap[cc.YL.OperateIdx];
        if (enable) {
            if (dir == "") {
                cc.YL.OperateIdx++;
                pThis.playerNode.getComponent("Player").paused = false;
                this.showGuideDialogue();
            }
            this.hideGuideSpine();
        }
        return enable;
    },

    update_Guide_1_Operate() {
        const pThis = this.target;
        const Guide_1_Point = {     // 每一步操作结束的目标点位
            // 0: cc.v2(7, 18),     // 初始点
            1: cc.v2(11, 18),
            2: cc.v2(11, 22),
            3: cc.v2(3, 22),
            4: cc.v2(3, 18),        // 5操作停止 不记录点
            6: cc.v2(8, 7),
        };
        let onPoint = false;
        for (let i in Guide_1_Point) {
            const x = Guide_1_Point[i].x * 64;
            const y = this.player.getTileYToPos(Guide_1_Point[i].y);
            if (Math.abs(pThis.playerNode.x - x) <= this.player.moveSpeed
                && Math.abs(pThis.playerNode.y - y) <= this.player.moveSpeed
                && parseInt(i) == cc.YL.OperateIdx) {
                onPoint = true;
                break;
            }
        }
        if (onPoint) {
            if (this.deciding) {
                this.deciding = false;
                cc.YL.OperateIdx++;
                console.log("OperateIdx:", cc.YL.OperateIdx);
                if (cc.YL.OperateIdx == 5) {
                    this.player.paused = true;
                } else if (cc.YL.OperateIdx == 7) {
                    cc.YL.TouchMoveDir = "";
                } else {
                    this.showGuideSpine();
                }
                this.showGuideDialogue();
            }
        } else {
            this.deciding = true;
        }
    },

    show_Guide_2_Dialogue() {
        const desc = this.guide_2_Desc;
        if (cc.YL.DialogueIdx > utils.getCvsLength(desc)) {
            cc.YL.GuideInfo[0] = 1;
            cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
            cc.YL.DialogueIdx = 1;
            cc.YL.GuideSpIdx = 1;
            cc.YL.SceneManager.LoadScene("Hall");
            return;
        }
        const pThis = this.target;
        const dialogue = pThis.node.parent.getChildByName("Dialogue");
        if (!dialogue) {
            return;
        }
        let maxIdx;
        if (cc.YL.OperateIdx == 1) {
            maxIdx = 2;
        } else if (cc.YL.OperateIdx == 2) {
            maxIdx = 3;
        } else if (cc.YL.OperateIdx == 3) {
            dialogue.active = false;
            this.upgradeDiamond();
            return;
        } else if (cc.YL.OperateIdx == 4) {
            maxIdx = 8;
        } else if (cc.YL.OperateIdx == 5) {
            maxIdx = 9;
        } else {
            return;
        }
        if (cc.YL.DialogueIdx > maxIdx) {
            dialogue.active = false;
            this.showGuideSpine();
            return;
        }
        dialogue.getChildByName("rule").active = cc.YL.DialogueIdx == 7;
        const box = dialogue.getChildByName("box");
        const left = box.getChildByName("left");
        const right = box.getChildByName("right");
        const tips = dialogue.getChildByName("tips");
        left.opacity = 0;
        right.opacity = 0;
        let dir = left;
        dir.stopAllActions();
        dir.getChildByName("head").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame["Plot_Guide".toUpperCase()];
        dir.getChildByName("dialogue").getComponent(cc.RichText).string = desc[cc.YL.DialogueIdx];
        let act = cc.fadeIn(0.2);
        dir.runAction(act);
        cc.YL.DialogueIdx++;
    },

    check_Guide_2_Move(dir) {
        const operateMap = {
            1: "right",
            2: "right",
        };
        return dir == operateMap[cc.YL.OperateIdx];
    },

    update_Guide_2_Operate() {
        const pThis = this.target;
        const Guide_2_Point = {     // 每一步操作结束的目标点位
            // 0: cc.v2(4, 19),     // 初始点
            1: cc.v2(7, 19),
            2: cc.v2(9, 19),
        };
        let onPoint = false;
        for (let i in Guide_2_Point) {
            const x = Guide_2_Point[i].x * 64;
            const y = this.player.getTileYToPos(Guide_2_Point[i].y);
            if (Math.abs(pThis.playerNode.x - x) <= this.player.moveSpeed
                && Math.abs(pThis.playerNode.y - y) <= this.player.moveSpeed
                && parseInt(i) == cc.YL.OperateIdx) {
                onPoint = true;
                break;
            }
        }
        if (onPoint) {
            if (this.deciding) {
                this.deciding = false;
                // if (cc.YL.OperateIdx == 2) {
                //     this.showGuideDialogue();
                // }
                cc.YL.OperateIdx++;
                console.log("OperateIdx:", cc.YL.OperateIdx);
                cc.YL.TouchMoveDir = "";
                this.showGuideSpine();
            }
        } else {
            this.deciding = true;
        }
    },

    upgradeDiamond() {
        const pThis = this.target;
        pThis.clickBlock.active = true;
        // 指定位置升级宝石
        const goalDiamondPos = cc.v2(11, 19);
        pThis.mask.setScale(9);
        pThis.mask.active = true;
        pThis.mask.runAction(cc.sequence(
            cc.scaleTo(0.5, 1),
            cc.delayTime(0.5),
            cc.callFunc(function () {
                pThis._showDiamond(goalDiamondPos, 1, true);
                pThis.diamond.setTileGIDAt(pThis.diamondFirstGID + 1, goalDiamondPos);
                setTimeout(function () {
                    pThis.clickBlock.active = false;
                    pThis.mask.active = false;
                    cc.YL.OperateIdx++;
                    this.showGuideDialogue();
                }.bind(this), 500);
            }.bind(this))
        ));
    },

    initNormalStageGuide() {
        this.normal_1_Desc = {
            1: "恭喜你正式成为路特戈登的一员，相信你已经掌握了作为猎宝人的基础知识，接下来我要告诉你猎宝过程的一些注意事项。",
            2: "在猎宝过程中，我们有许多任务需要完成，不同的关卡有不同的任务，<color=#ff0000>只有完成这些任务，才算猎宝成功</>。",
            3: "由于哥布林的营地存在很多潜在的危险，你<color=#ff0000>必须在指定的时间内完成任务，否则猎宝失败</>！",
            4: "当然，完成任务的前提是你必须活着，这个代表你的生命值，<color=#ff0000>如果它变为0，那么猎宝也就失败了</>！",
            5: "这是金币，是你在营地的收益。<color=#ff0000>收集的宝石等级越高，获得金币越多</>。但是需要你成功完成之后才能获得，失败是没有的哦！",
            6: "好了，就这么了，开始你的冒险吧！",
        };
        this.normal_2_Spine_Info = {
            1: {pos: cc.v2(-305, 670), rotation: -45, sp: "Danjiantou"},
            2: {pos: cc.v2(-70, 670), rotation: 0, sp: "Danjiantou"},
            3: {pos: cc.v2(125, 670), rotation: 0, sp: "Danjiantou"},
            4: {pos: cc.v2(300, 670), rotation: 0, sp: "Danjiantou"},
        };
        cc.YL.DialogueIdx = 1;
        cc.YL.GuideSpIdx = 1;
        this.showNormalStageDialogue();
    },

    showNormalStageDialogue() {
        const pThis = this.target;
        let fun;
        if (cc.YL.CurrStageCfg.INT_ID == 1) {
            fun = this.show_Normal_1_Dialogue.bind(this);
        } else {
            pThis.showStageFlow(true);
            return;
        }
        let dialogue = pThis.node.parent.getChildByName("Dialogue");
        if (!dialogue) {
            dialogue = cc.instantiate(pThis.DialoguePre);
            dialogue.on('click', fun);
        }
        utils.show(dialogue);
        const box = dialogue.getChildByName("box");
        const tips = dialogue.getChildByName("tips");
        box.opacity = 0;
        tips.opacity = 0;
        this.dialogueNum = 0;
        box.runAction(cc.fadeIn(0.2));
        tips.runAction(cc.fadeIn(0.2));
        fun();
    },

    showNormalStageSpine() {
        let guideInfo;
        if (cc.YL.CurrStageCfg.INT_ID == 1) {
            guideInfo = this.normal_2_Spine_Info[cc.YL.GuideSpIdx];
        } else {
            return;
        }
        const pThis = this.target;
        if (guideInfo) {
            pThis.guide.active = true;
            pThis.guide.setPosition(guideInfo.pos);
            pThis.guide.zIndex = 100;
            const desc = pThis.guide.getChildByName("desc");
            const spine = pThis.guide.getChildByName("sp");
            desc.active = false;
            spine.rotation = guideInfo.rotation;
            spine.getComponent(sp.Skeleton).setAnimation(0, guideInfo.sp, true);
            cc.YL.GuideSpIdx++;
        } else {
            this.hideGuideSpine();
        }
    },

    show_Normal_1_Dialogue() {
        const pThis = this.target;
        const desc = this.normal_1_Desc;
        const dialogue = pThis.node.parent.getChildByName("Dialogue");
        if (!dialogue) {
            return;
        }
        if (cc.YL.DialogueIdx > utils.getCvsLength(desc)) {
            cc.YL.GuideInfo[1] = 1;
            cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
            cc.YL.DialogueIdx = 1;
            cc.YL.GuideSpIdx = 1;
            dialogue.removeFromParent();
            dialogue.destroy();
            pThis.showStageFlow(true);
            return;
        }
        if (cc.YL.DialogueIdx > 1 && cc.YL.DialogueIdx < 6) {
            this.showNormalStageSpine();
        } else {
            this.hideGuideSpine();
        }
        const box = dialogue.getChildByName("box");
        const left = box.getChildByName("left");
        const right = box.getChildByName("right");
        const tips = dialogue.getChildByName("tips");
        left.opacity = 0;
        right.opacity = 0;
        let dir = left;
        dir.stopAllActions();
        dir.getChildByName("head").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame["Plot_Guide".toUpperCase()];
        dir.getChildByName("dialogue").getComponent(cc.RichText).string = desc[cc.YL.DialogueIdx];
        let act = cc.fadeIn(0.2);
        dir.runAction(act);
        cc.YL.DialogueIdx++;
    },

    showCompleteGuide() {
        if (cc.YL.ClearStage == 1 && !cc.YL.GuideInfo["h1"]) {
            const pThis = this.target;
            const complete = pThis.node.parent.getChildByName("StageComplete");
            if (!complete) {
                return;
            }
            const guide = complete.getChildByName("guide");
            guide.active = true;
            guide.getChildByName("block").getChildByName("receive").on('click', function () {
                pThis.clickBlock.active = true;
                audio.playEffect('UI_Button');
                complete.active = false;
                this.hideGuideSpine();
                pThis.cloud.getComponent(sp.Skeleton).setCompleteListener(function () {
                    cc.YL.SceneManager.LoadScene("Hall");
                });
                pThis.cloud.getComponent(sp.Skeleton).setAnimation(0, "Julong", false);
            }.bind(this));
            pThis.guide.active = true;
            pThis.guide.setPosition(140, -145);
            pThis.guide.zIndex = 100;
            const desc = pThis.guide.getChildByName("desc");
            const spine = pThis.guide.getChildByName("sp");
            desc.active = false;
            spine.rotation = 180;
            spine.getComponent(sp.Skeleton).setAnimation(0, "Danjiantou", true);
        }
    },

    initHallGuide() {
        this.hall_1_Desc = {
            1: "哟！不错嘛，是块当猎宝人的料！作为奖励，这里有一个哥布林的箱子送你，<color=#ff0000>只要达到开箱要求</>，你都可以领取奖励！",
        };
        this.hall_2_Desc = {
            1: "嗨！好久不见了，看来你成长了不少！是时候传授你一些知识了！",
            2: "我们路特戈登有自己的商会，专门为各位猎宝人提供各种便利道具。下面，我们就来看看有哪些东西吧！",
            // 当第二段对话结束后显示技能购买引导  为避免第二次还进入购买引导  下一段对话轮空
            3: "",
            4: "目前以你的实力，商会只能向你提供一个道具。等你强大了，就可以获得更多的道具了。",
            5: "这些道具都是要收费，你可以使用你闯关获得的<color=#ff0000>金币来购买这些道具</>！已经拥有的道具，可以<color=#ff0000>在闯关过程中使用</>。",
            6: "这些道具都有使用次数的限制，买的越多，使用次数也越多。接下来你尝试一下购买<color=#ff0000>3个恢复生命</>的道具吧！",
            7: "嗯！看来你准备好了，赶紧去冒险吧！"
        };
        this.hall_2_Spine_Info = {
            1: {pos: cc.v2(-305, 670), rotation: -45, sp: "Danjiantou"},
            2: {pos: cc.v2(-70, 670), rotation: 0, sp: "Danjiantou"},
            3: {pos: cc.v2(125, 670), rotation: 0, sp: "Danjiantou"},
            4: {pos: cc.v2(300, 670), rotation: 0, sp: "Danjiantou"},
        };
        cc.YL.DialogueIdx = 1;
        cc.YL.GuideSpIdx = 1;
        this.showHallDialogue();
    },

    showHallDialogue() {
        const hall = cc.find("Canvas").getComponent("Hall");
        let fun;
        if (!cc.YL.FirstEnter && !cc.YL.GuideInfo["h1"]) {
            fun = this.show_Hall_1_Dialogue.bind(this);
        } else if (cc.YL.ClearStage == 7 && !cc.YL.GuideInfo["h2"]) {
            fun = this.show_Hall_2_Dialogue.bind(this);
        } else {
            return;
        }
        let dialogue = hall.node.getChildByName("Dialogue");
        if (!dialogue) {
            dialogue = cc.instantiate(hall.DialoguePre);
            dialogue.on('click', fun);
        }
        utils.show(dialogue);
        const box = dialogue.getChildByName("box");
        const tips = dialogue.getChildByName("tips");
        box.opacity = 0;
        tips.opacity = 0;
        this.dialogueNum = 0;
        box.runAction(cc.fadeIn(0.2));
        tips.runAction(cc.fadeIn(0.2));
        fun();
    },

    show_Hall_1_Dialogue() {
        const desc = this.hall_1_Desc;
        const hall = cc.find("Canvas").getComponent("Hall");
        const dialogue = hall.node.getChildByName("Dialogue");
        if (cc.YL.DialogueIdx > utils.getCvsLength(desc)) {
            dialogue.active = false;
            const treasure = hall.node.getChildByName("GuideTreasure");
            const mask = treasure.getChildByName("mask");
            mask.setScale(9);
            treasure.active = true;
            mask.runAction(cc.sequence(
                cc.scaleTo(0.2, 1),
                cc.callFunc(function () {
                    treasure.getChildByName("sp").getComponent(sp.Skeleton).setAnimation(0, "Danjiantou", true);
                }.bind(this))
            ));
            treasure.getChildByName("block").getChildByName("treasure").on('click', function () {
                cc.YL.GuideInfo["h1"] = 1;
                cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
                treasure.getChildByName("sp").getComponent(sp.Skeleton).animation = 1;
                treasure.getChildByName("sp").getComponent(sp.Skeleton).loop = false;
                treasure.active = false;
                hall.onTreasureBoxClick();
            });
            return;
        }
        const box = dialogue.getChildByName("box");
        const left = box.getChildByName("left");
        const right = box.getChildByName("right");
        const tips = dialogue.getChildByName("tips");
        left.opacity = 0;
        right.opacity = 0;
        let dir = left;
        dir.stopAllActions();
        dir.getChildByName("head").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame["Plot_Guide".toUpperCase()];
        dir.getChildByName("dialogue").getComponent(cc.RichText).string = desc[cc.YL.DialogueIdx];
        let act = cc.fadeIn(0.2);
        dir.runAction(act);
        cc.YL.DialogueIdx++;
    },

    show_Hall_2_Dialogue() {
        const desc = this.hall_2_Desc;
        const hall = cc.find("Canvas").getComponent("Hall");
        const dialogue = hall.node.getChildByName("Dialogue");
        dialogue.zIndex = 100;
        if (cc.YL.DialogueIdx > utils.getCvsLength(desc)) {
            dialogue.active = false;
            cc.YL.GuideInfo["h2"] = 1;
            cc.sys.localStorage.setItem("guideFinish", JSON.stringify(cc.YL.GuideInfo));
            return;
        }
        if (cc.YL.DialogueIdx == 3) {
            dialogue.active = false;
            const skill = hall.node.getChildByName("GuideSkill");
            const mask = skill.getChildByName("mask");
            mask.setScale(9);
            skill.active = true;
            mask.runAction(cc.sequence(
                cc.scaleTo(0.2, 1),
                cc.callFunc(function () {
                    skill.getChildByName("sp").getComponent(sp.Skeleton).setAnimation(0, "Danjiantou", true);
                }.bind(this))
            ));
            skill.getChildByName("block").getChildByName("treasure").on('click', function () {
                skill.getChildByName("sp").getComponent(sp.Skeleton).animation = 1;
                skill.getChildByName("sp").getComponent(sp.Skeleton).loop = false;
                skill.active = false;
                hall.onBtnSkillClick();
                this.show_Hall_2_Dialogue();
                cc.YL.PlayerInfo.coin += 400;
                hall.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
                cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
            }.bind(this));
            cc.YL.DialogueIdx++;
            return;
        } else if (cc.YL.DialogueIdx == 6) {
            this.skillBuy = 0;
            dialogue.active = false;
            const skill = hall.node.getChildByName("SkillInfo");
            const guide = skill.getChildByName("guide");
            guide.active = true;
            guide.getChildByName("sp").getComponent(sp.Skeleton).setAnimation(0, "Shou_Dianji", true);
            guide.getChildByName("block").getChildByName("buy").on('click', function () {
                cc.YL.PlayerInfo.coin -= 50;
                hall.coin.getChildByName("count").getComponent(cc.Label).string = cc.YL.PlayerInfo.coin;
                cc.YL.SkillInfo["Heart"]++;
                const count = skill.getChildByName("box").getChildByName("skill").getChildByName("skill1").getChildByName("count").getChildByName("num");
                count.getComponent(cc.Label).string = cc.YL.SkillInfo["Heart"] || 0;
                cc.sys.localStorage.setItem("playerInfo", JSON.stringify(cc.YL.PlayerInfo));
                cc.sys.localStorage.setItem("skillInfo", JSON.stringify(cc.YL.SkillInfo));
                this.skillBuy++;
                if (this.skillBuy >= 3) {
                    guide.active = false;
                    this.show_Hall_2_Dialogue();
                }
            }.bind(this));
            cc.YL.DialogueIdx++;
            return;
        }
        dialogue.active = true;
        const box = dialogue.getChildByName("box");
        const left = box.getChildByName("left");
        const right = box.getChildByName("right");
        const tips = dialogue.getChildByName("tips");
        left.opacity = 0;
        right.opacity = 0;
        let dir = left;
        dir.stopAllActions();
        dir.getChildByName("head").getComponent(cc.Sprite).spriteFrame = GameRes.spriteFrame["Plot_Guide".toUpperCase()];
        dir.getChildByName("dialogue").getComponent(cc.RichText).string = desc[cc.YL.DialogueIdx];
        let act = cc.fadeIn(0.2);
        dir.runAction(act);
        cc.YL.DialogueIdx++;

    },
});
