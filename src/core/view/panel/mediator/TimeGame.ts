module game {
    export class TimeGame {

        /** 
         * 数据参数
         */
        private timer: egret.Timer = null;
        private timerNum: number = 0;
        private curTouchNum_l: number = 0;
        private curTouchNum_c: number = 0;
        private curTouchNum_r: number = 0;
        private maxLength: number = 0;
        private maxArr: number = 0;

        private static instance: TimeGame;
        public static getInstance(): TimeGame {
            if (!this.instance) {
                this.instance = new TimeGame();
            }
            return this.instance;
        }

        public initData(): void {
            // 时间模式初始化数据
            this.initTimeData();
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
            }
            this.timer.addEventListener(egret.TimerEvent.TIMER, (event: egret.TimerEvent) => {
                if (this.timerNum <= 0) {
                    this.setPlayData();
                    this.initTimeData();
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TIMETYPE);
                    if (GlobalData._curTimerTotalGroup + 1 > this.maxLength) {//结束
                        GlobalData._curTimerTotalGroup = 1;
                        GlobalData._curTimerEveryGroup = 0;
                        GlobalData._curTimerGroup = 1;
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TIMETYPE);
                        NativeApi.openFinishView();
                    } else {
                        GlobalData._curTimerTotalGroup += 1;
                        if (GlobalData._curTimerEveryGroup + 1 >= this.maxArr) {//进入下一组第一人
                            GlobalData._curTimerGroup += 1;
                            GlobalData._curTimerEveryGroup = 0;

                        } else { //进入本组下一任
                            GlobalData._curTimerEveryGroup += 1;
                        }
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TIMETYPE);
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 2);
                    }
                    return;
                }
                this.timerNum--;
                this.updateTime();
            }, this);
            this.timer.start();
            this.updateStep();
            this.updateTouch();
        }

        public initTimeData(): void {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            this.maxArr = Global.contrastArr();
            this.maxLength = GlobalData.timeThreeData * this.maxArr;
            this.timerNum = GlobalData.timeOneData;
            this.curTouchNum_l = 0;
            this.curTouchNum_c = 0;
            this.curTouchNum_r = 0;
        }

        private setPlayData(): void {
            PlayerModel.getInstance().setLeftPlayer(GlobalData.curLeftPlayerVo, this.curTouchNum_l, GlobalData.timeOneData, 1);
            PlayerModel.getInstance().setCenterPlayer(GlobalData.curCenterPlayerVo, this.curTouchNum_c, GlobalData.timeOneData, 1);
            PlayerModel.getInstance().setRightPlayer(GlobalData.curRightPlayerVo, this.curTouchNum_r, GlobalData.timeOneData, 1);
        }

        private updateTime(): void {
            let vo: PreparaVO = DisplayObjectPool.getInstance().pop(PreparaVO);
            vo.type = 1;
            vo.timeNum = this.timerNum;
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TIMENUM_TIME, vo);
        }

        private updateStep(): void {
            let vo: PreparaVO = DisplayObjectPool.getInstance().pop(PreparaVO);
            vo.type = GlobalData._curTimerTotalGroup;
            vo.timeNum = this.maxLength;
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_STEPNUM_TIME, vo);
        }

        private updateTouch(): void {
            let arr: Array<number> = [this.curTouchNum_l, this.curTouchNum_c, this.curTouchNum_r];
            let vo: PreparaVO = DisplayObjectPool.getInstance().pop(PreparaVO);
            for (let i: number = 1; i < 4; i++) {
                vo.type = i;
                vo.timeNum = arr[i - 1];
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCHNUM_TIME, vo);
            }
        }

        public addTouch(index: number): void {
            if (index == 1) {
                this.curTouchNum_l += 1;
            } else if (index == 2) {
                this.curTouchNum_c += 1;
            } else {
                this.curTouchNum_r += 1;
            }
            this.updateTouch();
        }

        public containue(): void {
            if (this.timer) {
                this.timer.start();
            }
        }

        public pauseGame(): boolean {
            if (this.timerNum > 0) {
                if (this.timer) {
                    this.timer.stop();
                }
                return true;
            } else {
                return false;
            }
        }

        public resetGame(): void {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            GlobalData.initData();
        }

    }
}