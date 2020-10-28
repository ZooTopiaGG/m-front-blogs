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
            <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'a' } }">{{ item.title }}</router-link>
          </div>
          <div class="author-info flex flex-align-center flex-pack-justify">
            <!-- <span class="author"><router-link :to="{ name : 'home' }">邓鹏</router-link></span> /  -->
            <span class="column-name"><router-link :to="{ name : 'articles' }">文章集</router-link></span>
            <!-- <span class="article-type">{{ item.type }}</span> /  -->
            <div class="flex flex-align-center">
              <span class="create-time flex flex-align-center"><icon name="calendar" class="icon-label" scale="1.0" light style="color:#3387A4"></icon>{{ item.createAt }}</span>
              <span class="flex flex-align-center"><icon name="eye" light scale="1.0" class="icon-label"  style="color:#3387A4"></icon><span class="review-count">{{ item.viewcount }}</span></span>
            </div>
          </div>
        </div>
        <router-link class="imgbox" :to="{ name: 'adetails', params: { articleid: item.id, type: 'a'  } }">
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
  name: 'articles',
  components: {
    Icon
  },
  data () {
    return {
      list:[],
      // 当前页
      currentPage4: 1,
      // 总条数
      totalcount: 200,
      // 每页多少条
      pagesize: 100000,
      // 页值
      page: 1,
      logo: 'this.src="http://image.55lover.com/image/error/no-prev-eefefb160de84ae92123de3ece7be82f.png"' 
    }
  },
  methods: {
    lookMore (id) {
      this.$router.push({ name: 'adetails', params: { articleid: id, type: 'a' } })
    },
    handleSizeChange (val) {
      // 每页多少条
      // console.log(val)
      this.pagesize = val
      this.getArticle()
    },
    handleCurrentChange (val) {
      // 当前页数
      // console.log(val)
      this.page = val
      this.getArticle()
    },

    getArticle () {
      Indicator.open()
      let para = {
        page: this.page,
        size: this.pagesize,
        columntype: 0 // 文章
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
          return 'ok' // 下一个方法的 结果
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
    $('title').html('法律知识很重要_文章专栏_邓鹏博客')
    this.getArticle()
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.articles .title{
  padding-bottom: 0.2rem;
}
</style>
