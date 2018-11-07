/**
 * Created by ligan on 2018/11/7.
 */

const prodInfo = {
    state: {
        prodType: '',
        prodDesc: ''
    },
    mutations: {
        SET_PROD_TYPE: (state, prodType) => {
            state.prodType = prodType
        },
        SET_PROD_DESC: (state, prodDesc) => {
            state.prodDesc = prodDesc
        }
    },
    actions: {
        setProdType: ({ commit }, prodType) => {
            commit('SET_PROD_TYPE', prodType)
        },
        setProdDesc: ({ commit }, prodDesc) => {
            commit('SET_PROD_DESC', prodDesc)
        }
    }
}

export default prodInfo
