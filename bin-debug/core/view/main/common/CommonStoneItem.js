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
var CommonStoneItem = (function (_super) {
    __extends(CommonStoneItem, _super);
    function CommonStoneItem() {
        var _this = _super.call(this) || this;
        _this.peoId = -1;
        _this.touchId = -1;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonStoneItemSkin";
        return _this;
    }
    CommonStoneItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonStoneItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonStoneItem.prototype.loadComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
    };
    CommonStoneItem.prototype.remove = function () {
        this.img_red.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        egret.Tween.removeTweens(this.img_red);
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonStoneItem.prototype.setHide = function () {
        this.setTouchStatus(false);
        this.img_red.scaleX = 0;
        this.img_red.scaleY = 0;
        this.img_red.alpha = 0;
    };
    CommonStoneItem.prototype.setShow = function () {
        var _this = this;
        egret.Tween.removeTweens(this.img_red);
        this.img_red.alpha = 0;
        this.img_red.scaleX = 0;
        this.img_red.scaleY = 0;
        egret.Tween.get(this.img_red).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.bounceOut).call(function () {
            egret.Tween.removeTweens(_this.img_red);
            _this.setTouchStatus(true);
        }, this);
    };
    CommonStoneItem.prototype.setScale = function () {
        var _this = this;
        this.setTouchStatus(false);
        egret.Tween.removeTweens(this.img_red);
        this.img_red.alpha = 1;
        this.img_red.scaleX = 1;
        this.img_red.scaleY = 1;
        if (!GlobalData.checkType) {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.peoId);
        }
        egret.Tween.get(this.img_red).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 250).call(function () {
            egret.Tween.removeTweens(_this.img_red);
            var vo = DisplayObjectPool.getInstance().pop(PreparaVO);
            vo.type = GlobalData.gameNeedData.actId;
            vo.timeNum = _this.peoId;
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_TIME_CHANGE, vo);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_TASK_CHANGE, vo);
            }
        }, this);
    };
    CommonStoneItem.prototype.setImgName = function (peoId, touchId) {
        this.peoId = peoId;
        this.touchId = touchId;
        this.img_red.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
    };
    CommonStoneItem.prototype.touch = function () {
        // 向主页发送事件
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.peoId);
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.peoId);
        }
        this.setScale();
        game.SoundUtils.getInstance().playHitSound(12);
    };
    CommonStoneItem.prototype.setTouchStatus = function (bool) {
        this.img_red.touchEnabled = bool;
    };
    return CommonStoneItem;
}(eui.Component));
__reflect(CommonStoneItem.prototype, "CommonStoneItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonStoneItem.js.map