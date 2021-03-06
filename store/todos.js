export const state = () => ({
  list: [],
  item: {}
})

export const getters = {
  list(state) {
    return state.list
  },
  item(state) {
    return state.item
  }
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
  async getList({ commit }) {
    const { data } = await this.$axios.get(`api/todos`)

    commit('setList', data.data)
  },
  async getItem({ commit }, id) {
    const { data } = await this.$axios.get(`api/todos/${id}`)
    commit('setItem', data.data)
  }
}
