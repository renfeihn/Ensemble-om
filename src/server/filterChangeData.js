/**
 * Created by jiajt on 2018/8/21.
 * 处理prodData对象改变的数据到targetProdData对象
 * 处理prodData.prodType对象数据：处理后targetProdData.prodType对象结构：
 *              prodType:{
 *                      newProdType:{
 *                          prodType:1110001
 *                          prodDesc:存款产品AA
 *                          ...}，
 *                      oldProdType:{
 *                          prodType:1110001
 *                          prodDesc:存款产品BB
 *                          ...}
 *                       }
 * 处理prodData.prodDefines对象数据：处理后targetProdData.prodDefines对象结构同prodType.
 *             差异：newProdDefines{}对象只包含被修改对象的修改后值，oldProdDefines{}只包含被修改对象修改前数据，二者一对一
 * 处理prodData.mbEventInfos对象数据：处理后结构：
 *              mbEventInfos: {
 *                          事件A：{
 *                              mbEventAttrs:{
 *                                  newMbEventAttrs: {只包含被修改对象修改后值},
 *                                  oldMbEventAttrs: {只包含被修改对象修改前值}
 *                                  },
 *                              mbEventPart: {
 *                                  newMbEventPart: {只包含被修改对象修改后值},
 *                                  oldMbEventPart: {只包含被修改对象修改前值}
 *                                  },
 *                             mbEventType: {
 *                                  newMbEventType: {只包含被修改对象修改后值},
 *                                  oldMbEventType: {只包含被修改对象修改前值}
 *                                  },
 *                               }，
 *                           事件B：{}，
 *                           事件C：{}.
 *                           ...
 *                           }
 */
export function filterChangeData (prodData,sourceProdData,targetData) {

    var backData = targetData
    // 处理prodType对象数据
    var prodType = {newProdType: {},oldProdType: {}}
    prodType.newProdType = prodData.prodType
    prodType.oldProdType = sourceProdData.prodType
    backData.prodType = prodType
    //处理prodDefines对象数据
    var prodDefines = {newProdDefines: {},oldProdDefines: {}}
    var newMap = {}
    var oldMap = {}
    for (let i in prodData.prodDefines){
        if (prodData.prodDefines[i].attrValue !== sourceProdData.prodDefines[i].attrValue){
            newMap[i] = prodData.prodDefines[i]
            oldMap[i] = sourceProdData.prodDefines[i]
        }
    }
    prodDefines.newProdDefines = Object.assign(prodDefines.newProdDefines,newMap)
    prodDefines.oldProdDefines = Object.assign(prodDefines.oldProdDefines,oldMap)
    backData.prodDefines = prodDefines
}