/**
 * 准备界面
 */
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
var game;
(function (game) {
    var ReadyPanel = (function (_super) {
        __extends(ReadyPanel, _super);
        function ReadyPanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = "ReadySkin";
            return _this;
        }
        ReadyPanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        ReadyPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return ReadyPanel;
    }(eui.Component));
    game.ReadyPanel = ReadyPanel;
    __reflect(ReadyPanel.prototype, "game.ReadyPanel");
})(game || (game = {}));
//# sourceMappingURL=ReadyPanel.js.map