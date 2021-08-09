/**
 * 设置界面
 * 
 */

var gameData = {
    timeOneData: 0,
    timeTwoData: 0,
    timeThreeData: 0,
    taskOneData: 0,
    taskTwoData: 0,
    taskThreeData: 0
}

module game {

    export class SetUpMediator extends BaseMediator {

        public static NAME: string = "SetUpMediator";
        private checkTime: Array<string> = ["checkTagBg_png", "checkTimeTitle_png", "checkReduce_png", "checkAdd_png", "训练时间", "间歇时间", "组数"];
        private checkTask: Array<string> = ["checkTagBg_png", "checkTaskTitle_png", "checkReduce_png", "checkAdd_png", "每组次数", "间歇时间", "每人组数"];
        private noCheckTime: Array<string> = ["nocheckTagBg_png", "nocheckTimeTitle_png", "nocheckReduce_png", "nocheckAdd_png", "训练时间", "间歇时间", "组数"];
        private noCheckTask: Array<string> = ["nocheckTagBg_png", "nocheckTaskTitle_png", "nocheckReduce_png", "nocheckAdd_png", "每组次数", "间歇时间", "每人组数"];

        public constructor(viewComponent: any = null) {
            super(SetUpMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_SETUP,
                NoficationConfig.CLOSE_SETUP
            ];
        }

        private setupPanel: SetUpPanel = new SetUpPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
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
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.setupPanel.btn_save.addEventListener(egret.TouchEvent.TOUCH_TAP, this.saveData, this);
            this.setupPanel.btn_cancle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
            this.setupPanel.btn_time.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTimeTag, this);
            this.setupPanel.btn_task.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTaskTag, this);
        }

        /**
         * 初始化面板数据
         */

        private curCheckType: boolean = false;
        public initData(): void {
            GlobalData.pageIndex = 2;
            this.curCheckType = GlobalData.checkType;
            this.initGameData();
            this.judgeCheck();
            this.resetData();
        }

        private changeBg(): void {
            let bgId: number = Math.floor(Math.random() * 10 + 1);
            let bgName: string = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        }

        private initGameData(): void {
            gameData.timeOneData = GlobalData.timeOneData;
            gameData.timeTwoData = GlobalData.timeTwoData;
            gameData.timeThreeData = GlobalData.timeThreeData;
            gameData.taskOneData = GlobalData.taskOneData;
            gameData.taskTwoData = GlobalData.taskTwoData;
            gameData.taskThreeData = GlobalData.taskThreeData;
        }

        private judgeCheck(): void {
            if (this.curCheckType) {
                this.setupPanel.btn_time.setBg(this.checkTime);
                this.setupPanel.btn_task.setBg(this.noCheckTask);
                this.setupPanel.btn_time.setTouch(true);
                this.setupPanel.btn_task.setTouch(false);
            } else {
                this.setupPanel.btn_time.setBg(this.noCheckTime);
                this.setupPanel.btn_task.setBg(this.checkTask);
                this.setupPanel.btn_time.setTouch(false);
                this.setupPanel.btn_task.setTouch(true);
            }
        }

        private timeBtnNameArr: Array<string> = ["cut1", "add1", "cut2", "add2", "cut3", "add3"];
        private taskBtnNameArr: Array<string> = ["cuta", "adda", "cutb", "addb", "cutc", "addc"];
        private resetData(): void {
            this.setupPanel.btn_time.setBtnName(this.timeBtnNameArr);
            this.setupPanel.btn_task.setBtnName(this.taskBtnNameArr);
            this.setupPanel.btn_time.setNumData(GlobalData.timeOneData + '"', GlobalData.timeTwoData + '"', GlobalData.timeThreeData + "");
            this.setupPanel.btn_task.setNumData(GlobalData.taskOneData + "", GlobalData.taskTwoData + '"', GlobalData.taskThreeData + "");
        }

        private saveData(): void {
            this.sendNofiCation(1);
        }

        private back(): void {
            this.sendNofiCation(2);
        }

        private checkTimeTag(): void {
            if (this.curCheckType) {
                return;
            }
            this.curCheckType = !this.curCheckType;
            this.judgeCheck();
        }

        private checkTaskTag(): void {
            if (this.curCheckType == false) {
                return;
            }
            this.curCheckType = !this.curCheckType;
            this.judgeCheck();
        }

        private sendNofiCation(type: number): void {
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
        }

        private closeButtonClick(): void {
            this.setupPanel.btn_save.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.saveData, this);
            this.setupPanel.btn_cancle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back, this);
            this.setupPanel.btn_time.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTimeTag, this);
            this.setupPanel.btn_task.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkTaskTag, this);
            this.closePanel(0);
        }


    }
}