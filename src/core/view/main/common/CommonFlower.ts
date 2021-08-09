/** 花朵 */
class CommonFlower extends eui.Component implements eui.UIComponent {

	private nameStr: string = "";

	public img_flower1: eui.Image;
	public img_flower2: eui.Image;
	public img_flower3: eui.Image;
	public img_flower4: eui.Image;
	public img_touch: eui.Image;

	public flower: egret.tween.TweenGroup;
	public flower2: egret.tween.TweenGroup;
	public flower3: egret.tween.TweenGroup;
	public flower4: egret.tween.TweenGroup;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonFlowerSkin";
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
		this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
		this.removeEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
		this.img_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touCh, this);
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private createCompleteEvent(): void {
		this.scaleX = this.scaleY = GameShowData.flower_Scale;
		this.horizontalCenter = 0;
		this.verticalCenter = GameShowData.flower_Y;
		this.addEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
		this.img_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touCh, this);
		this.flower.addEventListener('complete', this.onTweenGroupComplete, this);
	}

	private onTweenGroupComplete(): void {
		this.img_touch.touchEnabled = true;
		if (!GlobalData.checkType) {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
		}
	}

	private rotationing(): void {
		this.rotation += 3;
	}

	public pauseGame():void{
		this.removeEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
	}

	public reStart():void{
		this.addEventListener(egret.TimerEvent.ENTER_FRAME, this.rotationing, this);
	}

	public touCh(): void {
		this.img_touch.touchEnabled = false;
		game.SoundUtils.getInstance().playHitSound(2);
		this.flower.play(0);
		this.flower2.play(0);
		this.flower3.play(0);
		this.flower4.play(0);
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
		if (posNum == 1) {  //向上移动
			this.verticalCenter -= 5;
		} else if (posNum == 2) {  //向下移动
			this.verticalCenter += 5;
		} else if (posNum == 3) { //保存调整
			GameShowData.flower_Y = this.verticalCenter;
			GameShowData.flower_Scale = this.scaleX;
			this.changePos();
		} else if (posNum == 4) { //保存设置后设置位置
			this.verticalCenter = GameShowData.flower_Y;
			this.scaleX = this.scaleY = GameShowData.flower_Scale;
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

	public setGameType(): void {  //首次加载游戏后设置位置
		// if (GlobalData.isChangePos) {
		// 	this.bottom = GlobalData.positionNum;
		// 	this.scaleX = this.scaleY = GlobalData.scaleNum;
		// }
	}

	private changePos(): void {
		game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		if (GameShowData.flower_bool) {
			if (GlobalData.checkType) {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TIME);
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP_TASK);
			}
		}
	}
}