/**
 * Created by ligan on 2018/7/10.
 */
import Mock from 'mockjs'

const List = []
const count = 100

const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        timestamp: +Mock.Random.date('T'),
        author: '@first',
        reviewer: '@first',
        title: '@title(5, 10)',
        content_short: '我是测试数据',
        content: baseContent,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft', 'deleted'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300, 5000)',
        image_uri,
        platforms: ['a-platform']
    }))
}

export default {
    getChargeDefine: () => ({
        chargeDefine: [{
            value: false,
            chargeType: 'C001-小额账户管理费',
            chargeFreq: 'Y1',
            chargeDate: '31',
            chargeDealMethod: 'A-足额扣除',
            conDedFlag: 'Y',
            conDedNum: '5'
        },{
            value: false,
            chargeType: 'C001-小额账户管理费',
            chargeFreq: 'Y1',
            chargeDate: '31',
            chargeDealMethod: 'P-有多少扣多少',
            conDedFlag: 'N',
            conDedNum: '5'
        }]
    }),
    getRateInfo: () => ({
        rateInfo: [{
            value: false,
            eventType: 'ACR-计提',
            intClass: 'INT-正常结息',
            rateCode: 'PHQI-活期利率',
            rateCodeDetail: 'PHQI',
            intWay: 'AB-积数计提',
            rateAmtCode: '200-余额',
            intAmtCode: '502-积数',
            monthBasic: 'ACT-实际天数',
            minRate: '',
            maxRate: '',
            rateStartMethod: 'A-实际生效',
            rateChangePeriod: '',
            nextRateDay: '',
            calDayFlag: '',
            calDayMethod: 'B-实际天数',
            taxType: 'LXS-利息税'
        },{
            value: false,
            eventType: 'CLOSE-销户',
            intClass: 'INT-正常结息',
            rateCode: 'PHQI-活期利率',
            rateCodeDetail: 'PHQI',
            intWay: 'AB-积数计提',
            rateAmtCode: '200-余额',
            intAmtCode: '502-积数',
            monthBasic: 'ACT-实际天数',
            minRate: '',
            maxRate: '',
            rateStartMethod: 'A-实际生效',
            rateChangePeriod: '',
            nextRateDay: '',
            calDayFlag: '',
            calDayMethod: 'B-实际天数',
            taxType: 'LXS-利息税'
        },
        {
            value: false,
            eventType: 'OPEN-开户',
            intClass: 'INT-正常结息',
            rateCode: 'PHQI-活期利率',
            rateCodeDetail: 'PHQI',
            intWay: 'AB-积数计提',
            rateAmtCode: '200-余额',
            intAmtCode: '502-积数',
            monthBasic: 'ACT-实际天数',
            minRate: '',
            maxRate: '',
            rateStartMethod: 'A-实际生效',
            rateChangePeriod: '',
            nextRateDay: '',
            calDayFlag: '',
            calDayMethod: 'B-实际天数',
            taxType: 'LXS-利息税'
        }]
    }),
    getFormShift: () => ({
        formShift: [{
            value: false,
            acctStatus: '正常',
            transferType: '正常转不动户',
            transferPeriod: '120',
            restraintAmt: '10',
            transferCondition: '周期内没有金融交易',
            tranAferFlag: 'Y'
        },{
            value: false,
            acctStatus: '不动户',
            transferType: '不动户转久悬',
            transferPeriod: '120',
            restraintAmt: '10',
            transferCondition: '周期内没有金融交易',
            tranAferFlag: 'N'
        }]
    }),
    getAccountingInfo: () => ({
        accountingInfo: [{
            value: false,
            prodType: '111001-个人活期账户',
            accountingStatus: 'ALL-所有',
            accountSet: '',
            subjectCode: '20110101-个人活期储蓄存款',
            rateCode: '54119011-个人活期存款利息支出',
            DSubjectCode: '22310901-应付个人活期存款利息'
        },{
            value: false,
            prodType: '111001-个人活期账户',
            accountingStatus: 'ALL-所有',
            accountSet: '',
            subjectCode: '20110101-个人活期储蓄存款',
            rateCode: '54119011-个人活期存款利息支出',
            DSubjectCode: '22310901-应付个人活期存款利息'
        }]
    }),
}
