/** 竖墙 */
class CommonRoad extends eui.Component implements eui.UIComponent {

	public img_touch: eui.Image;
	private nameStr: string = "";
	private ani: egret.MovieClip;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonRoadSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private loadComplete(): void {
		this.removeChildren();
		this.ani = Global.createMoive("wallS", "broken", -175, -15);
		this.addChild(this.ani);
		this.ani.frameRate = 25;
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.ani.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
			this.ani.gotoAndStop(1);
			this.touchEnabled = true;
			if (!GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
			}
		}, this);
		this.scaleX = this.scaleY = GameShowData.road_Scale;
		this.horizontalCenter = 0;
		this.bottom = GameShowData.road_Y;
	}

	private remove(): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private touch(): void {
		this.touchEnabled = false;
		game.SoundUtils.getInstance().playHitSound(10);
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

	private getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 1) {
			this.bottom += 5;
		} else if (posNum == 2) {
			this.bottom -= 5;
		} else if (posNum == 3) {
			GameShowData.road_Y = this.bottom;
			GameShowData.road_Scale = this.scaleX;
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
		if (GameShowData.road_bool) {
			this.bottom = GameShowData.road_Y;
			this.scaleX = this.scaleY = GameShowData.road_Scale;
		}
	}

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.road_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}