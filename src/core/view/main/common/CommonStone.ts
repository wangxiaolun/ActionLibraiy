/** 石头目标 */
class CommonStone extends eui.Component implements eui.UIComponent {

	public stone1: CommonStoneItem;
	public stone2: CommonStoneItem;
	public stone3: CommonStoneItem;
	public stone4: CommonStoneItem;
	public stone5: CommonStoneItem;
	public stone6: CommonStoneItem;
	public stone7: CommonStoneItem;
	public stone8: CommonStoneItem;
	public stone9: CommonStoneItem;

	private nameStr: string = "";
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonStoneSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private loadComplete(): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
	}

	private initData(): void {
		let ranNum: number = Math.floor(Math.random() * 9 + 1);
		for (let i: number = 1; i < 10; i++) {
			let stone: CommonStoneItem = this.getChildByName("stone" + i) as CommonStoneItem;
			if (stone) {
				stone.setImgName(this.getName(), i);
				if (i == ranNum) {
					stone.setShow();
				} else {
					stone.setHide();
				}
			}
		}
		this.scaleX = this.scaleY = GameShowData.stone_Scale;
		this.horizontalCenter = 0;
		this.top = GameShowData.stone_Y;
	}

	public randomObj(): void {
		let ranNum: number = Math.floor(Math.random() * 9 + 1);
		let stone: CommonStoneItem = this.getChildByName("stone" + ranNum) as CommonStoneItem;
		if (stone) {
			stone.setShow();
		}
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
		this.initData();
	}

	private getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	private remove(): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 1) {
			if (this.top - 5 < 0) {
				this.top = 0;
			} else {
				this.top -= 5;
			}
		} else if (posNum == 2) {
			this.top += 5;
		} else if (posNum == 3) {
			GameShowData.stone_Y = this.top;
			GameShowData.stone_Scale = this.scaleX;
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
		if (GameShowData.stone_bool) {
			this.top = GameShowData.stone_Y;
			this.scaleX = this.scaleY = GameShowData.stone_Scale;
		}
	}

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.stone_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}