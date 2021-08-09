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
var CommonResultItem = (function (_super) {
    __extends(CommonResultItem, _super);
    function CommonResultItem() {
        var _this = _super.call(this) || this;
        _this.imgLoader = null;
        _this.curplayVo = null;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        _this.skinName = "CommonResultItemSkin";
        return _this;
    }
    CommonResultItem.prototype.initUI = function () {
        _super.prototype.initUI.call(this);
    };
    CommonResultItem.prototype.initListener = function () {
        _super.prototype.initListener.call(this);
    };
    CommonResultItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
    };
    CommonResultItem.prototype.removed = function () {
        if (this.imgLoader) {
            this.imgLoader.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
            this.imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
        }
        this.imgLoader = null;
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
    };
    CommonResultItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            this.curplayVo = this.data;
            var nameStr = "";
            if (this.curplayVo.playerName.length > 6) {
                nameStr = this.curplayVo.playerName.substring(0, 5) + "...";
            }
            else {
                nameStr = this.curplayVo.playerName;
            }
            this.img_icon.source = "";
            this.label_name.text = nameStr;
            this.label_nums.text = this.curplayVo.playNums + "次";
            this.label_card.text = this.curplayVo.useCard + "kcal";
            if (this.curplayVo.rankNum < 4) {
                this.img_rank.source = RES.getRes("img_rank" + this.curplayVo.rankNum + "_png");
            }
            this.label_times.text = Global.formatTime(this.curplayVo.playTimes, 2);
            if (this.curplayVo.playerIcon.indexOf(GlobalData.gameNeedData.channelStr + "Icon_png") != -1) {
                if (this.imgLoader) {
                    this.imgLoader.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
                    this.imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
                }
                this.imgLoader = null;
                this.img_icon.source = RES.getRes(this.curplayVo.playerIcon);
                this.img_icon.mask = this.mask_shape;
            }
            else {
                if (!this.imgLoader) {
                    this.imgLoader = new egret.ImageLoader();
                    this.imgLoader.crossOrigin = "anonymous";
                    this.imgLoader.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
                    this.imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
                }
                this.imgLoader.load(this.curplayVo.playerIcon);
            }
        }
    };
    CommonResultItem.prototype.complete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.complete, this);
    };
    CommonResultItem.prototype.loadComplete = function (evt) {
        if (evt.currentTarget.data) {
            var texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            this.img_icon.texture = texture;
            this.img_icon.mask = this.mask_shape;
        }
    };
    CommonResultItem.prototype.loadError = function (evt) {
        this.imgLoader.load(this.curplayVo.playerIcon);
    };
    return CommonResultItem;
}(BaseRenderer));
__reflect(CommonResultItem.prototype, "CommonResultItem");
//# sourceMappingURL=CommonResultItem.js.map