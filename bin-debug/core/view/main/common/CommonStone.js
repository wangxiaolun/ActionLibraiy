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
/** 石头目标 */
var CommonStone = (function (_super) {
    __extends(CommonStone, _super);
    function CommonStone() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonStoneSkin";
        return _this;
    }
    CommonStone.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonStone.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonStone.prototype.loadComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
    };
    CommonStone.prototype.initData = function () {
        var ranNum = Math.floor(Math.random() * 9 + 1);
        for (var i = 1; i < 10; i++) {
            var stone = this.getChildByName("stone" + i);
            if (stone) {
                stone.setImgName(this.getName(), i);
                if (i == ranNum) {
                    stone.setShow();
                }
                else {
                    stone.setHide();
                }
            }
        }
        this.scaleX = this.scaleY = GameShowData.stone_Scale;
        this.horizontalCenter = 0;
        this.top = GameShowData.stone_Y;
    };
    CommonStone.prototype.randomObj = function () {
        var ranNum = Math.floor(Math.random() * 9 + 1);
        var stone = this.getChildByName("stone" + ranNum);
        if (stone) {
            stone.setShow();
        }
    };
    CommonStone.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
        this.initData();
    };
    CommonStone.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonStone.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonStone.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            if (this.top - 5 < 0) {
                this.top = 0;
            }
            else {
                this.top -= 5;
            }
        }
        else if (posNum == 2) {
            this.top += 5;
        }
        else if (posNum == 3) {
            GameShowData.stone_Y = this.top;
            GameShowData.stone_Scale = this.scaleX;
            this.changePos();
        }
        else if (posNum == 4) {
            this.setGameType();
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
    CommonStone.prototype.setGameType = function () {
        if (GameShowData.stone_bool) {
            this.top = GameShowData.stone_Y;
            this.scaleX = this.scaleY = GameShowData.stone_Scale;
        }
    };
    CommonStone.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.stone_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonStone;
}(eui.Component));
__reflect(CommonStone.prototype, "CommonStone", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonStone.js.map