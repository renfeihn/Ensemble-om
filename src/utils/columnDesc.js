/**
 * Created by ligan on 2018/9/21.
 */
const column= {
    'PROD_CHANNEL': '渠道信息',
    'INT_DAY': '结息日',
    'ACCT_BAL_FLAG': '金额标志',
    'ACCT_REAL_FLAG': '虚实标志',
    'SE_FLAG': '售汇标志',
    'ACCT_NATURE': '账户属性',
    'PROD_START_DATE': '生效日期',
    'PROD_TYPE': '产品类型',
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
    'TRAN_AFTER_FLAG': '转移后是否结息',
    'NEXT_CHARGE_DATE': '下一收费日',
    'TRAN_TIMESTAMP': '交易时间戳',
    'TRAN_TIME': '交易时间',
    'ACCT_CLASS': '账户类别',
    'ACCT_EXEC': '客户经理',
    'ACCT_INT_FLAG': '记息标志',
    'ACCT_STRUCT_FLAG': '账户结构',
    'ACCT_TYPE': '账户类型',
    'ACTUAL_OR_LEDGER_BAL': '余额标志',
    'AGENT_FLAG': '允许代办',
    'ALL_DEP_FLAG': '是否通兑',
    'ALL_DRA_FLAG': '是否通存',
    'AMT_CALC_TYPE': '金额计算方式',
    'AMT_TYPE': '金额类型',
    'AUTO_BE_FLAG': '自动结汇',
    'AUTO_CLOSE_FLAG': '自动销户',
    'AUTO_DORM_FLAG': '自动转睡眠',
    'AUTO_HANG_FLAG': '自动转久悬',
    'AUTO_REC_FLAG': '自动回收',
    'AUTO_RENEW_ROLLOVER': '自动转存',
    'AUTO_SETTLE': '自动结算',
    'AUTO_SE_FLAG': '自动售汇',
    'BACK_FLOAT_FLAG': '早起息',
    'BAL_DIRECT_TYPE': '余额方向',
    'BAL_TYPE': '余额类型',
    'BAL_TYPE_PRIORITY': '余额优先级',
    'BAL_UPD_TYPE': '余额更新类型',
    'BE_FLAG': '结汇标志',
    'CA_TRAN_FLAG': '现金交易',
    'CCY': '币种',
    'CD_APPER_FLAG': '是否开立附属卡',
    'CD_APP_NUM': '开附属卡数量',
    'CD_AREA_CODE': '卡地区码',
    'CD_BIN_VALID_TIME': '卡BIN有效期',
    'CD_CARD_BIN': '卡BIN',
    'CD_CUST_GRADE': '卡的客户等级',
    'CD_FUNCTION': '功能定义',
    'CD_IS_APPER': '是否为附属卡',
    'CD_MADEFEE_FLAG': '工本费收取',
    'CD_MADE_STANDARD': '制卡标准',
    'CD_MEDIUM': '磁条/IC卡',
    'CD_RULE': '卡号规则',
    'CD_SAME_FLAG': '同号换卡',
    'CD_SELF_SEL': '自选卡号标志',
    'CD_SERVICE_CODE': '卡服务代码',
    'CD_TYPE': '卡类型',
    'CD_VALID_FLAG': '有效标志',
    'CD_VALID_TIME': '卡介质的有效期',
    'CD_YEARFEE_STATUS': '卡年费收取标志',
    'CHECK_ACCT_CLASS': '账户类别检查',
    'CHECK_ACCT_NATURE': '账户属性检查',
    'CHECK_ACCT_STATUS': '账户状态检查',
    'CHECK_AGENT': '代办人检查',
    'CHECK_ALL_DEP': '通存标志检查',
    'CHECK_ALL_DRA': '通兑标志检查',
    'CHECK_CCY': '币种检查',
    'CHECK_CLOSE_FEE': '欠费检查',
    'CHECK_FUND_IND': '检查金额标志',
    'CHECK_FUND_TRAN': '资金转移方式检查',
    'CHECK_INIT_AMT': '首次存入金额检查',
    'CHECK_KEEP_BAL': '留存金额检查标志',
    'CHECK_MISS_NUM': '漏存次数检查',
    'CHECK_PROD_DATE': '检查产品日期',
    'CHECK_PROD_STATUS': '检查产品状态',
    'CHECK_RESTRAINT': '账户限制检查',
    'CHECK_RESTRAINT_IND': '限制检查标志',
    'CHECK_SG_AMT': '单次金额控制方式',
    'CHECK_SG_ISS_AMT': '单次发放金额控制标志',
    'CHECK_SIGN': '签约检查',
    'CHECK_TRAN_LIMIT': '检查交易限额',
    'CHECK_WDRAWN_TYPE': '支取方式检查标志',
    'CLIENT_IND': '内部客户标志',
    'CLIENT_TYPE': '客户类型',
    'CL_1DD_IND': '单笔发放',
    'CL_ADVANCE_TYPE': '贴现贷款类型',
    'COMMITTED_FLAG': '是否承诺贷款',
    'CR_DR_MAINT_IND': '借贷标志',
    'CYCLE_FREQ': '结息周期',
    'DOC_FLAG': '是否有凭证',
    'DOC_TYPE': '凭证类型',
    'DORMANT_MONTH': '自动转不动户月数',
    'ET_SETTLE_FLAG': '委托贷款结算标志',
    'FEE_CAP': '费用资本化',
    'FIXED_CALL': '账户子类型',
    'FUND_TRAN_TYPE': '资金转移方式',
    'FUTURE_FLOAT_FLAG': '晚起息标志',
    'GL_TYPE': '总账类型',
    'GRACE_END_MONTH': '宽限期为月末',
    'GRACE_OVER_MONTH': '是否允许跨月',
    'GRACE_PERIOD': '宽限期',
    'HUNTING_STATUS': '持续扣款标志',
    'INIT_AMT': '起存金额',
    'INIT_FLAG': '起存金额控制标记',
    'INLAND_OFFSHORE': '境内境外',
    'INTER_BANK_FLAG': '行内同业标识',
    'INTER_BANK_TYPE': '拆入拆出标识',
    'INT_APPL_TYPE': '利率启用方式',
    'INT_CAP': '利息资本化',
    'INT_CHANGE_TERM': '利率变更周期',
    'INT_FLAG': '记息标志',
    'INT_PENALTY': '是否收复利',
    'INT_ROLL_FREQ': '利率变更周期',
    'KEEP_MAX_BAL': '留存最大余额',
    'KEEP_MIN_BAL': '留存最小余额',
    'LEGAL_PERSON': '表示产品所属法人',
    'LG_AGRE_REL': '保函与基础合同的关系',
    'LG_ATTR': '保函属性',
    'LG_BANK_DUTY': '担保行付款责任',
    'LG_CLAIM_CON': '保函的索赔条件',
    'LG_PAY_PRE': '保函项下的支付前提',
    'LG_REL_BOND': '是否关联保证金',
    'LG_REL_PROD': '保函与垫款产品对应关系',
    'LG_TFR_FLAG': '是否转开保函',
    'LG_USE_RANGE': '保函的使用范围',
    'LOAN_MAX_TERM': '最长贷款期限',
    'LOAN_MIN_TERM': '最短贷款期限',
    'LOAN_TERM_CTR_FLAG': '贷款期限控制标志',
    'MAX_BACK_DATE_DAYS': '倒起息最大天数',
    'MAX_DD_NUM': '最大放款次数',
    'MAX_EXTEND_TIMES': '最大展期次数',
    'MAX_FUTURE_DATE_DAYS': '晚起息最大天数',
    'MAX_NUM': '最大次数',
    'MIN_NUM': '最小次数',
    'MISS_NUM': '漏存次数',
    'MM_AUTO_DEALS': '自动生成对手交易',
    'MM_AUTO_VERIFY': '是否自动复核',
    'MM_CASH_FLOW': '是否处理现金流',
    'MM_CATEGORY': '拆借性质',
    'MM_INTREST_FLAG': '利息标识',
    'MM_POSITION_FLAG': '是否处理头寸',
    'MULTI_BAL_TYPE': '是否多余额',
    'MULTI_CCY': '是否多币种',
    'NEXT_CYCLE_DATE': '下一处理日期',
    'NON_GENL_STATUS': '非正常停止发放',
    'NUM_CTR_FLAG': '次数控制方式',
    'NUM_OF_CLIENT': '同客户允许数量',
    'OD_FACILITY': '账户透支标志',
    'OD_INT_PENALTY': '复利的复利',
    'OD_ON_FEES': '过期费用是否罚息',
    'OD_ON_INTEREST': '过期利息是否罚息',
    'OD_ON_INT_OVERDUE': '过期复利是否罚息',
    'OD_ON_PRINCIPAL': '过期本金是否罚息',
    'OD_ON_PRI_OVERDUE': '过期罚息是否罚息',
    'OD_PRI_PENALTY': '罚息的复利',
    'OWNERSHIP_TYPE': '账户关系类型',
    'PARTIAL_RENEW_ROLL': '是否允许部分本金转存',
    'PART_WITHDRAW_FLAG': '是否允许部分提取',
    'PART_WITHDRAW_NUM': '部分提取次数',
    'PB_FLAG': '是否带折标记',
    'PRECONTRACT_TYPE': '预约方式',
    'PRE_PAID_FLAG': '提前回收标志',
    'PRE_PAID_LOCK_TERM': '提前回收锁定期',
    'PRE_PAID_NUM': '提前回收次数',
    'PRE_PAID_TERM': '提前回收周期',
    'PRE_WITHDRAW_FLAG': '是否允许提前支取',
    'PRE_WITHDRAW_NUM': '提前支取次数',
    'PRE_WITHDRAW_TYPE': '提前支取方式',
    'PRI_PENALTY': '是否收罚息',
    'PROD_BRANCH': '产品所属机构',
    'PROD_END_DATE': '失效日期',
    'PROD_REGION': '产品所属区域',
    'PROFIT_CENTRE': '利润中心',
    'REPAY_SEQ_TYPE': '应计贷款还款顺序',
    'REPAY_SEQ_TYPE_NP': '非应计利息还款顺序',
    'RESTRAINT_FLAG': '账户限制标志',
    'REVOLVE_YN': '是否循环',
    'ROLLOVER_NO': '自动本息转存次数',
    'SCHED_MODE': '贷款还款方式',
    'SEC_AMT_CALC': '第二层账户金额计算方式',
    'SEC_AMT_TYPE': '第二层账户金额类型',
    'SERV_CHARGE_FLAG': '服务费标志',
    'SETTLE_VERIFY_FLAG': '结算是否自动复核',
    'SG_DEP_MAX_AMT': '单次存入最大金额',
    'SG_DEP_MIN_AMT': '单次存入最小金额',
    'SG_ISS_MAX_AMT': '单次最大金额',
    'SG_ISS_MIN_AMT': '单次最小金额',
    'SG_MAX_AMT': '单次最大金额',
    'SG_MIN_AMT': '单次最小金额',
    'SHOW_ON_STMT': '对账单标志',
    'SOURCE_MODULE': '业务模块',
    'STRUCTURE_TYPE': '账号生成规则',
    'SUB_ACCT_FLAG': '主子账户开立标识',
    'SYNC_FINAL_BILLING': '是否利随本清',
    'SYN_TYPE': '银团贷款性质',
    'TAXABLE': '收税标志',
    'TD_ADDTL_PRINCIPAL': '允许本金增加标志',
    'TERM_FREQ': '期限',
    'TERM_LONG_FLAG': '是否允许延期',
    'TERM_SHORT_FLAG': '是否允许缩期',
    'TRAN_LIMIT_AMT': '限额',
    'TRAN_LIMIT_CCY': '限额币种',
    'TRAN_LIMIT_TERM': '限额周期',
    'TT_TRAN_FLAG': '转账交易标志',
    'UPD_OD': '透支登记标志',
    'WITHDRAWAL_TYPE': '支取方式',
    'FIXED_INT': '固定利率值',
    'CLIENT_TYPE_DESC': '客户类型描述',
    'IS_INDIVIDUAL': '是否个体客户',
    'COMPANY': '所属法人',
    'CONVERTED_CCY': '折算币种',
    'CD_BRAND': '品牌',
    'CHECK_COMMISSION': '代办人是否本机构员工检查',
    'prodType': '产品代码',
    'prodDesc': '产品描述',
    'prodAbbr': '产品简称',
    'prodClass': '产品分类',
    'prodGroup': '是否产品组',
    'prodRange': '产品作用范围',
    'baseProdType': '基础产品',
    'status': '状态',
    'company': '所属法人',
    'sourceModule': '所属模块',
    'AGREEMENT_TYPE': '协议类型',
    'chargeDay': '收取日',
    'taxType': '税率类型 ',
    'rateAmtId': '利率计算金额编码',
    'glCodeL': '负债科目代码 ',
    'glCodeIntPay': '应付利息科目代码 ',
    'intType': '利率类型 ',
    'DML_TYPE': '操作类型',
}

export function getColumnDesc (data) {
    const reData=column[data]==undefined?data:column[data];
    return reData;
}
export function getColumnDesc_(s){
 return getColumnDesc(s.replace(/([A-Z])/g,"_$1").toUpperCase());
}