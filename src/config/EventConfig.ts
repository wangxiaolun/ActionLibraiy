/**
 * 数据变更事件队列
 */
class EventConfig {


    public constructor() {

    }

    //更新玩家数据
    public static Event_UPDATE_PLAYER: string = "Event_UPDATE_PLAYER";

    //更新时间模式点击数据
    public static Event_UPDATE_TOUCHNUM_TIME: string = "Event_UPDATE_TOUCHNUM_TIME";

    //更新时间模式时间数据
    public static Event_UPDATE_TIMENUM_TIME: string = "Event_UPDATE_TIMENUM_TIME";

    //更新时间模式步数数据
    public static Event_UPDATE_STEPNUM_TIME: string = "Event_UPDATE_STEPNUM_TIME";

    public static Event_UPDATE_TOUCH_TIME_CHANGE: string = "Event_UPDATE_TOUCH_TIME_CHANGE";

    //更新任务模式点击数据
    public static Event_UPDATE_TOUCH_Task: string = "Event_UPDATE_TOUCH_Task";

    //更新任务模式点击数据显示
    public static Event_UPDATE_TOUCH_Task_Show: string = "Event_UPDATE_TOUCH_Task_Show";

    //更新点击后目标变换
    public static Event_UPDATE_TOUCH_TASK_CHANGE: string = "Event_UPDATE_TOUCH_TASK_CHANGE";

    //任务界面跳过按钮
    public static Event_SKIP_TASK_PREPRA: string = "Event_SKIP_TASK_PREPRA";

    //切换背景图片
    public static Event_CHANGE_GAMEBG: string = "Event_CHANGE_GAMEBG";

    // 倒计时重来
    public static Event_GAME_COUNTDOWN_RESET: string = "Event_GAME_COUNTDOWN_RESET";

    // 时间模式(重来/退出)
    public static Event_GAME_TIME_RESET: string = "Event_GAME_TIME_RESET";

    // 任务模式重来
    public static Event_GAME_TASK_RESET: string = "Event_GAME_TASK_RESET";

    // 时间模式游戏继续
    public static Event_TIMEGAME_CONTAINUE: string = "Event_TIMEGAME_CONTAINUE";

    // 任务模式游戏继续
    public static Event_TASKGAME_CONTAINUE: string = "Event_TASKGAME_CONTAINUE";

    // 游戏调整
    // public static Event_GAME_UPSET: string = "Event_GAME_UPSET";



    //发送任务模式状态更新事件
    public static Event_GAME_TASK_CHANGESTATUS: string = "Event_GAME_TASK_CHANGESTATUS";

    //发送任务模式准备阶段数据填充事件
    public static Event_GAME_TASK_FILLDATA_PREPARA: string = "Event_GAME_TASK_FILLDATA_PREPARA";

    //发送任务模式进行阶段数据填充事件
    public static Event_GAME_TASK_FILLDATA_PROGRESS: string = "Event_GAME_TASK_FILLDATA_PROGRESS";

    //发送任务模式完成阶段数据填充事件
    public static Event_GAME_TASK_FILLDATA_FINISH: string = "Event_GAME_TASK_FILLDATA_FINISH";

    //发送任务模式准备阶段设置时间事件
    public static Event_GAME_TASK_SETTIME_PREPARA: string = "Event_GAME_TASK_SETTIME_PREPARA";

    //发送任务模式进行阶段设置点击事件
    public static Event_GAME_TASK_SETTOUCH_PROSS: string = "Event_GAME_TASK_SETTOUCH_PROSS";

    //发送任务模式进行阶段设置时间事件
    public static Event_GAME_TASK_SETTIME_PROSS: string = "Event_GAME_TASK_SETTIME_PROSS";


    //发送任务模式游戏中途暂停事件
    public static Event_GAME_TASK_PASUE: string = "Event_GAME_TASK_PASUE";

    //发送任务模式游戏继续事件
    public static Event_GAME_TASK_RESTART: string = "Event_GAME_TASK_RESTART";


    //向上调整游戏位置
    public static Event_GAME_POSITION_UP: string = "Event_GAME_POSITION_UP";

    //向下调整游戏位置
    public static Event_GAME_POSITION_DOWN: string = "Event_GAME_POSITION_DOWN";

    //缩小游戏尺寸
    public static Event_GAME_SCALE_DOWN: string = "Event_GAME_SCALE_DOWN";

    //放大游戏尺寸
    public static Event_GAME_SCALE_UP: string = "Event_GAME_SCALE_UP";

    //保存游戏调整后的设置
    public static Event_GAME_SAVESETUP: string = "Event_GAME_SAVESETUP";

    //保存时间模式位置设置
    public static Event_GAME_SAVESETUP_TIME: string = "Event_GAME_SAVESETUP_TIME";

    //保存任务模式位置设置
    public static Event_GAME_SAVESETUP_TASK: string = "Event_GAME_SAVESETUP_TASK";

}