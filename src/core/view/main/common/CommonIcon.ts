module ui {
	export class CommonIcon extends eui.Component implements eui.UIComponent {

		public img_icon: eui.Image;
		public label_name: eui.Label;
		private imgLoader: egret.ImageLoader;

		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this)
			this.skinName = "CommonIconSkin";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}

		private complete(): void {
			this.drawCircle();
		}

		public setIconData(playerData: PlayerVO): void {
			this.label_name.text = playerData.playerName;
			if (playerData.playerIcon.indexOf(GlobalData.gameNeedData.channelStr+"Icon_png") != -1) {
				this.img_icon.source = RES.getRes(playerData.playerIcon);
			} else {
				this.imgLoader = new egret.ImageLoader();
				this.imgLoader.crossOrigin = "anonymous";
				this.imgLoader.load(playerData.playerIcon);
				this.imgLoader.once(egret.Event.COMPLETE, (evt: egret.Event) => {
					if (evt.currentTarget.data) {
						let texture = new egret.Texture();
						texture.bitmapData = evt.currentTarget.data;
						this.img_icon.texture = texture;
					}
				}, this);
			}
		}

		private drawCircle(): void {
			var shape: egret.Shape = new egret.Shape();
			shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
			shape.graphics.lineStyle(1, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
			shape.graphics.drawRoundRect(0, 0, 170, 170, 85, 85);
			shape.graphics.endFill();
			this.addChildAt(shape, 0);
			this.img_icon.mask = shape;
		}
	}
}