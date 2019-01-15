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
        // for (let x in prodData.mbEventInfos[m].mbEventParts){
        //     mbEventPartDeal(prodData,x,m,copyFlag,mbEventParts,sourceProdData);
        // }
        temp.mbEventParts = Object.assign(temp.mbEventParts,mbEventParts)
        backData.mbEventInfos[m].mbEventParts = temp.mbEventParts

        //mbEventType对象
        for (let y in prodData.mbEventInfos[m].mbEventType){
            if(y == "eventDesc"){
                let newProdDesc = prodData.prodType.prodDesc;
                let oldProdDesc = sourceProdData.prodType.prodDesc;
                prodData.mbEventInfos[m].mbEventType[y] = newProdDesc+prodData.mbEventInfos[m].mbEventType[y].split(oldProdDesc)[1];
            }
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
    tablesDeal(prodData,sourceProdData,backVal,"mbProdCharge",copyFlag)
    backData.mbProdCharge = backVal
    backVal = []
    tablesDeal(prodData,sourceProdData,backVal,"glProdAccounting",copyFlag)
    backData.glProdAccounting = backVal

    return backData
}
/*
 * @description 单表处理主流程（只包含修改操作）
 * @param backVal 单表存在数据变动（数据的U以及单条数据原子的U）的集合
 * @param tables 表名
 * @param copyFlag 复制标识
 * @param backVal 返回数据集合
 */
export function tablesDeal(prodData,sourceProdData,backVal,tables,copyFlag){
    for (let newIndex = 0; newIndex < prodData[tables].length; newIndex++) {
        if(copyFlag == "Y"){
            let prodType = prodData.prodType.prodType;
            let temp = {newData: {}, oldData: {}, optType: ''}
            prodData[tables][newIndex].prodType = prodType;
            temp.newData = prodData[tables][newIndex]
            temp.optType = 'I'
            backVal.push(temp)
        }else {
            for (let oldIndex = 0; oldIndex < sourceProdData[tables].length; oldIndex++) {
                //主键匹配
                let flag = tableDealKey(prodData, sourceProdData, newIndex, oldIndex, tables)
                if (flag) {
                    //修改处理
                    tableDealUpdata(prodData, sourceProdData, newIndex, oldIndex, tables, backVal)
                    break;
                }
            }
        }
    }
}

/*
 * @description 匹配单表数据主键
 * @param backVal 单表存在数据变动（数据的U以及单条数据原子的U）的集合
 * @param tables 表名
 * @param newIndex 修改后数据循环下标
 * @param oldIndex 修改前数据循环下标
 */
export function tableDealKey(prodData,sourceProdData,newIndex,oldIndex,tables) {
    let ret = false;
    if(tables === "mbProdCharge"){
        if(prodData[tables][newIndex].prodType === sourceProdData[tables][oldIndex].prodType && prodData[tables][newIndex].feeType === sourceProdData[tables][oldIndex].feeType){
            ret = "true"
        }
    }
    if(tables === "glProdAccounting"){
        if(prodData[tables][newIndex].prodType === sourceProdData[tables][oldIndex].prodType && prodData[tables][newIndex].accountingStatus === sourceProdData[tables][oldIndex].accountingStatus){
            ret = "true"
        }
    }
    return ret;
}

/*
 * @description 单表修改数据处理
 * @param newIndex 修改后数据循环下标
 * @param oldIndex 修改前数据循环下标
 * @param backVal 单表存在数据变动（数据的U以及单条数据原子的U）的集合
 * @param tables 表名
 * @param copyFlag 复制标识
 * @param backVal 返回数据集合
 */
export function tableDealUpdata(prodData, sourceProdData, newIndex, oldIndex, tables,backVal) {
    for (let column in prodData[tables][newIndex]) {
        if (prodData[tables][newIndex][column] != sourceProdData[tables][oldIndex][column]) {
            //修改数据
            let temp = {newData: {}, oldData: {}, optType: ''}
            temp.newData = prodData[tables][newIndex]
            temp.oldData = sourceProdData[tables][oldIndex]
            temp.optType = 'U'
            backVal.push(temp)
            break;
        }
    }
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
//处理mbProdType对象数据
export function prodTypeDeal(prodData,sourceProdData,backData,copyFlag) {
    var prodType = {newData: {},oldData: {}}
    var newProdMap = {}
    var oldProdMap = {}
    if(copyFlag === "Y"){
        //基础-可售复制时候 可售产品的基础产品属性为当前可售产品
        if(prodData.prodType.prodRange == "S" && sourceProdData.prodType.prodRange == "B"){
            prodData.prodType.baseProdType = sourceProdData.prodType.prodType
        }
        newProdMap = prodData.prodType
    }else {
        for (let i in prodData.prodType) {
            newProdMap[i] = prodData.prodType[i]
            oldProdMap[i] = sourceProdData.prodType[i]
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
    var prodType = prodData.prodType.prodType
    for (let j in prodData.prodDefines) {
        let newMap = {newData: {},oldData: {},optionType: ""}
        //前端返回数据 去除新增参数标识
        if(prodData.prodDefines[j].newAttr !== undefined){
            delete prodData.prodDefines[j].newAttr
        }
        if(copyFlag === "Y" && prodData.prodDefines[j].group === "SOLD" || copyFlag === "Y" && prodRange === "B"){
            //可售产品-可售产品 || 基础产品-基础产品
            prodData.prodDefines[j].group = null
            prodDefines[j] = changeProdType(prodData,prodType,j)
        }else if(tempsDefine(prodData,copyFlag,prodRange,j)){
            //基础产品-可售产品复制
            prodData.prodDefines[j].group = null
            prodDefines[j] = changeProdType(prodData,prodType,j)
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
            if(prodData.prodDefines[j].optionPermissions === "D"){
                //E-D N-D V-D 删除基础产品和继承于该基础产品的可售产品 的该条参数 optPerm = "DALL"
                optObject.key = j
                optObject.tableName = "MB_PROD_DEFINE"
                optObject.optPerm = "DALL"
            }else if(sourceProdData.prodDefines[j].optionPermissions === "E" && (prodData.prodDefines[j].optionPermissions === "N" || prodData.prodDefines[j].optionPermissions === "V")){
                //E-N E-V  删除继承于该基础产品的可售产品 的该条参数 optPerm = "D"
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
export function tempsDefine(prodData,copyFlag,prodRange,j){
    if(copyFlag === "Y" && prodRange === "S"){
        if(prodData.prodDefines[j].optionPermissions === "E" || prodData.prodDefines[j].assembleType === "EVENT"){
            return true;
        }
    }
}
export function changeProdType(prodData,prodType,j){
    let newMap = {newData: {},oldData: {},optionType: ""}
    if(prodData.prodDefines[j].assembleType == "EVENT"){
        prodData.prodDefines[j].prodType = prodType;
        let assembleIds = prodData.prodDefines[j].assembleId;
        let eventType = assembleIds.split("_")[0] + "_"+prodType;
        prodData.prodDefines[j].assembleId = eventType
    }
    newMap.newData = prodData.prodDefines[j];
    newMap.optionType = "I"
    return newMap;
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
        prodData.mbEventInfos[m].mbEventAttrs[k].group = null
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "I"
        mbEventAttrs[k] = newDataMap
    }else if (copyFlag === "Y" && prodRange === "S" && sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "E"){
        prodData.mbEventInfos[m].mbEventAttrs[k].group = null
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "I"
        mbEventAttrs[k] = newDataMap
    } else if (sourceProdData.mbEventInfos[m].mbEventAttrs[k] === undefined){
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "I"
        mbEventAttrs[k] = newDataMap
    } else if(prodData.mbEventInfos[m].mbEventAttrs[k].attrValue !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].attrValue || prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions) {
        sourceProdData.mbEventInfos[m].mbEventAttrs[k].group = null
        prodData.mbEventInfos[m].mbEventAttrs[k].group = null
        newDataMap.newData = prodData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.oldData = sourceProdData.mbEventInfos[m].mbEventAttrs[k]
        newDataMap.optionType = "U"
        mbEventAttrs[k] = newDataMap
    }
    //判断编辑信息 E:可编辑 N:不可编辑 V:不可见 D:删除
    let optObjectAttr = {eventType: "",key: "",tableName: "",optPerm: ""}
    //处理状态位
    dealEventOpt(prodData,sourceProdData,m,k,optObjectAttr)
    if(optObjectAttr.key !== "" && optObjectAttr.eventType !== ""){
        tempObjectAttr[k] = optObjectAttr
        if(backData.optionPermissions !== "") {
            backData.optionPermissions = Object.assign(backData.optionPermissions, tempObjectAttr)
        }else{
            backData.optionPermissions = tempObjectAttr
        }
    }
}
export function dealEventOpt(prodData,sourceProdData,m,k,optObjectAttr) {
    if (sourceProdData.mbEventInfos[m].mbEventAttrs[k] !== undefined && prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions !== sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions) {
        if (prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "D") {
            //E-D 删除基础产品和继承于该基础产品的可售产品 的该条参数 optPerm = "DALL"
            optObjectAttr.eventType = m
            optObjectAttr.key = k
            optObjectAttr.tableName = "MB_EVENT_ATTR"
            optObjectAttr.optPerm = "DALL"
        } else if (sourceProdData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "E" && (prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "N" || prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "V")) {
            //E-V E-N  删除继承于该基础产品的可售产品 的该条参数 optPerm = "D"
            optObjectAttr.eventType = m
            optObjectAttr.key = k
            optObjectAttr.tableName = "MB_EVENT_ATTR"
            optObjectAttr.optPerm = "D"
        }
        if (prodData.mbEventInfos[m].mbEventAttrs[k].optionPermissions === "E") {
            //N-E V-E 继承于该基础产品的可售产品增加该条参数 optPerm = "I"
            optObjectAttr.eventType = m
            optObjectAttr.key = k
            optObjectAttr.tableName = "MB_EVENT_ATTR"
            optObjectAttr.optPerm = "I"
        }
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