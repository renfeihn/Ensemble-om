import request from '@/utils/request';
export function getInitData (params) {
    return request({
        url: '/init/initLoanData',
        method: 'get',
        params
    });
}