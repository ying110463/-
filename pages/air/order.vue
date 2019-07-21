<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <!-- <orderfilter @setInfoData='setInfoData' /> -->
      <orderfilter />
      <orderAside :data='$store.state.air.infoData' />

      <!-- 侧边栏 -->
      <div class="aside"></div>
    </el-row>
  </div>
</template>
<script>
import orderfilter from "@/components/air/orderfilter";
import orderAside from '@/components/air/orderAside'
export default {
  data() {
    return {
      // infoData: {
      //   seat_infos: {}
      // }
    };
  },
  components: {
    orderfilter,
    orderAside
  },
  methods: {
    // setInfoData(data) {
    //   // console.log(data)
    //   this.infoData = data;
    // }
  }
};
</script>
<style lang="less" scoped>
.container {
  width: 1000px;
  margin: 20px auto;
}
</style>


