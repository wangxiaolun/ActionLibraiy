var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var TimeGame = (function () {
        function TimeGame() {
            /**
             * 数据参数
             */
            this.timer = null;
            this.timerNum = 0;
            this.curTouchNum_l = 0;
            this.curTouchNum_c = 0;
            this.curTouchNum_r = 0;
            this.maxLength = 0;
            this.maxArr = 0;
        }
        TimeGame.getInstance = function () {
            if (!this.instance) {
                this.instance = new TimeGame();
            }
            return this.instance;
        };
        TimeGame.prototype.initData = function () {
            var _this = this;
            // 时间模式初始化数据
            this.initTimeData();
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
            }
            this.timer.addEventListener(egret.TimerEvent.TIMER, function (event) {
                if (_this.timerNum <= 0) {
                    _this.setPlayData();
                    _this.initTimeData();
                    game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TIMETYPE);
                    if (GlobalData._curTimerTotalGroup + 1 > _this.maxLength) {
                        GlobalData._curTimerTotalGroup = 1;
                        GlobalData._curTimerEveryGroup = 0;
                        GlobalData._curTimerGroup = 1;
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TIMETYPE);
                        NativeApi.openFinishView();
                    }
                    else {
                        GlobalData._curTimerTotalGroup += 1;
                        if (GlobalData._curTimerEveryGroup + 1 >= _this.maxArr) {
                            GlobalData._curTimerGroup += 1;
                            GlobalData._curTimerEveryGroup = 0;
                        }
                        else {
                            GlobalData._curTimerEveryGroup += 1;
                        }
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TIMETYPE);
                        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 2);
                    }
                    return;
                }
                _this.timerNum--;
                _this.updateTime();
            }, this);
            this.timer.start();
            this.updateStep();
            this.updateTouch();
        };
        TimeGame.prototype.initTimeData = function () {
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
        };
        TimeGame.prototype.setPlayData = function () {
            PlayerModel.getInstance().setLeftPlayer(GlobalData.curLeftPlayerVo, this.curTouchNum_l, GlobalData.timeOneData, 1);
            PlayerModel.getInstance().setCenterPlayer(GlobalData.curCenterPlayerVo, this.curTouchNum_c, GlobalData.timeOneData, 1);
            PlayerModel.getInstance().setRightPlayer(GlobalData.curRightPlayerVo, this.curTouchNum_r, GlobalData.timeOneData, 1);
        };
        TimeGame.prototype.updateTime = function () {
            var vo = DisplayObjectPool.getInstance().pop(PreparaVO);
            vo.type = 1;
            vo.timeNum = this.timerNum;
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TIMENUM_TIME, vo);
        };
        TimeGame.prototype.updateStep = function () {
            var vo = DisplayObjectPool.getInstance().pop(PreparaVO);
            vo.type = GlobalData._curTimerTotalGroup;
            vo.timeNum = this.maxLength;
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_STEPNUM_TIME, vo);
        };
        TimeGame.prototype.updateTouch = function () {
            var arr = [this.curTouchNum_l, this.curTouchNum_c, this.curTouchNum_r];
            var vo = DisplayObjectPool.getInstance().pop(PreparaVO);
            for (var i = 1; i < 4; i++) {
                vo.type = i;
                vo.timeNum = arr[i - 1];
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCHNUM_TIME, vo);
            }
        };
        TimeGame.prototype.addTouch = function (index) {
            if (index == 1) {
                this.curTouchNum_l += 1;
            }
            else if (index == 2) {
                this.curTouchNum_c += 1;
            }
            else {
                this.curTouchNum_r += 1;
            }
            this.updateTouch();
        };
        TimeGame.prototype.containue = function () {
            if (this.timer) {
                this.timer.start();
            }
        };
        TimeGame.prototype.pauseGame = function () {
            if (this.timerNum > 0) {
                if (this.timer) {
                    this.timer.stop();
                }
                return true;
            }
            else {
                return false;
            }
        };
        TimeGame.prototype.resetGame = function () {
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
            GlobalData.initData();
        };
        return TimeGame;
    }());
    game.TimeGame = TimeGame;
    __reflect(TimeGame.prototype, "game.TimeGame");
})(game || (game = {}));
//# sourceMappingURL=TimeGame.js.map