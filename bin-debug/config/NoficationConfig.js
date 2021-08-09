var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 消息队列配置信息
 */
var NoficationConfig = (function () {
    function NoficationConfig() {
    }
    //服务器连接成功
    NoficationConfig.CONNECT_SERVER_SUCCESS = "CONNECT_SERVER_SUCCESS";
    //服务器返回数据
    NoficationConfig.SERVER_BACK_DATA = "SERVER_BACK_DATA";
    //打开设置场景
    NoficationConfig.OPEN_SETUP = "SceneNotify_OPEN_SETUP";
    //关闭设置场景
    NoficationConfig.CLOSE_SETUP = "SceneNotify_CLOSE_SETUP";
    // 打开教程界面
    NoficationConfig.OPEN_TEACH = "SceneNotify_OPEN_TEACH";
    // 关闭教程界面
    NoficationConfig.CLOSE_TEACH = "SceneNotify_CLOSE_TEACH";
    //打开登录界面
    NoficationConfig.OPEN_LOGIN = "SceneNotify_OPEN_LOGIN";
    //关闭登录界面
    NoficationConfig.CLOSE_LOGIN = "SceneNotify_CLOSE_LOGIN";
    //打开准备界面
    NoficationConfig.OPEN_READY = "SceneNotify_OPEN_READY";
    //关闭准备界面
    NoficationConfig.CLOSE_READY = "SceneNotify_CLOSE_READY";
    //打开时间模式界面
    NoficationConfig.OPEN_TIMETYPE = "SceneNotify_OPEN_TIMETYPE";
    //关闭时间模式界面
    NoficationConfig.CLOSE_TIMETYPE = "SceneNotify_CLOSE_TIMETYPE";
    //打开任务模式界面
    NoficationConfig.OPEN_TASKTYPE = "SceneNotify_OPEN_TASKTYPE";
    //关闭任务模式界面
    NoficationConfig.CLOSE_TASKTYPE = "SceneNotify_CLOSE_TASKTYPE";
    // 打开成绩界面
    NoficationConfig.OPEN_RESULT = "SceneNotify_OPEN_RESULT";
    // 关闭成绩界面
    NoficationConfig.CLOSE_RESULT = "SceneNotify_CLOSE_RESULT";
    //打开暂停界面
    NoficationConfig.OPEN_PAUSE = "SceneNotify_OPEN_PAUSE";
    //关闭暂停界面
    NoficationConfig.CLOSE_PAUSE = "SceneNotify_CLOSE_PAUSE";
    //打开调整界面
    NoficationConfig.OPEN_TRIM = "SceneNotify_OPEN_TRIM";
    //关闭调整界面
    NoficationConfig.CLOSE_TRIM = "SceneNotify_CLOSE_TRIM";
    //打开视频播放界面
    NoficationConfig.OPEN_VIDEO = "SceneNotify_OPEN_VIDEO";
    //关闭视频播放界面
    NoficationConfig.CLOSE_VIDEO = "SceneNotify_CLOSE_VIDEO";
    //打开时间模式完成界面
    NoficationConfig.OPEN_TIME_FINISH = "SceneNotify_OPEN_TIME_FINISH";
    //关闭时间模式完成界面
    NoficationConfig.CLOSE_TIME_FINISH = "SceneNotify_CLOSE_TIME_FINISH";
    //打开主界面UI
    NoficationConfig.OPEN_MAIN = "MainNotify_OPEN_MAIN";
    //关闭主界面UI
    NoficationConfig.CLOSE_MAIN = "MainNotify_CLOSE_MAIN";
    return NoficationConfig;
}());
__reflect(NoficationConfig.prototype, "NoficationConfig");
//# sourceMappingURL=NoficationConfig.js.map