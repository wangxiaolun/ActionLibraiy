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
var CommonTileMap = (function (_super) {
    __extends(CommonTileMap, _super);
    function CommonTileMap() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonTileMapSkin";
        return _this;
    }
    CommonTileMap.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonTileMap.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonTileMap.prototype.loadComplete = function () {
        var _this = this;
        this.group_container.removeChildren();
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
        this.ani = Global.createMoive("roadg", "roadg", -600, -450);
        this.ani.scaleX = this.ani.scaleY = 0.9;
        this.group_container.addChild(this.ani);
        this.ani.addEventListener(egret.Event.COMPLETE, function (e) {
            _this.ani.gotoAndStop(1);
            if (!GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, _this.getName());
            }
        }, this);
        this.scaleX = this.scaleY = GameShowData.tilemap_Scale;
        this.horizontalCenter = 0;
        this.bottom = GameShowData.tilemap_Y;
    };
    CommonTileMap.prototype.touch = function (event) {
        var _this = this;
        this.img_touch.touchEnabled = false;
        egret.setTimeout(function () {
            _this.img_touch.touchEnabled = true;
        }, this, 1000);
        game.SoundUtils.getInstance().playHitSound(14);
        this.ani.gotoAndPlay(1, 1);
        if (GlobalData.checkType) {
            game.TimeGame.getInstance().addTouch(this.getName());
        }
        else {
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
        }
    };
    // private onTweenGroupComplete(): void {
    // 	this.img_circle.touchEnabled = true;
    // 	if (!GlobalData.checkType) {
    // 		if (this.img_finish.visible) {
    // 			egret.setTimeout(() => {
    // 				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
    // 			}, this, 1000);
    // 		} else {
    // 			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
    // 		}
    // 	}
    // }
    CommonTileMap.prototype.setFinishShow = function (isShow) {
        // this.img_finish.visible = isShow;
        // this.img_circle.visible = !isShow;
    };
    CommonTileMap.prototype.remove = function () {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonTileMap.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonTileMap.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonTileMap.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            this.bottom += 5;
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
            GameShowData.tilemap_Y = this.bottom;
            GameShowData.tilemap_Scale = this.scaleX;
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
    CommonTileMap.prototype.setGameType = function () {
        if (GameShowData.tilemap_bool) {
            this.bottom = GameShowData.tilemap_Y;
            this.scaleX = this.scaleY = GameShowData.tilemap_Scale;
        }
    };
    CommonTileMap.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.tilemap_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonTileMap;
}(eui.Component));
__reflect(CommonTileMap.prototype, "CommonTileMap", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonTileMap.js.map