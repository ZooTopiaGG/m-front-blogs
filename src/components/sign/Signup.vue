<template>
  <div class="signin">
    <div class="box">
      <div class="logo">
        <img alt="dengpeng" src="../../assets/images/73068c09df2142dfbcd926b6c4056dc6.png">
      </div>
        <el-form class="in-form" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
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
            <p>我有账号了。<router-link :to="{ name: 'signin' }">直接去登录</router-link></p>
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
  name: 'signin',
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
        email: ''
      }
    }
  },
  methods: {
    submitForm () {
      var that = this;
      // AJAX提交JSON:
      var para = {
          name: that.formLabelAlign.name,
          password: that.formLabelAlign.password,
          password1: that.formLabelAlign.password1,
          gender: that.formLabelAlign.gender,
          email: that.formLabelAlign.email,
      }
      axios.post('/api/signup/', Qs.stringify(para))
      .then(res => {
          console.log(res)
          if (res.data.isSuc) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          } else {
            this.$message({
              message: res.data.message,
              type: 'error'
            })
          }
          
          // location.href = './loginSuc.html'
          // this.$router.push({name: 'home'})
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.signin{
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  background: #efefef
}
.box {
  width: 6.6rem;
  position: absolute;
  left: 50%;
  top: 0.35rem;
  margin-left: -3.3rem;
}
.logo{
  text-align: center;
  margin-bottom: 0.36rem;
}
.logo img{
  width: 3.63rem;
  height: 0.9rem;
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
