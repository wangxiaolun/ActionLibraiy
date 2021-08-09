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
 * 时间模式完成界面
 *
 */
var game;
(function (game) {
    var TimeFinishPanel = (function (_super) {
        __extends(TimeFinishPanel, _super);
        function TimeFinishPanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = "TimeFinishSkin";
            return _this;
        }
        TimeFinishPanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        TimeFinishPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        TimeFinishPanel.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return TimeFinishPanel;
    }(eui.Component));
    game.TimeFinishPanel = TimeFinishPanel;
    __reflect(TimeFinishPanel.prototype, "game.TimeFinishPanel");
})(game || (game = {}));
//# sourceMappingURL=TimeFinishPanel.js.map