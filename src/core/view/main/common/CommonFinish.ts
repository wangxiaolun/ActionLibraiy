class CommonFinish extends eui.Component implements eui.UIComponent {

	public img_icon: eui.Image;
	public label_name: eui.Label;
	public label_tagOne: eui.Label;
	public label_tagType: eui.Label;
	public label_tagTwo: eui.Label;
	private imgLoader: egret.ImageLoader;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
		this.skinName = "CommonFinishSkin";
	}

	private complete(): void {
		// this.drawCircle();
		this.removeEventListener(eui.UIEvent.COMPLETE, this.complete, this);
		this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	public setPlayer(playerVo: PlayerVO): void {
		if (GlobalData.checkType) {
			this.label_tagType.text = "完成次数";
			if (playerVo) {
				// this.img_icon.source = RES.getRes(playerVo.playerIcon);
				this.setPlayIcon(playerVo.playerIcon);
				this.label_name.text = playerVo.playerName;
				this.label_tagOne.text = Global.formatTime(playerVo.playTimes, 2);
				this.label_tagTwo.text = playerVo.playNums + "";
			} else {
				this.img_icon.source = "";
				this.label_name.text = "";
				this.label_tagOne.text = "";
				this.label_tagTwo.text = "";
			}
		} else {
			this.label_tagType.text = "完成时间";
			if (playerVo) {
				// this.img_icon.source = RES.getRes(playerVo.playerIcon);
				this.setPlayIcon(playerVo.playerIcon);
				this.label_name.text = playerVo.playerName;
				this.label_tagOne.text = playerVo.playNums + "次";
				this.label_tagTwo.text = Global.formatTime(playerVo.playTimes, 2);
			} else {
				this.img_icon.source = "";
				this.label_name.text = "";
				this.label_tagOne.text = "0次";
				this.label_tagTwo.text = Global.formatTime(0, 2);
			}
		}
	}

	private shape: egret.Shape;
	private drawCircle(): void {
		this.shape = new egret.Shape();
		this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
		this.shape.graphics.lineStyle(1, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
		this.shape.graphics.drawRoundRect(115, 0, 170, 170, 85, 85);
		this.shape.graphics.endFill();
		this.addChildAt(this.shape, 0);
		this.img_icon.mask = this.shape;
	}

	private setPlayIcon(imgurl: string): void {
		if (imgurl.indexOf("checkAdd_png") != -1 || imgurl.indexOf(GlobalData.gameNeedData.channelStr + "Icon_png") != -1) {
			this.img_icon.source = RES.getRes(imgurl);
		} else {
			this.imgLoader = new egret.ImageLoader();
			this.imgLoader.crossOrigin = "anonymous";
			this.imgLoader.load(imgurl);// 去除链接中的转义字符‘\’        
			this.imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
				if (evt.currentTarget.data) {
					let texture = new egret.Texture();
					texture.bitmapData = evt.currentTarget.data;
					this.img_icon.texture = texture;
				}
			}, this);
		}
		this.drawCircle();
	}

	private removed(): void {
		if (this.shape && this.shape.parent) {
			this.shape.parent.removeChild(this.shape);
		}
		this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removed, this);
	}
}