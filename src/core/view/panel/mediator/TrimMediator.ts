/**
 * 调整界面
 * 
 */

module game {

    export class TrimMediator extends BaseMediator {

        public static NAME: string = "TrimMediator";

        private imgLoad: egret.ImageLoader;
        private logoId: number = 0;

        public constructor(viewComponent: any = null) {
            super(TrimMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_TRIM,
                NoficationConfig.CLOSE_TRIM,
                EventConfig.Event_GAME_POSITION_UP,
                EventConfig.Event_GAME_POSITION_DOWN,
                EventConfig.Event_GAME_SCALE_UP,
                EventConfig.Event_GAME_SCALE_DOWN,
                EventConfig.Event_GAME_SAVESETUP
            ];
        }

        private trimPanel: TrimPanel = new TrimPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TRIM: {
                    this.showUI(this.trimPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_TRIM: {
                    this.clickButtom();
                    break;
                }
                case EventConfig.Event_GAME_POSITION_UP: {
                    this.resetPostion(1);
                    break;
                }
                case EventConfig.Event_GAME_POSITION_DOWN: {
                    this.resetPostion(2);
                    break;
                }
                case EventConfig.Event_GAME_SCALE_UP: {
                    this.resetPostion(6);
                    break;
                }
                case EventConfig.Event_GAME_SCALE_DOWN: {
                    this.resetPostion(5);
                    break;
                }
                case EventConfig.Event_GAME_SAVESETUP: {
                    this.resetPostion(3);
                    break;
                }
            }
        }

        /**
         * 初始化面板ui
         */
        public initUI(): void {
            this.setLogo();
            this.trimPanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.trimPanel.img_bg.x = 0;
            let bgId: number = Math.floor(Math.random() * 10 + 1);
            this.trimPanel.img_bg.source = RES.getRes("bg" + bgId + "_png");
            this.resetBgPos();
            this.addGame();
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            GlobalData.pageIndex = 6;
            this.trimPanel.game1.setIconShow(false);
            this.trimPanel.game2.setIconShow(false);
            this.trimPanel.game3.setIconShow(false);
        }

        private clickButtom(): void {
            this.trimPanel.group_logo.removeChildren();
            this.trimPanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            egret.Tween.removeTweens(this.trimPanel.img_bg);
            this.closeImgLoader();
            this.closePanel(0);
        }

        private backView(): void {
            GlobalData.pageIndex = 5;
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        }

        private resetBgPos(): void {
            egret.Tween.removeTweens(this.trimPanel.img_bg);
            egret.Tween.get(this.trimPanel.img_bg).to({ x: -350 }, 8000).wait(350).call(() => {
                egret.Tween.get(this.trimPanel.img_bg).to({ x: 0 }, 8000).wait(350).call(this.resetBgPos, this);
            }, this);
        }

        private addGame(): void {
            for (let i: number = 1; i < 4; i++) {
                if (i == 1) {
                    this.trimPanel.game1.setGame(i);
                } else if (i == 2) {
                    this.trimPanel.game2.setGame(i);
                } else if (i == 3) {
                    this.trimPanel.game3.setGame(i);
                }
            }
        }

        private resetPostion(type: number): void {
            this.trimPanel.game1.getGame(type, 1);
            this.trimPanel.game2.getGame(type, 2);
            this.trimPanel.game3.getGame(type, 3);
        }

        private setLogo(): void {
            this.trimPanel.group_logo.removeChildren();
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
                img.y = this.trimPanel.group_logo.height + 10;
                img.horizontalCenter = 0;
                let scaleNum: number = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.trimPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    let bitMapData: string = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                } else {
                    this.trimPanel.group_btn.top = this.trimPanel.group_logo.top + this.trimPanel.group_logo.height + 15;
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