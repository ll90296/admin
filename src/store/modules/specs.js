import { getSpecslist, getSpecscount } from '../../util/axios'

const state = {
    specsList: [],
    page: 1,
    size: 2,
    total: 0
}

const getters = {
    getSpecslist() {
        return state.specsList
    },
    getSpecscount() {
        return state.total
    },
    getSpecssize() {
        return state.size
    }
}

const mutations = {
    REQ_SPECS(state, payload) {
        state.specsList = payload
    },
    REQ_SPECSCOUNT(state, payload) {
        state.total = payload
    },
    REQ_SPECSPAGE(state, payload) {
        state.page = payload
    }
}

const actions = {
    getSpecslistActions(context) {
        getSpecslist({
            page: context.state.page,
            size: context.state.size
        }).then(res => {
            if (res.data.code == 200) {
                context.commit('REQ_SPECS', res.data.list)
                let data = res.data.list ? res.data.list : []
                if (context.state.page > 1 && data.length == 0) {
                    context.dispatch('getSpecsPageActions', context.state.page - 1)
                    context.dispatch('getSpecslistActions')
                }
            }
        })
    },
    getSpecscountActions({ commit }) {
        getSpecscount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_SPECSCOUNT', res.data.list[0].total)
            }
        })
    },
    getSpecsPageActions(context, payload) {
        context.commit('REQ_SPECSPAGE', payload)
        context.dispatch('getSpecslistActions')
    }
}


export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}