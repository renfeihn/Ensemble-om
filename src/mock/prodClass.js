import Mock from 'mockjs'


const baseContent = '<p>我是测试数据我是测试数据</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

export default {
    getProdClass: () => ({
        prodClassForm: [{
            prodClass: 'CL100',
            prodClassDesc: '对私贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL'
        }, {
            prodClass: 'CL200',
            prodClassDesc: '对公贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL'
        }, {
            prodClass: 'CL300',
            prodClassDesc: '贴现组',
            prodClassLevel: '2',
            parentProdClass: 'CL'
        }, {
            prodClass: 'CL400',
            prodClassDesc: '垫款组',
            prodClassLevel: '2',
            parentProdClass: 'CL'
        }, {
            prodClass: 'CL500',
            prodClassDesc: '委托贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL'
        }, {
            prodClass: 'CL600',
            prodClassDesc: '银团贷款组',
            prodClassLevel: '2',
            parentProdClass: 'CL'
        }, {
            prodClass: 'CLBASE',
            prodClassDesc: '贷款基础产品组',
            prodClassLevel: '2',
            parentProdClass: 'CL'
        }, {
            prodClass: 'GL100',
            prodClassDesc: '内部账组',
            prodClassLevel: '2',
            parentProdClass: 'GL'
        }, {
            prodClass: 'GL200',
            prodClassDesc: '存放同业组',
            prodClassLevel: '2',
            parentProdClass: 'GL'
        }, {
            prodClass: 'GL300',
            prodClassDesc: '同业存放组',
            prodClassLevel: '2',
            parentProdClass: 'GL'
        }, {
            prodClass: 'GLBASE',
            prodClassDesc: '内部账基础产品组',
            prodClassLevel: '2',
            parentProdClass: 'GL'
        }, {
            prodClass: 'RB100',
            prodClassDesc: '个人存款组',
            prodClassLevel: '2',
            parentProdClass: 'RB'
        }, {
            prodClass: 'RB200',
            prodClassDesc: '对公存款组',
            prodClassLevel: '2',
            parentProdClass: 'RB'
        }, {
            prodClass: 'RB300',
            prodClassDesc: '同业存款组',
            prodClassLevel: '2',
            parentProdClass: 'RB'
        }, {
            prodClass: 'RBBASE',
            prodClassDesc: '存款基础产品组',
            prodClassLevel: '2',
            parentProdClass: 'RB'
        }]
    })
}
