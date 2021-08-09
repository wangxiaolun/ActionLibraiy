class CommonCutDown extends eui.Component implements eui.UIComponent {

	public img_icon: eui.Image;
	public img_skip: eui.Image;
	public label_name: eui.Label;
	public label_step: eui.Label;
	public label_time: eui.Label;

	private nameStr: string = "";
	public constructor() {
		super();

		this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
		this.skinName = "CommonCutDownSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private complete(): void {
		// this.drawCircle();
		this.img_skip.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
	}

	// public setPlayerData(playerData: PlayerVO): void {
		// this.img_icon.source = RES.getRes(playerData.playerIcon);
		// this.label_name.text = playerData.playerName;
	// }

	public setCountTime(countNum: number): void {
		this.label_time.text = this.changeNum(countNum);
	}

	public setStep(curNum: number, totalNum: number): void {
		this.label_step.text = "SET" + curNum + "/" + totalNum;
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
	}

	public getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	private changeNum(num: number): string {
		if (num < 10) {
			return "0" + num;
		} else {
			return num + "";
		}
	}

	private touch(): void {
		EffectUtils.playEffect(this.img_skip, 2, () => {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_SKIP_TASK_PREPRA, this.getName());
		});
	}

	private drawCircle(): void {
		var shape: egret.Shape = new egret.Shape();
		shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
		shape.graphics.lineStyle(1, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
		shape.graphics.drawRoundRect(83, 0, 170, 170, 85, 85);
		shape.graphics.endFill();
		this.addChildAt(shape, 0);
		// this.img_icon.mask = shape;
	}

}