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
var CommonCutDown = (function (_super) {
    __extends(CommonCutDown, _super);
    function CommonCutDown() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        _this.skinName = "CommonCutDownSkin";
        return _this;
    }
    CommonCutDown.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonCutDown.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonCutDown.prototype.complete = function () {
        // this.drawCircle();
        this.img_skip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
    };
    // public setPlayerData(playerData: PlayerVO): void {
    // this.img_icon.source = RES.getRes(playerData.playerIcon);
    // this.label_name.text = playerData.playerName;
    // }
    CommonCutDown.prototype.setCountTime = function (countNum) {
        this.label_time.text = this.changeNum(countNum);
    };
    CommonCutDown.prototype.setStep = function (curNum, totalNum) {
        this.label_step.text = "SET" + curNum + "/" + totalNum;
    };
    CommonCutDown.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonCutDown.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonCutDown.prototype.changeNum = function (num) {
        if (num < 10) {
            return "0" + num;
        }
        else {
            return num + "";
        }
    };
    CommonCutDown.prototype.touch = function () {
        var _this = this;
        EffectUtils.playEffect(this.img_skip, 2, function () {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_SKIP_TASK_PREPRA, _this.getName());
        });
    };
    CommonCutDown.prototype.drawCircle = function () {
        var shape = new egret.Shape();
        shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        shape.graphics.lineStyle(1, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        shape.graphics.drawRoundRect(83, 0, 170, 170, 85, 85);
        shape.graphics.endFill();
        this.addChildAt(shape, 0);
        // this.img_icon.mask = shape;
    };
    return CommonCutDown;
}(eui.Component));
__reflect(CommonCutDown.prototype, "CommonCutDown", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonCutDown.js.map