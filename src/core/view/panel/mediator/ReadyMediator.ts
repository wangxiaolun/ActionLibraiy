/**
 * 准备阶段界面
 * 
 */
module game {

    export class ReadyMediator extends BaseMediator {

        public static NAME: string = "ReadyMediator";
        private timer: egret.Timer = null;
        private countTimeNum: number = 0;
        private openType: number = 0;

        private imgLoad: egret.ImageLoader;
        private logoId: number = 0;

        public constructor(viewComponent: any = null) {
            super(ReadyMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_READY,
                NoficationConfig.CLOSE_READY
            ];
        }

        private readyPanel: ReadyPanel = new ReadyPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
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
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.setLogo();
            this.changeBg();
            let maxLength: number = Global.contrastArr();
            if (GlobalData.checkType) {
                if (this.openType == 1) {
                    this.readyPanel.label_bottomTip.text = "准备开始";
                    this.readyPanel.label_tip.text = "训练即将开始，请做好准备。";

                } else {
                    this.readyPanel.label_bottomTip.text = "SET" + GlobalData._curTimerTotalGroup + "/" + (GlobalData.timeThreeData * maxLength);
                    this.readyPanel.label_tip.text = "请下一组做好准备";
                }
            } else {
                this.readyPanel.label_bottomTip.text = "准备开始";
                this.readyPanel.label_tip.text = "训练即将开始，请做好准备。";
            }
            this.readyPanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.readyPanel.btn_skip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.skip, this);
        }

        private changeBg(): void {
            let bgId: number = Math.floor(Math.random() * 10 + 1);
            let bgName: string = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            GlobalData.pageIndex = 8;
            this.countTimeNum = (GlobalData.checkType) ? GlobalData.timeTwoData : GlobalData.taskTwoData;
            this.initView();

        }

        private closeButtonClick(): void {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            this.readyPanel.group_logo.removeChildren();
            this.readyPanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.readyPanel.btn_skip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.skip, this);
            this.closeImgLoader();
            this.closePanel(0);
        }

        private initView(): void {
            let leftArr: Array<PlayerVO> = PlayerModel.getInstance().getLeftPlayer();
            let centerArr: Array<PlayerVO> = PlayerModel.getInstance().getCenterPlayer();
            let rightArr: Array<PlayerVO> = PlayerModel.getInstance().getRightPlayer();
            if (GlobalData.checkType) {
                if (leftArr[GlobalData._curTimerEveryGroup]) {
                    this.readyPanel.icon_left.visible = true;
                    this.readyPanel.img_leftBye.visible = false;
                    GlobalData.curLeftPlayerVo = leftArr[GlobalData._curTimerEveryGroup];
                    this.readyPanel.icon_left.setIconData(GlobalData.curLeftPlayerVo);
                } else {
                    this.readyPanel.icon_left.visible = false;
                    this.readyPanel.img_leftBye.visible = true;
                    GlobalData.curLeftPlayerVo = null;
                }
                if (centerArr[GlobalData._curTimerEveryGroup]) {
                    this.readyPanel.icon_center.visible = true;
                    this.readyPanel.img_centerBye.visible = false;
                    GlobalData.curCenterPlayerVo = centerArr[GlobalData._curTimerEveryGroup];
                    this.readyPanel.icon_center.setIconData(GlobalData.curCenterPlayerVo);
                } else {
                    this.readyPanel.icon_center.visible = false;
                    this.readyPanel.img_centerBye.visible = true;
                    GlobalData.curCenterPlayerVo = null;
                }
                if (rightArr[GlobalData._curTimerEveryGroup]) {
                    this.readyPanel.icon_right.visible = true;
                    this.readyPanel.img_rightBye.visible = false;
                    GlobalData.curRightPlayerVo = rightArr[GlobalData._curTimerEveryGroup];
                    this.readyPanel.icon_right.setIconData(GlobalData.curRightPlayerVo);
                } else {
                    this.readyPanel.icon_right.visible = false;
                    this.readyPanel.img_rightBye.visible = true;
                    GlobalData.curRightPlayerVo = null;
                }
            } else {
                if (leftArr[GlobalData.l_curTaskEveryGroup]) {
                    this.readyPanel.icon_left.visible = true;
                    this.readyPanel.img_leftBye.visible = false;
                    GlobalData.curLeftPlayerVo = leftArr[GlobalData.l_curTaskEveryGroup];
                    this.readyPanel.icon_left.setIconData(GlobalData.curLeftPlayerVo);
                } else {
                    this.readyPanel.icon_left.visible = false;
                    this.readyPanel.img_leftBye.visible = true;
                    GlobalData.curLeftPlayerVo = null;
                }
                if (centerArr[GlobalData.c_curTaskEveryGroup]) {
                    this.readyPanel.icon_center.visible = true;
                    this.readyPanel.img_centerBye.visible = false;
                    GlobalData.curCenterPlayerVo = centerArr[GlobalData.c_curTaskEveryGroup];
                    this.readyPanel.icon_center.setIconData(GlobalData.curCenterPlayerVo);
                } else {
                    this.readyPanel.icon_center.visible = false;
                    this.readyPanel.img_centerBye.visible = true;
                    GlobalData.curCenterPlayerVo = null;
                }
                if (rightArr[GlobalData.r_curTaskEveryGroup]) {
                    this.readyPanel.icon_right.visible = true;
                    this.readyPanel.img_rightBye.visible = false;
                    GlobalData.curRightPlayerVo = rightArr[GlobalData.r_curTaskEveryGroup];
                    this.readyPanel.icon_right.setIconData(GlobalData.curRightPlayerVo);
                } else {
                    this.readyPanel.icon_right.visible = false;
                    this.readyPanel.img_rightBye.visible = true;
                    GlobalData.curRightPlayerVo = null;
                }
            }
            this.initTime();
        }

        private initTime(): void {
            this.readyPanel.label_time.text = this.countTimeNum + "";
            if (this.countTimeNum < 11 && this.countTimeNum > 0) {
                game.SoundUtils.getInstance().playTimeSound(this.countTimeNum);
            }
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
            }
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.changeTimer, this);
            this.timer.start();
        }

        private changeTimer(evt:egret.TimerEvent):void{
            this.countTimeNum--;
                if (this.countTimeNum < 0) {
                    if(this.timer){
                        this.timer.stop();
                    }
                    this.timer = null;
                    // 跳转下一界面
                    if (GlobalData.checkType) {
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TIMETYPE);
                    } else {
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TASKTYPE);
                    }
                    return;
                }
                this.readyPanel.label_time.text = this.countTimeNum + "";
                if (this.countTimeNum < 11 && this.countTimeNum > 0) {
                    game.SoundUtils.getInstance().playTimeSound(this.countTimeNum);
                }
        }

        private backView(): void {
            if (this.timer.running && this.timer.currentCount > 1) {
                this.sendNofiCation(1);
            }
        }

        private skip(): void {
            if (this.timer.running && this.timer.currentCount > 1) {
                this.sendNofiCation(2);
            }
        }

        private sendNofiCation(data: number): void {
            switch (data) {
                case 1:
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                    NativeApi.sendToNativeFun(4);
                    break;
                case 2:
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_READY);
                    if (GlobalData.checkType) {
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TIMETYPE);
                    } else {
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TASKTYPE);
                    }
                    break;
            }
        }

        private setLogo(): void {
            this.readyPanel.group_logo.removeChildren();
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
                img.x = this.readyPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                let scaleNum: number = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.readyPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    let bitMapData: string = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                } else {
                    this.readyPanel.group_btn.top = this.readyPanel.group_logo.top + this.readyPanel.group_logo.height + 20;
                    this.closeImgLoader();
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