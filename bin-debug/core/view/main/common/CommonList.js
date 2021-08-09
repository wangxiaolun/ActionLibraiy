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
var CommonList = (function (_super) {
    __extends(CommonList, _super);
    function CommonList() {
        var _this = _super.call(this) || this;
        _this.listIndex = 0;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        _this.skinName = "CommonListSkin";
        return _this;
    }
    CommonList.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonList.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonList.prototype.complete = function () {
    };
    CommonList.prototype.initView = function () {
        this.group_panel.removeChildren();
    };
    CommonList.prototype.getNumChild = function () {
        if (this.group_panel.numChildren > 0) {
            return 1;
        }
        else {
            return 0;
        }
    };
    CommonList.prototype.setGroupData = function (dataArr, listIndex) {
        this.listIndex = listIndex;
        this.group_panel.removeChildren();
        if (dataArr.length > 0) {
            for (var i = 0; i < dataArr.length; i++) {
                var vo = dataArr[i];
                var img = new CommonListItem();
                img.skinUrl = vo.playerIcon;
                img.dataVO = vo;
                this.group_panel.addChild(img);
                img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkPlayer, this);
                if (i >= 3) {
                    img.x = parseInt((i - 3) % 3 + "") * (img.width + 10);
                    img.y = (parseInt((i - 3) / 3 + "") + 1) * (img.height + 10);
                }
                else {
                    img.x = i * (img.width + 10);
                }
            }
        }
    };
    CommonList.prototype.checkPlayer = function (evt) {
        var _this = this;
        var target = evt.currentTarget;
        var vo = target.dataVO;
        EffectUtils.playEffect(target, 1, function () {
            if (_this.listIndex == 1) {
                if (vo.playerId == -1) {
                    PlayerModel.getInstance().addLeftPlayer();
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 1);
                }
                else if (vo.playerId == -2) {
                    PlayerModel.getInstance().deleteLeftPlayer(vo);
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 1);
                }
            }
            else if (_this.listIndex == 2) {
                if (vo.playerId == -1) {
                    PlayerModel.getInstance().addCenterPlayer();
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 2);
                }
                else if (vo.playerId == -2) {
                    PlayerModel.getInstance().deleteCenterPlayer(vo);
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 2);
                }
            }
            else if (_this.listIndex == 3) {
                if (vo.playerId == -1) {
                    PlayerModel.getInstance().addRightPlayer();
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 3);
                }
                else if (vo.playerId == -2) {
                    PlayerModel.getInstance().deleteRightPlayer(vo);
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 3);
                }
            }
        });
    };
    CommonList.prototype.updatePlayer = function (data) {
        // if (data.id == 1) {
        // 	P.getGameDataProxy().deleteLeftPlayer(data.vo);
        // } else if (data.id == 2) {
        // 	P.getGameDataProxy().deleteCenterPlayer(data.vo);
        // } else if (data.id == 3) {
        // 	P.getGameDataProxy().deleteRightPlayer(data.vo);
        // }
        // game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, data.id);
    };
    return CommonList;
}(eui.Component));
__reflect(CommonList.prototype, "CommonList", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonList.js.map