export const state = () => ({
  text: '',
  color: '',
})

export const mutations = {
  SHOW_MESSAGE(state, payload) {
    state.text = payload.text
    state.color = payload.color
  },
}

export const actions = {
  showSnack({ commit }, payload) {
    commit('SHOW_MESSAGE', payload)
  },
}
