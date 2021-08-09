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
 * socket管理器
 */
var SocketManager;
(function (SocketManager) {
    var SocketProxy = (function (_super) {
        __extends(SocketProxy, _super);
        function SocketProxy() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SocketProxy.getInstance = function () {
            if (!this.instance) {
                this.instance = new SocketProxy();
            }
            return this.instance;
        };
        SocketProxy.prototype.connectServer = function (host, port) {
            if (host === void 0) { host = ""; }
            if (port === void 0) { port = 80; }
            Global.showWaritPanel();
            this.sock = new egret.WebSocket();
            this.sock.type = "webSocketTypeBinary";
            this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.sock.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.sock.connect(host, port);
        };
        SocketProxy.prototype.onSocketOpen = function () {
            console.log("socket connect success");
            Global.hideWaritPanel();
        };
        SocketProxy.prototype.onReceiveMessage = function () {
            Global.hideWaritPanel();
            var _arr = new egret.ByteArray();
            this.sock.readBytes(_arr);
            var mainId = _arr.readInt();
            var subId = _arr.readShort();
            var cmdDataBA = new egret.ByteArray();
            _arr.readBytes(cmdDataBA);
            var message = dcodeIO.ProtoBuf.loadProto(RES.getRes(this.fileName + "_proto"));
            var user_login_class = message.build(this.reqName);
            // var recevieData = user_login_class.decode(cmdDataBA.buffer);
            // game.AppFacade.getInstance().sendNotification(this.fileName + "_" + this.reqName, recevieData);
            /**
            * 测试数据
            */
            var data = {
                "name": "template_login_player",
                "data": {
                    "1": {
                        "type": 1,
                        "icon": "testIcon_png",
                        "name": "测试Left1"
                    },
                    "2": {
                        "type": 1,
                        "icon": "testIcon_png",
                        "name": "测试Left2"
                    },
                    "3": {
                        "type": 1,
                        "icon": "testIcon_png",
                        "name": "测试Left3"
                    },
                    "4": {
                        "type": 2,
                        "icon": "testIcon_png",
                        "name": "测试Center1"
                    },
                    "5": {
                        "type": 2,
                        "icon": "testIcon_png",
                        "name": "测试Center2"
                    },
                    "6": {
                        "type": 2,
                        "icon": "testIcon_png",
                        "name": "测试Center3"
                    },
                    "7": {
                        "type": 2,
                        "icon": "testIcon_png",
                        "name": "测试Center4"
                    },
                    "8": {
                        "type": 3,
                        "icon": "testIcon_png",
                        "name": "测试Right1"
                    }
                }
            };
            var eventName = data["name"];
            var receiveData = data["data"];
            game.AppFacade.getInstance().sendNotification(this.fileName + "_" + this.reqName, receiveData);
        };
        SocketProxy.prototype.onSocketClose = function () {
            console.log("socket connect close");
        };
        SocketProxy.prototype.onSocketError = function () {
            console.log("socket connect error");
            this.sock.connect("echo.websocket.org", 80);
        };
        SocketProxy.prototype.sendMessage = function (mainId, subId, msg) {
            Global.showWaritPanel();
            var sendMsg = new egret.ByteArray();
            sendMsg.writeInt(mainId);
            sendMsg.writeShort(subId);
            sendMsg.writeBytes(new egret.ByteArray(msg));
            this.sock.writeBytes(sendMsg);
        };
        SocketProxy.prototype.changeSendInfo = function (reqMethor, reqObj) {
            if (reqMethor.indexOf("_") != -1) {
                this.fileName = reqMethor.substring(0, reqMethor.indexOf("_"));
                this.reqName = reqMethor.substring(reqMethor.indexOf("_") + 1, reqMethor.length);
                var sendObj = Global.getMessage(this.fileName, this.reqName);
                var proObj = new sendObj(reqObj);
                var bytes = proObj.toArrayBuffer();
                this.sendMessage(100, 1, bytes);
            }
        };
        return SocketProxy;
    }(egret.EventDispatcher));
    SocketManager.SocketProxy = SocketProxy;
    __reflect(SocketProxy.prototype, "SocketManager.SocketProxy");
})(SocketManager || (SocketManager = {}));
//# sourceMappingURL=SocketManager.js.map