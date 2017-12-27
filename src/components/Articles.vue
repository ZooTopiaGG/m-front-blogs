<template> 
  <div class="articles" id="articles">
    <div class="title">文章专栏</div>
    <article class="article-list" v-for="(item, index) in list" :key="index">
      <div class="article-info flex flex-align-center flex-pack-justify">
        <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'a'  } }">
          <img v-if="!item.smallimg" src="../assets/images/photo-peggy.jpg" alt="article">
          <img v-else :src="item.smallimg" alt="article">
        </router-link>
        <div class="art-right">
          <div class="art-title">
            <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'a' } }">{{ item.title }}</router-link>
          </div>
          <div class="author-info">
            <span class="author"><router-link :to="{ name : 'home' }">邓鹏</router-link></span> / 
            <span class="column-name"><router-link :to="{ name : 'articles' }">文章</router-link></span> / 
            <span class="article-type">{{ item.type }}</span> / 
            <span class="create-time">{{ item.createAt }}</span> /
            <span >阅读量：<span class="review-count">{{ item.viewcount }}</span></span>
          </div>
        </div>
      </div>
      <div class="desc">
        {{ item.desc }}
      </div>
      <div class="look">
        <el-button type="primary" @click="lookMore(item.id)">前往阅读</el-button>
      </div>
    </article>
    <!-- <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalcount"
        class="page">
      </el-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'articles',
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
      page: 1
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
        // this.$message.success('哈哈哈哈')
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
          this.$message.success('没有文章')
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
.articles{
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
