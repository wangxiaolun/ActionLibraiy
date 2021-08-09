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
/**
 * 任务模式界面
 *
 */
var game;
(function (game) {
    var TaskTypePanel = (function (_super) {
        __extends(TaskTypePanel, _super);
        function TaskTypePanel() {
            var _this = _super.call(this) || this;
            _this.addEventListener(eui.UIEvent.COMPLETE, _this.createCompleteEvent, _this);
            _this.skinName = "TaskTypeSkin";
            return _this;
        }
        TaskTypePanel.prototype.createCompleteEvent = function (event) {
            this.removeEventListener(eui.UIEvent.COMPLETE, this.createCompleteEvent, this);
        };
        TaskTypePanel.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        TaskTypePanel.prototype.partRemoved = function (partName, instance) {
            _super.prototype.partRemoved.call(this, partName, instance);
        };
        return TaskTypePanel;
    }(eui.Component));
    game.TaskTypePanel = TaskTypePanel;
    __reflect(TaskTypePanel.prototype, "game.TaskTypePanel");
})(game || (game = {}));
//# sourceMappingURL=TaskTypePanel.js.map