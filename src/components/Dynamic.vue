<template>
  <div class="dynamic">
    <div class="title">动态专栏</div>
    <div class="dy-box" v-for="(item, index) in lists" :key='index'>
      <div class="avatar flex flex-align-center">
        <img src="../assets/images/23115938.jpg" alt="avatar">
        <router-link :to="{ name: 'home' }" style="color:#409EFF">邓鹏。</router-link> 
      </div>
      <div class="dy-con">
        <div class="con">
          <div class="con-first">
            <div class="content">
              {{ item.content }}
            </div>
            <div class="time"><span>发布时间：</span><span>{{ item.createAt | time }}</span></div>
          </div>
          <div v-if="item.commentsList.length > 0" :class="{'foldheight': foldheight,'comments-area': commentsArea}">
            <div v-for="(item1, index1) in item.commentsList" :key="index1" style="margin-bottom: 5px;">
              <div class="comment-item">

                <span v-if="item1.isreply === 1">
                  <span style="color:#409EFF">{{ item1.username }}</span>回复<span style="color:#409EFF">{{ item1.tousername }}</span>
                </span>
                <span v-else>
                  <span style="color:#409EFF">{{ item1.username }}</span>
                </span>: 
                <span>{{ item1.comment }}</span>
                <span class="replys" style="color:#409EFF;cursor: pointer;margin-left: 10px;" @click="reply(index, item1.userid, item1.touserid, item1.username, item1.tousername)">回复</span>
                <span style="margin-left: 10px;font-size:12px;">{{ item1.createAt | time }}</span>
              </div>
            </div>
          </div>
          <div class="fold" v-if="item.commentsList.length > 2"  @click="foldheight = !foldheight">
            <span v-if="!foldheight">展开</span>
            <span v-else>收起</span>
          </div>
        </div>
        <div class="comment">
          <el-input type="textarea" v-model="item.value" :placeholder="item.placeholder"></el-input>
          <div class="btn-primary">
            <el-button type="primary" @click="addComments(item.id, item.value)">发布评论</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
Vue.filter('time', function (val) {
  return Coms.getCommonTime1(val)
})

export default {
  name: 'dynamic',
  data () {
    return {
      list: [],
      comment: '',
      isreply: 0,
      placeholder: '',
      value: '',
      testLogin: false,
      foldheight: false,
      commentsArea: true,
      userid: '',
      username: '',
      touserid: 'd17692be-eca7-41ef-87df-aef4313e2b02', // m如果没有设置，则默认管理员
      tousername: '邓鹏' // 如果没有设置，则默认管理员
    }
  },
  computed: {
    lists () {
      var arr = []
      this.list.forEach(val => {
        // val.value = this.value // 返回的不是observe对象
        this.$set(val, 'value', '') // 返回的是observe对象 ,深入响应式
        this.$set(val, 'placeholder', '') // 返回的是observe对象 ,深入响应式
        // val.createAt = Coms.getCommonTime1(val.createAt)
        arr.push(val)
      })
      return arr
    }
  },
  methods: {
    getDynamicList () {
      Indicator.open()
      axios.get('/api/getDynamicList')
      .then(res => {
        if (res.data.result && res.data.result.length > 0) {
          this.list = res.data.result
          return 'ok'
        } else {
          this.$message.info('作者没有发布动态')
        }
      })
      .then(res => {
        if (res) {
          sr.reveal(document.querySelectorAll('.dy-box'))
          // sr.reveal('.article-list', { container: '#articles' })
        }
      })
      .catch(err => {})
    },
    reply (index, userid, touserid, username, tousername) {
      this.isreply = 1
      // this.userid = touserid
      // this.username = tousername
      this.touserid = userid
      this.tousername = username
      this.list[index].placeholder = `回复${username}：`
      // alert(this.tousername +'--'+ this.touserid)
    },
    addComments (dynamicid, comment) {
      // alert(this.isreply)
      let user = window.localStorage.getItem('55lover_reader')
      let _user = JSON.parse(user)
      if (_user && _user.id) {
        console.log(_user.id)
      } else {
        this.$message({
          showClose: true,
          message: '未登录或者登录信息已过期'
        })
        return
      }
      // alert( this.tousername +'--'+ this.touserid )
      var para = {
        dynamicid: dynamicid,
        userid: _user.id, // 登录用户
        username: _user.name, // 登录用户
        touserid: this.touserid, // 默认管理员 'd17692be-eca7-41ef-87df-aef4313e2b02',
        tousername: this.tousername, // 默认管理员 '邓鹏',
        isreply: this.isreply,
        comment: comment
      }
      axios.post('/api/addComments', Qs.stringify(para))
      .then(res => {
        // console.log(res)
        // if () {}
        this.getDynamicList()
        this.$message({
          showClose: true,
          message: res.data.message,
          type: 'success'
        })
      })
      .catch(err => {})
    }
  },
  mounted () {
    this.getDynamicList()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
a:hover{
  text-decoration: underline;
}
.dynamic {
  padding-top: 0.9rem; 
  /*max-width: 1200px;*/
  margin: 0 auto;
}
.dynamic .title{
  padding: 0.4rem 0.3rem 0.1rem;
}
.dy-box{
  padding: 0.3rem;
  border-bottom: 1px solid #eee;
}
.avatar {
  margin-bottom: 0.2rem;
}
.avatar img{
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.04rem;
  margin-right: 0.2rem;
}
.dy-con {
  border-radius: 3px;
}
/*.dy-con:hover{
  -webkit-box-shadow: 1px 1px 10px 2px #CCC;
  -moz-box-shadow: 1px 1px 10px 2px #CCC;
  -webkit-transition: all .4s;
  border-color: red;
}*/
.dy-con .con{
  font-size: 13px;
  color: #888
}
.con-first {
  padding: 0.2rem 0;
}
.dy-con .content{
  font-size: 16px;
  line-height: 1.6;
  color: #333;
}
.dy-con .time{
  margin: 15px 0 0
}
.comments-area {
  border-top: 0;
  border-bottom: 0;
  padding: 0.2rem 0;
  max-height: 0.88rem;
  overflow: hidden;
  transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
}
.foldheight {
  max-height: 10.0rem;
}

.fold {
  text-align: center;
  cursor: pointer;
}
.fold span {
  display: inline-block;
  width: 1.2rem;
  height: 0.36rem;
  line-height: 0.36rem;
  color: #87ceeb;
  border: 1px solid #87ceeb;
  border-radius: 4px;
}
.fold span:hover{
  border: 1px solid #13afff;
  color: #13afff;
}
.comment {
  padding: 0.15rem 0; 
}
.comment textarea {
  width: 80%;
  min-height: 16px;
  border-radius: 3px;
  padding: 5px 10px;
  font-size: 14px;
}
.btn-primary {
  margin-top: 0.15rem;
}
.replys:hover{
  text-decoration: underline;
}
</style>
