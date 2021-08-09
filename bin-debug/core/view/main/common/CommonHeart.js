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
/** 心形目标 */
var CommonHeart = (function (_super) {
    __extends(CommonHeart, _super);
    function CommonHeart() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonHeartSkin";
        return _this;
    }
    CommonHeart.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonHeart.prototype.partRemoved = function (partName, instance) {
        _super.prototype.partRemoved.call(this, partName, instance);
    };
    CommonHeart.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonHeart.prototype.remove = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.heart.removeEventListener('complete', this.onTweenGroupComplete, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonHeart.prototype.loadComplete = function () {
        this.scaleX = this.scaleY = GameShowData.heart_Scale;
        this.horizontalCenter = 0;
        this.verticalCenter = GameShowData.heart_Y;
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.heart.addEventListener('complete', this.onTweenGroupComplete, this);
    };
    CommonHeart.prototype.onTweenGroupComplete = function () {
        this.img_touch.touchEnabled = true;
        if (!GlobalData.checkType) {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
        }
    };
    CommonHeart.prototype.touch = function () {
        this.img_touch.touchEnabled = false;
        game.SoundUtils.getInstance().playHitSound(3);
        this.heart.play(0);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonHeart.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonHeart.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonHeart.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.verticalCenter -= 5;
        }
        else if (posNum == 2) {
            this.verticalCenter += 5;
        }
        else if (posNum == 3) {
            GameShowData.heart_Y = this.verticalCenter;
            GameShowData.heart_Scale = this.scaleX;
            this.changePos();
        }
        else if (posNum == 4) {
            this.verticalCenter = GameShowData.heart_Y;
            this.scaleX = this.scaleY = GameShowData.heart_Scale;
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
    CommonHeart.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.heart_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonHeart;
}(eui.Component));
__reflect(CommonHeart.prototype, "CommonHeart", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonHeart.js.map