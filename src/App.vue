<template>
  <div id="app">
    <top-nav></top-nav>
    <div class="main">
      <keep-alive v-if="$route.meta.keepAlive">
        <router-view></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <footer-nav></footer-nav>
    <div class="top" @click='backtotop' v-show="totop">
      <img src="./assets/images/top-arrow.png" alt="top">
    </div>
  </div>
</template>

<script>
import TopNav from '@/components/TopNav'
import FooterNav from '@/components/FooterNav'
export default {
  name: 'app',
  data () {
    return {
      scrolled: false,
      totop: false
    }
  },
  components: {
    TopNav,
    FooterNav
  },
  methods: {
    handleScroll (e) {
      let s = document.querySelector('.s-left')
      // console.log(`offsetTop:${s.offsetTop}`)
      // // 网页正文全文高
      // console.log(`documentHeignt:${document.body.scrollHeight}`)
      // // 网页被卷去的高
      // console.log(`scrollTop:${document.body.scrollTop}`)
      // console.log(`Height:${s.clientHeight}`)
      if (this.$route.name == 'home') {
        // console.log(window.scrollY)
        if(window.scrollY >= 100){
          this.$store.commit('BG_SHOW_NAV')
        } else {
          this.$store.commit('BG_HIDE_NAV')
        }
      } else {
        this.$store.commit('BG_SHOW_NAV')
      }
      if (window.scrollY >= 1000) {
        this.totop = true
      } else {
        this.totop = false
      }
    },
    backtotop () {
        var timer = setInterval(() => {
          let h = document.documentElement.scrollTop || document.body.scrollTop;
          let nowH = h
          var speed = (0 - nowH) / 5;                     // 随着高度减速  
          speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);  
          if (h === 0) {                          //当前高度为零,停止这次计时器  
            clearInterval(timer);                             // C1  
          }
          document.documentElement.scrollTop = h + speed
          document.body.scrollTop = h + speed
        }, 30)
    }
  },
  mounted () {
    // sr.reveal('.second-box');
    this.$nextTick ( () => {
      window.addEventListener('scroll', this.handleScroll)
    })
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>
<style>
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}*/
body{
  color: #4c4c4c;
  font-size: 18px;
  line-height: 1.7;
  -webkit-font-smoothing: antialiased;
}
.title, .details-title{
  padding: 0.4rem 0.3rem;
  font-size: 20px;
  color: #333;
  line-height: 1.6
}
.editormd-html-preview, .editormd-preview-container{
  font-size: 16px;
}
.top {
  position: fixed;
  right: 0.4rem;
  bottom: 0.8rem;
  cursor: pointer;
}
.adetails {
  overflow-x: auto; 
}
.adetails img {
  max-width: 100%;
  width:100%;
}
#doc-content {
  font-size: 16px;
}
#doc-content pre{ 
  display: block;
  border: 1px solid #ccc;
  margin-bottom: 0.2rem;
  padding: 0.2rem;
  font-size: 13px;
  word-wrap: normal;
  word-break: break-word!important;
  word-break: break-all;
  white-space: pre;
  overflow: auto;
  border-radius: 0;
  background: #f6f6f6;
  color: #657b83;
}
</style>
