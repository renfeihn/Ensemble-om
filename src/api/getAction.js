import request from '@/utils/request';

export function getSpringBoot (params) {
  return request({
    url: '127.0.0.1:8004',
    method: 'get',
    params
  });
}
