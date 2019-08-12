import {
    param2Obj
} from '@/utils'
const userMap = {
    admin: {
        roles: ['admin'],
        token: 'admin',
        introduction: '我是超级管理员',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    para: {
        roles: ['para'],
        token: 'para',
        introduction: '我是编辑',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal para'
    }
}

export default {
    loginByUsername: config => {
        const {
            username
        } = JSON.parse(config.body)
        return userMap[username]
    },
    getUserInfo: config => {
        const {
            token
        } = param2Obj(config.url)
        if (userMap[token]) {
            return userMap[token]
        } else {
            return false
        }
    },
    logout: () => 'success',
    login: config => {
        let userId = "admin"
        let omUser={userLevel: 1}
        let para='{\"userId\": \"userId\", \"omUser\":\"omUser\"}'
        var data = {
            code: "000000",
            data: para
        }
        return data
    },
}