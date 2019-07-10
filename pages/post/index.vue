<template>
  <div>
    旅游攻略首页
    <br/>
    <span
      v-for="(item,index) in ['美食','美景','美人']"
      :key="index"
      @click="handles(index)"
    >{{item}}</span>

    <div v-if="covst===0">
      <ul>
        <li>湘菜</li>
        <li>川菜</li>
        <li>粤菜</li>
      </ul>
    </div>
    <div v-if="covst===1">
      <ul>
        <li>张家界</li>
        <li>故宫</li>
        <li>长城</li>
      </ul>
    </div>
    <div v-if="covst===2">
      <ul>
        <li>晓晓</li>
        <li>林林</li>
        <li>红红</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
  covst:0
        }
    },
    methods:{
        handles(index){
        this.covst=index
        }
    }
    

}

</script>
<style lang="less">
span{
    padding: 10px;
    font-size: 20px;
    font-weight: 600;
  
    
}
span a:focus{
    color: #fff;
        background-color: red;
    }
ul{
    list-style: none;
    color:gold;
    font-size:18px;
}
</style>


