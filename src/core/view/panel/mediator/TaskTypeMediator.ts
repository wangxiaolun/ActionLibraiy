/**
  * 任务模式界面
  */
module game {

    export class TaskTypeMediator extends BaseMediator {
        public static NAME: string = "TaskTypeMediator";

        private imgLoad: egret.ImageLoader;
        private logoId: number = 0;

        public constructor(viewComponent: any = null) {
            super(TaskTypeMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
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
        }
        private taskTypePanel: TaskTypePanel = new TaskTypePanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
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
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.setLogo();
            this.taskTypePanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.taskTypePanel.btn_result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
            this.taskTypePanel.l_progress.setGame(1);
            this.taskTypePanel.c_progress.setGame(2);
            this.taskTypePanel.r_progress.setGame(3);
            this.taskTypePanel.l_prepara.setName("prepara1");
            this.taskTypePanel.c_prepara.setName("prepara2");
            this.taskTypePanel.r_prepara.setName("prepara3");
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            GlobalData.pageIndex = 13;
            game.TaskGame.getInstance().initData();
        }

        private changeBg(): void {
            let bgId: number = Math.floor(Math.random() * 21 + 1);
            let bgName: string = "s_bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        }

        private closeButtonClick(): void {
            this.taskTypePanel.group_logo.removeChildren();
            this.taskTypePanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.taskTypePanel.btn_result.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
            this.closeImgLoader();
            game.TaskGame.getInstance().resetGame();
            this.closePanel(0);
        }

        private updateTouch(touchId: number): void {
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
        }

        private updateTouchShow(touchId: number): void {
            game.TaskGame.getInstance().updateTouchShow(touchId);
        }

        private checkResult(e: egret.TouchEvent): void {
            this.closeButtonClick();
            NativeApi.openFinishView();
        }

        private skipPrepra(index: number): void {
            game.TaskGame.getInstance().skipPrepra(index);
        }

        private preparaSettime(data: PreparaVO): void {
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
        }

        private progressSetTouch(data: ProgressVO): void {
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
        }

        private progressSetTime(data: FillVO): void {
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
        }

        private pauseGame(): void {
            game.TaskGame.getInstance().pauseGame();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_PAUSE, 13);
        }

        private containue(): void {
            game.TaskGame.getInstance().containueGame();
        }

        private setStateChange(status: StatusVo): void {
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
        }

        private fillPreParaData(time: FillVO): void {
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
        }

        private fillFinishData(finish: FillVO): void {
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
        }

        private fillProData(progress: FillVO): void {
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
        }

        private prePauseGame(index): void {
            switch (index) {
                case 1:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.l_progress.getRainGame(1, 2);
                    } else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.l_progress.getFlowerGame(1, 2);
                    }
                    break;
                case 2:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.c_progress.getRainGame(2, 2);
                    } else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.c_progress.getFlowerGame(2, 2);
                    }
                    break;
                case 3:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.r_progress.getRainGame(3, 2);
                    } else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.r_progress.getFlowerGame(3, 2);
                    }
                    break;
            }
        }

        private proRestart(index): void {
            switch (index) {
                case 1:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.l_progress.getRainGame(1, 1);
                    } else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.l_progress.getFlowerGame(1, 1);
                    }
                    break;
                case 2:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.c_progress.getRainGame(2, 1);
                    } else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.c_progress.getFlowerGame(2, 1);
                    }
                    break;
                case 3:
                    if (GlobalData.gameNeedData.actId == 11) {
                        this.taskTypePanel.r_progress.getRainGame(3, 1);
                    } else if (GlobalData.gameNeedData.actId == 2) {
                        this.taskTypePanel.r_progress.getFlowerGame(3, 1);
                    }
                    break;
            }
        }

        private resetGamePos(): void {
            if (this.taskTypePanel) {
                this.taskTypePanel.l_progress.getGame(4, 1);
                this.taskTypePanel.c_progress.getGame(4, 2);
                this.taskTypePanel.r_progress.getGame(4, 3);
            }
        }

        private changeObj(vo: PreparaVO): void {
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
        }

        private setLogo(): void {
            this.taskTypePanel.group_logo.removeChildren();
            this.logoId = 0;
            if (GlobalData.logoArr.length > 0) {
                this.imgLoad = new egret.ImageLoader();
                this.imgLoad.crossOrigin = "anonymous";
                this.imgLoad.addEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                let bitMapData: string = GlobalData.logoArr[this.logoId];
                this.imgLoad.load(bitMapData);
            }
        }

        private loadLogoComp(evt: egret.Event): void {
            if (evt.currentTarget.data) {
                let img: eui.Image = new eui.Image();
                let ext: egret.Texture = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.y = this.taskTypePanel.group_logo.height + 10;
                img.horizontalCenter = 0;
                let scaleNum: number = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.taskTypePanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    let bitMapData: string = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                } else {
                    this.taskTypePanel.group_btn.top = this.taskTypePanel.group_logo.top + this.taskTypePanel.group_logo.height + 15;
                }
            }
        }

        private loadLogoError(): void {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        }

        private closeImgLoader(): void {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        }

    }
}