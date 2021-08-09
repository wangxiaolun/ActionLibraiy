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
/** 视频播放界面 */
var game;
(function (game) {
    var VideoMediator = (function (_super) {
        __extends(VideoMediator, _super);
        function VideoMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, VideoMediator.NAME, viewComponent) || this;
            /** 1：主页 2：介绍页 */
            _this.videoPage = -1;
            _this.videoPanel = new game.VideoPanel();
            return _this;
        }
        VideoMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_VIDEO,
                NoficationConfig.CLOSE_VIDEO
            ];
        };
        VideoMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_VIDEO: {
                    this.videoPage = data;
                    this.showUI(this.videoPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_VIDEO: {
                    this.clickBtnClose();
                    break;
                }
            }
        };
        /** 初始化面板ui */
        VideoMediator.prototype.initUI = function () {
            if (this.videoPage == 1) {
                this.videoPanel.group_home.visible = true;
                this.videoPanel.group_intro.visible = false;
                this.videoPanel.label_name.text = GlobalData.gameNeedData.actName;
                this.videoPanel.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
                this.videoPanel.btn_setup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSetup, this);
            }
            else {
                this.videoPanel.group_home.visible = false;
                this.videoPanel.group_intro.visible = true;
                this.videoPanel.btn_skip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openReady, this);
            }
        };
        VideoMediator.prototype.startGame = function () {
            this.clickBtnClose();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN);
        };
        VideoMediator.prototype.openSetup = function () {
            this.clickBtnClose();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_SETUP);
        };
        VideoMediator.prototype.openReady = function () {
            this.clickBtnClose();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 1);
        };
        /** 初始化面板数据 */
        VideoMediator.prototype.initData = function () {
        };
        VideoMediator.prototype.clickBtnClose = function () {
            this.videoPanel.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
            this.videoPanel.btn_setup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openSetup, this);
            this.videoPanel.btn_skip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openReady, this);
            this.closePanel(0);
        };
        VideoMediator.NAME = "VideoMediator";
        return VideoMediator;
    }(BaseMediator));
    game.VideoMediator = VideoMediator;
    __reflect(VideoMediator.prototype, "game.VideoMediator");
})(game || (game = {}));
//# sourceMappingURL=VideoMediator.js.map