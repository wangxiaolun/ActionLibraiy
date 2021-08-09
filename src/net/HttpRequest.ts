module http {

    export class HttpRequest {

        static url: string; //请求的服务器地址
        static receiveData: Object; //网络请求返回的数据
        static methorName: string; //请求的方法名

        public static init(urlStr: string): void {
            this.url = urlStr;
        }

        /**
         * 封装httpRequest Get请求
         * @param sendUrl: 请求的地址
         * @param data: 请求传输的数据
         */
        public static get(sendUrl: string, data?: any) {
            sendUrl = this.url + sendUrl;
            let request = new egret.HttpRequest();
            request.responseType = egret.HttpResponseType.TEXT;
            if (data) {
                let param = JSON.stringify(data);
                request.open(sendUrl + "?" + param, egret.HttpMethod.GET);
            } else {
                request.open(sendUrl, egret.HttpMethod.GET);
            }
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send();
            request.addEventListener(egret.Event.COMPLETE, this.httpCompleteHandler, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.httpProgrssHandler, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.httpErrorHandler, this);
        }


        /**
         * 封装httpRequest Post请求
         * @param sendUrl: 请求的地址
         * @param data: 请求传输的数据
         */

        public static post(sendUrl: string, data?: any, callback?: Function, callbackData?: any) {
            let curMethor: string = sendUrl;
            sendUrl = this.url + sendUrl;
            let request = new egret.HttpRequest();
            request.timeout = 8000;
            request.responseType = egret.HttpResponseType.TEXT;
            request.open(sendUrl, egret.HttpMethod.POST);
            request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            request.send(data);
            request.addEventListener(egret.Event.COMPLETE, (event: egret.Event) => {
                var req = <egret.HttpRequest>event.currentTarget;
                this.receiveData = req.response;
                this.httpCompleteHandler(data, curMethor, callback, callbackData);
            }, this);
            request.addEventListener(egret.ProgressEvent.PROGRESS, this.httpProgrssHandler, this);
            request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.httpErrorHandler, this);
        }


        public static httpErrorHandler(errMsg: egret.IOErrorEvent): void {
            let urlStr: string = errMsg.target._url;
            console.log("request error~~"+urlStr);
            Global.hideWaritPanel();
            if (urlStr.indexOf("clearGame") != -1) {
            }
        }

        private static httpProgrssHandler(event: egret.ProgressEvent): void {
            console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
        }

        private static httpCompleteHandler(data: string, methor: string, callback?: Function, callbackData?: any): void {
        }

        /**
         * 调整网络请求数据模式
         */
        public static changeData(data: Object): string {
            let returnStr: string = "";
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    let elementStr = data[key];
                    returnStr = returnStr + key + "=" + elementStr + "&";
                }
            }
            returnStr = returnStr.substring(0, returnStr.length - 1);
            return returnStr;
        }


        /**
         * 测试：
		 * 将JSON数据处理成 egret 中能正常使用的 key=value&key=value... 样式。如将：
		 * {"_m":"user","_a":"info","_api":"getUserInfo_15041","_u":"1","_pwd":"09cca18a30bc34727b0254943811239a","_pkey":5708,"_f":-1,"sf":"1"}
		 * 换成： _m=user&_a=info&_api=getUserInfo_46152&_u=1&_pwd=09cca18a30bc34727b0254943811239a&_pkey=5707&_f=-1&sf=1
		 */
        public handleJsonObject(jsonObj: Object): string {
            if (!jsonObj)
                return "";

            let tarStr: string = "",
                tarStrArr: Array<string> = [],
                tempStr: string = JSON.stringify(jsonObj);

            tempStr = tempStr.slice(1, tempStr.length - 1);
            tarStrArr = tempStr.split(",");

            let i: number = 0, arrLen: number = tarStrArr.length;
            let tempEle: string = "", tempEleArr: Array<string> = [];
            for (let i: number = 0; i < arrLen; i++) {
                tempEle = tarStrArr[i];
                tempEleArr = tempEle.split(":");
                tarStr += tempEleArr[0] + "=" + tempEleArr[1];
                if (i < arrLen - 1)
                    tarStr += "&";
            }
            tarStr = tarStr.replace(/"/g, '');

            return tarStr;
        }
    }
}