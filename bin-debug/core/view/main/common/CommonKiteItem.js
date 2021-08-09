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
var CommonKiteItem = (function (_super) {
    __extends(CommonKiteItem, _super);
    function CommonKiteItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonKiteItemSkin";
        return _this;
    }
    CommonKiteItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonKiteItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonKiteItem.prototype.loadComplete = function () {
    };
    CommonKiteItem.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.Event.ENTER_FRAME, this.setRotation, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonKiteItem.prototype.showRotation = function () {
        this.addEventListener(egret.Event.ENTER_FRAME, this.setRotation, this);
    };
    CommonKiteItem.prototype.stopRotation = function () {
        this.removeEventListener(egret.Event.ENTER_FRAME, this.setRotation, this);
    };
    CommonKiteItem.prototype.setRotation = function () {
        this.rotation += 8;
    };
    CommonKiteItem.prototype.setHide = function () {
        this.img_red.visible = false;
    };
    CommonKiteItem.prototype.setShow = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        this.scaleX = 1;
        this.scaleY = 1;
        egret.Tween.get(this).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.sineInOut).call(function () {
            _this.img_red.visible = true;
            egret.Tween.get(_this).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backInOut).call(function () {
                _this.showRotation();
                egret.Tween.removeTweens(_this);
            }, _this);
        }, this);
    };
    CommonKiteItem.prototype.setScale = function () {
        var _this = this;
        egret.Tween.removeTweens(this);
        this.img_red.visible = true;
        this.scaleX = 1;
        this.scaleY = 1;
        egret.Tween.get(this).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.sineInOut).call(function () {
            _this.img_red.visible = false;
            egret.Tween.get(_this).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backInOut).call(function () {
                _this.stopRotation();
                egret.Tween.removeTweens(_this);
            }, _this);
        }, this);
    };
    CommonKiteItem.prototype.getVisible = function () {
        var bool = (this.img_red.visible) ? true : false;
        return bool;
    };
    CommonKiteItem.prototype.setImgName = function (nameStr) {
        this.img_red.name = nameStr;
    };
    return CommonKiteItem;
}(eui.Component));
__reflect(CommonKiteItem.prototype, "CommonKiteItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonKiteItem.js.map