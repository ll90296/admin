import { getMemberlist } from '../../util/axios'

const state = {
    memberList: []
}

const getters = {
    getMemberlist() {
        return state.memberList
    }
}

const mutations = {
    REQ_MEMBER(state, payload) {
        state.memberList = payload
    }
}

const actions = {
    getMemberlistActions({ commit }) {
        getMemberlist().then(res => {
            if (res.data.code == 200) {
                commit('REQ_MEMBER', res.data.list)
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