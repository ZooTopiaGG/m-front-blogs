<template>
  <aside class="aside">
     <!-- 右一 技术标签 -->
    <div>
      <div class="title flex flex-align-center">
        <icon name="heart" scale="1.2" style="color:#3387A4"></icon>
        <span class="title-text">关注我</span>
        <span class="title-label">Focus me</span>
      </div>
      <div class="flex focus-icon flex-pack-justify box bgbox bgpadding">
        <div class="flex flex-v flex-align-center">
          <a href="https://github.com/ZooTopiaGG" title="github" target="_blank" class="github flex flex-align-center flex-pack-center" style="background-color: #0078D7">
            <icon name="github" scale="1.6" style="color:#fff"></icon>
          </a>
          <span class="focus-label">GitHub</span>
        </div>
        <div class="flex flex-v flex-align-center">
          <a href="http://www.jianshu.com/u/b7cc32782554" title="简书" target="_blank" class="jianshu flex flex-align-center flex-pack-center" style="background-color: #07BF44">
            <icon name="envelope" scale="1.6" style="color:#fff"></icon>
          </a>
          <span class="focus-label">简书</span>
        </div>
        <div class="flex flex-v flex-align-center">
          <a href="https://www.linkedin.com/in/%E9%B9%8F-%E9%82%93-a23169144/" title="领英" target="_blank" class="linkin flex flex-align-center flex-pack-center" style="background-color: #0073AE">
            <icon name="linkedin" scale="1.6" style="color:#fff"></icon>
          </a>
          <span class="focus-label">领英</span>
         </div>
        <div class="flex flex-v flex-align-center">
          <a href="https://weibo.com/u/5111513792?refer_flag=1001030201_" title="微博" target="_blank" class="weibo flex flex-align-center flex-pack-center" style="background-color:#FF8245;">
            <icon name="weibo" scale="1.6" style="color:#fff"></icon>
          </a>
          <span class="focus-label">微博</span>
        </div>
      </div>
    </div>
    <!-- 右二 网站信息 -->
    <div>
      <div class="title flex flex-align-center">
        <icon name="cloud" scale="1.2" style="color:#3387A4"></icon>
        <span class="title-text">网站信息</span>
        <span class="title-label">Website information</span>
      </div>
      <div class="flex flex-v flex-align-center website-info box bgbox bgpadding">
        <img class="avatar website-avatar" src="../assets/images/23115938.jpg" alt="avatar">
        <div class="fb-title">
          邓鹏
        </div>
        <div class="desc">
          只会写代码的<span style="font-weight: bold">狭义</span>全栈
        </div>
        <div class="statistics flex flex-align-center flex-pack-justify">
          <div class="flex flex-v flex-align-center">
            <span class="all-num">{{GET_STAT.article_num}}</span>
            <p>总文章数</p>
          </div>
          <div class="line"></div>
          <div class="flex flex-v flex-align-center">
            <span class="all-num">{{GET_STAT.today_pv}}</span>
            <p>今日访问数</p>
          </div>
          <div class="line"></div>
          <div class="flex flex-v flex-align-center">
            <span class="all-num">{{GET_STAT.visitor_num}}</span>
            <p>总访问数</p>
          </div>
        </div>
      </div>
    </div> 
    <!-- 右一 技术标签 -->
    <div>
      <div class="title flex flex-align-center">
        <icon name="tags" scale="1.2" style="color:#3387A4"></icon>
        <span class="title-text">技术标签</span>
        <span class="title-label">Technical label</span>
      </div>
      <div class="flex label-group box bgbox bgpadding">
        <a href="javascript:;" v-for="(item, index) in labelres" :key="index" :style="{background: item.backgroundColor}">{{ item.name }}({{item.num}})</a>
      </div>
    </div>
    <!-- 右三 最新动态 -->
    <div>
      <div class="title flex flex-align-center">
        <icon name="bookmark" scale="1.2" style="color:#3387A4"></icon>
        <span class="title-text">最新动态</span>
        <span class="title-label">Latest news</span>
      </div>
      <div class="flex label-group news-group box bgbox bgpadding">
        <div class="news flex flex-align-center" v-for="(item, index) in latestnews" :key="index">
          <icon :name="item.icontype" scale="1.0" style="color:rgb(243, 105, 67);width:16px;"></icon>
          <span class="news-author">{{item.author}}</span>
          <span class="news-time">{{item.time}}</span> 
          <span class="news-text">{{item.operation}}了</span> 
          <router-link v-if="item.types == '文章'" :to="{ name: 'adetails', params: { articleid: item.latestid, type: 'a' } }" class="types" style="background-color: rgb(0, 168, 250)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '技术'" :to="{ name: 'adetails', params: { articleid: item.latestid, type: 'p' } }" class="types" style="background-color: rgb(123, 104, 238)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '动态'" :to="{ name: 'dynamic' }" class="types" style="background-color: rgb(60, 179, 113)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '音乐'" :to="{ name: 'music' }" class="types" style="background-color: rgb(123, 104, 238)">{{item.types}}</router-link>
          <router-link v-else-if="item.types == '相册'" :to="{ name: 'albums' }" class="types" style="background-color: rgb(218, 112, 214)">{{item.types}}</router-link>
          <a v-else href="javascript:;"  class="types" style="background-color: rgb(200, 200, 171)">{{item.types}}</a>
        </div>
      </div>
    </div>
    <!-- 右四 工作经历 -->
    <div class="job">
       <div class="title flex flex-align-center">
          <icon name="briefcase" scale="1.2" style="color:#3387A4"></icon>
          <span class="title-text">工作经历</span>
          <span class="title-label">Work experience</span>
        </div>
      <div class="con box bgbox bgpadding">
        我是2016年毕业的本科生，我从2016年3月初就开始工作，第一家公司是在四川成都的四凯科技有限公司实习，工作了2个月，负责简单页面的开发。然后同年4月末去了第二家公司九益恒泰科技有限公司，工作到至今，从开始负责web前端开发，完成了公司的任务；到后来负责前端工作安排、管理，分配组员具体的任务分工，解决疑难，优化性能以及开始时间评估，后期负责维护版本迭代，提高界面的用户体验；最后在空余的时间进行自学新的前端技术等。
      </div>
      <div class="second-box">
        <img class='maps' src="../assets/images/maps.png">
      </div>
    </div>
    <!-- 右五 关于我 -->
    <div class="about">
      <div class="title flex flex-align-center">
          <icon name="user-secret" scale="1.2" style="color:#3387A4"></icon>
          <span class="title-text">站长简介</span>
          <span class="title-label">Webmaster profile</span>
        </div>
      <div class="flex flex-v flex-align-center box bgbox bgpadding">
        <div>
          <img class="avatar" src="../assets/images/23115938.jpg" alt="avatar">
        </div>
        <div class="con">
          大家好！我是邓鹏，从事于前端开发，NodeJs开发，這是我的个人博客，工作到目前已经两年了，我非常开心能从事這个行业，因为在這里我找到了每天的充实感以及成就感！所以我做了自己的个人博客，我也在不断的设计不断的更新，尽量做到最好。我很爱這份职业，我相信我会坚持把博客做好，博客里面包含丰富的信息，有法律新闻，技术文章，站长动态，留言板，站长音乐，站长信息等。
        </div>
        <div>
          涉及的技术栈：Html5+Css3+Vue2+NodeJS+Koa2+MySQL+Nginx，感谢七牛云存储帮我解决了大量图片的问题。
        </div>
        <div class="flex flex-v flex-align-center mail">
          <span>欢迎来交流，学习！如果您有更好的资料，可以通过邮箱分享给我</span>
          <a href="mailto:1181050123@qq.com" class="mailto">邮来邮去</a>
        </div>
      </div>
    </div>
  </aside>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import { mapGetters } from 'vuex'
export default {
  name: 'navs',
  components: {
    Icon
  },
  data() {
    return {
      activeIndex: '1',
      show: false,
      res: {},
      labelres: [
        {
          name: 'css3',
          num: 3,
          backgroundColor: '#da70d6'
        },
        {
          name: 'html5',
          num: 1,
          backgroundColor: '#efc95e'
        },
        {
          name: 'javascript',
          num: 1,
          backgroundColor: '#7b68ee'
        },
        {
          name: 'vuejs',
          num: 3,
          backgroundColor: '#3cb371'
        },
        {
          name: 'es6',
          num: 1,
          backgroundColor: '#7b68ee'
        },
        {
          name: 'reactjs',
          num: 0,
          backgroundColor: '#00A8FA'
        },
        {
          name: 'nodejs',
          num: 2,
          backgroundColor: '#f36943'
        },
        {
          name: 'python',
          num: 10,
          backgroundColor: '#ff4762'
        },
        {
          name: 'mysql',
          num: 1,
          backgroundColor: '#c8c8ab'
        },
        {
          name: 'nginx',
          num: 5,
          backgroundColor: '#3cb371'
        },
        {
          name: '法律知识',
          num: 15,
          backgroundColor: '#ff4762'
        },
      ],
      newsres: []
    };
  },
  computed: {
    ...mapGetters ([
      'GET_NAV_SHOW',
      'GET_IS_HOME',
      'GET_LOGIN_STATUS',
      'GET_STAT'
    ]),
    latestnews () {
      let arr = this.newsres.map(x => {
        x.time = Coms.getCommonTime1(x.time)
        switch (x.icontype) {
          case '0': x.icontype = 'th'
            break
          case '1': x.icontype = 'bookmark'
            break
          case '2': x.icontype = 'music'
            break
          case '3': x.icontype = 'photo'
            break
          case '4': x.icontype = 'codepen'
            break
          default:  x.icontype = 'heart'
        }
        return x
      })
      return arr
    }
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
    toinfo () {
      this.show = false;
      this.$router.push({ name: 'info', params: { userid: this.GET_LOGIN_STATUS.id } })
    },
    getLatestNews () {
      axios.get('/api/getLatestNews')
      .then(res => {
        // console.log(res.data.result)
        this.newsres = res.data.result
      })
      .catch(err => {})
    }
  },
  mounted () {
    this.getLatestNews()
    sr.reveal(document.querySelectorAll('.box'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  padding: 6px 10px;
}
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 100%; 
  margin-bottom: 15px; 
}
.job {
  color: #555;
  font-size: 15px;
  line-height: 1.7;
}
.job h1{
  color: #18aacf;
  font-size: 42px;
  margin: 20px 0 20px;
}
.job img{
  margin: 20px auto 0;
}
.skillsBox {
  width:100%; 
  height:160px; 
  font-size: 24px;
  background: url(http://api.55lover.com/static/web/uploads/9fdd4722137ce.jpg) no-repeat; 
  background-size: auto;
  color: #fff;
}
.skillsBox img{
  margin:0 auto 20px;
}
.skillsBox aside {
  font-size: 48px;
}
.about img{
  margin: auto;
}
.con-title {
  color: #18aacf;
  font-size: 42px;
  margin: 20px 0 20px;
}
.maps {
  width: 100%;
  height: 100%;
}
.label-group{
  flex-wrap: wrap; 
}
.label-group a{
  padding: 3px 8px;
  background: #ff4762;
  color: #fff;
  margin-right: 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  transition: all 0.4s;
  font-size: 13px;
}
.label-group a:hover{
  opacity: 0.8;
  border-radius: 0
}
.website-info{
  padding: 10px;
  box-sizing: border-box;
  background: rgba(255,255,255,0.5);
  margin-top: 60px;
}
.website-avatar{
  margin-top: -55px;
  margin-bottom: 5px;
  border: 2px solid #fff;
  box-shadow: 0 0 5px #999;
  cursor: pointer;
  transition: all .8s;
}
.website-avatar:hover{
  transform: rotate(360deg);
}
.fb-title,.author{
  color: #18aacf;
}
.statistics{
  width: 100%;
  font-size: 14px;
  margin-top: 20px;
}
.line{
  width: 1px;
  height: 46px;
  background: #d1d1d1;
}
.statistics p {
  margin: 0;
}
.all-num{
  color: #000
}
.con{
  text-align: justify;
}
.focus-icon a{
  width: 50px;
  height: 50px;
  border-radius: 100%;
  background-color: #000;
  transition: all .8s;
}
.focus-icon a:hover{
  transform: rotate(360deg) scale(1.3);
}
.focus-label{
  font-size: 13px;
  margin-top: 10px;
}
.mail span{
  font-weight: bold;
}
.mail a{
  border: 1px solid #444;
  font-size: 24px;
  width: 150px;
  height: 42px;
  transition: all 0.45s;
  color: #444;
  text-align: center;
  margin-top: 10px;
}
.mail a:hover{
  border: 1px solid #fff;
  background: #fff;
  color: #18aacf;
}
.news{
  padding: 0 10px;
}
.news-time{
  margin: 0 10px
}
.news-author{
  margin-left: 10px;
  color: rgb(0, 168, 250)
}
.news-text{
  margin-right: 10px;
}
</style>
