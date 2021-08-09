/**
  * 游戏数据存储vo
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved. 
  */
class GameVO {
    /**
     * 框架名称
    */
    public gameName: string = "Eger pro";
}

class StatusVo {
    public target: string = "";
    public state: number = 0;
    public isFinish: boolean = false;
}

class FillVO {
    public type: number = 0;
    public timeNum: number = 0;
    public curStep: number = 0;
    public totalStep: number = 0;

    public pro_curNum: number = 0;
    public pro_totalNum: number = 0;
    public pro_timeNum: number = 0;
}

class PreparaVO {
    public type: number = 0;
    public timeNum: number = 0;
}

class ProgressVO {
    public type: number = 0;
    public touchNum: number = 0;
    public totalNum: number = 0;
}

class ActionVO {
    public id: number = 0;
    public actId: number = 0;
    public actName: string = "";
    public videoName: string = "";
    public videoPoster: string = "";
    public musicId: number = 1;

    public devideID: string = "0";
    public courseID: string = "0";
    public isHasPower: boolean = false;
    public channelStr: string = "test";

    public playNums: number = 0;
    public playTimes: number = 0;
}

class VideoVO {
    public videoId: number = 0;
    public videoStr: string = "";
    public videoName: string = "";
    public videoTime: number = 0;
}

class DelteVO {
    public id: number = 0;
    public vo: PlayerVO = null;
}
