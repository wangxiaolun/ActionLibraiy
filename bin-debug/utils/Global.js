/**
  * 游戏公用方法汇总
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  * 使用方法如：Global.setCookie()
  */
var Global;
(function (Global) {
    //显示等待界面
    function showWaritPanel() {
        Global.waitPanel = new WaitPanel(1);
        GameLayerManager.gameLayer().maskLayer.removeChildren();
        GameLayerManager.gameLayer().maskLayer.addChild(Global.waitPanel);
    }
    Global.showWaritPanel = showWaritPanel;
    //移除界面
    function hideWaritPanel() {
        if ((Global.waitPanel != null) && GameLayerManager.gameLayer().maskLayer.contains(Global.waitPanel)) {
            GameLayerManager.gameLayer().maskLayer.removeChild(Global.waitPanel);
        }
    }
    Global.hideWaritPanel = hideWaritPanel;
    //获取html文本
    function getTextFlow(str) {
        var styleParser = new egret.HtmlTextParser();
        return styleParser.parser(str);
    }
    Global.getTextFlow = getTextFlow;
    function getMessage(fileName, reqName) {
        if (Global.message == null) {
            //初始化template_proto
            Global.message = dcodeIO.ProtoBuf.loadProto(RES.getRes(fileName + "_proto"));
        }
        return Global.message.build(reqName);
    }
    Global.getMessage = getMessage;
    //获取大写数字
    function getNumber(num) {
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
    Global.getNumber = getNumber;
    function contrastArr() {
        var len_leftArr = PlayerModel.getInstance().getLeftPlayer().length;
        var len_centerArr = PlayerModel.getInstance().getCenterPlayer().length;
        var len_rightArr = PlayerModel.getInstance().getRightPlayer().length;
        var trastArr = [len_leftArr, len_centerArr, len_rightArr];
        var returnNum = Math.max(len_leftArr, len_centerArr, len_rightArr);
        return returnNum;
    }
    Global.contrastArr = contrastArr;
    function formatTime(sMiao, type) {
        // var h: number = 0;
        var i = 0;
        var s = 0;
        var ss = 0;
        if (sMiao > 60) {
            i = parseInt((sMiao / 60) + "");
            s = parseInt((sMiao % 60) + "");
            // if (i > 60) {
            // 	h = parseInt((i / 60) + "");
            // 	i = parseInt((i % 60) + "");
            // }
        }
        else {
            s = sMiao;
        }
        // 补零
        var zero = function (v) {
            return (v >> 0) < 10 ? "0" + v : v;
        };
        if (type == 1) {
            var returnStr = zero(i) + "'" + zero(s) + '"';
            return returnStr;
        }
        else {
            var returnStr = zero(i) + "'" + zero(s) + '"' + zero(ss);
            return returnStr;
        }
    }
    Global.formatTime = formatTime;
    function createMoive(moiveName, clidName, xNum, yNum) {
        var data = RES.getRes(moiveName + "_json");
        var txtr = RES.getRes(moiveName + "_png");
        var mcFactory = new egret.MovieClipDataFactory(data, txtr);
        var mc = new egret.MovieClip(mcFactory.generateMovieClipData(clidName));
        mc.x = xNum;
        mc.y = yNum;
        return mc;
    }
    Global.createMoive = createMoive;
    function judgeOfValue(arr, key, value) {
        var bool = false;
        for (var i = 0; i < arr.length; i++) {
            var obj1 = arr[i];
            if (obj1[key] == value) {
                bool = true;
            }
        }
        return bool;
    }
    Global.judgeOfValue = judgeOfValue;
    function judgeSame(oldArr, newArr) {
        var bool = false;
        var nameArr = [];
        for (var i = 0; i < oldArr.length; i++) {
            var cue = oldArr[i];
            if (cue.playerId != -2) {
                nameArr.push(cue.playerUid);
            }
        }
        if (nameArr.length == newArr.length) {
            for (var j = 0; j < newArr.length; j++) {
                var cur = newArr[j];
                if (nameArr.indexOf(cur.playerUid) == -1) {
                    bool = true;
                }
            }
        }
        else {
            bool = true;
        }
        return bool;
    }
    Global.judgeSame = judgeSame;
    function createGameScene() {
        StorageUtils.getLocalStorage();
        game.AppFacade.getInstance().startUp(GameLayerManager.gameLayer());
        game.AppFacade.getInstance().sendNotification(NoficationConfig.OPEN_MAIN);
        NativeApi.sendToNativeFun(4);
        loading.LoadingUI.getInstance().removeSelf();
    }
    Global.createGameScene = createGameScene;
    function judgeArr(arr) {
        var result = false;
        if (arr.length > 0) {
            arr.forEach(function (item) {
                if (item.actId == GlobalData.gameNeedData.actId) {
                    result = true;
                }
            });
        }
        return result;
    }
    Global.judgeArr = judgeArr;
    function splitStr(opnitStr) {
        var arr = opnitStr.split("data");
        for (var i = 0; i < arr.length; i++) {
            var curStr = arr[i];
            curStr = "data" + curStr;
        }
        return arr;
    }
    Global.splitStr = splitStr;
})(Global || (Global = {}));
//# sourceMappingURL=Global.js.map