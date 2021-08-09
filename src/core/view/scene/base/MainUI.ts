/**
 * 主界面
 */
module game {

    export class MainUI extends eui.Component {

        private _video: egret.Video;
        private _pauseTime: number = 0;
        public img_bg: eui.Image;

        public constructor() {
            super();
            this.addEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
            this.skinName = "MainUISkin";
        }

        public partAdded(partName: string, instance: any): void {
            super.partAdded(partName, instance);
        }

        private loadComplete(): void {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.loadComplete, this);
            this.img_bg.x = 0
            game.SoundUtils.getInstance().playBgSound();
        }

        private resetBg(): void {
            egret.Tween.removeTweens(this.img_bg);
            egret.Tween.get(this.img_bg).to({ x: -350 }, 8000).wait(350).call(() => {
                egret.Tween.get(this.img_bg).to({ x: 0 }, 8000).wait(350).call(this.resetBg, this);
            }, this);
        }

        public changeBg(dataSource: string): void {
            this.img_bg.x = 0;
            this.img_bg.source = RES.getRes(dataSource);
            this.resetBg();
        }
    }
}