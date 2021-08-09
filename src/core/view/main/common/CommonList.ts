class CommonList extends eui.Component implements eui.UIComponent {
	public group_panel: eui.Group;
	private listIndex: number = 0;
	public constructor() {
		super();
		this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
		this.skinName = "CommonListSkin";
	}

	protected partAdded(partName: string, instance: any): void {
		super.partAdded(partName, instance);
	}


	protected childrenCreated(): void {
		super.childrenCreated();
	}

	private complete(): void {
	}

	public initView(): void {
		this.group_panel.removeChildren();
	}

	public getNumChild(): number {
		if (this.group_panel.numChildren > 0) {
			return 1;
		} else {
			return 0;
		}
	}


	public setGroupData(dataArr: Array<PlayerVO>, listIndex: number): void {
		this.listIndex = listIndex;
		this.group_panel.removeChildren();
		if (dataArr.length > 0) {
			for (let i: number = 0; i < dataArr.length; i++) {
				let vo: PlayerVO = dataArr[i];
				let img: CommonListItem = new CommonListItem();
				img.skinUrl = vo.playerIcon;
				img.dataVO = vo;
				this.group_panel.addChild(img);
				img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.checkPlayer, this);
				if (i >= 3) {
					img.x = parseInt((i - 3) % 3 + "") * (img.width + 10);
					img.y = (parseInt((i - 3) / 3 + "") + 1) * (img.height + 10);
				} else {
					img.x = i * (img.width + 10);
				}
			}
		}
	}

	private checkPlayer(evt: egret.TouchEvent): void {
		let target: CommonListItem = evt.currentTarget;
		let vo: PlayerVO = target.dataVO;
		EffectUtils.playEffect(target, 1, () => {
			if (this.listIndex == 1) {
				if (vo.playerId == -1) {
					PlayerModel.getInstance().addLeftPlayer();
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 1);
				} else if (vo.playerId == -2) {
					PlayerModel.getInstance().deleteLeftPlayer(vo);
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 1);
				}
			} else if (this.listIndex == 2) {
				if (vo.playerId == -1) {
					PlayerModel.getInstance().addCenterPlayer();
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 2);
				} else if (vo.playerId == -2) {
					PlayerModel.getInstance().deleteCenterPlayer(vo);
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 2);
				}
			} else if (this.listIndex == 3) {
				if (vo.playerId == -1) {
					PlayerModel.getInstance().addRightPlayer();
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 3);
				} else if (vo.playerId == -2) {
					PlayerModel.getInstance().deleteRightPlayer(vo);
					game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, 3);
				}
			}
		});
	}

	private updatePlayer(data: DelteVO): void {
		// if (data.id == 1) {
		// 	P.getGameDataProxy().deleteLeftPlayer(data.vo);
		// } else if (data.id == 2) {
		// 	P.getGameDataProxy().deleteCenterPlayer(data.vo);
		// } else if (data.id == 3) {
		// 	P.getGameDataProxy().deleteRightPlayer(data.vo);
		// }
		// game.AppFacade.getInstance().sendNotification(EventConfig.Event_UPDATE_PLAYER, data.id);
	}
}