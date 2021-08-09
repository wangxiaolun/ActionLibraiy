module ui {
	export class CommonSetting extends eui.Component implements eui.UIComponent {

		public img_timeTitleBg: eui.Image;
		public img_timeBg: eui.Image;
		public item_top: ui.CommonSettingItem;
		public item_center: ui.CommonSettingItem;
		public item_bottom: ui.CommonSettingItem;

		public constructor() {
			super();
			this.addEventListener(eui.UIEvent.COMPLETE, this.complete, this);
			this.skinName = "CommonSettingSkin";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
		}

		private complete(): void {
		}

		public setBg(arr:Array<string>){ 
			this.img_timeBg.source = RES.getRes(arr[0]);
			this.img_timeTitleBg.source = RES.getRes(arr[1]);
			this.item_top.setBgData(arr[2],arr[3]);
			this.item_center.setBgData(arr[2],arr[3]);
			this.item_bottom.setBgData(arr[2],arr[3]);
			this.item_top.setLabelData(arr[4]);
			this.item_center.setLabelData(arr[5]);
			this.item_bottom.setLabelData(arr[6]);
		}

		public setTouch(bool:boolean):void{
			this.item_top.btn_reduce.touchEnabled = bool;
			this.item_center.btn_reduce.touchEnabled = bool;
			this.item_bottom.btn_reduce.touchEnabled = bool;
			this.item_top.btn_add.touchEnabled = bool;
			this.item_center.btn_add.touchEnabled = bool;
			this.item_bottom.btn_add.touchEnabled = bool; 
		}

		public setNumData(topStr:string,centerStr:string,rightStr:string):void{
			this.item_top.setNum(topStr);
			this.item_center.setNum(centerStr);
			this.item_bottom.setNum(rightStr);
		}

		public setBtnName(btnNameArr:Array<string>):void{
			this.item_top.setBtnName(btnNameArr[0],btnNameArr[1]);
			this.item_center.setBtnName(btnNameArr[2],btnNameArr[3]);
			this.item_bottom.setBtnName(btnNameArr[4],btnNameArr[5]);
		}
	}
}