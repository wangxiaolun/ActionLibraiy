/**
 * 时间模式完成界面
 * 
 */
module game {

    export class TimeFinishPanel extends eui.Component {
        public group_logo: eui.Group;
        public btn_result: eui.Button;
        public l_finish: CommonFinish;
        public c_finish: CommonFinish;
        public r_finish: CommonFinish;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "TimeFinishSkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        public partRemoved(partName: string, instance: any): void {
            super.partRemoved(partName, instance);
        }

    }
}