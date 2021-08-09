/** 哑铃 */
class CommonDumbbel extends eui.Component implements eui.UIComponent {

	public img_touch: eui.Image;

	public dumbbel: egret.tween.TweenGroup;
	private nameStr: string = "";

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.skinName = "CommonDumbbelSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private loadComplete(): void {
		this.scaleX = this.scaleY = GameShowData.dumbbel_Scale;
		this.horizontalCenter = 0;
		this.verticalCenter = GameShowData.dumbbel_Y;
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.dumbbel.addEventListener(egret.Event.COMPLETE, this.onTweenGroupComplete, this);
	}

	private onTweenGroupComplete(): void {
		if (!GlobalData.checkType) {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
		}
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
	}

	private getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	private remove(): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.dumbbel.removeEventListener(egret.Event.COMPLETE, this.onTweenGroupComplete, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private outNum: number = 0;
	private touch(event: egret.TouchEvent): void {
		this.img_touch.touchEnabled = false;
		this.outNum = egret.setTimeout(() => {
			this.img_touch.touchEnabled = true;
			egret.clearTimeout(this.outNum);
		}, this, 900);
		game.SoundUtils.getInstance().playHitSound(9);
		this.dumbbel.play(0);
		// 传递事件回主页
		if (GlobalData.checkType) {
			game.TimeGame.getInstance().addTouch(this.getName());
		} else {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
		}
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 1) {
			this.verticalCenter -= 5;
		} else if (posNum == 2) {
			this.verticalCenter += 5;
		} else if (posNum == 3) {
			GameShowData.dumbbel_Y = this.verticalCenter;
			GameShowData.dumbbel_Scale = this.scaleX;
			this.changePos();
		} else if (posNum == 4) {
			this.setGameType();
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

	public setGameType(): void {
		if (GameShowData.dumbbel_bool) {
			this.verticalCenter = GameShowData.dumbbel_Y;
			this.scaleX = this.scaleY = GameShowData.dumbbel_Scale;
		}
	}

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.dumbbel_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}