module game {

    export class SoundUtils {

        public hitSounds: egret.Sound;
        public bgSounds: egret.Sound;
        public timeSounds: egret.Sound;

        public hitSoundChannel: egret.SoundChannel;
        public bgSoundChannel: egret.SoundChannel;
        public timeSoundChannel: egret.SoundChannel;

        private static instance: SoundUtils;

        constructor() {
        }

        public static getInstance(): SoundUtils {
            if (!this.instance) {
                this.instance = new SoundUtils();
            }

            return this.instance;
        }

        public playBgSound(): void {
            let musicId: number = GlobalData.gameNeedData.musicId;
            if (this.bgSounds) {
                this.bgSounds.play(0, -1);
            } else {
                this.bgSounds = RES.getRes("bg" + musicId + "_mp3");
                this.bgSoundChannel = this.bgSounds.play(0, -1);
                this.bgSounds.type = egret.Sound.MUSIC;
                this.bgSoundChannel.volume = 0.2;
            }
        }

        public stopBgSound(): void {
            if (this.bgSoundChannel) {
                this.bgSoundChannel.stop();
            }
        }

        public playTimeSound(time: number): void {
            this.timeSounds = RES.getRes("time" + time + "_wav");
            if (this.timeSoundChannel) {
                this.timeSounds.play(0, 1);
            } else {
                this.timeSoundChannel = this.timeSounds.play(0, 1);
                this.timeSounds.type = egret.Sound.EFFECT;
                this.timeSoundChannel.volume = 1;
            }
        }

        public playHitSound(hitId: number): void {
            this.hitSounds = RES.getRes("hit" + hitId + "_mp3");
            if (this.hitSoundChannel) {
                this.hitSounds.play(0, 1);
            } else {
                this.hitSoundChannel = this.hitSounds.play(0, 1);
                this.hitSounds.type = egret.Sound.EFFECT;
                this.hitSoundChannel.volume = 1;
            }
        }
    }
}