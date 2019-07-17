<template>
  <div class="search-form">
    <!-- 头部tab切换 -->
    <el-row type="flex" class="search-tab">
      <span
        v-for="(item, index) in tabs"
        :key="index"
        @click="handleSearchTab(item, index)"
        :class="{active: index === currentTab}"
      >
        <i :class="item.icon"></i>
        {{item.name}}
      </span>
    </el-row>
    <el-form class="search-form-content" ref="form" label-width="80px">
      <el-form-item label="出发城市">
        <el-autocomplete
          v-model="form.departCity"
          :fetch-suggestions="querySearchAsync"
          placeholder="请搜索出发城市"
          @select="handleSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          v-model="form.destCity"
          :fetch-suggestions="queryDestSearch"
          placeholder="请搜索到达城市"
          @select="handleDestSelect"
          class="el-autocomplete"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <el-date-picker
          v-model="form.departDate"
          type="date"
          style="width: 100%;"
          @change="handleDate"
          placeholder="选择日期"
          default-value="2019-7-14"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label>
        <el-button style="width:100%;" type="primary" icon="el-icon-search" @click="handleSubmit">搜索</el-button>
      </el-form-item>
      <div class="reverse">
        <span @click="handleReverse">换</span>
      </div>
    </el-form>
  </div>
</template>
<script>
import moment from "moment";
export default {
  data() {
    return {
      currentTab: 0,
      tabs: [
        { icon: "iconfont icondancheng", name: "单程" },
        { icon: "iconfont iconshuangxiang", name: "往返" }
      ],
      form: {
        departCity: "", //出发城市
        departCode: "", //出发城市代码
        destCity: "", //到达城市
        destCode: "", //到达城市代码
        departDate: "" //出发日期
      }
    };
  },
  methods: {
    handleSearchTab(ietm, index) {
      this.currentTab = index;
      if (index === 1) {
        this.$confirm("目前暂不支持往返，请使用单程选票", "提示", {
          confirmButtonText: "确定",
          showCancelButton: false,
          type: "warning"
        });
      }
    },
    handleSelect(item) {
      this.form.departCity = item.value;
      this.form.departCode = item.sort;
    },
    // 到达城市
    queryDestSearch(value, cd) {
      this.querySearchCity(value).then(arr => {
        if (arr.length > 0) {
          this.form.destCity = arr[0].value;
          this.form.destCode = arr[0].sort;
        }
        cd(arr);
      });
    },
    handleDestSelect(item) {
      this.form.destCity = item.value;
      this.form.destCode = item.sort;
    },
    // 出发城市
    querySearchAsync(value, cd) {
      this.querySearchCity(value).then(arr => {
        if (arr.length > 0) {
          this.form.departCity = arr[0].value;
          this.form.departCode = arr[0].sort;
        }
        cd(arr);
      });
    },
    handleDate(value) {
      this.form.departDate = moment(value).format("YYYY-MM-DD");
    },
    handleReverse() {
      const { departCity, departCode, destCity, destCode } = this.form;
      this.form.departCity = destCity;
      this.form.departCode = destCode;
      this.form.destCity = departCity;
      this.form.destCode = departCode;
    },
    handleSubmit() {
      const rules = {
        departCity: {
          value: this.form.departCity,
          message: "请选择出发城市"
        },
        destCity: {
          value: this.form.destCity,
          message: "请选择到达城市"
        },
        departDate: {
          value: this.form.departDate,
          message: "请选择出发日期"
        }
      };

      // 验证结果，初始值是true
      let valid = true;

      Object.keys(rules).forEach(v => {
        // 如果有一次验证不通过的，直接返回
        if (!valid) return;

        // 如果字段的值为空
        if (!rules[v].value) {
          valid = false;
          this.$message.warning(rules[v].message);
          return false;
        }
      });
      if (valid) {
        this.$router.push({
          path: "/air/flights",
          query: this.form
        });
      }
    },
    // 封装城市搜索
    querySearchCity(queryString) {
      return new Promise((resolve, reject) => {
        if (!queryString.trim()) {
          resolve([]);
          return;
        }
        this.$axios({
          url: "/airs/city",
          params: {
            name: queryString
          }
        }).then(res => {
          console.log(res);
          const { data } = res.data;
          const newdata = data.map(v => {
            return {
              ...v,
              value: v.name.replace("市", "")
            };
          });
          resolve(newdata);
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.search-form {
  border: 1px #ddd solid;
  border-top: none;
  width: 360px;
  height: 350px;
  box-sizing: border-box;
}

.search-tab {
  span {
    display: block;
    flex: 1;
    text-align: center;
    height: 48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top: 3px #eee solid;
    background: #eee;
  }

  .active {
    border-top-color: orange;
    background: #fff;
  }

  i {
    margin-right: 5px;
    font-size: 18px;

    &:first-child {
      font-size: 16px;
    }
  }
}

.search-form-content {
  padding: 15px 50px 15px 15px;
  position: relative;

  .el-autocomplete {
    width: 100%;
  }
}

.reverse {
  position: absolute;
  top: 35px;
  right: 15px;

  &:after,
  &:before {
    display: block;
    content: "";
    position: absolute;
    left: -35px;
    width: 25px;
    height: 1px;
    background: #ccc;
  }

  &:after {
    top: 0;
  }

  &:before {
    top: 60px;
  }

  span {
    display: block;
    position: absolute;
    top: 20px;
    right: 0;
    font-size: 12px;
    background: #999;
    color: #fff;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,
    &:before {
      display: block;
      content: "";
      position: absolute;
      left: 10px;
      width: 1px;
      height: 20px;
      background: #ccc;
    }

    &:after {
      top: -20px;
    }

    &:before {
      top: 20px;
    }
  }
}
</style>


