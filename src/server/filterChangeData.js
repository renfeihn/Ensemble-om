/**
 * Created by jiajt on 2018/8/21.
 * 处理prodData对象改变的数据到targetData对象
 * 处理prodData.prodType对象数据：处理后targetData.prodType对象结构：
 *              prodType:{
 *                      newData:{
 *                          prodType:1110001
 *                          prodDesc:存款产品AA
 *                          ...}，
 *                      oldData:{
 *                          prodType:1110001
 *                          prodDesc:存款产品BB
 *                          ...}
 *                       }
 *               当不存在差异数据的时候，newData:{}  oldData:{}为全部信息
 * 处理prodData.prodDefines对象数据：处理后targetData.prodDefines对象结构同prodType.
 *             差异：newData{}对象只包含被修改对象的修改后值，oldData{}只包含被修改对象修改前数据，二者一对一
 * 处理prodData.mbEventInfos对象数据：处理后结构：
 *              mbEventInfos: {
 *                          事件A：{
 *                              mbEventAttrs:{
 *                                  newData: {只包含被修改对象修改后值},
 *                                  oldData: {只包含被修改对象修改前值}
 *                                  },
 *                              mbEventPart: {
 *                                  newData: {只包含被修改对象修改后值},
 *                                  oldData: {只包含被修改对象修改前值}
 *                                  },
 *                             mbEventType: {
 *                                  newData: {只包含被修改对象修改后值},
 *                                  oldData: {只包含被修改对象修改前值}
 *                                  },
 *                               }，
 *                           事件B：{}，
 *                           事件C：{}.
 *                           ...
 *                           }
 */
export function filterChangeData (prodData,sourceProdData) {
    var backData = {}
    backData = copy(sourceProdData,backData)
    // 处理prodType对象数据
    var prodType = {newData: {},oldData: {}}
    var newProdMap = {}
    var oldProdMap = {}
    for (let i in prodData.prodType) {
        if (prodData.prodType[i] === sourceProdData.prodType[i]){
            oldProdMap[i] = sourceProdData.prodType[i]
        }else{
            newProdMap[i] = prodData.prodType[i]
            oldProdMap[i] = sourceProdData.prodType[i]
        }
    }
    prodType.newData = Object.assign(prodType.newData,newProdMap)
    prodType.oldData = Object.assign(prodType.oldData,oldProdMap)
    backData.prodType = prodType
    //处理prodDefines对象数据
    var prodDefines = {newData: {},oldData: {}}
    var newMap = {}
    var oldMap = {}
    for (let i in prodData.prodDefines){
        if (prodData.prodDefines[i].attrValue !== sourceProdData.prodDefines[i].attrValue){
            newMap[i] = prodData.prodDefines[i]
            oldMap[i] = sourceProdData.prodDefines[i]
        }
    }
    prodDefines.newData = Object.assign(prodDefines.newData,newMap)
    prodDefines.oldData = Object.assign(prodDefines.oldData,oldMap)
    backData.prodDefines = prodDefines
    backData.userName='admin'
    //处理mbEventInfos对象数据
    var mbEventAttrs = {newData: {}, oldData: {}}
    var mbEventParts = {newData: {}, oldData: {}}
    var mbEventType = {newData: {}, oldData: {}}
    var temp= {mbEventAttrs: {},mbEventParts: {},mbEventType: {}}
    for (let m in prodData.mbEventInfos){
        let newData= {}
        let oldData= {}
        let newDataPart = {}
        let oldataPart = {}
        let newDataType = {}
        let oldataType = {}
        let flag = "false"
        let flagPart = "false"
        let flagType = "false"
        //mbEventAttrs
        for (let k in prodData.mbEventInfos[m].mbEventAttrs){
             if (prodData.mbEventInfos[m].mbEventAttrs[k].attrValue !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].attrValue){
                 newData[k] = prodData.mbEventInfos[m].mbEventAttrs[k]
                 oldData[k] = sourceProdData.mbEventInfos[m].mbEventAttrs[k]
                 flag = "true"
             }
         }
        mbEventAttrs.newData = Object.assign(mbEventAttrs.newData,newData)//深拷贝
        mbEventAttrs.oldData = Object.assign(mbEventAttrs.oldData,oldData)
        temp.mbEventAttrs = Object.assign(temp.mbEventAttrs,mbEventAttrs)
        backData.mbEventInfos[m].mbEventAttrs = temp.mbEventAttrs
        //mbEventParts
        for (let x in prodData.mbEventInfos[m].mbEventParts){
             if (prodData.mbEventInfos[m].mbEventParts[x].attrValue !== sourceProdData.mbEventInfos[m].mbEventParts[x].attrValue){
                 newDataPart[x] = prodData.mbEventInfos[m].mbEventParts[x]
                 oldataPart[x] = sourceProdData.mbEventInfos[m].mbEventParts[x]
                 flagPart = "true"
             }
         }
        mbEventParts.newData = Object.assign(mbEventParts.newData,newDataPart)
        mbEventParts.oldData = Object.assign(mbEventParts.oldData,oldataPart)
        temp.mbEventParts = Object.assign(temp.mbEventParts,mbEventParts)
        backData.mbEventInfos[m].mbEventParts = temp.mbEventParts

        //mbProdType
         for (let y in prodData.mbEventInfos[m].mbEventType){
             if (prodData.mbEventInfos[m].mbEventType[y].attrValue !== sourceProdData.mbEventInfos[m].mbEventType[y].attrValue){
                 newDataType[y] = prodData.mbEventInfos[m].mbEventType[y]
                 oldataType[y] = sourceProdData.mbEventInfos[m].mbEventType[y]
                 flagType = "true"
             }
         }
         mbEventType.newData = Object.assign(mbEventType.newData,newDataType)
         mbEventType.oldData = Object.assign(mbEventType.oldData,oldataType)
         temp.mbEventType = Object.assign(temp.mbEventType,mbEventType)
        backData.mbEventInfos[m].mbEventType = temp.mbEventType
         if(flag === "false" && flagType === "false" && flagPart === "false"){
             delete backData.mbEventInfos[m]
         }
    }
    return backData
}

export function copy(obj1,obj2) {
    var obj = obj2||{};
    for(let name in obj1){
        if(typeof obj1[name] === "object"){
            obj[name]= (obj1[name].constructor===Array)?[]:{};
            copy(obj1[name],obj[name]);
        }else{
            obj[name]=obj1[name];
        }
    }
    return obj;
}