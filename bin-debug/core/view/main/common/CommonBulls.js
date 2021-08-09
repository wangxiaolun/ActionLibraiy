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
/** 圆形目标 */
var CommonBulls = (function (_super) {
    __extends(CommonBulls, _super);
    function CommonBulls() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonBullsSkin";
        return _this;
    }
    CommonBulls.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonBulls.prototype.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    CommonBulls.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonBulls.prototype.remove = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        egret.Tween.removeTweens(this);
        this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonBulls.prototype.loadComplete = function () {
        this.scaleX = this.scaleY = GameShowData.bull_Scale;
        this.horizontalCenter = 0;
        this.verticalCenter = GameShowData.bull_Y;
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
    };
    CommonBulls.prototype.touch = function () {
        var _this = this;
        this.img_touch.touchEnabled = false;
        game.SoundUtils.getInstance().playHitSound(5);
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 200, egret.Ease.sineIn).call(function () {
            egret.Tween.get(_this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, egret.Ease.backInOut).call(function () {
                _this.img_touch.touchEnabled = true;
                if (!GlobalData.checkType) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, _this.getName());
                }
            }, _this);
        }, this);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonBulls.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonBulls.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonBulls.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.verticalCenter -= 5;
        }
        else if (posNum == 2) {
            this.verticalCenter += 5;
        }
        else if (posNum == 3) {
            GameShowData.bull_Scale = this.scaleX;
            GameShowData.bull_Y = this.verticalCenter;
            this.changePos();
        }
        else if (posNum == 4) {
            this.verticalCenter = GameShowData.bull_Y;
            this.scaleX = this.scaleY = GameShowData.bull_Scale;
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
    CommonBulls.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.bull_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonBulls;
}(eui.Component));
__reflect(CommonBulls.prototype, "CommonBulls", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonBulls.js.map