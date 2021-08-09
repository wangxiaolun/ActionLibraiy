/**
 * 
 */

module game {

    export class SetUpPanel extends eui.Component {
        public btn_save: eui.Button;
        public btn_cancle: eui.Button;
        public btn_time: ui.CommonSetting;
        public btn_task: ui.CommonSetting;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
            // this.skinName = "src/core/view/panel/ui/ShopSkin.exml";
            this.skinName = "SetUpSkin";
        }

        public createCompleteEvent(event: eui.UIEvent): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        }


        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }
    }
}