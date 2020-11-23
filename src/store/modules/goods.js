import { getGoodslist, getgoodscount } from '../../util/axios'

const state = {
    goodsList: [],
    page: 1,
    size: 2,
    total: 0
}

const getters = {
    getgoodsList() {
        return state.goodsList
    },
    getgoodsSize() {
        return state.size
    },
    getgoodsCount() {
        return state.total
    }
}

const mutations = {
    REQ_GOODSLIST(state, payload) {
        state.goodsList = payload
    },
    REQ_GOODSPAGE(state, payload) {
        state.page = payload
    },
    REQ_GOODSCOUNT(state, payload) {
        state.total = payload
    }
}

const actions = {
    getgoodsListActions(context) {
        getGoodslist({
            page: context.state.page,
            size: context.state.size
        }).then(res => {
            if (res.data.code == 200) {
                context.commit('REQ_GOODSLIST', res.data.list)
                let data = res.data.list ? res.data.list : []
                if (context.state.page > 1 && data.length == 0) {
                    context.dispatch('getgoodsPageActions', context.state.page - 1)
                    context.dispatch('getgoodsListActions')
                }
            }
        })
    },
    getgoodsCountActions({ commit }) {
        getgoodscount().then(res => {
            if (res.data.code == 200) {
                commit('REQ_GOODSCOUNT', res.data.list[0].total)
            }
        })
    },
    getgoodsPageActions(context, payload) {
        console.log(payload);
        context.commit('REQ_GOODSPAGE', payload)
        context.dispatch('getgoodsListActions')
    }
}

export default {
    state,
    getters,
    mutations,
    actions,
    namespaced: true
}