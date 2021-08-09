var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
  * 游戏玩家数据存储vo
  */
var PlayerVO = (function () {
    function PlayerVO() {
        /** 玩家ID 0:正式玩家 -1:添加按钮  -2:临时玩家*/
        this.playerId = 0;
        /** 玩家用户ID */
        this.playerUid = "";
        /** 玩家排序 */
        this.rankNum = 0;
        /** 玩家名称 */
        this.playerName = "";
        /** 玩家头像 */
        this.playerIcon = "";
        /** 玩家训练次数 */
        this.playNums = 0;
        /** 玩家本轮所用时间 */
        this.playEveryTimes = 0;
        /** 玩家训练时间 */
        this.playTimes = 0;
        /** 玩家消耗的卡路里 */
        this.useCard = 0;
        /** 玩家训练的动作库 */
        this.actionArr = [];
    }
    return PlayerVO;
}());
__reflect(PlayerVO.prototype, "PlayerVO");
//# sourceMappingURL=PlayerVo.js.map