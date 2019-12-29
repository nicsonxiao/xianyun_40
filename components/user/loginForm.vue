<template>
  <el-form :model="loginForm" ref="loginForm" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="loginForm.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input placeholder="密码" type="password" v-model="loginForm.password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    var validateUsername = (rule, value, callback) => {
      const reg = /^1[3-9][0-9]{9}$/
      if (reg.test(value)) {
        callback()
      } else {
        callback('手机号码格式错误')
      }
    }
    return {
      // 表单数据
      loginForm: {
        username: '',
        password: ''
      },
      // 表单规则
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
        this.$refs.loginForm.validate(valid=>{
            if(!valid){
                return
            }
           this.$store.dispatch('user/login',this.loginForm)
        })
    }
  }
}
</script>

<style scoped lang="less">
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
