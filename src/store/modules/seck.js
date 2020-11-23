import { getSecklist } from '../../util/axios'

const state = {
    seckList: []
}

const getters = {
    getSecklist() {
        return state.seckList
    }
}

const mutations = {
    REQ_SECKLIST(state, payload) {
        state.seckList = payload
    }
}

const actions = {
    getSecklistActions({ commit }) {
        getSecklist().then(res => {
            if (res.data.code == 200) {
                commit('REQ_SECKLIST', res.data.list)
            }
        })
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}