/**
 * Created by ligan on 2018/9/21.
 */
const column= {
    'INT_DAY': '结息日',
    'ACCT_BAL_FLAG': '金额标志',
    'ACCT_REAL_FLAG': '虚实标志',
    'SE_FLAG': '售汇标志',
    'ACCT_NATURE': '账户属性',
    'PROD_START_DATE': '生效日期',
    'ALL_DEP_FLAG': '是否通兑'
}

export function getColumnDesc (data) {
    const reData=column[data]==undefined?data:column[data];
    return reData;
}