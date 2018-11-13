import { getPkListColumnRf } from "@/api/url/prodInfo";
const util=  require('@/utils/util');
export function getPkList (valueScore,callback1) {
    if(util.isNotNull(valueScore)){
        getPkListColumnRf(valueScore).then(response => {
                var re= response.data.data;
            callback1(re);
            });
    }
}
