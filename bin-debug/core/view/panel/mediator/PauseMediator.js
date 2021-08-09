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
 * 暂停界面
 *
 */
var game;
(function (game) {
    var PauseMediator = (function (_super) {
        __extends(PauseMediator, _super);
        function PauseMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, PauseMediator.NAME, viewComponent) || this;
            _this.typeNum = 0;
            _this.pausePanel = new game.PausePanel();
            return _this;
        }
        PauseMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_PAUSE,
                NoficationConfig.CLOSE_PAUSE
            ];
        };
        PauseMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_PAUSE: {
                    this.setName(data);
                    this.showUI(this.pausePanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_PAUSE: {
                    this.buttonClickClose();
                    break;
                }
            }
        };
        /**
        * 初始化面板ui
        */
        PauseMediator.prototype.initUI = function () {
            this.pausePanel.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this);
            this.pausePanel.btn_containue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.containue, this);
            // this.pausePanel.btn_upset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upset, this);
            this.pausePanel.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitGame, this);
        };
        /**
         * 初始化面板数据
         */
        PauseMediator.prototype.initData = function () {
            GlobalData.pageIndex = 5;
        };
        PauseMediator.prototype.buttonClickClose = function () {
            this.pausePanel.btn_reset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this);
            this.pausePanel.btn_containue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.containue, this);
            // this.pausePanel.btn_upset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.upset, this);
            this.pausePanel.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exitGame, this);
            this.closePanel(0);
        };
        /** 重来 */
        PauseMediator.prototype.reset = function () {
            this.buttonClickClose();
            PlayerModel.getInstance().resetPlayerData();
            if (this.typeNum == 11) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TIME_RESET);
            }
            else if (this.typeNum == 13) {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TASKTYPE);
            }
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN, 2);
        };
        /** 继续 */
        PauseMediator.prototype.containue = function () {
            this.buttonClickClose();
            if (this.typeNum == 11) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_TIMEGAME_CONTAINUE);
            }
            else if (this.typeNum == 13) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_TASKGAME_CONTAINUE);
            }
        };
        /** 设置 */
        PauseMediator.prototype.upset = function () {
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TRIM);
        };
        /** 退出 */
        PauseMediator.prototype.exitGame = function () {
            this.buttonClickClose();
            PlayerModel.getInstance().resetPlayerData();
            if (this.typeNum == 11) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TIME_RESET);
            }
            else if (this.typeNum == 13) {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TASKTYPE);
            }
            NativeApi.sendToNativeFun(4);
        };
        PauseMediator.prototype.setName = function (typeNum) {
            this.typeNum = typeNum;
        };
        PauseMediator.NAME = "PauseMediator";
        return PauseMediator;
    }(BaseMediator));
    game.PauseMediator = PauseMediator;
    __reflect(PauseMediator.prototype, "game.PauseMediator");
})(game || (game = {}));
//# sourceMappingURL=PauseMediator.js.map