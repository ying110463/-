<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="ruleForm">
    <el-form-item prop="username" class="ruleForm-item">
      <el-input v-model="ruleForm.username" placeholder="用户名/手机"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="ruleForm-item">
      <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>
    <el-button type="primary" class="submit" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, trigger: "blur", message: "请输入用户名" }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }]
      }
    };
  },
  methods: {
    handleLoginSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          //   this.$axios({
          //     url: "/accounts/login",
          //     data: this.ruleForm,
          //     method: "POST"
          //   }).then(res => {
          //     this.$store.commit("user/setUserInfo", res.data);
          //     // console.log(res.data);
          //     this.$router.push("/");
          //   });
          this.$store.dispatch("user/login", this.ruleForm).then(res => {
            this.$message({
              message: "登录成功",
              type: "success"
            });
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ruleForm {
  padding: 25px;
  .ruleForm-item {
    margin-bottom: 15px;
  }

  .form-text {
    font-size: 14px;
    text-align: right;
    line-height: 1;
    color: #666;
  }

  .submit {
    width: 100%;
    margin-top: 10px;
  }
}
</style>


