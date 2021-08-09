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
/** 哑铃 */
var CommonDumbbel = (function (_super) {
    __extends(CommonDumbbel, _super);
    function CommonDumbbel() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.outNum = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.skinName = "CommonDumbbelSkin";
        return _this;
    }
    CommonDumbbel.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonDumbbel.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonDumbbel.prototype.loadComplete = function () {
        this.scaleX = this.scaleY = GameShowData.dumbbel_Scale;
        this.horizontalCenter = 0;
        this.verticalCenter = GameShowData.dumbbel_Y;
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
        this.dumbbel.addEventListener(egret.Event.COMPLETE, this.onTweenGroupComplete, this);
    };
    CommonDumbbel.prototype.onTweenGroupComplete = function () {
        if (!GlobalData.checkType) {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
        }
    };
    CommonDumbbel.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonDumbbel.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonDumbbel.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.dumbbel.removeEventListener(egret.Event.COMPLETE, this.onTweenGroupComplete, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonDumbbel.prototype.touch = function (event) {
        var _this = this;
        this.img_touch.touchEnabled = false;
        this.outNum = egret.setTimeout(function () {
            _this.img_touch.touchEnabled = true;
            egret.clearTimeout(_this.outNum);
        }, this, 900);
        game.SoundUtils.getInstance().playHitSound(9);
        this.dumbbel.play(0);
        // 传递事件回主页
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonDumbbel.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.verticalCenter -= 5;
        }
        else if (posNum == 2) {
            this.verticalCenter += 5;
        }
        else if (posNum == 3) {
            GameShowData.dumbbel_Y = this.verticalCenter;
            GameShowData.dumbbel_Scale = this.scaleX;
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
    CommonDumbbel.prototype.setGameType = function () {
        if (GameShowData.dumbbel_bool) {
            this.verticalCenter = GameShowData.dumbbel_Y;
            this.scaleX = this.scaleY = GameShowData.dumbbel_Scale;
        }
    };
    CommonDumbbel.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.dumbbel_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonDumbbel;
}(eui.Component));
__reflect(CommonDumbbel.prototype, "CommonDumbbel", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonDumbbel.js.map