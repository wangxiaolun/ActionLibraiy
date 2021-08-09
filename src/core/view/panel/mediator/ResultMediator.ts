/**
 * 成绩界面
 * 
 */
module game {

    export class ResultMediator extends BaseMediator {

        public static NAME: string = "ResultMediator";
        private totalArr: Array<PlayerVO> = [];
        private pageNums: number = 0;
        private pagesArr: Array<any> = [];

        private l_arrC: eui.ArrayCollection;
        private r_arrC: eui.ArrayCollection;
        private curPage: number = 1;

        /** 排序类型
         * 1：次数优先
         * 2：卡路里优先
         */
        private curTypeNum: number = 1;


        private imgLoad: egret.ImageLoader;
        private logoId: number = 0;

        public constructor(viewComponent: any = null) {
            super(ResultMediator.NAME, viewComponent);
        }

        public listNotificationInterests(): Array<any> {
            return [
                NoficationConfig.OPEN_RESULT,
                NoficationConfig.CLOSE_RESULT
            ];
        }
        private resultPanel: ResultPanel = new ResultPanel();
        public handleNotification(notification: puremvc.INotification): void {
            var data: any = notification.getBody();
            switch (notification.getName()) {
                case NoficationConfig.OPEN_RESULT: {
                    this.showUI(this.resultPanel, false, 0, 0, 0);
                    break;
                }
                case NoficationConfig.CLOSE_RESULT: {
                    this.buttonClickClose();
                    break;
                }
            }
        }

        /**
        * 初始化面板ui
        */
        public initUI(): void {
            this.setLogo();
            this.resultPanel.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.resultPanel.btn_pre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.prePage, this);
            this.resultPanel.btn_newChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startNewPage, this);
            this.resultPanel.btn_changeRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRank, this);
            this.resultPanel.list_left.itemRenderer = CommonResultItem;
            this.resultPanel.list_right.itemRenderer = CommonResultItem;
            this.resultPanel.img_bg.x = 0;
            let bgId: number = Math.floor(Math.random() * 10 + 1);
            this.resultPanel.img_bg.source = RES.getRes("bg" + bgId + "_png");
            this.resetBgPos();
        }

        private resetBgPos(): void {
            egret.Tween.removeTweens(this.resultPanel.img_bg);
            egret.Tween.get(this.resultPanel.img_bg).to({ x: -350 }, 8000).wait(350).call(() => {
                egret.Tween.get(this.resultPanel.img_bg).to({ x: 0 }, 8000).wait(350).call(this.resetBgPos, this);
            }, this);
        }

        /**
         * 初始化面板数据
         */
        public initData(): void {
            GlobalData.pageIndex = 7;
            this.curPage = 1;
            this.curTypeNum = 1;
            this.totalArr = [];
            this.pagesArr = [];
            // NativeApi.sendToNativeFun(5);
            let l_arr: Array<PlayerVO> = PlayerModel.getInstance().getLeftPlayer();
            let c_arr: Array<PlayerVO> = PlayerModel.getInstance().getCenterPlayer();
            let r_arr: Array<PlayerVO> = PlayerModel.getInstance().getRightPlayer();
            this.totalArr = this.totalArr.concat(l_arr).concat(c_arr).concat(r_arr);
            this.changePageView();
        }

        private changePageView(): void {
            if (this.curTypeNum == 1) {
                this.resultPanel.label_title.text = "次数排行";
                this.totalArr = this.totalArr.sort(this.compareArr("playNums", "useCard"));
            } else {
                this.resultPanel.label_title.text = "消耗排行";
                this.totalArr = this.totalArr.sort(this.compareArr("useCard", "playNums"));
            }
            this.setRankNum();
            this.pagesArr = RegUtils.checkArrInGroups(this.totalArr, 5);
            this.pageNums = this.pagesArr.length;
            let left_index: number = 2 * this.curPage - 2;
            let right_index: number = 2 * this.curPage - 1;
            if (this.pagesArr[left_index]) {
                let l_dataArr: Array<PlayerVO> = this.pagesArr[left_index];
                this.l_arrC = <eui.ArrayCollection>this.resultPanel.list_left.dataProvider;
                if (!this.l_arrC) this.l_arrC = new eui.ArrayCollection();
                this.l_arrC.source = l_dataArr;
                this.resultPanel.list_left.dataProvider = this.l_arrC;
            }
            if (this.pagesArr[right_index]) {
                let r_dataArr: Array<PlayerVO> = this.pagesArr[right_index];
                this.r_arrC = <eui.ArrayCollection>this.resultPanel.list_right.dataProvider;
                if (!this.r_arrC) this.r_arrC = new eui.ArrayCollection();
                this.r_arrC.source = r_dataArr;
                this.resultPanel.list_right.dataProvider = this.r_arrC;
            }
        }

        private nextPage(): void {
            EffectUtils.playEffect(this.resultPanel.btn_next, 2);
            let tempId: number = this.curPage + 1;
            let l_index: number = tempId * 2 - 2;
            let r_index: number = tempId * 2 - 1;
            if (this.pagesArr[l_index]) {
                this.curPage = tempId;
                this.l_arrC.source = this.pagesArr[l_index];
                this.resultPanel.list_left.dataProvider = this.l_arrC;
            } else {
                return;
            }
            if (this.pagesArr[r_index]) {
                this.r_arrC.source = this.pagesArr[r_index];
                this.resultPanel.list_right.dataProvider = this.r_arrC;
            } else {
                this.r_arrC.source = [];
                this.resultPanel.list_right.dataProvider = this.r_arrC;
            }
        }

        private prePage(): void {
            EffectUtils.playEffect(this.resultPanel.btn_pre, 2);
            if (this.curPage <= 1) {
                return;
            } else {
                this.curPage -= 1;
                let l_index: number = this.curPage * 2 - 2;
                let r_index: number = this.curPage * 2 - 1;
                if (this.pagesArr[l_index]) {
                    this.l_arrC.source = this.pagesArr[l_index];
                    this.resultPanel.list_left.dataProvider = this.l_arrC;
                }
                if (this.pagesArr[r_index]) {
                    this.r_arrC.source = this.pagesArr[r_index];
                    this.resultPanel.list_right.dataProvider = this.r_arrC;
                }
            }
        }

        private startNewPage(): void {
            PlayerModel.getInstance().resetPlayerData();
            GlobalData.initGameData();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_RESULT);
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN, 2);
        }

        private changeRank(): void {
            if (this.curTypeNum == 1) {
                this.curTypeNum = 2;
            } else {
                this.curTypeNum = 1;
            }
            this.curPage = 1;
            this.pagesArr = [];
            this.changePageView();
        }

        private setRankNum(): void {
            for (let i: number = 0; i < this.totalArr.length; i++) {
                let vo: PlayerVO = this.totalArr[i];
                vo.rankNum = i + 1;
            }
        }

        private buttonClickClose(): void {
            egret.Tween.removeTweens(this.resultPanel.img_bg);
            this.resultPanel.group_logo.removeChildren();
            this.resultPanel.btn_changeRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRank, this);
            this.resultPanel.btn_next.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.resultPanel.btn_pre.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.prePage, this);
            this.resultPanel.btn_newChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startNewPage, this);
            this.closeImgLoader();
            this.closePanel(0);
        }

        private compareArr(propreName, propreName1): any {
            return function (obj1, obj2) {
                let value1 = obj1[propreName];
                let value2 = obj2[propreName];
                let value3 = obj1[propreName1];
                let value4 = obj2[propreName1];
                if (value1 == value2) {
                    return value4 - value3;
                }
                return value2 - value1;
            }
        }

        private setLogo(): void {
            this.resultPanel.group_logo.removeChildren();
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
                img.x = this.resultPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                let scaleNum: number = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.resultPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    let bitMapData: string = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                } else {
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
            }
            this.imgLoad = null;
        }
    }
}