/**
  * 时间模式界面
  */
module game {

    export class TimeTypeMediator extends BaseMediator {
        public static NAME: string = "TimeTypeMediator";

        private timer: egret.Timer = null;
        private timerNum: number = 0;

        private curTouchNum_l: number = 0;
        private curTouchNum_c: number = 0;
        private curTouchNum_r: number = 0;

        private imgLoad: egret.ImageLoader;
        private logoId: number = 0;

        public constructor(viewComponent: any = null) {
            super(TimeTypeMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_TIMETYPE,
                NoficationConfig.CLOSE_TIMETYPE,

                EventConfig.Event_UPDATE_TIMENUM_TIME,
                EventConfig.Event_UPDATE_TOUCHNUM_TIME,
                EventConfig.Event_UPDATE_STEPNUM_TIME,

                EventConfig.Event_GAME_TIME_RESET,
                EventConfig.Event_TIMEGAME_CONTAINUE,
                EventConfig.Event_GAME_SAVESETUP_TIME,
                EventConfig.Event_UPDATE_TOUCH_TIME_CHANGE,
            ];
        }
        private timeTypePanel: TimeTypePanel = new TimeTypePanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_TIMETYPE: {
                    //显示角色面板
                    this.changeBg();
                    this.showUI(this.timeTypePanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_TIMETYPE: {
                    this.closeButtonClick();
                    break;
                }
                case EventConfig.Event_UPDATE_TIMENUM_TIME: {  //更新时间显示
                    this.upDateTime(data);
                    break;
                }
                case EventConfig.Event_UPDATE_TOUCHNUM_TIME: { //更新点击次数
                    this.upDateTouch(data);
                    break;
                }
                case EventConfig.Event_UPDATE_STEPNUM_TIME: { //更新步数显示
                    this.updateStep(data);
                    break;
                }
                case EventConfig.Event_GAME_TIME_RESET: { //重新开始
                    this.resetGame();
                    break;
                }
                case EventConfig.Event_TIMEGAME_CONTAINUE: { //继续游戏
                    this.containue();
                    break;
                }
                case EventConfig.Event_GAME_SAVESETUP_TIME: { //保存位置设置
                    this.resetGamePos();
                    break;
                }
                case EventConfig.Event_UPDATE_TOUCH_TIME_CHANGE: { //更新下一目标显示对象
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
            this.timeTypePanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.timeTypePanel.p_left.setPlayerData(GlobalData.curLeftPlayerVo);
            this.timeTypePanel.p_center.setPlayerData(GlobalData.curCenterPlayerVo);
            this.timeTypePanel.p_right.setPlayerData(GlobalData.curRightPlayerVo);

            this.timeTypePanel.p_left.setGame(1);
            this.timeTypePanel.p_center.setGame(2);
            this.timeTypePanel.p_right.setGame(3);
        }

        private changeBg(): void {
            let bgId: number = Math.floor(Math.random() * 21 + 1);
            let bgName: string = "s_bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            GlobalData.pageIndex = 11;
            game.TimeGame.getInstance().initData();
        }

        private upDateTime(vo: PreparaVO): void {
            if (this.timeTypePanel) {
                this.timeTypePanel.p_left.gameIcon.setTimer(Global.formatTime(vo.timeNum, 1));
                this.timeTypePanel.p_center.gameIcon.setTimer(Global.formatTime(vo.timeNum, 1));
                this.timeTypePanel.p_right.gameIcon.setTimer(Global.formatTime(vo.timeNum, 1));
            }
        }

        private updateStep(vo: PreparaVO): void {
            if (this.timeTypePanel) {
                this.timeTypePanel.p_left.gameIcon.setStep(vo.type + "/" + vo.timeNum);
                this.timeTypePanel.p_center.gameIcon.setStep(vo.type + "/" + vo.timeNum);
                this.timeTypePanel.p_right.gameIcon.setStep(vo.type + "/" + vo.timeNum);
            }
        }

        private upDateTouch(vo: PreparaVO): void {
            if (this.timeTypePanel) {
                switch (vo.type) {
                    case 1:
                        this.timeTypePanel.p_left.gameIcon.setTimeTouchNum(vo.timeNum);
                        break;
                    case 2:
                        this.timeTypePanel.p_center.gameIcon.setTimeTouchNum(vo.timeNum);
                        break;
                    case 3:
                        this.timeTypePanel.p_right.gameIcon.setTimeTouchNum(vo.timeNum);
                        break;
                }
            }
        }

        private containue(): void {
            if (GlobalData.gameNeedData.actId == 11) {
                this.timeTypePanel.p_left.getRainGame(1, 1);
                this.timeTypePanel.p_center.getRainGame(2, 1);
                this.timeTypePanel.p_right.getRainGame(3, 1);
            } else if (GlobalData.gameNeedData.actId == 2) {
                this.timeTypePanel.p_left.getFlowerGame(1, 1);
                this.timeTypePanel.p_center.getFlowerGame(2, 1);
                this.timeTypePanel.p_right.getFlowerGame(3, 1);
            }
            game.TimeGame.getInstance().containue();
        }

        private resetGame(): void {
            game.TimeGame.getInstance().resetGame();
            this.closeButtonClick();
        }

        private pauseGame(): void {
            if (game.TimeGame.getInstance().pauseGame()) {
                if (GlobalData.gameNeedData.actId == 11) {
                    this.timeTypePanel.p_left.getRainGame(1, 2);
                    this.timeTypePanel.p_center.getRainGame(2, 2);
                    this.timeTypePanel.p_right.getRainGame(3, 2);
                } else if (GlobalData.gameNeedData.actId == 2) {
                    this.timeTypePanel.p_left.getFlowerGame(1, 2);
                    this.timeTypePanel.p_center.getFlowerGame(2, 2);
                    this.timeTypePanel.p_right.getFlowerGame(3, 2);
                }
                game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_PAUSE, 11);
            }
        }

        private closeButtonClick(): void {
            this.timeTypePanel.group_logo.removeChildren();
            game.TimeGame.getInstance().initTimeData();
            this.timeTypePanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.pauseGame, this);
            this.closeImgLoader();
            this.closePanel(0);
        }

        private resetGamePos(): void {
            if (this.timeTypePanel) {
                this.timeTypePanel.p_left.getGame(4, 1);
                this.timeTypePanel.p_center.getGame(4, 2);
                this.timeTypePanel.p_right.getGame(4, 3);
            } else {
                return;
            }
        }

        private changeObj(vo: PreparaVO): void {
            if (vo.type == 12) {
                switch (vo.timeNum) {
                    case 1:
                        this.timeTypePanel.p_left.getStone(vo);
                        break;
                    case 2:
                        this.timeTypePanel.p_center.getStone(vo);
                        break;
                    case 3:
                        this.timeTypePanel.p_right.getStone(vo);
                        break;
                }
            }
        }

        private setLogo(): void {
            this.timeTypePanel.group_logo.removeChildren();
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
                img.y = this.timeTypePanel.group_logo.height + 10;
                img.horizontalCenter = 0;
                let scaleNum: number = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.timeTypePanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    let bitMapData: string = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                } else {
                    this.timeTypePanel.group_btn.top = this.timeTypePanel.group_logo.top + this.timeTypePanel.group_logo.height + 15;
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