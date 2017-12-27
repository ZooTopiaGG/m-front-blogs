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
  }
}
