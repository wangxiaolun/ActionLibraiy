/**
 *
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
    var SetUpPanel = (function (_super) {
        __extends(SetUpPanel, _super);
        function SetUpPanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            // this.skinName = "src/core/view/panel/ui/ShopSkin.exml";
            _this.skinName = "SetUpSkin";
            return _this;
        }
        SetUpPanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        SetUpPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return SetUpPanel;
    }(eui.Component));
    game.SetUpPanel = SetUpPanel;
    __reflect(SetUpPanel.prototype, "game.SetUpPanel");
})(game || (game = {}));
//# sourceMappingURL=SetUpPanel.js.map