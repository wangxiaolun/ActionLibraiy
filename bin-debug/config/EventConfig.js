var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 数据变更事件队列
 */
var EventConfig = (function () {
    function EventConfig() {
    }
    //更新玩家数据
    EventConfig.Event_UPDATE_PLAYER = "Event_UPDATE_PLAYER";
    //更新时间模式点击数据
    EventConfig.Event_UPDATE_TOUCHNUM_TIME = "Event_UPDATE_TOUCHNUM_TIME";
    //更新时间模式时间数据
    EventConfig.Event_UPDATE_TIMENUM_TIME = "Event_UPDATE_TIMENUM_TIME";
    //更新时间模式步数数据
    EventConfig.Event_UPDATE_STEPNUM_TIME = "Event_UPDATE_STEPNUM_TIME";
    EventConfig.Event_UPDATE_TOUCH_TIME_CHANGE = "Event_UPDATE_TOUCH_TIME_CHANGE";
    //更新任务模式点击数据
    EventConfig.Event_UPDATE_TOUCH_Task = "Event_UPDATE_TOUCH_Task";
    //更新任务模式点击数据显示
    EventConfig.Event_UPDATE_TOUCH_Task_Show = "Event_UPDATE_TOUCH_Task_Show";
    //更新点击后目标变换
    EventConfig.Event_UPDATE_TOUCH_TASK_CHANGE = "Event_UPDATE_TOUCH_TASK_CHANGE";
    //任务界面跳过按钮
    EventConfig.Event_SKIP_TASK_PREPRA = "Event_SKIP_TASK_PREPRA";
    //切换背景图片
    EventConfig.Event_CHANGE_GAMEBG = "Event_CHANGE_GAMEBG";
    // 倒计时重来
    EventConfig.Event_GAME_COUNTDOWN_RESET = "Event_GAME_COUNTDOWN_RESET";
    // 时间模式(重来/退出)
    EventConfig.Event_GAME_TIME_RESET = "Event_GAME_TIME_RESET";
    // 任务模式重来
    EventConfig.Event_GAME_TASK_RESET = "Event_GAME_TASK_RESET";
    // 时间模式游戏继续
    EventConfig.Event_TIMEGAME_CONTAINUE = "Event_TIMEGAME_CONTAINUE";
    // 任务模式游戏继续
    EventConfig.Event_TASKGAME_CONTAINUE = "Event_TASKGAME_CONTAINUE";
    // 游戏调整
    // public static Event_GAME_UPSET: string = "Event_GAME_UPSET";
    //发送任务模式状态更新事件
    EventConfig.Event_GAME_TASK_CHANGESTATUS = "Event_GAME_TASK_CHANGESTATUS";
    //发送任务模式准备阶段数据填充事件
    EventConfig.Event_GAME_TASK_FILLDATA_PREPARA = "Event_GAME_TASK_FILLDATA_PREPARA";
    //发送任务模式进行阶段数据填充事件
    EventConfig.Event_GAME_TASK_FILLDATA_PROGRESS = "Event_GAME_TASK_FILLDATA_PROGRESS";
    //发送任务模式完成阶段数据填充事件
    EventConfig.Event_GAME_TASK_FILLDATA_FINISH = "Event_GAME_TASK_FILLDATA_FINISH";
    //发送任务模式准备阶段设置时间事件
    EventConfig.Event_GAME_TASK_SETTIME_PREPARA = "Event_GAME_TASK_SETTIME_PREPARA";
    //发送任务模式进行阶段设置点击事件
    EventConfig.Event_GAME_TASK_SETTOUCH_PROSS = "Event_GAME_TASK_SETTOUCH_PROSS";
    //发送任务模式进行阶段设置时间事件
    EventConfig.Event_GAME_TASK_SETTIME_PROSS = "Event_GAME_TASK_SETTIME_PROSS";
    //发送任务模式游戏中途暂停事件
    EventConfig.Event_GAME_TASK_PASUE = "Event_GAME_TASK_PASUE";
    //发送任务模式游戏继续事件
    EventConfig.Event_GAME_TASK_RESTART = "Event_GAME_TASK_RESTART";
    //向上调整游戏位置
    EventConfig.Event_GAME_POSITION_UP = "Event_GAME_POSITION_UP";
    //向下调整游戏位置
    EventConfig.Event_GAME_POSITION_DOWN = "Event_GAME_POSITION_DOWN";
    //缩小游戏尺寸
    EventConfig.Event_GAME_SCALE_DOWN = "Event_GAME_SCALE_DOWN";
    //放大游戏尺寸
    EventConfig.Event_GAME_SCALE_UP = "Event_GAME_SCALE_UP";
    //保存游戏调整后的设置
    EventConfig.Event_GAME_SAVESETUP = "Event_GAME_SAVESETUP";
    //保存时间模式位置设置
    EventConfig.Event_GAME_SAVESETUP_TIME = "Event_GAME_SAVESETUP_TIME";
    //保存任务模式位置设置
    EventConfig.Event_GAME_SAVESETUP_TASK = "Event_GAME_SAVESETUP_TASK";
    return EventConfig;
}());
__reflect(EventConfig.prototype, "EventConfig");
//# sourceMappingURL=EventConfig.js.map