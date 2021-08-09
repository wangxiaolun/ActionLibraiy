var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var loading;
(function (loading) {
    var LoadingUI = (function (_super) {
        __extends(LoadingUI, _super);
        function LoadingUI() {
            var _this = _super.call(this) || this;
            _this.showLabel = "Loading...";
            GlobalData.pageIndex = 4;
            _this.addLoading();
            return _this;
        }
        LoadingUI.getInstance = function () {
            if (!this.instance) {
                this.instance = new LoadingUI();
            }
            return this.instance;
        };
        LoadingUI.prototype.addLoading = function () {
            var bgLoader = new egret.ImageLoader;
            bgLoader.once(egret.Event.COMPLETE, this.imgLoadHandler, this);
            bgLoader.load("resource/images/loading/bg1.png");
        };
        LoadingUI.prototype.imgLoadHandler = function (evt) {
            var loader = evt.target;
            //获取加载到的纹理对象
            var bitmapData = loader.data;
            //创建纹理对象
            var texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            var bgImg = new egret.Bitmap(texture);
            //创建 Bitmap 进行显示
            this.addChild(bgImg);
            var cirLoader = new egret.ImageLoader;
            cirLoader.once(egret.Event.COMPLETE, this.cirLoadHandler, this);
            cirLoader.load("resource/images/loading/loadingCircle.png");
        };
        LoadingUI.prototype.cirLoadHandler = function (evt) {
            var cirLoader = evt.target;
            //获取加载到的纹理对象
            var bitmapData = cirLoader.data;
            //创建纹理对象
            var texture = new egret.Texture();
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
        };
        LoadingUI.prototype.createLoad = function () {
            var proBgLoader = new egret.ImageLoader;
            var proLoader = new egret.ImageLoader;
            proBgLoader.once(egret.Event.COMPLETE, this.bgComplete, this);
            proLoader.once(egret.Event.COMPLETE, this.proComplete, this);
            proBgLoader.load("resource/images/loading/PreLoadingBarBg.png");
            proLoader.load("resource/images/loading/PreLoadingBar.png");
        };
        LoadingUI.prototype.bgComplete = function (evt) {
            var proBgLoader = evt.target;
            //获取加载到的纹理对象
            var bitmapData = proBgLoader.data;
            //创建纹理对象
            var texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            this.loadingBg = new egret.Bitmap(texture);
            //创建 Bitmap 进行显示
            this.addChild(this.loadingBg);
            this.loadingBg.width = GameConfig.curWidth();
            this.loadingBg.x = 0;
            this.loadingBg.y = GameConfig.curHeight() - this.loadingBg.height;
        };
        LoadingUI.prototype.proComplete = function (evt) {
            var proLoader = evt.target;
            //获取加载到的纹理对象
            var bitmapData = proLoader.data;
            //创建纹理对象
            var texture = new egret.Texture();
            texture.bitmapData = bitmapData;
            this.loadingPro = new egret.Bitmap(texture);
            //创建 Bitmap 进行显示
            this.addChild(this.loadingPro);
            this.loadingPro.width = 0;
            this.loadingPro.x = 0;
            this.loadingPro.y = GameConfig.curHeight() - this.loadingPro.height;
        };
        LoadingUI.prototype.testRotatinBg = function () {
            this.cirImg.rotation += 1;
        };
        LoadingUI.prototype.createLabel = function () {
            var _this = this;
            var letterText;
            var w = 800;
            var offsetX = GameConfig.curWidth() - w >> 1;
            for (var i = 0, len = this.showLabel.length; i < len; ++i) {
                //从"LayaBox"字符串中逐个提出单个字符创建文本
                letterText = this.createLetter(this.showLabel.charAt(i), i);
                letterText.x = w / len * i + offsetX;
                //文本的初始y属性
                letterText.y = 900;
                //对象letterText属性y从缓动目标的100向初始的y属性300运动，每次执行缓动效果需要3000毫秒，缓类型采用elasticOut函数方式，延迟间隔i*100毫秒执行。
                this.startTween(letterText, i * 150);
            }
            egret.setInterval(function () {
                _this.getTween();
            }, this, 2000);
            NativeApi.sendToNativeFun(3);
        };
        LoadingUI.prototype.getTween = function () {
            for (var i = 0, len = this.showLabel.length; i < len; ++i) {
                var target = this.getChildByName("label" + i);
                this.startTween(target, i * 150);
            }
        };
        LoadingUI.prototype.startTween = function (target, waitTime) {
            egret.Tween.get(target).wait(waitTime).to({ y: 800 }, 200).to({ y: 900 }, 200, egret.Ease.elasticOut);
        };
        //创建单个字符文本，并加载到舞台
        LoadingUI.prototype.createLetter = function (char, index) {
            var letter = new egret.TextField();
            letter.text = char;
            letter.textColor = 0xff0000;
            letter.fontFamily = "Microsoft YaHei";
            letter.size = 100;
            letter.name = "label" + index;
            this.addChild(letter);
            return letter;
        };
        LoadingUI.prototype.changeLabel = function (current, total) {
            var rate = Math.round((current / total) * 100);
            if (this.loadingBg) {
                var w = this.loadingBg.width * (rate / 100);
                this.loadingPro.x = 0;
                this.loadingPro.width = w;
            }
        };
        LoadingUI.prototype.removeSelf = function () {
            if (this && this.parent) {
                this.parent.removeChild(this);
            }
        };
        return LoadingUI;
    }(eui.UILayer));
    loading.LoadingUI = LoadingUI;
    __reflect(LoadingUI.prototype, "loading.LoadingUI");
})(loading || (loading = {}));
//# sourceMappingURL=LoadingUI.js.map