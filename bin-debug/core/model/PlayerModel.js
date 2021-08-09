var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 游戏玩家数据处理类
 * PlayerModel
 */
var PlayerModel = (function () {
    function PlayerModel() {
        this.leftPlayerArr = [];
        this.centerPlayerArr = [];
        this.rightPlayerArr = [];
        this.selectPlayerArr = [];
    }
    PlayerModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new PlayerModel();
        }
        return this._instance;
    };
    PlayerModel.prototype.fillPlayerData = function (obj) {
        this.initPlayerData();
        var addIndex = 1;
        if (obj.hasOwnProperty("playerData")) {
            var playerArrObj = eval(obj["playerData"]);
            if (playerArrObj.length > 0) {
                for (var i = 0; i < playerArrObj.length; i++) {
                    var playerObj = playerArrObj[i];
                    if (playerObj) {
                        var playerVo = new PlayerVO();
                        playerVo.playerUid = playerObj["id"];
                        playerVo.playerName = playerObj["name"];
                        playerVo.playerIcon = playerObj["pic"];
                        if (addIndex == 1) {
                            this.leftPlayerArr.push(playerVo);
                            addIndex += 1;
                        }
                        else if (addIndex == 2) {
                            this.centerPlayerArr.push(playerVo);
                            addIndex += 1;
                        }
                        else {
                            this.rightPlayerArr.push(playerVo);
                            addIndex = 1;
                        }
                    }
                }
            }
        }
    };
    PlayerModel.prototype.getPlayerIdArr = function () {
        var idArr = [];
        var totalArr = this.leftPlayerArr.concat(this.centerPlayerArr).concat(this.rightPlayerArr);
        for (var i = 0; i < totalArr.length; i++) {
            var vo = totalArr[i];
            if (vo.playerId != -2 && vo.playerId != -1) {
                idArr.push(vo.playerUid);
            }
        }
        return idArr;
    };
    PlayerModel.prototype.resetPowerData = function (data) {
        for (var key in data) {
            for (var i = 0; i < this.leftPlayerArr.length; i++) {
                var leftVO = this.leftPlayerArr[i];
                if (leftVO.playerUid.indexOf(key) != -1) {
                    leftVO.useCard = parseInt(data[key] + "");
                }
            }
            for (var j = 0; j < this.centerPlayerArr.length; j++) {
                var centerVO = this.centerPlayerArr[j];
                if (centerVO.playerUid.indexOf(key) != -1) {
                    centerVO.useCard = parseInt(data[key] + "");
                }
            }
            for (var p = 0; p < this.rightPlayerArr.length; p++) {
                var rightVO = this.rightPlayerArr[p];
                if (rightVO.playerUid.indexOf(key) != -1) {
                    rightVO.useCard = parseInt(data[key] + "");
                }
            }
        }
    };
    PlayerModel.prototype.savePlayerData = function () {
        var totalArr = [];
        totalArr = totalArr.concat(this.leftPlayerArr).concat(this.centerPlayerArr).concat(this.rightPlayerArr);
        for (var i = 0; i < totalArr.length; i++) {
            var vo = totalArr[i];
            if (vo.playerId != -2 && vo.playerId != -1) {
                GlobalData.fillGameData(vo);
            }
        }
    };
    /**
     * 设置左侧玩家数据
     */
    PlayerModel.prototype.setLeftPlayer = function (curPlayer, touchNum, times, actType) {
        if (!curPlayer) {
            return;
        }
        for (var i = 0; i < this.leftPlayerArr.length; i++) {
            var changePlayer = this.leftPlayerArr[i];
            if (actType == 1) {
                changePlayer.playTimes += times;
            }
            if (changePlayer.playerUid === curPlayer.playerUid) {
                changePlayer.playNums += touchNum;
                if (actType == 2) {
                    changePlayer.playTimes += times;
                }
                var actArr = changePlayer.actionArr;
                if (actArr.length < 0) {
                    var actVo = new ActionVO();
                    actVo.id = GlobalData.gameNeedData.id;
                    actVo.actName = GlobalData.gameNeedData.actName;
                    actVo.actId = GlobalData.gameNeedData.actId;
                    actVo.playTimes = times;
                    actVo.playNums = touchNum;
                    actArr.push(actVo);
                    changePlayer.actionArr = actArr;
                }
                else {
                    var bool = Global.judgeOfValue(actArr, "actId", GlobalData.gameNeedData.actId);
                    var bool1 = Global.judgeOfValue(actArr, "id", GlobalData.gameNeedData.id);
                    if (bool && bool1) {
                        for (var j = 0; j < actArr.length; j++) {
                            var hasVo = actArr[j];
                            if (hasVo.actId == GlobalData.gameNeedData.actId && hasVo.id == GlobalData.gameNeedData.id) {
                                hasVo.playTimes += times;
                                hasVo.playNums += touchNum;
                            }
                        }
                        changePlayer.actionArr = actArr;
                    }
                    else {
                        var actVo = new ActionVO();
                        actVo.id = GlobalData.gameNeedData.id;
                        actVo.actName = GlobalData.gameNeedData.actName;
                        actVo.actId = GlobalData.gameNeedData.actId;
                        actVo.playTimes = times;
                        actVo.playNums = touchNum;
                        actArr.push(actVo);
                        changePlayer.actionArr = actArr;
                    }
                }
            }
        }
    };
    /**
     * 获取左侧游戏玩家数据
     */
    PlayerModel.prototype.getLeftPlayer = function () {
        if (!this.leftPlayerArr) {
            this.leftPlayerArr = [];
        }
        return this.leftPlayerArr;
    };
    /**
     * 根据玩家Id获取左侧玩家数据
     */
    PlayerModel.prototype.getCurLeftPlayer = function (playerUid) {
        for (var i = 0; i < this.leftPlayerArr.length; i++) {
            if (this.leftPlayerArr[i].playerUid === playerUid) {
                return this.leftPlayerArr[i];
            }
        }
    };
    /**
     * 根据玩家Id删除相应左侧玩家数据
     */
    PlayerModel.prototype.deleteLeftPlayer = function (playerVo) {
        for (var i = 0; i < this.leftPlayerArr.length; i++) {
            if (this.leftPlayerArr[i].playerUid === playerVo.playerUid) {
                this.leftPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (playerVo.playerId != -2) {
            this.selectPlayerArr.push(playerVo);
        }
    };
    /**
     * 添加左侧测试玩家
     */
    PlayerModel.prototype.addLeftPlayer = function () {
        for (var i = 0; i < this.leftPlayerArr.length; i++) {
            if (this.leftPlayerArr[i].playerId == -1) {
                this.leftPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (this.leftPlayerArr.length < 6) {
            // if (this.selectPlayerArr.length > 0) {
            //     let curSvo: PlayerVO = this.selectPlayerArr[0];
            //     this.leftPlayerArr.push(curSvo);
            //     this.selectPlayerArr.splice(0, 1);
            // } else {
            var leftVO = new PlayerVO();
            leftVO.playerId = -2;
            leftVO.playerIcon = GlobalData.gameNeedData.channelStr + "Icon_png";
            leftVO.playerName = "左侧临时玩家" + (this.leftPlayerArr.length + 1);
            leftVO.playerUid = "uid" + egret.getTimer();
            this.leftPlayerArr.push(leftVO);
            // }
        }
    };
    /**
     * 设置中间玩家数据
     */
    PlayerModel.prototype.setCenterPlayer = function (curPlayer, touchNum, times, actType) {
        if (!curPlayer) {
            return;
        }
        for (var i = 0; i < this.centerPlayerArr.length; i++) {
            var changePlayer = this.centerPlayerArr[i];
            if (actType == 1) {
                changePlayer.playTimes += times;
            }
            if (changePlayer.playerUid === curPlayer.playerUid) {
                if (actType == 2) {
                    changePlayer.playTimes += times;
                }
                changePlayer.playNums += touchNum;
                var actArr = changePlayer.actionArr;
                if (actArr.length < 0) {
                    var actVo = new ActionVO();
                    actVo.id = GlobalData.gameNeedData.id;
                    actVo.actName = GlobalData.gameNeedData.actName;
                    actVo.actId = GlobalData.gameNeedData.actId;
                    actVo.playTimes = times;
                    actVo.playNums = touchNum;
                    actArr.push(actVo);
                    changePlayer.actionArr = actArr;
                }
                else {
                    var bool = Global.judgeOfValue(actArr, "actId", GlobalData.gameNeedData.actId);
                    var bool1 = Global.judgeOfValue(actArr, "id", GlobalData.gameNeedData.id);
                    if (bool && bool1) {
                        for (var j = 0; j < actArr.length; j++) {
                            var hasVo = actArr[j];
                            if (hasVo.actId == GlobalData.gameNeedData.actId && hasVo.id == GlobalData.gameNeedData.id) {
                                hasVo.playTimes += times;
                                hasVo.playNums += touchNum;
                            }
                        }
                        changePlayer.actionArr = actArr;
                    }
                    else {
                        var actVo = new ActionVO();
                        actVo.id = GlobalData.gameNeedData.id;
                        actVo.actName = GlobalData.gameNeedData.actName;
                        actVo.actId = GlobalData.gameNeedData.actId;
                        actVo.playTimes = times;
                        actVo.playNums = touchNum;
                        actArr.push(actVo);
                        changePlayer.actionArr = actArr;
                    }
                }
            }
        }
    };
    /**
     * 获取中间游戏玩家数据
     */
    PlayerModel.prototype.getCenterPlayer = function () {
        if (!this.centerPlayerArr) {
            this.centerPlayerArr = [];
        }
        return this.centerPlayerArr;
    };
    /**
     * 根据玩家ID删除中间玩家数据
     */
    PlayerModel.prototype.deleteCenterPlayer = function (curPlayer) {
        for (var i = 0; i < this.centerPlayerArr.length; i++) {
            if (this.centerPlayerArr[i].playerUid === curPlayer.playerUid) {
                this.centerPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (curPlayer.playerId != -2) {
            this.selectPlayerArr.push(curPlayer);
        }
    };
    /**
     * 添加中间测试玩家
     */
    PlayerModel.prototype.addCenterPlayer = function () {
        for (var i = 0; i < this.centerPlayerArr.length; i++) {
            if (this.centerPlayerArr[i].playerId == -1) {
                this.centerPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (this.centerPlayerArr.length < 6) {
            // if (this.selectPlayerArr.length > 0) {
            //     let curSvo: PlayerVO = this.selectPlayerArr[0];
            //     this.centerPlayerArr.push(curSvo);
            //     this.selectPlayerArr.splice(0, 1);
            // } else {
            var centerVO = new PlayerVO();
            centerVO.playerId = -2;
            centerVO.playerIcon = GlobalData.gameNeedData.channelStr + "Icon_png";
            centerVO.playerName = "中间临时玩家" + (this.centerPlayerArr.length + 1);
            centerVO.playerUid = "uid" + egret.getTimer();
            this.centerPlayerArr.push(centerVO);
            // }
        }
    };
    /** 根据玩家名称获取中间玩家数据 */
    PlayerModel.prototype.getCurCenterPlayer = function (playerUid) {
        for (var i = 0; i < this.centerPlayerArr.length; i++) {
            if (this.centerPlayerArr[i].playerUid == playerUid) {
                return this.centerPlayerArr[i];
            }
        }
    };
    /**
     * 设置右侧游戏玩家数据
     */
    PlayerModel.prototype.setRightPlayer = function (curPlayer, touchNum, times, actTypeNum) {
        if (!curPlayer) {
            return;
        }
        for (var i = 0; i < this.rightPlayerArr.length; i++) {
            var changePlayer = this.rightPlayerArr[i];
            if (actTypeNum == 1) {
                changePlayer.playTimes += times;
            }
            if (changePlayer.playerUid === curPlayer.playerUid) {
                if (actTypeNum == 2) {
                    changePlayer.playTimes += times;
                }
                changePlayer.playNums += touchNum;
                var actArr = changePlayer.actionArr;
                if (actArr.length < 0) {
                    var actVo = new ActionVO();
                    actVo.id = GlobalData.gameNeedData.id;
                    actVo.actName = GlobalData.gameNeedData.actName;
                    actVo.actId = GlobalData.gameNeedData.actId;
                    actVo.playTimes = times;
                    actVo.playNums = touchNum;
                    actArr.push(actVo);
                    changePlayer.actionArr = actArr;
                }
                else {
                    var bool = Global.judgeOfValue(actArr, "actId", GlobalData.gameNeedData.actId);
                    var bool1 = Global.judgeOfValue(actArr, "id", GlobalData.gameNeedData.id);
                    if (bool && bool1) {
                        for (var j = 0; j < actArr.length; j++) {
                            var hasVo = actArr[j];
                            if (hasVo.actId == GlobalData.gameNeedData.actId && hasVo.id == GlobalData.gameNeedData.id) {
                                hasVo.playTimes += times;
                                hasVo.playNums += touchNum;
                            }
                        }
                        changePlayer.actionArr = actArr;
                    }
                    else {
                        var actVo = new ActionVO();
                        actVo.id = GlobalData.gameNeedData.id;
                        actVo.actName = GlobalData.gameNeedData.actName;
                        actVo.actId = GlobalData.gameNeedData.actId;
                        actVo.playTimes = times;
                        actVo.playNums = touchNum;
                        actArr.push(actVo);
                        changePlayer.actionArr = actArr;
                    }
                }
            }
        }
    };
    /**
     * 获取游戏右侧游戏玩家数据
     */
    PlayerModel.prototype.getRightPlayer = function () {
        if (!this.rightPlayerArr) {
            this.rightPlayerArr = [];
        }
        return this.rightPlayerArr;
    };
    /** 根据玩家名称获取右侧玩家数据 */
    PlayerModel.prototype.getCurRightPlayer = function (playerUid) {
        for (var i = 0; i < this.rightPlayerArr.length; i++) {
            if (this.rightPlayerArr[i].playerUid == playerUid) {
                return this.rightPlayerArr[i];
            }
        }
    };
    /**
     * 根据玩家ID删除右侧玩家数据
     */
    PlayerModel.prototype.deleteRightPlayer = function (curPlayer) {
        for (var i = 0; i < this.rightPlayerArr.length; i++) {
            if (this.rightPlayerArr[i].playerUid === curPlayer.playerUid) {
                this.rightPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (curPlayer.playerId != -2) {
            this.selectPlayerArr.push(curPlayer);
        }
    };
    /**
     * 添加右侧测试玩家
     */
    PlayerModel.prototype.addRightPlayer = function () {
        for (var i = 0; i < this.rightPlayerArr.length; i++) {
            if (this.rightPlayerArr[i].playerId == -1) {
                this.rightPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (this.rightPlayerArr.length < 6) {
            // if (this.selectPlayerArr.length > 0) {
            //     let curSvo: PlayerVO = this.selectPlayerArr[0];
            //     this.rightPlayerArr.push(curSvo);
            //     this.selectPlayerArr.splice(0, 1);
            // } else {
            var rightVO = new PlayerVO();
            rightVO.playerId = -2;
            rightVO.playerIcon = GlobalData.gameNeedData.channelStr + "Icon_png";
            rightVO.playerName = "右侧临时玩家" + (this.rightPlayerArr.length + 1);
            rightVO.playerUid = "uid" + +egret.getTimer();
            this.rightPlayerArr.push(rightVO);
            // }
        }
    };
    PlayerModel.prototype.initPlayerData = function () {
        this.selectPlayerArr = [];
        this.leftPlayerArr = [];
        this.centerPlayerArr = [];
        this.rightPlayerArr = [];
        // let playerVo: PlayerVO = new PlayerVO();
        // playerVo.playerId = -1;
        // playerVo.playerIcon = "checkAdd_png";
        // playerVo.playerName = "添加";
        // this.leftPlayerArr = [playerVo];
        // this.centerPlayerArr = [playerVo];
        // this.rightPlayerArr = [playerVo];
    };
    PlayerModel.prototype.resetPlayerData = function () {
        for (var i = 0; i < this.leftPlayerArr.length; i++) {
            var lvo = this.leftPlayerArr[i];
            lvo.playEveryTimes = 0;
            lvo.playNums = 0;
            lvo.playTimes = 0;
            lvo.actionArr = [];
        }
        for (var j = 0; j < this.centerPlayerArr.length; j++) {
            var cvo = this.centerPlayerArr[j];
            cvo.playEveryTimes = 0;
            cvo.playNums = 0;
            cvo.playTimes = 0;
            cvo.actionArr = [];
        }
        for (var d = 0; d < this.rightPlayerArr.length; d++) {
            var rvo = this.rightPlayerArr[d];
            rvo.playEveryTimes = 0;
            rvo.playNums = 0;
            rvo.playTimes = 0;
            rvo.actionArr = [];
        }
    };
    PlayerModel.prototype.deleteAddPlayer = function () {
        for (var i = 0; i < this.leftPlayerArr.length; i++) {
            var leftVO = this.leftPlayerArr[i];
            if (leftVO.playerId == -1) {
                this.leftPlayerArr.splice(i, 1);
                i--;
            }
        }
        for (var j = 0; j < this.centerPlayerArr.length; j++) {
            var centerVO = this.centerPlayerArr[j];
            if (centerVO.playerId == -1) {
                this.centerPlayerArr.splice(j, 1);
                j--;
            }
        }
        for (var p = 0; p < this.rightPlayerArr.length; p++) {
            var rightVO = this.rightPlayerArr[p];
            if (rightVO.playerId == -1) {
                this.rightPlayerArr.splice(p, 1);
                p--;
            }
        }
    };
    return PlayerModel;
}());
__reflect(PlayerModel.prototype, "PlayerModel");
//# sourceMappingURL=PlayerModel.js.map