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
/** 漂浮目标点 */
var CommonDarts = (function (_super) {
    __extends(CommonDarts, _super);
    function CommonDarts() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.curX = 0;
        _this.curY = 0;
        _this.x = _this.getRandX();
        _this.y = _this.getRandY();
        _this.anchorOffsetX = _this.width / 2;
        _this.anchorOffsetY = _this.height / 2;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonDartsSkin";
        _this.startTween();
        return _this;
    }
    CommonDarts.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonDarts.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonDarts.prototype.startTween = function () {
        var _this = this;
        this.curX = this.getRandX();
        this.curY = this.getRandY();
        egret.Tween.get(this).to({ x: this.curX, y: this.curY }, 3000, egret.Ease.sineIn).call(function () {
            _this.startTween();
        }, this);
    };
    CommonDarts.prototype.remove = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        egret.Tween.removeTweens(this);
        this.dart.removeEventListener('itemComplete', this.onTweenItemComplete, this);
        this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonDarts.prototype.loadComplete = function () {
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.dart.addEventListener('itemComplete', this.onTweenItemComplete, this);
    };
    CommonDarts.prototype.onTweenItemComplete = function () {
        this.img_touch.touchEnabled = true;
        if (!GlobalData.checkType) {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
        }
    };
    CommonDarts.prototype.touch = function () {
        this.img_touch.touchEnabled = false;
        game.SoundUtils.getInstance().playHitSound(7);
        this.dart.play(0);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonDarts.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonDarts.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonDarts.prototype.getRandX = function () {
        var num = Math.floor(Math.random() * 400) - 80;
        return num;
    };
    CommonDarts.prototype.getRandY = function () {
        var num = Math.floor(Math.random() * 653 + 247);
        return num;
    };
    CommonDarts.prototype.setPos = function (posNum, index) {
        if (posNum == 3) {
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        }
        return;
    };
    CommonDarts.prototype.setScale = function (scaleNum) {
        this.scaleX = scaleNum;
        this.scaleY = scaleNum;
    };
    return CommonDarts;
}(eui.Component));
__reflect(CommonDarts.prototype, "CommonDarts", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonDarts.js.map