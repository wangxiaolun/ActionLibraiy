module ui {
	export class CommonSettingItem extends eui.Component implements eui.UIComponent {

		public btn_reduce: eui.Image;
		public btn_add: eui.Image;
		public label_title: eui.Label;
		public label_num: eui.Label;

		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
			this.skinName = "CommonSettingItemSkin";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}

		private complete(): void {
			this.btn_reduce.addEventListener(egret.TouchEvent.TOUCH_TAP, this.reduce, this);
			this.btn_add.addEventListener(egret.TouchEvent.TOUCH_TAP, this.add, this);
		}

		public setBgData(reduceBg: string, addBg: string): void {
			this.btn_reduce.source = RES.getRes(reduceBg);
			this.btn_add.source = RES.getRes(addBg);
		}

		public setLabelData(titleStr: string): void {
			this.label_title.text = titleStr;
		}

		public setNum(str: string): void {
			this.label_num.text = str
		}

		public setBtnName(reduceName: string, addName: string): void {
			this.btn_reduce.name = reduceName;
			this.btn_add.name = addName;
		}

		private reduce(e: egret.TouchEvent): void {
			EffectUtils.playEffect(this.btn_reduce, 3);
			let reduceName: string = e.currentTarget.name;
			switch (reduceName) {
				case "cut1":
					if (GlobalData.timeOneData - 5 < 5) {
						GlobalData.timeOneData = 5;
					} else {
						GlobalData.timeOneData -= 5;
					}
					this.label_num.text = GlobalData.timeOneData + '"';
					break;
				case "cut2":
					if (GlobalData.timeTwoData - 5 < 5) {
						GlobalData.timeTwoData = 5;
					} else {
						GlobalData.timeTwoData -= 5;
					}
					this.label_num.text = GlobalData.timeTwoData + '"';
					break;
				case "cut3":
					if (GlobalData.timeThreeData - 1 < 1) {
						GlobalData.timeThreeData = 1;
					} else {
						GlobalData.timeThreeData -= 1;
					}
					this.label_num.text = GlobalData.timeThreeData + "";
					break;
				case "cuta":
					if (GlobalData.taskOneData - 5 < 5) {
						GlobalData.taskOneData = 5;
					} else {
						GlobalData.taskOneData -= 5;
					}
					this.label_num.text = GlobalData.taskOneData + "";
					break;
				case "cutb":
					if (GlobalData.taskTwoData - 5 < 5) {
						GlobalData.taskTwoData = 5;
					} else {
						GlobalData.taskTwoData -= 5;
					}
					this.label_num.text = GlobalData.taskTwoData + '"';
					break;
				case "cutc":
					if (GlobalData.taskThreeData - 1 < 1) {
						GlobalData.taskThreeData = 1;
					} else {
						GlobalData.taskThreeData -= 1;
					}
					this.label_num.text = GlobalData.taskThreeData + "";
					break;
			}
		}

		private add(e: egret.TouchEvent): void {
			EffectUtils.playEffect(this.btn_add, 3);
			let addName: string = e.currentTarget.name;
			switch (addName) {
				case "add1":
					if (GlobalData.timeOneData + 5 > 999) {
						GlobalData.timeOneData = 999;
					} else {
						GlobalData.timeOneData += 5;
					}
					this.label_num.text = GlobalData.timeOneData + '"';
					break;
				case "add2":
					if (GlobalData.timeTwoData + 5 > 999) {
						GlobalData.timeTwoData = 999;
					} else {
						GlobalData.timeTwoData += 5;
					}
					this.label_num.text = GlobalData.timeTwoData + '"';
					break;
				case "add3":
					if (GlobalData.timeThreeData + 1 > 999) {
						GlobalData.timeThreeData = 999;
					} else {
						GlobalData.timeThreeData += 1;
					}
					this.label_num.text = GlobalData.timeThreeData + "";
					break;
				case "adda":
					if (GlobalData.taskOneData + 5 > 999) {
						GlobalData.taskOneData = 999;
					} else {
						GlobalData.taskOneData += 5;
					}
					this.label_num.text = GlobalData.taskOneData + "";
					break;
				case "addb":
					if (GlobalData.taskTwoData + 5 > 999) {
						GlobalData.taskTwoData = 999;
					} else {
						GlobalData.taskTwoData += 5;
					}
					this.label_num.text = GlobalData.taskTwoData + '"';
					break;
				case "addc":
					if (GlobalData.taskThreeData + 1 > 999) {
						GlobalData.taskThreeData = 999;
					} else {
						GlobalData.taskThreeData += 1;
					}
					this.label_num.text = GlobalData.taskThreeData + "";
					break;
			}
		}
	}
}