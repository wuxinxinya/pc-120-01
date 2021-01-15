<template>
  <div class="login-container">
    <el-card class="box-card">
      <el-form ref="Loginform" :model="user" label-width="80px" :rules="rules">
        <el-form-item>
          <img src="../../assets/logo_index.png" alt />
        </el-form-item>
        <el-form-item label="用户名" prop="mobile">
          <el-input v-model="user.mobile"> </el-input>
        </el-form-item>
        <el-form-item label="密码" prop="code">
          <!-- show-password小眼睛 -->
          <el-input v-model="user.code" show-password> </el-input>
        </el-form-item>
        <el-form-item>
          <!-- :value="true" 选中复选框不能进行修改  必须同意 -->
          <!-- <el-checkbox :value="true"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          > -->
          <el-checkbox v-model="checked"
            >我已阅读并同意用户协议和隐私条款</el-checkbox
          >
        </el-form-item>
        <el-form-item>
          <el-button
            style="width: 100%"
            @click="getLogin"
            :loading="loading"
            type="primary"
          >
            {{ !loading ? "登录" : "登陆中" }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    // 自定义校验手机号的函数
    const checkMobile = (rule, value, callback) => {
      // 进行校验 （1开头，第二位 3-9 数字，其余剩下9位数字）
      if (!/^1[3-9]\d{9}$/.test(value)) {
        // 校验失败
        callback(new Error('手机号格式错误'))
      } else {
        // 校验成功
        callback()
      }
    }
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      loading: false,
      checked: false,
      // 校验
      rules: {
        mobile: [
          { required: true, message: '手机号必须填写', trigger: 'blur' },
          // 手机号格式校验没有提供  需要实现自定义校验
          { validator: checkMobile, trigger: 'blur' }
        ],
        code: [
          { required: true, message: '密码必须填写', trigger: 'blur' },
          // len 输入内容必须是 6位  min max 指定字符串的范围
          { len: 6, message: '验证码6个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    getLogin () {
      this.$refs.Loginform.validate(valid => {
        console.log(valid)
        if (valid) {
          // 校验成功
          this.doLogin()
        }
      })
    },
    doLogin () {
      // console.log(this.$http)
      if (!this.checked) {
        return this.$message.warning('请同意用户协议')
      }
      this.loading = true
      this.$http
        .post('/mp/v1_0/authorizations', this.user)
        .then(res => {
          console.log(res)
          if (res.status === 201) {
            this.$message.success('登录成功')
            setTimeout(() => {
              this.$router.push('/')
            }, 500)
          }
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
    transform: translate(-50%, -60%);
    width: 400px;
    height: 350px;
    background-color: #fff;
    img {
      width: 200px;
      display: block;
      margin: 0 auto 20px;
    }
  }
}
</style>
