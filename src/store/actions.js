export default {
  'SHOW_NAV': ({ commit }) => {
    commit('SHOW_NAV')
  },
  'HIDE_NAV': ({ commit }) => {
    commit('HIDE_NAV')
  },
  'BG_SHOW_NAV': ({ commit }) => {
    commit('BG_SHOW_NAV')
  },
  'BG_HIDE_NAV': ({ commit }) => {
    commit('BG_HIDE_NAV')
  },
  'SHOW_FOOTER': ({ commit }) => {
    commit('BG_SHOW_FOOTER')
  },
  'HIDE_FOOTER': ({ commit }) => {
    commit('BG_HIDE_FOOTER')
  },
  'YET_LOGIN': ({ commit }, para) => {
    commit('YET_LOGIN', para)
  },
  'NO_LOGIN': ({ commit }, para) => {
    commit('NO_LOGIN', para)
  }
}
