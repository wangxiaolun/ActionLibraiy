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
/** 表格 */
var CommonTable = (function (_super) {
    __extends(CommonTable, _super);
    function CommonTable() {
        var _this = _super.call(this) || this;
        _this.nameStr = "";
        _this.curArr = [];
        _this.curTouchIndex = -1;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.addEventListener(egret.Event.REMOVED_FROM_STAGE, _this.remove, _this);
        _this.skinName = "CommonTableSkin";
        return _this;
    }
    CommonTable.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonTable.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonTable.prototype.remove = function (event) {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        for (var i = 1; i < 10; i++) {
            var table = this.getChildByName("touch_" + i);
            if (table) {
                table.img_top.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
            }
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonTable.prototype.loadComplete = function () {
        for (var i = 1; i < 10; i++) {
            var table = this.getChildByName("touch_" + i);
            table.img_top.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
            table.setImg("table_gray_" + i + "_png", "table_red_" + i + "_png");
            table.setName("img_" + i);
            table.setHide();
        }
        this.initShowObj();
        this.scaleX = this.scaleY = GameShowData.tabel_Scale;
        this.horizontalCenter = 0;
        this.top = GameShowData.tabel_Y;
    };
    CommonTable.prototype.initShowObj = function () {
        var typeArr = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 9], [1, 3], [1, 7], [2, 8], [3, 9], [3, 7], [4, 6], [7, 9]];
        var ranNum = Math.floor(Math.random() * 9);
        this.curArr = typeArr[ranNum];
        for (var i = 0; i < this.curArr.length; i++) {
            var index = this.curArr[i];
            var checkTable = this.getChildByName("touch_" + index);
            checkTable.setShow();
        }
    };
    CommonTable.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonTable.prototype.getName = function () {
        return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
    };
    CommonTable.prototype.touch = function (event) {
        var name = event.currentTarget.name;
        var index = parseInt(name.substring(name.length - 1));
        if (index == this.curTouchIndex) {
            return;
        }
        game.SoundUtils.getInstance().playHitSound(4);
        this.curTouchIndex = index;
        var curItem = this.getChildByName("touch_" + index);
        curItem.setScale();
        for (var i = 0; i < this.curArr.length; i++) {
            var targer = this.curArr[i];
            if (targer == index) {
                this.curArr.splice(i, 1);
            }
        }
        if (this.curArr.length <= 0) {
            this.curArr.splice(0, this.curArr.length);
            this.initShowObj();
            // 传递点击事件回主页
            if (GlobalData.checkType) {
                game.TimeGame.getInstance().addTouch(this.getName());
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
            }
        }
    };
    CommonTable.prototype.setPos = function (posNum, index) {
        if (posNum == 1) {
            if (this.top - 5 <= 0) {
                this.top = 0;
            }
            else {
                this.top -= 5;
            }
        }
        else if (posNum == 2) {
            if (this.top + 5 > 1080 - this.height) {
                this.top = 1080 - this.height;
            }
            else {
                this.top += 5;
            }
        }
        else if (posNum == 3) {
            GameShowData.tabel_Y = this.top;
            GameShowData.tabel_Scale = this.scaleX;
            this.changePos();
        }
        else if (posNum == 4) {
            this.top = GameShowData.tabel_Y;
            this.scaleX = this.scaleY = GameShowData.tabel_Scale;
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
    CommonTable.prototype.changePos = function () {
        game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
        if (GameShowData.tabel_bool) {
            if (GlobalData.checkType) {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
            }
            else {
                game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
            }
        }
    };
    return CommonTable;
}(eui.Component));
__reflect(CommonTable.prototype, "CommonTable", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonTable.js.map