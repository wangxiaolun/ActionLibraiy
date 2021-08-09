var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/** 雨滴 */
var CommonRain = (function (_super) {
    __extends(CommonRain, _super);
    function CommonRain() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.timeIndex = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.skinName = "CommonRainSkin";
        return _this;
    }
    CommonRain.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonRain.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.top = 20;
        this.horizontalCenter = 50;
        this.startGame();
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonRain.prototype.loadComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
    };
    CommonRain.prototype.createRain = function () {
        var commonBall = DisplayObjectPool.getInstance().pop(CommonRainItem);
        commonBall.touchEnabled = true;
        this.grou_container.addChild(commonBall);
        var nameStr = egret.getTimer() + Math.floor(Math.random() * 100) + "";
        commonBall.name = nameStr;
        return commonBall;
    };
    CommonRain.prototype.startGame = function () {
        var _this = this;
        this.stopGame();
        if (!this.dropTimer) {
            this.dropTimer = new egret.Timer(2000);
        }
        this.dropTimer.addEventListener(egret.TimerEvent.TIMER, function () {
            _this.rain_left = _this.createRain();
            _this.rain_left.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touch, _this);
            _this.rain_left.horizontalCenter = -125;
            _this.timeIndex = egret.setTimeout(function () {
                _this.rain_right = _this.createRain();
                _this.rain_right.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.touch, _this);
                _this.rain_right.horizontalCenter = 125;
            }, _this, 1000);
        }, this);
        this.dropTimer.start();
    };
    CommonRain.prototype.stopGame = function () {
        if (this.dropTimer) {
            this.dropTimer.stop();
            this.dropTimer = null;
        }
        egret.clearTimeout(this.timeIndex);
        this.grou_container.removeChildren();
    };
    CommonRain.prototype.remove = function () {
        this.stopGame();
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    CommonRain.prototype.pauseGame = function () {
        if (this.dropTimer) {
            this.dropTimer.stop();
        }
        egret.clearTimeout(this.timeIndex);
        for (var i = 0; i < this.grou_container.numChildren; i++) {
            var item = this.grou_container.getChildAt(i);
            if (item) {
                item.setTweenStatus(false);
            }
        }
    };
    CommonRain.prototype.reStart = function () {
        for (var i = 0; i < this.grou_container.numChildren; i++) {
            var item = this.grou_container.getChildAt(i);
            if (item) {
                item.setTweenStatus(true);
            }
        }
        if (this.dropTimer) {
            this.dropTimer.start();
        }
    };
    CommonRain.prototype.setName = function (nameStr) {
        this.name = nameStr;
        this.nameStr = nameStr;
    };
    CommonRain.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonRain.prototype.touch = function (event) {
        var _this = this;
        var curTarget = event.currentTarget;
        if (this.hitTest(this.img_hit1, curTarget) || this.hitTest(this.img_hit2, curTarget)) {
            curTarget.touchEnabled = false;
            event.target.touchEnabled = false;
            egret.Tween.removeTweens(curTarget);
            game.SoundUtils.getInstance().playHitSound(11);
            egret.Tween.get(curTarget).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 500, egret.Ease.sineIn).call(function () {
                egret.Tween.removeTweens(curTarget);
                if (curTarget && curTarget.parent) {
                    curTarget.parent.removeChild(curTarget);
                }
                if (!GlobalData.checkType) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, _this.getName());
                }
            }, this);
            // 向主页发送事件
            if (GlobalData.checkType) {
                game.TimeGame.getInstance().addTouch(this.getName());
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
            }
        }
        else {
            return;
        }
    };
    CommonRain.prototype.hitTest = function (obj1, obj2) {
        if (obj1 == undefined) {
            return false;
        }
        if (obj2 == undefined) {
            return false;
        }
        var rect1 = obj1.getBounds();
        var rect2 = obj2.getBounds();
        rect1.x = obj1.x;
        rect1.y = obj1.y;
        rect2.x = obj2.x;
        rect2.y = obj2.y;
        return rect1.intersects(rect2);
    };
    CommonRain.prototype.setPos = function (posNum, index) {
        if (posNum == 3) {
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        }
    };
    CommonRain.prototype.setGameType = function () {
        return;
    };
    return CommonRain;
}(eui.Component));
__reflect(CommonRain.prototype, "CommonRain", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonRain.js.map