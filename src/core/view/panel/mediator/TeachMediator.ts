/**
 * 教程视频界面
 * 
 */

module game {

    export class TeachMediator extends BaseMediator {

        public static NAME: string = "TeachMediator";
        private videoArr: Array<VideoVO> = [];
        private arrC: eui.ArrayCollection;
        private pagesArr: Array<any>;
        private pageNums: number = 0;
        private curPage: number = 0;


        public constructor(viewComponent: any = null) {
            super(TeachMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_TEACH,
                NoficationConfig.CLOSE_TEACH
            ];
        }

        private teachPanel: TeachPanel = new TeachPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TEACH: {
                    this.showUI(this.teachPanel, false, 0, 0, 6);
                    break;
                }
                case NoficationConfig.CLOSE_TEACH: {
                    this.closePanel(1);
                    break;
                }
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.teachPanel.btn_back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.judgePage, this);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
        }


        private clickButtonCLose(): void {
            this.teachPanel.btn_back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.judgePage, this);
            this.closePanel(1);
        }

        private judgePage(): void {
            this.clickButtonCLose();
            egret.setTimeout(() => {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 1);
            }, this, 200);
        }
    }
}