<template>
  <el-form :model="form" :rules="rules" ref="form" class="ruleForm-item">
    <el-form-item prop="phone" class="ruleForm-item">
      <el-input v-model="form.phone" placeholder="请输入手机号"></el-input>
    </el-form-item>
    <el-form-item prop="captcha" class="form-item">
      <el-input v-model="form.captcha" placeholder="验证码">
        <template slot="append">
          <el-button class="formtext" @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="nickname" class="ruleForm-item">
      <el-input v-model="form.username" placeholder="你的名字"></el-input>
    </el-form-item>
    <el-form-item prop="password" class="ruleForm-item">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-form-item prop="checkPassword" class="ruleForm-item">
      <el-input v-model="form.password" placeholder="确定密码" type="password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" class="submit" @click="handleRegSubmit" >注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data() {
    return {
      form: {
        phone: "",
        captcha: "",
        nickname: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        phone: [
          {
            required: true,
            type: "number",
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
        checkPassword: [
          { required: true, trigger: "blur", message: "请确认密码是否一致" }
        ]
      }
    };
  },
  methods:{
    //   发送验证？
      handleSendCaptcha(){
          this.$axios({
              url:'/captchas',
              data:this.form.phone
          })

      },
    //   注册用？
      handleRegSubmit(){
     this.$refs.form.validate(valid=>{
         if(valid){
             this.$axios({
                 url:'/accounts/register',
                 method:'POST',
                 data:this.form
             }).then(res=>{
                 console.log(res)
             })
         }
     })
      }

  }
};
</script>
<style lang="less" scoped>
.ruleForm-item {
  padding: 5px 20px;
  .form-item {
    padding: 5px 20px;
    .formtext{
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


