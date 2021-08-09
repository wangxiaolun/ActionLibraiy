/**
 * 调整界面
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
    var TrimMediator = (function (_super) {
        __extends(TrimMediator, _super);
        function TrimMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, TrimMediator.NAME, viewComponent) || this;
            _this.logoId = 0;
            _this.trimPanel = new game.TrimPanel();
            return _this;
        }
        TrimMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_TRIM,
                NoficationConfig.CLOSE_TRIM,
                EventConfig.Event_GAME_POSITION_UP,
                EventConfig.Event_GAME_POSITION_DOWN,
                EventConfig.Event_GAME_SCALE_UP,
                EventConfig.Event_GAME_SCALE_DOWN,
                EventConfig.Event_GAME_SAVESETUP
            ];
        };
        TrimMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TRIM: {
                    this.showUI(this.trimPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_TRIM: {
                    this.clickButtom();
                    break;
                }
                case EventConfig.Event_GAME_POSITION_UP: {
                    this.resetPostion(1);
                    break;
                }
                case EventConfig.Event_GAME_POSITION_DOWN: {
                    this.resetPostion(2);
                    break;
                }
                case EventConfig.Event_GAME_SCALE_UP: {
                    this.resetPostion(6);
                    break;
                }
                case EventConfig.Event_GAME_SCALE_DOWN: {
                    this.resetPostion(5);
                    break;
                }
                case EventConfig.Event_GAME_SAVESETUP: {
                    this.resetPostion(3);
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        TrimMediator.prototype.initUI = function () {
            this.setLogo();
            this.trimPanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.trimPanel.img_bg.x = 0;
            var bgId = Math.floor(Math.random() * 10 + 1);
            this.trimPanel.img_bg.source = RES.getRes("bg" + bgId + "_png");
            this.resetBgPos();
            this.addGame();
        };
        /**
         * 初始化面板数据
         */
        TrimMediator.prototype.initData = function () {
            GlobalData.pageIndex = 6;
            this.trimPanel.game1.setIconShow(false);
            this.trimPanel.game2.setIconShow(false);
            this.trimPanel.game3.setIconShow(false);
        };
        TrimMediator.prototype.clickButtom = function () {
            this.trimPanel.group_logo.removeChildren();
            this.trimPanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            egret.Tween.removeTweens(this.trimPanel.img_bg);
            this.closeImgLoader();
            this.closePanel(0);
        };
        TrimMediator.prototype.backView = function () {
            GlobalData.pageIndex = 5;
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        };
        TrimMediator.prototype.resetBgPos = function () {
            var _this = this;
            egret.Tween.removeTweens(this.trimPanel.img_bg);
            egret.Tween.get(this.trimPanel.img_bg).to({ x: -350 }, 8000).wait(350).call(function () {
                egret.Tween.get(_this.trimPanel.img_bg).to({ x: 0 }, 8000).wait(350).call(_this.resetBgPos, _this);
            }, this);
        };
        TrimMediator.prototype.addGame = function () {
            for (var i = 1; i < 4; i++) {
                if (i == 1) {
                    this.trimPanel.game1.setGame(i);
                }
                else if (i == 2) {
                    this.trimPanel.game2.setGame(i);
                }
                else if (i == 3) {
                    this.trimPanel.game3.setGame(i);
                }
            }
        };
        TrimMediator.prototype.resetPostion = function (type) {
            this.trimPanel.game1.getGame(type, 1);
            this.trimPanel.game2.getGame(type, 2);
            this.trimPanel.game3.getGame(type, 3);
        };
        TrimMediator.prototype.setLogo = function () {
            this.trimPanel.group_logo.removeChildren();
            this.logoId = 0;
            if (GlobalData.logoArr.length > 0) {
                this.imgLoad = new egret.ImageLoader();
                this.imgLoad.crossOrigin = "anonymous";
                this.imgLoad.addEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                var bitMapData = GlobalData.logoArr[this.logoId];
                this.imgLoad.load(bitMapData);
            }
        };
        TrimMediator.prototype.loadLogoComp = function (evt) {
            if (evt.currentTarget.data) {
                var img = new eui.Image();
                var ext = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.y = this.trimPanel.group_logo.height + 10;
                img.horizontalCenter = 0;
                var scaleNum = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.trimPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    var bitMapData = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                }
                else {
                    this.trimPanel.group_btn.top = this.trimPanel.group_logo.top + this.trimPanel.group_logo.height + 15;
                    this.closeImgLoader();
                }
            }
        };
        TrimMediator.prototype.loadLogoError = function () {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        };
        TrimMediator.prototype.closeImgLoader = function () {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        };
        TrimMediator.NAME = "TrimMediator";
        return TrimMediator;
    }(BaseMediator));
    game.TrimMediator = TrimMediator;
    __reflect(TrimMediator.prototype, "game.TrimMediator");
})(game || (game = {}));
//# sourceMappingURL=TrimMediator.js.map