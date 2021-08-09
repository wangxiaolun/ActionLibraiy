class CommonGameForm extends eui.Component implements eui.UIComponent {

	public group_container: eui.Group;
	public gameIcon: CommonGameIcon;

	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this)
		this.skinName = "CommonGameFormSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}


	private complete(): void {

	}

	public setPlayerData(playerVo: PlayerVO): void {
		if (playerVo) {
			this.gameIcon.setIcon(playerVo.playerIcon);
		} else {
			this.gameIcon.setIcon("");
		}
	}

	public setStep(curNum: number, totalNum: number): void {
		this.gameIcon.setStep(curNum + "/" + totalNum);
	}

	public setTimeStr(timeNum: number): void {
		this.gameIcon.setTimer(Global.formatTime(timeNum, 1));
	}

	public setTouchNum(curTouch: number, totalTouch: number): void {
		this.gameIcon.setTouchNum(curTouch, totalTouch);
	}

	public setIconPos(topNum: number): void {
		this.gameIcon.top = topNum;
		this.gameIcon.horizontalCenter = 0;
		if (GlobalData.gameNeedData.actId == 11) {
			this.gameIcon.horizontalCenter = 50;
		} else if (GlobalData.gameNeedData.actId == 1 && GlobalData.gameNeedData.isHasPower) {
			this.gameIcon.horizontalCenter = -40;
		}
	}

	public setIconShow(isShow: boolean): void {
		this.gameIcon.visible = isShow;
	}

	public getStepNum(): Array<number> {
		return this.gameIcon.getStepArr();
	}

	public setGame(index: number): void {
		this.group_container.removeChildren();
		switch (GlobalData.gameNeedData.actId) {
			case 1: //战神
				let commonDiamond: CommmonDiamond = DisplayObjectPool.getInstance().pop(CommmonDiamond);
				commonDiamond.visible = true
				commonDiamond.setName("ball" + index);
				this.group_container.addChildAt(commonDiamond, 0);
				this.setIconPos(122);
				break;
			case 2: //花朵目标
				let commonFlower: CommonFlower = DisplayObjectPool.getInstance().pop(CommonFlower);
				commonFlower.visible = true;
				commonFlower.setName("ball" + index);
				this.group_container.addChildAt(commonFlower, 0);
				this.setIconPos(122);
				break;
			case 3: //心形目标
				let commonHeart: CommonHeart = DisplayObjectPool.getInstance().pop(CommonHeart);
				commonHeart.visible = true;
				commonHeart.setName("ball" + index);
				this.group_container.addChildAt(commonHeart, 0);
				this.setIconPos(471);
				break;
			case 4: //方形表格
				let commonTable: CommonTable = DisplayObjectPool.getInstance().pop(CommonTable);
				commonTable.visible = true;
				commonTable.setName("ball" + index);
				this.group_container.addChildAt(commonTable, 0);
				this.setIconPos(122);
				break;
			case 5: //圆形目标
				let commonBulls: CommonBulls = DisplayObjectPool.getInstance().pop(CommonBulls);
				commonBulls.visible = true;
				commonBulls.setName("ball" + index);
				this.group_container.addChildAt(commonBulls, 0);
				this.setIconPos(122);
				break;
			case 6: //条形目标
				let commonLinear: CommonLinear = DisplayObjectPool.getInstance().pop(CommonLinear);
				commonLinear.visible = true;
				commonLinear.setName("ball" + index);
				this.group_container.addChildAt(commonLinear, 0);
				this.setIconPos(122);
				break;
			case 7: //漂浮目标点
				let commonDarts: CommonDarts = DisplayObjectPool.getInstance().pop(CommonDarts);
				commonDarts.visible = true;
				commonDarts.setName("ball" + index);
				this.group_container.addChildAt(commonDarts, 0);
				this.setIconPos(122);
				break;
			case 8:  //三角菱形
				let commonTriangle: CommonTriangle = DisplayObjectPool.getInstance().pop(CommonTriangle);
				commonTriangle.visible = true;
				commonTriangle.setName("ball" + index);
				this.group_container.addChildAt(commonTriangle, 0);
				this.setIconPos(122);
				break;
			case 9: //哑铃
				let commonDumbbel: CommonDumbbel = DisplayObjectPool.getInstance().pop(CommonDumbbel);
				commonDumbbel.visible = true;
				commonDumbbel.setName("ball" + index);
				this.group_container.addChildAt(commonDumbbel, 0);
				this.setIconPos(122);
				break;
			case 10: //竖墙
				let commonRoad: CommonRoad = DisplayObjectPool.getInstance().pop(CommonRoad);
				commonRoad.visible = true;
				commonRoad.setName("ball" + index);
				this.group_container.addChildAt(commonRoad, 0);
				this.setIconPos(122);
				break;
			case 11: //雨滴
				let commonRain: CommonRain = DisplayObjectPool.getInstance().pop(CommonRain);
				commonRain.visible = true;
				commonRain.setName("ball" + index);
				this.group_container.addChildAt(commonRain, 0);
				this.setIconPos(975);
				break;
			case 12: //石头目标
				let commonStone: CommonStone = DisplayObjectPool.getInstance().pop(CommonStone);
				commonStone.visible = true;
				commonStone.setName("ball" + index);
				this.group_container.addChildAt(commonStone, 0);
				this.setIconPos(82);
				break;
			case 13: //飞镖
				let commonKite: CommonKite = DisplayObjectPool.getInstance().pop(CommonKite);
				commonKite.visible = true;
				commonKite.setName("ball" + index);
				this.group_container.addChildAt(commonKite, 0);
				this.setIconPos(82);
				break;
			case 14: //道路
				let commonTileMap: CommonTileMap = DisplayObjectPool.getInstance().pop(CommonTileMap);
				commonTileMap.visible = true;
				commonTileMap.setName("ball" + index);
				this.group_container.addChildAt(commonTileMap, 0);
				this.setIconPos(82);
				break;
			case 15: //人体骨骼
				let commonJoint: CommonJoint = DisplayObjectPool.getInstance().pop(CommonJoint);
				commonJoint.visible = true;
				commonJoint.setName("ball" + index);
				this.group_container.addChildAt(commonJoint, 0);
				this.setIconPos(82);
				break;
		}
	}

	public getRainGame(index: number, gametype: number): void {
		let commonRain: CommonRain = this.group_container.getChildAt(0) as CommonRain;
		if (commonRain) {
			if (gametype == 1) {
				commonRain.reStart();
			} else {
				commonRain.pauseGame();
			}
		}
	}

	public getFlowerGame(index: number, gametype: number): void {
		let commonFlower: CommonFlower = this.group_container.getChildAt(0) as CommonFlower;
		if (commonFlower) {
			if (gametype == 1) {
				commonFlower.reStart();
			} else {
				commonFlower.pauseGame();
			}
		}
	}

	public getGame(showType: number, index: number): void {
		switch (GlobalData.gameNeedData.actId) {
			case 1:
				if (GameShowData.diamon_bool) {
					let commonDiamond: CommmonDiamond = this.group_container.getChildAt(0) as CommmonDiamond;
					if (commonDiamond) {
						commonDiamond.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 2:
				if (GameShowData.flower_bool) {
					let commonFlower: CommonFlower = this.group_container.getChildAt(0) as CommonFlower;
					if (commonFlower) {
						commonFlower.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 3:
				if (GameShowData.heart_bool) {
					let commonHeart: CommonHeart = this.group_container.getChildAt(0) as CommonHeart;
					if (commonHeart) {
						commonHeart.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 4:
				if (GameShowData.tabel_bool) {
					let commonTable: CommonTable = this.group_container.getChildAt(0) as CommonTable;
					if (commonTable) {
						commonTable.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 5:
				if (GameShowData.bull_bool) {
					let commonBulls: CommonBulls = this.group_container.getChildAt(0) as CommonBulls;
					if (commonBulls) {
						commonBulls.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 6:
				if (GameShowData.linear_bool) {
					let commonLinear: CommonLinear = this.group_container.getChildAt(0) as CommonLinear;
					if (commonLinear) {
						commonLinear.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 7:
				if (GameShowData.dart_bool) {
					let commonDarts: CommonDarts = this.group_container.getChildAt(0) as CommonDarts;
					if (commonDarts) {
						commonDarts.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 8:
				if (GameShowData.triangle_bool) {
					let commonTriangle: CommonTriangle = this.group_container.getChildAt(0) as CommonTriangle;
					if (commonTriangle) {
						commonTriangle.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 9:
				if (GameShowData.dumbbel_bool) {
					let commonDumbbel: CommonDumbbel = this.group_container.getChildAt(0) as CommonDumbbel;
					if (commonDumbbel) {
						commonDumbbel.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 10:
				if (GameShowData.road_bool) {
					let commonRoad: CommonRoad = this.group_container.getChildAt(0) as CommonRoad;
					if (commonRoad) {
						commonRoad.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 11:
				if (GameShowData.rain_bool) {
					let commonRain: CommonRain = this.group_container.getChildAt(0) as CommonRain;
					if (commonRain) {
						commonRain.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 12:
				if (GameShowData.stone_bool) {
					let commonStone: CommonStone = this.group_container.getChildAt(0) as CommonStone;
					if (commonStone) {
						commonStone.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 13:
				if (GameShowData.kite_bool) {
					let commonKite: CommonKite = this.group_container.getChildAt(0) as CommonKite;
					if (commonKite) {
						commonKite.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 14:
				if (GameShowData.tilemap_bool) {
					let commonTileMap: CommonTileMap = this.group_container.getChildAt(0) as CommonTileMap;
					if (commonTileMap) {
						commonTileMap.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;
			case 15:
				if (GameShowData.joint_bool) {
					let commonJoint: CommonJoint = this.group_container.getChildAt(0) as CommonJoint;
					if (commonJoint) {
						commonJoint.setPos(showType, index);
					}
				} else {
					TipsUtils.showTipsFromCenter("该动作无法修改");
				}
				break;

		}
	}

	public getStone(vo: PreparaVO): void {
		let commonStone: CommonStone = this.group_container.getChildAt(0) as CommonStone;
		if (commonStone) {
			commonStone.randomObj();
		}
	}
}