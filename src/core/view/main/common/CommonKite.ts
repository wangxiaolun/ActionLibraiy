/** 飞镖 */
class CommonKite extends eui.Component implements eui.UIComponent {

	public kit1: CommonKiteItem;
	public kit2: CommonKiteItem;
	public kit3: CommonKiteItem;
	public kit4: CommonKiteItem;
	public kit5: CommonKiteItem;
	public kit6: CommonKiteItem;

	private nameStr: string = "";
	private curArr: Array<number> = [];

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonKiteSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}


	private loadComplete(): void {
		this.scaleX = this.scaleY = GameShowData.kite_Scale;
		this.horizontalCenter = 0;
		this.top = GameShowData.kite_Y;
		for (let i: number = 1; i < 7; i++) {
			let kit: CommonKiteItem = this.getChildByName("kit" + i) as CommonKiteItem;
			if (kit) {
				kit.img_red.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
				kit.setImgName("img" + i);
				kit.setHide();
			}
		}
		this.showObj();
	}

	private showObj(): void {
		this.curArr = [];
		let arr: Array<number> = [1, 2, 3, 4, 5, 6];
		let ranLength: number = Math.floor(Math.random() * 6 + 1);
		while (this.curArr.length < ranLength) {
			let ranNum: number = arr[Math.floor((Math.random() * arr.length))];
			if (this.curArr.indexOf(ranNum) == -1) {
				this.curArr.push(ranNum);
			}
		}
		for (let i: number = 0; i < this.curArr.length; i++) {
			let index: number = this.curArr[i];
			let kit: CommonKiteItem = this.getChildByName("kit" + index) as CommonKiteItem;
			kit.setShow();
		}
	}

	private remove(): void {
		this.curArr = [];
		for (let i: number = 1; i < 7; i++) {
			let kit: CommonKiteItem = this.getChildByName("kit" + i) as CommonKiteItem;
			if (kit) {
				kit.img_red.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
			}
		}
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private touch(event: egret.TouchEvent): void {
		let name: string = event.currentTarget.name;
		let index: number = parseInt(name.charAt(name.length - 1));
		if (this.curArr.indexOf(index) == -1) {
			return;
		}
		game.SoundUtils.getInstance().playHitSound(13);
		let kit: CommonKiteItem = this.getChildByName("kit" + index) as CommonKiteItem;
		kit.setScale();
		for (let i: number = 0; i < this.curArr.length; i++) {
			let forIndx: number = this.curArr[i];
			if (forIndx == index) {
				this.curArr.splice(i, 1);
			}
		}
		if (this.curArr.length <= 0) {
			// 发送事件到主页
			if (GlobalData.checkType) {
				game.TimeGame.getInstance().addTouch(this.getName());
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
			}
			this.showObj();
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
			if (this.top - 5 <= 0) {
				this.top = 0;
			} else {
				this.top -= 5;
			}
		} else if (posNum == 2) {
			this.top += 5;
		} else if (posNum == 3) {
			GameShowData.kite_Y = this.top;
			GameShowData.kite_Scale = this.scaleX;
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
		if (GameShowData.kite_bool) {
			this.scaleX = this.scaleY = GameShowData.kite_Scale;
			this.top = GameShowData.kite_Y;
		}
	}

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.kite_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}