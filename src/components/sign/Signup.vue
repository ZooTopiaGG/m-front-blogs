<template>
  <div class="signup">
    <div class="box bgbox signup-form">
      <div class="logo">
        <img alt="dengpeng" src="../../assets/images/logo2.png">
      </div>
        <el-form class="in-form " :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
          <el-form-item>
          </el-form-item>
          <el-form-item label="姓名/账号">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formLabelAlign.email"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-input v-model="formLabelAlign.gender"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type='password' v-model="formLabelAlign.password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码">
            <el-input type='password' v-model="formLabelAlign.password1"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="flex flex-pack-justify">
              <p>我有账号了。<router-link :to="{ name: 'signin' }">直接去登录</router-link></p>
              <p><router-link :to="{ name: 'home' }">返回首页</router-link></p>
            </div>
          </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="submitForm()">注册</el-button>
        </el-form-item>
        </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'signup',
  data () {
    return {
      name: '',
      password: '',
      labelPosition: 'top',
      formLabelAlign: {
        name: '',
        password1: '',
        password: '',
        gender: '',
        email: '',
        avatar: [
          'http://scenery.55lover.com/image/scenery/20180319113550.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113533.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113616.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113602.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113556.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113609.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113630.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113621.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113625.jpg',
          'http://scenery.55lover.com/image/scenery/20180319113635.jpg'
        ]
      }
    }
  },
  methods: {
    submitForm () {
      let
        that = this,
        round = Math.floor(Math.random() * that.formLabelAlign.avatar.length),
        avatar = that.formLabelAlign.avatar[round],
      // AJAX提交JSON:
        para = {
          name: that.formLabelAlign.name,
          password: that.formLabelAlign.password,
          password1: that.formLabelAlign.password1,
          gender: that.formLabelAlign.gender,
          email: that.formLabelAlign.email,
          avatar: avatar
      };
      axios.post('/api/signup/', Qs.stringify(para))
      .then(res => {
          console.log(res)
          if (res.data.isSuc) {
            Toast(res.data.message)
          } else {
            Toast(res.data.message)
          }
          
          // location.href = './loginSuc.html'
          // this.$router.push({name: 'home'})
      })
      .catch(err => {
        console.log(err)
      })
    }
  },
  mounted() {
    // $('.signup').height($('.box').height() + (20 * (parseInt($('html').css('font-size'))/100)))
    $('.main').css('paddingTop','0.3rem')
    let 
      wHeight = $(window).height()- (120 * (parseInt($('html').css('font-size'))/100)),
      bHeight = $('.box').height() + (60 * (parseInt($('html').css('font-size'))/100));
    if (wHeight < bHeight) {
      $('.signup').height(bHeight)
    } else {
       $('.signup').height(wHeight)
    }
  }
}
</script>
<style type="text/css">
  .signup-form .el-form-item {
    margin-bottom: 0;
  }
  .signup-form .el-form-item__label {
    color: #444
  }
  .signup-form  .el-form--label-top .el-form-item__label{
    padding: 0
  }
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signup {
  padding: 0.3rem;
  box-sizing: border-box;
}
.signup-form {
  padding: 0.2rem;
  box-sizing: border-box;
}
.logo{
  text-align: center;
  margin-bottom: 0;
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
