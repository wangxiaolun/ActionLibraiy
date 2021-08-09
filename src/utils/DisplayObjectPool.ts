/** 对象池*/
class DisplayObjectPool {
    public constructor() { }

	/**
	 * 作为对象池的词典dict
	 */
    private objPoolDict: any = {};

    // singleton
    private static instance: DisplayObjectPool;
    public static getInstance(): DisplayObjectPool {
        if (this.instance == undefined) {
            this.instance = new DisplayObjectPool();
        }
        return this.instance;


    }

	/**
	 * 向对象池中放入对象，以便重复利用
	 */
    public push(oldObj: Object): void {
        // egret.getQualifiedClassName() --> 返回对象的完全限定类名
        let objName: string = egret.getQualifiedClassName(oldObj);
        if (oldObj == null) return;
        if (this.objPoolDict[objName] == undefined) {
            this.objPoolDict[objName] = [];
        }
        if ((<any[]>this.objPoolDict[objName]).indexOf(oldObj) == -1) {
            this.objPoolDict[objName].push(oldObj);
        }
    }


	/**
	 * 从对象池中取出需要的对象
	 * @param targetObj 需要的对象类类名，没必要必须是类实例名 类名就可以
	 * @return 取出的相应对象
	 *
	 */
    public pop(targetObj: Object): any {
        let objName: string = egret.getQualifiedClassName(targetObj);
        if (this.objPoolDict[objName] != undefined && this.objPoolDict[objName].length > 0) {
            return this.objPoolDict[objName].pop() as Object;
        }
        let objClass: any = egret.getDefinitionByName(objName);
        let obj: Object = new objClass as Object;
        return obj;

    }
}