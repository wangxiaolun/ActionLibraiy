/**
 * 调整界面
 */

module game {

    export class TrimPanel extends eui.Component {
        public img_bg: eui.Image;
        public group_logo: eui.Group;
        public game1: CommonGameForm;
        public game2: CommonGameForm;
        public game3: CommonGameForm;
        public group_btn: eui.Group;
        public btn_touch: eui.Image;
        public btn_back: eui.Button;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "TrimSkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }


        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}