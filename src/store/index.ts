import { createStore } from 'vuex'

export default createStore({
  state: {
    cards: [Object]
  },
  mutations: {
    initialSet (state, payload) {
      state.cards = payload
    },
    addCard (state, payload) {
      state.cards.push(payload)
    },
    updateCard (state, payload) {
      state.cards[payload.index] = payload.card
    },
    cancelCard (state, payload) {
      state.cards.splice(payload.index, 1);
    }
  },
  actions: {
    initialSet ({ commit }, payload) {
      commit('initialSet', payload)
    },
    addCard ({ commit }, payload) {
      commit('addCard', payload)
    },
    updateCard ({ commit }, payload) {
      commit('updateCard', payload)
    },
    cancelCard ({ commit }, payload) {
      commit('cancelCard', payload)
    }
  },
  getters: {
    getCards: state => {
      return state.cards
    }
  }
})
