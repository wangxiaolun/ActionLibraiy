/**
 * 登录界面
 */

module game {

    export class LoginPanel extends eui.Component {
        public group_logo: eui.Group;
        public group_btn: eui.Group;
        public btn_back: eui.Button;
        public btn_touch: eui.Image;
        public label_tip: eui.Label;
        public iconList1: CommonList;
        public iconList2: CommonList;
        public iconList3: CommonList;
        public btn_start: eui.Button;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "LoginSkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}