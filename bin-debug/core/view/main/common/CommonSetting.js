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
var ui;
(function (ui) {
    var CommonSetting = (function (_super) {
        __extends(CommonSetting, _super);
        function CommonSetting() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
            _this.skinName = "CommonSettingSkin";
            return _this;
        }
        CommonSetting.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        CommonSetting.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        CommonSetting.prototype.complete = function () {
        };
        CommonSetting.prototype.setBg = function (arr) {
            this.img_timeBg.source = RES.getRes(arr[0]);
            this.img_timeTitleBg.source = RES.getRes(arr[1]);
            this.item_top.setBgData(arr[2], arr[3]);
            this.item_center.setBgData(arr[2], arr[3]);
            this.item_bottom.setBgData(arr[2], arr[3]);
            this.item_top.setLabelData(arr[4]);
            this.item_center.setLabelData(arr[5]);
            this.item_bottom.setLabelData(arr[6]);
        };
        CommonSetting.prototype.setTouch = function (bool) {
            this.item_top.btn_reduce.touchEnabled = bool;
            this.item_center.btn_reduce.touchEnabled = bool;
            this.item_bottom.btn_reduce.touchEnabled = bool;
            this.item_top.btn_add.touchEnabled = bool;
            this.item_center.btn_add.touchEnabled = bool;
            this.item_bottom.btn_add.touchEnabled = bool;
        };
        CommonSetting.prototype.setNumData = function (topStr, centerStr, rightStr) {
            this.item_top.setNum(topStr);
            this.item_center.setNum(centerStr);
            this.item_bottom.setNum(rightStr);
        };
        CommonSetting.prototype.setBtnName = function (btnNameArr) {
            this.item_top.setBtnName(btnNameArr[0], btnNameArr[1]);
            this.item_center.setBtnName(btnNameArr[2], btnNameArr[3]);
            this.item_bottom.setBtnName(btnNameArr[4], btnNameArr[5]);
        };
        return CommonSetting;
    }(eui.Component));
    ui.CommonSetting = CommonSetting;
    __reflect(CommonSetting.prototype, "ui.CommonSetting", ["eui.UIComponent", "egret.DisplayObject"]);
})(ui || (ui = {}));
//# sourceMappingURL=CommonSetting.js.map