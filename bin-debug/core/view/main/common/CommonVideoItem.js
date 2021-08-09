// class CommonVideoItem extends eui.Component implements eui.UIComponent {
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
// 	public img_videoBg: eui.Image;
// 	public btn_play: eui.Button;
// 	public label_name: eui.Label;
// 	private nameStr: string;
// 	public constructor() {
// 		super();
// 		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
// 		this.skinName = "CommonVideoItemSkin";
// 	}
// 	protected partAdded(partName: string, instance: any): void {
// 		super.partAdded(partName, instance);
// 	}
// 	protected childrenCreated(): void {
// 		super.childrenCreated();
// 	}
// 	private loadComplete(): void {
// 		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
// 		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playVideo, this);
// 		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
// 	}
// 	private remove(): void {
// 		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playVideo, this);
// 		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
// 	}
// 	public setName(nameStr: string): void {
// 		this.nameStr = nameStr;
// 	}
// 	public setVideo(soureName:string):void{
// 		this.img_videoBg.source = RES.getRes(soureName+"_png");
// 		this.label_name.text = soureName;
// 	}
// 	private playVideo():void{
// 	}
// }
var CommonVideoItem = (function (_super) {
    __extends(CommonVideoItem, _super);
    function CommonVideoItem() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.loadComplete, _this);
        _this.skinName = "CommonVideoItemSkin";
        return _this;
    }
    CommonVideoItem.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonVideoItem.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonVideoItem.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        if (this.data) {
            var videoVo = this.data;
            this.label_name.text = videoVo.videoName;
        }
    };
    CommonVideoItem.prototype.loadComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playVideo, this);
        this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonVideoItem.prototype.remove = function () {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playVideo, this);
        this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
    };
    CommonVideoItem.prototype.setName = function (nameStr) {
        this.nameStr = nameStr;
    };
    CommonVideoItem.prototype.setVideo = function (soureName) {
        this.img_videoBg.source = RES.getRes(soureName + "_png");
        this.label_name.text = soureName;
    };
    CommonVideoItem.prototype.playVideo = function () {
    };
    return CommonVideoItem;
}(BaseRenderer));
__reflect(CommonVideoItem.prototype, "CommonVideoItem");
//# sourceMappingURL=CommonVideoItem.js.map