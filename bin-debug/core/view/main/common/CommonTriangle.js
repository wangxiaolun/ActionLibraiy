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
/** 三角形目标 */
var CommonTriangle = (function (_super) {
    __extends(CommonTriangle, _super);
    function CommonTriangle() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.angleArr = [0, 120, 240];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonTriangleSkin";
        return _this;
    }
    CommonTriangle.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonTriangle.prototype.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    CommonTriangle.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonTriangle.prototype.remove = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        // egret.Tween.removeTweens(this.img_touch);
        this.triangle.removeEventListener('complete', this.onTweenGroupComplete, this);
        this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonTriangle.prototype.loadComplete = function () {
        this.scaleX = this.scaleY = GameShowData.triangle_Scale;
        this.horizontalCenter = 0;
        this.verticalCenter = GameShowData.triangle_Y;
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.triangle.addEventListener('complete', this.onTweenGroupComplete, this);
    };
    CommonTriangle.prototype.onTweenGroupComplete = function () {
        this.img_touch.touchEnabled = true;
        if (!GlobalData.checkType) {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
        }
    };
    CommonTriangle.prototype.touch = function () {
        this.img_touch.touchEnabled = false;
        game.SoundUtils.getInstance().playHitSound(8);
        this.triangle.play(0);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonTriangle.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonTriangle.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonTriangle.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.verticalCenter -= 5;
        }
        else if (posNum == 2) {
            this.verticalCenter += 5;
        }
        else if (posNum == 3) {
            GameShowData.triangle_Scale = this.scaleX;
            GameShowData.triangle_Y = this.verticalCenter;
            this.changePos();
        }
        else if (posNum == 4) {
            this.setGameType();
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
    CommonTriangle.prototype.setGameType = function () {
        if (GameShowData.triangle_bool) {
            this.scaleX = this.scaleY = GameShowData.triangle_Scale;
            this.verticalCenter = GameShowData.triangle_Y;
        }
    };
    CommonTriangle.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.triangle_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonTriangle;
}(eui.Component));
__reflect(CommonTriangle.prototype, "CommonTriangle", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonTriangle.js.map