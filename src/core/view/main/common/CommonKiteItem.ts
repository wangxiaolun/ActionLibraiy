class CommonKiteItem extends eui.Component implements eui.UIComponent {

	public img_gray: eui.Image;
	public img_red: eui.Image;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonKiteItemSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private loadComplete(): void {

	}

	private remove(): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.removeEventListener(egret.Event.ENTER_FRAME, this.setRotation, this);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	public showRotation(): void {
		this.addEventListener(egret.Event.ENTER_FRAME, this.setRotation, this);
	}

	public stopRotation(): void {
		this.removeEventListener(egret.Event.ENTER_FRAME, this.setRotation, this);
	}

	private setRotation(): void {
		this.rotation += 8;
	}

	public setHide(): void {
		this.img_red.visible = false;
	}

	public setShow(): void {
		egret.Tween.removeTweens(this);
		this.scaleX = 1;
		this.scaleY = 1;
		egret.Tween.get(this).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.sineInOut).call(() => {
			this.img_red.visible = true;
			egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backInOut).call(() => {
				this.showRotation();
				egret.Tween.removeTweens(this);
			}, this);
		}, this);
	}

	public setScale(): void {
		egret.Tween.removeTweens(this);
		this.img_red.visible = true;
		this.scaleX = 1;
		this.scaleY = 1;
		egret.Tween.get(this).to({ scaleX: 0, scaleY: 0 }, 300, egret.Ease.sineInOut).call(() => {
			this.img_red.visible = false;
			egret.Tween.get(this).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backInOut).call(() => {
				this.stopRotation();
				egret.Tween.removeTweens(this);
			}, this);
		}, this);
	}

	public getVisible(): boolean {
		let bool: boolean = (this.img_red.visible) ? true : false;
		return bool;
	}

	public setImgName(nameStr: string): void {
		this.img_red.name = nameStr;
	}
}