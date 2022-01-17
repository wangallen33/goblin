const className = 'org/cocos2dx/javascript/AppActivity';

const AdMgr = {
    showAdVideo () {
        console.log("============== 展示激励广告 ==============");
        if(cc.sys.os === cc.sys.OS_ANDROID) {
            console.log("************* ANDROID展示激励广告 *************");
            jsb.reflection.callStaticMethod(className, 'showVideo', '()V');
        } else if(cc.sys.os === cc.sys.OS_IOS) {
            console.log("************* IOS展示激励广告 *************");
            jsb.reflection.callStaticMethod('RootViewController', 'showVideo');
        }
    },

    getReward() {

    },

    loadAdFail() {
        popup.show({str: "加载失败!"});
    },


};

module.exports = AdMgr;
