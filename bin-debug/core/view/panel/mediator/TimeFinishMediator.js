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
  * 时间模式完成界面
  */
var game;
(function (game) {
    var TimeFinishMediator = (function (_super) {
        __extends(TimeFinishMediator, _super);
        function TimeFinishMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, TimeFinishMediator.NAME, viewComponent) || this;
            _this.logoId = 0;
            _this.timeFinishPanel = new game.TimeFinishPanel();
            return _this;
        }
        TimeFinishMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_TIME_FINISH,
                NoficationConfig.CLOSE_TIME_FINISH
            ];
        };
        TimeFinishMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TIME_FINISH: {
                    this.changeBg();
                    this.showUI(this.timeFinishPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_TIME_FINISH: {
                    this.closeButtonClick();
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        TimeFinishMediator.prototype.initUI = function () {
            this.setLogo();
            this.timeFinishPanel.btn_result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
        };
        /**
         * 初始化面板数据
         */
        TimeFinishMediator.prototype.initData = function () {
            GlobalData.pageIndex = 12;
            if (GlobalData.curLeftPlayerVo) {
                this.timeFinishPanel.l_finish.setPlayer(GlobalData.curLeftPlayerVo);
            }
            if (GlobalData.curCenterPlayerVo) {
                this.timeFinishPanel.c_finish.setPlayer(GlobalData.curCenterPlayerVo);
            }
            if (GlobalData.curRightPlayerVo) {
                this.timeFinishPanel.r_finish.setPlayer(GlobalData.curRightPlayerVo);
            }
        };
        TimeFinishMediator.prototype.changeBg = function () {
            var bgId = Math.floor(Math.random() * 10 + 1);
            var bgName = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        };
        TimeFinishMediator.prototype.closeButtonClick = function () {
            this.timeFinishPanel.group_logo.removeChildren();
            this.timeFinishPanel.btn_result.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
            this.closeImgLoader();
            this.closePanel(0);
        };
        TimeFinishMediator.prototype.checkResult = function () {
            this.closeButtonClick();
            NativeApi.openHtmlView("HomeView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName);
        };
        TimeFinishMediator.prototype.setLogo = function () {
            this.timeFinishPanel.group_logo.removeChildren();
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
        TimeFinishMediator.prototype.loadLogoComp = function (evt) {
            if (evt.currentTarget.data) {
                var img = new eui.Image();
                var ext = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.x = this.timeFinishPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                var scaleNum = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.timeFinishPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    var bitMapData = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                }
                else {
                    this.closeImgLoader();
                }
            }
        };
        TimeFinishMediator.prototype.loadLogoError = function () {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        };
        TimeFinishMediator.prototype.closeImgLoader = function () {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        };
        TimeFinishMediator.NAME = "TimeFinishMediator";
        return TimeFinishMediator;
    }(BaseMediator));
    game.TimeFinishMediator = TimeFinishMediator;
    __reflect(TimeFinishMediator.prototype, "game.TimeFinishMediator");
})(game || (game = {}));
//# sourceMappingURL=TimeFinishMediator.js.map