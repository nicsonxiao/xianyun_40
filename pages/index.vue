<template>
  <div class="container">
    <!-- 幻灯片 -->
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
        <!-- <img :src="`${$axios.defaults.baseURL+item.url}`" alt=""> -->
      </el-carousel-item>
    </el-carousel>
    <!-- 搜索栏 -->
    <div class="search-center">
      <el-row type="flex">
        <el-col>攻略</el-col>
        <el-col>酒店</el-col>
        <el-col>机票</el-col>
      </el-row>
      <el-row type="flex">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: []
    }
  },
  mounted() {
    this.$axios({
      url: '/scenics/banners'
    }).then(res => {
      // console.log(res)
      //解构，获取data数据
      const { data } = res.data
      //赋值给banners
      this.banners = data
    })
  }
}
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
    width: 100%;
    height: 100%;
  }
}
html {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
}
</style>