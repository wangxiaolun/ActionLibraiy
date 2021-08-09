/**
 * 任务模式界面
 * 
 */
module game {

    export class TaskTypePanel extends eui.Component {
        public group_logo: eui.Group;
        public l_finish: CommonFinish;
        public l_prepara: CommonCutDown;
        public l_progress: CommonGameForm;
        public c_finish: CommonFinish;
        public c_prepara: CommonCutDown;
        public c_progress: CommonGameForm;
        public r_finish: CommonFinish;
        public r_prepara: CommonCutDown;
        public r_progress: CommonGameForm;
        public group_btn: eui.Group;
        public btn_back: eui.Button;
        public btn_touch: eui.Image;
        public btn_result: eui.Button;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            this.skinName = "TaskTypeSkin";
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