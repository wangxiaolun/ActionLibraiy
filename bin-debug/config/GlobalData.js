/**
  * 全局数据存储
  */
var GlobalData;
(function (GlobalData) {
    //当前选取的运动类型（时间or任务）
    GlobalData.checkType = true;
    //当前游戏所需数据
    GlobalData.gameNeedData = null;
    //当前页面角标
    GlobalData.pageIndex = 0;
    /** 时间模式下当前组数 */
    GlobalData._curTimerGroup = 1;
    /** 时间模式下总轮数 */
    GlobalData._curTimerTotalGroup = 1;
    /** 时间模式下每组内的每队轮巡步数 */
    GlobalData._curTimerEveryGroup = 0;
    /** 任务模式下左侧当前组数 */
    GlobalData._curTaskLeftGroup = 1;
    //任务模式下中间当前组数
    GlobalData._curTaskCenterGroup = 1;
    //任务模式下右侧当前组数
    GlobalData._curTaskRightGroup = 1;
    /** 任务模式下左侧已做总轮数 */
    GlobalData.l_curTaskTotalGroup = 1;
    /** 任务模式下中间已做总轮数 */
    GlobalData.c_curTaskTotalGroup = 1;
    /** 任务模式下右侧已做总轮数 */
    GlobalData.r_curTaskTotalGroup = 1;
    /** 任务模式下左侧每组内的每队轮巡步数 */
    GlobalData.l_curTaskEveryGroup = 0;
    /** 任务模式下中间每组内的每队轮巡步数 */
    GlobalData.c_curTaskEveryGroup = 0;
    /** 任务模式下右侧每组内的每队轮巡步数 */
    GlobalData.r_curTaskEveryGroup = 0;
    /** 每组最大人数 */
    GlobalData.maxPeople = "1";
    //当前左侧玩家数据
    GlobalData.curLeftPlayerVo = null;
    //当前中间玩家数据
    GlobalData.curCenterPlayerVo = null;
    //当前右侧玩家数据
    GlobalData.curRightPlayerVo = null;
    //当前时间类型第一组数据
    GlobalData.timeOneData = 30;
    //当前时间类型第二组数据
    GlobalData.timeTwoData = 10;
    //当前时间类型第三组数据
    GlobalData.timeThreeData = 2;
    //当前任务类型第一组数据
    GlobalData.taskOneData = 30;
    //当前任务类型第二组数据
    GlobalData.taskTwoData = 10;
    //当前任务类型第三组数据
    GlobalData.taskThreeData = 2;
    //游戏统计数据
    GlobalData.totalGameData = {};
    //登录验证坑位编码
    GlobalData.code1 = "";
    GlobalData.code2 = "";
    GlobalData.code3 = "";
    //游戏数据
    GlobalData.resultData = {};
    //当前版本Logo数据
    GlobalData.logoArr = [];
    function initData() {
        GlobalData.curLeftPlayerVo = null;
        GlobalData.curCenterPlayerVo = null;
        GlobalData.curRightPlayerVo = null;
        GlobalData._curTaskLeftGroup = 1;
        GlobalData._curTaskCenterGroup = 1;
        GlobalData._curTaskRightGroup = 1;
        GlobalData.l_curTaskTotalGroup = 1;
        GlobalData.c_curTaskTotalGroup = 1;
        GlobalData.r_curTaskTotalGroup = 1;
        GlobalData.l_curTaskEveryGroup = 0;
        GlobalData.c_curTaskEveryGroup = 0;
        GlobalData.r_curTaskEveryGroup = 0;
        GlobalData._curTimerGroup = 1;
        GlobalData._curTimerTotalGroup = 1;
        GlobalData._curTimerEveryGroup = 0;
    }
    GlobalData.initData = initData;
    function initAndroidArrData() {
        GlobalData.initData();
        GlobalData.initGameData();
    }
    GlobalData.initAndroidArrData = initAndroidArrData;
    function initGameData() {
        GlobalData.totalGameData = {};
        GlobalData.resultData = {};
        GlobalData.totalGameData["deviceId"] = GlobalData.gameNeedData.devideID;
        GlobalData.totalGameData["courseId"] = GlobalData.gameNeedData.courseID;
        if (GlobalData.totalGameData.hasOwnProperty("result")) {
            GlobalData.totalGameData["result"] = GlobalData.resultData;
        }
        else {
            GlobalData.totalGameData["result"] = GlobalData.resultData;
        }
    }
    GlobalData.initGameData = initGameData;
    function fillGameData(vo) {
        GlobalData.resultData[vo.playerUid] = [];
        var singleArr = vo.actionArr;
        var peoArr = [];
        for (var i = 0; i < singleArr.length; i++) {
            var curAct = singleArr[i];
            var actObj = new Object();
            actObj["actId"] = curAct.actId;
            actObj["nums"] = curAct.playNums;
            actObj["times"] = curAct.playTimes;
            actObj["nameList"] = curAct.actName;
            peoArr.push(actObj);
        }
        GlobalData.resultData[vo.playerUid] = peoArr;
    }
    GlobalData.fillGameData = fillGameData;
    function getGameData() {
        return GlobalData.totalGameData;
    }
    GlobalData.getGameData = getGameData;
})(GlobalData || (GlobalData = {}));
//# sourceMappingURL=GlobalData.js.map