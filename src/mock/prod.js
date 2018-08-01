import Mock from 'mockjs'

const List = []
const depositPordList = []
const prodList = []
const prodListTwo = []
const prodTree = []
const diffProd= []
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

for (let i = 0; i < count; i++) {
  depositPordList.push(Mock.mock({
    value: 'RB10@increment',
    label: '@value - 活期存款'
  }))
}
for (let i = 0; i < count; i++) {
    prodList.push(Mock.mock({
        value: 'RB10@increment',
        label: '活期存款',
        status: '启用',
        icon: 'call_to_action',
        iconClass: 'amber white--text',
        avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
    }))
}
for (let i = 0; i < 1; i++) {
    prodListTwo.push(Mock.mock({
        value: 'RB10@increment',
        label: '',
        status: '启用',
        icon: 'call_to_action',
        iconClass: 'amber white--text'
    }))
}
export default {
  getProd: () => ({
    depositProd: {
      prodtype: 'RB100',
      version: '1.2'
    },
    prodFrom: {
      desc: '活期产品',
      prodtype: 'RB100',
      prodstatus: true,
      region: 'S',
      date1: '2018-06-05',
      date2: '2019-06-05',
      base: 'RB001',
      delivery: true,
      ccy: ['CNY', 'HKD']
    },
    acctFrom: {
      attr: '1',
      class: '2',
      date1: '2018-06-05',
      date2: '2019-06-05',
      base: 'RB001',
      delivery: true,
      ccy: ['CNY', 'HKD']
    }
  }),
    depositTwo: () => ({
        prodListTwo :[{        value: 'RB1000',
            label: '个人活期存款系列',
            status: '启用',
            icon: 'call_to_action',
            iconClass: 'amber white--text'},{
            value: 'RB1001',
            label: '单位存款系列',
            status: '启用',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        },{
            value: 'RB1001',
            label: '个人定期存款系列',
            status: '启用',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        },{
            value: 'RB1001',
            label: '单位定期存款系列',
            status: '启用',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        },{
            value: 'RB1001',
            label: '大额存单',
            status: '启用',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        },{
            value: 'RB1001',
            label: '特色产品一',
            status: '启用',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        },{
            value: 'RB1001',
            label: '特色产品二',
            status: '启用',
            icon: 'call_to_action',
            iconClass: 'amber white--text'
        }]
    }),
  getDepositProd: () => ({
    depositProd: prodList
  }),
  getDiffProd: () => ({
      prodDiff : [{
          diffType:'产品代码',
          prod1:'RB10001',
          prod2:'RB10002'
      },{
          diffType:'产品名称',
          prod1:'个人活期存款产品',
          prod2:'个人定期存款产品'
      },{
          diffType:'产品类别',
          prod1:'个人存款',
          prod2:'个人存款'
      },{
          diffType:'产品结构',
          prod1:'一层账户',
          prod2:'二层账户'
      },{
          diffType:'金额标志',
          prod1:'不记录余额',
          prod2:'主子都记录余额'
      },{
          diffType:'虚实标志',
          prod1:'虚账户',
          prod2:'主实账户'
      },{
          diffType:'余额类型',
          prod1:'超余额汇余额',
          prod2:'RB10002'
      },{
          diffType:'产品状态',
          prod1:'有效',
          prod2:'有效'
      },{
          diffType:'产品代码',
          prod1:'RB10001',
          prod2:'RB10002'
      },{
          diffType:'账户计息标志',
          prod1:'主账户计息',
          prod2:'子账户计息'
      },{
          diffType:'利润中心',
          prod1:'神州利润中心',
          prod2:'神州利润中心'
      },{
          diffType:'生效日期',
          prod1:'2018/01/23',
          prod2:'2018/02/23'
      },{
          diffType:'失效日期',
          prod1:'2099/01/23',
          prod2:'2099/01/23'
      }]
  }),
  getProdList: () => ({
    prodList:  [{
        value: 'RB100',
        label: 'RB100-个人活期产品',
        action: 'local_activity',
        children: depositPordList
    },
        {
            value: 'RB200',
            label: 'RB200-个人定期产品',
            action: 'restaurant',
            children: depositPordList
        },
        {
            value: 'RB300',
            label: 'RB300-单位定期产品',
            action: 'school',
            children: depositPordList
        },
        {
            value: 'RB400',
            label: 'RB400-单位活期产品',
            action: 'directions_run',
            children: depositPordList
        }
    ]
  })
}
