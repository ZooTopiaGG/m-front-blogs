<template>
  <div class="pdetails">
    <div class="details-title">我可不可以把标题写长一点反正就只我可不可以把标题写长一点反正就只有一排按啊啊有一排按啊啊</div>
    <div class="desc flex flex-align-center">
      <img class="avatar" src="../assets/images/23115938.jpg" alt='avatar'>
      <div class="desc-info">
        <div class="author">
          <span>作者：</span>
          <a href="javascript:;">邓鹏</a>
          <span class="type">类型：</span>
          <span>原创</span>
        </div>
        <div class="art-info">
          <span class="time">2017-10-10</span>
          <span>阅读：</span><span>122200</span>
        </div>
      </div>
    </div>
    <article class="content">
      去年的今天，我正在厦门马拉松的赛道上自虐，转眼一年又过去了。今天上午，趁着北京的雾霾刚被吹散，我赶紧去操场跑了几圈，跑着跑着发现天色不对，往南一看，雾霾又来了！

      回顾2016，主要完成了以下几个小目标：

      跑了两个马拉松，成绩稳步提升，但尚未破4，还需努力；

      断断续续写了几篇文章，继续完善JavaScript教程，其中以《如何成长为一名优秀的前端工程师》最受欢迎；

      双十一正式发布了Java教程，反响不错，继续努力！

      成功考取证券从业资格证书，从此有资质从事证券行业。

      2017准备给自己定几个小目标：

      发布3门新课程；

      写两本书；

      把一块腹肌练成6块。

      小目标暂定3个，如果都实现了，再追加一个小目标，比如挣他一个亿。
    </article>
  </div>
</template>

<script>

export default {
  name: 'pdetails',
  data () {
    return {
    }
  }
}
</script>
<style type="text/css">
  
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pdetails{
  padding-top: 90px; 
  max-width: 720px;
  margin: 0 auto;
}
.desc{
  font-size: 14px;
  padding: 0 40px;
}
.avatar {
  width: 48px;
  height: 48px;
  border-radius: 100%;
  margin-right: 20px;
}
.author a {
  color: #87ceeb
}
.author a:hover{
  color: #409EFF
}
.type {
  margin-left: 20px;
}
.art-info {
  font-size: 12px;
  margin-top: 10px;
}
.time{
  color: #808080
}
.content {
  margin-top: 40px;
  padding: 0 40px;
}
</style>
