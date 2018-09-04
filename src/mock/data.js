export default {
    getProdInfo: (val) => ({
        prodType: {
            prodType: val,
            prodDesc: '活期存款',
            prodClass: 'RB100',
            prodRange: 'S',
            prodGroup: 'Y',
            status: 'A',
        },
        prodDefines: {
            ACCT_STRUCT_FLAG: {
                attrValue: '1'
            },
            ACCT_TYPE: {
                attrValue: 'C'
            },
            ACCT_REAL_FLAG: {
                attrValue: '10'
            },
            ACCT_INT_FLAG: {
                attrValue: '10'
            },
            ACCT_BAL_FLAG: {
                attrValue: '10'
            },
            PROFIT_CENTRE: {
                attrValue: '99'
            },
            PROD_START_DATE: {
                attrValue: '20180101'
            },
            PROD_END_DATE: {
                attrValue: '20190101'
            }
        }
  })
}