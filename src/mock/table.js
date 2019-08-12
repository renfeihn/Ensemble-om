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
  getList: () => ({
    irlAccounting: [{
        value: false,
      prodType: 'GL3001',
      accountingStatus: 'Y',
      subjectCode: '1111',
      rateCode: '22',
      DSubjectCode: '1111'
    }, {
        value: false,
      prodType: 'GL3004',
      accountingStatus: 'Y',
      subjectCode: '1111',
      rateCode: '22',
      DSubjectCode: '1111'
    }, {
        value: false,
      prodType: 'GL3005',
      accountingStatus: 'Y',
      subjectCode: '1111',
      rateCode: '22',
      DSubjectCode: '1111'
    }, {
        value: false,
      prodType: 'GL3006',
      accountingStatus: 'Y',
      subjectCode: '1111',
      rateCode: '22',
      DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }, {
        value: false,
        prodType: 'GL3005',
        accountingStatus: 'Y',
        subjectCode: '1111',
        rateCode: '22',
        DSubjectCode: '1111'
    }]

  })
}
