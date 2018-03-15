<template>
  <div class="articles flex-1" id="articles">
    <div class="title flex flex-align-center">
      <icon name="codepen" scale="1.2" style="color:#3387A4"></icon>
      <span class="title-text">最新文章</span>
      <span class="title-label">Article column</span>
    </div>
    <article class="article-list bgbox" v-for="(item, index) in list" :key="index">
      <div class="article-info flex flex-align-center flex-pack-justify">
        <div class="art-right flex flex-v flex-pack-justify flex-1">
          <div class="art-title">
            <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'p' } }">{{ item.title }}</router-link>
          </div>
          <div class="author-info flex flex-align-center flex-pack-justify">
            <!-- <span class="author"><router-link :to="{ name : 'home' }">邓鹏</router-link></span> /  -->
            <span class="column-name"><router-link :to="{ name : 'articles' }">技术集</router-link></span>
            <!-- <span class="article-type">{{ item.type }}</span> /  -->
            <div class="flex flex-align-center">
              <span class="create-time flex flex-align-center"><icon name="calendar" class="icon-label" scale="1.0" light style="color:#3387A4"></icon>{{ item.createAt }}</span>
              <span class="flex flex-align-center"><icon name="eye" light scale="1.0" class="icon-label"  style="color:#3387A4"></icon><span class="review-count">{{ item.viewcount }}</span></span>
            </div>
          </div>
        </div>
        <router-link class="imgbox" :to="{ name: 'adetails', params: { articleid: item.id, type: 'p'  } }">
          <img v-if="!item.smallimg" src="../assets/images/photo-peggy.jpg" alt="article">
          <img v-else :src="item.smallimg" :onerror="logo" alt="article">
        </router-link>
      </div>
      <div class="desc flex-1">
        {{ item.desc }}
      </div>
    </article>
  </div>

</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
export default {
  name: 'program',
  components: {
    Icon
  },
  data () {
    return {
      list:[],
      currentPage4: 1,
      totalcount: 0,
      pagesize: 10000,
      page: 1,
      logo: 'this.src="http://file.55lover.com/uploads/aff0d0293f71.jpg"' 
    }
  },
  methods: {
    lookMore (id) {
      this.$router.push({ name: 'adetails', params: { articleid: id, type: 'p'  } })
    },
    handleSizeChange (val) {
      // 每页多少条
      console.log(val)
      this.pagesize = val
      this.getArticle()
    },
    handleCurrentChange (val) {
      // 当前页数
      console.log(val)
      this.page = val
      this.getArticle()
    },

    getArticle () {
      Indicator.open()
      let para = {
        page: this.page,
        size: this.pagesize,
        columntype: 1 // 文章
      }
      axios.post('/api/getArticle', Qs.stringify(para))
      .then(res => {
        if (res.data.result && res.data.result.length > 0) {
          this.totalcount = res.data.total
          this.list = res.data.result
          this.list.forEach(val => {
            if (val.type == 0) {
              val.type = '原创'
            } else {
              val.type = '转载'
            }
            val.createAt = Coms.getCommonTime(val.createAt)
          }) 
          // loadingInstance.close()
          return 'ok'
        } else {
          Toast('没有文章')
        }
      })
      // promise 依次执行 回调
      .then(res => {
        if (res) {
          sr.reveal(document.querySelectorAll('.article-list')) // 每个元素 都依次执行 动画
          // sr.reveal('.article-list', { container: '#articles' }) // 所有元素一起执行
        }
      })
      .catch(err => {})
    }
  },
  mounted () {
    $('title').html('优雅的学习态度_技术专栏_邓鹏博客')
    this.getArticle()
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.program .title{
  padding-bottom: 0.2rem;
}
.program{
  padding-top: 0.9rem; 
  /*max-width: 1200px;*/
  margin: 0 auto;
  padding-bottom: 0.6rem;
}
.page {
  text-align: right;
  margin-top: 0.6rem
}

.article-list{
  padding:0.2rem 0.3rem;
  border-bottom: 1px solid #eee;  
}
.article-list:hover{
  -webkit-box-shadow: 1px 1px 10px 2px #CCC;
  -moz-box-shadow: 1px 1px 10px 2px #CCC;
  -webkit-transition: all .4s;
  border-color: transparent;
}
.article-list:last-child{
  margin-bottom: 0.4rem;
}
.article-info img{
  width: 2.5rem;
  height: 1.5rem;
  border: 1px solid #ddd;
}
.article-info>a {
  margin-right: 0.25rem;
}
.art-title{
  font-size: 18px;
  max-height: 0.5rem; 
  line-height: 0.5rem;
  overflow: hidden;
}
.art-right{
  /*margin-right: 0.4rem;*/
  width: 4.2rem;
}
.art-title a,.art-right a {
  color: #18aacf
}
.art-title a:hover,.art-right a:hover{
  text-decoration: underline;
}
.author-info {
  font-size: 14px;
  margin:0.2rem 0; 
}
.desc{
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  text-align: justify;
  max-height: 1.26rem;
  overflow: hidden;
}
.look{
  margin-top: 0.2rem;
  text-align: right;
}
</style>
