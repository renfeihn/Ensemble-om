/**
 * Created by jiajt on 2018/8/21.
 * @param prodData 修改后的数据
 * @param sourceProdData 修改前数据
 * @param optionType 操作类型 optionType==="Y"?复制:非复制
 * @return backData 处理后只包含变动(U,I,D)的数据集合
 */
export function filterChangeData (prodData,sourceProdData,optionType) {
    var backData = {}
    backData = copy(sourceProdData,backData)
    backData["optionPermissions"] = ""
    // 是否复制标识
    var copyFlag = optionType
    // 产品属性 B-基础产品 S-可售产品
    let prodRange = prodData.prodType.prodRange
    // 处理prodType对象数据
    prodTypeDeal(prodData,sourceProdData,backData,copyFlag)
    // 处理prodDefines对象数据
    prodDefinesDeal(prodData,sourceProdData,backData,copyFlag,prodRange)
    //处理mbEventInfos对象数据
    for (let m in prodData.mbEventInfos){
        let mbEventAttrs = {}
        let mbEventParts = {}
        let mbEventType = {newData: {}, oldData: {}}
        let newEventTypeData = {}
        let oldEventTypeData = {}
        let temp= {mbEventAttrs: {},mbEventParts: {},mbEventType: {}}
        //mbEventAttrs对象
        for (let k in prodData.mbEventInfos[m].mbEventAttrs) {
            mbEventAttrsDeal(prodData,sourceProdData,copyFlag,m,k,mbEventAttrs,backData)
        }
        temp.mbEventAttrs = Object.assign(temp.mbEventAttrs,mbEventAttrs)
        backData.mbEventInfos[m].mbEventAttrs = temp.mbEventAttrs

        //mbEventParts对象
        for (let x in prodData.mbEventInfos[m].mbEventParts){
            mbEventPartDeal(prodData,x,m,copyFlag,mbEventParts,sourceProdData);
        }
        temp.mbEventParts = Object.assign(temp.mbEventParts,mbEventParts)
        backData.mbEventInfos[m].mbEventParts = temp.mbEventParts

        //mbEventType对象
        for (let y in prodData.mbEventInfos[m].mbEventType){
            if(copyFlag === "Y") {
                newEventTypeData[y] = prodData.mbEventInfos[m].mbEventType[y]
            }else if (prodData.mbEventInfos[m].mbEventType[y].attrValue !== sourceProdData.mbEventInfos[m].mbEventType[y].attrValue){
                newEventTypeData[y] = prodData.mbEventInfos[m].mbEventType[y]
                oldEventTypeData[y] = sourceProdData.mbEventInfos[m].mbEventType[y]
            }
        }
        mbEventType.newData = Object.assign(mbEventType.newData,newEventTypeData)
        mbEventType.oldData = Object.assign(mbEventType.oldData,oldEventTypeData)
        temp.mbEventType = Object.assign(temp.mbEventType,mbEventType)
        backData.mbEventInfos[m].mbEventType = temp.mbEventType

        //该事件下所有参数均未改变时 返回给后台报文中删除该事件
        if(JSON.stringify(mbEventAttrs)=='{}' && JSON.stringify(mbEventParts)=='{}' && JSON.stringify(mbEventType.newData)=='{}'){
            delete backData.mbEventInfos[m]
        }
    }
    //处理单表数据
    var backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"mbProdCharge")
    backData.mbProdCharge = backVal
    backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"glProdAccounting")
    backData.glProdAccounting = backVal
    backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"irlProdInt")
    backData.irlProdInt = backVal
    backVal = []
    tablesMainDeal(prodData,sourceProdData,backVal,"mbAcctStats")
    backData.mbAcctStats = backVal
    return backData
}
/*
* @description 单表处理主流程
* @param backVal 单表存在数据变动（数据的D,I,U以及单条数据原子的D,I,U）的集合
* @param tables 表名
*/
export function tablesMainDeal(prodData,sourceProdData,backVal,tables){
    let index = 0
    let flagDI = 0
    if(prodData[tables].length < sourceProdData[tables].length){
        //删除时，交换新旧数据 并记录flagDI=1（删除）flagDI=0（）
        flagDI = 1
        let temp = {}
        temp = copy(prodData,temp)
        prodData = copy(sourceProdData,prodData)
        sourceProdData = copy(temp,sourceProdData)
    }
    for (let s =0; s<prodData[tables].length; s++){
        let flags = 0
        for(let j = 0; j<sourceProdData[tables].length; j++){
            flags = 0
            let returnIndex = tablesModDeal(prodData,sourceProdData,s,j,backVal,index,tables)
            if(index !== returnIndex){
                //检索到并匹配成功,并且该条数据已被处理
                index = returnIndex
                flags = 1
                break
            }
        }
        if(flags === 0){
            //原数据中不存在该条数据（新增）
            let tempTab = {newData: {},oldData: {},optType: ''}
            if(flagDI){
                tempTab.optType = 'D'
                tempTab.oldData = prodData[tables][s]
            }else {
                tempTab.optType = 'I'
                tempTab.newData = prodData[tables][s]
            }
            backVal.push(tempTab)
            index++
        }
    }
}
//单表处理，获取修改的数据
export function tablesModDeal(prodData,sourceProdData,s,j,backVal,index,tables) {
    //新增数据，产品类型默认
    let modFlag = "false"
    if(tables === "mbProdCharge"){
        if(prodData[tables][s].prodType === sourceProdData[tables][j].prodType && prodData[tables][s].feeType === sourceProdData[tables][j].feeType){
            modFlag = "true"
        }
    }
    else if(tables === "glProdAccounting"){
        if(prodData[tables][s].prodType === sourceProdData[tables][j].prodType && prodData[tables][s].accountingStatus === sourceProdData[tables][j].accountingStatus){
            modFlag = "true"
        }
    }
    else if(tables === "irlProdInt"){
        if(prodData[tables][s].prodType === sourceProdData[tables][j].prodType && prodData[tables][s].eventType === sourceProdData[tables][j].eventType && prodData[tables][s].intClass === sourceProdData[tables][j].intClass){
            modFlag = "true"
        }
    }
    else if(tables === "mbAcctStats"){
        if(prodData[tables][s].internalKey === sourceProdData[tables][j].internalKey){
            modFlag = "true"
        }
    }
    if(modFlag === "true"){
        //匹配到同一条数据
        let flag = 0
        for(let k in prodData[tables][s]){
            //判断数据字段是否相同（修改）
            if(prodData[tables][s][k] !== sourceProdData[tables][j][k]){
                //修改数据
                let temp = {newData: {},oldData: {},optType: ''}
                temp.newData = prodData[tables][s]
                temp.oldData = sourceProdData[tables][j]
                temp.optType = 'U'
                backVal.push(temp)
                index++
                flag = 1
                break
            }
        }
        //一条数据遍历完成是  不存在相同数据时处理
        if(flag === 0){
            index--
        }
    }
    return index
}
/*
 * @description 处理mbEventPart对象数据
 * @param  m 事件
 * @param x 事件下指标
 * @param mbEventParts 事件下指标对象集合
 */
export function mbEventPartDeal(prodData,x,m,copyFlag,mbEventParts,sourceProdData) {
    for(let z in prodData.mbEventInfos[m].mbEventParts[x]) {
        if (copyFlag === "Y") {
            let newDataPart = {newData: {}, oldData: {}}
            newDataPart.newData = prodData.mbEventInfos[m].mbEventParts[x][z]
            let map = {}
            map[z] = newDataPart
            mbEventParts[x] = map
        } else if (prodData.mbEventInfos[m].mbEventParts[x][z].attrValue !== sourceProdData.mbEventInfos[m].mbEventParts[x][z].attrValue) {
            let newDataPart = {newData: {}, oldData: {}}
            newDataPart.newData = prodData.mbEventInfos[m].mbEventParts[x][z]
            newDataPart.oldData = sourceProdData.mbEventInfos[m].mbEventParts[x][z]
            let map = {}
            map[z] = newDataPart
            mbEventParts[x] = map
        }
    }
}
//处理prodType对象数据
export function prodTypeDeal(prodData,sourceProdData,backData,copyFlag) {
    var prodType = {newData: {},oldData: {}}
    var newProdMap = {}
    var oldProdMap = {}
    if(copyFlag === "Y"){
        newProdMap = prodData.prodType
    }else {
        for (let i in prodData.prodType) {
            // if (prodData.prodType[i] === sourceProdData.prodType[i]) {
            //     oldProdMap[i] = sourceProdData.prodType[i]
            //     newProdMap[i] = prodData.prodType[i]
            //
            // } else {
                newProdMap[i] = prodData.prodType[i]
                oldProdMap[i] = sourceProdData.prodType[i]
            // }
        }
    }
    prodType.newData = Object.assign(prodType.newData,newProdMap)
    prodType.oldData = Object.assign(prodType.oldData,oldProdMap)
    backData.prodType = prodType
}
//处理prodDefines对象数据
export function prodDefinesDeal(prodData,sourceProdData,backData,copyFlag,prodRange,optionPermissions) {
    var prodDefines = {}
    var tempObject = {}
    for (let j in prodData.prodDefines) {
        let newMap = {newData: {},oldData: {},optionType: ""}
        //前端返回数据 去除新增参数标识
        if(prodData.prodDefines[j].newAttr !== undefined){
            delete prodData.prodDefines[j].newAttr
        }
        if(copyFlag === "Y" && prodData.prodDefines[j].group === "SOLD" || copyFlag === "Y" && prodRange === "B"){
            //可售产品-可售产品 || 基础产品-基础产品
            prodData.prodDefines[j].group = null
            newMap.newData = prodData.prodDefines[j];
            newMap.optionType = "I"
            prodDefines[j] = newMap
        }else if(copyFlag === "Y" && prodRange === "S" && prodData.prodDefines[j].optionPermissions === "E"){
            //基础产品-可售产品复制
            prodData.prodDefines[j].group = null
            newMap.newData = prodData.prodDefines[j];
            newMap.optionType = "I"
            prodDefines[j] = newMap
        } else if (sourceProdData.prodDefines[j] === undefined) {
            //prodDefine 增加参数
            newMap.newData = prodData.prodDefines[j]
            newMap.optionType = "I"
            prodDefines[j] = newMap
        } else if(prodData.prodDefines[j].attrValue !== sourceProdData.prodDefines[j].attrValue || prodData.prodDefines[j].optionPermissions !== sourceProdData.prodDefines[j].optionPermissions){
            //prodDefine 修改参数value || 修改参数操作属性（E:可编辑 N：不可编辑 V:不可见）
            prodData.prodDefines[j].group = null
            newMap.newData = prodData.prodDefines[j]
            newMap.oldData = sourceProdData.prodDefines[j]
            newMap.optionType = "U"
            prodDefines[j] = newMap
        }
        //判断编辑信息 E:可编辑 N:不可编辑 V:不可见 D:删除
        let optObject = {key: "",tableName: "",optPerm: ""}
        if(dealFalg(prodData.prodDefines[j],sourceProdData.prodDefines[j])){
            if(sourceProdData.prodDefines[j].optionPermissions === "E" && prodData.prodDefines[j].optionPermissions === "D"){
                //E-D 删除基础产品和继承于该基础产品的可售产品 的该条参数 optPerm = "DALL"
                optObject.key = j
                optObject.tableName = "MB_PROD_DEFINE"
                optObject.optPerm = "DALL"
            }else if(sourceProdData.prodDefines[j].optionPermissions === "E"){
                //E-V E-N  删除继承于该基础产品的可售产品 的该条参数 optPerm = "D"
                optObject.key = j
                optObject.tableName = "MB_PROD_DEFINE"
                optObject.optPerm = "D"
            }
            if(prodData.prodDefines[j].optionPermissions === "E"){
                //N-E V-E 继承于该基础产品的可售产品增加该条参数 optPerm = "I"
                optObject.key = j
                optObject.tableName = "MB_PROD_DEFINE"
                optObject.optPerm = "I"
            }
        }
        if(optObject.key !== ""){
            tempObject[j] = optObject
        }
    }
    if(backData.optionPermissions !== "") {
        backData.optionPermissions = Object.assign(backData.optionPermissions, tempObject)
    }else{
        backData.optionPermissions = tempObject
    }
    backData.prodDefines = prodDefines
}
export function dealFalg(val1,val2){
    if(val1!== undefined && val2!== undefined)
    {
        if(val1.optionPermissions !== val2.optionPermissions) {
            return true;
        }
        else{
            return false
        }
    }else{
        return false
    }
}
/*
 * @description 处理mbEventAttr对象数据
 * @param  m 事件
 * @param  k 事件下参数
 * @param mbEventAttrs 事件下参数对象集合
 */
export function mbEventAttrsDeal(prodData,sourceProdData,copyFlag,m,k,mbEventAttrs,backData){
    let prodRange = prodData.prodType.prodRange
    var tempObjectAttr = {}
    //前端返回数据 去除新增参数标识
    if(prodData.mbEventInfos[m].mbEventAttrs[k].newAttr !== undefined){
        delete prodData.mbEventInfos[m].mbEventAttrs[k].newAttr
    }
    let newDataMap= {newData: {}, oldData: {},optionType: ""}
    if(copyFlag === "Y" && sourceProdData.mbEventInfos[m].mbEventAttrs[k].group === "SOLD" || copyFlag === "Y" && prodRange === "B"){
        sourceProdData.mbEventInfos[m].mbEventAttrs[k].group = null
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "I"
        mbEventAttrs[k] = newDataMap
    }else if (copyFlag === "Y" && prodRange === "S" && sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "E"){
        sourceProdData.mbEventInfos[m].mbEventAttrs[k].group = null
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "I"
        mbEventAttrs[k] = newDataMap
    } else if (sourceProdData.mbEventInfos[m].mbEventAttrs[k] === undefined){
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "I"
        mbEventAttrs[k] = newDataMap
    } else if(prodData.mbEventInfos[m].mbEventAttrs[k].attrValue !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].attrValue || prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions) {
        sourceProdData.mbEventInfos[m].mbEventAttrs[k].group = null
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.oldData = sourceProdData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "U"
        mbEventAttrs[k] = newDataMap
    }
    //判断编辑信息 E:可编辑 N:不可编辑 V:不可见 D:删除
    let optObjectAttr = {eventType: "",key: "",tableName: "",optPerm: ""}
    if(dealOpt(prodData,sourceProdData,m,k)){
        if(sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "E" && prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "D"){
            //E-D 删除基础产品和继承于该基础产品的可售产品 的该条参数 optPerm = "DALL"
            optObjectAttr.eventType = m
            optObjectAttr.key = k
            optObjectAttr.tableName = "MB_EVENT_ATTR"
            optObjectAttr.optPerm = "DALL"
        }else if(sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "E"){
            //E-V E-N  删除继承于该基础产品的可售产品 的该条参数 optPerm = "D"
            optObjectAttr.eventType = m
            optObjectAttr.key = k
            optObjectAttr.tableName = "MB_EVENT_ATTR"
            optObjectAttr.optPerm = "D"
        }
        if(prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "E"){
            //N-E V-E 继承于该基础产品的可售产品增加该条参数 optPerm = "I"
            optObjectAttr.eventType = m
            optObjectAttr.key = k
            optObjectAttr.tableName = "MB_EVENT_ATTR"
            optObjectAttr.optPerm = "I"
        }
    }
    if(optObjectAttr.key !== "" && optObjectAttr.eventType !== ""){
        tempObjectAttr[k] = optObjectAttr
        if(backData.optionPermissions !== "") {
            backData.optionPermissions = Object.assign(backData.optionPermissions, tempObjectAttr)
        }else{
            backData.optionPermissions = tempObjectAttr
        }
    }
}
export function dealOpt(prodData,sourceProdData,m,k) {
    if(sourceProdData.mbEventInfos[m].mbEventAttrs[k] !== undefined && prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions){
        return true
    }else{
        return false
    }
}
/*
 * @description 对象浅拷贝
 * @param  obj1 被拷贝对象
 * @param  obj2 拷贝后对象（传入为空）
 * @return obj 拷贝后对象 （返回为包含被拷贝对象数据的新对象）
 */
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