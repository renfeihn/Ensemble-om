import { getPkListColumnRf } from "@/api/url/prodInfo";
const util=  require('@/utils/util');
export function getPkList (valueScore,mainSeqNo,callback1) {
    if(util.isNotNull(valueScore)){
        if(mainSeqNo!=undefined){
        valueScore['mainSeqNo']=mainSeqNo
        }
        getPkListColumnRf(valueScore).then(response => {
                var re= response.data.data;
            callback1(re);
            });
    }
}
