/** 视频播放界面 */
module game {

    export class VideoMediator extends BaseMediator {

        public static NAME: string = "VideoMediator";

        /** 1：主页 2：介绍页 */
        private videoPage: number = -1;

        public constructor(viewComponent: any = null) {
            super(VideoMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_VIDEO,
                NoficationConfig.CLOSE_VIDEO
            ];
        }

        private videoPanel: VideoPanel = new VideoPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_VIDEO: {
                    this.videoPage = data;
                    this.showUI(this.videoPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_VIDEO: {
                    this.clickBtnClose();
                    break;
                }
            }
        }


        /** 初始化面板ui */
        public initUI(): void {
            if (this.videoPage == 1) {
                this.videoPanel.group_home.visible = true;
                this.videoPanel.group_intro.visible = false;
                this.videoPanel.label_name.text = GlobalData.gameNeedData.actName;
                this.videoPanel.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
                this.videoPanel.btn_setup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openSetup, this);
            } else {
                this.videoPanel.group_home.visible = false;
                this.videoPanel.group_intro.visible = true;
                this.videoPanel.btn_skip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openReady, this);
            }
        }

        private startGame(): void {
            this.clickBtnClose();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN);
        }

        private openSetup(): void {
            this.clickBtnClose();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_SETUP);
        }

        private openReady(): void {
            this.clickBtnClose();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 1);
        }


        /** 初始化面板数据 */
        public initData(): void {
        }

        private clickBtnClose(): void {
            this.videoPanel.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startGame, this);
            this.videoPanel.btn_setup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openSetup, this);
            this.videoPanel.btn_skip.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openReady, this);
            this.closePanel(0);
        }
    }
}