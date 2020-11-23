import { getCatelist } from '../../util/axios'

const state = {
    cateList: []
}

const getters = {
    getCatelist(state) {
        return state.cateList
    }
}

const mutations = {
    REQ_CATELIST(state, payload) {
        state.cateList = payload
    }
}

const actions = {
    getCatelistActions({ commit }) {
        getCatelist({
            istree: true
        }).then(res => {
            if (res.data.code == 200) {
                commit('REQ_CATELIST', res.data.list)
            }
        }).catch(err => {
            console.log(err);
        })
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced: true
}