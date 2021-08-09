class CommonRainItem extends eui.Component implements eui.UIComponent {

	private tween: egret.Tween;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.skinName = "CommonRainItemSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private loadComplete(): void {
		this.width = 119;
		this.height = 195;
		this.y = -195
		this.tween = egret.Tween.get(this);
		this.tween.to({ y: 1128 }, 6800).call(this.removeSelf, this);
	}

	private removeSelf(): void {
		if (this && this.parent) {
			this.parent.removeChild(this);
		}
	}

	public setTweenStatus(bool: boolean): void {
		if (bool) {
			egret.Tween.get(this).play(this.tween);
		} else {
			this.tween.setPaused(true);
		}
	}

}