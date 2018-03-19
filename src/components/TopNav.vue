<template>
  <div class="nav" v-show='GET_NAV_SHOW' :class="{ isHome: GET_IS_HOME }">
    <div class="menus flex flex-pack-around">
      <div class="logo">
        <router-link :to="{ name: 'home' }" class="navbars" style="margin-right: 0.2rem;">
          <icon name="home" scale="1.65" style="color:#fff; "></icon>
        </router-link>
      </div>
      <div class="list flex-1" >
        <div @click.stop="show1 = !show1" class="navbars" >
          <icon name="bars" scale="1.5" style="color:#fff;"></icon>
        </div>
        <el-collapse-transition>
          <div v-show="show1" class="list-cell transition-box">
            <ul class="menu">
              <li :class="{ active: $route.name === 'program' || $route.path.indexOf('articles/p') > -1}" @click="isshow1">
                <router-link :to="{ name: 'program' }">技术</router-link>
              </li>
              <li :class="{ active: $route.name === 'articles' || $route.path.indexOf('articles/a') > -1 }"  @click="isshow1">
                <router-link :to="{ name: 'articles' }">文章</router-link>
              </li>
              <li :class="{ active: $route.path === '/dynamic'}"  @click="isshow1">
                <router-link :to="{ name: 'dynamic' }">动态</router-link>
              </li>
              <li :class="{ active: $route.path === '/music'}"  @click="isshow1">
                <router-link :to="{ name: 'music' }">音乐</router-link>
              </li>
              <li :class="{ active: $route.path === '/info'}"  @click="isshow1">
                <router-link :to="{ name: 'info' }">关于我</router-link>
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
        <div class="info flex flex-align-center" @click="show = !show" style="margin-top: 0.14rem">
          <img v-if="GET_LOGIN_STATUS.avatar" :src="GET_LOGIN_STATUS.avatar" style="width: 0.6rem;height: 0.6rem;border-radius: 100%;">
          <img v-else src="../assets/images/signin.png">
        </div>
        <el-collapse-transition>
          <div v-show="show" class="showit transition-box">
              <ul class="item">
                <li class="setting flex flex-align-center" @click="toinfo"><icon name="cog" scale="1.4" style="color:#555; "></icon><span style="margin-left:0.2rem">站长信息</span></li>
                <li class="signout flex flex-align-center" @click="signout"><icon name="sign-out" scale="1.4" style="color:#555; "></icon><span style="margin-left:0.2rem">登出</span></li>
              </ul>
          </div>
        </el-collapse-transition>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import { mapGetters } from 'vuex'
export default {
  name: 'nav',
  components: {
    Icon
  },
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
    },
    toinfo () {
      this.show = false;
      this.$router.push({ name: 'info' })
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
  transition: all 0.4s;
  z-index: 9;
  padding-top: 0.2rem;
}
.nav.isHome{
  background: #3387A4;
  -webkit-transition: all .4s;
  padding-top: 0
}
.menus{
  padding-left: 0.2rem;
  padding-right: 0.2rem;
  margin: 0 auto;
  overflow: auto;
}
.logo{
  height: 0.9rem;
  overflow: hidden;
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
  width: 2.4rem;
  position: absolute;
  top: 0.9rem;
  right: 0.2rem;
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
  background: #3387A4;
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
.menu li.active{
  background: #3387A4;
}
.menu li.active a {
  color: #fff
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
  left: 1.3rem;
  margin-top: 0.2rem;
  top: 0.9rem;
}
.navbars {
  display: block; 
  width: 0.9rem; 
  height:0.9rem;
  box-sizing: border-box;
  padding-top: 0.2rem;
}
</style>
