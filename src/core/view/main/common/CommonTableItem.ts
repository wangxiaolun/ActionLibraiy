class CommonTableItem extends eui.Component implements eui.UIComponent {

	public img_bg: eui.Image;
	public img_top: eui.Image;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonTableItemSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private remove(event: egret.Event): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		egret.Tween.removeTweens(this.img_top);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
	}

	public setName(nameStr:string):void{
		this.img_top.name = nameStr;
	}

	public setImg(bgStr:string, topStr:string):void{
		this.img_bg.source = RES.getRes(bgStr);
		this.img_top.source = RES.getRes(topStr);
	}

	public setShow():void{
		egret.Tween.removeTweens(this.img_top);
		this.img_top.visible = true;
		this.img_top.alpha = 0;
		this.img_top.scaleX = 0;
		this.img_top.scaleY = 0;
		egret.Tween.get(this.img_top).to({scaleX:1,scaleY:1,alpha:1},250).call(()=>{
			egret.Tween.removeTweens(this.img_top);
		},this);;
	}

	public setHide():void{
		this.img_top.visible = false;
	}

	public setScale():void{
		egret.Tween.removeTweens(this.img_top);
		this.img_top.visible = true;
		egret.Tween.get(this.img_top).to({scaleX:0,scaleY:0,alpha:0},250,egret.Ease.sineIn).call(()=>{
			this.img_top.visible = false;
			egret.Tween.removeTweens(this.img_top);
		},this);
	}
}