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
  * 任务模式界面
  */
var game;
(function (game) {
    var TaskTypeMediator = (function (_super) {
        __extends(TaskTypeMediator, _super);
        function TaskTypeMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, TaskTypeMediator.NAME, viewComponent) || this;
            _this.logoId = 0;
            _this.taskTypePanel = new game.TaskTypePanel();
            return _this;
        }
        TaskTypeMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_TASKTYPE,
                NoficationConfig.CLOSE_TASKTYPE,
                EventConfig.Event_UPDATE_TOUCH_Task,
                EventConfig.Event_UPDATE_TOUCH_Task_Show,
                EventConfig.Event_SKIP_TASK_PREPRA,
                EventConfig.Event_TASKGAME_CONTAINUE,
                EventConfig.Event_GAME_TASK_RESET,
                EventConfig.Event_GAME_TASK_CHANGESTATUS,
                EventConfig.Event_GAME_TASK_FILLDATA_PREPARA,
                EventConfig.Event_GAME_TASK_FILLDATA_PROGRESS,
                EventConfig.Event_GAME_TASK_FILLDATA_FINISH,
                EventConfig.Event_GAME_TASK_SETTIME_PREPARA,
                EventConfig.Event_GAME_TASK_SETTOUCH_PROSS,
                EventConfig.Event_GAME_TASK_SETTIME_PROSS,
                EventConfig.Event_GAME_TASK_PASUE,
                EventConfig.Event_GAME_TASK_RESTART,
                EventConfig.Event_GAME_SAVESETUP_TASK,
                EventConfig.Event_UPDATE_TOUCH_TASK_CHANGE,
            ];
        };
        TaskTypeMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TASKTYPE: {
                    this.changeBg();
                    this.showUI(this.taskTypePanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_TASKTYPE: {
                    this.closeButtonClick();
                    break;
                }
                case EventConfig.Event_UPDATE_TOUCH_Task: {
                    this.updateTouch(data);
                    break;
                }
                case EventConfig.Event_UPDATE_TOUCH_Task_Show: {
                    this.updateTouchShow(data);
                    break;
                }
                case EventConfig.Event_SKIP_TASK_PREPRA: {
                    this.skipPrepra(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_RESET: {
                    this.closeButtonClick();
                    break;
                }
                case EventConfig.Event_TASKGAME_CONTAINUE: {
                    this.containue();
                    break;
                }
                case EventConfig.Event_GAME_TASK_CHANGESTATUS: {
                    this.setStateChange(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_FILLDATA_PREPARA: {
                    this.fillPreParaData(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_FILLDATA_PROGRESS: {
                    this.fillProData(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_FILLDATA_FINISH: {
                    this.fillFinishData(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_SETTIME_PREPARA: {
                    this.preparaSettime(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_SETTOUCH_PROSS: {
                    this.progressSetTouch(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_SETTIME_PROSS: {
                    this.progressSetTime(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_PASUE: {
                    this.prePauseGame(data);
                    break;
                }
                case EventConfig.Event_GAME_TASK_RESTART: {
                    this.proRestart(data);
                    break;
                }
                case EventConfig.Event_GAME_SAVESETUP_TASK: {
                    this.resetGamePos();
                    break;
                }
                case EventConfig.Event_UPDATE_TOUCH_TASK_CHANGE: {
                    this.changeObj(data);
                    break;
                }
            }
        };
        /**
         * 初始化面板ui
         */
        TaskTypeMediator.prototype.initUI = function () {
            this.setLogo();
            this.taskTypePanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.taskTypePanel.btn_result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
            this.taskTypePanel.l_progress.setGame(1);
            this.taskTypePanel.c_progress.setGame(2);
            this.taskTypePanel.r_progress.setGame(3);
            this.taskTypePanel.l_prepara.setName("prepara1");
            this.taskTypePanel.c_prepara.setName("prepara2");
            this.taskTypePanel.r_prepara.setName("prepara3");
        };
        /**
         * 初始化面板数据
         */
        TaskTypeMediator.prototype.initData = function () {
            GlobalData.pageIndex = 13;
            game.TaskGame.getInstance().initData();
        };
        TaskTypeMediator.prototype.changeBg = function () {
            var bgId = Math.floor(Math.random() * 21 + 1);
            var bgName = "s_bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        };
        TaskTypeMediator.prototype.closeButtonClick = function () {
            this.taskTypePanel.group_logo.removeChildren();
            this.taskTypePanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.taskTypePanel.btn_result.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
            this.closeImgLoader();
            game.TaskGame.getInstance().resetGame();
            this.closePanel(0);
        };
        TaskTypeMediator.prototype.updateTouch = function (touchId) {
            switch (touchId) {
                case 1:
                    game.TaskGame.getInstance().updateLeft();
                    break;
                case 2:
                    game.TaskGame.getInstance().updateCenter();
                    break;
                case 3:
                    game.TaskGame.getInstance().updateRight();
                    break;
            }
        };
        TaskTypeMediator.prototype.updateTouchShow = function (touchId) {
            game.TaskGame.getInstance().updateTouchShow(touchId);
        };
        TaskTypeMediator.prototype.checkResult = function (e) {
            this.closeButtonClick();
            NativeApi.openFinishView();
        };
        TaskTypeMediator.prototype.skipPrepra = function (index) {
            game.TaskGame.getInstance().skipPrepra(index);
        };
        TaskTypeMediator.prototype.preparaSettime = function (data) {
            switch (data.type) {
                case 1:
                    this.taskTypePanel.l_prepara.setCountTime(data.timeNum);
                    break;
                case 2:
                    this.taskTypePanel.c_prepara.setCountTime(data.timeNum);
                    break;
                case 3:
                    this.taskTypePanel.r_prepara.setCountTime(data.timeNum);
                    break;
            }
        };
        TaskTypeMediator.prototype.progressSetTouch = function (data) {
            switch (data.type) {
                case 1:
                    this.taskTypePanel.l_progress.setTouchNum(data.touchNum, GlobalData.taskOneData);
                    break;
                case 2:
                    this.taskTypePanel.c_progress.setTouchNum(data.touchNum, GlobalData.taskOneData);
                    break;
                case 3:
                    this.taskTypePanel.r_progress.setTouchNum(data.touchNum, GlobalData.taskOneData);
                    break;
            }
        };
        TaskTypeMediator.prototype.progressSetTime = function (data) {
            switch (data.type) {
                case 1:
                    this.taskTypePanel.l_progress.setTimeStr(data.pro_timeNum);
                    break;
                case 2:
                    this.taskTypePanel.c_progress.setTimeStr(data.pro_timeNum);
                    break;
                case 3:
                    this.taskTypePanel.r_progress.setTimeStr(data.pro_timeNum);
                    break;
            }
        };
        TaskTypeMediator.prototype.pauseGame = function () {
            game.TaskGame.getInstance().pauseGame();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_PAUSE, 13);
        };
        TaskTypeMediator.prototype.containue = function () {
            game.TaskGame.getInstance().containueGame();
        };
        TaskTypeMediator.prototype.setStateChange = function (status) {
            this.taskTypePanel.btn_result.visible = status.isFinish;
            this.taskTypePanel.btn_back.visible = !status.isFinish;
            this.taskTypePanel.btn_touch.visible = !status.isFinish;
            switch (status.target) {
                case "L":
                    switch (status.state) {
                        case 1:
                            this.taskTypePanel.l_prepara.visible = true;
                            this.taskTypePanel.l_progress.visible = false;
                            this.taskTypePanel.l_finish.visible = false;
                            break;
                        case 2:
                            this.taskTypePanel.l_prepara.visible = false;
                            this.taskTypePanel.l_progress.visible = true;
                            this.taskTypePanel.l_finish.visible = false;
                            break;
                        case 3:
                            this.taskTypePanel.l_prepara.visible = false;
                            this.taskTypePanel.l_progress.visible = false;
                            this.taskTypePanel.l_finish.visible = true;
                            break;
                        case 4:
                            this.taskTypePanel.l_prepara.visible = false;
                            this.taskTypePanel.l_progress.visible = false;
                            this.taskTypePanel.l_finish.visible = false;
                            break;
                    }
                    break;
                case "C":
                    switch (status.state) {
                        case 1:
                            this.taskTypePanel.c_prepara.visible = true;
                            this.taskTypePanel.c_progress.visible = false;
                            this.taskTypePanel.c_finish.visible = false;
                            break;
                        case 2:
                            this.taskTypePanel.c_prepara.visible = false;
                            this.taskTypePanel.c_progress.visible = true;
                            this.taskTypePanel.c_finish.visible = false;
                            break;
                        case 3:
                            this.taskTypePanel.c_prepara.visible = false;
                            this.taskTypePanel.c_progress.visible = false;
                            this.taskTypePanel.c_finish.visible = true;
                            break;
                        case 4:
                            this.taskTypePanel.c_prepara.visible = false;
                            this.taskTypePanel.c_progress.visible = false;
                            this.taskTypePanel.c_finish.visible = false;
                            break;
                    }
                    break;
                case "R":
                    switch (status.state) {
                        case 1:
                            this.taskTypePanel.r_prepara.visible = true;
                            this.taskTypePanel.r_progress.visible = false;
                            this.taskTypePanel.r_finish.visible = false;
                            break;
                        case 2:
                            this.taskTypePanel.r_prepara.visible = false;
                            this.taskTypePanel.r_progress.visible = true;
                            this.taskTypePanel.r_finish.visible = false;
                            break;
                        case 3:
                            this.taskTypePanel.r_prepara.visible = false;
                            this.taskTypePanel.r_progress.visible = false;
                            this.taskTypePanel.r_finish.visible = true;
                            break;
                        case 4:
                            this.taskTypePanel.r_prepara.visible = false;
                            this.taskTypePanel.r_progress.visible = false;
                            this.taskTypePanel.r_finish.visible = false;
                            break;
                    }
                    break;
            }
        };
        TaskTypeMediator.prototype.fillPreParaData = function (time) {
            switch (time.type) {
                case 1:
                    this.taskTypePanel.l_prepara.setCountTime(time.timeNum);
                    this.taskTypePanel.l_prepara.setStep(time.curStep, time.totalStep);
                    break;
                case 2:
                    this.taskTypePanel.c_prepara.setCountTime(time.timeNum);
                    this.taskTypePanel.c_prepara.setStep(time.curStep, time.totalStep);
                    break;
                case 3:
                    this.taskTypePanel.r_prepara.setCountTime(time.timeNum);
                    this.taskTypePanel.r_prepara.setStep(time.curStep, time.totalStep);
                    break;
            }
        };
        TaskTypeMediator.prototype.fillFinishData = function (finish) {
            switch (finish.type) {
                case 1:
                    this.taskTypePanel.l_finish.setPlayer(GlobalData.curLeftPlayerVo);
                    break;
                case 2:
                    this.taskTypePanel.c_finish.setPlayer(GlobalData.curCenterPlayerVo);
                    break;
                case 3:
                    this.taskTypePanel.r_finish.setPlayer(GlobalData.curRightPlayerVo);
                    break;
            }
        };
        TaskTypeMediator.prototype.fillProData = function (progress) {
            switch (progress.type) {
                case 1:
                    this.taskTypePanel.l_progress.setPlayerData(GlobalData.curLeftPlayerVo);
                    this.taskTypePanel.l_progress.setStep(progress.curStep, progress.totalStep);
                    this.taskTypePanel.l_progress.setTouchNum(progress.pro_curNum, progress.pro_totalNum);
                    this.taskTypePanel.l_progress.setTimeStr(progress.pro_timeNum);
                    this.taskTypePanel.l_progress.setGame(1);
                    break;
                case 2:
                    this.taskTypePanel.c_progress.setPlayerData(GlobalData.curCenterPlayerVo);
                    this.taskTypePanel.c_progress.setStep(progress.curStep, progress.totalStep);
                    this.taskTypePanel.c_progress.setTouchNum(progress.pro_curNum, progress.pro_totalNum);
                    this.taskTypePanel.c_progress.setTimeStr(progress.pro_timeNum);
                    this.taskTypePanel.c_progress.setGame(2);
                    break;
                case 3:
                    this.taskTypePanel.r_progress.setPlayerData(GlobalData.curRightPlayerVo);
                    this.taskTypePanel.r_progress.setStep(progress.curStep, progress.totalStep);
                    this.taskTypePanel.r_progress.setTouchNum(progress.pro_curNum, progress.pro_totalNum);
                    this.taskTypePanel.r_progress.setTimeStr(progress.pro_timeNum);
                    this.taskTypePanel.r_progress.setGame(3);
                    break;
            }
        };
        TaskTypeMediator.prototype.prePauseGame = function (index) {
            switch (index) {
                case 1:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.l_progress.getRainGame(1, 2);
                    }
                    else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.l_progress.getFlowerGame(1, 2);
                    }
                    break;
                case 2:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.c_progress.getRainGame(2, 2);
                    }
                    else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.c_progress.getFlowerGame(2, 2);
                    }
                    break;
                case 3:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.r_progress.getRainGame(3, 2);
                    }
                    else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.r_progress.getFlowerGame(3, 2);
                    }
                    break;
            }
        };
        TaskTypeMediator.prototype.proRestart = function (index) {
            switch (index) {
                case 1:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.l_progress.getRainGame(1, 1);
                    }
                    else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.l_progress.getFlowerGame(1, 1);
                    }
                    break;
                case 2:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.c_progress.getRainGame(2, 1);
                    }
                    else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.c_progress.getFlowerGame(2, 1);
                    }
                    break;
                case 3:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.r_progress.getRainGame(3, 1);
                    }
                    else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.r_progress.getFlowerGame(3, 1);
                    }
                    break;
            }
        };
        TaskTypeMediator.prototype.resetGamePos = function () {
            if (this.taskTypePanel) {
                this.taskTypePanel.l_progress.getGame(4, 1);
                this.taskTypePanel.c_progress.getGame(4, 2);
                this.taskTypePanel.r_progress.getGame(4, 3);
            }
        };
        TaskTypeMediator.prototype.changeObj = function (vo) {
            if (vo.type == 12) {
                switch (vo.timeNum) {
                    case 1:
                        this.taskTypePanel.l_progress.getStone(vo);
                        break;
                    case 2:
                        this.taskTypePanel.c_progress.getStone(vo);
                        break;
                    case 3:
                        this.taskTypePanel.r_progress.getStone(vo);
                        break;
                }
            }
        };
        TaskTypeMediator.prototype.setLogo = function () {
            this.taskTypePanel.group_logo.removeChildren();
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
        TaskTypeMediator.prototype.loadLogoComp = function (evt) {
            if (evt.currentTarget.data) {
                var img = new eui.Image();
                var ext = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.y = this.taskTypePanel.group_logo.height + 10;
                img.horizontalCenter = 0;
                var scaleNum = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.taskTypePanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    var bitMapData = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                }
                else {
                    this.taskTypePanel.group_btn.top = this.taskTypePanel.group_logo.top + this.taskTypePanel.group_logo.height + 15;
                }
            }
        };
        TaskTypeMediator.prototype.loadLogoError = function () {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        };
        TaskTypeMediator.prototype.closeImgLoader = function () {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        };
        TaskTypeMediator.NAME = "TaskTypeMediator";
        return TaskTypeMediator;
    }(BaseMediator));
    game.TaskTypeMediator = TaskTypeMediator;
    __reflect(TaskTypeMediator.prototype, "game.TaskTypeMediator");
})(game || (game = {}));
//# sourceMappingURL=TaskTypeMediator.js.map