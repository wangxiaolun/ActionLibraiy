/**
 * socket管理器
 */
module SocketManager {

    export class SocketProxy extends egret.EventDispatcher {

        private static instance: SocketProxy;
        public sock: egret.WebSocket;
        private fileName: string;  //协议包名
        private reqName: string;  //协议方法名

        public static getInstance(): SocketProxy {
            if (!this.instance) {
                this.instance = new SocketProxy();
            }
            return this.instance;
        }

        public connectServer(host: string = "", port: number = 80) {
            Global.showWaritPanel();
            this.sock = new egret.WebSocket();
            this.sock.type = "webSocketTypeBinary";
            this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            this.sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
            this.sock.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
            this.sock.connect(host, port);
        }

        public onSocketOpen(): void {
            console.log("socket connect success");
            Global.hideWaritPanel();
        }

        public onReceiveMessage(): void {
            Global.hideWaritPanel();
            var _arr: egret.ByteArray = new egret.ByteArray();
            this.sock.readBytes(_arr);
            var mainId = _arr.readInt();
            var subId = _arr.readShort();
            var cmdDataBA: egret.ByteArray = new egret.ByteArray();
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
            }
            var eventName: string = data["name"];
            var receiveData: Object = data["data"];
            game.AppFacade.getInstance().sendNotification(this.fileName + "_" + this.reqName, receiveData);
        }

        private onSocketClose(): void {
            console.log("socket connect close");
        }

        private onSocketError(): void {
            console.log("socket connect error");
            this.sock.connect("echo.websocket.org", 80);
        }


        public sendMessage(mainId: number, subId: number, msg: any): void {
            Global.showWaritPanel();
            var sendMsg: egret.ByteArray = new egret.ByteArray();
            sendMsg.writeInt(mainId);
            sendMsg.writeShort(subId);
            sendMsg.writeBytes(new egret.ByteArray(msg));
            this.sock.writeBytes(sendMsg);
        }

        public changeSendInfo(reqMethor: string, reqObj: Object): void {
            if (reqMethor.indexOf("_") != -1) {
                this.fileName = reqMethor.substring(0, reqMethor.indexOf("_"));
                this.reqName = reqMethor.substring(reqMethor.indexOf("_") + 1, reqMethor.length);
                var sendObj = Global.getMessage(this.fileName, this.reqName);
                var proObj = new sendObj(reqObj);
                var bytes = proObj.toArrayBuffer();
                this.sendMessage(100, 1, bytes);
            }
        }
    }
}




