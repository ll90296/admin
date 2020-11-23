import { getMenulist } from '@/util/axios/index'

const state = {
    menuList: []
}

const getters = {
    getMenulist(state) {
        return state.menuList
    }
}

const mutations = {
    MENU_LIST(state, payload) {
        state.menuList = payload
    }
}

const actions = {
    getmenulistActions({ commit }) {
        getMenulist({
            istree: true
        }).then(res => {
            if (res.data.code == 200) {
                commit('MENU_LIST', res.data.list)
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