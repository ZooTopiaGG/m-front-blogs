<template>
  <div class="dynamic flex-1 left-content">
      <div class="title flex flex-align-center">
        <icon name="bookmark" scale="1.2" style="color:#3387A4"></icon>
        <span class="title-text">动态专栏</span>
        <span class="title-label">Dynamic column</span>
      </div>
      <div class="dy-box bgbox flex" v-for="(item, index) in lists" :key='index'>
        <div class="avatar">
          <img src="../assets/images/23115938.jpg" alt="avatar">
        </div>
        <div class="dy-con flex-1">
          <div class="con">
            <div class="con-first">
              <div class="content">
                <router-link :to="{ name: 'home' }" style="color:#409EFF">FeRookie。</router-link> &nbsp;&nbsp;{{ item.content }}
              </div>
              <div class="time"><span>发布时间：</span><span>{{ item.createAt | time }}</span></div>
            </div>
            <div v-if="item.commentsList.length > 0" :class="{'foldheight': foldheight,'comments-area': commentsArea}">
              <div v-for="(item1, index1) in item.commentsList" :key="index1">
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
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Vue from 'vue'
Vue.filter('time', function (val) {
  return Coms.getCommonTime1(val)
})

export default {
  name: 'dynamic',
  components: {
    Icon
  },
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
      tousername: 'FeRookie' // 如果没有设置，则默认管理员
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
          Toast('作者没有发布动态')
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
        Toast('未登录或者登录信息已过期')
        return
      }
      // alert( this.tousername +'--'+ this.touserid )
      var para = {
        dynamicid: dynamicid,
        userid: _user.id, // 登录用户
        username: _user.name, // 登录用户
        touserid: this.touserid, // 默认管理员 'd17692be-eca7-41ef-87df-aef4313e2b02',
        tousername: this.tousername, // 默认管理员 'FeRookie',
        isreply: this.isreply,
        comment: comment
      }
      axios.post('/api/addComments', Qs.stringify(para))
      .then(res => {
        // console.log(res)
        // if () {}
        this.getDynamicList()
        Toast(res.data.message)
      })
      .catch(err => {})
    }
  },
  mounted () {
    $('title').html('他又在说什么_动态专栏_FeRookie博客')
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
  margin: 0 auto;
}
.dy-box{
  padding: 0.2rem;
  border-bottom: 1px solid #eee;
}
.avatar {
  margin-bottom: 0.2rem;
}
.avatar img{
  width: 0.6rem;
  height: 0.6rem;
  border-radius: 0.04rem;
  margin-right: 0.1rem;
}
.dy-con {
  border-radius: 3px;
}
.dy-con .con{
  font-size: 13px;
  color: #555
}
.con-first {
  padding: 0.1rem 0;
}
.dy-con .content{
  line-height: 1.6;
  color: #444;
}
.dy-con .time{
  margin: 15px 0 0
}
.comments-area {
  border-top: 0;
  border-bottom: 0;
  padding: 0.2rem 0;
  max-height: 1.08rem;
  box-sizing: border-box;
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
