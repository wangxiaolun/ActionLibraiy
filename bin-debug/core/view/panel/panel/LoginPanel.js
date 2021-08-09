/**
 * 登录界面
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
    var LoginPanel = (function (_super) {
        __extends(LoginPanel, _super);
        function LoginPanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = "LoginSkin";
            return _this;
        }
        LoginPanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        LoginPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return LoginPanel;
    }(eui.Component));
    game.LoginPanel = LoginPanel;
    __reflect(LoginPanel.prototype, "game.LoginPanel");
})(game || (game = {}));
//# sourceMappingURL=LoginPanel.js.map