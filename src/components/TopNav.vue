<template>
  <div class="nav" v-show='GET_NAV_SHOW' :class="{ isHome: GET_IS_HOME }">
    <div class="menus flex flex-pack-around">
      <div class="logo">
        <router-link :to="{ name: 'home' }">
          <span></span>
        </router-link>
      </div>
      <div class="list flex-1" @click.stop="show1 = !show1">
        <!-- <router-link :to="{ name: 'home' }">
          <span></span>
        </router-link> -->
        <div style="width: 0.52rem; margin-left: 0.6rem;">
          <span></span>
        </div>
        <el-collapse-transition>
          <div v-show="show1" class="list-cell transition-box">
            <ul class="menu">
              <li :class="{ active: $route.name === 'program' || $route.path.indexOf('articles/p') > -1}">
                <router-link :to="{ name: 'program' }">技术</router-link>
              </li>
              <li :class="{ active: $route.name === 'articles' || $route.path.indexOf('articles/a') > -1 }">
                <router-link :to="{ name: 'articles' }">文章</router-link>
              </li>
              <li :class="{ active: $route.path === '/dynamic'}">
                <router-link :to="{ name: 'dynamic' }">动态</router-link>
              </li>
              <li :class="{ active: $route.path === '/music'}">
                <router-link :to="{ name: 'music' }">音乐</router-link>
              </li>
            </ul>
          </div>
        </el-collapse-transition>
      </div>
      <div class="sign" v-if="!GET_LOGIN_STATUS">
        <router-link :to="{ name: 'signin' }">登录</router-link>
        /
        <router-link :to="{ name: 'signup' }">注册</router-link>
      </div>
      <div class="sign" v-else>
        <div class="info flex flex-align-center" @click="show = !show">
          <img v-if="GET_LOGIN_STATUS.avatar" :src="GET_LOGIN_STATUS.avatar" style="margin-right: 0.1rem;width: 0.6rem;height: 0.6rem;border-radius: 100%;">
          <img v-else src="../assets/images/signin.png" style="margin-right: 5px">
          <span>{{ GET_LOGIN_STATUS.name }}</span>
        </div>
        <el-collapse-transition>
          <div v-show="show" class="showit transition-box">
              <ul class="item">
                <li class="setting flex flex-align-center" @click="toinfo"><i></i>个人资料</li>
                <li class="signout flex flex-align-center" @click="signout"><i></i>登出</li>
              </ul>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'nav',
  data() {
    return {
      activeIndex: '1',
      show: false,
      show1: false,
      res: {}
    };
  },
  computed: {
    ...mapGetters ([
      'GET_NAV_SHOW',
      'GET_IS_HOME',
      'GET_LOGIN_STATUS'
    ])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    signout () {
      window.localStorage.clear();
      this.show = false;
      this.$store.dispatch('NO_LOGIN', null)
    },
    isshow1 () {
      this.show1 = false
      alert(this.show1)
    },
    toinfo () {
      this.show = false;
      this.$router.push({ name: 'info', params: { userid: this.GET_LOGIN_STATUS.id } })
    }
  },
  mounted () {
    // document.body.on('click', function () {
    //   this.show1 = false
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.nav{
  height: 0.9rem;
  position: fixed;
  top: 0;
  background: rgba(0,0,0,0);
  width: 100%;
  transition: all 0.45s;
  z-index: 9;
  padding-top: 0.25rem;
}
.nav.isHome{
  background: #18aacf;
  -webkit-transition: all .4s;
  padding-top: 0
}
.menus{
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  margin: 0 auto;
  overflow: auto;
}
.logo{
  height: 0.9rem;
  overflow: hidden;
}
.logo span, .list span{
  display: inline-block;
  width: 26px;
  height: 26px;
  margin-top:0.14rem;
  background: url(../assets/images/home.png) no-repeat;
  background-size: cover;
}
.list span{
  background: url(../assets/images/list.png) no-repeat;
  background-size: cover;
  margin-top: 0.18rem;
}
.sign {
  font-size: 16px;
  line-height: 0.9rem;
  height: 0.90rem;
}
.sign {
  min-width: 1.0rem;
  text-align: center;
  cursor: pointer;
}
.showit{
  box-shadow: 1px 1px 10px 1px #CCC;
  -webkit-box-shadow: 1px 1px 10px 1px #CCC;
  -moz-box-shadow: 1px 1px 10px 1px #CCC;
  border-bottom-color: red;
  color: #4c4c4c;
  margin-top: 0.2rem; 
  width: 2.0rem;
  position: absolute;
  top: 0.9rem;
  right: 0.4rem;
  z-index:99;
  background: #fff;
  text-align: left;
  font-size: 14px;
  line-height: 0.9rem;
}
.item li {
  transition: all 0.3s;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  padding-left: 0.3rem;
}
.item li:hover, .menu li:hover {
  background: #18aacf;
  color: #fff;
  /*height: 40px;*/
}
.menu li:hover a {
  color: #fff;
}
.item li i {
  width: 0.24rem;
  height: 0.24rem;
  margin-right: 0.1rem;
}
.setting i {
  background: url(../assets/images/sz.png) no-repeat;
  background-size: cover 
}
.signout i {
  background: url(../assets/images/signout.png) no-repeat;
  background-size: cover 
}
.item li.setting:hover i{
  background: url(../assets/images/sz2.png) no-repeat;
  background-size: cover 
}
.item li.signout:hover i{
  background: url(../assets/images/signout2.png) no-repeat;
  background-size: cover 
}
.menu {
  font-size: 14px;
  line-height: 0.9rem;
}
.menu li {
  padding: 0 0.3rem;
}
.menu li a {
  height: 0.88rem;
  transition: all 0.45s;
  color: #4c4c4c;
  display: block;
  width: 100%;
  height: 100%;
}
.menu li:hover a{
  /*font-size: 18px;
  font-weight: bold;*/
  border-bottom: 1px solid #fff;
}
.menu li.active{
  background: #13afff;
}
.sign, .sign a {
  color: #fff;
}
.sign {
  margin-left: 0.5rem; 
}
.signin{
  float: right;
}
.signup{
  float: right;
}
.list-cell {
  position: absolute;
  box-shadow: 1px 1px 10px 1px #CCC;
  -webkit-box-shadow: 1px 1px 10px 1px #CCC;
  -moz-box-shadow: 1px 1px 10px 1px #CCC;
  border-bottom-color: red;
  color: #4c4c4c;
  background: #fff;
  width: 3.2rem;
  left: 1.6rem;
  margin-top: 0.2rem;
  top: 0.9rem;
}
</style>
