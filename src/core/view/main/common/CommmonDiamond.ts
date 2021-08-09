/** 战神 */
class CommmonDiamond extends eui.Component implements eui.UIComponent {

	private nameStr: string = "";
	private ani: egret.MovieClip;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommmonDiamondSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private remove(event: egret.Event): void {
		this.removeChildren();
		if (this && this.parent) {
			this.parent.removeChild(this);
		}
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
		this.removeChildren();
		this.ani = Global.createMoive("ani_diamon", "Battle-rope", -163, -90);
		this.addChild(this.ani);
		this.ani.frameRate = 80;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.ani.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
			this.ani.gotoAndStop(1);
			this.touchEnabled = true;
			if (!GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
			}
		}, this);
		this.scaleX = this.scaleY = GameShowData.diamon_Scale;
		if (GlobalData.gameNeedData.isHasPower) {
			this.horizontalCenter = -40;
		} else {
			this.horizontalCenter = 0;
		}
		this.bottom = GameShowData.diamon_Y;
	}

	private touch(): void {
		this.touchEnabled = false;
		game.SoundUtils.getInstance().playHitSound(1);
		this.ani.gotoAndPlay(1, 1);
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
			if (this.bottom + 5 > 1920 - this.height) {
				this.bottom = 1080 - this.height;
			} else {
				this.bottom += 5;
			}
		} else if (posNum == 2) {
			if (this.bottom - 5 < 0) {
				this.bottom = 0;
			} else {
				this.bottom -= 5;
			}
		} else if (posNum == 3) {
			GameShowData.diamon_Y = this.bottom;
			GameShowData.diamon_Scale = this.scaleX;
			this.changePos();
		} else if (posNum == 4) {
			this.scaleX = this.scaleY = GameShowData.diamon_Scale;
			this.bottom = GameShowData.diamon_Y;
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
		if (GameShowData.diamon_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}