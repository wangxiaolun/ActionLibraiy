/**
 * 登录界面
 * 
 */
module game {

    export class LoginMediator extends BaseMediator {

        public static NAME: string = "LoginMediator";
        private openType: number = 0;

        private imgLoad: egret.ImageLoader;
        private logoId: number = 0;

        public constructor(viewComponent: any = null) {
            super(LoginMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_LOGIN,
                NoficationConfig.CLOSE_LOGIN,
                EventConfig.Event_UPDATE_PLAYER
            ];
        }
        private loginPanel: LoginPanel = new LoginPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_LOGIN: {
                    this.openType = data;
                    this.showUI(this.loginPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_LOGIN: {
                    this.closeButtonClick();
                    break;
                }
                case EventConfig.Event_UPDATE_PLAYER: {
                    this.initListView();
                    break;
                }
            }
        }

        /**
        * 初始化面板ui
        */
        public initUI(): void {
            this.loginPanel.iconList1.initView();
            this.loginPanel.iconList2.initView();
            this.loginPanel.iconList3.initView();
            this.changeBg();
            this.setLogo();
            if (egret.Capabilities.runtimeType == egret.RuntimeType.RUNTIME2) {
                this.loginPanel.label_tip.fontFamily = "resource/font/ccty.TTF";
            } else {
                this.loginPanel.label_tip.fontFamily = "cctyFont";
            }
            this.loginPanel.btn_touch.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.loginPanel.btn_start.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startXL, this);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            GlobalData.pageIndex = 3;
            GlobalData.initAndroidArrData();
            this.initListView();
        }

        private changeBg(): void {
            let bgId: number = Math.floor(Math.random() * 10 + 1);
            let bgName: string = "bg" + bgId + "_png";
            game.AppFacade.getInstance().sendNotification(EventConfig.Event_CHANGE_GAMEBG, bgName);
        }

        private initListView(): void {
            var arr_left: Array<PlayerVO> = PlayerModel.getInstance().getLeftPlayer();
            var arr_center: Array<PlayerVO> = PlayerModel.getInstance().getCenterPlayer();
            var arr_right: Array<PlayerVO> = PlayerModel.getInstance().getRightPlayer();
            var new_left: Array<PlayerVO> = [];
            var new_center: Array<PlayerVO> = [];
            var new_right: Array<PlayerVO> = [];
            new_left = this.addPlayerVO(arr_left);
            new_center = this.addPlayerVO(arr_center);
            new_right = this.addPlayerVO(arr_right);
            this.loginPanel.iconList1.setGroupData(new_left, 1);
            this.loginPanel.iconList2.setGroupData(new_center, 2);
            this.loginPanel.iconList3.setGroupData(new_right, 3);
        }

        private backView(): void {
            this.sendNofiCation(1);
        }

        private startXL(): void {
            let childArr: Array<number> = [];
            PlayerModel.getInstance().deleteAddPlayer();
            childArr.push(this.loginPanel.iconList1.getNumChild());
            childArr.push(this.loginPanel.iconList2.getNumChild());
            childArr.push(this.loginPanel.iconList3.getNumChild());
            if (childArr.indexOf(1) != -1) {
                let leftArr: Array<PlayerVO> = PlayerModel.getInstance().getLeftPlayer();
                let centerArr: Array<PlayerVO> = PlayerModel.getInstance().getCenterPlayer();
                let rightArr: Array<PlayerVO> = PlayerModel.getInstance().getRightPlayer();
                if (leftArr.length == 0 && centerArr.length == 0 && rightArr.length == 0) {
                    TipsUtils.showTipsFromCenter("没有玩家哦....");
                } else {
                    this.sendNofiCation(2);
                }
            } else {
                TipsUtils.showTipsFromCenter("没有玩家哦....");
            }
        }

        private sendNofiCation(data: number): void {
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_LOGIN);
            switch (data) {
                case 1:
                     NativeApi.sendToNativeFun(4);
                    break;
                case 2:
                    NativeApi.sendToNativeFun(6);
                    NativeApi.openHtmlView("IntroView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName)
                    break;
            }
        }

        private closeButtonClick(): void {
            this.loginPanel.group_logo.removeChildren();
            this.loginPanel.btn_touch.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backView, this);
            this.loginPanel.btn_start.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startXL, this);
            this.closeImgLoader();
            this.closePanel(0);
        }

        private addPlayerVO(arr: Array<PlayerVO>): Array<PlayerVO> {
            let returnArr: Array<PlayerVO> = [];
            for (let i: number = 0; i < arr.length; i++) {
                let vo: PlayerVO = arr[i];
                returnArr.push(vo);
            }
            for (let i: number = 0; i < returnArr.length; i++) {
                if (returnArr[i].playerId == -1) {
                    returnArr.splice(i, 1);
                    i--;
                }
            }
            if (returnArr.length < 6) {
                let addVo: PlayerVO = new PlayerVO();
                addVo.playerId = -1;
                addVo.playerIcon = "checkAdd_png";
                addVo.playerName = "添加";
                returnArr.push(addVo);
                return returnArr;
            } else {
                return returnArr;
            }
        }

        private setLogo(): void {
            this.loginPanel.group_logo.removeChildren();
            this.logoId = 0;
            if (GlobalData.logoArr.length > 0) {
                this.imgLoad = new egret.ImageLoader();
                this.imgLoad.crossOrigin = "anonymous";
                this.imgLoad.addEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                let bitMapData: string = GlobalData.logoArr[this.logoId];
                this.imgLoad.load(bitMapData);
            }
        }

        private loadLogoComp(evt: egret.Event): void {
            if (evt.currentTarget.data) {
                let img: eui.Image = new eui.Image();
                let ext: egret.Texture = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.x = this.loginPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                let scaleNum: number = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.loginPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    let bitMapData: string = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                } else {
                    this.loginPanel.group_btn.top = this.loginPanel.group_logo.top + this.loginPanel.group_logo.height + 20;
                    this.closeImgLoader();
                }
            }
        }

        private loadLogoError(): void {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        }

        private closeImgLoader(): void {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                this.imgLoad = null;
            }
        }


        // private code1: string = "";
        // private code2: string = "";
        // private code3: string = "";
        // private resetViewData(): void {
        //     //https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx2c8432d2b4a21427&redirect_uri=http%3A%2F%2Fpage.banmajiaohu.cn%2Fwx%2FgetInfoByCode&response_type=code&scope=snsapi_userinfo&
        //     this.code1 = "devideID" + GlobalData.devideID + "courseID" + GlobalData.courseID + "pos" + 1 + "num" + GlobalData.maxPeople;
        //     this.code2 = "devideID" + GlobalData.devideID + "courseID" + GlobalData.courseID + "pos" + 2 + "num" + GlobalData.maxPeople;
        //     this.code3 = "devideID" + GlobalData.devideID + "courseID" + GlobalData.courseID + "pos" + 3 + "num" + GlobalData.maxPeople;
        //     var ss1: string = "state=" + this.code1; // + "#wechat_redirect";
        //     var ss2: string = "state=" + this.code2; // + "#wechat_redirect";
        //     var ss3: string = "state=" + this.code3; // + "#wechat_redirect";
        //     GlobalData.code1 = this.code1;
        //     GlobalData.code2 = this.code2;
        //     GlobalData.code3 = this.code3;
        //     this.addQrTest(ss1, 1);
        //     this.addQrTest(ss2, 2);
        //     this.addQrTest(ss3, 3);
        // }

        // private interNum_l: number = 0;
        // private interNum_c: number = 0;
        // private interNum_r: number = 0;
        // private initView(): void {
        //     this.interNum_l = egret.setInterval(() => {
        //         http.HttpRequest.post("/wx/getInfo", "index=" + GlobalData.code1);
        //     }, this, 2000)
        //     this.interNum_c = egret.setInterval(() => {
        //         http.HttpRequest.post("/wx/getInfo", "index=" + GlobalData.code2);
        //     }, this, 2000)
        //     this.interNum_r = egret.setInterval(() => {
        //         http.HttpRequest.post("/wx/getInfo", "index=" + GlobalData.code3);
        //     }, this, 2000)
        // }

        // private addQrTest(str: string, id: number): void {
        //     let sp: egret.Sprite = qr.QRCode.create(str, 0x000000, 264, 264, qr.QRErrorCorrectLevel.L);  //264
        //     // sp.scaleX = sp.scaleY = 1.083;
        //     sp.x = 3;
        //     if (id == 1) {
        //         this.loginPanel.group_code1.addChild(sp);
        //     } else if (id == 2) {
        //         this.loginPanel.group_code2.addChild(sp);
        //     } else {
        //         this.loginPanel.group_code3.addChild(sp);
        //     }
        // }
    }
}