class CommonResultItem extends BaseRenderer {
	public img_rank: eui.Image;
	public img_icon: eui.Image;
	public label_name: eui.Label;
	public label_nums: eui.Label;
	public label_card: eui.Label;
	public label_times: eui.Label;
	public mask_shape: eui.Rect;
	private imgLoader: egret.ImageLoader = null;

	private curplayVo: PlayerVO = null;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
		this.skinName = "CommonResultItemSkin";
	}

	protected initUI(): void {
		super.initUI();
	}

	protected initListener(): void {
		super.initListener();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
	}

	private removed(): void {
		if (this.imgLoader) {
			this.imgLoader.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
			this.imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
		}
		this.imgLoader = null;
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
	}

	public dataChanged() {
		super.dataChanged();
		if (this.data) {
			this.curplayVo = this.data;
			let nameStr: string = "";
			if (this.curplayVo.playerName.length > 6) {
				nameStr = this.curplayVo.playerName.substring(0, 5) + "...";
			} else {
				nameStr = this.curplayVo.playerName;
			}
			this.img_icon.source = "";
			this.label_name.text = nameStr;
			this.label_nums.text = this.curplayVo.playNums + "次";
			this.label_card.text = this.curplayVo.useCard + "kcal";
			if (this.curplayVo.rankNum < 4) {
				this.img_rank.source = RES.getRes("img_rank" + this.curplayVo.rankNum + "_png");
			}
			this.label_times.text = Global.formatTime(this.curplayVo.playTimes, 2);
			if (this.curplayVo.playerIcon.indexOf(GlobalData.gameNeedData.channelStr + "Icon_png") != -1) {
				if (this.imgLoader) {
					this.imgLoader.removeEventListener(egret.Event.COMPLETE, this.loadComplete, this);
					this.imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
				}
				this.imgLoader = null;
				this.img_icon.source = RES.getRes(this.curplayVo.playerIcon);
				this.img_icon.mask = this.mask_shape;
			} else {
				if (!this.imgLoader) {
					this.imgLoader = new egret.ImageLoader();
					this.imgLoader.crossOrigin = "anonymous";
					this.imgLoader.addEventListener(egret.Event.COMPLETE, this.loadComplete, this);
					this.imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadError, this);
				}
				this.imgLoader.load(this.curplayVo.playerIcon);
			}
		}
	}

	private complete(): void {
		this.removeEventListener(eui.UIEvent.COMPLETE, this.complete, this);
	}

	private loadComplete(evt: egret.Event): void {
		if (evt.currentTarget.data) {
			let texture = new egret.Texture();
			texture.bitmapData = evt.currentTarget.data;
			this.img_icon.texture = texture;
			this.img_icon.mask = this.mask_shape;
		}
	}

	private loadError(evt: egret.Event): void {
		this.imgLoader.load(this.curplayVo.playerIcon);
	}

}