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
  },
  'MUISC_PLAYED': ({ commit }) => {
    commit('MUISC_PLAYED')
  },
  'MUISC_NO_PLAY': ({ commit }) => {
    commit('MUISC_NO_PLAY')
  },
  'SEND_STAT': ({ commit }, para) => {
    commit('SEND_STAT', para)
  },
  'ALL_ALBUM': ({ commit }) => {
    commit('ALL_ALBUM')
  },
  'A_ALBUM': ({ commit }) => {
    commit('A_ALBUM')
  }
}
