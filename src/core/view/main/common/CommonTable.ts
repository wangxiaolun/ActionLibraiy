/** 表格 */
class CommonTable extends eui.Component implements eui.UIComponent {

	public touch_1: CommonTableItem;
	public touch_2: CommonTableItem;
	public touch_3: CommonTableItem;
	public touch_4: CommonTableItem;
	public touch_5: CommonTableItem;
	public touch_6: CommonTableItem;
	public touch_7: CommonTableItem;
	public touch_8: CommonTableItem;
	public touch_9: CommonTableItem;

	private nameStr: string = "";
	private curArr: Array<number> = [];

	private curTouchIndex: number = -1;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonTableSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private remove(event: egret.Event): void {
		if (this.parent) {
			this.parent.removeChild(this);
		}
		for (let i: number = 1; i < 10; i++) {
			let table: CommonTableItem = this.getChildByName("touch_" + i) as CommonTableItem;
			if (table) {
				table.img_top.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
			}
		}
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
		for (let i: number = 1; i < 10; i++) {
			let table: CommonTableItem = this.getChildByName("touch_" + i) as CommonTableItem;
			table.img_top.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
			table.setImg("table_gray_" + i + "_png", "table_red_" + i + "_png");
			table.setName("img_" + i);
			table.setHide();
		}
		this.initShowObj();
		this.scaleX = this.scaleY = GameShowData.tabel_Scale
		this.horizontalCenter = 0;
		this.top = GameShowData.tabel_Y;
	}

	private initShowObj(): void {
		var typeArr: Array<Array<number>> = [[1, 2, 3, 4, 5, 6, 7, 8, 9], [1, 9], [1, 3], [1, 7], [2, 8], [3, 9], [3, 7], [4, 6], [7, 9]];
		let ranNum: number = Math.floor(Math.random() * 9);
		this.curArr = typeArr[ranNum];
		for (let i: number = 0; i < this.curArr.length; i++) {
			let index: number = this.curArr[i];
			let checkTable: CommonTableItem = this.getChildByName("touch_" + index) as CommonTableItem;
			checkTable.setShow();
		}
	}

	public setName(nameStr: string): void {
		this.nameStr = nameStr;
	}

	public getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	private touch(event: egret.Event): void {
		let name: string = event.currentTarget.name;
		let index: number = parseInt(name.substring(name.length - 1));
		if (index == this.curTouchIndex) {
			return;
		}
		game.SoundUtils.getInstance().playHitSound(4);
		this.curTouchIndex = index;
		let curItem: CommonTableItem = this.getChildByName("touch_" + index) as CommonTableItem;
		curItem.setScale();
		for (let i: number = 0; i < this.curArr.length; i++) {
			let targer: number = this.curArr[i];
			if (targer == index) {
				this.curArr.splice(i, 1);
			}
		}
		if (this.curArr.length <= 0) {
			this.curArr.splice(0, this.curArr.length);
			this.initShowObj();
			// 传递点击事件回主页
			if (GlobalData.checkType) {
				game.TimeGame.getInstance().addTouch(this.getName());
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
			}
		}
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 1) {
			if (this.top - 5 <= 0) {
				this.top = 0;
			} else {
				this.top -= 5;
			}
		} else if (posNum == 2) {
			if (this.top + 5 > 1080 - this.height) {
				this.top = 1080 - this.height;
			} else {
				this.top += 5;
			}
		} else if (posNum == 3) {
			GameShowData.tabel_Y = this.top;
			GameShowData.tabel_Scale = this.scaleX;
			this.changePos();
		} else if (posNum == 4) {
			this.top = GameShowData.tabel_Y;
			this.scaleX = this.scaleY = GameShowData.tabel_Scale;
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
		if (GameShowData.tabel_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}