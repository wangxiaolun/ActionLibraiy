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
var CommonListItem = (function (_super) {
    __extends(CommonListItem, _super);
    function CommonListItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "CommonListItemSkin";
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        return _this;
    }
    CommonListItem.prototype.loadComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
    };
    CommonListItem.prototype.drawCircle = function () {
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(1, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawRoundRect(0, 0, 85, 85, 32, 32);
        this.shape.graphics.endFill();
        this.addChildAt(this.shape, 0);
        this.img_icon.mask = this.shape;
    };
    Object.defineProperty(CommonListItem.prototype, "skinUrl", {
        set: function (imgurl) {
            if (imgurl) {
                if (imgurl.indexOf("checkAdd_png") != -1 || imgurl.indexOf(GlobalData.gameNeedData.channelStr + "Icon_png") != -1) {
                    this.img_icon.source = RES.getRes(imgurl);
                    this.drawCircle();
                }
                else {
                    this.curLoadStr = imgurl;
                    this.imgLoader = new egret.ImageLoader();
                    this.imgLoader.crossOrigin = "anonymous";
                    this.imgLoader.load(imgurl); // 去除链接中的转义字符‘\’
                    this.imgLoader.once(egret.Event.COMPLETE, this.loadImgComplete, this);
                    this.imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadImgError, this);
                }
            }
            this.addEventListener(eui.UIEvent.COMPLETE, this.removed, this);
        },
        enumerable: true,
        configurable: true
    });
    CommonListItem.prototype.loadImgComplete = function (evt) {
        if (evt.currentTarget.data) {
            var texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            this.img_icon.texture = texture;
            this.drawCircle();
        }
    };
    CommonListItem.prototype.loadImgError = function (evt) {
        this.imgLoader.load(this.curLoadStr);
    };
    Object.defineProperty(CommonListItem.prototype, "dataVO", {
        get: function () {
            return this.vo;
        },
        set: function (playerVo) {
            this.vo = playerVo;
        },
        enumerable: true,
        configurable: true
    });
    CommonListItem.prototype.removed = function () {
        if (this.shape && this.shape.parent) {
            this.shape.parent.removeChild(this);
            this.shape = null;
            this.img_icon.mask = null;
        }
        if (this.imgLoader) {
            this.imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadImgError, this);
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.removed, this);
    };
    return CommonListItem;
}(eui.ItemRenderer));
__reflect(CommonListItem.prototype, "CommonListItem");
//# sourceMappingURL=CommonListItem.js.map