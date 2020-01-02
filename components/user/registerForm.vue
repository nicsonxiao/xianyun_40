<template>
  <div class="register">
    <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm" class="form">
      <el-form-item class="form-item" prop="username">
        <el-input placeholder="请输入手机号" v-model="registerForm.username" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="captcha">
        <el-input placeholder="验证码" v-model="registerForm.captcha">
          <template slot="append">
            <el-button @click="handleSendCaptcha">发送验证码</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="nickname">
        <el-input placeholder="你的名字" v-model="registerForm.nickname" clearable></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="password">
        <el-input
          placeholder="密码"
          type="password"
          v-model="registerForm.password"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item" prop="checkPass">
        <el-input
          placeholder="确认密码"
          type="password"
          v-model="registerForm.checkPass"
          auto-complete="off"
        ></el-input>
      </el-form-item>
      <el-form-item class="form-item">
        <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.registerForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      //表单数据
      registerForm: {
        username: '',
        nickname: '',
        captcha: '',
        password: '',
        checkPass: ''
      },
      rules: {
        username: [
          { required: true, message: '手机号码不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '昵称不能为空', trigger: 'blur' }
        ],
        captcha: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ],
        checkPass: [{ validator: validatePass, trigger: 'blur' }]
      }
    }
  },
  methods: {
    //发送验证码
    handleSendCaptcha() {
      let Un=this.registerForm.username.trim()
      if (Un === '') {
        this.$message.error('手机号码不能为空')
        return
      }
      this.$axios({
        method: 'POST',
        url: '/captchas',
        data: {
          tel: Un
        }
      }).then(res => {
        this.$message.success('验证码发送成功，默认验证码为000000')
      })
    },
    //注册按钮
    handleRegSubmit() {
      this.$refs.registerForm.validate(valid => {
        console.log(valid)
        if (valid) {
          // props是this.registerForm除了checkPass以外的其他属性
          const { checkPass, ...props } = this.registerForm
          this.$axios({
            method: 'POST',
            url: '/accounts/register',
            data: props
          }).then(res => {
             this.$message.success('注册成功')
             this.$router.back()
             this.$store.commit('user/setUserInfo',res.data)
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>