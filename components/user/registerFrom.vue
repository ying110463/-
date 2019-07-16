<template>
  <el-form :model="form" :rules="rules" ref="form" class="ruleForm-item">
    <el-form-item prop="username" class="ruleForm-item">
      <el-input v-model="form.username" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item prop="captcha" class="form-item">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button class="formtext" @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" class="ruleForm-item">
      <el-input v-model="form.nickname" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="ruleForm-item">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword" class="ruleForm-item">
      <el-input v-model="form.checkPassword" placeholder="确定密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit" @click="handleRegSubmit">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "请输入手机号"
          }
        ],
        captcha: [
          {
            required: true,
            trigger: "blur",
            message: "请输入验证码"
          }
        ],
        nickname: [
          { required: true, trigger: "blur", message: "请输入你的名字" }
        ],
        password: [{ required: true, trigger: "blur", message: "请输入密码" }],
        checkPassword: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  methods: {
    //   发送验证？
    handleSendCaptcha() {
      const phoneNumber = this.form.username;
      console.log(phoneNumber);
      if (!phoneNumber.trim()) {
        this.$confirm("手机号码不能为空", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
        return;
      }
      this.$store.dispatch('user/sendCode',phoneNumber).then(res=>{
        this.$confirm("验证码为:" + `${res}`, "提示", {
        confirmButtonText: "确定",
        showCancelButton: false,
        type: "warning"
      });
      })
    },
    //   注册用？
    handleRegSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const { checkPassword, ...props } = this.form;
          this.$axios({
            url: "/accounts/register",
            method: "POST",
            data: props
          }).then(res => {
            console.log(res);
            this.$router.push("/");
          });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ruleForm-item {
  padding: 5px 20px;
  .form-item {
    padding: 5px 20px;
    .formtext {
      font-size: 16px;
      color: #888;
      text-align: center;
    }
  }
  .submit {
    width: 100%;
    margin-top: 15px;
  }
}
</style>


