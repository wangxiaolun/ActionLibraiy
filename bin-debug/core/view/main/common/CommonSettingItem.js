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
    var CommonSettingItem = (function (_super) {
        __extends(CommonSettingItem, _super);
        function CommonSettingItem() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
            _this.skinName = "CommonSettingItemSkin";
            return _this;
        }
        CommonSettingItem.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        CommonSettingItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        CommonSettingItem.prototype.complete = function () {
            this.btn_reduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reduce, this);
            this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add, this);
        };
        CommonSettingItem.prototype.setBgData = function (reduceBg, addBg) {
            this.btn_reduce.source = RES.getRes(reduceBg);
            this.btn_add.source = RES.getRes(addBg);
        };
        CommonSettingItem.prototype.setLabelData = function (titleStr) {
            this.label_title.text = titleStr;
        };
        CommonSettingItem.prototype.setNum = function (str) {
            this.label_num.text = str;
        };
        CommonSettingItem.prototype.setBtnName = function (reduceName, addName) {
            this.btn_reduce.name = reduceName;
            this.btn_add.name = addName;
        };
        CommonSettingItem.prototype.reduce = function (e) {
            EffectUtils.playEffect(this.btn_reduce, 3);
            var reduceName = e.currentTarget.name;
            switch (reduceName) {
                case "cut1":
                    if (GlobalData.timeOneData - 5 < 5) {
                        GlobalData.timeOneData = 5;
                    }
                    else {
                        GlobalData.timeOneData -= 5;
                    }
                    this.label_num.text = GlobalData.timeOneData + '"';
                    break;
                case "cut2":
                    if (GlobalData.timeTwoData - 5 < 5) {
                        GlobalData.timeTwoData = 5;
                    }
                    else {
                        GlobalData.timeTwoData -= 5;
                    }
                    this.label_num.text = GlobalData.timeTwoData + '"';
                    break;
                case "cut3":
                    if (GlobalData.timeThreeData - 1 < 1) {
                        GlobalData.timeThreeData = 1;
                    }
                    else {
                        GlobalData.timeThreeData -= 1;
                    }
                    this.label_num.text = GlobalData.timeThreeData + "";
                    break;
                case "cuta":
                    if (GlobalData.taskOneData - 5 < 5) {
                        GlobalData.taskOneData = 5;
                    }
                    else {
                        GlobalData.taskOneData -= 5;
                    }
                    this.label_num.text = GlobalData.taskOneData + "";
                    break;
                case "cutb":
                    if (GlobalData.taskTwoData - 5 < 5) {
                        GlobalData.taskTwoData = 5;
                    }
                    else {
                        GlobalData.taskTwoData -= 5;
                    }
                    this.label_num.text = GlobalData.taskTwoData + '"';
                    break;
                case "cutc":
                    if (GlobalData.taskThreeData - 1 < 1) {
                        GlobalData.taskThreeData = 1;
                    }
                    else {
                        GlobalData.taskThreeData -= 1;
                    }
                    this.label_num.text = GlobalData.taskThreeData + "";
                    break;
            }
        };
        CommonSettingItem.prototype.add = function (e) {
            EffectUtils.playEffect(this.btn_add, 3);
            var addName = e.currentTarget.name;
            switch (addName) {
                case "add1":
                    if (GlobalData.timeOneData + 5 > 999) {
                        GlobalData.timeOneData = 999;
                    }
                    else {
                        GlobalData.timeOneData += 5;
                    }
                    this.label_num.text = GlobalData.timeOneData + '"';
                    break;
                case "add2":
                    if (GlobalData.timeTwoData + 5 > 999) {
                        GlobalData.timeTwoData = 999;
                    }
                    else {
                        GlobalData.timeTwoData += 5;
                    }
                    this.label_num.text = GlobalData.timeTwoData + '"';
                    break;
                case "add3":
                    if (GlobalData.timeThreeData + 1 > 999) {
                        GlobalData.timeThreeData = 999;
                    }
                    else {
                        GlobalData.timeThreeData += 1;
                    }
                    this.label_num.text = GlobalData.timeThreeData + "";
                    break;
                case "adda":
                    if (GlobalData.taskOneData + 5 > 999) {
                        GlobalData.taskOneData = 999;
                    }
                    else {
                        GlobalData.taskOneData += 5;
                    }
                    this.label_num.text = GlobalData.taskOneData + "";
                    break;
                case "addb":
                    if (GlobalData.taskTwoData + 5 > 999) {
                        GlobalData.taskTwoData = 999;
                    }
                    else {
                        GlobalData.taskTwoData += 5;
                    }
                    this.label_num.text = GlobalData.taskTwoData + '"';
                    break;
                case "addc":
                    if (GlobalData.taskThreeData + 1 > 999) {
                        GlobalData.taskThreeData = 999;
                    }
                    else {
                        GlobalData.taskThreeData += 1;
                    }
                    this.label_num.text = GlobalData.taskThreeData + "";
                    break;
            }
        };
        return CommonSettingItem;
    }(eui.Component));
    ui.CommonSettingItem = CommonSettingItem;
    __reflect(CommonSettingItem.prototype, "ui.CommonSettingItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(ui || (ui = {}));
//# sourceMappingURL=CommonSettingItem.js.map