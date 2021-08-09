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
var CommonFinish = (function (_super) {
    __extends(CommonFinish, _super);
    function CommonFinish() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        _this.skinName = "CommonFinishSkin";
        return _this;
    }
    CommonFinish.prototype.complete = function () {
        // this.drawCircle();
        this.removeEventListener(eui.UIEvent.COMPLETE, this.complete, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
    };
    CommonFinish.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonFinish.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonFinish.prototype.setPlayer = function (playerVo) {
        if (GlobalData.checkType) {
            this.label_tagType.text = "完成次数";
            if (playerVo) {
                // this.img_icon.source = RES.getRes(playerVo.playerIcon);
                this.setPlayIcon(playerVo.playerIcon);
                this.label_name.text = playerVo.playerName;
                this.label_tagOne.text = Global.formatTime(playerVo.playTimes, 2);
                this.label_tagTwo.text = playerVo.playNums + "";
            }
            else {
                this.img_icon.source = "";
                this.label_name.text = "";
                this.label_tagOne.text = "";
                this.label_tagTwo.text = "";
            }
        }
        else {
            this.label_tagType.text = "完成时间";
            if (playerVo) {
                // this.img_icon.source = RES.getRes(playerVo.playerIcon);
                this.setPlayIcon(playerVo.playerIcon);
                this.label_name.text = playerVo.playerName;
                this.label_tagOne.text = playerVo.playNums + "次";
                this.label_tagTwo.text = Global.formatTime(playerVo.playTimes, 2);
            }
            else {
                this.img_icon.source = "";
                this.label_name.text = "";
                this.label_tagOne.text = "0次";
                this.label_tagTwo.text = Global.formatTime(0, 2);
            }
        }
    };
    CommonFinish.prototype.drawCircle = function () {
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(1, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawRoundRect(115, 0, 170, 170, 85, 85);
        this.shape.graphics.endFill();
        this.addChildAt(this.shape, 0);
        this.img_icon.mask = this.shape;
    };
    CommonFinish.prototype.setPlayIcon = function (imgurl) {
        var _this = this;
        if (imgurl.indexOf("checkAdd_png") != -1 || imgurl.indexOf(GlobalData.gameNeedData.channelStr + "Icon_png") != -1) {
            this.img_icon.source = RES.getRes(imgurl);
        }
        else {
            this.imgLoader = new egret.ImageLoader();
            this.imgLoader.crossOrigin = "anonymous";
            this.imgLoader.load(imgurl); // 去除链接中的转义字符‘\’        
            this.imgLoader.once(egret.Event.COMPLETE, function (evt) {
                if (evt.currentTarget.data) {
                    var texture = new egret.Texture();
                    texture.bitmapData = evt.currentTarget.data;
                    _this.img_icon.texture = texture;
                }
            }, this);
        }
        this.drawCircle();
    };
    CommonFinish.prototype.removed = function () {
        if (this.shape && this.shape.parent) {
            this.shape.parent.removeChild(this.shape);
        }
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
    };
    return CommonFinish;
}(eui.Component));
__reflect(CommonFinish.prototype, "CommonFinish", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonFinish.js.map