/** 视频播放界面 */
module game {

    export class VideoPanel extends eui.Component {
        public group_home: eui.Group;
        public label_name: eui.Label;
        public btn_start: eui.Button;
        public btn_setup: eui.Button;
        public group_intro: eui.Group;
        public btn_skip: eui.Button;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "VideoSkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }


        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}