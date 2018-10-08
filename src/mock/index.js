import prodClassAPI from './prodClass'
import Mock from 'mockjs'
import prodAPI from './prodDiff'
import tableAPI from './table'
import initAPI from './init'
import dataAPI from './data'
import privateDataAPI from './privateData'
//
import nLoanAPI from './nLoan'

import loginAPI from './login'
import prodTypeAPI from './prodType'
import userCollectAPI from './userCollect'
import rbtableAPI from './rbTable'
// Mock.setup({
//   timeout: '350-600'
// })
// 表格相关
Mock.mock(/\/prod\/deposit\.*/, 'get', prodAPI.getDepositProd);
Mock.mock(/\/prod\/dtlDeposit\.*/, 'get', prodAPI.getDepositDtl);
Mock.mock(/\/prod\/getDiffProd\.*/, 'post', prodAPI.getDiffProd);
Mock.mock(/\/prod\/getDiffProd\.s*/, 'get', prodAPI.getDiffProd);
Mock.mock(/\/prod\/getDiffList\.*/, 'get', prodAPI.getDiffList);
Mock.mock(/\/prod\/prodList\.*/, 'get', prodAPI.getProdList);
Mock.mock(/\/data\/info\.*/, 'get', dataAPI.getProdData);
Mock.mock(/\/data\/info\.*/, 'get1', dataAPI.getProdData1);
Mock.mock(/\/data\/info\.*/, 'null', dataAPI.getProdDataNull);
Mock.mock(/\/prod\/towDeposit\.*/, 'get', prodAPI.depositTwo);
// Mock.mock(/\/init\/initRefData\.*/, 'get', initAPI.getInitData);
Mock.mock(/\/prod\/getProdType\.*/, 'get', prodTypeAPI.getProdType);
Mock.mock(/\/prod\/prodClass\.*/, 'get', prodClassAPI.getProdClass);
Mock.mock(/\/table\/list/, 'get', tableAPI.getList);
Mock.mock(/\/prod\/info\.*/, 'get', prodAPI.getProd);
Mock.mock(/\/prod\/userCollect\.*/, 'get', userCollectAPI.getUserCollectProds());

Mock.mock(/\/getProdInfo/, 'post', dataAPI.getProdInfo);

Mock.mock(/\/getPrivateData/, 'post', privateDataAPI.getPrivateData);

//网贷合作方信息管理
Mock.mock(/\/init\/initLoanData\.*/, 'get', nLoanAPI.getInitData);

Mock.mock(/\/table\/chargeDefine/, 'get', rbtableAPI.getChargeDefine);
Mock.mock(/\/table\/rateInfo/, 'get', rbtableAPI.getRateInfo);
Mock.mock(/\/table\/formShift/, 'get', rbtableAPI.getFormShift);
Mock.mock(/\/table\/accountingInfo/, 'get', rbtableAPI.getAccountingInfo);

// 登录相关
// Mock.mock(/\/login/, 'post', loginAPI.loginByUsername)
Mock.mock(/\/login/, 'post', loginAPI.login)

Mock.mock(/\/getProdListByClass/, 'post', prodTypeAPI.getProdType)


Mock.mock(/\/login\/logout/, 'post', loginAPI.logout)
Mock.mock(/\/user\/info\.*/, 'get', loginAPI.getUserInfo)

export default Mock;