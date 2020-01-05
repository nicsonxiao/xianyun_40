<template>
  <div class="container">
    <el-row type="flex" justify="space-between">
      <!-- 订单表单 -->
      <OrderForm :data="infoData" />

      <!-- 侧边栏 -->
      <OrderAside :data="infoData" />
    </el-row>
  </div>
</template>

<script>
import OrderForm from '@/components/air/orderForm.vue'
import OrderAside from '@/components/air/orderAside.vue'
export default {
  data() {
    return {
      infoData: {
        seat_infos: {}
      }
    }
  },
  mounted() {
    //获取动态id和seat_xid
    const { id, seat_xid } = this.$route.query
    this.$axios({
      url: '/airs/' + id,
      params: {
        seat_xid
      }
    }).then(res => {
      this.infoData = res.data
    })
  },
  components: {
    OrderForm,
    OrderAside
  }
}
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