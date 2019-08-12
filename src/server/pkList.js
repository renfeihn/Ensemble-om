
const axios = require("axios");
const iconv = require('iconv-lite');
import { getPkListRf } from "@/api/url/prodInfo";
const util=  require('../utils/util');
export function getPkList (params,callback1) {
    let columnList=[];
    const file = require('./columnValue');
    const columnInfo=file[params];
    if(util.isNotNull(columnInfo)){
        const method=columnInfo.valueMethod;
        const score=columnInfo.valueScore
        if(method=='VL'){
          const valueList=score.split(',');
          for(const key in valueList){
              const valueInfo=valueList[key];
              const begin=valueInfo.indexOf(':');
              const key=valueInfo.substring(0,begin);
              const value=valueInfo.substring(begin+1)
              columnList.push({keySet: key, value: value})
          }
            callback1(columnList);
        }else{
            const param={pkInfo: score}
            getPkListRf(param).then(response => {
                var re= response.data;
                callback1(re);
            });
        }
    }

}
