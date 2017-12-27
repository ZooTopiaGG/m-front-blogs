<template>
  <div class="music">
    <div class="title">
      音乐专栏
    </div>
    <div class="m-content">
      <div class="music-header flex flex-align-center">
        <img class="avatar" src="../assets/images/23115938.jpg" alt="dengpeng">
        <div class="info flex-1">
          <div class="user"><span class="name">邓鹏</span> <span class="from">QQ音乐用户</span></div>
          
        </div>
      </div>
      <div style="font-size: 14px;">
        <div class="intro">
          <span>个人介绍：</span> <span>因为刚好遇见你，留下十年的期许</span>
        </div>
        <div class="address">
          <span>所在地区：</span> <span>四川省-成都市</span>
        </div>
        <div class="age">
          <span>年龄：</span> <span>24岁</span>
        </div>
      </div>
      <div class="music-list">
        <div class="music-list-title">
          歌曲列表 <span>累积共有{{ list.length }}首</span>
        </div>
        <ul class="list">
          <li class="list-cell flex flex-align-center flex-pack-justify" v-for="(item, index) in list" :key="index">
            <span style="width:25px">{{ index + 1 }}. </span>
            <audio class="audio" :src="item.url" controls> 亲 您的浏览器不支持html5的audio标签 </audio>
            <!-- <i style="margin:0 10px; cursor: pointer"></i>  -->
            <span style="max-height: 1.0rem;white-space:nowrap;max-width: 3.0rem;overflow: hidden;">
              <a href="javascript:;" class="music-title " style="color:#000;margin-left: 10px;">{{ item.songName }}</a> 
              <span style="margin: 0 5px">-</span> 
              <a href="javascript:;" >{{ item.singerName }}</a>
            </span>
            <span class="flex-1"></span>
            <div class="playStatus" style="width:15px;height:10px;">
              <b></b>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="block">
      <el-pagination
        small
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="totalcount"
        class="page">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'music',
  data () {
    return {
      list: [],
      totalcount: 100,
      currentPage4: 1,
      size: 10,
      page: 1
    }
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      this.getQQMusic()
    },
    handleCurrentChange (val) {
      this.page = val
      this.getQQMusic()
    },
    getQQMusic () {
      Indicator.open()
      var para = {
        size: this.size,
        page: this.page
      }
      axios.post('/api/getQQMusic', Qs.stringify(para))
      .then(res => {
        let result = res.data.result
        this.totalcount = res.data.total_count
        this.list = result
        // console.log(this.list)
        // loadingInstance.close()
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted () {
    this.getQQMusic()
    // console.log(this.$refs['audio'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
/*.music .title{
  padding-bottom: 20px;
}*/
.music{
  padding-top: 0.9rem; 
  /*max-width: 1200px;*/
  margin: 0 auto;
}
.m-content{
  padding: 0 0.4rem;
}
.avatar{
  width: 1.24rem;
  height: 1.24rem;
  border: 1px solid #d5d5d5;
  background: #fff;
  padding: 2px;
  border-radius: 2px;
  margin-right: 0.3rem;
}
.music-header {
  font-size: 14px;
}
.user{
  /*border-bottom: 1px solid #d5d5d5;
  padding-bottom: 15px;*/
}
.music-list-title{
  padding-bottom: 0.1rem;
  border-bottom: 2px solid #409EFF
}
.name {
  color: #000;
  font-size: 24px;
  font-weight: bold;
  margin-right: 0.15rem;
}
.from {
  color: #999;
}
.intro{
  padding-top: 0.15rem;
}
.address{
  padding: 0.15rem 0;
}

.music-list {
  padding: 0.4rem 0;
  font-size: 14px;
}
.music-list-title{
  font-size: 24px;
}
.music-list-title span{
  font-size: 14px;
  color: #999;
}
.audio{
  width: 2.0rem
}
.list .list-cell {
  height: 1.0rem;
  line-height: 1.0rem;
  transition: all 0.4s;
  font-size: 14px;
}
.list .list-cell:hover{
  background: #eee
}
.list .list-cell i{
  display: inline-block;
  width: 18px;
  height: 18px;
  background: url(../assets/images/bf1.png) no-repeat;
  background-size: cover;
}
.list-cell a {
  color: #888
}
.list-cell a:hover{
  text-decoration: underline !important;
}
.list .list-cell i:hover{
  background: url(../assets/images/bf3.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active{
  background: url(../assets/images/bf2.png) no-repeat;
  background-size: cover;
}
.playStatus {
  padding: 5px 10px;
  background: #409EFF
}
.playStatus b {
  display: block;
  width: 0.3rem;
  height: 0.2rem;
  background: url(../assets/images/music.png) no-repeat;
  background-size: cover;
}
.list .list-cell i.active~.playStatus b{
  background: url(https://qzonestyle.gtimg.cn/aoi/skin/img/skin-gif/1-music-sonic.gif) no-repeat;
  background-size: cover;
}
.page {
  text-align: center;
  margin-top: 0.6rem;
}
</style>
