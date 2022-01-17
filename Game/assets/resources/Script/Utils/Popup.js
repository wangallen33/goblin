const Popup = {
    init() {
        this.rootNode = cc.find("Canvas");
    },

    show(data) {
        if (!this.rootNode) {
            console.error("未找到根节点Canvas!!");
            return;
        }
        this.hide();
        cc.loader.loadRes("Prefab/Utils/Popup", cc.Prefab, function (err, prefab) {
            if (err) {
                console.error(err);
                return;
            }
            const popup = cc.instantiate(prefab);
            const rootSize = this.rootNode.getContentSize();
            if (rootSize.width < 960) {
                popup.scale = rootSize.width / 960;
            }
            const box = popup.getChildByName("box");
            const lab = box.getChildByName("content").getComponent(cc.Label);
            lab.string = data.str.toString();
            const btnConfirm = box.getChildByName("btnConfirm");
            const btnCancel = box.getChildByName("btnCancel");
            if (data.confirmStr) {
                btnConfirm.getChildByName("lab").getComponent(cc.Label).string = data.confirmStr;
            }
            if (data.cancelStr) {
                btnCancel.getChildByName("lab").getComponent(cc.Label).string = data.cancelStr;
            }
            const confirm = data.confirm;
            const cancel = data.cancel;
            if (!cancel) {
                btnCancel.active = false;
                btnConfirm.x = 0;
            }
            btnConfirm.on('click', function () {
                audio.playEffect('UI_Button');
                if (confirm && typeof confirm == 'function') {
                    confirm();
                }
                this.hide();
            }.bind(this));
            btnCancel.on('click', function () {
                audio.playEffect('UI_Button');
                if (cancel && typeof cancel == 'function') {
                    cancel();
                }
                this.hide();
            }.bind(this));
            box.opacity = 0;
            box.scale = 0.1;
            this.rootNode.addChild(popup, 9999);
            box.runAction(cc.spawn(
                cc.fadeIn(0.2), cc.scaleTo(0.2, 1).easing(cc.easeBackOut())
            ));
        }.bind(this));
    },

    hide() {
        if (!this.rootNode) {
            return;
        }
        const popup = this.rootNode.getChildByName("Popup");
        if (popup) {
            popup.runAction(cc.sequence(
                cc.spawn(cc.fadeOut(0.2), cc.scaleTo(0.2, 0.1).easing(cc.easeBackIn())),
                cc.callFunc(function () {
                    popup.removeFromParent();
                    popup.destroy();
                })
            ));
        }
    }
};

window.popup = Popup;