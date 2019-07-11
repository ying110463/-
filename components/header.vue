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
        <div v-if="false">
          <nuxt-link to="/user/login">登录/注册</nuxt-link>
        </div>
        <div>
          <el-dropdown>
            <span class="el-dropdown-link">
              <img src="http://157.122.54.189:9095/assets/images/avatar.jpg" alt />
              动力十足
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>个人中心</el-dropdown-item>
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-row>
  </header>
</template>

<script>
export default {};
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


