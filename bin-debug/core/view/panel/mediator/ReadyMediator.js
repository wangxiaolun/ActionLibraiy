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
 * 准备阶段界面
 *
 */
var game;
(function (game) {
    var ReadyMediator = (function (_super) {
        __extends(ReadyMediator, _super);
        function ReadyMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, ReadyMediator.NAME, viewComponent) || this;
            _this.timer = null;
            _this.countTimeNum = 0;
            _this.openType = 0;
            _this.logoId = 0;
            _this.readyPanel = new game.ReadyPanel();
            return _this;
        }
        ReadyMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_READY,
                NoficationConfig.CLOSE_READY
            ];
        };
        ReadyMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_READY: {
                    this.openType = data;
                    this.showUI(this.readyPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_READY: {
                    if (this.timer) {
                        this.timer.stop();
                        this.timer = null;
                    }
                    this.countTimeNum = (GlobalData.checkType) ? GlobalData.timeTwoData : GlobalData.taskTwoData;
                    this.closeButtonClick();
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        ReadyMediator.prototype.initUI = function () {
            this.setLogo();
            this.changeBg();
            var maxLength = Global.contrastArr();
            if (GlobalData.checkType) {
                if (this.openType == 1) {
                    this.readyPanel.label_bottomTip.text = "准备开始";
                    this.readyPanel.label_tip.text = "训练即将开始，请做好准备。";
                }
                else {
                    this.readyPanel.label_bottomTip.text = "SET" + GlobalData._curTimerTotalGroup + "/" + (GlobalData.timeThreeData * maxLength);
                    this.readyPanel.label_tip.text = "请下一组做好准备";
                }
            }
            else {
                this.readyPanel.label_bottomTip.text = "准备开始";
                this.readyPanel.label_tip.text = "训练即将开始，请做好准备。";
            }
            this.readyPanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.readyPanel.btn_skip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skip, this);
        };
        ReadyMediator.prototype.changeBg = function () {
            var bgId = Math.floor(Math.random() * 10 + 1);
            var bgName = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        };
        /**
         * 初始化面板数据
         */
        ReadyMediator.prototype.initData = function () {
            GlobalData.pageIndex = 8;
            this.countTimeNum = (GlobalData.checkType) ? GlobalData.timeTwoData : GlobalData.taskTwoData;
            this.initView();
        };
        ReadyMediator.prototype.closeButtonClick = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            this.readyPanel.group_logo.removeChildren();
            this.readyPanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.readyPanel.btn_skip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skip, this);
            this.closeImgLoader();
            this.closePanel(0);
        };
        ReadyMediator.prototype.initView = function () {
            var leftArr = PlayerModel.getInstance().getLeftPlayer();
            var centerArr = PlayerModel.getInstance().getCenterPlayer();
            var rightArr = PlayerModel.getInstance().getRightPlayer();
            if (GlobalData.checkType) {
                if (leftArr[GlobalData._curTimerEveryGroup]) {
                    this.readyPanel.icon_left.visible = true;
                    this.readyPanel.img_leftBye.visible = false;
                    GlobalData.curLeftPlayerVo = leftArr[GlobalData._curTimerEveryGroup];
                    this.readyPanel.icon_left.setIconData(GlobalData.curLeftPlayerVo);
                }
                else {
                    this.readyPanel.icon_left.visible = false;
                    this.readyPanel.img_leftBye.visible = true;
                    GlobalData.curLeftPlayerVo = null;
                }
                if (centerArr[GlobalData._curTimerEveryGroup]) {
                    this.readyPanel.icon_center.visible = true;
                    this.readyPanel.img_centerBye.visible = false;
                    GlobalData.curCenterPlayerVo = centerArr[GlobalData._curTimerEveryGroup];
                    this.readyPanel.icon_center.setIconData(GlobalData.curCenterPlayerVo);
                }
                else {
                    this.readyPanel.icon_center.visible = false;
                    this.readyPanel.img_centerBye.visible = true;
                    GlobalData.curCenterPlayerVo = null;
                }
                if (rightArr[GlobalData._curTimerEveryGroup]) {
                    this.readyPanel.icon_right.visible = true;
                    this.readyPanel.img_rightBye.visible = false;
                    GlobalData.curRightPlayerVo = rightArr[GlobalData._curTimerEveryGroup];
                    this.readyPanel.icon_right.setIconData(GlobalData.curRightPlayerVo);
                }
                else {
                    this.readyPanel.icon_right.visible = false;
                    this.readyPanel.img_rightBye.visible = true;
                    GlobalData.curRightPlayerVo = null;
                }
            }
            else {
                if (leftArr[GlobalData.l_curTaskEveryGroup]) {
                    this.readyPanel.icon_left.visible = true;
                    this.readyPanel.img_leftBye.visible = false;
                    GlobalData.curLeftPlayerVo = leftArr[GlobalData.l_curTaskEveryGroup];
                    this.readyPanel.icon_left.setIconData(GlobalData.curLeftPlayerVo);
                }
                else {
                    this.readyPanel.icon_left.visible = false;
                    this.readyPanel.img_leftBye.visible = true;
                    GlobalData.curLeftPlayerVo = null;
                }
                if (centerArr[GlobalData.c_curTaskEveryGroup]) {
                    this.readyPanel.icon_center.visible = true;
                    this.readyPanel.img_centerBye.visible = false;
                    GlobalData.curCenterPlayerVo = centerArr[GlobalData.c_curTaskEveryGroup];
                    this.readyPanel.icon_center.setIconData(GlobalData.curCenterPlayerVo);
                }
                else {
                    this.readyPanel.icon_center.visible = false;
                    this.readyPanel.img_centerBye.visible = true;
                    GlobalData.curCenterPlayerVo = null;
                }
                if (rightArr[GlobalData.r_curTaskEveryGroup]) {
                    this.readyPanel.icon_right.visible = true;
                    this.readyPanel.img_rightBye.visible = false;
                    GlobalData.curRightPlayerVo = rightArr[GlobalData.r_curTaskEveryGroup];
                    this.readyPanel.icon_right.setIconData(GlobalData.curRightPlayerVo);
                }
                else {
                    this.readyPanel.icon_right.visible = false;
                    this.readyPanel.img_rightBye.visible = true;
                    GlobalData.curRightPlayerVo = null;
                }
            }
            this.initTime();
        };
        ReadyMediator.prototype.initTime = function () {
            this.readyPanel.label_time.text = this.countTimeNum + "";
            if (this.countTimeNum < 11 && this.countTimeNum > 0) {
                game.SoundUtils.getInstance().playTimeSound(this.countTimeNum);
            }
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
            }
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.changeTimer, this);
            this.timer.start();
        };
        ReadyMediator.prototype.changeTimer = function (evt) {
            this.countTimeNum--;
            if (this.countTimeNum < 0) {
                if (this.timer) {
                    this.timer.stop();
                }
                this.timer = null;
                // 跳转下一界面
                if (GlobalData.checkType) {
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TIMETYPE);
                }
                else {
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TASKTYPE);
                }
                return;
            }
            this.readyPanel.label_time.text = this.countTimeNum + "";
            if (this.countTimeNum < 11 && this.countTimeNum > 0) {
                game.SoundUtils.getInstance().playTimeSound(this.countTimeNum);
            }
        };
        ReadyMediator.prototype.backView = function () {
            if (this.timer.running && this.timer.currentCount > 1) {
                this.sendNofiCation(1);
            }
        };
        ReadyMediator.prototype.skip = function () {
            if (this.timer.running && this.timer.currentCount > 1) {
                this.sendNofiCation(2);
            }
        };
        ReadyMediator.prototype.sendNofiCation = function (data) {
            switch (data) {
                case 1:
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                    NativeApi.sendToNativeFun(4);
                    break;
                case 2:
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                    if (GlobalData.checkType) {
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TIMETYPE);
                    }
                    else {
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TASKTYPE);
                    }
                    break;
            }
        };
        ReadyMediator.prototype.setLogo = function () {
            this.readyPanel.group_logo.removeChildren();
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
        ReadyMediator.prototype.loadLogoComp = function (evt) {
            if (evt.currentTarget.data) {
                var img = new eui.Image();
                var ext = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.x = this.readyPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                var scaleNum = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.readyPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    var bitMapData = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                }
                else {
                    this.readyPanel.group_btn.top = this.readyPanel.group_logo.top + this.readyPanel.group_logo.height + 20;
                    this.closeImgLoader();
                }
            }
        };
        ReadyMediator.prototype.loadLogoError = function () {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        };
        ReadyMediator.prototype.closeImgLoader = function () {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        };
        ReadyMediator.NAME = "ReadyMediator";
        return ReadyMediator;
    }(BaseMediator));
    game.ReadyMediator = ReadyMediator;
    __reflect(ReadyMediator.prototype, "game.ReadyMediator");
})(game || (game = {}));
//# sourceMappingURL=ReadyMediator.js.map