

var sceneManagers = cc.Class({

});
sceneManagers.LoadScene = function (sceneName) {
    this._loadScene(sceneName);
};
sceneManagers.PreLoadScene = function (sceneName) {
    this._preLoadScene(sceneName);
};
sceneManagers._loadScene = function (sceneName) {
    cc.director.loadScene(sceneName,function(){
        // 场景加载完成
        console.log("场景加载完成：",sceneName);
        cc.YL.nowSceneName = sceneName;
    }.bind(this));
};
sceneManagers._preLoadScene = function(sceneName){
    cc.director.preloadScene(sceneName,function(){
        // 场景加载完成
        console.log("场景预加载完成：",sceneName);
        cc.YL.nowSceneName = sceneName;
    }.bind(this));
};
cc.YL.SceneManager = sceneManagers;
module.exports = sceneManagers;