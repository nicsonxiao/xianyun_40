<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付金额
        <span class="pay-price">￥{{orderData.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
//链接转成二维码插件
import QRCode from 'qrcode'

export default {
  data() {
    return {
      //订单详情
      orderData: {},

      //定时器
      timerId: false
    }
  },
  methods: {
    checkPay() {
      //检查订单支付状态

      this.timerId = setInterval(() => {
        //支付金额，订单编号

        this.$axios({
          url: 'airorders/checkpay',
          method:'POST',
          headers: {
            Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
          },
          data: {
            id: this.orderData.id,
            nonce_str: this.orderData.price,
            out_trade_no: this.orderData.orderNo
          }
        }).then(res => {
            // console.log(res);
            
          if (res.data.statusTxt !== '订单未支付') {
            //提示
            this.$alert('订单支付成功', '提示')
            //清除定时器
            clearInterval(this.timerId)
            this.$router.push({
                path:'/air/'
            })
          }
        })
      }, 3000)
    }
  },
  mounted() {
    const id = this.$route.query.id
    //由于数据异步
    setTimeout(() => {
      this.$axios({
        url: '/airorders/' + id,
        headers: {
          Authorization: 'Bearer ' + this.$store.state.user.userInfo.token
        }
      }).then(res => {
        console.log(res)
        this.orderData = res.data

        const canvas = document.getElementById('qrcode-stage')
        const codeUrl = this.orderData.payInfo.code_url
        QRCode.toCanvas(canvas, codeUrl, {
          width: 200
        })
      })
      this.checkPay()
    }, 1)
  },
  destroyed() {
    //组件卸载时清除定时器
    clearInterval(this.timerId)
  }
}
</script>

<style lang="less" scoped>
.container {
  background: #f5f5f5;
  padding: 30px 0;
  .main {
    width: 1000px;
    margin: 0 auto;
    .pay-title {
      text-align: right;
      .pay-price {
        font-size: 28px;
        color: #ff4500;
      }
    }
    .pay-main {
      padding: 30px;
      background: #fff;
      border-top: 5px solid orange;
      margin-top: 10px;
      > h4 {
        font-size: 28px;
        font-weight: 400;
        margin-bottom: 10px;
      }
      .pay-qrcode {
        padding: 0 80px;
        .qrcode {
          padding: 15px;
          border: 1px solid #ddd;
          height: fit-content;
          > p {
            line-height: 2;
            text-align: center;
          }
          #qrcode-stage {
            width: 200px;
            height: 200px;
          }
        }
      }
    }
  }
}
</style>