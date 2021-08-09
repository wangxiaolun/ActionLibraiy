/** 漂浮目标点 */
class CommonDarts extends eui.Component implements eui.UIComponent {

	public img_touch: eui.Image;
	private nameStr: string = "";
	public dart: egret.tween.TweenGroup;

	private curX: number = 0;
	private curY: number = 0;
	public constructor() {
		super();
		this.x = this.getRandX();
		this.y = this.getRandY();
		this.anchorOffsetX = this.width / 2;
		this.anchorOffsetY = this.height / 2;
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonDartsSkin";
		this.startTween();
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private startTween(): void {
		this.curX = this.getRandX();
		this.curY = this.getRandY();
		egret.Tween.get(this).to({ x: this.curX, y: this.curY }, 3000, egret.Ease.sineIn).call(() => {
			this.startTween();
		}, this);

	}

	private remove(event: egret.Event): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		egret.Tween.removeTweens(this);
		this.dart.removeEventListener('itemComplete', this.onTweenItemComplete, this);
		this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
		this.dart.addEventListener('itemComplete', this.onTweenItemComplete, this);
	}

	private onTweenItemComplete(): void {
		this.img_touch.touchEnabled = true;
		if (!GlobalData.checkType) {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
		}
	}

	private touch(): void {
		this.img_touch.touchEnabled = false;
		game.SoundUtils.getInstance().playHitSound(7);
		this.dart.play(0);
		if (GlobalData.checkType) {
			game.TimeGame.getInstance().addTouch(this.getName());
		} else {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
		}
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
	}

	public getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	private getRandX(): number {
		let num: number = Math.floor(Math.random() * 400) - 80;
		return num;
	}

	private getRandY(): number {
		let num: number = Math.floor(Math.random() * 653 + 247);
		return num;
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 3) {
			game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		}
		return;
	}

	public setScale(scaleNum: number): void {
		this.scaleX = scaleNum;
		this.scaleY = scaleNum;
	}

	// public setGameType(): void {
		// if (GlobalData.isChangePos) {
		// 	this.bottom = GlobalData.positionNum;
		// }
		// return;
	// }

}