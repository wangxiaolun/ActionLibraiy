/**
  * 时间模式完成界面
  */
module game {

    export class TimeFinishMediator extends BaseMediator {
        public static NAME: string = "TimeFinishMediator";

        private imgLoad: egret.ImageLoader;
        private logoId: number = 0;

        public constructor(viewComponent: any = null) {
            super(TimeFinishMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_TIME_FINISH,
                NoficationConfig.CLOSE_TIME_FINISH
            ];
        }
        private timeFinishPanel: TimeFinishPanel = new TimeFinishPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
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
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.setLogo();
            this.timeFinishPanel.btn_result.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
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
        }

        private changeBg(): void {
            let bgId: number = Math.floor(Math.random() * 10 + 1);
            let bgName: string = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        }

        private closeButtonClick(): void {
            this.timeFinishPanel.group_logo.removeChildren();
            this.timeFinishPanel.btn_result.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.checkResult, this);
            this.closeImgLoader();
            this.closePanel(0);
        }

        private checkResult(): void {
            this.closeButtonClick();
            NativeApi.openHtmlView("HomeView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName);
        }

        private setLogo(): void {
            this.timeFinishPanel.group_logo.removeChildren();
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
                img.x = this.timeFinishPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                let scaleNum: number = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.timeFinishPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    let bitMapData: string = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                } else {
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