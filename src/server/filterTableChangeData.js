/**
 * Created by jiajt on 2018/11/15.
 *@description 单表流程处理  获取单表变动数据（add edit delete）
 *@param columns 表 列信息
 * @param dataInfo 修改后最新数据
 * @param sourceDataInfo 修改前数据
 */

export function filterTableChangeData (columns,dataInfo,sourceDataInfo) {

    //比较目标数据
    var newData = dataInfo
    //源数据
    var oldData = sourceDataInfo
    var delFlag = "0"
    //区别新增或者删除  始终保持外层数据最多
    if(newData.length < oldData.length){
        //存在删除数据
        oldData = dataInfo
        newData = sourceDataInfo
        delFlag = "1"
    }

    var backValue = []
    var keySet ={}
    //获取表key
    for(let k=0; k<columns.length; k++){
        if(columns[k].key === "true"){
            keySet[columns[k].dataIndex] = columns[k].dataIndex
        }
    }
    for(let i=0; i<newData.length; i++){
        let paraOpt = ""
        let ttt = "1"
        for(let j=0; j<oldData.length; j++){
            let keySem = 0  //0-主键相同匹配到数据  1-存在不相同主键匹配失败
            for(let l in keySet){
                if(newData[i][l] === oldData[j][l]){
                    //主键相同
                    keySem = keySem +1
                }
            }
            let arr = Object.keys(keySet)
            if(keySem === arr.length) {
                tableDeal(i, j, newData, oldData, backValue, delFlag)
            }
            //匹配到最后一条数据
            if(keySem === 0 && j === oldData.length){
                //未匹配到主键参数
                if(delFlag === "0"){
                    //新增参数
                    paraOpt = "I"
                }
                if(delFlag === "1"){
                    //删除参数
                    paraOpt = "D"
                }
            }
        }
        //数据组装
        if(paraOpt === "I"){
            let temp = {}
            temp["newData"] = newData[i]
            temp["oldData"] = {}
            temp["optType"] = paraOpt
            backValue[backValue.length] = temp

        }
        if(paraOpt === "D"){
            let temp = {}
            temp["newData"] = {}
            temp["oldData"] = newData[i]
            temp["optType"] = paraOpt
            backValue[backValue.length] = temp
        }
    }
    return backValue
}

export function tableDeal(i,j,newData,oldData,backValue,delFlag) {
    //主键全部匹配 修改
    //判断该条数据 各个字段是否修改
    for (let m in newData[i]) {
        if (newData[i][m] !== oldData[j][m]) {
            let temp = {}
            if (delFlag === "0") {
                temp["newData"] = newData[i]
                temp["oldData"] = oldData[j]
            }
            if (delFlag === "1") {
                temp["newData"] = oldData[i]
                temp["oldData"] = newData[j]
            }
            temp["optType"] = "U"
            backValue[backValue.length] = temp
            break
        }
    }
}