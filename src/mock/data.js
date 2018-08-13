export default {
  getProdData: () => ({
    prodFrom: {
      proddesc: '活期存款',
      busimodel: 'RB',
      prodclass: 'RB100',
      prodprepice: 'S',
      prodmuti: 'Y',
      prodstatus: 'A',
      baseprod: '100001',
      accttype: 'S',
      acctsontype: '1',
      acctstruct: '1',
      virtualflag: '00',
      acctintflag: '00',
      amtflag: '10',
      profitcenter: '99',
      effectdate: '2018-06-05',
      failuredate: '2018-06-08'
    },
    acctFrom: {
      attr: '1',
      class: '2',
      muticcyflag: 'Y',
      ccytype: ['CNY', 'USD'],
      amttype: 'BAL',
      baltype: 'CA',
      reducedccy: 'USD',
      acctusefor: '100',
      mediumtype: 'A'
    }
  }),
  getProdData1: () => ({
    prodFrom: {
      proddesc: '活期存款',
      busimodel: 'RB',
      prodclass: 'RB200',
      prodprepice: 'B',
      prodmuti: 'N',
      prodstatus: 'C',
      baseprod: '100002',
      accttype: 'C',
      acctsontype: '2',
      acctstruct: '2',
      virtualflag: '11',
      acctintflag: '11',
      amtflag: '11',
      profitcenter: '99',
      effectdate: '2018-11-11',
      failuredate: '2018-12-11'
    },
    acctFrom: {
      attr: '2',
      class: '3',
      muticcyflag: 'N',
      ccytype: 'USD',
      amttype: 'BAL',
      baltype: 'TT',
      reducedccy: 'CNY',
      acctusefor: '200',
      mediumtype: 'B'
    }
  }),
  getProdDataNull: () => ({
    prodFrom: {
      proddesc: '',
      busimodel: '',
      prodclass: '',
      prodprepice: '',
      prodmuti: '',
      prodstatus: '',
      baseprod: '',
      accttype: '',
      acctsontype: '',
      acctstruct: '',
      virtualflag: '',
      acctintflag: '',
      amtflag: '',
      profitcenter: '',
      effectdate: '',
      failuredate: ''
    },
    acctFrom: {
      attr: '',
      class: '',
      muticcyflag: '',
      ccytype: '',
      amttype: '',
      baltype: '',
      reducedccy: '',
      acctusefor: '',
      mediumtype: ''
    }
  })
}