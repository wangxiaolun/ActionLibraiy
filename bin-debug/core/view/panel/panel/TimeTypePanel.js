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
 * 时间模式界面
 *
 */
var game;
(function (game) {
    var TimeTypePanel = (function (_super) {
        __extends(TimeTypePanel, _super);
        function TimeTypePanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = "TimeTypeSkin";
            return _this;
        }
        TimeTypePanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        TimeTypePanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        TimeTypePanel.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return TimeTypePanel;
    }(eui.Component));
    game.TimeTypePanel = TimeTypePanel;
    __reflect(TimeTypePanel.prototype, "game.TimeTypePanel");
})(game || (game = {}));
//# sourceMappingURL=TimeTypePanel.js.map