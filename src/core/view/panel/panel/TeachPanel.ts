/**
 * 教程播放视频界面
 */

module game {

    export class TeachPanel extends eui.Component {

        public btn_back: eui.Button;
        public list: eui.List;
        public btn_pre: eui.Button;
        public btn_next: eui.Button;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "TeachSkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }


        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}