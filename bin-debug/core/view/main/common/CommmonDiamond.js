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
/** 战神 */
var CommmonDiamond = (function (_super) {
    __extends(CommmonDiamond, _super);
    function CommmonDiamond() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommmonDiamondSkin";
        return _this;
    }
    CommmonDiamond.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommmonDiamond.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommmonDiamond.prototype.remove = function (event) {
        this.removeChildren();
        if (this && this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommmonDiamond.prototype.loadComplete = function () {
        var _this = this;
        this.removeChildren();
        this.ani = Global.createMoive("ani_diamon", "Battle-rope", -163, -90);
        this.addChild(this.ani);
        this.ani.frameRate = 80;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.ani.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.ani.gotoAndStop(1);
            _this.touchEnabled = true;
            if (!GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, _this.getName());
            }
        }, this);
        this.scaleX = this.scaleY = GameShowData.diamon_Scale;
        if (GlobalData.gameNeedData.isHasPower) {
            this.horizontalCenter = -40;
        }
        else {
            this.horizontalCenter = 0;
        }
        this.bottom = GameShowData.diamon_Y;
    };
    CommmonDiamond.prototype.touch = function () {
        this.touchEnabled = false;
        game.SoundUtils.getInstance().playHitSound(1);
        this.ani.gotoAndPlay(1, 1);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommmonDiamond.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommmonDiamond.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommmonDiamond.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            if (this.bottom + 5 > 1920 - this.height) {
                this.bottom = 1080 - this.height;
            }
            else {
                this.bottom += 5;
            }
        }
        else if (posNum == 2) {
            if (this.bottom - 5 < 0) {
                this.bottom = 0;
            }
            else {
                this.bottom -= 5;
            }
        }
        else if (posNum == 3) {
            GameShowData.diamon_Y = this.bottom;
            GameShowData.diamon_Scale = this.scaleX;
            this.changePos();
        }
        else if (posNum == 4) {
            this.scaleX = this.scaleY = GameShowData.diamon_Scale;
            this.bottom = GameShowData.diamon_Y;
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
    // public setGameType(): void {
    // 	if (GlobalData.isChangePos) {
    // 		this.bottom = GlobalData.positionNum;
    // 		this.scaleX = this.scaleY = GlobalData.scaleNum;
    // 	}
    // }
    CommmonDiamond.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.diamon_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommmonDiamond;
}(eui.Component));
__reflect(CommmonDiamond.prototype, "CommmonDiamond", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommmonDiamond.js.map