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
    'PROD_TYPE': '产品类型',
    'ALL_DEP_FLAG': '是否通兑',
    'L01': 'L01-承兑承诺费',
    'L10': 'L10-提前还款费',
    'R01': 'R01-小额账户管理费',
    'R02': 'R02-账户验资开户费',
    'R03': 'R03-对公账户管理费',
    '1D': '1D-一天',
    '3D': '3D-三天',
    '5D': '5D-五天',
    '1M': '1M-一个月',
    '2M': '2M-两个月',
    '6M': '6M-六个月',
    '10': '10-实时生效',
    '11': '11-日终处理',
    'Y': 'Y-持续扣款',
    'N': 'N-非持续扣款'
}

export function getColumnDesc (data) {
    const reData=column[data]==undefined?data:column[data];
    return reData;
}
export function getColumnDesc_(s){
 return getColumnDesc(s.replace(/([A-Z])/g,"_$1").toUpperCase());
}