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
var CommonRainItem = (function (_super) {
    __extends(CommonRainItem, _super);
    function CommonRainItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.skinName = "CommonRainItemSkin";
        return _this;
    }
    CommonRainItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonRainItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonRainItem.prototype.loadComplete = function () {
        this.width = 119;
        this.height = 195;
        this.y = -195;
        this.tween = egret.Tween.get(this);
        this.tween.to({ y: 1128 }, 6800).call(this.removeSelf, this);
    };
    CommonRainItem.prototype.removeSelf = function () {
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
    };
    CommonRainItem.prototype.setTweenStatus = function (bool) {
        if (bool) {
            egret.Tween.get(this).play(this.tween);
        }
        else {
            this.tween.setPaused(true);
        }
    };
    return CommonRainItem;
}(eui.Component));
__reflect(CommonRainItem.prototype, "CommonRainItem", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonRainItem.js.map