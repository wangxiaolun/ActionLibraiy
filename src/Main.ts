class Main extends eui.UILayer {

    /**
     * 加载进度界面
     */
    protected createChildren(): void {
        super.createChildren();
        console.log("进入游戏");

        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        //loading条初始化显示移除
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        //游戏自定义容器添加到舞台上
        this.addChild(GameLayerManager.gameLayer());
 
        //初始化Resource资源加载库 。。。
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event: RES.ResourceEvent): void {
        NativeApi.receiveMessage();
        this.stage.addChild(loading.LoadingUI.getInstance());
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceError, this);
        RES.loadGroup("preload");
    }
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.loadGroup("loading");
        } else if (event.groupName == "loading") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceError, this);
            http.HttpRequest.init("http://page.banmajiaohu.cn");
            NativeApi.sendToNativeFun(2);
            // NativeApi.testToInGame();
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        if (event.groupName == "loading") {
            loading.LoadingUI.getInstance().changeLabel(event.itemsLoaded, event.itemsTotal);
        }
    }

    private onResourceError(event: RES.ResourceEvent): void {
        if (event.groupName == "preload") {
            RES.loadGroup("preload");
        } else if (event.groupName == "loading") {
            RES.loadGroup("loading");
        }
    }
}

