<template>
  <div class="signin">
    <div class="box bgbox signin-form">
      <div class="logo">
        <img alt="dengpeng" src="../../assets/images/logo2.png">
      </div>
        <el-form class="in-form" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item>
          </el-form-item>
          <el-form-item label="姓名/账号">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type='password' v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex flex-pack-justify">
              <p>没有账号？<router-link :to="{ name: 'signup' }">去注册</router-link></p>
              <p><router-link :to="{ name: 'home' }">返回首页</router-link></p>
            </div>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="submitForm()">立即登录</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signin',
  data () {
    return {
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        password: ''
      },
      fromSignUp: false,

    }
  },
  beforeRouteEnter (to, from, next) {
     next(vm => {
      // 通过 `vm` 访问组件实例
      // console.log(from)
      // console.log(vm.fromSignUp)
      if (from.path === '/signup' || from.path === '/signin') {
        vm.fromSignUp = true
      }
    })
  },
  methods: {
    submitForm () {
      var that = this;
      // AJAX提交JSON:
      var para = {
          name: that.formLabelAlign.name,
          password: that.formLabelAlign.password
      }
      axios.post('/api/login/', Qs.stringify(para))
      .then(res => {
          let r = JSON.stringify(res.data.result)
          window.localStorage.setItem('55lover_reader', r)
          if (this.fromSignUp) {
            this.$router.push({ path: '/' })
          } else {
            this.$router.go(-1)
          }
          Toast(res.data.message)
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    $('.main').css('paddingTop','0.3rem')
    let 
      wHeight = $(window).height()- (120 * (parseInt($('html').css('font-size'))/100)),
      bHeight = $('.box').height() + (60 * (parseInt($('html').css('font-size'))/100));
    console.log(`${wHeight} -- ${bHeight}`)
    if (bHeight > wHeight) {
      $('.signin').height(bHeight)
    } else {
       $('.signin').height(wHeight)
    }
  }
}
</script>
<style type="text/css">
  .signin-form .el-form-item {
    margin-bottom: 0;
  }
  .signin-form .el-form-item__label {
    color: #444
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin {
  padding: 0.3rem;
  box-sizing: border-box;
}
.signin-form {
  padding: 0.2rem;
  box-sizing: border-box;
}
.logo{
  text-align: center;
  margin-bottom: 0.36rem;
}
.logo img {
  height: 1.4rem;
}
.box h3 {
  font-size: 42px;
  text-align: center;
  color: #333;
}
.in-form .el-button--primary{
  width: 100%
}
</style>
