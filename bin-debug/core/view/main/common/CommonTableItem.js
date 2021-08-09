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
var CommonTableItem = (function (_super) {
    __extends(CommonTableItem, _super);
    function CommonTableItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonTableItemSkin";
        return _this;
    }
    CommonTableItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonTableItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonTableItem.prototype.remove = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        egret.Tween.removeTweens(this.img_top);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonTableItem.prototype.loadComplete = function () {
    };
    CommonTableItem.prototype.setName = function (nameStr) {
        this.img_top.name = nameStr;
    };
    CommonTableItem.prototype.setImg = function (bgStr, topStr) {
        this.img_bg.source = RES.getRes(bgStr);
        this.img_top.source = RES.getRes(topStr);
    };
    CommonTableItem.prototype.setShow = function () {
        var _this = this;
        egret.Tween.removeTweens(this.img_top);
        this.img_top.visible = true;
        this.img_top.alpha = 0;
        this.img_top.scaleX = 0;
        this.img_top.scaleY = 0;
        egret.Tween.get(this.img_top).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 250).call(function () {
            egret.Tween.removeTweens(_this.img_top);
        }, this);
        ;
    };
    CommonTableItem.prototype.setHide = function () {
        this.img_top.visible = false;
    };
    CommonTableItem.prototype.setScale = function () {
        var _this = this;
        egret.Tween.removeTweens(this.img_top);
        this.img_top.visible = true;
        egret.Tween.get(this.img_top).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 250, egret.Ease.sineIn).call(function () {
            _this.img_top.visible = false;
            egret.Tween.removeTweens(_this.img_top);
        }, this);
    };
    return CommonTableItem;
}(eui.Component));
__reflect(CommonTableItem.prototype, "CommonTableItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonTableItem.js.map