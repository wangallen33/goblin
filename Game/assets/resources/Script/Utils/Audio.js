const Audio = {
    getStorageVolume() {
        let volume = cc.sys.localStorage.getItem("gameVolume");
        if (volume) {
            volume = JSON.parse(volume);
            cc.YL.muteMode = Boolean(volume.mute);
            cc.YL.effectVolume = volume.effect != undefined && volume.effect != null ? volume.effect : 0.8;
            cc.YL.musicVolume = volume.music != undefined && volume.music != null ? volume.music : 0.8;
            cc.YL.effectVolume = cc.YL.effectVolume < 0 ? 0 : cc.YL.effectVolume;
            cc.YL.effectVolume = cc.YL.effectVolume > 1 ? 1 : cc.YL.effectVolume;
            cc.YL.musicVolume = cc.YL.musicVolume < 0 ? 0 : cc.YL.musicVolume;
            cc.YL.musicVolume = cc.YL.musicVolume > 1 ? 1 : cc.YL.musicVolume;
        }
    },

    playMusic: function (name, loop, volume) {
        const path = "Audio/Music/" + name;
        cc.loader.loadRes(path, cc.AudioClip, function (err, music) {
            if (err) {
                console.error(err);
                return;
            }
            this.stopMusic();
            const m_loop = loop === undefined ? true : loop;
            const m_volume = cc.YL.muteMode ? 0 : (volume === undefined ? this.getMusicVolume() : volume);
            this._musicId = cc.audioEngine.play(music, m_loop, m_volume);
        }.bind(this));
    },

    pauseMusic: function () {
        if (this._musicId !== undefined) {
            cc.audioEngine.pause(this._musicId);
        }
    },

    resumeMusic: function () {
        if (this._musicId !== undefined) {
            cc.audioEngine.resume(this._musicId);
        }
    },

    stopMusic: function () {
        if (this._musicId !== undefined) {
            cc.audioEngine.stop(this._musicId);
        }
    },

    setMusicVolume: function (volume) {
        if (cc.YL.muteMode) {
            this._musicVolume = 0;
        } else if (volume >= 0 && volume <= 1) {
            this._musicVolume = volume;
        }
        if (this._musicId !== undefined) {
            cc.audioEngine.setVolume(this._musicId, this._musicVolume);
        }
    },

    getMusicVolume: function () {
        let m = this._musicVolume;
        let sound = m != undefined && m != null ? m : cc.YL.musicVolume;
        return sound;
    },

    isMusicPlaying: function () {
        return cc.audioEngine.getState(this._musicId) === cc.audioEngine.AudioState.PLAYING;
    },

    playEffect: function (name) {
        const path = "Audio/Effect/" + name;
        cc.loader.loadRes(path, cc.AudioClip, function (err, effect) {
            if (err) {
                console.error(err);
                return;
            }
            const volume = cc.YL.muteMode ? 0 : this.getEffectVolume();
            try {
                this._soundId = cc.audioEngine.play(effect, false, volume);
            } catch (err) {

            }
        }.bind(this));
    },

    pauseEffect: function () {
        if (this._soundId !== undefined) {
            cc.audioEngine.pause(this._soundId);
        }
    },

    resumeEffect: function () {
        if (this._soundId !== undefined) {
            cc.audioEngine.resume(this._soundId);
        }
    },

    stopEffect: function () {
        if (this._soundId !== undefined) {
            cc.audioEngine.stop(this._soundId);
        }
    },

    setEffectVolume: function (volume) {
        if (cc.YL.muteMode) {
            this._soundVolume = 0;
        } else if (volume >= 0 && volume <= 1) {
            this._soundVolume = volume;
        }
    },

    setEffectIsPlay: function (isPlay) {
        this._isEffectPlay = isPlay;
    },

    getEffectVolume: function () {
        // if (!this._isEffectPlay) return cc.YL.effectVolume;
        let s = this._soundVolume;
        let sound = s != undefined && s != null ? s : cc.YL.effectVolume;
        return sound;
    },

    pauseAll: function () {
        this.setEffectIsPlay(false);
        cc.audioEngine.pauseAll();
    },

    resumeAll: function () {
        this.setEffectIsPlay(true);
        cc.audioEngine.resumeAll();
    },

    stopAll: function () {
        cc.audioEngine.stopAll();
    },

    muteOn() {
        this.setMusicVolume(0);
        this.setEffectVolume(0);
    },

    muteOff() {
        this.setMusicVolume(cc.YL.musicVolume);
        this.setEffectVolume(cc.YL.effectVolume);
    },
};

window.audio = Audio;