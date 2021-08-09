module loading {
    export class LoadingUI extends eui.UILayer {

        private loadingBg: egret.Bitmap;
        private loadingPro: egret.Bitmap;
        private textField: eui.Label;

        private showLabel: string = "Loading...";

        private cirImg: egret.Bitmap;
        private proLabel: egret.TextField;

        private static instance: LoadingUI;

        public static getInstance(): LoadingUI {
            if (!this.instance) {
                this.instance = new LoadingUI();
            }
            return this.instance;
        }

        public constructor() {
            super();
            GlobalData.pageIndex = 4;
            this.addLoading();
        }


        public addLoading(): void {
            var bgLoader: egret.ImageLoader = new egret.ImageLoader;
            bgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
            bgLoader.load("resource/images/loading/bg1.png");
        }

        private imgLoadHandler(evt: egret.Event): void {
            let loader: egret.ImageLoader = <egret.ImageLoader>evt.target;
            //获取加载到的纹理对象
            let bitmapData: egret.BitmapData = loader.data;
            //创建纹理对象
            let texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            let bgImg: egret.Bitmap = new egret.Bitmap(texture);
            //创建 Bitmap 进行显示
            this.addChild(bgImg);
            let cirLoader: egret.ImageLoader = new egret.ImageLoader;
            cirLoader.once(egret.Event.COMPLETE, this.cirLoadHandler, this);
            cirLoader.load("resource/images/loading/loadingCircle.png");
        }

        private cirLoadHandler(evt: egret.Event): void {
            let cirLoader: egret.ImageLoader = <egret.ImageLoader>evt.target;
            //获取加载到的纹理对象
            let bitmapData: egret.BitmapData = cirLoader.data;
            //创建纹理对象
            let texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            this.cirImg = new egret.Bitmap(texture);
            //创建 Bitmap 进行显示
            this.addChild(this.cirImg);
            this.cirImg.x = (1920 - this.cirImg.width) / 2;
            this.cirImg.y = (1080 - this.cirImg.height) / 2;
            this.cirImg.scaleX = 5;
            this.cirImg.scaleY = 5;
            this.cirImg.anchorOffsetX = this.cirImg.width / 2;
            this.cirImg.anchorOffsetY = this.cirImg.height / 2;

            this.createLoad();
            this.createLabel();
            this.addEventListener(egret.TimerEvent.ENTER_FRAME, this.testRotatinBg, this);
        }

        private createLoad(): void {
            let proBgLoader: egret.ImageLoader = new egret.ImageLoader;
            let proLoader: egret.ImageLoader = new egret.ImageLoader;
            proBgLoader.once(egret.Event.COMPLETE, this.bgComplete, this);
            proLoader.once(egret.Event.COMPLETE, this.proComplete, this);
            proBgLoader.load("resource/images/loading/PreLoadingBarBg.png");
            proLoader.load("resource/images/loading/PreLoadingBar.png");
        }

        private bgComplete(evt: egret.Event): void {
            let proBgLoader: egret.ImageLoader = <egret.ImageLoader>evt.target;
            //获取加载到的纹理对象
            let bitmapData: egret.BitmapData = proBgLoader.data;
            //创建纹理对象
            let texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            this.loadingBg = new egret.Bitmap(texture);
            //创建 Bitmap 进行显示
            this.addChild(this.loadingBg);
            this.loadingBg.width = GameConfig.curWidth();
            this.loadingBg.x = 0;
            this.loadingBg.y = GameConfig.curHeight() - this.loadingBg.height;
        }

        private proComplete(evt: egret.Event): void {
            let proLoader: egret.ImageLoader = <egret.ImageLoader>evt.target;
            //获取加载到的纹理对象
            let bitmapData: egret.BitmapData = proLoader.data;
            //创建纹理对象
            let texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            this.loadingPro = new egret.Bitmap(texture);
            //创建 Bitmap 进行显示
            this.addChild(this.loadingPro);
            this.loadingPro.width = 0;
            this.loadingPro.x = 0;
            this.loadingPro.y = GameConfig.curHeight() - this.loadingPro.height;
        }

        private testRotatinBg(): void {
            this.cirImg.rotation += 1;
        }

        private createLabel(): void {
            var letterText: egret.TextField;
            var w: number = 800;
            var offsetX: number = GameConfig.curWidth() - w >> 1;
            for (var i: number = 0, len: number = this.showLabel.length; i < len; ++i) {
                //从"LayaBox"字符串中逐个提出单个字符创建文本
                letterText = this.createLetter(this.showLabel.charAt(i), i);
                letterText.x = w / len * i + offsetX;
                //文本的初始y属性
                letterText.y = 900;
                //对象letterText属性y从缓动目标的100向初始的y属性300运动，每次执行缓动效果需要3000毫秒，缓类型采用elasticOut函数方式，延迟间隔i*100毫秒执行。
                this.startTween(letterText, i * 150);
            }
            egret.setInterval(() => {
                this.getTween();
            }, this, 2000);
            NativeApi.sendToNativeFun(3);
        }

        private getTween(): void {
            for (var i: number = 0, len: number = this.showLabel.length; i < len; ++i) {
                let target: egret.TextField = this.getChildByName("label" + i) as egret.TextField;
                this.startTween(target, i * 150);
            }
        }

        private startTween(target: egret.TextField, waitTime: number): void {
            egret.Tween.get(target).wait(waitTime).to({ y: 800 }, 200).to({ y: 900 }, 200, egret.Ease.elasticOut);
        }

        //创建单个字符文本，并加载到舞台
        private createLetter(char: string, index: number): egret.TextField {
            var letter: egret.TextField = new egret.TextField();
            letter.text = char;
            letter.textColor = 0xff0000;
            letter.fontFamily = "Microsoft YaHei";
            letter.size = 100;
            letter.name = "label" + index;
            this.addChild(letter);
            return letter;
        }

        public changeLabel(current: number, total: number): void {
            var rate: number = Math.round((current / total) * 100);
            if (this.loadingBg) {
                let w: number = this.loadingBg.width * (rate / 100);
                this.loadingPro.x = 0;
                this.loadingPro.width = w;
            }
        }

        public removeSelf(): void {
            if (this && this.parent) {
                this.parent.removeChild(this);
            }
        }

    }
}