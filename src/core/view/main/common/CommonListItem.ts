class CommonListItem extends eui.ItemRenderer {

    public vo: PlayerVO;
    public img_icon: eui.Image;
    private imgLoader: egret.ImageLoader;
    private shape: egret.Shape;
    private curLoadStr: string;

    public constructor() {
        super();
        this.skinName = "CommonListItemSkin";
        this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
    }

    private loadComplete(): void {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
    }

    private drawCircle(): void {
        this.shape = new egret.Shape();
        this.shape.graphics.beginFill(0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100), 1);
        this.shape.graphics.lineStyle(1, 0xff0000 + Math.floor(Math.random() * 100) * (0xffffff / 100));
        this.shape.graphics.drawRoundRect(0, 0, 85, 85, 32, 32);
        this.shape.graphics.endFill();
        this.addChildAt(this.shape, 0);
        this.img_icon.mask = this.shape;
    }

    public set skinUrl(imgurl: string) {
        if (imgurl) {
            if (imgurl.indexOf("checkAdd_png") != -1 || imgurl.indexOf(GlobalData.gameNeedData.channelStr+"Icon_png") != -1) {
                this.img_icon.source = RES.getRes(imgurl);
                this.drawCircle();
            } else {
                this.curLoadStr = imgurl;
                this.imgLoader = new egret.ImageLoader();
                this.imgLoader.crossOrigin = "anonymous";
                this.imgLoader.load(imgurl);// 去除链接中的转义字符‘\’
                this.imgLoader.once(egret.Event.COMPLETE, this.loadImgComplete, this);
                this.imgLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadImgError, this);
            }
        }
        this.addEventListener(eui.UIEvent.COMPLETE, this.removed, this);
    }

    private loadImgComplete(evt: egret.Event): void {
        if (evt.currentTarget.data) {
            let texture = new egret.Texture();
            texture.bitmapData = evt.currentTarget.data;
            this.img_icon.texture = texture;
            this.drawCircle();
        }
    }

    private loadImgError(evt: egret.Event): void {
        this.imgLoader.load(this.curLoadStr);
    }

    public set dataVO(playerVo: PlayerVO) {
        this.vo = playerVo;
    }

    public get dataVO(): PlayerVO {
        return this.vo;
    }

    private removed(): void {
        if (this.shape && this.shape.parent) {
            this.shape.parent.removeChild(this);
            this.shape = null;
            this.img_icon.mask = null;
        }
        if (this.imgLoader) {
            this.imgLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadImgError, this);
        }
        this.removeEventListener(eui.UIEvent.COMPLETE, this.removed, this);
    }
}
