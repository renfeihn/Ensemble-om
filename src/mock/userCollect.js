import Mock from 'mockjs';

export default {
    getUserCollectProds: () => ({
        collectProdsForm: [{
            userId: 'admin',
            prodClass: 'RB100',
            prodCode: '111001',
            prodDesc: '个人活期存款',
            status: 'A',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'RB200   ',
            prodCode: '121001',
            prodDesc: '单位活期存款',
            status: 'S',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'RB300',
            prodCode: '130001',
            prodDesc: '存款类金融机构存放清算款项',
            status: 'S',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'CL100',
            prodCode: '210001',
            prodDesc: '个人汽车贷款',
            status: 'S',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'CL200',
            prodCode: '220001',
            prodDesc: '单位流动资金贷款',
            status: 'S',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'CL300',
            prodCode: '240001',
            prodDesc: '票据直贴',
            status: 'S',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'GL100',
            prodCode: '330001',
            prodDesc: '人行再贷款',
            status: 'S',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'GL200',
            prodCode: '310007',
            prodDesc: '存放境外同业定期款项',
            status: 'S',
            collectData: '20180810'
        }, {
            userId: 'admin',
            prodClass: 'GL300',
            prodCode: '330099',
            prodDesc: '测试用同业存放活期',
            status: 'S',
            collectData: '20180810'
        }]
    })
}
