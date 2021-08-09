/**
 * 游戏玩家数据处理类
 * PlayerModel
 */
class PlayerModel {

    public static _instance: PlayerModel;

    public leftPlayerArr: Array<PlayerVO> = [];
    public centerPlayerArr: Array<PlayerVO> = [];
    public rightPlayerArr: Array<PlayerVO> = [];
    public selectPlayerArr: Array<PlayerVO> = [];

    constructor() {

    }

    public static getInstance(): PlayerModel {
        if (!this._instance) {
            this._instance = new PlayerModel();
        }
        return this._instance;
    }

    public fillPlayerData(obj: Object): void {
        this.initPlayerData();
        let addIndex: number = 1;
        if (obj.hasOwnProperty("playerData")) {
            let playerArrObj: Array<Object> = eval(obj["playerData"]);
            if (playerArrObj.length > 0) {
                for (let i: number = 0; i < playerArrObj.length; i++) {
                    let playerObj: Object = playerArrObj[i];
                    if (playerObj) {
                        let playerVo: PlayerVO = new PlayerVO();
                        playerVo.playerUid = playerObj["id"];
                        playerVo.playerName = playerObj["name"];
                        playerVo.playerIcon = playerObj["pic"];
                        if (addIndex == 1) {
                            this.leftPlayerArr.push(playerVo);
                            addIndex += 1;
                        } else if (addIndex == 2) {
                            this.centerPlayerArr.push(playerVo);
                            addIndex += 1;
                        } else {
                            this.rightPlayerArr.push(playerVo);
                            addIndex = 1;
                        }
                    }
                }
            }
        }
    }

    public getPlayerIdArr(): Array<string> {
        let idArr: Array<string> = [];
        let totalArr: Array<PlayerVO> = this.leftPlayerArr.concat(this.centerPlayerArr).concat(this.rightPlayerArr);
        for (let i: number = 0; i < totalArr.length; i++) {
            let vo: PlayerVO = totalArr[i];
            if (vo.playerId != -2 && vo.playerId != -1) {
                idArr.push(vo.playerUid);
            }
        }
        return idArr;
    }

    public resetPowerData(data: Object): void {
        for (let key in data) {
            for (let i: number = 0; i < this.leftPlayerArr.length; i++) {
                let leftVO: PlayerVO = this.leftPlayerArr[i];
                if (leftVO.playerUid.indexOf(key) != -1) {
                    leftVO.useCard = parseInt(data[key] + "");
                }
            }
            for (let j: number = 0; j < this.centerPlayerArr.length; j++) {
                let centerVO: PlayerVO = this.centerPlayerArr[j];
                if (centerVO.playerUid.indexOf(key) != -1) {
                    centerVO.useCard = parseInt(data[key] + "");
                }
            }
            for (let p: number = 0; p < this.rightPlayerArr.length; p++) {
                let rightVO: PlayerVO = this.rightPlayerArr[p];
                if (rightVO.playerUid.indexOf(key) != -1) {
                    rightVO.useCard = parseInt(data[key] + "");
                }
            }
        }
    }

    public savePlayerData(): void {
        let totalArr: Array<PlayerVO> = [];
        totalArr = totalArr.concat(this.leftPlayerArr).concat(this.centerPlayerArr).concat(this.rightPlayerArr);
        for (let i: number = 0; i < totalArr.length; i++) {
            let vo: PlayerVO = totalArr[i];
            if (vo.playerId != -2 && vo.playerId != -1) {
                GlobalData.fillGameData(vo);
            }
        }
    }


    /** 
     * 设置左侧玩家数据
     */
    public setLeftPlayer(curPlayer: PlayerVO, touchNum: number, times: number, actType: number): void {
        if (!curPlayer) {
            return;
        }
        for (let i: number = 0; i < this.leftPlayerArr.length; i++) {
            let changePlayer: PlayerVO = this.leftPlayerArr[i];
            if (actType == 1) {
                changePlayer.playTimes += times;
            }
            if (changePlayer.playerUid === curPlayer.playerUid) {
                changePlayer.playNums += touchNum;
                if (actType == 2) {
                    changePlayer.playTimes += times;
                }
                let actArr: Array<ActionVO> = changePlayer.actionArr;
                if (actArr.length < 0) {
                    let actVo: ActionVO = new ActionVO();
                    actVo.id = GlobalData.gameNeedData.id;
                    actVo.actName = GlobalData.gameNeedData.actName;
                    actVo.actId = GlobalData.gameNeedData.actId;
                    actVo.playTimes = times;
                    actVo.playNums = touchNum;
                    actArr.push(actVo);
                    changePlayer.actionArr = actArr;
                } else {
                    let bool: boolean = Global.judgeOfValue(actArr, "actId", GlobalData.gameNeedData.actId);
                    let bool1: boolean = Global.judgeOfValue(actArr, "id", GlobalData.gameNeedData.id);
                    if (bool && bool1) {
                        for (let j: number = 0; j < actArr.length; j++) {
                            let hasVo: ActionVO = actArr[j];
                            if (hasVo.actId == GlobalData.gameNeedData.actId && hasVo.id == GlobalData.gameNeedData.id) {
                                hasVo.playTimes += times;
                                hasVo.playNums += touchNum;
                            }
                        }
                        changePlayer.actionArr = actArr;
                    } else {
                        let actVo: ActionVO = new ActionVO();
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
    }

    /** 
     * 获取左侧游戏玩家数据
     */
    public getLeftPlayer(): Array<PlayerVO> {
        if (!this.leftPlayerArr) {
            this.leftPlayerArr = [];
        }
        return this.leftPlayerArr;
    }

    /** 
     * 根据玩家Id获取左侧玩家数据
     */
    public getCurLeftPlayer(playerUid: string): PlayerVO {
        for (let i: number = 0; i < this.leftPlayerArr.length; i++) {
            if (this.leftPlayerArr[i].playerUid === playerUid) {
                return this.leftPlayerArr[i];
            }
        }
    }

    /**
     * 根据玩家Id删除相应左侧玩家数据
     */
    public deleteLeftPlayer(playerVo: PlayerVO): void {
        for (let i: number = 0; i < this.leftPlayerArr.length; i++) {
            if (this.leftPlayerArr[i].playerUid === playerVo.playerUid) {
                this.leftPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (playerVo.playerId != -2) {
            this.selectPlayerArr.push(playerVo);
        }
    }

    /**
     * 添加左侧测试玩家
     */
    public addLeftPlayer(): void {
        for (let i: number = 0; i < this.leftPlayerArr.length; i++) {
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
            let leftVO: PlayerVO = new PlayerVO();
            leftVO.playerId = -2;
            leftVO.playerIcon = GlobalData.gameNeedData.channelStr + "Icon_png";
            leftVO.playerName = "左侧临时玩家" + (this.leftPlayerArr.length + 1);
            leftVO.playerUid = "uid" + egret.getTimer();
            this.leftPlayerArr.push(leftVO);
            // }
        }
    }


    /** 
     * 设置中间玩家数据
     */
    public setCenterPlayer(curPlayer: PlayerVO, touchNum: number, times: number, actType: number): void {
        if (!curPlayer) {
            return;
        }
        for (let i: number = 0; i < this.centerPlayerArr.length; i++) {
            let changePlayer: PlayerVO = this.centerPlayerArr[i];
            if (actType == 1) {
                changePlayer.playTimes += times;
            }
            if (changePlayer.playerUid === curPlayer.playerUid) {
                if (actType == 2) {
                    changePlayer.playTimes += times;
                }
                changePlayer.playNums += touchNum;
                let actArr: Array<ActionVO> = changePlayer.actionArr;
                if (actArr.length < 0) {
                    let actVo: ActionVO = new ActionVO();
                    actVo.id = GlobalData.gameNeedData.id;
                    actVo.actName = GlobalData.gameNeedData.actName;
                    actVo.actId = GlobalData.gameNeedData.actId;
                    actVo.playTimes = times;
                    actVo.playNums = touchNum;
                    actArr.push(actVo);
                    changePlayer.actionArr = actArr;
                } else {
                    let bool: boolean = Global.judgeOfValue(actArr, "actId", GlobalData.gameNeedData.actId);
                    let bool1: boolean = Global.judgeOfValue(actArr, "id", GlobalData.gameNeedData.id);
                    if (bool && bool1) {
                        for (let j: number = 0; j < actArr.length; j++) {
                            let hasVo: ActionVO = actArr[j];
                            if (hasVo.actId == GlobalData.gameNeedData.actId && hasVo.id == GlobalData.gameNeedData.id) {
                                hasVo.playTimes += times;
                                hasVo.playNums += touchNum;
                            }
                        }
                        changePlayer.actionArr = actArr;
                    } else {
                        let actVo: ActionVO = new ActionVO();
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
    }

    /** 
     * 获取中间游戏玩家数据
     */
    public getCenterPlayer(): Array<PlayerVO> {
        if (!this.centerPlayerArr) {
            this.centerPlayerArr = [];
        }
        return this.centerPlayerArr;
    }

    /**
     * 根据玩家ID删除中间玩家数据
     */
    public deleteCenterPlayer(curPlayer: PlayerVO): void {
        for (let i: number = 0; i < this.centerPlayerArr.length; i++) {
            if (this.centerPlayerArr[i].playerUid === curPlayer.playerUid) {
                this.centerPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (curPlayer.playerId != -2) {
            this.selectPlayerArr.push(curPlayer);
        }
    }

    /**
     * 添加中间测试玩家
     */
    public addCenterPlayer(): void {
        for (let i: number = 0; i < this.centerPlayerArr.length; i++) {
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
            let centerVO: PlayerVO = new PlayerVO();
            centerVO.playerId = -2;
            centerVO.playerIcon = GlobalData.gameNeedData.channelStr + "Icon_png";
            centerVO.playerName = "中间临时玩家" + (this.centerPlayerArr.length + 1);
            centerVO.playerUid = "uid" + egret.getTimer();
            this.centerPlayerArr.push(centerVO);
            // }
        }
    }

    /** 根据玩家名称获取中间玩家数据 */
    public getCurCenterPlayer(playerUid: string): PlayerVO {
        for (let i: number = 0; i < this.centerPlayerArr.length; i++) {
            if (this.centerPlayerArr[i].playerUid == playerUid) {
                return this.centerPlayerArr[i];
            }
        }
    }

    /**
     * 设置右侧游戏玩家数据
     */
    public setRightPlayer(curPlayer: PlayerVO, touchNum: number, times: number, actTypeNum: number): void {
        if (!curPlayer) {
            return;
        }
        for (let i: number = 0; i < this.rightPlayerArr.length; i++) {
            let changePlayer: PlayerVO = this.rightPlayerArr[i];
            if (actTypeNum == 1) {
                changePlayer.playTimes += times;
            }
            if (changePlayer.playerUid === curPlayer.playerUid) {
                if (actTypeNum == 2) {
                    changePlayer.playTimes += times;
                }
                changePlayer.playNums += touchNum;
                let actArr: Array<ActionVO> = changePlayer.actionArr;
                if (actArr.length < 0) {
                    let actVo: ActionVO = new ActionVO();
                    actVo.id = GlobalData.gameNeedData.id;
                    actVo.actName = GlobalData.gameNeedData.actName;
                    actVo.actId = GlobalData.gameNeedData.actId;
                    actVo.playTimes = times;
                    actVo.playNums = touchNum;
                    actArr.push(actVo);
                    changePlayer.actionArr = actArr;
                } else {
                    let bool: boolean = Global.judgeOfValue(actArr, "actId", GlobalData.gameNeedData.actId);
                    let bool1: boolean = Global.judgeOfValue(actArr, "id", GlobalData.gameNeedData.id);
                    if (bool && bool1) {
                        for (let j: number = 0; j < actArr.length; j++) {
                            let hasVo: ActionVO = actArr[j];
                            if (hasVo.actId == GlobalData.gameNeedData.actId && hasVo.id == GlobalData.gameNeedData.id) {
                                hasVo.playTimes += times;
                                hasVo.playNums += touchNum;
                            }
                        }
                        changePlayer.actionArr = actArr;
                    } else {
                        let actVo: ActionVO = new ActionVO();
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
    }

    /** 
     * 获取游戏右侧游戏玩家数据
     */
    public getRightPlayer(): Array<PlayerVO> {
        if (!this.rightPlayerArr) {
            this.rightPlayerArr = [];
        }
        return this.rightPlayerArr;
    }

    /** 根据玩家名称获取右侧玩家数据 */
    public getCurRightPlayer(playerUid: string): PlayerVO {
        for (let i: number = 0; i < this.rightPlayerArr.length; i++) {
            if (this.rightPlayerArr[i].playerUid == playerUid) {
                return this.rightPlayerArr[i];
            }
        }
    }

    /**
     * 根据玩家ID删除右侧玩家数据
     */
    public deleteRightPlayer(curPlayer: PlayerVO): void {
        for (let i: number = 0; i < this.rightPlayerArr.length; i++) {
            if (this.rightPlayerArr[i].playerUid === curPlayer.playerUid) {
                this.rightPlayerArr.splice(i, 1);
                i--;
            }
        }
        if (curPlayer.playerId != -2) {
            this.selectPlayerArr.push(curPlayer);
        }
    }

    /**
     * 添加右侧测试玩家
     */
    public addRightPlayer(): void {
        for (let i: number = 0; i < this.rightPlayerArr.length; i++) {
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
            let rightVO: PlayerVO = new PlayerVO();
            rightVO.playerId = -2;
            rightVO.playerIcon = GlobalData.gameNeedData.channelStr + "Icon_png";
            rightVO.playerName = "右侧临时玩家" + (this.rightPlayerArr.length + 1);
            rightVO.playerUid = "uid" + + egret.getTimer();
            this.rightPlayerArr.push(rightVO);
            // }
        }
    }


    public initPlayerData(): void {
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
    }

    public resetPlayerData(): void {
        for (let i: number = 0; i < this.leftPlayerArr.length; i++) {
            let lvo: PlayerVO = this.leftPlayerArr[i];
            lvo.playEveryTimes = 0;
            lvo.playNums = 0;
            lvo.playTimes = 0;
            lvo.actionArr = [];
        }

        for (let j: number = 0; j < this.centerPlayerArr.length; j++) {
            let cvo: PlayerVO = this.centerPlayerArr[j];
            cvo.playEveryTimes = 0;
            cvo.playNums = 0;
            cvo.playTimes = 0;
            cvo.actionArr = [];
        }

        for (let d: number = 0; d < this.rightPlayerArr.length; d++) {
            let rvo: PlayerVO = this.rightPlayerArr[d];
            rvo.playEveryTimes = 0;
            rvo.playNums = 0;
            rvo.playTimes = 0;
            rvo.actionArr = [];
        }
    }

    public deleteAddPlayer(): void {
        for (let i: number = 0; i < this.leftPlayerArr.length; i++) {
            let leftVO: PlayerVO = this.leftPlayerArr[i];
            if (leftVO.playerId == -1) {
                this.leftPlayerArr.splice(i, 1);
                i--;
            }
        }
        for (let j: number = 0; j < this.centerPlayerArr.length; j++) {
            let centerVO: PlayerVO = this.centerPlayerArr[j];
            if (centerVO.playerId == -1) {
                this.centerPlayerArr.splice(j, 1);
                j--;
            }
        }
        for (let p: number = 0; p < this.rightPlayerArr.length; p++) {
            let rightVO: PlayerVO = this.rightPlayerArr[p];
            if (rightVO.playerId == -1) {
                this.rightPlayerArr.splice(p, 1);
                p--;
            }
        }
    }
}