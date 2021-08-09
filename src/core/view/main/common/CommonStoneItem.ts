class CommonStoneItem extends eui.Component implements eui.UIComponent {

	public img_gray: eui.Image;
	public img_red: eui.Image;

	private peoId: number = -1;
	private touchId: number = -1;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		this.skinName = "CommonStoneItemSkin";
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

	private remove(): void {
		this.img_red.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
		egret.Tween.removeTweens(this.img_red);
		if (this.parent) {
			this.parent.removeChild(this);
		}
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	public setHide(): void {
		this.setTouchStatus(false);
		this.img_red.scaleX = 0;
		this.img_red.scaleY = 0;
		this.img_red.alpha = 0;
	}

	public setShow(): void {
		egret.Tween.removeTweens(this.img_red);
		this.img_red.alpha = 0;
		this.img_red.scaleX = 0;
		this.img_red.scaleY = 0;
		egret.Tween.get(this.img_red).to({ alpha: 1, scaleX: 1, scaleY: 1 }, 250, egret.Ease.bounceOut).call(() => {
			egret.Tween.removeTweens(this.img_red);
			this.setTouchStatus(true);
		}, this);
	}

	public setScale(): void {
		this.setTouchStatus(false);
		egret.Tween.removeTweens(this.img_red);
		this.img_red.alpha = 1;
		this.img_red.scaleX = 1;
		this.img_red.scaleY = 1;
		if (!GlobalData.checkType) {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.peoId);
		}
		egret.Tween.get(this.img_red).to({ alpha: 0, scaleX: 0, scaleY: 0 }, 250).call(() => {
			egret.Tween.removeTweens(this.img_red);
			let vo: PreparaVO = DisplayObjectPool.getInstance().pop(PreparaVO);
			vo.type = GlobalData.gameNeedData.actId;
			vo.timeNum = this.peoId;
			if(GlobalData.checkType){
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_TIME_CHANGE, vo);
			}else{
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_TASK_CHANGE, vo);
			}
		}, this);
	}

	public setImgName(peoId: number, touchId: number): void {
		this.peoId = peoId;
		this.touchId = touchId;
		this.img_red.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
	}

	private touch(): void {
		// 向主页发送事件
		if (GlobalData.checkType) {
			game.TimeGame.getInstance().addTouch(this.peoId);
		} else {
			game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.peoId);
		}
		this.setScale();
		game.SoundUtils.getInstance().playHitSound(12);
	}

	public setTouchStatus(bool: boolean): void {
		this.img_red.touchEnabled = bool;
	}
}