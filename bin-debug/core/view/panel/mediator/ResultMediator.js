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
/**
 * 成绩界面
 *
 */
var game;
(function (game) {
    var ResultMediator = (function (_super) {
        __extends(ResultMediator, _super);
        function ResultMediator(viewComponent) {
            if (viewComponent === void 0) { viewComponent = null; }
            var _this = _super.call(this, ResultMediator.NAME, viewComponent) || this;
            _this.totalArr = [];
            _this.pageNums = 0;
            _this.pagesArr = [];
            _this.curPage = 1;
            /** 排序类型
             * 1：次数优先
             * 2：卡路里优先
             */
            _this.curTypeNum = 1;
            _this.logoId = 0;
            _this.resultPanel = new game.ResultPanel();
            return _this;
        }
        ResultMediator.prototype.listNotificationInterests = function () {
            return [
                NoficationConfig.OPEN_RESULT,
                NoficationConfig.CLOSE_RESULT
            ];
        };
        ResultMediator.prototype.handleNotification = function (notification) {
            var data = notification.getBody();
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
        };
        /**
        * 初始化面板ui
        */
        ResultMediator.prototype.initUI = function () {
            this.setLogo();
            this.resultPanel.btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.resultPanel.btn_pre.addEventListener(egret.TouchEvent.TOUCH_TAP, this.prePage, this);
            this.resultPanel.btn_newChange.addEventListener(egret.TouchEvent.TOUCH_TAP, this.startNewPage, this);
            this.resultPanel.btn_changeRank.addEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRank, this);
            this.resultPanel.list_left.itemRenderer = CommonResultItem;
            this.resultPanel.list_right.itemRenderer = CommonResultItem;
            this.resultPanel.img_bg.x = 0;
            var bgId = Math.floor(Math.random() * 10 + 1);
            this.resultPanel.img_bg.source = RES.getRes("bg" + bgId + "_png");
            this.resetBgPos();
        };
        ResultMediator.prototype.resetBgPos = function () {
            var _this = this;
            egret.Tween.removeTweens(this.resultPanel.img_bg);
            egret.Tween.get(this.resultPanel.img_bg).to({ x: -350 }, 8000).wait(350).call(function () {
                egret.Tween.get(_this.resultPanel.img_bg).to({ x: 0 }, 8000).wait(350).call(_this.resetBgPos, _this);
            }, this);
        };
        /**
         * 初始化面板数据
         */
        ResultMediator.prototype.initData = function () {
            GlobalData.pageIndex = 7;
            this.curPage = 1;
            this.curTypeNum = 1;
            this.totalArr = [];
            this.pagesArr = [];
            // NativeApi.sendToNativeFun(5);
            var l_arr = PlayerModel.getInstance().getLeftPlayer();
            var c_arr = PlayerModel.getInstance().getCenterPlayer();
            var r_arr = PlayerModel.getInstance().getRightPlayer();
            this.totalArr = this.totalArr.concat(l_arr).concat(c_arr).concat(r_arr);
            this.changePageView();
        };
        ResultMediator.prototype.changePageView = function () {
            if (this.curTypeNum == 1) {
                this.resultPanel.label_title.text = "次数排行";
                this.totalArr = this.totalArr.sort(this.compareArr("playNums", "useCard"));
            }
            else {
                this.resultPanel.label_title.text = "消耗排行";
                this.totalArr = this.totalArr.sort(this.compareArr("useCard", "playNums"));
            }
            this.setRankNum();
            this.pagesArr = RegUtils.checkArrInGroups(this.totalArr, 5);
            this.pageNums = this.pagesArr.length;
            var left_index = 2 * this.curPage - 2;
            var right_index = 2 * this.curPage - 1;
            if (this.pagesArr[left_index]) {
                var l_dataArr = this.pagesArr[left_index];
                this.l_arrC = this.resultPanel.list_left.dataProvider;
                if (!this.l_arrC)
                    this.l_arrC = new eui.ArrayCollection();
                this.l_arrC.source = l_dataArr;
                this.resultPanel.list_left.dataProvider = this.l_arrC;
            }
            if (this.pagesArr[right_index]) {
                var r_dataArr = this.pagesArr[right_index];
                this.r_arrC = this.resultPanel.list_right.dataProvider;
                if (!this.r_arrC)
                    this.r_arrC = new eui.ArrayCollection();
                this.r_arrC.source = r_dataArr;
                this.resultPanel.list_right.dataProvider = this.r_arrC;
            }
        };
        ResultMediator.prototype.nextPage = function () {
            EffectUtils.playEffect(this.resultPanel.btn_next, 2);
            var tempId = this.curPage + 1;
            var l_index = tempId * 2 - 2;
            var r_index = tempId * 2 - 1;
            if (this.pagesArr[l_index]) {
                this.curPage = tempId;
                this.l_arrC.source = this.pagesArr[l_index];
                this.resultPanel.list_left.dataProvider = this.l_arrC;
            }
            else {
                return;
            }
            if (this.pagesArr[r_index]) {
                this.r_arrC.source = this.pagesArr[r_index];
                this.resultPanel.list_right.dataProvider = this.r_arrC;
            }
            else {
                this.r_arrC.source = [];
                this.resultPanel.list_right.dataProvider = this.r_arrC;
            }
        };
        ResultMediator.prototype.prePage = function () {
            EffectUtils.playEffect(this.resultPanel.btn_pre, 2);
            if (this.curPage <= 1) {
                return;
            }
            else {
                this.curPage -= 1;
                var l_index = this.curPage * 2 - 2;
                var r_index = this.curPage * 2 - 1;
                if (this.pagesArr[l_index]) {
                    this.l_arrC.source = this.pagesArr[l_index];
                    this.resultPanel.list_left.dataProvider = this.l_arrC;
                }
                if (this.pagesArr[r_index]) {
                    this.r_arrC.source = this.pagesArr[r_index];
                    this.resultPanel.list_right.dataProvider = this.r_arrC;
                }
            }
        };
        ResultMediator.prototype.startNewPage = function () {
            PlayerModel.getInstance().resetPlayerData();
            GlobalData.initGameData();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.CLOSE_RESULT);
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN, 2);
        };
        ResultMediator.prototype.changeRank = function () {
            if (this.curTypeNum == 1) {
                this.curTypeNum = 2;
            }
            else {
                this.curTypeNum = 1;
            }
            this.curPage = 1;
            this.pagesArr = [];
            this.changePageView();
        };
        ResultMediator.prototype.setRankNum = function () {
            for (var i = 0; i < this.totalArr.length; i++) {
                var vo = this.totalArr[i];
                vo.rankNum = i + 1;
            }
        };
        ResultMediator.prototype.buttonClickClose = function () {
            egret.Tween.removeTweens(this.resultPanel.img_bg);
            this.resultPanel.group_logo.removeChildren();
            this.resultPanel.btn_changeRank.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.changeRank, this);
            this.resultPanel.btn_next.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
            this.resultPanel.btn_pre.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.prePage, this);
            this.resultPanel.btn_newChange.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.startNewPage, this);
            this.closeImgLoader();
            this.closePanel(0);
        };
        ResultMediator.prototype.compareArr = function (propreName, propreName1) {
            return function (obj1, obj2) {
                var value1 = obj1[propreName];
                var value2 = obj2[propreName];
                var value3 = obj1[propreName1];
                var value4 = obj2[propreName1];
                if (value1 == value2) {
                    return value4 - value3;
                }
                return value2 - value1;
            };
        };
        ResultMediator.prototype.setLogo = function () {
            this.resultPanel.group_logo.removeChildren();
            this.logoId = 0;
            if (GlobalData.logoArr.length > 0) {
                this.imgLoad = new egret.ImageLoader();
                this.imgLoad.crossOrigin = "anonymous";
                this.imgLoad.addEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.addEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
                var bitMapData = GlobalData.logoArr[this.logoId];
                this.imgLoad.load(bitMapData);
            }
        };
        ResultMediator.prototype.loadLogoComp = function (evt) {
            if (evt.currentTarget.data) {
                var img = new eui.Image();
                var ext = new egret.Texture();
                ext.bitmapData = evt.currentTarget.data;
                img.texture = ext;
                img.x = this.resultPanel.group_logo.width + 10;
                img.verticalCenter = 0;
                var scaleNum = this.logoHeight / img.height;
                img.height = this.logoHeight;
                img.width = img.width * scaleNum;
                this.resultPanel.group_logo.addChild(img);
                if (this.logoId + 1 < GlobalData.logoArr.length) {
                    this.logoId = this.logoId + 1;
                    var bitMapData = GlobalData.logoArr[this.logoId];
                    this.imgLoad.load(bitMapData);
                }
                else {
                    this.closeImgLoader();
                }
            }
        };
        ResultMediator.prototype.loadLogoError = function () {
            this.imgLoad.load(GlobalData.logoArr[this.logoId]);
        };
        ResultMediator.prototype.closeImgLoader = function () {
            if (this.imgLoad) {
                this.imgLoad.removeEventListener(egret.Event.COMPLETE, this.loadLogoComp, this);
                this.imgLoad.removeEventListener(egret.IOErrorEvent.IO_ERROR, this.loadLogoError, this);
            }
            this.imgLoad = null;
        };
        ResultMediator.NAME = "ResultMediator";
        return ResultMediator;
    }(BaseMediator));
    game.ResultMediator = ResultMediator;
    __reflect(ResultMediator.prototype, "game.ResultMediator");
})(game || (game = {}));
//# sourceMappingURL=ResultMediator.js.map