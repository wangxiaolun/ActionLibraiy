var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/**
  * 场景管理类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 所有的弹窗都需要在register注册事件
  * 在execute添加消息处理面板打开关闭事件
  */
var game;
(function (game) {
    var SceneManager = (function (_super) {
        __extends(SceneManager, _super);
        function SceneManager() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        SceneManager.prototype.register = function () {
            // this.facade.registerCommand(NoficationConfig.OPEN_HOME, SceneManager);//打开主场景
            // this.facade.registerCommand(NoficationConfig.CLOSE_HOME, SceneManager);//关闭主场景
        };
        SceneManager.prototype.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            var panelCon = GameLayerManager.gameLayer().sceneLayer;
            // switch (notification.getName()) {
            //     case NoficationConfig.OPEN_HOME: {
            //         if (this.homeCity == null) {
            //             this.homeCity = new HomeCity();
            //             panelCon.addChild(this.homeCity);
            //         }
            //         break;
            //     }
            //     case NoficationConfig.CLOSE_HOME: {
            //         panelCon.removeChildren();
            //         // if(this.homeCity != null){
            //         //     panelCon.removeChild(this.homeCity);
            //         //     this.homeCity = null;
            //         // }
            //         break;
            //     }
            // }
        };
        SceneManager.NAME = "SceneManager";
        return SceneManager;
    }(puremvc.SimpleCommand));
    game.SceneManager = SceneManager;
    __reflect(SceneManager.prototype, "game.SceneManager", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=SceneManager.js.map