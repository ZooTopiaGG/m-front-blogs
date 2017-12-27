<template>
  <footer class="footer" v-show="GET_FOOTER_SHOW">
    <div class="second-box ">
      <div class="mail"><span>分享好的资料、项目等给我，不胜感激！</span><a href="mailto:1181050123@qq.com" class="mailto">邮来邮去</a></div>
    </div>
    <div class="second-box ">
      <div class=" link-group flex flex-v  flex-align-center">
        <span>
          <span style="margin-right:0.2rem">2017 © DENGPENG'HOUSE 版权所有</span>
        </span>
        <span><a href="http://www.miitbeian.gov.cn" target="_blank">蜀ICP备17041201号</a></span>
        <span>平台支持：<a href="http://www.lawyer-center.com" target="_blank"><img width="28px" style="margin-right: 5px;vertical-align: -9px;" src="https://weixin.lawyer-says.com/images/common/logo.png" alt="律师说">律师说</a></span>
        <span class="mysite flex flex-pack-around"><a href="https://github.com/ZooTopiaGG" alt="github" target="_blank"><img src="../assets/images/github.png" alt="github"></a> 
        <a href="https://www.linkedin.com/in/%E9%B9%8F-%E9%82%93-a23169144/" target="_blank"><img src="../assets/images/in.png" alt="领英"></a>
        <a href="mailto:1181050123@qq.com" target="_blank"><img src="../assets/images/email.png" alt="邮箱"></a>
        <a href="http://www.jianshu.com/u/b7cc32782554" target="_blank"><img src="../assets/images/jianshu.png" alt="简书"></a>
        <a href="https://weibo.com/u/5111513792?refer_flag=1001030201_" target="_blank"><img src="../assets/images/weibo.png" alt="微博"></a>
      </span>
      </div>
      <div class="f-box">
        <p>该网站初创于2017年11月17日，属于个人独立开发。如有雷同，不是巧合，欢迎各位大神，给予批评和建议。谢谢大家！</p>
        <p>本网站以阿里云服务器，Node作为后台，Vue作为前端，统一开发</p>
      </div>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'footer',
  data() {
    return {
      activeIndex: '1'
    };
  },
  computed: {
    ...mapGetters ([
      'GET_FOOTER_SHOW'
    ])
  },
  // 路由监听
  // watch: {
  //   '$route':  (to, from, next) => {
  //     console.log(to)
  //   }
  // },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },

  },
  mounted () {
    sr.reveal(document.querySelectorAll('.second-box'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footer{
  padding-top: 0.35rem;
}
.mail {
  text-align: center;
  height: 1.6rem;
  margin: 0.2rem 0 0.4rem;
  background: #18aacf;
  color: #fff;
  font-size: 16px;
  padding: 0.1rem 0;
}
.mail  a {
  border: 1px solid #fff;
  transition: all 0.45s;
  color: #fff;
  font-size: 12px;
  width: 1.5rem;
  display: block;
  line-height: 0.6rem;
  height: 0.6rem;
  margin: 0.2rem auto 0;
}
.mail a:hover{
  background: #fff;
  color: #18aacf;
}
.link-group span{
  margin-bottom: 0.2rem;
  font-size: 14px;
}
.link-group a {
  color: #4c4c4c;
}
.link-group a:hover {
  color: #18aacf;
}
.f-box{
  width: 90%;
  margin: 0.3rem auto;
  font-size: 13px;
  text-align: justify;
}
.mysite{
  width: 100%;
}
</style>
