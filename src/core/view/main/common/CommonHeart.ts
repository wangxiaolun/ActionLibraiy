/** 心形目标 */
class CommonHeart extends eui.Component implements eui.UIComponent {

	private nameStr: string = "";
	public img_touch: eui.Image;
	public heart: egret.tween.TweenGroup;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonHeartSkin";
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
		this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
		this.heart.removeEventListener('complete', this.onTweenGroupComplete, this);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
		this.scaleX = this.scaleY = GameShowData.heart_Scale
		this.horizontalCenter = 0;
		this.verticalCenter = GameShowData.heart_Y;
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
		this.heart.addEventListener('complete', this.onTweenGroupComplete, this);
	}

	private onTweenGroupComplete(): void {
		this.img_touch.touchEnabled = true;
		if (!GlobalData.checkType) {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
		}
	}

	private touch(): void {
		this.img_touch.touchEnabled = false;
		game.SoundUtils.getInstance().playHitSound(3);
		this.heart.play(0);
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
			GameShowData.heart_Y = this.verticalCenter;
			GameShowData.heart_Scale = this.scaleX;
			this.changePos();
		} else if (posNum == 4) {
			this.verticalCenter = GameShowData.heart_Y;
			this.scaleX = this.scaleY = GameShowData.heart_Scale;
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
		if (GameShowData.heart_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}