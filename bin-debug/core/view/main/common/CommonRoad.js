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
/** 竖墙 */
var CommonRoad = (function (_super) {
    __extends(CommonRoad, _super);
    function CommonRoad() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonRoadSkin";
        return _this;
    }
    CommonRoad.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonRoad.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonRoad.prototype.loadComplete = function () {
        var _this = this;
        this.removeChildren();
        this.ani = Global.createMoive("wallS", "broken", -175, -15);
        this.addChild(this.ani);
        this.ani.frameRate = 25;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.ani.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.ani.gotoAndStop(1);
            _this.touchEnabled = true;
            if (!GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, _this.getName());
            }
        }, this);
        this.scaleX = this.scaleY = GameShowData.road_Scale;
        this.horizontalCenter = 0;
        this.bottom = GameShowData.road_Y;
    };
    CommonRoad.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonRoad.prototype.touch = function () {
        this.touchEnabled = false;
        game.SoundUtils.getInstance().playHitSound(10);
        this.ani.gotoAndPlay(1, 1);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    CommonRoad.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonRoad.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonRoad.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.bottom += 5;
        }
        else if (posNum == 2) {
            this.bottom -= 5;
        }
        else if (posNum == 3) {
            GameShowData.road_Y = this.bottom;
            GameShowData.road_Scale = this.scaleX;
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
    CommonRoad.prototype.setGameType = function () {
        if (GameShowData.road_bool) {
            this.bottom = GameShowData.road_Y;
            this.scaleX = this.scaleY = GameShowData.road_Scale;
        }
    };
    CommonRoad.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.road_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonRoad;
}(eui.Component));
__reflect(CommonRoad.prototype, "CommonRoad", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonRoad.js.map