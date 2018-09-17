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
 *                                      ATTR1:{
 *                                          newData: {只包含被修改对象修改后值},
 *                                          oldData: {只包含被修改对象修改前值}
 *                                      },
 *                                      {...}
 *                                  }
 *                              mbEventPart: {
 *                                      PART1:{
 *                                          newData: {只包含被修改对象修改后值},
 *                                          oldData: {只包含被修改对象修改前值}
 *                                      },
 *                                      {...}
 *                                  }
 *                             mbEventType: {
 *
 *                                          newData: {只包含被修改对象修改后值},
 *                                          oldData: {只包含被修改对象修改前值}
 *
 *                                      {...}
 *                                  }
 *                            },
 *                           事件B：{}，
 *                           事件C：{}.
 *                           ...
 *                           }
 */
export function filterChangeData (prodData,sourceProdData,optionType) {
    var backData = {}
    var copyFlag = optionType
    backData = copy(sourceProdData,backData)
    // 处理prodType对象数据
    var prodType = {newData: {},oldData: {}}
    var newProdMap = {}
    var oldProdMap = {}
    if(copyFlag === "Y"){
        //产品复制时，保留所有最新数据
        newProdMap = prodData.prodType
    }else {
        for (let i in prodData.prodType) {
            if (prodData.prodType[i] === sourceProdData.prodType[i]) {
                oldProdMap[i] = sourceProdData.prodType[i]
            } else {
                newProdMap[i] = prodData.prodType[i]
                oldProdMap[i] = sourceProdData.prodType[i]
            }
        }
    }
    prodType.newData = Object.assign(prodType.newData,newProdMap)
    prodType.oldData = Object.assign(prodType.oldData,oldProdMap)
    backData.prodType = prodType
    //处理prodDefines对象数据
    var prodDefines = {}

        for (let i in prodData.prodDefines) {
            if(copyFlag === "Y"){
                //产品复制时，保留所有最新数据
                let newMap = {newData: {},oldData: {}}
                newMap.newData = prodData.prodDefines[i]
                prodDefines[i] = newMap
            }else if (prodData.prodDefines[i].attrValue !== sourceProdData.prodDefines[i].attrValue) {
                let newMap = {newData: {},oldData: {}}
                newMap.newData = prodData.prodDefines[i]
                newMap.oldData = sourceProdData.prodDefines[i]
                prodDefines[i] = newMap
            }
        }
    backData.prodDefines = prodDefines

    //处理mbEventInfos对象数据
    for (let m in prodData.mbEventInfos){
        let mbEventAttrs = {}
        let mbEventParts = {}
        // let mbEventType = {}
        let mbEventType = {newData: {}, oldData: {}}
        let temp= {mbEventAttrs: {},mbEventParts: {},mbEventType: {}}
        let flag = "false"
        let newDataType = {}
        let oldataType = {}
        let flagPart = "false"
        let flagType = "false"
        //mbEventAttrs
        for (let k in prodData.mbEventInfos[m].mbEventAttrs){
            if(copyFlag === "Y"){
                let newDataMap= {newData: {}, oldData: {}}
                newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
                flag = "true"
                mbEventAttrs[k] = newDataMap
            }else if(prodData.mbEventInfos[m].mbEventAttrs[k].attrValue !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].attrValue) {
                    let newDataMap= {newData: {}, oldData: {}}
                    newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
                    newDataMap.oldData = sourceProdData.mbEventInfos[m].mbEventAttrs[k]
                    flag = "true"
                    mbEventAttrs[k] = newDataMap
                }
        }
        temp.mbEventAttrs = Object.assign(temp.mbEventAttrs,mbEventAttrs)
        backData.mbEventInfos[m].mbEventAttrs = temp.mbEventAttrs
        //mbEventParts
        for (let x in prodData.mbEventInfos[m].mbEventParts){
            mbEventPartDeal(prodData,x,m,copyFlag,flagPart,mbEventParts,sourceProdData);


         }
        temp.mbEventParts = Object.assign(temp.mbEventParts,mbEventParts)
        backData.mbEventInfos[m].mbEventParts = temp.mbEventParts

        //mbEventType
        for (let y in prodData.mbEventInfos[m].mbEventType){
            if(copyFlag === "Y") {
                newDataType[y] = prodData.mbEventInfos[m].mbEventType[y]
                flagType = "true"
            }else if (prodData.mbEventInfos[m].mbEventType[y].attrValue !== sourceProdData.mbEventInfos[m].mbEventType[y].attrValue){
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
export function mbEventPartDeal(prodData,x,m,copyFlag,flagPart,mbEventParts,sourceProdData) {
        for(let z in prodData.mbEventInfos[m].mbEventParts[x]) {
                if (copyFlag === "Y") {
                    let newDataPart = {newData: {}, oldData: {}}
                    newDataPart.newData = prodData.mbEventInfos[m].mbEventParts[x][z]
                    flagPart = "true"
                    let map = {}
                    map[z] = newDataPart
                    mbEventParts[x] = map
                } else if (prodData.mbEventInfos[m].mbEventParts[x][z].attrValue !== sourceProdData.mbEventInfos[m].mbEventParts[x][z].attrValue) {
                    let newDataPart = {newData: {}, oldData: {}}
                    newDataPart.newData = prodData.mbEventInfos[m].mbEventParts[x][z]
                    newDataPart.oldData = sourceProdData.mbEventInfos[m].mbEventParts[x][z]
                    flagPart = "true"
                    let map = {}
                    map[z] = newDataPart
                    mbEventParts[x] = map
                }

        }
        // temp.mbEventParts = Object.assign(temp.mbEventParts,mbEventParts)
    // backData.mbEventInfos[m].mbEventParts = temp.mbEventParts
}


export function copy(obj1,obj2) {
    var obj = obj2||{};
    for(let name in obj1){
        if(typeof obj1[name] === "object" && obj1[name]!== null){
            obj[name]= (obj1[name].constructor===Array)?[]:{};
            copy(obj1[name],obj[name]);
        }else{
            obj[name]=obj1[name];
        }
    }
    return obj;
}