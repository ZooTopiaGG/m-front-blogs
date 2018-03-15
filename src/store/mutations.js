export default {
  'HIDE_NAV': (state) => {
    state.navShow = false
  },
  'SHOW_NAV': (state) => {
    state.navShow = true
  },
  'BG_HIDE_NAV': (state) => {
    state.isHome = false
  },
  'BG_SHOW_NAV': (state) => {
    state.isHome = true
  },
  'HIDE_FOOTER': (state) => {
    state.footerShow = false
  },
  'SHOW_FOOTER': (state) => {
    state.footerShow = true
  },
  'YET_LOGIN': (state, para) => {
    state.isLogin = para
  },
  'NO_LOGIN': (state, para) => {
    state.isLogin = para
  },
  'MUISC_PLAYED': (state) => {
    state.isPlay = true
  },
  'MUISC_NO_PLAY': (state) => {
    state.isPlay = false
  },
  'SEND_STAT': (state, para) => {
    state.getStat = para
  },
  'ALL_ALBUM': (state) => {
    state.toAllAlbum = true
  },
  'A_ALBUM': (state) => {
    state.toAllAlbum = false
  }
}
