/**
 * 成绩界面
 */

module game {

    export class ResultPanel extends eui.Component {
        public img_bg: eui.Image;
        public group_logo: eui.Group;
        public list_left: eui.List;
        public list_right: eui.List;
        public label_title: eui.Label;
        public btn_pre: eui.Button;
        public btn_next: eui.Button;
        public btn_newChange: eui.Button;
        public btn_changeRank: eui.Button;
        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "ResultSkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}