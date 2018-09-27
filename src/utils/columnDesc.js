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
    'N': 'N-非持续扣款',
    'EVENT_TYPE': '事件类型',
    'INT_CLASS': '利息分类',
    'INT_TYPE': '利率代码',
    'INT_TYPE_DESC': '利率代码详细',
    'INT_CALC_BAL': '计息方式',
    'INT_AMT_ID': '利息计算金额编码',
    'RATE_AMT_ID': '利率计算金额编码',
    'MONTH_BASIS': '月基准',
    'ACCOUNTING_STATUS': '核算状态',
    'BUSINESS_UNIT': '套账',
    'GL_CODE_L': '负债科目代码',
    'GL_CODE_INT_E': '利息支出科目代码',
    'GL_CODE_INT_PAY': '应付利息科目代码',
    'FEE_TYPE': '批量收费类型',
    'CHARGE_PERIOD_FREQ': '收费频率',
    'CHARGE_DAY': '收费日期',
    'CHARGE_DEAL_METHOD': '收费处理方式',
    'CON_DEDUCT_FLAG': '持续扣款标识',
    'CON_DEDUCT_TIMES': '持续扣款次数',
    'ACCT_STATUS': '账户状态',
    'TRANSFER_TYPE': '转移类型',
    'TRANSFER_PERIOD': '转移周期',
    'RESTRAINT_AMT': '限制金额',
    'TRANSFER_CONDITION': '转移条件',
    'TRAN_AFTER_FLAG': '转移后是否结息'
}

export function getColumnDesc (data) {
    const reData=column[data]==undefined?data:column[data];
    return reData;
}
export function getColumnDesc_(s){
 return getColumnDesc(s.replace(/([A-Z])/g,"_$1").toUpperCase());
}