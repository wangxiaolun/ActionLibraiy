
/** 雨滴 */
class CommonRain extends eui.Component implements eui.UIComponent {

	public grou_container: eui.Group;
	public img_rain1: eui.Image;
	public img_rain2: eui.Image;
	public img_hit1: eui.Image;
	public img_hit2: eui.Image;

	private nameStr: string = "";
	private dropTimer: egret.Timer;

	private rain_left: CommonRainItem;
	private rain_right: CommonRainItem;

	private timeIndex: number = 0;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
		this.skinName = "CommonRainSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
		this.top = 20;
		this.horizontalCenter = 50;
		this.startGame();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
	}

	private loadComplete(): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
	}

	private createRain(): CommonRainItem {
		let commonBall: CommonRainItem = DisplayObjectPool.getInstance().pop(CommonRainItem);
		commonBall.touchEnabled = true;
		this.grou_container.addChild(commonBall);
		let nameStr: string = egret.getTimer() + Math.floor(Math.random() * 100) + "";
		commonBall.name = nameStr;
		return commonBall;
	}

	public startGame(): void {
		this.stopGame();
		if (!this.dropTimer) {
			this.dropTimer = new egret.Timer(2000);
		}
		this.dropTimer.addEventListener(egret.TimerEvent.TIMER, () => {
			this.rain_left = this.createRain();
			this.rain_left.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
			this.rain_left.horizontalCenter = -125;
			this.timeIndex = egret.setTimeout(() => {
				this.rain_right = this.createRain();
				this.rain_right.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touch, this);
				this.rain_right.horizontalCenter = 125;
			}, this, 1000);
		}, this);
		this.dropTimer.start();
	}

	public stopGame(): void {
		if (this.dropTimer) {
			this.dropTimer.stop();
			this.dropTimer = null;
		}
		egret.clearTimeout(this.timeIndex);
		this.grou_container.removeChildren();
	}

	private remove(): void {
		this.stopGame();
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove, this);
		if (this.parent) {
			this.parent.removeChild(this);
		}
	}

	public pauseGame(): void {
		if (this.dropTimer) {
			this.dropTimer.stop();
		}
		egret.clearTimeout(this.timeIndex);
		for (let i: number = 0; i < this.grou_container.numChildren; i++) {
			let item: CommonRainItem = this.grou_container.getChildAt(i) as CommonRainItem;
			if (item) {
				item.setTweenStatus(false);
			}
		}
	}

	public reStart(): void {
		for (let i: number = 0; i < this.grou_container.numChildren; i++) {
			let item: CommonRainItem = this.grou_container.getChildAt(i) as CommonRainItem;
			if (item) {
				item.setTweenStatus(true);
			}
		}
		if (this.dropTimer) {
			this.dropTimer.start();
		}
	}



	public setName(nameStr: string): void {
		this.name = nameStr;
		this.nameStr = nameStr;
	}

	private getName(): number {
		return parseInt(this.nameStr.charAt(this.nameStr.length - 1));
	}

	private touch(event: egret.TouchEvent): void {
		let curTarget: CommonRainItem = event.currentTarget;
		if (this.hitTest(this.img_hit1, curTarget) || this.hitTest(this.img_hit2, curTarget)) {
			curTarget.touchEnabled = false;
			event.target.touchEnabled = false;
			egret.Tween.removeTweens(curTarget);
			game.SoundUtils.getInstance().playHitSound(11);
			egret.Tween.get(curTarget).to({ scaleX: 2, scaleY: 2, alpha: 0 }, 500, egret.Ease.sineIn).call(() => {
				egret.Tween.removeTweens(curTarget);
				if (curTarget && curTarget.parent) {
					curTarget.parent.removeChild(curTarget);
				}
				if (!GlobalData.checkType) {
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task, this.getName());
				}
			}, this);
			// 向主页发送事件
			if (GlobalData.checkType) {
				game.TimeGame.getInstance().addTouch(this.getName());
			} else {
				game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_TOUCH_Task_Show, this.getName());
			}
		} else {
			return;
		}
	}

	private hitTest(obj1: egret.DisplayObject, obj2: egret.DisplayObject): boolean {
		if (obj1 == undefined) { return false; }
		if (obj2 == undefined) { return false; }
		var rect1: egret.Rectangle = obj1.getBounds();
		var rect2: egret.Rectangle = obj2.getBounds();
		rect1.x = obj1.x;
		rect1.y = obj1.y;
		rect2.x = obj2.x;
		rect2.y = obj2.y;
		return rect1.intersects(rect2);
	}

	public setPos(posNum: number, index: number): void {
		if (posNum == 3) {
			game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_TRIM);
		}
	}

	public setGameType(): void {
		return;
	}
}