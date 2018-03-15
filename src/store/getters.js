export default {
  'GET_NAV_SHOW': (state) => {
    return state.navShow
  },
  'GET_IS_HOME': (state) => {
    return state.isHome
  },
  'GET_FOOTER_SHOW': (state) => {
    return state.footerShow
  },
  'GET_LOGIN_STATUS': (state) => {
    return state.isLogin
  },
  'GET_PLAY_STATUS': (state) => {
    return state.isPlay
  },
  'GET_STAT': (state) => {
    return state.getStat
  },
  'GET_TO_ALBUM': (state) => {
    return state.toAllAlbum
  }
}
