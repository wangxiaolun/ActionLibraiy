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
  * 服务器命令返回(注册监听服务器响应)
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var game;
(function (game) {
    var Processor_100_1 = (function (_super) {
        __extends(Processor_100_1, _super);
        function Processor_100_1() {
            return _super.call(this) || this;
        }
        /** 注册消息 */
        Processor_100_1.prototype.register = function () {
            this.facade.registerCommand(ProtobufConfig.TEMPLATE_USER_LOGIN, Processor_100_1);
        };
        Processor_100_1.prototype.execute = function (notification) {
            var data = notification.getBody(); //携带数据
            switch (notification.getName()) {
                case ProtobufConfig.TEMPLATE_USER_LOGIN:
                    // P.getGameDataProxy().setPlayerData(data);
                    break;
                default:
                    break;
            }
        };
        Processor_100_1.NAME = ProtobufConfig.TEMPLATE_USER_LOGIN;
        return Processor_100_1;
    }(puremvc.SimpleCommand));
    game.Processor_100_1 = Processor_100_1;
    __reflect(Processor_100_1.prototype, "game.Processor_100_1", ["puremvc.ICommand", "puremvc.INotifier"]);
})(game || (game = {}));
//# sourceMappingURL=Processor_100_1.js.map