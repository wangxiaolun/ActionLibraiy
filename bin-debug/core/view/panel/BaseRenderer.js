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
var BaseRenderer = (function (_super) {
    __extends(BaseRenderer, _super);
    function BaseRenderer() {
        var _this = _super.call(this) || this;
        _this.isCreate = false;
        _this.waitTime = 1000; //按钮点击等待的时间
        return _this;
    }
    BaseRenderer.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    BaseRenderer.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        this.isCreate = true;
        this.initData();
        this.initUI();
        this.initListener();
    };
    BaseRenderer.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        this.resetBtnScale();
    };
    //滚动列表和动画冲突的问题
    BaseRenderer.prototype.resetBtnScale = function () {
        var _this = this;
        if (!this.addEventBtnArr || !this.effectArr)
            return;
        this.addEventBtnArr.forEach(function (btn, index) {
            if (_this.effectArr.indexOf(btn.hashCode) != -1 && btn.scaleX != 1) {
                btn.scaleX = btn.scaleY = 1;
            }
        }, this);
    };
    BaseRenderer.prototype.initData = function () {
        this.addEventBtnArr = [];
        this.effectArr = [];
    };
    BaseRenderer.prototype.initUI = function () { };
    BaseRenderer.prototype.initListener = function () { };
    BaseRenderer.prototype.removeListener = function () {
        while (this.addEventBtnArr && this.addEventBtnArr.length > 0) {
            var btn = this.addEventBtnArr.shift();
            if (btn)
                this.removeBtnClick(btn);
        }
    };
    /**
     * 添加按钮点击事件
     * @param btn 要添加事件的对象
     * @param isEffect 是否启用特效
     */
    BaseRenderer.prototype.addBtnClick = function (btn, isEffect) {
        if (isEffect === void 0) { isEffect = false; }
        if (btn && this.addEventBtnArr.indexOf(btn) == -1) {
            btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addEventBtnArr.push(btn);
            if (isEffect) {
                this.effectArr.push(btn.hashCode);
                btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
                btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
                btn.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
                var w = btn.width;
                var h = btn.height;
                var w_half = w >> 1;
                var h_half = h >> 1;
                btn.x += w_half - btn.anchorOffsetX;
                btn.y += h_half - btn.anchorOffsetY;
                btn.anchorOffsetX = w_half;
                btn.anchorOffsetY = h_half;
            }
        }
    };
    BaseRenderer.prototype.removeBtnClick = function (btn) {
        if (!btn)
            return;
        var index = this.addEventBtnArr.indexOf(btn);
        if (index != -1) {
            btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.addEventBtnArr.splice(index, 1);
        }
        index = this.effectArr.indexOf(btn.hashCode);
        if (index != -1) {
            egret.Tween.removeTweens(btn);
            btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onBtnEffect, this);
            btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onBtnEffect, this);
            btn.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onBtnEffect, this);
            this.effectArr.splice(index, 1);
        }
    };
    BaseRenderer.prototype.onClick = function (evt, waitTime) {
        if (waitTime === void 0) { waitTime = this.waitTime; }
        var btn = evt.currentTarget;
        // if (waitTime > 0) {
        // 	btn.touchEnabled = false;
        // }
    };
    BaseRenderer.prototype.onBtnEffect = function (evt) {
        var btn = evt.currentTarget;
        egret.Tween.removeTweens(btn);
        if (evt.type == egret.TouchEvent.TOUCH_BEGIN) {
            egret.Tween.get(btn).to({ scaleX: 0.8, scaleY: 0.8 }, 200, egret.Ease.quadOut);
        }
        else if (evt.type == egret.TouchEvent.TOUCH_END || evt.type == egret.TouchEvent.TOUCH_RELEASE_OUTSIDE) {
            egret.Tween.get(btn).to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.backOut);
        }
    };
    /**
     * 更新列表
     * @param list:eui.list
     * @param arr:Array<any>
     */
    BaseRenderer.prototype.updateList = function (list, arr) {
        var arrC = list.dataProvider;
        if (!arrC)
            arrC = new eui.ArrayCollection();
        arrC.source = arr;
        list.dataProvider = arrC;
    };
    BaseRenderer.prototype.updateView = function () {
        var param = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            param[_i] = arguments[_i];
        }
    };
    BaseRenderer.prototype.destroy = function () {
        this.effectArr = null;
        this.removeListener();
    };
    return BaseRenderer;
}(eui.ItemRenderer));
__reflect(BaseRenderer.prototype, "BaseRenderer");
//# sourceMappingURL=BaseRenderer.js.map