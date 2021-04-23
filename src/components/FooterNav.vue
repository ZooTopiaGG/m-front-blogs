<template>
  <footer :class="[{footers: true}]" v-show="GET_FOOTER_SHOW">
    <div class="second-box footer-design flex flex-v flex-align-center">
      <div>
        <span>CopyRight © 2017 &nbsp;&nbsp;FeRookie博客 &nbsp;&nbsp;Design by DengPeng</span>
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
  name: 'footernav',
  data() {
    return {
      activeIndex: '1'
    }
  },
  computed: {
    ...mapGetters(['GET_FOOTER_SHOW'])
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted() {
    sr.reveal(document.querySelectorAll('.second-box'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.footers {
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
.mail a {
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
.mail a:hover {
  background: #fff;
  color: #18aacf;
}
.link-group span {
  margin-bottom: 0.2rem;
  font-size: 14px;
}
.link-group a {
  color: #4c4c4c;
}
.link-group a:hover {
  color: #18aacf;
}
.f-box {
  margin-top: 0.1rem;
  text-align: center;
  line-height: 1.6;
}
.f-box p {
  margin: 0;
}
.mysite a {
  margin-right: 0.1rem;
}
.footer-design {
  font-size: 12px;
  background-color: rgba(85, 85, 85, 0.7);
  box-shadow: 0 0 5px rgba(85, 85, 85, 0.5);
  color: #fff;
  box-sizing: border-box;
  padding: 0.2rem 0;
}
.music {
  padding-bottom: 1.2rem;
}
</style>
