<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-form ref="form" :model="user" label-width="80px">
        <el-form-item>
          <img src="../../assets/logo_index.png" alt />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="user.mobile"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="user.code"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox>我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button @click="getLogin" :loading="loading">
            {{ !loading ? "登录" : "登陆中" }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Login',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      loading: false
    }
  },
  methods: {
    getLogin () {
      this.loading = true
      axios
        .post(
          'http://api-toutiao-web.itheima.net/mp/v1_0/authorizations',
          this.user
        )
        .then(res => {
          console.log(res)
          this.$message.success('登录成功')
          setTimeout(() => {
            this.$router.push('/')
          }, 500)
          this.loading = false
        })
        .catch(err =>
          this.$message({
            type: 'error',
            message: err.message || '未知错误'
          })
        )
    }
  }
}
</script>

<style scoped lang='less'>
.login-container {
  width: 100%;
  height: 100%;
  // 绝对定位  依赖窗口的高度和宽度
  position: absolute;
  top: 0;
  left: 0;
  background: url(../../assets/login_bg.jpg) no-repeat;
  background-size: cover;
  .box-card {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 500px;
    background-color: pink;
  }
}
</style>
