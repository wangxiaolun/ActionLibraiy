/**
  * 全局数据存储
  */
module GlobalData {

  //当前选取的运动类型（时间or任务）
  export var checkType: boolean = true;

  //当前游戏所需数据
  export var gameNeedData: ActionVO = null;

  //当前页面角标
  export var pageIndex: number = 0;



  /** 时间模式下当前组数 */
  export var _curTimerGroup: number = 1;

  /** 时间模式下总轮数 */
  export var _curTimerTotalGroup: number = 1;

  /** 时间模式下每组内的每队轮巡步数 */
  export var _curTimerEveryGroup: number = 0;



  /** 任务模式下左侧当前组数 */
  export var _curTaskLeftGroup: number = 1;

  //任务模式下中间当前组数
  export var _curTaskCenterGroup: number = 1;

  //任务模式下右侧当前组数
  export var _curTaskRightGroup: number = 1;

  /** 任务模式下左侧已做总轮数 */
  export var l_curTaskTotalGroup: number = 1;

  /** 任务模式下中间已做总轮数 */
  export var c_curTaskTotalGroup: number = 1;

  /** 任务模式下右侧已做总轮数 */
  export var r_curTaskTotalGroup: number = 1;

  /** 任务模式下左侧每组内的每队轮巡步数 */
  export var l_curTaskEveryGroup: number = 0;

  /** 任务模式下中间每组内的每队轮巡步数 */
  export var c_curTaskEveryGroup: number = 0;

  /** 任务模式下右侧每组内的每队轮巡步数 */
  export var r_curTaskEveryGroup: number = 0;


  /** 每组最大人数 */
  export var maxPeople: string = "1";


  //当前左侧玩家数据
  export var curLeftPlayerVo: PlayerVO = null;

  //当前中间玩家数据
  export var curCenterPlayerVo: PlayerVO = null;

  //当前右侧玩家数据
  export var curRightPlayerVo: PlayerVO = null;




  //当前时间类型第一组数据
  export var timeOneData: number = 30;

  //当前时间类型第二组数据
  export var timeTwoData: number = 10;

  //当前时间类型第三组数据
  export var timeThreeData: number = 2;


  //当前任务类型第一组数据
  export var taskOneData: number = 30;

  //当前任务类型第二组数据
  export var taskTwoData: number = 10;

  //当前任务类型第三组数据
  export var taskThreeData: number = 2;

  //游戏统计数据
  export var totalGameData: any = {};


  //登录验证坑位编码
  export var code1: string = "";
  export var code2: string = "";
  export var code3: string = "";

  //游戏数据
  export var resultData: Object = {};

  //当前版本Logo数据
  export var logoArr: Array<string> = [];

  export function initData(): void {
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

  export function initAndroidArrData(): void {
    GlobalData.initData();
    GlobalData.initGameData();
  }

  export function initGameData(): void {
    GlobalData.totalGameData = {};
    GlobalData.resultData = {};
    GlobalData.totalGameData["deviceId"] = GlobalData.gameNeedData.devideID;
    GlobalData.totalGameData["courseId"] = GlobalData.gameNeedData.courseID;
    if (GlobalData.totalGameData.hasOwnProperty("result")) {
      GlobalData.totalGameData["result"] = GlobalData.resultData;
    } else {
      GlobalData.totalGameData["result"] = GlobalData.resultData;
    }
  }

  export function fillGameData(vo: PlayerVO): void {
    GlobalData.resultData[vo.playerUid] = [];
    let singleArr: Array<ActionVO> = vo.actionArr;
    let peoArr: Array<Object> = [];
    for (let i: number = 0; i < singleArr.length; i++) {
      let curAct: ActionVO = singleArr[i];
      let actObj: Object = new Object();
      actObj["actId"] = curAct.actId;
      actObj["nums"] = curAct.playNums;
      actObj["times"] = curAct.playTimes;
      actObj["nameList"] = curAct.actName;
      peoArr.push(actObj);

    }
    GlobalData.resultData[vo.playerUid] = peoArr;
  }

  export function getGameData(): Object {
    return GlobalData.totalGameData;
  }

}