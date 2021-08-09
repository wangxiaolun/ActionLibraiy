var StorageUtils;
(function (StorageUtils) {
    function getLocalStorage() {
        var curStr = "actLibraiy" + GlobalData.gameNeedData.actId + "_";
        if (egret.localStorage.getItem(curStr + "checkType")) {
            GlobalData.checkType = (parseInt(egret.localStorage.getItem(curStr + "checkType")) == 1) ? true : false;
            GlobalData.timeOneData = parseInt(egret.localStorage.getItem(curStr + "timeOneData"));
            GlobalData.timeTwoData = parseInt(egret.localStorage.getItem(curStr + "timeTwoData"));
            GlobalData.timeThreeData = parseInt(egret.localStorage.getItem(curStr + "timeThreeData"));
            GlobalData.taskOneData = parseInt(egret.localStorage.getItem(curStr + "taskOneData"));
            GlobalData.taskTwoData = parseInt(egret.localStorage.getItem(curStr + "taskTwoData"));
            GlobalData.taskThreeData = parseInt(egret.localStorage.getItem(curStr + "taskThreeData"));
        }
        else {
            StorageUtils.setLocalStorage();
        }
    }
    StorageUtils.getLocalStorage = getLocalStorage;
    function setLocalStorage() {
        var curStr = "actLibraiy" + GlobalData.gameNeedData.actId + "_";
        (GlobalData.checkType) ? egret.localStorage.setItem(curStr + "checkType", "1") : egret.localStorage.setItem(curStr + "checkType", "2");
        egret.localStorage.setItem(curStr + "timeOneData", GlobalData.timeOneData + "");
        egret.localStorage.setItem(curStr + "timeTwoData", GlobalData.timeTwoData + "");
        egret.localStorage.setItem(curStr + "timeThreeData", GlobalData.timeThreeData + "");
        egret.localStorage.setItem(curStr + "taskOneData", GlobalData.taskOneData + "");
        egret.localStorage.setItem(curStr + "taskTwoData", GlobalData.taskTwoData + "");
        egret.localStorage.setItem(curStr + "taskThreeData", GlobalData.taskThreeData + "");
    }
    StorageUtils.setLocalStorage = setLocalStorage;
})(StorageUtils || (StorageUtils = {}));
//# sourceMappingURL=StorageUtils.js.map