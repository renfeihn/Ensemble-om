/**
 * Created by jiajt on 2018/8/21.
 */
export function getChangeData (oldData,sourceData,targetData) {
    // targetData = sourceData
    //处理eventForm对象数据
    for (let i in oldData.prodFrom){
        for (let j in sourceData.eventForm){
            //key值匹配
            if(i===j){
                //相同key对应的value相同
                if (oldData.prodFrom[i] === sourceData.eventForm[j]){
                    //删除targetData对象中的该条属性
                    delete sourceData.eventForm.j
                }
            }
        }
    }
    // for(item in targetData.eventForm){
    //     sourceDataArr.push(targetData.eventForm[item]);
    // }
}