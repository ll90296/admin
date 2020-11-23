import { getUserlist, getUsercount } from '../../util/axios/index'

const state = {
    userList: [],
    size: 2,
    page: 1,
    total: 0
}

const getters = {
    getUserlist() {
        return state.userList
    },
    getUsercount() {
        return state.total
    },
    getUsersize() {
        return state.size
    }
}

const mutations = {
    REQ_USERLIST(state, payload) {
        state.userList = payload
    },
    REQ_USERCOUNT(state, payload) {
        state.total = payload
    },
    REQ_USERPAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    getUserlistActions(context) {
        getUserlist({
            size: context.state.size,
            page: context.state.page
        }).then(res => {
            if (res.data.code == 200) {
                context.commit('REQ_USERLIST', res.data.list)
                let data = res.data.list ? res.data.list : []
                if (context.state.page > 1 && data.length == 0) {
                    context.dispatch('getUserpageActions', context.state.page - 1)
                    context.dispatch('getUserlistActions')
                }
            }
        }).catch(err => {
            console.log(err);
        })
    },
    getUsercountActions({ commit }) {
        getUsercount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_USERCOUNT', res.data.list[0].total)
            }
        })
    },
    getUserpageActions(context, payload) {
        context.commit('REQ_USERPAGE', payload)
        context.dispatch('getUserlistActions')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}