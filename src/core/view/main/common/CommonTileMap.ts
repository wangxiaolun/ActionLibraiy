class CommonTileMap extends eui.Component implements eui.UIComponent {
	public group_container: eui.Group;
	public img_touch: eui.Image;

	private nameStr: string = "";
	private ani: egret.MovieClip;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonTileMapSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private loadComplete(): void {
		this.group_container.removeChildren();
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		this.ani = Global.createMoive("roadg", "roadg", -600, -450);
		this.ani.scaleX = this.ani.scaleY = 0.9;
		this.group_container.addChild(this.ani);
		this.ani.addEventListener(egret.Event.COMPLETE, (e: egret.Event) => {
			this.ani.gotoAndStop(1);
			if(!GlobalData.checkType){
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
			}
		}, this);
		this.scaleX = this.scaleY = GameShowData.tilemap_Scale;
		this.horizontalCenter = 0;
		this.bottom = GameShowData.tilemap_Y;
	}

	private touch(event: egret.TouchEvent): void {
		this.img_touch.touchEnabled = false;
		egret.setTimeout(()=>{
			this.img_touch.touchEnabled = true;
		},this,1000);
		game.SoundUtils.getInstance().playHitSound(14);
		this.ani.gotoAndPlay(1, 1);
		if (GlobalData.checkType) {
			game.TimeGame.getInstance().addTouch(this.getName());
		} else {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
		}
	}

	// private onTweenGroupComplete(): void {
	// 	this.img_circle.touchEnabled = true;
	// 	if (!GlobalData.checkType) {
	// 		if (this.img_finish.visible) {
	// 			egret.setTimeout(() => {
	// 				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
	// 			}, this, 1000);
	// 		} else {
	// 			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
	// 		}
	// 	}
	// }

	public setFinishShow(isShow: boolean): void {
		// this.img_finish.visible = isShow;
		// this.img_circle.visible = !isShow;
	}

	private remove(): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
	}

	public getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 1) {
			this.bottom += 5;
		} else if (posNum == 2) {
			if (this.bottom - 5 < 0) {
				this.bottom = 0;
			} else {
				this.bottom -= 5;
			}
		} else if (posNum == 3) {
			GameShowData.tilemap_Y = this.bottom;
			GameShowData.tilemap_Scale = this.scaleX;
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
		if (GameShowData.tilemap_bool) {
			this.bottom = GameShowData.tilemap_Y;
			this.scaleX = this.scaleY = GameShowData.tilemap_Scale;
		}
	}

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.tilemap_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}