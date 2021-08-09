var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
/** 视频播放界面 */
var game;
(function (game) {
    var VideoPanel = (function (_super) {
        __extends(VideoPanel, _super);
        function VideoPanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = "VideoSkin";
            return _this;
        }
        VideoPanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        VideoPanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        return VideoPanel;
    }(eui.Component));
    game.VideoPanel = VideoPanel;
    __reflect(VideoPanel.prototype, "game.VideoPanel");
})(game || (game = {}));
//# sourceMappingURL=VideoPanel.js.map