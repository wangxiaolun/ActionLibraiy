  /**
    * 游戏玩家数据存储vo
    */
class PlayerVO {

    /** 玩家ID 0:正式玩家 -1:添加按钮  -2:临时玩家*/
    public playerId: number = 0;

    /** 玩家用户ID */
    public playerUid: string = "";

    /** 玩家排序 */
    public rankNum: number = 0;
    
    /** 玩家名称 */
    public playerName: string = "";

    /** 玩家头像 */
    public playerIcon: string = "";

    /** 玩家训练次数 */
    public playNums: number = 0;

    /** 玩家本轮所用时间 */
    public playEveryTimes: number = 0;

    /** 玩家训练时间 */
    public playTimes: number = 0;

    /** 玩家消耗的卡路里 */
    public useCard: number = 0;

    /** 玩家训练的动作库 */
    public actionArr:Array<ActionVO> = [];
}
