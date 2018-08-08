import Mock from 'mockjs';
import prodAPI from './prod';
import tableAPI from './table';
import initAPI from './init';
import dataAPI from './data';
import prodTypeAPI from './prodType';
import prodClassAPI from './prodClass'
// Mock.setup({
//   timeout: '350-600'
// })
// 表格相关
Mock.mock(/\/table\/list/, 'get', tableAPI.getList);
// 登录相关
Mock.mock(/\/prod\/info\.*/, 'get', prodAPI.getProd);
Mock.mock(/\/prod\/deposit\.*/, 'get', prodAPI.getDepositProd);
Mock.mock(/\/prod\/dtlDeposit\.*/, 'get', prodAPI.getDepositDtl);
Mock.mock(/\/prod\/getDiffProd\.*/, 'get', prodAPI.getDiffProd);
Mock.mock(/\/prod\/getDiffList\.*/, 'get', prodAPI.getDiffList);
Mock.mock(/\/prod\/prodList\.*/, 'get', prodAPI.getProdList);
Mock.mock(/\/data\/info\.*/, 'get', dataAPI.getProdData);
Mock.mock(/\/data\/info\.*/, 'get1', dataAPI.getProdData1);
Mock.mock(/\/data\/info\.*/, 'null', dataAPI.getProdDataNull);
Mock.mock(/\/prod\/towDeposit\.*/, 'get', prodAPI.depositTwo);
Mock.mock(/\/init\/initRefData\.*/, 'get', initAPI.getInitData);
Mock.mock(/\/prod\/getProdType\.*/, 'get', prodTypeAPI.getProdType);
Mock.mock(/\/prod\/prodClass\.*/, 'get', prodClassAPI.getProdClass);


export default Mock;
