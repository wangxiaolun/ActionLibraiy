class BaseRenderer extends eui.ItemRenderer {

	protected isCreate: boolean = false;
	private addEventBtnArr: Array<any>;//添加事件的按钮数组
	private effectArr: Array<number>;//添加按钮特效的hashCode数组
	protected readonly waitTime: number = 1000;//按钮点击等待的时间

	public constructor() {
		super();
	}

    protected partAdded(partName:string, instance:any):void {
        super.partAdded(partName, instance);
    }

	protected createChildren() {
		super.createChildren();
		this.isCreate = true;
		this.initData();
		this.initUI();
		this.initListener();
    }

    protected dataChanged() {
		super.dataChanged();
		this.resetBtnScale();
	}

	//滚动列表和动画冲突的问题
	private resetBtnScale() {
		if (!this.addEventBtnArr || !this.effectArr) return;
		this.addEventBtnArr.forEach((btn, index) => {
			if (this.effectArr.indexOf(btn.hashCode) != -1 && btn.scaleX != 1) {
				btn.scaleX = btn.scaleY = 1;
			}
		}, this);
	}
	
	protected initData(): void{
		this.addEventBtnArr = [];
		this.effectArr = [];
	}

	protected initUI(): void{}

	protected initListener(): void{ }

	protected removeListener(): void{
		while (this.addEventBtnArr && this.addEventBtnArr.length > 0) {
			let btn: any = this.addEventBtnArr.shift();
			if (btn) this.removeBtnClick(btn);
		}
	}

	/**
	 * 添加按钮点击事件
	 * @param btn 要添加事件的对象
	 * @param isEffect 是否启用特效
	 */
	protected addBtnClick(btn: egret.DisplayObject, isEffect:boolean = false): void{
		if (btn && this.addEventBtnArr.indexOf(btn) == -1) {
			btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.addEventBtnArr.push(btn);
			if (isEffect) {
				this.effectArr.push(btn.hashCode);
				btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
				btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
				btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
				const w: number = btn.width;
				const h: number = btn.height;
				const w_half: number = w >> 1;
				const h_half: number = h >> 1;
				btn.x += w_half - btn.anchorOffsetX;
				btn.y += h_half - btn.anchorOffsetY;
				btn.anchorOffsetX = w_half;
				btn.anchorOffsetY = h_half;
			}
		}
	}

	protected removeBtnClick(btn: any): void{
		if (!btn) return;
		let index: number = this.addEventBtnArr.indexOf(btn);
		if (index != -1) {
			btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.addEventBtnArr.splice(index, 1);
		}
		index = this.effectArr.indexOf(btn.hashCode);
		if (index != -1) {
			egret.Tween.removeTweens(btn);
			btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
			btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
			btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
			this.effectArr.splice(index, 1);
		}
	}

	protected onClick(evt: egret.TouchEvent, waitTime: number = this.waitTime): void{
		const btn: any = evt.currentTarget;
		// if (waitTime > 0) {
		// 	btn.touchEnabled = false;
		// }
	 }

	protected onBtnEffect(evt: egret.TouchEvent): void{
		const btn: any = evt.currentTarget;
		egret.Tween.removeTweens(btn);
		if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
			egret.Tween.get(btn).to({ scaleX: 0.8, scaleY: 0.8 }, 200, egret.Ease.quadOut);
		} else if (evt.type == egret.TouchEvent.TOUCH_END || evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
			egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
		}
	}

	/**
	 * 更新列表
	 * @param list:eui.list
	 * @param arr:Array<any>
	 */
	protected updateList(list:eui.List,arr:Array<any>): void{
		let arrC: eui.ArrayCollection = <eui.ArrayCollection>list.dataProvider;
		if (!arrC) arrC = new eui.ArrayCollection();
		arrC.source = arr;
		list.dataProvider = arrC;
	}
	
	public updateView(...param): void{ }
	
	public destroy(): void{
		this.effectArr = null;
		this.removeListener();
	}

}