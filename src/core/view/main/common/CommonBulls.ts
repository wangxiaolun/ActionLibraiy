/** 圆形目标 */
class CommonBulls extends eui.Component implements eui.UIComponent {

	public img_touch: eui.Image;
	private nameStr: string = "";

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonBullsSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}

	protected partRemoved(partName: string, instance: any): void {
		super.partRemoved(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private remove(event: egret.Event): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		egret.Tween.removeTweens(this);
		this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
		this.scaleX = this.scaleY = GameShowData.bull_Scale;
		this.horizontalCenter = 0;
		this.verticalCenter = GameShowData.bull_Y;
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
	}

	private touch(): void {
		this.img_touch.touchEnabled = false;
		game.SoundUtils.getInstance().playHitSound(5);
		egret.Tween.removeTweens(this);
		egret.Tween.get(this).to({ scaleX: 0, scaleY: 0, alpha: 0 }, 200, egret.Ease.sineIn).call(() => {
			egret.Tween.get(this).to({ scaleX: 1, scaleY: 1, alpha: 1 }, 200, egret.Ease.backInOut).call(() => {
				this.img_touch.touchEnabled = true;
				if (!GlobalData.checkType) {
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
				}
			}, this);
		}, this);
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

	public setPos(posNum: number, index: number): void {
		if (posNum == 1) {
			this.verticalCenter-=5;
		} else if (posNum == 2) {
			this.verticalCenter+=5;
		} else if (posNum == 3) {
			GameShowData.bull_Scale = this.scaleX;
			GameShowData.bull_Y = this.verticalCenter;
			this.changePos();
		} else if (posNum == 4) {
			this.verticalCenter = GameShowData.bull_Y;
			this.scaleX = this.scaleY = GameShowData.bull_Scale;
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
		if (GameShowData.bull_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}

}