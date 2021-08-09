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
  * 主界面管理类
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 所有的弹窗都需要在register注册事件
  * 在execute添加消息处理面板打开关闭事件
  */
var game;
(function (game) {
    var MainManager = (function (_super) {
        __extends(MainManager, _super);
        function MainManager() {
            return _super.call(this) || this;
        }
        /**
         * 注册消息
         */
        MainManager.prototype.register = function () {
            this.facade.registerCommand(NoficationConfig.OPEN_MAIN, MainManager);
            this.facade.registerCommand(NoficationConfig.CLOSE_MAIN, MainManager);
            this.facade.registerCommand(EventConfig.Event_CHANGE_GAMEBG, MainManager);
        };
        MainManager.prototype.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            var panelCon = GameLayerManager.gameLayer().mainLayer;
            switch (notification.getName()) {
                case NoficationConfig.OPEN_MAIN: {
                    if (this.mainUI == null) {
                        this.mainUI = new game.MainUI();
                        panelCon.addChild(this.mainUI);
                    }
                    break;
                }
                case NoficationConfig.CLOSE_MAIN: {
                    if (this.mainUI != null) {
                        panelCon.removeChild(this.mainUI);
                        this.mainUI = null;
                    }
                    break;
                }
                case EventConfig.Event_CHANGE_GAMEBG: {
                    if (!this.mainUI) {
                        this.mainUI = panelCon.getChildAt(0);
                    }
                    if (!this.mainUI) {
                        console.log("丢失了");
                        return;
                    }
                    else {
                        this.mainUI.changeBg(data);
                    }
                    break;
                }
            }
        };
        MainManager.NAME = "MainManager";
        return MainManager;
    }(puremvc.SimpleCommand));
    game.MainManager = MainManager;
    __reflect(MainManager.prototype, "game.MainManager", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=MainManager.js.map