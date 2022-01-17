const CURVER = "1.1.0";

cc.Class({
    extends: cc.Component,

    properties: {},

    onEnable () {
        this.rootNode = cc.find("Canvas");
        const rootSize = this.rootNode.getContentSize();
        if (rootSize.width < 960) {
            this.node.scale = rootSize.width / 960;
        }
        this.mute = this.node.getChildByName("box").getChildByName("mute");
        this.effect = this.node.getChildByName("box").getChildByName("effect");
        this.music = this.node.getChildByName("box").getChildByName("music");
        this.version = this.node.getChildByName("box").getChildByName("version");
        this.version.getComponent(cc.Label).string = "当前版本" + CURVER;
        this.initGameVolume();
    },

    initGameVolume() {
        const muteSwitch = this.mute.getChildByName("switch");
        muteSwitch.getChildByName("on").active = cc.YL.muteMode;
        muteSwitch.getChildByName("off").active = !cc.YL.muteMode;
        const effectProgress = this.effect.getChildByName("progress");
        const effectSlider = this.effect.getChildByName("slider");
        effectProgress.getComponent(cc.ProgressBar).progress = cc.YL.effectVolume;
        effectSlider.getComponent(cc.Slider).progress = cc.YL.effectVolume;
        const musicProgress = this.music.getChildByName("progress");
        const musicSlider = this.music.getChildByName("slider");
        musicProgress.getComponent(cc.ProgressBar).progress = cc.YL.musicVolume;
        musicSlider.getComponent(cc.Slider).progress = cc.YL.musicVolume;
    },

    onSwitchMuteClick() {
        audio.playEffect('UI_Button');
        const muteSwitch = this.mute.getChildByName("switch");
        if (cc.YL.muteMode) {
            cc.YL.muteMode = false;
            muteSwitch.getChildByName("on").active = false;
            muteSwitch.getChildByName("off").active = true;
            audio.muteOff();
        } else {
            cc.YL.muteMode = true;
            muteSwitch.getChildByName("on").active = true;
            muteSwitch.getChildByName("off").active = false;
            audio.muteOn();
        }
    },

    onHandleEffectSlider(event) {
        cc.YL.effectVolume = event.progress;
        const effectProgress = this.effect.getChildByName("progress");
        effectProgress.getComponent(cc.ProgressBar).progress = event.progress;
        audio.setEffectVolume(event.progress);
    },

    onHandleMusicSlider(event) {
        cc.YL.musicVolume = event.progress;
        const musicProgress = this.music.getChildByName("progress");
        musicProgress.getComponent(cc.ProgressBar).progress = event.progress;
        audio.setMusicVolume(event.progress);
    },

    onBtnExitClick() {
        audio.playEffect('UI_Button');
        popup.show({
            str: "确定放弃当前进度并退出关卡？", confirm: function () {
                cc.YL.SceneManager.LoadScene("Hall");
            }, cancel: 1
        });
    },

    onBtnReplayClick() {
        audio.playEffect('UI_Button');
        const fun = function () {
            cc.find("Canvas/ClickBlock").active = true;
            if (cc.YL.EnergyInfo.curr >= cc.YL.MaxEnergy) {
                cc.YL.EnergyInfo.curr--;
                cc.YL.EnergyInfo.lastTime = Date.now();
                utils.startEnergyRecover(true);
            } else {
                cc.YL.EnergyInfo.curr--;
            }
            cc.YL.EnergyInfo.curr = cc.YL.EnergyInfo.curr < 0 ? 0 : cc.YL.EnergyInfo.curr;
            cc.sys.localStorage.setItem("energyInfo", JSON.stringify(cc.YL.EnergyInfo));
            const energy = this.node.getChildByName("box").getChildByName("btnReplay").getChildByName("energy");
            energy.active = true;
            energy.opacity = 0;
            energy.y = 15;
            energy.runAction(cc.sequence(
                cc.spawn(
                    cc.fadeIn(0.2),
                    cc.moveBy(0.5, 0, 70)
                ),
                cc.fadeOut(0.2),
                cc.callFunc(function () {
                    utils.hide(this.node);
                    cc.YL.SceneManager.LoadScene("Map");
                }.bind(this))
            ));
        }.bind(this);
        popup.show({
            str: "确定重新挑战本关？", confirm: function () {
                utils.checkEnergyAndAd(fun);
            }.bind(this), cancel: 1
        });
    },

    onBtnCloseClick() {
        audio.playEffect('UI_Button');
        utils.hide(this.node);
        const gameVolume = {
            mute: cc.YL.muteMode,
            effect: cc.YL.effectVolume,
            music: cc.YL.musicVolume,
        };
        cc.YL.isClickPause = false;
        cc.sys.localStorage.setItem("gameVolume", JSON.stringify(gameVolume));
        if (cc.find("Canvas/MapRoot")) {
            cc.find("Canvas/MapRoot").getComponent("Map").ResumeAllMap();
        }
    },
});
