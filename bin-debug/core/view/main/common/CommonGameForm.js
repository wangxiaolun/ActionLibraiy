var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var CommonGameForm = (function (_super) {
    __extends(CommonGameForm, _super);
    function CommonGameForm() {
        var _this = _super.call(this) || this;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.complete, _this);
        _this.skinName = "CommonGameFormSkin";
        return _this;
    }
    CommonGameForm.prototype.partAdded = function (partName, instance) {
        _super.prototype.partAdded.call(this, partName, instance);
    };
    CommonGameForm.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
    };
    CommonGameForm.prototype.complete = function () {
    };
    CommonGameForm.prototype.setPlayerData = function (playerVo) {
        if (playerVo) {
            this.gameIcon.setIcon(playerVo.playerIcon);
        }
        else {
            this.gameIcon.setIcon("");
        }
    };
    CommonGameForm.prototype.setStep = function (curNum, totalNum) {
        this.gameIcon.setStep(curNum + "/" + totalNum);
    };
    CommonGameForm.prototype.setTimeStr = function (timeNum) {
        this.gameIcon.setTimer(Global.formatTime(timeNum, 1));
    };
    CommonGameForm.prototype.setTouchNum = function (curTouch, totalTouch) {
        this.gameIcon.setTouchNum(curTouch, totalTouch);
    };
    CommonGameForm.prototype.setIconPos = function (topNum) {
        this.gameIcon.top = topNum;
        this.gameIcon.horizontalCenter = 0;
        if (GlobalData.gameNeedData.actId == 11) {
            this.gameIcon.horizontalCenter = 50;
        }
        else if (GlobalData.gameNeedData.actId == 1 && GlobalData.gameNeedData.isHasPower) {
            this.gameIcon.horizontalCenter = -40;
        }
    };
    CommonGameForm.prototype.setIconShow = function (isShow) {
        this.gameIcon.visible = isShow;
    };
    CommonGameForm.prototype.getStepNum = function () {
        return this.gameIcon.getStepArr();
    };
    CommonGameForm.prototype.setGame = function (index) {
        this.group_container.removeChildren();
        switch (GlobalData.gameNeedData.actId) {
            case 1://战神
                var commonDiamond = DisplayObjectPool.getInstance().pop(CommmonDiamond);
                commonDiamond.visible = true;
                commonDiamond.setName("ball" + index);
                this.group_container.addChildAt(commonDiamond, 0);
                this.setIconPos(122);
                break;
            case 2://花朵目标
                var commonFlower = DisplayObjectPool.getInstance().pop(CommonFlower);
                commonFlower.visible = true;
                commonFlower.setName("ball" + index);
                this.group_container.addChildAt(commonFlower, 0);
                this.setIconPos(122);
                break;
            case 3://心形目标
                var commonHeart = DisplayObjectPool.getInstance().pop(CommonHeart);
                commonHeart.visible = true;
                commonHeart.setName("ball" + index);
                this.group_container.addChildAt(commonHeart, 0);
                this.setIconPos(471);
                break;
            case 4://方形表格
                var commonTable = DisplayObjectPool.getInstance().pop(CommonTable);
                commonTable.visible = true;
                commonTable.setName("ball" + index);
                this.group_container.addChildAt(commonTable, 0);
                this.setIconPos(122);
                break;
            case 5://圆形目标
                var commonBulls = DisplayObjectPool.getInstance().pop(CommonBulls);
                commonBulls.visible = true;
                commonBulls.setName("ball" + index);
                this.group_container.addChildAt(commonBulls, 0);
                this.setIconPos(122);
                break;
            case 6://条形目标
                var commonLinear = DisplayObjectPool.getInstance().pop(CommonLinear);
                commonLinear.visible = true;
                commonLinear.setName("ball" + index);
                this.group_container.addChildAt(commonLinear, 0);
                this.setIconPos(122);
                break;
            case 7://漂浮目标点
                var commonDarts = DisplayObjectPool.getInstance().pop(CommonDarts);
                commonDarts.visible = true;
                commonDarts.setName("ball" + index);
                this.group_container.addChildAt(commonDarts, 0);
                this.setIconPos(122);
                break;
            case 8://三角菱形
                var commonTriangle = DisplayObjectPool.getInstance().pop(CommonTriangle);
                commonTriangle.visible = true;
                commonTriangle.setName("ball" + index);
                this.group_container.addChildAt(commonTriangle, 0);
                this.setIconPos(122);
                break;
            case 9://哑铃
                var commonDumbbel = DisplayObjectPool.getInstance().pop(CommonDumbbel);
                commonDumbbel.visible = true;
                commonDumbbel.setName("ball" + index);
                this.group_container.addChildAt(commonDumbbel, 0);
                this.setIconPos(122);
                break;
            case 10://竖墙
                var commonRoad = DisplayObjectPool.getInstance().pop(CommonRoad);
                commonRoad.visible = true;
                commonRoad.setName("ball" + index);
                this.group_container.addChildAt(commonRoad, 0);
                this.setIconPos(122);
                break;
            case 11://雨滴
                var commonRain = DisplayObjectPool.getInstance().pop(CommonRain);
                commonRain.visible = true;
                commonRain.setName("ball" + index);
                this.group_container.addChildAt(commonRain, 0);
                this.setIconPos(975);
                break;
            case 12://石头目标
                var commonStone = DisplayObjectPool.getInstance().pop(CommonStone);
                commonStone.visible = true;
                commonStone.setName("ball" + index);
                this.group_container.addChildAt(commonStone, 0);
                this.setIconPos(82);
                break;
            case 13://飞镖
                var commonKite = DisplayObjectPool.getInstance().pop(CommonKite);
                commonKite.visible = true;
                commonKite.setName("ball" + index);
                this.group_container.addChildAt(commonKite, 0);
                this.setIconPos(82);
                break;
            case 14://道路
                var commonTileMap = DisplayObjectPool.getInstance().pop(CommonTileMap);
                commonTileMap.visible = true;
                commonTileMap.setName("ball" + index);
                this.group_container.addChildAt(commonTileMap, 0);
                this.setIconPos(82);
                break;
            case 15://人体骨骼
                var commonJoint = DisplayObjectPool.getInstance().pop(CommonJoint);
                commonJoint.visible = true;
                commonJoint.setName("ball" + index);
                this.group_container.addChildAt(commonJoint, 0);
                this.setIconPos(82);
                break;
        }
    };
    CommonGameForm.prototype.getRainGame = function (index, gametype) {
        var commonRain = this.group_container.getChildAt(0);
        if (commonRain) {
            if (gametype == 1) {
                commonRain.reStart();
            }
            else {
                commonRain.pauseGame();
            }
        }
    };
    CommonGameForm.prototype.getFlowerGame = function (index, gametype) {
        var commonFlower = this.group_container.getChildAt(0);
        if (commonFlower) {
            if (gametype == 1) {
                commonFlower.reStart();
            }
            else {
                commonFlower.pauseGame();
            }
        }
    };
    CommonGameForm.prototype.getGame = function (showType, index) {
        switch (GlobalData.gameNeedData.actId) {
            case 1:
                if (GameShowData.diamon_bool) {
                    var commonDiamond = this.group_container.getChildAt(0);
                    if (commonDiamond) {
                        commonDiamond.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 2:
                if (GameShowData.flower_bool) {
                    var commonFlower = this.group_container.getChildAt(0);
                    if (commonFlower) {
                        commonFlower.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 3:
                if (GameShowData.heart_bool) {
                    var commonHeart = this.group_container.getChildAt(0);
                    if (commonHeart) {
                        commonHeart.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 4:
                if (GameShowData.tabel_bool) {
                    var commonTable = this.group_container.getChildAt(0);
                    if (commonTable) {
                        commonTable.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 5:
                if (GameShowData.bull_bool) {
                    var commonBulls = this.group_container.getChildAt(0);
                    if (commonBulls) {
                        commonBulls.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 6:
                if (GameShowData.linear_bool) {
                    var commonLinear = this.group_container.getChildAt(0);
                    if (commonLinear) {
                        commonLinear.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 7:
                if (GameShowData.dart_bool) {
                    var commonDarts = this.group_container.getChildAt(0);
                    if (commonDarts) {
                        commonDarts.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 8:
                if (GameShowData.triangle_bool) {
                    var commonTriangle = this.group_container.getChildAt(0);
                    if (commonTriangle) {
                        commonTriangle.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 9:
                if (GameShowData.dumbbel_bool) {
                    var commonDumbbel = this.group_container.getChildAt(0);
                    if (commonDumbbel) {
                        commonDumbbel.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 10:
                if (GameShowData.road_bool) {
                    var commonRoad = this.group_container.getChildAt(0);
                    if (commonRoad) {
                        commonRoad.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 11:
                if (GameShowData.rain_bool) {
                    var commonRain = this.group_container.getChildAt(0);
                    if (commonRain) {
                        commonRain.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 12:
                if (GameShowData.stone_bool) {
                    var commonStone = this.group_container.getChildAt(0);
                    if (commonStone) {
                        commonStone.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 13:
                if (GameShowData.kite_bool) {
                    var commonKite = this.group_container.getChildAt(0);
                    if (commonKite) {
                        commonKite.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 14:
                if (GameShowData.tilemap_bool) {
                    var commonTileMap = this.group_container.getChildAt(0);
                    if (commonTileMap) {
                        commonTileMap.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
            case 15:
                if (GameShowData.joint_bool) {
                    var commonJoint = this.group_container.getChildAt(0);
                    if (commonJoint) {
                        commonJoint.setPos(showType, index);
                    }
                }
                else {
                    TipsUtils.showTipsFromCenter("该动作无法修改");
                }
                break;
        }
    };
    CommonGameForm.prototype.getStone = function (vo) {
        var commonStone = this.group_container.getChildAt(0);
        if (commonStone) {
            commonStone.randomObj();
        }
    };
    return CommonGameForm;
}(eui.Component));
__reflect(CommonGameForm.prototype, "CommonGameForm", ["eui.UIComponent", "egret.DisplayObject"]);
//# sourceMappingURL=CommonGameForm.js.map