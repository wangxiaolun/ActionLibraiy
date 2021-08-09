var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/** 对象池*/
var DisplayObjectPool = (function () {
    function DisplayObjectPool() {
        /**
         * 作为对象池的词典dict
         */
        this.objPoolDict = {};
    }
    DisplayObjectPool.getInstance = function () {
        if (this.instance == undefined) {
            this.instance = new DisplayObjectPool();
        }
        return this.instance;
    };
    /**
     * 向对象池中放入对象，以便重复利用
     */
    DisplayObjectPool.prototype.push = function (oldObj) {
        // egret.getQualifiedClassName() --> 返回对象的完全限定类名
        var objName = egret.getQualifiedClassName(oldObj);
        if (oldObj == null)
            return;
        if (this.objPoolDict[objName] == undefined) {
            this.objPoolDict[objName] = [];
        }
        if (this.objPoolDict[objName].indexOf(oldObj) == -1) {
            this.objPoolDict[objName].push(oldObj);
        }
    };
    /**
     * 从对象池中取出需要的对象
     * @param targetObj 需要的对象类类名，没必要必须是类实例名 类名就可以
     * @return 取出的相应对象
     *
     */
    DisplayObjectPool.prototype.pop = function (targetObj) {
        var objName = egret.getQualifiedClassName(targetObj);
        if (this.objPoolDict[objName] != undefined && this.objPoolDict[objName].length > 0) {
            return this.objPoolDict[objName].pop();
        }
        var objClass = egret.getDefinitionByName(objName);
        var obj = new objClass;
        return obj;
    };
    return DisplayObjectPool;
}());
__reflect(DisplayObjectPool.prototype, "DisplayObjectPool");
//# sourceMappingURL=DisplayObjectPool.js.map