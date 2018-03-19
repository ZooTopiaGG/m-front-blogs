<template>
  <div class="body" :style="{'background-image': bmg}">
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
      totop: false,
      background:[
        'http://wallpaper.55lover.com/image/wallpaper/bg1.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg2.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg3.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg7.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/bg4.jpg',
        'http://wallpaper.55lover.com/image/wallpaper/201803071503.jpg'
      ]
    }
  },
  components: {
    TopNav,
    FooterNav
  },
  computed: {
    bmg () {
      let round = Math.floor(Math.random() * this.background.length)
      return `url(${this.background[round]})`
    }
  },
  methods: {
    handleScroll (e) {
      let s = document.querySelector('.s-left')
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
    },
    getStatistics () {
      axios.get('/api/getStatistics')
      .then(res => {
        // console.log(res.data.result)
        this.$store.commit('SEND_STAT', res.data.result)
      })
      .catch(err => {})
    },
  },
  mounted () {
    this.getStatistics()
    sr.reveal('.second-box');
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
  .block .el-pagination__total,.block .el-pagination__jump{
    color: #fff
  }
  .body{
    /*background: #e9ecd7 url(http://wallpaper.55lover.com/image/wallpaper/bg1.jpg);*/
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50% 50%;
  }
  body{
    color: #444;
    font-size: 14px;
    line-height: 1.7;
  }
  .main{
    padding-top: 1.15rem;
    width: 100%;
    box-sizing: border-box;
    margin: 0 auto;
    overflow: hidden;
  }
  .title, .center-title{
    padding: 0.1rem 0.2rem;
    font-size: 16px;
    color: #444;
    background-color: rgba(255,255,255,0.5);
    margin-bottom: 0.2rem;
    margin-top: 0.2rem;
  }
  .title-label {
    font-size: 12px;
    color: #666;
  }
  .title-text{
    margin: 0 0.1rem;
  }
  .bgpadding{
    padding: 0.2rem;
  }
  .editormd-html-preview, .editormd-preview-container{
    font-size: 16px;
  }
  #doc-content {
    font-size: 16px;
  }
  #doc-content pre{
    display: block;
    margin: 0 0 10px;
    border: 1px solid #ccc;
    padding: 15px;
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
  #doc-content img{
    width: 100%
  }
  /*调整*/
/*  .right-content{
    width: 27.5%;
    min-width: 320px;
    margin-left: 20px;
  }*/
  .box{
    box-sizing: border-box;
  }
  .bgbox{
    background: rgba(255,255,255,0.5);
    box-sizing: border-box;
    /*margin-bottom: 0.15rem;*/
    box-shadow: 0 0 1px #18aacf;
    -webkit-box-shadow: 0 0 1px #18aacf;
    -moz-box-shadow: 0 0 1px #18aacf;
  }
  .page {
    text-align: right;
    margin-top: 0.6rem
  }
  .article-list{
    padding: 0.2rem;
  }
  .article-list:hover{
    -webkit-box-shadow: 1px 1px 10px 2px #CCC;
    -moz-box-shadow: 1px 1px 10px 2px #CCC;
    -webkit-transition: all .4s;
    border-color: red;
  }
  .article-list:last-child{
    margin-bottom: 0.4rem;
  }
  .imgbox{
    font-size: 0;
    min-width: 2.5rem;
    height: 1.5rem;
  }
  .imgbox img{
    width: 2.5rem;
    height: 1.5rem;
    border: 1px solid #ddd
  }
  .art-title{
    font-size: 15px;
    margin-bottom: 0.1rem;
    max-height: 1.0rem;
    overflow: hidden;
  }
  .art-right{
    margin-right: 0.2rem;
    min-height: 1.3rem;
  }
  .art-title a,.art-right a {
    color: #3387A4
  }
  .art-title a:hover,.art-right a:hover{
    text-decoration: underline;
  }
  .author-info {
    font-size: 12px;
    /*margin-top: 10px; */
    color: #555
  }
  .desc{
    font-size: 13px;
    line-height: 1.5;
    text-align: justify;
    margin-bottom: 0.1rem;
    margin-top: 0.2rem;
  }
  .look{
    margin-top: 0.1rem;
  }
  .column-name{
    padding: 0.05rem 0.08rem;
    background-color: #3387A4;
    border-radius: 0.06rem;
    font-size: 12px;
  }
  .column-name a {
    color: #fff
  }
  .create-time{
    margin-right: 0.2rem;
  }
  .icon-label{
    margin-right: 0.1rem;
  }
</style>

<style>
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
</style>