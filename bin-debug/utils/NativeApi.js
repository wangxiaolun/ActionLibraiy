/**
  * 调用原生api方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 使用方法如：Global.setCookie()
  */
var NativeApi;
(function (NativeApi) {
    // 储存数据需要key和value，都必须是字符串
    function setLocalData(key, value) {
        egret.localStorage.setItem(key, value);
    }
    NativeApi.setLocalData = setLocalData;
    // 读取数据
    function getLocalData(key) {
        return egret.localStorage.getItem(key);
    }
    NativeApi.getLocalData = getLocalData;
    // 删除数据
    function deleteLocalData(key) {
        egret.localStorage.removeItem(key);
    }
    NativeApi.deleteLocalData = deleteLocalData;
    // 将所有数据清空
    function clearLocalData() {
        egret.localStorage.clear();
    }
    NativeApi.clearLocalData = clearLocalData;
    function openHtmlView(htmlName, videoSrc, videoPoster, isHasPower, gameName) {
        var htmlContent = { "htmlName": "", "videoName": "" };
        htmlContent["htmlName"] = htmlName;
        htmlContent["videoSrc"] = videoSrc;
        htmlContent["videoPoster"] = videoPoster;
        htmlContent["isHasPower"] = isHasPower;
        htmlContent["gameName"] = gameName;
        egret.ExternalInterface.call("SendToHtml", JSON.stringify(htmlContent));
        // if (htmlName.indexOf("HomeView") != -1) {
        // 	game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_VIDEO, 1);
        // } else if (htmlName.indexOf("IntroView") != -1) {
        // 	game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_VIDEO, 2);
        // }
    }
    NativeApi.openHtmlView = openHtmlView;
    function sendToNativeFun(funId) {
        switch (funId) {
            case 1://退出游戏
                egret.ExternalInterface.call("sendToNative", "exitApp");
                break;
            case 2://获取游戏数据
                egret.ExternalInterface.call("sendToNative", "getJson");
                break;
            case 3://移除首页图片
                egret.ExternalInterface.call("sendToNative", "removeImg");
                break;
            case 4://打开首页
                GlobalData.initAndroidArrData();
                NativeApi.openHtmlView("HomeView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName);
                break;
            case 5://发送游戏结果数据
                var data = GlobalData.getGameData();
                var strData = JSON.stringify(data);
                egret.ExternalInterface.call("sendResultToNative", strData);
                break;
            case 6://开始记录心率数据
                var idArr = PlayerModel.getInstance().getPlayerIdArr();
                egret.ExternalInterface.call("startSavePower", JSON.stringify(idArr));
                break;
            case 7://获取心率数据
                egret.ExternalInterface.call("sendToNative", "getPowerRate");
                break;
        }
    }
    NativeApi.sendToNativeFun = sendToNativeFun;
    // 监听Native发送过来的消息
    function receiveMessage() {
        egret.ExternalInterface.addCallback("sendToJS", function (message) {
            if (message.indexOf("KEYCODE_BACK") != -1) {
                NativeApi.sendToNativeFun(1);
            }
            else if (message.indexOf("KEYCODE_DPAD_UP") != -1) {
                if (GlobalData.pageIndex == 6) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_POSITION_UP);
                }
            }
            else if (message.indexOf("KEYCODE_DPAD_DOWN") != -1) {
                if (GlobalData.pageIndex == 6) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_POSITION_DOWN);
                }
            }
            else if (message.indexOf("KEYCODE_DPAD_LEFT") != -1) {
                if (GlobalData.pageIndex == 6) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SCALE_DOWN);
                }
            }
            else if (message.indexOf("KEYCODE_DPAD_RIGHT") != -1) {
                if (GlobalData.pageIndex == 6) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SCALE_UP);
                }
            }
            else if (message.indexOf("KEYCODE_DPAD_CENTER") != -1) {
                if (GlobalData.pageIndex == 6) {
                    game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP);
                }
            }
        });
        /** 接收轮询模式数据 */
        egret.ExternalInterface.addCallback("getJson", function (message) {
            var obj = JSON.parse(message);
            RegUtils.setActionData(obj);
            RegUtils.setGameParam(obj);
            PlayerModel.getInstance().fillPlayerData(obj);
            RegUtils.setLogoData(obj);
            Global.createGameScene();
        });
        egret.ExternalInterface.addCallback("ReceiveFromHtml", function (message) {
            if (message.indexOf("openTeacheView") != -1) {
                NativeApi.openHtmlView("TeacheView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName);
            }
            else if (message.indexOf("openSetupView") != -1) {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_SETUP);
            }
            else if (message.indexOf("openLoginView") != -1) {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN);
            }
            else if (message.indexOf("openCutDownView") != -1) {
                game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 1);
            }
            else if (message.indexOf("openHomeView") != -1) {
                NativeApi.openHtmlView("HomeView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName);
            }
        });
        egret.ExternalInterface.addCallback("getPowerRate", function (message) {
            if (message) {
                var powerArr = JSON.parse(message);
                PlayerModel.getInstance().resetPowerData(powerArr);
            }
            PlayerModel.getInstance().savePlayerData();
            game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_RESULT);
        });
    }
    NativeApi.receiveMessage = receiveMessage;
    function openFinishView() {
        // game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_RESULT);
        NativeApi.sendToNativeFun(7);
    }
    NativeApi.openFinishView = openFinishView;
    function testToInGame() {
        var obj = RES.getRes("template_json");
        RegUtils.setActionData(obj);
        RegUtils.setGameParam(obj);
        PlayerModel.getInstance().fillPlayerData(obj);
        RegUtils.setLogoData(obj);
        Global.createGameScene();
    }
    NativeApi.testToInGame = testToInGame;
})(NativeApi || (NativeApi = {}));
//# sourceMappingURL=NativeApi.js.map