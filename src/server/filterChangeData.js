/**
 * Created by jiajt on 2018/8/21.
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
    //处理单表数据 mbProdCharge
    var mbProdCharge = []
    mbProdChargeDeal(prodData,sourceProdData,mbProdCharge)
    backData.mbProdCharge = mbProdCharge
    return backData
}
export function mbProdChargeDeal(prodData,sourceProdData,mbProdCharge){
    let index = 0
    for (let s =0; s<prodData.mbProdCharge.length; s++){
        let flags = 0
        for(let j = 0; j<sourceProdData.mbProdCharge.length; j++){
            let returnIndex = tableDeal(prodData,sourceProdData,s,j,mbProdCharge,index)
            if(index !== returnIndex){
                //检索到并匹配成功
                index = returnIndex
                flags = 1
                break
            }
        }
        if(flags === 0){
            //原数据中不存在该条数据（新增）
            let temp = {newData: {},oldData: {},optType: ''}
            temp.newData = prodData.mbProdCharge[s]
            temp.optType = 'I'
            mbProdCharge.push(temp)
            index++
        }
    }
}
export function tableDeal(prodData,sourceProdData,s,j,mbProdCharge,index) {
    //新增数据，产品类型默认
    prodData.mbProdCharge[s].prodType = sourceProdData.mbProdCharge[j].prodType
    if(prodData.mbProdCharge[s].prodType === sourceProdData.mbProdCharge[j].prodType && prodData.mbProdCharge[s].feeType === sourceProdData.mbProdCharge[j].feeType){
        //匹配到同一条数据
        for(let k in prodData.mbProdCharge[s]){
            //判断数据字段是否相同（修改）
            if(prodData.mbProdCharge[s][k] !== sourceProdData.mbProdCharge[j][k]){
                //修改数据
                let temp = {newData: {},oldData: {},optType: ''}
                temp.newData = prodData.mbProdCharge[s]
                temp.oldData = sourceProdData.mbProdCharge[j]
                temp.optType = 'U'
                mbProdCharge.push(temp)
                index++
                break
            }
        }
    }
    return index
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