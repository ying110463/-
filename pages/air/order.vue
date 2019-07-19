<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <orderfilter />

      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>
<script>
import orderfilter from "@/components/air/orderfilter";
export default {
  components: {
    orderfilter
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}

/*aside*/
.aside {
  width: 350px;
  height: fit-content;
  border: 1px #ddd solid;
}
</style>


