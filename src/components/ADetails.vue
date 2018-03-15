<template>
  <div class="adetails box bgbox">
    <div class="details-title">{{ title }}</div>
    <div class="desc flex flex-align-center">
      <img class="avatar" src="../assets/images/23115938.jpg" alt='avatar'>
      <div class="desc-info">
        <div class="author">
          <span>作者：</span>
          <router-link :to="{ name: 'home' }">邓鹏</router-link>
          <span class="type">类型：</span>
          <span>{{ type }}</span>
        </div>
        <div class="art-info">
          <span>创建时间：</span><span class="time" style="margin-right:15px;">{{ createtime }}</span>
          <span>阅读：</span><span>{{ viewcount }}</span>
        </div>
      </div>
    </div>
    <article :class="{content: true, imgWidth: loadImg}" id='doc-content' v-html="content">
    </article>
  </div>
</template>

<script>

export default {
  name: 'adetails',
  data () {
    return {
      title: '',
      content: '',
      type: '原创',
      viewcount: 0,
      createtime: '',
      loadImg: false
    }
  },
  methods: {
    getArticle () {
      Indicator.open()
      axios.get('/api/getArticle/'+ this.$route.params.articleid)
      .then(res => {
        this.title = res.data.result.title
        $('title').html(`${this.title}_邓鹏博客`)
        if (res.data.result.type == 0) {
          this.type = '原创'
        } else {
          this.type = '转载'
        }
        this.viewcount = res.data.result.viewcount
        this.createtime = Coms.getCommonTime(res.data.result.createAt)
        this.content = res.data.result.content
        return 'ok'
      })
      .then(res => {
        // 控制图片
        this.loadImg = true
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
.adetails{
  margin: 0 auto;
}
.details-title{
  padding: 0.2rem;
  font-size: 18px;
}
.desc{
  font-size: 16px;
  padding: 0 0.2rem;
}
.avatar {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 100%;
  margin-right: 0.2rem;
}
.author a {
  color: #18aacf
}
.author a:hover{
  text-decoration: underline;
}
.type {
  margin-left: 0.2rem;
}
.art-info {
  font-size: 12px;
  margin-top: 0.1rem;
}
.time{
  color: #808080
}
.content {
  margin-top: 0.4rem;
  padding: 0 0.4rem;
}
#doc-content {
  font-size: 16px;
  line-height: 1.8;
}
.loadImg img{
  width: 100%;
  max-width: 100%;
}
</style>
