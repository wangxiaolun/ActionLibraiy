/**
 * 准备界面
 */

module game {

    export class ReadyPanel extends eui.Component {

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "ReadySkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }
        public group_logo: eui.Group;
        public label_bottomTip: eui.Label;
        public label_time: eui.Label;
        public label_tip: eui.Label;
        public icon_left: ui.CommonIcon;
        public icon_center: ui.CommonIcon;
        public icon_right: ui.CommonIcon;
        public img_leftBye: eui.Image;
        public img_centerBye: eui.Image;
        public img_rightBye: eui.Image;
        public btn_skip: eui.Button;
        public group_btn: eui.Group;
        public btn_back: eui.Button;
        public btn_touch: eui.Image;

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}