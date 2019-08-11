
export const state = () => ({
    list: [],
    item: {}
})

export const getters = {
    list (state) {
        return state.list
    },
    item (state) {
        return state.item
    },
}

export const mutations = {
    setList: (state, data) => {
        state.list = data
    },
    setItem: (state, data) => {
        state.item = data
    }
}

export const actions = {
    async getList ({commit}) {
        let {data} = await this.$axios.get(`api/rooms`)

        commit('setList', data.data)
    },
    async getItem ({commit}, id) {
        let {data} = await this.$axios.get(`api/rooms/${id}`)
        commit('setItem', data.data)
    },
}