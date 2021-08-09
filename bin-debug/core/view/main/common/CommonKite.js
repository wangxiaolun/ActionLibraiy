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
/** 飞镖 */
var CommonKite = (function (_super) {
    __extends(CommonKite, _super);
    function CommonKite() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.curArr = [];
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonKiteSkin";
        return _this;
    }
    CommonKite.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonKite.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonKite.prototype.loadComplete = function () {
        this.scaleX = this.scaleY = GameShowData.kite_Scale;
        this.horizontalCenter = 0;
        this.top = GameShowData.kite_Y;
        for (var i = 1; i < 7; i++) {
            var kit = this.getChildByName("kit" + i);
            if (kit) {
                kit.img_red.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
                kit.setImgName("img" + i);
                kit.setHide();
            }
        }
        this.showObj();
    };
    CommonKite.prototype.showObj = function () {
        this.curArr = [];
        var arr = [1, 2, 3, 4, 5, 6];
        var ranLength = Math.floor(Math.random() * 6 + 1);
        while (this.curArr.length < ranLength) {
            var ranNum = arr[Math.floor((Math.random() * arr.length))];
            if (this.curArr.indexOf(ranNum) == -1) {
                this.curArr.push(ranNum);
            }
        }
        for (var i = 0; i < this.curArr.length; i++) {
            var index = this.curArr[i];
            var kit = this.getChildByName("kit" + index);
            kit.setShow();
        }
    };
    CommonKite.prototype.remove = function () {
        this.curArr = [];
        for (var i = 1; i < 7; i++) {
            var kit = this.getChildByName("kit" + i);
            if (kit) {
                kit.img_red.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
            }
        }
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonKite.prototype.touch = function (event) {
        var name = event.currentTarget.name;
        var index = parseInt(name.charAt(name.length - 1));
        if (this.curArr.indexOf(index) == -1) {
            return;
        }
        game.SoundUtils.getInstance().playHitSound(13);
        var kit = this.getChildByName("kit" + index);
        kit.setScale();
        for (var i = 0; i < this.curArr.length; i++) {
            var forIndx = this.curArr[i];
            if (forIndx == index) {
                this.curArr.splice(i, 1);
            }
        }
        if (this.curArr.length <= 0) {
            // 发送事件到主页
            if (GlobalData.checkType) {
                game.TimeGame.getInstance().addTouch(this.getName());
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
            }
            this.showObj();
        }
    };
    CommonKite.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonKite.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonKite.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            if (this.top - 5 <= 0) {
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
            GameShowData.kite_Y = this.top;
            GameShowData.kite_Scale = this.scaleX;
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
    CommonKite.prototype.setGameType = function () {
        if (GameShowData.kite_bool) {
            this.scaleX = this.scaleY = GameShowData.kite_Scale;
            this.top = GameShowData.kite_Y;
        }
    };
    CommonKite.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.kite_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonKite;
}(eui.Component));
__reflect(CommonKite.prototype, "CommonKite", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonKite.js.map