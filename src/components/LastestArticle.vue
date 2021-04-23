<template> 
  <section class="flex flex-v">
    <div class="articles left-content flex-1" id="articles">
      <div class="title flex flex-align-center">
        <icon name="codepen" scale="1.2" style="color:#3387A4"></icon>
        <span class="title-text">最新文章</span>
        <span class="title-label">Article column</span>
      </div>
      <article class="article-list bgbox" v-for="(item, index) in list" :key="index">
        <div class="article-info flex flex-align-center flex-pack-justify">
          <div class="art-right flex flex-v flex-pack-justify flex-1">
            <div class="art-title" v-if="item.columntype==0">
              <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'a' } }">{{ item.title }}</router-link>
            </div>
            <div class="art-title" v-else>
              <router-link :to="{ name: 'adetails', params: { articleid: item.id, type: 'p' } }">{{ item.title }}</router-link>
            </div>
            <div class="author-info flex flex-align-center flex-pack-justify">
              <!-- <span class="author"><router-link :to="{ name : 'home' }">FeRookie</router-link></span> /  -->
              <span class="column-name" v-if="item.columntype==0"><router-link :to="{ name : 'articles' }">文章类</router-link></span>
              <span class="column-name" v-else><router-link :to="{ name : 'program' }">技术类</router-link></span>
              <!-- <span class="article-type">{{ item.type }}</span> /  -->
              <div class="flex flex-align-center">
                <span class="create-time flex flex-align-center"><icon name="calendar" class="icon-label" scale="1.3" light style="color:#3387A4"></icon>{{ item.createAt }}</span>
                <span class="flex flex-align-center"><icon name="eye" light scale="1.3" class="icon-label"  style="color:#3387A4"></icon><span class="review-count">{{ item.viewcount }}</span></span>
              </div>
            </div>
          </div>
          <router-link v-if="item.columntype==0" class="imgbox" :to="{ name: 'adetails', params: { articleid: item.id, type: 'a'  } }">
            <img v-if="!item.smallimg" src="../assets/images/photo-peggy.jpg" alt="article">
            <img v-else :src="item.smallimg" :onerror="logo" alt="article">
          </router-link>
          <router-link v-else class="imgbox" :to="{ name: 'adetails', params: { articleid: item.id, type: 'p'  } }">
            <img v-if="!item.smallimg" src="../assets/images/photo-peggy.jpg" alt="article">
            <img v-else :src="item.smallimg" :onerror="logo" alt="article">
          </router-link>
        </div>
        <div class="desc flex-1">
          {{ item.desc }}
        </div>
      </article>
    </div>
    <asides></asides>
    <!-- 右边内容区域 待设计 保留区域-->
    <div class="right-contents lastest">
      <!-- 书籍 -->
      <div>
        <div class="center-title flex flex-align-center">
          <icon name="book" scale="1.2" style="color:#3387A4"></icon>
          <span class="title-text">推荐书籍</span>
          <span class="title-label">Books</span>
        </div>
        <div class="flex flex-v flex-align-center">
          <a href="https://book.douban.com/subject/10546125/" target="_blank" title="JavaScript高级程序设计（第3版）" class="album-face box bgbox flex flex-align-center flex-pack-center">
            <img class="album-face-img" src="../assets/images/s8958650.jpg">
          </a>
          <a href="https://book.douban.com/subject/25786074/" target="_blank" title="HTML5权威指南" class="album-face box bgbox flex flex-align-center flex-pack-center">
            <img class="album-face-img" src="../assets/images/s27169241.jpg">
          </a>
          <a href="https://book.douban.com/subject/4866934/" target="_blank" title="Python基础教程" class="album-face box bgbox flex flex-align-center flex-pack-center">
            <img class="album-face-img" src="../assets/images/s4387251.jpg">
          </a>
        </div>
      </div>
    </div>
    <div class="apply-friends box bgbox">
      <div class="center-title flex flex-align-center">
        <icon name="user-plus" scale="1.2" style="color:#3387A4"></icon>
        <span class="title-text">申请友链</span>
        <span class="title-label">Apply links</span>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" label-position="top" class="lastest-ruleForm">
        <el-form-item label="网站名称" prop="name">
          <el-input v-model="ruleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="您的邮箱" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="您的网站" prop="website">
          <el-input v-model="ruleForm.website"></el-input>
        </el-form-item>
        <el-form-item class="lastest-ruleForm-button">
          <el-button type="primary" @click="submitForm('ruleForm')">提交申请</el-button>
        </el-form-item>
      </el-form>
    </div>
  </section>
</template>

<script>
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import Asides from '@/components/Aside'
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
      pagesize: 6,
      // 页值
      page: 1,
      // logo: 'this.src="' + require('http://image.55lover.com/image/error/no-prev-eefefb160de84ae92123de3ece7be82f.png') + '"' ,
      logo: 'this.src="http://image.55lover.com/image/error/no-prev-eefefb160de84ae92123de3ece7be82f.png"',
      ruleForm: {
        name: '',
        website: '',
        email: '',
      },
      rules: {
        name: [
          { required: true, message: '请输入网站名称', trigger: 'blur' },
          { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
        ],
        email:[
          {required: true, message: '请输入您的邮箱', trigger: 'blur'}
        ],
        website:[
          {required: true, message: '请输入网站地址', trigger: 'blur'}
        ]
      }
    }
  },
  components: {
    Asides,
    Icon
  },
  methods: {
    lookMore (id) {
      this.$router.push({ name: 'adetails', params: { articleid: id, type: 'a' } })
    },
    getLatestArticles () {
      let para = {
        page: this.page,
        pagesize: this.pagesize
      }
      axios.post('/api/getLatestArticles', Qs.stringify(para))
      .then(res => {
        // this.$message.success('哈哈哈哈')
        if (res.data.result && res.data.result.length > 0) {
          this.totalcount = res.data.totalcount
          this.list = res.data.result.map(x => {
            x.createAt = Coms.getCommonTime(x.createAt)
            return x
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
    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.applyFriends()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 申请友链
    applyFriends () {
      var para = {
        webname: this.ruleForm.name,
        website: this.ruleForm.website,
        email: this.ruleForm.email
      }
      axios.post('/api/applyFriendsLink', Qs.stringify(para))
      .then(res => {
        // console.log(res)
        Toast(res.data.message)
      })
      .catch(err => {})
    }
  },
  mounted () {
    this.getLatestArticles()
    sr.reveal(document.querySelectorAll('.album-face'))
  }
}
</script>
<style type="text/css">
  .lastest-ruleForm .el-form-item__label {
    padding: 0;
  }
  .lastest-ruleForm .el-form-item {
    margin-bottom: 6px
  }
  .lastest-ruleForm-button {
    margin: 15px 0;
  }
/*  .lastest-ruleForm-button  .el-form-item__content {
    text-align: center;
  }*/
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/*右边*/
.album-face{
  width: 100%;
  overflow: hidden;
  position: relative;
}
.hide-over{
  position: absolute;
  background-color: rgba(251,206,136,0.85);
  width: 100%;
  height: 100%;
  z-index: 1;
  display: none;
  color: #fff;
}
.hide-text{
  width: 100%;
  height: 100%;
}
.photo-num{
  position: absolute;
  right: 14px;
  bottom: 7px;
  font-size: 18px;
  color: #fff;
}
.album-face-img, .videos-face-img{
  width: 100%;
}
.album-face-img, .videos-face-img{
  box-sizing: border-box;
  padding: 10px;
  box-shadow: 0 0 5px rgba(255,255,255,0.5);
  transition: all 0.8s;
}
.album-face:hover .hide-over{
  display: block;
}
.album-face:hover .album-face-img{
  transform: rotate(-5deg) scale(1.5);
}
.lastest-ruleForm{
  padding: 0 0.2rem 0.2rem;
}
</style>
