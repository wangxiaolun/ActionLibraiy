/**
  * 调用原生api方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 使用方法如：Global.setCookie()
  */

module NativeApi {

	// 储存数据需要key和value，都必须是字符串
	export function setLocalData(key: string, value: string): void {
		egret.localStorage.setItem(key, value);
	}

	// 读取数据
	export function getLocalData(key: string): string {
		return egret.localStorage.getItem(key);
	}

	// 删除数据
	export function deleteLocalData(key: string): void {
		egret.localStorage.removeItem(key);
	}

	// 将所有数据清空
	export function clearLocalData(): void {
		egret.localStorage.clear();
	}

	export function openHtmlView(htmlName: string, videoSrc: string, videoPoster: string, isHasPower: boolean, gameName: string): void {
		let htmlContent: Object = { "htmlName": "", "videoName": "" };
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

	export function sendToNativeFun(funId: number): void {
		switch (funId) {
			case 1: //退出游戏
				egret.ExternalInterface.call("sendToNative", "exitApp");
				break;
			case 2: //获取游戏数据
				egret.ExternalInterface.call("sendToNative", "getJson");
				break;
			case 3: //移除首页图片
				egret.ExternalInterface.call("sendToNative", "removeImg");
				break;
			case 4: //打开首页
				GlobalData.initAndroidArrData();
				NativeApi.openHtmlView("HomeView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName)
				break;
			case 5: //发送游戏结果数据
				let data: Object = GlobalData.getGameData();
				let strData: string = JSON.stringify(data);
				egret.ExternalInterface.call("sendResultToNative", strData);
				break;
			case 6: //开始记录心率数据
				let idArr: Array<string> = PlayerModel.getInstance().getPlayerIdArr();
				egret.ExternalInterface.call("startSavePower", JSON.stringify(idArr));
				break;
			case 7: //获取心率数据
				egret.ExternalInterface.call("sendToNative", "getPowerRate");
				break;
		}
	}

	// 监听Native发送过来的消息
	export function receiveMessage(): void {
		egret.ExternalInterface.addCallback("sendToJS", function (message: string) {
			if (message.indexOf("KEYCODE_BACK") != -1) {  //返回按钮
				NativeApi.sendToNativeFun(1);
			} else if (message.indexOf("KEYCODE_DPAD_UP") != -1) { //向上移动
				if (GlobalData.pageIndex == 6) {
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_POSITION_UP);
				}
			} else if (message.indexOf("KEYCODE_DPAD_DOWN") != -1) { //向下移动
				if (GlobalData.pageIndex == 6) {
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_POSITION_DOWN);
				}
			} else if (message.indexOf("KEYCODE_DPAD_LEFT") != -1) { //缩小目标点
				if (GlobalData.pageIndex == 6) {
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SCALE_DOWN);
				}
			} else if (message.indexOf("KEYCODE_DPAD_RIGHT") != -1) { //放大目标点
				if (GlobalData.pageIndex == 6) {
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SCALE_UP);
				}
			} else if (message.indexOf("KEYCODE_DPAD_CENTER") != -1) { //保存设置
				if (GlobalData.pageIndex == 6) {
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_GAME_SAVESETUP);
				}
			}
		});

		/** 接收轮询模式数据 */
		egret.ExternalInterface.addCallback("getJson", function (message: string) {
			let obj: Object = JSON.parse(message);
			RegUtils.setActionData(obj);
			RegUtils.setGameParam(obj);
			PlayerModel.getInstance().fillPlayerData(obj);
			RegUtils.setLogoData(obj);
			Global.createGameScene();
		});

		egret.ExternalInterface.addCallback("ReceiveFromHtml", function (message: string) {
			if (message.indexOf("openTeacheView") != -1) {
				NativeApi.openHtmlView("TeacheView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName)
			} else if (message.indexOf("openSetupView") != -1) {
				game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_SETUP);
			} else if (message.indexOf("openLoginView") != -1) {
				game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_LOGIN);
			} else if (message.indexOf("openCutDownView") != -1) {
				game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_READY, 1);
			} else if (message.indexOf("openHomeView") != -1) {
				NativeApi.openHtmlView("HomeView", GlobalData.gameNeedData.videoName, GlobalData.gameNeedData.videoPoster, GlobalData.gameNeedData.isHasPower, GlobalData.gameNeedData.actName);
			}
		});

		egret.ExternalInterface.addCallback("getPowerRate", function (message: string) {
			if (message) {
				let powerArr: Object = JSON.parse(message);
				PlayerModel.getInstance().resetPowerData(powerArr);
			}
			PlayerModel.getInstance().savePlayerData();
			game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_RESULT);
		});
	}

	export function openFinishView():void{
		// game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_RESULT);
		NativeApi.sendToNativeFun(7);
	}

	export function testToInGame(): void {
		let obj: Object = RES.getRes("template_json");
		RegUtils.setActionData(obj);
		RegUtils.setGameParam(obj);
		PlayerModel.getInstance().fillPlayerData(obj);
		RegUtils.setLogoData(obj);
		Global.createGameScene();
	}
}