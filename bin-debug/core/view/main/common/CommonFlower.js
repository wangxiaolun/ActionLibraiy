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
/** 花朵 */
var CommonFlower = (function (_super) {
    __extends(CommonFlower, _super);
    function CommonFlower() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonFlowerSkin";
        return _this;
    }
    CommonFlower.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonFlower.prototype.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    CommonFlower.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonFlower.prototype.remove = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        this.removeEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
        this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touCh, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonFlower.prototype.createCompleteEvent = function () {
        this.scaleX = this.scaleY = GameShowData.flower_Scale;
        this.horizontalCenter = 0;
        this.verticalCenter = GameShowData.flower_Y;
        this.addEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touCh, this);
        this.flower.addEventListener('complete', this.onTweenGroupComplete, this);
    };
    CommonFlower.prototype.onTweenGroupComplete = function () {
        this.img_touch.touchEnabled = true;
        if (!GlobalData.checkType) {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
        }
    };
    CommonFlower.prototype.rotationing = function () {
        this.rotation += 3;
    };
    CommonFlower.prototype.pauseGame = function () {
        this.removeEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
    };
    CommonFlower.prototype.reStart = function () {
        this.addEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
    };
    CommonFlower.prototype.touCh = function () {
        this.img_touch.touchEnabled = false;
        game.SoundUtils.getInstance().playHitSound(2);
        this.flower.play(0);
        this.flower2.play(0);
        this.flower3.play(0);
        this.flower4.play(0);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonFlower.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonFlower.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonFlower.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.verticalCenter -= 5;
        }
        else if (posNum == 2) {
            this.verticalCenter += 5;
        }
        else if (posNum == 3) {
            GameShowData.flower_Y = this.verticalCenter;
            GameShowData.flower_Scale = this.scaleX;
            this.changePos();
        }
        else if (posNum == 4) {
            this.verticalCenter = GameShowData.flower_Y;
            this.scaleX = this.scaleY = GameShowData.flower_Scale;
        }
        else if (posNum == 5) {
            if (this.scaleX - 0.1 < 0.1) {
                this.scaleX = this.scaleY = 0.1;
            }
            else {
                this.scaleX = this.scaleY = this.scaleX - 0.1;
            }
        }
        else if (posNum == 6) {
            if (this.scaleX + 0.1 > 1.5) {
                this.scaleX = this.scaleY = 1.5;
            }
            else {
                this.scaleX = this.scaleY = this.scaleX + 0.1;
            }
        }
    };
    CommonFlower.prototype.setGameType = function () {
        // if (GlobalData.isChangePos) {
        // 	this.bottom = GlobalData.positionNum;
        // 	this.scaleX = this.scaleY = GlobalData.scaleNum;
        // }
    };
    CommonFlower.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.flower_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonFlower;
}(eui.Component));
__reflect(CommonFlower.prototype, "CommonFlower", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonFlower.js.map