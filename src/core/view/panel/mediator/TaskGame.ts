module game {
    export class TaskGame {

        /** 
         * 准备倒计时计时器
         */
        private leftTimer: egret.Timer = null;
        private centerTimer: egret.Timer = null;
        private rightTimer: egret.Timer = null;

        /** 三者状态 1:准备阶段 2：进行中 3：完成 */
        private l_state: number = 2;
        private c_state: number = 2;
        private r_state: number = 2;

        /** 一共需要做多少轮 */
        private total_group_l: number = 1;
        private total_group_c: number = 1;
        private total_group_r: number = 1;

        /** 当前做的个数 */
        private l_curTouchNum: number = 0;
        private c_curTouchNum: number = 0;
        private r_curTouchNum: number = 0;

        /** 当前本轮所用时间 */
        private l_curTime: number = 0;
        private c_curTime: number = 0;
        private r_curTime: number = 0;

        /** 休息倒计时 */
        private cutLeftNum: number = 0;
        private cutCenterNum: number = 0;
        private cutRightNum: number = 0;

        private static instance: TaskGame;

        public static getInstance(): TaskGame {
            if (!this.instance) {
                this.instance = new TaskGame();
            }
            return this.instance;
        }

        public initData(): void {
            this.setTaskData(4);
            this.setStateChange("L", this.l_state);
            this.setStateChange("C", this.c_state);
            this.setStateChange("R", this.r_state);
            this.fillLeftData();
            this.fillCenterData();
            this.fillRightData();
        }


        /** 
        * 初始化任务模式所需数据
        */
        private setTaskData(typeN: number): void {
            let leftArr: Array<PlayerVO> = PlayerModel.getInstance().getLeftPlayer();
            let centerArr: Array<PlayerVO> = PlayerModel.getInstance().getCenterPlayer();
            let rightArr: Array<PlayerVO> = PlayerModel.getInstance().getRightPlayer();

            if (leftArr[GlobalData.l_curTaskEveryGroup]) {
                GlobalData.curLeftPlayerVo = leftArr[GlobalData.l_curTaskEveryGroup];
            } else {
                GlobalData.curLeftPlayerVo = null;
            }

            if (centerArr[GlobalData.c_curTaskEveryGroup]) {
                GlobalData.curCenterPlayerVo = centerArr[GlobalData.c_curTaskEveryGroup];
            } else {
                GlobalData.curCenterPlayerVo = null;
            }
            if (rightArr[GlobalData.r_curTaskEveryGroup]) {
                GlobalData.curRightPlayerVo = rightArr[GlobalData.r_curTaskEveryGroup];
            } else {
                GlobalData.curRightPlayerVo = null;
            }

            this.total_group_l = GlobalData.taskThreeData * leftArr.length;
            this.total_group_c = GlobalData.taskThreeData * centerArr.length;
            this.total_group_r = GlobalData.taskThreeData * rightArr.length;

            if (typeN == 1) {
                this.l_curTime = 0;
                this.l_curTouchNum = 0;
                this.cutLeftNum = 0;
                if (this.leftTimer) {
                    this.leftTimer.stop();
                    this.leftTimer = null;
                }
            } else if (typeN == 2) {
                this.c_curTime = 0;
                this.c_curTouchNum = 0;
                this.cutCenterNum = 0;
                if (this.centerTimer) {
                    this.centerTimer.stop();
                    this.centerTimer = null;
                }
            } else if (typeN == 3) {
                this.r_curTime = 0;
                this.r_curTouchNum = 0;
                this.cutRightNum = 0;
                if (this.rightTimer) {
                    this.rightTimer.stop();
                    this.rightTimer = null;
                }
            } else {
                this.l_curTime = 0;
                this.c_curTime = 0;
                this.r_curTime = 0;
                this.l_curTouchNum = 0;
                this.c_curTouchNum = 0;
                this.r_curTouchNum = 0;
                this.cutLeftNum = 0;
                this.cutCenterNum = 0;
                this.cutRightNum = 0;
                if (this.leftTimer) {
                    this.leftTimer.stop();
                    this.leftTimer = null;
                }
                if (this.centerTimer) {
                    this.centerTimer.stop();
                    this.centerTimer = null;
                }
                if (this.rightTimer) {
                    this.rightTimer.stop();
                    this.rightTimer = null;
                }

                if (this.total_group_l <= 0) {
                    this.l_state = 3;
                } else {
                    this.l_state = 2;
                }
                if (this.total_group_c <= 0) {
                    this.c_state = 3;
                } else {
                    this.c_state = 2;
                }
                if (this.total_group_r <= 0) {
                    this.r_state = 3;
                } else {
                    this.r_state = 2;
                }
            }
        }

        /** 
         * 切换状态
         * @当前切换对象
         * @当前切换状态 1:准备阶段 2：进行中 3：完成
         */
        private setStateChange(curTag: string, state: number): void {
            switch (curTag) {
                case "L":
                    this.l_state = state;
                    this.judgeFinsh(curTag, state);
                    break;
                case "C":
                    this.c_state = state;
                    this.judgeFinsh(curTag, state);
                    break;
                case "R":
                    this.r_state = state
                    this.judgeFinsh(curTag, state);
                    break;
            }
        }

        private judgeFinsh(target: string, state: number): void {
            var vo: StatusVo = new StatusVo();
            vo.target = target;
            vo.state = state;
            if (this.l_state == 3 && this.c_state == 3 && this.r_state == 3) {
                vo.isFinish = true;
            } else {
                vo.isFinish = false;
            }
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_CHANGESTATUS, vo);
        }


        /** 左侧填充数据 */
        private fillLeftData(): void {
            var left_TimeVo: FillVO = new FillVO();
            left_TimeVo.type = 1;
            left_TimeVo.curStep = GlobalData.l_curTaskTotalGroup;
            left_TimeVo.totalStep = this.total_group_l;
            switch (this.l_state) {
                case 1:
                    this.cutLeftNum = GlobalData.taskTwoData;
                    left_TimeVo.timeNum = this.cutLeftNum;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_PREPARA, left_TimeVo);
                    if (!this.leftTimer) {
                        this.leftTimer = new egret.Timer(1000);
                    }
                    this.leftTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                        this.cutLeftNum -= 1;
                        if (this.cutLeftNum <= 0) {
                            this.leftTimer.stop();
                            this.leftTimer = null;
                            this.cutLeftNum = 0;
                            // 进入下一阶段
                            this.setStateChange("L", 2);
                            this.fillLeftData();
                        }
                        let preVo: PreparaVO = DisplayObjectPool.getInstance().pop(PreparaVO);
                        preVo.type = 1;
                        preVo.timeNum = this.cutLeftNum;
                        game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTIME_PREPARA, preVo);
                    }, this);
                    this.leftTimer.start();
                    break;
                case 2:
                    this.l_curTime = 0;
                    left_TimeVo.pro_curNum = this.l_curTouchNum;
                    left_TimeVo.pro_totalNum = GlobalData.taskOneData;
                    left_TimeVo.pro_timeNum = this.l_curTime;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_PROGRESS, left_TimeVo);
                    if (!this.leftTimer) {
                        this.leftTimer = new egret.Timer(1000);
                    }
                    this.leftTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                        this.l_curTime += 1;
                        left_TimeVo.pro_timeNum = this.l_curTime;
                        game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTIME_PROSS, left_TimeVo);
                    }, this);
                    this.leftTimer.start();
                    break;
                case 3:
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_FINISH, left_TimeVo);
                    break;
            }
        }

        /** 中间填充数据 */
        private fillCenterData(): void {
            var center_TimeVo: FillVO = new FillVO();
            center_TimeVo.type = 2;
            center_TimeVo.curStep = GlobalData.c_curTaskTotalGroup;
            center_TimeVo.totalStep = this.total_group_c;
            switch (this.c_state) {
                case 1:
                    this.cutCenterNum = GlobalData.taskTwoData;
                    center_TimeVo.timeNum = this.cutCenterNum;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_PREPARA, center_TimeVo);
                    if (!this.centerTimer) {
                        this.centerTimer = new egret.Timer(1000);
                    }
                    this.centerTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                        this.cutCenterNum -= 1;
                        if (this.cutCenterNum <= 0) {
                            this.centerTimer.stop();
                            this.centerTimer = null;
                            this.cutCenterNum = 0;
                            // 进入下一阶段
                            this.setStateChange("C", 2);
                            this.fillCenterData();
                        }
                        let preVo: PreparaVO = DisplayObjectPool.getInstance().pop(PreparaVO);
                        preVo.type = 2;
                        preVo.timeNum = this.cutCenterNum;
                        game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTIME_PREPARA, preVo);
                    }, this);
                    this.centerTimer.start();
                    break;
                case 2:
                    this.c_curTime = 0;
                    center_TimeVo.pro_curNum = this.c_curTouchNum;
                    center_TimeVo.pro_totalNum = GlobalData.taskOneData;
                    center_TimeVo.pro_timeNum = this.c_curTime;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_PROGRESS, center_TimeVo);
                    if (!this.centerTimer) {
                        this.centerTimer = new egret.Timer(1000);
                    }
                    this.centerTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                        this.c_curTime += 1;
                        center_TimeVo.pro_timeNum = this.c_curTime;
                        game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTIME_PROSS, center_TimeVo);
                    }, this);
                    this.centerTimer.start();
                    break;
                case 3:
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_FINISH, center_TimeVo);
                    break;
            }
        }

        /** 右侧侧填充数据 */
        private fillRightData(): void {
            var right_TimeVo: FillVO = new FillVO();
            right_TimeVo.type = 3;
            right_TimeVo.curStep = GlobalData.r_curTaskTotalGroup;
            right_TimeVo.totalStep = this.total_group_r;
            switch (this.r_state) {
                case 1:
                    this.cutRightNum = GlobalData.taskTwoData;
                    right_TimeVo.timeNum = this.cutRightNum;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_PREPARA, right_TimeVo);
                    if (!this.rightTimer) {
                        this.rightTimer = new egret.Timer(1000);
                    }
                    this.rightTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                        this.cutRightNum -= 1;
                        if (this.cutRightNum <= 0) {
                            this.rightTimer.stop();
                            this.rightTimer = null;
                            this.cutRightNum = 0;
                            // 进入下一阶段
                            this.setStateChange("R", 2);
                            this.fillRightData();
                        }
                        let preVo: PreparaVO = DisplayObjectPool.getInstance().pop(PreparaVO);
                        preVo.type = 3;
                        preVo.timeNum = this.cutRightNum;
                        game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTIME_PREPARA, preVo);
                    }, this);
                    this.rightTimer.start();
                    break;
                case 2:
                    this.r_curTime = 0;
                    right_TimeVo.pro_curNum = this.r_curTouchNum;
                    right_TimeVo.pro_totalNum = GlobalData.taskOneData;
                    right_TimeVo.pro_timeNum = this.r_curTime;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_PROGRESS, right_TimeVo);
                    if (!this.rightTimer) {
                        this.rightTimer = new egret.Timer(1000);
                    }
                    this.rightTimer.addEventListener(egret.TimerEvent.TIMER, () => {
                        this.r_curTime += 1;
                        right_TimeVo.pro_timeNum = this.r_curTime;
                        game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTIME_PROSS, right_TimeVo);
                    }, this);
                    this.rightTimer.start();
                    break;
                case 3:
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_FILLDATA_FINISH, right_TimeVo);
                    break;
            }
        }

        /** 更新左侧信息 */
        public updateLeft(): void {
            if (this.l_curTouchNum >= GlobalData.taskOneData) {
                let curArr: number = PlayerModel.getInstance().getLeftPlayer().length;
                if (this.leftTimer) {
                    this.leftTimer.stop();
                    this.leftTimer = null;
                }
                if (GlobalData.curLeftPlayerVo) {
                    GlobalData.curLeftPlayerVo.playNums += this.l_curTouchNum;
                    GlobalData.curLeftPlayerVo.playTimes += this.l_curTime;
                    PlayerModel.getInstance().setLeftPlayer(GlobalData.curLeftPlayerVo,this.l_curTouchNum,this.l_curTime,2);
                }
                if (GlobalData.l_curTaskTotalGroup + 1 > this.total_group_l) { //完成
                    this.setTaskData(1);
                    this.setStateChange("L", 3);
                    this.fillLeftData();
                    GlobalData._curTaskLeftGroup = 1;
                    GlobalData.l_curTaskEveryGroup = 0;
                    GlobalData.l_curTaskTotalGroup = 1;
                } else {
                    GlobalData.l_curTaskTotalGroup += 1;
                    if (GlobalData.l_curTaskEveryGroup + 1 >= curArr) { //进入下一组第一人
                        GlobalData.l_curTaskEveryGroup = 0;
                        GlobalData._curTaskLeftGroup += 1;
                    } else { //进入本组下一人
                        GlobalData.l_curTaskEveryGroup += 1;
                    }
                    this.setTaskData(1);
                    this.setStateChange("L", 1);
                    this.fillLeftData();
                }
                return;
            }
        }

        /** 更新中间信息 */
        public updateCenter(): void {
            if (this.c_curTouchNum >= GlobalData.taskOneData) {
                let curArr: number = PlayerModel.getInstance().getCenterPlayer().length;
                if (this.centerTimer) {
                    this.centerTimer.stop();
                    this.centerTimer = null;
                }
                if (GlobalData.curCenterPlayerVo) {
                    GlobalData.curCenterPlayerVo.playNums += this.c_curTouchNum;
                    GlobalData.curCenterPlayerVo.playTimes += this.c_curTime;
                    PlayerModel.getInstance().setCenterPlayer(GlobalData.curCenterPlayerVo,this.c_curTouchNum,this.c_curTime,2);
                }
                if (GlobalData.c_curTaskTotalGroup + 1 > this.total_group_c) { //完成
                    this.setTaskData(2);
                    this.setStateChange("C", 3);
                    this.fillCenterData();
                    GlobalData.c_curTaskTotalGroup = 1;
                    GlobalData.c_curTaskEveryGroup = 0;
                    GlobalData._curTaskCenterGroup = 1;
                } else {
                    GlobalData.c_curTaskTotalGroup += 1;
                    if (GlobalData.c_curTaskEveryGroup + 1 >= curArr) { //进入下一组第一人
                        GlobalData._curTaskCenterGroup += 1;
                        GlobalData.c_curTaskEveryGroup = 0;

                    } else {
                        GlobalData.c_curTaskEveryGroup += 1;
                    }
                    this.setTaskData(2);
                    this.setStateChange("C", 1);
                    this.fillCenterData();
                }
                return;
            }
        }

        /** 更新右侧信息 */
        public updateRight(): void {
            if (this.r_curTouchNum >= GlobalData.taskOneData) {
                let curArr: number = PlayerModel.getInstance().getRightPlayer().length;
                if (this.rightTimer) {
                    this.rightTimer.stop();
                    this.rightTimer = null;
                }
                if (GlobalData.curRightPlayerVo) {
                    GlobalData.curRightPlayerVo.playNums += this.r_curTouchNum;
                    GlobalData.curRightPlayerVo.playTimes += this.r_curTime;
                    PlayerModel.getInstance().setRightPlayer(GlobalData.curRightPlayerVo,this.r_curTouchNum,this.r_curTime,2);
                }
                if (GlobalData.r_curTaskTotalGroup + 1 > this.total_group_r) { //完成
                    GlobalData.r_curTaskTotalGroup = 1;
                    GlobalData.r_curTaskEveryGroup = 0;
                    GlobalData._curTaskRightGroup = 1;
                    this.setTaskData(3);
                    this.setStateChange("R", 3);
                    this.fillRightData();
                } else {
                    GlobalData.r_curTaskTotalGroup += 1;
                    if (GlobalData.r_curTaskEveryGroup + 1 >= curArr) { //进入下一组第一人
                        GlobalData._curTaskRightGroup += 1;
                        GlobalData.r_curTaskEveryGroup = 0;

                    } else {
                        GlobalData.r_curTaskEveryGroup += 1;
                    }
                    this.setTaskData(3);
                    this.setStateChange("R", 1);
                    this.fillRightData();
                }
                return;
            }
        }

        public skipPrepra(index: number): void {
            switch (index) {
                case 1:
                    if (this.leftTimer) {
                        this.leftTimer.stop();
                        this.leftTimer = null;
                    }
                    this.cutLeftNum = 0;
                    this.setStateChange("L", 2);
                    this.fillLeftData();
                    break;
                case 2:
                    if (this.centerTimer) {
                        this.centerTimer.stop();
                        this.centerTimer = null;
                    }
                    this.cutCenterNum = 0;
                    this.setStateChange("C", 2);
                    this.fillCenterData();
                    break;
                case 3:
                    if (this.rightTimer) {
                        this.rightTimer.stop();
                        this.rightTimer = null;
                    }
                    this.cutRightNum = 0;
                    this.setStateChange("R", 2);
                    this.fillRightData();
                    break;
            }
        }

        public updateTouchShow(touchId: number): void {
            var proVO: ProgressVO = new ProgressVO();
            proVO.type = touchId;
            switch (touchId) {
                case 1:
                    this.l_curTouchNum += 1;
                    proVO.touchNum = this.l_curTouchNum;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTOUCH_PROSS, proVO);
                    break;
                case 2:
                    this.c_curTouchNum += 1;
                    proVO.touchNum = this.c_curTouchNum;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTOUCH_PROSS, proVO);
                    break;
                case 3:
                    this.r_curTouchNum += 1;
                    proVO.touchNum = this.r_curTouchNum;
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_SETTOUCH_PROSS, proVO);
                    break;
            }
        }

        public pauseGame(): void {
            if (this.leftTimer) {
                this.leftTimer.stop();
            }
            if (this.centerTimer) {
                this.centerTimer.stop();
            }
            if (this.rightTimer) {
                this.rightTimer.stop();
            }
            if (GlobalData.gameNeedData.actId == 11) {
                if (this.l_state == 2) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_PASUE, 1);
                }
                if (this.c_state == 2) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_PASUE, 2);
                }
                if (this.r_state == 2) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_PASUE, 3);
                }
            }
        }

        public containueGame(): void {
            if (this.leftTimer) {
                this.leftTimer.start();
            }
            if (this.centerTimer) {
                this.centerTimer.start();
            }
            if (this.rightTimer) {
                this.rightTimer.start();
            }

            if (GlobalData.gameNeedData.actId == 11) {
                if (this.l_state == 2) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_RESTART, 1);
                }
                if (this.c_state == 2) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_RESTART, 2);
                }
                if (this.r_state == 2) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_RESTART, 3);
                }
            }
        }

        public resetGame(): void {
            if (this.leftTimer) {
                this.leftTimer.stop();
                this.leftTimer = null;
            }
            if (this.centerTimer) {
                this.centerTimer.stop();
                this.centerTimer = null;
            }
            if (this.rightTimer) {
                this.rightTimer.stop();
                this.rightTimer = null;
            }
            this.l_state = this.c_state = this.r_state = 2;
            this.l_curTouchNum = this.c_curTouchNum = this.r_curTouchNum = 0;
            this.l_curTime = this.c_curTime = this.r_curTime = 0;
            this.cutLeftNum = this.cutCenterNum = this.cutRightNum = 0;
            GlobalData.initData();
        }

        // private prePauseGame(index: number): void {
        //     if (GlobalData.gameType == 11) {
        //         game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_PASUE, index);
        //     }
        // }
        // private proRestartGame(index: number): void {
        //     if (GlobalData.gameType == 11) {
        //         game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_TASK_RESTART, index);
        //     }
        // }
    }
}