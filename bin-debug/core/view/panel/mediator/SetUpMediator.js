/**
 * 设置界面
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
var gameData = {
    timeOneData: 0,
    timeTwoData: 0,
    timeThreeData: 0,
    taskOneData: 0,
    taskTwoData: 0,
    taskThreeData: 0
};
var game;
(function (game) {
    var SetUpMediator = (function (_super) {
        __extends(SetUpMediator, _super);
        function SetUpMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, SetUpMediator.NAME, viewComponent) || this;
            _this.checkTime = ["checkTagBg_png", "checkTimeTitle_png", "checkReduce_png", "checkAdd_png", "训练时间", "间歇时间", "组数"];
            _this.checkTask = ["checkTagBg_png", "checkTaskTitle_png", "checkReduce_png", "checkAdd_png", "每组次数", "间歇时间", "每人组数"];
            _this.noCheckTime = ["nocheckTagBg_png", "nocheckTimeTitle_png", "nocheckReduce_png", "nocheckAdd_png", "训练时间", "间歇时间", "组数"];
            _this.noCheckTask = ["nocheckTagBg_png", "nocheckTaskTitle_png", "nocheckReduce_png", "nocheckAdd_png", "每组次数", "间歇时间", "每人组数"];
            _this.setupPanel = new game.SetUpPanel();
            /**
             * 初始化面板数据
             */
            _this.curCheckType = false;
            _this.timeBtnNameArr = ["cut1", "add1", "cut2", "add2", "cut3", "add3"];
            _this.taskBtnNameArr = ["cuta", "adda", "cutb", "addb", "cutc", "addc"];
            return _this;
        }
        SetUpMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_SETUP,
                NoficationConfig.CLOSE_SETUP
            ];
        };
        SetUpMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_SETUP: {
                    this.changeBg();
                    this.showUI(this.setupPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_SETUP: {
                    this.closeButtonClick();
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        SetUpMediator.prototype.initUI = function () {
            this.setupPanel.btn_save.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveData, this);
            this.setupPanel.btn_cancle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
            this.setupPanel.btn_time.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTimeTag, this);
            this.setupPanel.btn_task.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTaskTag, this);
        };
        SetUpMediator.prototype.initData = function () {
            GlobalData.pageIndex = 2;
            this.curCheckType = GlobalData.checkType;
            this.initGameData();
            this.judgeCheck();
            this.resetData();
        };
        SetUpMediator.prototype.changeBg = function () {
            var bgId = Math.floor(Math.random() * 10 + 1);
            var bgName = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        };
        SetUpMediator.prototype.initGameData = function () {
            gameData.timeOneData = GlobalData.timeOneData;
            gameData.timeTwoData = GlobalData.timeTwoData;
            gameData.timeThreeData = GlobalData.timeThreeData;
            gameData.taskOneData = GlobalData.taskOneData;
            gameData.taskTwoData = GlobalData.taskTwoData;
            gameData.taskThreeData = GlobalData.taskThreeData;
        };
        SetUpMediator.prototype.judgeCheck = function () {
            if (this.curCheckType) {
                this.setupPanel.btn_time.setBg(this.checkTime);
                this.setupPanel.btn_task.setBg(this.noCheckTask);
                this.setupPanel.btn_time.setTouch(true);
                this.setupPanel.btn_task.setTouch(false);
            }
            else {
                this.setupPanel.btn_time.setBg(this.noCheckTime);
                this.setupPanel.btn_task.setBg(this.checkTask);
                this.setupPanel.btn_time.setTouch(false);
                this.setupPanel.btn_task.setTouch(true);
            }
        };
        SetUpMediator.prototype.resetData = function () {
            this.setupPanel.btn_time.setBtnName(this.timeBtnNameArr);
            this.setupPanel.btn_task.setBtnName(this.taskBtnNameArr);
            this.setupPanel.btn_time.setNumData(GlobalData.timeOneData + '"', GlobalData.timeTwoData + '"', GlobalData.timeThreeData + "");
            this.setupPanel.btn_task.setNumData(GlobalData.taskOneData + "", GlobalData.taskTwoData + '"', GlobalData.taskThreeData + "");
        };
        SetUpMediator.prototype.saveData = function () {
            this.sendNofiCation(1);
        };
        SetUpMediator.prototype.back = function () {
            this.sendNofiCation(2);
        };
        SetUpMediator.prototype.checkTimeTag = function () {
            if (this.curCheckType) {
                return;
            }
            this.curCheckType = !this.curCheckType;
            this.judgeCheck();
        };
        SetUpMediator.prototype.checkTaskTag = function () {
            if (this.curCheckType == false) {
                return;
            }
            this.curCheckType = !this.curCheckType;
            this.judgeCheck();
        };
        SetUpMediator.prototype.sendNofiCation = function (type) {
            switch (type) {
                case 1:
                    GlobalData.checkType = this.curCheckType;
                    StorageUtils.setLocalStorage();
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_SETUP);
                    NativeApi.sendToNativeFun(4);
                    break;
                case 2:
                    GlobalData.timeOneData = gameData.timeOneData;
                    GlobalData.timeTwoData = gameData.timeTwoData;
                    GlobalData.timeThreeData = gameData.timeThreeData;
                    GlobalData.taskOneData = gameData.taskOneData;
                    GlobalData.taskTwoData = gameData.taskTwoData;
                    GlobalData.taskThreeData = gameData.taskThreeData;
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_SETUP);
                    NativeApi.sendToNativeFun(4);
                    break;
            }
        };
        SetUpMediator.prototype.closeButtonClick = function () {
            this.setupPanel.btn_save.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.saveData, this);
            this.setupPanel.btn_cancle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
            this.setupPanel.btn_time.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTimeTag, this);
            this.setupPanel.btn_task.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTaskTag, this);
            this.closePanel(0);
        };
        SetUpMediator.NAME = "SetUpMediator";
        return SetUpMediator;
    }(BaseMediator));
    game.SetUpMediator = SetUpMediator;
    __reflect(SetUpMediator.prototype, "game.SetUpMediator");
})(game || (game = {}));
//# sourceMappingURL=SetUpMediator.js.map