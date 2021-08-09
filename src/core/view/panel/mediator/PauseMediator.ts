/**
 * 暂停界面
 * 
 */
module game {

    export class PauseMediator extends BaseMediator {

        public static NAME: string = "PauseMediator";

        private typeNum: number = 0;

        public constructor(viewComponent: any = null) {
            super(PauseMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_PAUSE,
                NoficationConfig.CLOSE_PAUSE
            ];
        }
        private pausePanel: PausePanel = new PausePanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_PAUSE: {
                    this.setName(data);
                    this.showUI(this.pausePanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_PAUSE: {
                    this.buttonClickClose();
                    break;
                }
            }
        }

        /**
        * 初始化面板ui
        */
        public initUI(): void {
            this.pausePanel.btn_reset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this);
            this.pausePanel.btn_containue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.containue, this);
            // this.pausePanel.btn_upset.addEventListener(egret.TouchEvent.TOUCH_TAP, this.upset, this);
            this.pausePanel.btn_exit.addEventListener(egret.TouchEvent.TOUCH_TAP, this.exitGame, this);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            GlobalData.pageIndex = 5;
        }

        private buttonClickClose(): void {
            this.pausePanel.btn_reset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.reset, this);
            this.pausePanel.btn_containue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.containue, this);
            // this.pausePanel.btn_upset.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.upset, this);
            this.pausePanel.btn_exit.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.exitGame, this);
            this.closePanel(0);
        }

        /** 重来 */
        private reset(): void {
            this.buttonClickClose();
            PlayerModel.getInstance().resetPlayerData();
            if (this.typeNum == 11) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TIME_RESET);
            } else if (this.typeNum == 13) {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TASKTYPE);
            }
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN, 2);
        }

        /** 继续 */
        private containue(): void {
            this.buttonClickClose();
            if (this.typeNum == 11) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_TIMEGAME_CONTAINUE);
            } else if (this.typeNum == 13) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_TASKGAME_CONTAINUE);
            }
        }

        /** 设置 */
        private upset(): void {
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_TRIM);
        }

        /** 退出 */
        private exitGame(): void {
            this.buttonClickClose();
            PlayerModel.getInstance().resetPlayerData();
            if (this.typeNum == 11) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TIME_RESET);
            } else if (this.typeNum == 13) {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TASKTYPE);
            }
            NativeApi.sendToNativeFun(4);
        }

        private setName(typeNum: number): void {
            this.typeNum = typeNum;
        }

    }
}