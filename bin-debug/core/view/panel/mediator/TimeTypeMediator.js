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
  * 时间模式界面
  */
var game;
(function (game) {
    var TimeTypeMediator = (function (_super) {
        __extends(TimeTypeMediator, _super);
        function TimeTypeMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, TimeTypeMediator.NAME, viewComponent) || this;
            _this.timer = null;
            _this.timerNum = 0;
            _this.curTouchNum_l = 0;
            _this.curTouchNum_c = 0;
            _this.curTouchNum_r = 0;
            _this.logoId = 0;
            _this.timeTypePanel = new game.TimeTypePanel();
            return _this;
        }
        TimeTypeMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_TIMETYPE,
                NoficationConfig.CLOSE_TIMETYPE,
                EventConfig.Event_UPDATE_TIMENUM_TIME,
                EventConfig.Event_UPDATE_TOUCHNUM_TIME,
                EventConfig.Event_UPDATE_STEPNUM_TIME,
                EventConfig.Event_GAME_TIME_RESET,
                EventConfig.Event_TIMEGAME_CONTAINUE,
                EventConfig.Event_GAME_SAVESETUP_TIME,
                EventConfig.Event_UPDATE_TOUCH_TIME_CHANGE,
            ];
        };
        TimeTypeMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TIMETYPE: {
                    //显示角色面板
                    this.changeBg();
                    this.showUI(this.timeTypePanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_TIMETYPE: {
                    this.closeButtonClick();
                    break;
                }
                case EventConfig.Event_UPDATE_TIMENUM_TIME: {
                    this.upDateTime(data);
                    break;
                }
                case EventConfig.Event_UPDATE_TOUCHNUM_TIME: {
                    this.upDateTouch(data);
                    break;
                }
                case EventConfig.Event_UPDATE_STEPNUM_TIME: {
                    this.updateStep(data);
                    break;
                }
                case EventConfig.Event_GAME_TIME_RESET: {
                    this.resetGame();
                    break;
                }
                case EventConfig.Event_TIMEGAME_CONTAINUE: {
                    this.containue();
                    break;
                }
                case EventConfig.Event_GAME_SAVESETUP_TIME: {
                    this.resetGamePos();
                    break;
                }
                case EventConfig.Event_UPDATE_TOUCH_TIME_CHANGE: {
                    this.changeObj(data);
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        TimeTypeMediator.prototype.initUI = function () {
            this.setLogo();
            this.timeTypePanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.timeTypePanel.p_left.setPlayerData(GlobalData.curLeftPlayerVo);
            this.timeTypePanel.p_center.setPlayerData(GlobalData.curCenterPlayerVo);
            this.timeTypePanel.p_right.setPlayerData(GlobalData.curRightPlayerVo);
            this.timeTypePanel.p_left.setGame(1);
            this.timeTypePanel.p_center.setGame(2);
            this.timeTypePanel.p_right.setGame(3);
        };
        TimeTypeMediator.prototype.changeBg = function () {
            var bgId = Math.floor(Math.random() * 21 + 1);
            var bgName = "s_bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        };
        /**
         * 初始化面板数据
         */
        TimeTypeMediator.prototype.initData = function () {
            GlobalData.pageIndex = 11;
            game.TimeGame.getInstance().initData();
        };
        TimeTypeMediator.prototype.upDateTime = function (vo) {
            if (this.timeTypePanel) {
                this.timeTypePanel.p_left.gameIcon.setTimer(Global.formatTime(vo.timeNum, 1));
                this.timeTypePanel.p_center.gameIcon.setTimer(Global.formatTime(vo.timeNum, 1));
                this.timeTypePanel.p_right.gameIcon.setTimer(Global.formatTime(vo.timeNum, 1));
            }
        };
        TimeTypeMediator.prototype.updateStep = function (vo) {
            if (this.timeTypePanel) {
                this.timeTypePanel.p_left.gameIcon.setStep(vo.type + "/" + vo.timeNum);
                this.timeTypePanel.p_center.gameIcon.setStep(vo.type + "/" + vo.timeNum);
                this.timeTypePanel.p_right.gameIcon.setStep(vo.type + "/" + vo.timeNum);
            }
        };
        TimeTypeMediator.prototype.upDateTouch = function (vo) {
            if (this.timeTypePanel) {
                switch (vo.type) {
                    case 1:
                        this.timeTypePanel.p_left.gameIcon.setTimeTouchNum(vo.timeNum);
                        break;
                    case 2:
                        this.timeTypePanel.p_center.gameIcon.setTimeTouchNum(vo.timeNum);
                        break;
                    case 3:
                        this.timeTypePanel.p_right.gameIcon.setTimeTouchNum(vo.timeNum);
                        break;
                }
            }
        };
        TimeTypeMediator.prototype.containue = function () {
            if (GlobalData.gameNeedData.actId == 11) {
                this.timeTypePanel.p_left.getRainGame(1, 1);
                this.timeTypePanel.p_center.getRainGame(2, 1);
                this.timeTypePanel.p_right.getRainGame(3, 1);
            }
            else if (GlobalData.gameNeedData.actId == 2) {
                this.timeTypePanel.p_left.getFlowerGame(1, 1);
                this.timeTypePanel.p_center.getFlowerGame(2, 1);
                this.timeTypePanel.p_right.getFlowerGame(3, 1);
            }
            game.TimeGame.getInstance().containue();
        };
        TimeTypeMediator.prototype.resetGame = function () {
            game.TimeGame.getInstance().resetGame();
            this.closeButtonClick();
        };
        TimeTypeMediator.prototype.pauseGame = function () {
            if (game.TimeGame.getInstance().pauseGame()) {
                if (GlobalData.gameNeedData.actId == 11) {
                    this.timeTypePanel.p_left.getRainGame(1, 2);
                    this.timeTypePanel.p_center.getRainGame(2, 2);
                    this.timeTypePanel.p_right.getRainGame(3, 2);
                }
                else if (GlobalData.gameNeedData.actId == 2) {
                    this.timeTypePanel.p_left.getFlowerGame(1, 2);
                    this.timeTypePanel.p_center.getFlowerGame(2, 2);
                    this.timeTypePanel.p_right.getFlowerGame(3, 2);
                }
                game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_PAUSE, 11);
            }
        };
        TimeTypeMediator.prototype.closeButtonClick = function () {
            this.timeTypePanel.group_logo.removeChildren();
            game.TimeGame.getInstance().initTimeData();
            this.timeTypePanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.closeImgLoader();
            this.closePanel(0);
        };
        TimeTypeMediator.prototype.resetGamePos = function () {
            if (this.timeTypePanel) {
                this.timeTypePanel.p_left.getGame(4, 1);
                this.timeTypePanel.p_center.getGame(4, 2);
                this.timeTypePanel.p_right.getGame(4, 3);
            }
            else {
                return;
            }
        };
        TimeTypeMediator.prototype.changeObj = function (vo) {
            if (vo.type == 12) {
                switch (vo.timeNum) {
                    case 1:
                        this.timeTypePanel.p_left.getStone(vo);
                        break;
                    case 2:
                        this.timeTypePanel.p_center.getStone(vo);
                        break;
                    case 3:
                        this.timeTypePanel.p_right.getStone(vo);
                        break;
                }
            }
        };
        TimeTypeMediator.prototype.setLogo = function () {
            this.timeTypePanel.group_logo.removeChildren();
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
        TimeTypeMediator.prototype.loadLogoComp = function (evt) {
            if (evt.currentTarget.data) {
                var img = new eui.Image();
                var ext = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.y = this.timeTypePanel.group_logo.height + 10;
                img.horizontalCenter = 0;
                var scaleNum = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.timeTypePanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    var bitMapData = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                }
                else {
                    this.timeTypePanel.group_btn.top = this.timeTypePanel.group_logo.top + this.timeTypePanel.group_logo.height + 15;
                    this.closeImgLoader();
                }
            }
        };
        TimeTypeMediator.prototype.loadLogoError = function () {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        };
        TimeTypeMediator.prototype.closeImgLoader = function () {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        };
        TimeTypeMediator.NAME = "TimeTypeMediator";
        return TimeTypeMediator;
    }(BaseMediator));
    game.TimeTypeMediator = TimeTypeMediator;
    __reflect(TimeTypeMediator.prototype, "game.TimeTypeMediator");
})(game || (game = {}));
//# sourceMappingURL=TimeTypeMediator.js.map