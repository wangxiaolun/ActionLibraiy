// class CommonVideoItem extends eui.Component implements eui.UIComponent {

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

class CommonVideoItem extends BaseRenderer {

	public img_videoBg: eui.Image;
	public btn_play: eui.Button;
	public label_name: eui.Label;

	private nameStr: string;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.skinName = "CommonVideoItemSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public dataChanged() {
		super.dataChanged();
		if (this.data) {
			let videoVo: VideoVO = this.data;
			this.label_name.text = videoVo.videoName;
		}
	}

	private loadComplete(): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playVideo, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private remove(): void {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.playVideo, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
	}

	public setVideo(soureName: string): void {
		this.img_videoBg.source = RES.getRes(soureName + "_png");
		this.label_name.text = soureName;
	}

	private playVideo(): void {

	}
}