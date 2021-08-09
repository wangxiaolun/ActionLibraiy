/** 三角形目标 */
class CommonTriangle extends eui.Component implements eui.UIComponent {

	public img_touch: eui.Image;
	private nameStr: string = "";
	public triangle: egret.tween.TweenGroup;
	private angleArr: Array<number> = [0, 120, 240];

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonTriangleSkin";
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
		// egret.Tween.removeTweens(this.img_touch);
		this.triangle.removeEventListener('complete', this.onTweenGroupComplete, this);
		this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
		this.scaleX = this.scaleY = GameShowData.triangle_Scale;
		this.horizontalCenter = 0;
		this.verticalCenter = GameShowData.triangle_Y;
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this)
		this.triangle.addEventListener('complete', this.onTweenGroupComplete, this);
	}

	private onTweenGroupComplete(): void {
		this.img_touch.touchEnabled = true;
		if (!GlobalData.checkType) {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
		}
	}

	private touch(): void {
		this.img_touch.touchEnabled = false;
		game.SoundUtils.getInstance().playHitSound(8);
		this.triangle.play(0);
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
			this.verticalCenter -= 5;
		} else if (posNum == 2) {
			this.verticalCenter += 5;
		} else if (posNum == 3) {
			GameShowData.triangle_Scale = this.scaleX;
			GameShowData.triangle_Y = this.verticalCenter;
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
		if (GameShowData.triangle_bool) {
			this.scaleX = this.scaleY = GameShowData.triangle_Scale;
			this.verticalCenter = GameShowData.triangle_Y;
		}
	}

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.triangle_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}


}