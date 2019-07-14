

<template>
  <div class="container">
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <el-row type="flex" justify="center" align="middle" class="tabs">
          <span
            :class="{active:currentTab===index}"
            v-for="(item,index) in ['登录','注册']"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>
        <LoginFrom v-if="currentTab==0" />
        <RegisterFrom v-if="currentTab==1" />
      </div>
    </el-row>
  </div>
</template>

<script>
import LoginFrom from "@/components/user/loginFrom.vue";
import RegisterFrom from "@/components/user/registerFrom.vue";
export default {
  data() {
    return {
      currentTab: 0
    };
  },
  components: {
    LoginFrom,
    RegisterFrom
  },
  methods: {
    handleChangeTab(index) {
      this.currentTab = index;
    }
  }
};
</script>

<style lang="less" scoped>
div.container {
  background: url(http://157.122.54.189:9095/assets/images/th01.jfif) center 0;
  height: 700px;
  min-width: 1000px;
  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;
    div.form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      .tabs {
        span {
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;

          &.active {
            color: orange;
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>

