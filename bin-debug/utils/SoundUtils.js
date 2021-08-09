var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var game;
(function (game) {
    var SoundUtils = (function () {
        function SoundUtils() {
        }
        SoundUtils.getInstance = function () {
            if (!this.instance) {
                this.instance = new SoundUtils();
            }
            return this.instance;
        };
        SoundUtils.prototype.playBgSound = function () {
            var musicId = GlobalData.gameNeedData.musicId;
            if (this.bgSounds) {
                this.bgSounds.play(0, -1);
            }
            else {
                this.bgSounds = RES.getRes("bg" + musicId + "_mp3");
                this.bgSoundChannel = this.bgSounds.play(0, -1);
                this.bgSounds.type = egret.Sound.MUSIC;
                this.bgSoundChannel.volume = 0.2;
            }
        };
        SoundUtils.prototype.stopBgSound = function () {
            if (this.bgSoundChannel) {
                this.bgSoundChannel.stop();
            }
        };
        SoundUtils.prototype.playTimeSound = function (time) {
            this.timeSounds = RES.getRes("time" + time + "_wav");
            if (this.timeSoundChannel) {
                this.timeSounds.play(0, 1);
            }
            else {
                this.timeSoundChannel = this.timeSounds.play(0, 1);
                this.timeSounds.type = egret.Sound.EFFECT;
                this.timeSoundChannel.volume = 1;
            }
        };
        SoundUtils.prototype.playHitSound = function (hitId) {
            this.hitSounds = RES.getRes("hit" + hitId + "_mp3");
            if (this.hitSoundChannel) {
                this.hitSounds.play(0, 1);
            }
            else {
                this.hitSoundChannel = this.hitSounds.play(0, 1);
                this.hitSounds.type = egret.Sound.EFFECT;
                this.hitSoundChannel.volume = 1;
            }
        };
        return SoundUtils;
    }());
    game.SoundUtils = SoundUtils;
    __reflect(SoundUtils.prototype, "game.SoundUtils");
})(game || (game = {}));
//# sourceMappingURL=SoundUtils.js.map