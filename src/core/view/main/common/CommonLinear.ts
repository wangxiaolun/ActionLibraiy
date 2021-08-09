/** 条形目标 */
class CommonLinear extends eui.Component implements eui.UIComponent {

	public img_touch: eui.Image;
	private nameStr: string = "";

	private scaleAni: egret.tween.TweenGroup;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonLinearSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private loadComplete(): void {
		this.scaleX = this.scaleY = GameShowData.linear_Scale;
		this.horizontalCenter = 0;
		this.verticalCenter = GameShowData.linear_Y;
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.scaleAni.addEventListener("itemComplete", this.playComplete, this);
	}

	private remove(): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		egret.Tween.removeTweens(this);
		this.scaleAni.removeEventListener("itemComplete", this.playComplete, this);
		this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private touch(e: egret.Event): void {
		this.img_touch.touchEnabled = false;
		this.initShow();
		game.SoundUtils.getInstance().playHitSound(6);
		// 发送点击事件回主页
		if (GlobalData.checkType) {
			game.TimeGame.getInstance().addTouch(this.getName());
		} else {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
		}
	}

	private initShow(): void {
		egret.Tween.removeTweens(this);
		let angle: number = Math.floor(Math.random() * 360);
		egret.Tween.get(this).to({ rotation: angle }, 800, egret.Ease.sineInOut).call(() => {
			egret.Tween.removeTweens(this);
			this.img_touch.touchEnabled = true;
		}, this);
		this.scaleAni.play(0);
	}

	private playComplete(): void {
		if (!GlobalData.checkType) {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
		}
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
	}

	public getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 1) {
			this.verticalCenter-=5;
		} else if (posNum == 2) {
			this.verticalCenter+=5;
		} else if (posNum == 3) {
			GameShowData.linear_Scale = this.scaleX;
			GameShowData.linear_Y = this.verticalCenter;
			this.changePos();
		} else if (posNum == 4) {
			this.scaleX = this.scaleY = GameShowData.linear_Scale;
			this.verticalCenter = GameShowData.linear_Y;
		} else if (posNum == 5) {  //缩小
			if (this.scaleX - 0.1 < 0.1) {
				this.scaleX = this.scaleY = 0.1;
			} else {
				this.scaleX = this.scaleY = this.scaleX - 0.1;
			}
		} else if (posNum == 6) {  //放大
			if (this.scaleX + 0.1 > 1.5) {
				this.scaleX = this.scaleY = 1.5;
			} else {
				this.scaleX = this.scaleY = this.scaleX + 0.1;
			}
		}
	}

	// public setGameType(): void {
	// 	if (GlobalData.isChangePos) {
	// 		this.bottom = GlobalData.positionNum;
	// 		this.scaleX = this.scaleY = GlobalData.scaleNum;
	// 	}
	// }

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.linear_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}

}