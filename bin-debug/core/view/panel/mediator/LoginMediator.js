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
 * 登录界面
 *
 */
var game;
(function (game) {
    var LoginMediator = (function (_super) {
        __extends(LoginMediator, _super);
        function LoginMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, LoginMediator.NAME, viewComponent) || this;
            _this.openType = 0;
            _this.logoId = 0;
            _this.loginPanel = new game.LoginPanel();
            return _this;
        }
        LoginMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_LOGIN,
                NoficationConfig.CLOSE_LOGIN,
                EventConfig.Event_UPDATE_PLAYER
            ];
        };
        LoginMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_LOGIN: {
                    this.openType = data;
                    this.showUI(this.loginPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_LOGIN: {
                    this.closeButtonClick();
                    break;
                }
                case EventConfig.Event_UPDATE_PLAYER: {
                    this.initListView();
                    break;
                }
            }
        };
        /**
        * 初始化面板ui
        */
        LoginMediator.prototype.initUI = function () {
            this.loginPanel.iconList1.initView();
            this.loginPanel.iconList2.initView();
            this.loginPanel.iconList3.initView();
            this.changeBg();
            this.setLogo();
            if (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2) {
                this.loginPanel.label_tip.fontFamily = "resource/font/ccty.TTF";
            }
            else {
                this.loginPanel.label_tip.fontFamily = "cctyFont";
            }
            this.loginPanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.loginPanel.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startXL, this);
        };
        /**
         * 初始化面板数据
         */
        LoginMediator.prototype.initData = function () {
            GlobalData.pageIndex = 3;
            GlobalData.initAndroidArrData();
            this.initListView();
        };
        LoginMediator.prototype.changeBg = function () {
            var bgId = Math.floor(Math.random() * 10 + 1);
            var bgName = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        };
        LoginMediator.prototype.initListView = function () {
            var arr_left = PlayerModel.getInstance().getLeftPlayer();
            var arr_center = PlayerModel.getInstance().getCenterPlayer();
            var arr_right = PlayerModel.getInstance().getRightPlayer();
            var new_left = [];
            var new_center = [];
            var new_right = [];
            new_left = this.addPlayerVO(arr_left);
            new_center = this.addPlayerVO(arr_center);
            new_right = this.addPlayerVO(arr_right);
            this.loginPanel.iconList1.setGroupData(new_left, 1);
            this.loginPanel.iconList2.setGroupData(new_center, 2);
            this.loginPanel.iconList3.setGroupData(new_right, 3);
        };
        LoginMediator.prototype.backView = function () {
            this.sendNofiCation(1);
        };
        LoginMediator.prototype.startXL = function () {
            var childArr = [];
            PlayerModel.getInstance().deleteAddPlayer();
            childArr.push(this.loginPanel.iconList1.getNumChild());
            childArr.push(this.loginPanel.iconList2.getNumChild());
            childArr.push(this.loginPanel.iconList3.getNumChild());
            if (childArr.indexOf(1) != -1) {
                var leftArr = PlayerModel.getInstance().getLeftPlayer();
                var centerArr = PlayerModel.getInstance().getCenterPlayer();
                var rightArr = PlayerModel.getInstance().getRightPlayer();
                if (leftArr.length == 0 && centerArr.length == 0 && rightArr.length == 0) {
                    TipsUtils.showTipsFromCenter("没有玩家哦....");
                }
                else {
                    this.sendNofiCation(2);
                }
            }
            else {
                TipsUtils.showTipsFromCenter("没有玩家哦....");
            }
        };
        LoginMediator.prototype.sendNofiCation = function (data) {
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_LOGIN);
            switch (data) {
                case 1:
                    NativeApi.sendToNativeFun(4);
                    break;
                case 2:
                    NativeApi.sendToNativeFun(6);
                    NativeApi.openHtmlView("IntroView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName);
                    break;
            }
        };
        LoginMediator.prototype.closeButtonClick = function () {
            this.loginPanel.group_logo.removeChildren();
            this.loginPanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.loginPanel.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startXL, this);
            this.closeImgLoader();
            this.closePanel(0);
        };
        LoginMediator.prototype.addPlayerVO = function (arr) {
            var returnArr = [];
            for (var i = 0; i < arr.length; i++) {
                var vo = arr[i];
                returnArr.push(vo);
            }
            for (var i = 0; i < returnArr.length; i++) {
                if (returnArr[i].playerId == -1) {
                    returnArr.splice(i, 1);
                    i--;
                }
            }
            if (returnArr.length < 6) {
                var addVo = new PlayerVO();
                addVo.playerId = -1;
                addVo.playerIcon = "checkAdd_png";
                addVo.playerName = "添加";
                returnArr.push(addVo);
                return returnArr;
            }
            else {
                return returnArr;
            }
        };
        LoginMediator.prototype.setLogo = function () {
            this.loginPanel.group_logo.removeChildren();
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
        LoginMediator.prototype.loadLogoComp = function (evt) {
            if (evt.currentTarget.data) {
                var img = new eui.Image();
                var ext = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.x = this.loginPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                var scaleNum = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.loginPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    var bitMapData = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                }
                else {
                    this.loginPanel.group_btn.top = this.loginPanel.group_logo.top + this.loginPanel.group_logo.height + 20;
                    this.closeImgLoader();
                }
            }
        };
        LoginMediator.prototype.loadLogoError = function () {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        };
        LoginMediator.prototype.closeImgLoader = function () {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        };
        LoginMediator.NAME = "LoginMediator";
        return LoginMediator;
    }(BaseMediator));
    game.LoginMediator = LoginMediator;
    __reflect(LoginMediator.prototype, "game.LoginMediator");
})(game || (game = {}));
//# sourceMappingURL=LoginMediator.js.map