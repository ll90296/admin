import { getBannerlist } from '../../util/axios'

const state = {
    bannerList: []
}

const getters = {
    getBannerlist(state) {
        return state.bannerList
    }
}

const mutations = {
    REQ_BANNERLIST(state, payload) {
        state.bannerList = payload
    }
}

const actions = {
    getBannerlistActions({ commit }) {
        getBannerlist().then(res => {
            if (res.data.code == 200) {
                commit('REQ_BANNERLIST', res.data.list)
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