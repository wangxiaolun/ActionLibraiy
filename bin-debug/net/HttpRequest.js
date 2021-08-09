var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var http;
(function (http) {
    var HttpRequest = (function () {
        function HttpRequest() {
        }
        HttpRequest.init = function (urlStr) {
            this.url = urlStr;
        };
        /**
         * 封装httpRequest Get请求
         * @param sendUrl: 请求的地址
         * @param data: 请求传输的数据
         */
        HttpRequest.get = function (sendUrl, data) {
            sendUrl = this.url + sendUrl;
            var request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            if (data) {
                var param = JSON.stringify(data);
                request.open(sendUrl + "?" + param, egret.HttpMethod.GET);
            }
            else {
                request.open(sendUrl, egret.HttpMethod.GET);
            }
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.httpCompleteHandler, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.httpProgrssHandler, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.httpErrorHandler, this);
        };
        /**
         * 封装httpRequest Post请求
         * @param sendUrl: 请求的地址
         * @param data: 请求传输的数据
         */
        HttpRequest.post = function (sendUrl, data, callback, callbackData) {
            var _this = this;
            var curMethor = sendUrl;
            sendUrl = this.url + sendUrl;
            var request = new egret.HttpRequest();
            request.timeout = 8000;
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(sendUrl, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(data);
            request.addEventListener(egret.Event.COMPLETE, function (event) {
                var req = event.currentTarget;
                _this.receiveData = req.response;
                _this.httpCompleteHandler(data, curMethor, callback, callbackData);
            }, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.httpProgrssHandler, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.httpErrorHandler, this);
        };
        HttpRequest.httpErrorHandler = function (errMsg) {
            var urlStr = errMsg.target._url;
            console.log("request error~~" + urlStr);
            Global.hideWaritPanel();
            if (urlStr.indexOf("clearGame") != -1) {
            }
        };
        HttpRequest.httpProgrssHandler = function (event) {
            console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        };
        HttpRequest.httpCompleteHandler = function (data, methor, callback, callbackData) {
        };
        /**
         * 调整网络请求数据模式
         */
        HttpRequest.changeData = function (data) {
            var returnStr = "";
            for (var key in data) {
                if (data.hasOwnProperty(key)) {
                    var elementStr = data[key];
                    returnStr = returnStr + key + "=" + elementStr + "&";
                }
            }
            returnStr = returnStr.substring(0, returnStr.length - 1);
            return returnStr;
        };
        /**
         * 测试：
         * 将JSON数据处理成 egret 中能正常使用的 key=value&key=value... 样式。如将：
         * {"_m":"user","_a":"info","_api":"getUserInfo_15041","_u":"1","_pwd":"09cca18a30bc34727b0254943811239a","_pkey":5708,"_f":-1,"sf":"1"}
         * 换成： _m=user&_a=info&_api=getUserInfo_46152&_u=1&_pwd=09cca18a30bc34727b0254943811239a&_pkey=5707&_f=-1&sf=1
         */
        HttpRequest.prototype.handleJsonObject = function (jsonObj) {
            if (!jsonObj)
                return "";
            var tarStr = "", tarStrArr = [], tempStr = JSON.stringify(jsonObj);
            tempStr = tempStr.slice(1, tempStr.length - 1);
            tarStrArr = tempStr.split(",");
            var i = 0, arrLen = tarStrArr.length;
            var tempEle = "", tempEleArr = [];
            for (var i_1 = 0; i_1 < arrLen; i_1++) {
                tempEle = tarStrArr[i_1];
                tempEleArr = tempEle.split(":");
                tarStr += tempEleArr[0] + "=" + tempEleArr[1];
                if (i_1 < arrLen - 1)
                    tarStr += "&";
            }
            tarStr = tarStr.replace(/"/g, '');
            return tarStr;
        };
        return HttpRequest;
    }());
    http.HttpRequest = HttpRequest;
    __reflect(HttpRequest.prototype, "http.HttpRequest");
})(http || (http = {}));
//# sourceMappingURL=HttpRequest.js.map