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
  * 注册mediator
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var game;
(function (game) {
    var ViewPrepCommand = (function (_super) {
        __extends(ViewPrepCommand, _super);
        function ViewPrepCommand() {
            return _super.call(this) || this;
        }
        ViewPrepCommand.prototype.execute = function (notification) {
            var main = GameLayerManager.gameLayer().panelLayer;
            this.facade.registerMediator(new game.VideoMediator());
            this.facade.registerMediator(new game.TimeFinishMediator());
            this.facade.registerMediator(new game.TrimMediator());
            this.facade.registerMediator(new game.PauseMediator());
            this.facade.registerMediator(new game.ResultMediator());
            this.facade.registerMediator(new game.TaskTypeMediator());
            this.facade.registerMediator(new game.TimeTypeMediator());
            this.facade.registerMediator(new game.ReadyMediator());
            this.facade.registerMediator(new game.LoginMediator());
            this.facade.registerMediator(new game.SetUpMediator());
            this.facade.registerMediator(new game.TeachMediator());
        };
        return ViewPrepCommand;
    }(puremvc.SimpleCommand));
    game.ViewPrepCommand = ViewPrepCommand;
    __reflect(ViewPrepCommand.prototype, "game.ViewPrepCommand", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=ViewPrepCommand.js.map