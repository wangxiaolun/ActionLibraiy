/**
 * 教程视频界面
 *
 */
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
var game;
(function (game) {
    var TeachMediator = (function (_super) {
        __extends(TeachMediator, _super);
        function TeachMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, TeachMediator.NAME, viewComponent) || this;
            _this.videoArr = [];
            _this.pageNums = 0;
            _this.curPage = 0;
            _this.teachPanel = new game.TeachPanel();
            return _this;
        }
        TeachMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_TEACH,
                NoficationConfig.CLOSE_TEACH
            ];
        };
        TeachMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TEACH: {
                    this.showUI(this.teachPanel, false, 0, 0, 6);
                    break;
                }
                case NoficationConfig.CLOSE_TEACH: {
                    this.closePanel(1);
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        TeachMediator.prototype.initUI = function () {
            this.teachPanel.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judgePage, this);
        };
        /**
         * 初始化面板数据
         */
        TeachMediator.prototype.initData = function () {
        };
        TeachMediator.prototype.clickButtonCLose = function () {
            this.teachPanel.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.judgePage, this);
            this.closePanel(1);
        };
        TeachMediator.prototype.judgePage = function () {
            this.clickButtonCLose();
            egret.setTimeout(function () {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 1);
            }, this, 200);
        };
        TeachMediator.NAME = "TeachMediator";
        return TeachMediator;
    }(BaseMediator));
    game.TeachMediator = TeachMediator;
    __reflect(TeachMediator.prototype, "game.TeachMediator");
})(game || (game = {}));
//# sourceMappingURL=TeachMediator.js.map