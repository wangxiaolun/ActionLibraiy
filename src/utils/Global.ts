/**
  * 游戏公用方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  * 使用方法如：Global.setCookie()
  */

module Global {

	//等待界面，主要用在通讯等待展示
	export var waitPanel: WaitPanel;
	//显示等待界面
	export function showWaritPanel(): void {
		Global.waitPanel = new WaitPanel(1);
		GameLayerManager.gameLayer().maskLayer.removeChildren();
		GameLayerManager.gameLayer().maskLayer.addChild(Global.waitPanel);
	}

	//移除界面
	export function hideWaritPanel(): void {
		if ((Global.waitPanel != null) && GameLayerManager.gameLayer().maskLayer.contains(Global.waitPanel)) {
			GameLayerManager.gameLayer().maskLayer.removeChild(Global.waitPanel);
		}
	}

	//获取html文本
	export function getTextFlow(str: string): egret.ITextElement[] {
		var styleParser = new egret.HtmlTextParser();
		return styleParser.parser(str);
	}

	export var message;
	export function getMessage(fileName: string, reqName: string): any {
		if (message == null) {
			//初始化template_proto
			Global.message = dcodeIO.ProtoBuf.loadProto(RES.getRes(fileName + "_proto"));
		}
		return message.build(reqName);
	}

	//获取大写数字
	export function getNumber(num: number): string {
		switch (num) {
			case 0: {
				return "零";
			}
			case 1: {
				return "一";
			}
			case 2: {
				return "二";
			}
			case 3: {
				return "三";
			}
			case 4: {
				return "四";
			}
			case 5: {
				return "五";
			}
			case 6: {
				return "六";
			}
			case 7: {
				return "七";
			}
			case 8: {
				return "八";
			}
			case 9: {
				return "九";
			}
			default: {
				// TODO: Implemente default case
				console.log("default case");
			}
		}
	}

	export function contrastArr(): number {
		let len_leftArr: number = PlayerModel.getInstance().getLeftPlayer().length;
		let len_centerArr: number = PlayerModel.getInstance().getCenterPlayer().length;
		let len_rightArr: number = PlayerModel.getInstance().getRightPlayer().length;
		let trastArr: Array<number> = [len_leftArr, len_centerArr, len_rightArr];
		let returnNum: number = Math.max(len_leftArr, len_centerArr, len_rightArr);
		return returnNum;
	}

	export function formatTime(sMiao: number, type: number): string {
		// var h: number = 0;
		var i: number = 0;
		var s: number = 0;
		var ss: number = 0;
		if (sMiao > 60) {
			i = parseInt((sMiao / 60) + "");
			s = parseInt((sMiao % 60) + "");
			// if (i > 60) {
			// 	h = parseInt((i / 60) + "");
			// 	i = parseInt((i % 60) + "");
			// }
		} else {
			s = sMiao;
		}
		// 补零
		var zero = function (v) {
			return (v >> 0) < 10 ? "0" + v : v;
		};
		if (type == 1) {
			let returnStr: string = zero(i) + "'" + zero(s) + '"';
			return returnStr;
		} else {
			let returnStr: string = zero(i) + "'" + zero(s) + '"' + zero(ss);
			return returnStr;
		}
	}

	export function createMoive(moiveName: string, clidName: string, xNum: number, yNum: number): egret.MovieClip {
		var data = RES.getRes(moiveName + "_json");
		var txtr = RES.getRes(moiveName + "_png");
		var mcFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(data, txtr);
		var mc: egret.MovieClip = new egret.MovieClip(mcFactory.generateMovieClipData(clidName));
		mc.x = xNum;
		mc.y = yNum;
		return mc;
	}

	export function judgeOfValue(arr: Array<Object>, key: string, value: any): boolean {
		let bool: boolean = false;
		for (let i: number = 0; i < arr.length; i++) {
			let obj1: Object = arr[i];
			if (obj1[key] == value) {
				bool = true;
			}
		}
		return bool;
	}

	export function judgeSame(oldArr: Array<PlayerVO>, newArr: Array<PlayerVO>): boolean {
		let bool: boolean = false;
		let nameArr: Array<string> = [];
		for (let i: number = 0; i < oldArr.length; i++) {
			let cue: PlayerVO = oldArr[i];
			if (cue.playerId != -2) {
				nameArr.push(cue.playerUid);
			}
		}
		if (nameArr.length == newArr.length) {
			for (let j: number = 0; j < newArr.length; j++) {
				let cur: PlayerVO = newArr[j];
				if (nameArr.indexOf(cur.playerUid) == -1) {
					bool = true;
				}
			}
		} else {
			bool = true;
		}
		return bool;
	}

	export function createGameScene(): void {
		StorageUtils.getLocalStorage();
		game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
		game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_MAIN);
		NativeApi.sendToNativeFun(4);
		loading.LoadingUI.getInstance().removeSelf();
	}

	export function judgeArr(arr: Array<Object>): boolean {
		let result: boolean = false;
		if (arr.length > 0) {
			arr.forEach((item: any) => {
				if (item.actId == GlobalData.gameNeedData.actId) {
					result = true;
				}
			});
		}
		return result;
	}

	export function splitStr(opnitStr: string): Array<string> {
		let arr: Array<string> = opnitStr.split("data");
		for (let i: number = 0; i < arr.length; i++) {
			let curStr: string = arr[i];
			curStr = "data" + curStr;
		}
		return arr;
	}
}