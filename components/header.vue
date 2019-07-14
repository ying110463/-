<template>
  <header class="header">
    <el-row type="flex" class="main" justify="space-between">
      <div class="logo">
        <nuxt-link to="/">
          <img src="http://157.122.54.189:9093/images/logo.jpg" alt />
        </nuxt-link>
      </div>
      <el-row type="flex" class="navs">
        <nuxt-link to="/">首页</nuxt-link>
        <nuxt-link to="/post">旅游攻略</nuxt-link>
        <nuxt-link to="/hotel">酒店</nuxt-link>
        <nuxt-link to="/air">国内机票</nuxt-link>
      </el-row>
      <div>
        <div v-if="!$store.state.user.userInfo.token" >
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <div >
          <el-dropdown>
            <span class="el-dropdown-link">
              <img :src="$axios.defaults.baseURL + $store.state.user.userInfo.user.defaultAvatar" alt />
              {{$store.state.user.userInfo.user.nickname}}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item @click.native="handeout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </header>
</template>

<script>
export default {
  mounted(){
console.log( this.$store.state.user.userInfo)
  },
  methods:{
    handeout(){
    this.$store.commit("user/clearUserInfo");
    this.$router.push('/user/login')
    }
  }
};
</script>
<style lang="less" scoped>
.header {
  box-shadow: 0 2px 2px #ccc;
}
.main {
  width: 1000px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
}
.logo {
  margin-right: 20px;
  img {
    width: 155px;
    height: 56px;
    margin-top: 4px;
  }
}
.navs {
  flex: 1;
  a {
    display: block;
    padding: 0 20px;
    height: 60px;
    &:hover {
      color: #409eff;
      border-bottom: 5px solid #409eff;
    
    }
  }
  .nuxt-link-exact-active {
    background: #409eff;
    color: #fff;

    &:hover {
      color: #fff;
    }
  }
}

.el-dropdown-link {
  img {
    width: 35px;
    height: 35px;
    vertical-align: middle;
  }
}
</style>


