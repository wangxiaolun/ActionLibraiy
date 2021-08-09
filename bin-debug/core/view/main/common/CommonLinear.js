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
/** 条形目标 */
var CommonLinear = (function (_super) {
    __extends(CommonLinear, _super);
    function CommonLinear() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonLinearSkin";
        return _this;
    }
    CommonLinear.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonLinear.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonLinear.prototype.loadComplete = function () {
        this.scaleX = this.scaleY = GameShowData.linear_Scale;
        this.horizontalCenter = 0;
        this.verticalCenter = GameShowData.linear_Y;
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.scaleAni.addEventListener("itemComplete", this.playComplete, this);
    };
    CommonLinear.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        egret.Tween.removeTweens(this);
        this.scaleAni.removeEventListener("itemComplete", this.playComplete, this);
        this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonLinear.prototype.touch = function (e) {
        this.img_touch.touchEnabled = false;
        this.initShow();
        game.SoundUtils.getInstance().playHitSound(6);
        // 发送点击事件回主页
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonLinear.prototype.initShow = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        var angle = Math.floor(Math.random() * 360);
        egret.Tween.get(this).to({ rotation: angle }, 800, egret.Ease.sineInOut).call(function () {
            egret.Tween.removeTweens(_this);
            _this.img_touch.touchEnabled = true;
        }, this);
        this.scaleAni.play(0);
    };
    CommonLinear.prototype.playComplete = function () {
        if (!GlobalData.checkType) {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
        }
    };
    CommonLinear.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonLinear.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonLinear.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.verticalCenter -= 5;
        }
        else if (posNum == 2) {
            this.verticalCenter += 5;
        }
        else if (posNum == 3) {
            GameShowData.linear_Scale = this.scaleX;
            GameShowData.linear_Y = this.verticalCenter;
            this.changePos();
        }
        else if (posNum == 4) {
            this.scaleX = this.scaleY = GameShowData.linear_Scale;
            this.verticalCenter = GameShowData.linear_Y;
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
    // public setGameType(): void {
    // 	if (GlobalData.isChangePos) {
    // 		this.bottom = GlobalData.positionNum;
    // 		this.scaleX = this.scaleY = GlobalData.scaleNum;
    // 	}
    // }
    CommonLinear.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.linear_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonLinear;
}(eui.Component));
__reflect(CommonLinear.prototype, "CommonLinear", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonLinear.js.map