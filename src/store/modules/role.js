import { getRolelist } from '../../util/axios'

const state = {
    roleList: []
}

const getters = {
    getRolelist(state) {
        return state.roleList
    }
}

const mutations = {
    ROLE_LIST(state, payload) {
        state.roleList = payload
    }
}

const actions = {
    getRoleListActions({ commit }) {
        getRolelist().then(res => {
            if (res.data.code == 200) {
                commit('ROLE_LIST', res.data.list)
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