var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
  * 游戏数据存储vo
  * by dily
  * (c) copyright 2014 - 2035
  * All Rights Reserved.
  */
var GameVO = (function () {
    function GameVO() {
        /**
         * 框架名称
        */
        this.gameName = "Eger pro";
    }
    return GameVO;
}());
__reflect(GameVO.prototype, "GameVO");
var StatusVo = (function () {
    function StatusVo() {
        this.target = "";
        this.state = 0;
        this.isFinish = false;
    }
    return StatusVo;
}());
__reflect(StatusVo.prototype, "StatusVo");
var FillVO = (function () {
    function FillVO() {
        this.type = 0;
        this.timeNum = 0;
        this.curStep = 0;
        this.totalStep = 0;
        this.pro_curNum = 0;
        this.pro_totalNum = 0;
        this.pro_timeNum = 0;
    }
    return FillVO;
}());
__reflect(FillVO.prototype, "FillVO");
var PreparaVO = (function () {
    function PreparaVO() {
        this.type = 0;
        this.timeNum = 0;
    }
    return PreparaVO;
}());
__reflect(PreparaVO.prototype, "PreparaVO");
var ProgressVO = (function () {
    function ProgressVO() {
        this.type = 0;
        this.touchNum = 0;
        this.totalNum = 0;
    }
    return ProgressVO;
}());
__reflect(ProgressVO.prototype, "ProgressVO");
var ActionVO = (function () {
    function ActionVO() {
        this.id = 0;
        this.actId = 0;
        this.actName = "";
        this.videoName = "";
        this.videoPoster = "";
        this.musicId = 1;
        this.devideID = "0";
        this.courseID = "0";
        this.isHasPower = false;
        this.channelStr = "test";
        this.playNums = 0;
        this.playTimes = 0;
    }
    return ActionVO;
}());
__reflect(ActionVO.prototype, "ActionVO");
var VideoVO = (function () {
    function VideoVO() {
        this.videoId = 0;
        this.videoStr = "";
        this.videoName = "";
        this.videoTime = 0;
    }
    return VideoVO;
}());
__reflect(VideoVO.prototype, "VideoVO");
var DelteVO = (function () {
    function DelteVO() {
        this.id = 0;
        this.vo = null;
    }
    return DelteVO;
}());
__reflect(DelteVO.prototype, "DelteVO");
//# sourceMappingURL=GameVO.js.map