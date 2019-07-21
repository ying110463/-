<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" v-model="users[index].username" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" v-model="users[index].id" class="input-with-select">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
                <!-- <el-option label="护照" value="2" :checked="true"></!-->
                -->
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUse(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers()">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in infoData.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}：￥${ item.price } 最高赔付${ item.compensation }`"
            @change="handleIsurances( item )"
            border
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input placeholder="请输入内容" v-model="contactPhone">
              <template slot="append">
                <el-button @click="handleSendCaptcha">发送验证码</el-button>
              </template>
            </el-input>
          </el-form-item>
          <input type="hidden" v-model="allPrice" />
          <el-form-item label="验证码">
            <el-input v-model=" captcha "></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setTimeout } from "timers";
import { constants } from 'crypto';
export default {
  data() {
    return {
      users: [
        {
          username: "",
          id: ""
        }
      ],
      insurances: [],
      contactName: "",
      contactPhone: "",
      invoice: false,
      captcha: "",
      seat_xid: "",
      air: "",
      infoData: {
        // 接口返回的数据集合
        insurances: [],
        seat_infos: {}
      }
    };
  },
  computed: {
    allPrice() {
      if (!this.infoData.airport_tax_audlet) return "";
      let price = 0;
      price += this.infoData.seat_infos.settle_price;
      price += this.infoData.airport_tax_audlet;
      price += this.insurances.length * 30;
      price *= this.users.length;
      this.$store.commit("air/setAllPrice", price);
      return price;
    }
  },
  mounted() {
    const { id, seat_xid } = this.$route.query;
    this.$axios({
      url: "/airs/" + id,
      params: {
        seat_xid
      }
    }).then(res => {
      // const {data} = res
      this.infoData = res.data;
      console.log(res.data);
      this.$store.commit("air/setInfoData", res.data);
    });
  },
  methods: {
    // 添加乘机人
    handleAddUsers() {
      this.users.push({
        username: "",
        id: ""
      });
    },

    // 移除乘机人
    handleDeleteUse(index) {
      this.users.splice(index, 1);
    },
    handleIsurances(item) {
      // console(item);
      const index = this.insurances.indexOf(item.id);
      if (index > -1) {
        this.insurances.splice(index, 1);
      } else {
        this.insurances.push(item.id);
      }
    },

    // 发送手机验证码
    handleSendCaptcha() {
      if (!this.contactPhone) {
        this.$alert("请输入手机号码", "提示", {
          type: "warning"
        });
        return;
      }
      this.$store.dispatch("user/sendCode", this.contactPhone).then(code => {
        this.$alert(`验证码: ${code}`, "提示", {
          type: "warning"
        });
      });
    },

    // 提交订单
    handleSubmit() {
      const data = {
        users: this.users,
        insurances: this.insurances,
        contactName: this.contactName,
        contactPhone: this.contactPhone,
        invoice: this.invoice,
        captcha: this.captcha,

        seat_xid: this.$route.query.seat_xid,
        air: this.$route.query.id
      };

      const rules = {
        users: {
          value: this.users[0].username && this.users[0].id,
          message: "乘机人不能为空"
        },
        contactName: {
          value: this.contactName,
          message: "联系人不能空"
        },
        contactPhone: {
          value: this.contactPhone,
          message: "联系电话不能空"
        },
        captcha: {
          value: this.captcha,
          message: "手机验证码不能空"
        }
      };

      let invalid = true;
      Object.keys(rules).forEach(v => {
        if (!invalid) return;
        if (!rules[v].value) {
          invalid = false;
          this.$message.warning(rules[v].message);
        }
      });
      if (!invalid) return;

      this.$axios({
        url: "/airorders",
        method: "POST",
        data,
        headers: {
          Authorization: `Bearer ${this.$store.state.user.userInfo.token}`
        }
      }).then(res => {
        this.$message.success("订单提交成功，正在跳转...");
        const { data } = res.data;
        setTimeout(() => {
          this.$router.push("/air/pay?id=" + data.id);
        }, 1500);
      });
    }
  }
};
</script>

<style scoped lang="less">
.air-column {
  border-bottom: 1px #ddd dashed;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.air-column h2 {
  margin-bottom: 20px;
  font-size: 22px;
  font-weight: normal;
}

/deep/ .el-select .el-input {
  width: 130px;
}

.input-with-select {
  width: 590px;
}

.input-with-select /deep/ .el-input-group__prepend {
  background-color: #fff;
}
.member-info /deep/ .el-form-item {
  margin-bottom: 0;
}

.member-info-item {
  border-bottom: 1px #eee dashed;
  padding-bottom: 20px;
  position: relative;

  &:first-child {
    .delete-user {
      display: none;
    }
  }
}

.add-member {
  margin-top: 20px;
}

.delete-user {
  display: block;
  background: #ddd;
  width: 16px;
  height: 16px;
  font-size: 14px;
  text-align: center;
  line-height: 16px;
  color: #fff;
  cursor: pointer;
  border-radius: 50px;
  position: absolute;
  right: -30px;
  top: 50%;
}

.insurance {
  > div {
    margin-top: 10px;
  }
}

.insurance-item {
  margin-bottom: 20px;
}

.contact {
  /deep/ .el-input {
    width: 50%;
  }
}

.submit {
  margin: 50px auto;
  display: block;
  width: 250px;
  height: 50px;
}
</style>