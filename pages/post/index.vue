<template>
  <div class="container">
    <el-row type="flex" justify="space-between" class="main">
      <!-- 左边导航 -->
      <PostMenus @searchCity="searchCity" />
      <!-- 右边攻略列表 -->
      <div class="post-wrapper">
        <!-- 文章搜索部分 -->
        <PostSearch :city="city" @searchCity="searchCity" />
        <!-- 文章列表部分 -->
        <PostItem :articleList="articleList" />
        <!-- 分页 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
import PostMenus from '@/components/post/postMenus.vue'
import PostSearch from '@/components/post/postSearch.vue'
import PostItem from '@/components/post/postItem.vue'
export default {
  data() {
    return {
      // articleList: [],
      AllarticleList: [],
      city: '',
      total: 0,
      currentPage: 1,
      pageSize: 3
    }
  },
  components: {
    PostMenus,
    PostSearch,
    PostItem
  },
  mounted() {
    this.getArticleList()
  },
  methods: {
    searchCity(city) {
      this.city = city
      // console.log(this.city)
    },
    //文章列表
    getArticleList(params) {
      this.$axios({
        url: '/posts',
        params
      }).then(res => {
        //文章列表
        if (res.data) {
          // this.articleList = res.data.data
          // 备份
          this.AllarticleList = [...res.data.data]
          this.total = this.AllarticleList.length
          console.log(this.AllarticleList)
          // this.articleList = this.articleList.slice(
          //   (this.currentPage - 1) * this.pageSize,
          //   this.currentPage * this.pageSize
          // )
        }
      })
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      // this.articleList = this.AllarticleList.slice(
      //   (this.currentPage - 1) * this.pageSize,
      //   this.currentPage * this.pageSize
      // )
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.currentPage = val
      // this.articleList = this.AllarticleList.slice(
      //   (this.currentPage - 1) * this.pageSize,
      //   this.currentPage * this.pageSize
      // )
    }
  },
  computed: {
    articleList() {
      return this.AllarticleList.slice(
        (this.currentPage - 1) * this.pageSize,
        this.currentPage * this.pageSize
      )
    }
  },
  watch: {
    city() {
      this.getArticleList({
        city: this.city
      })
    }
  }
}
</script>

<style lang="less">
.container {
  .main {
    width: 1000px;
    margin: 0 auto;
    padding: 20px 0;
  }
  /deep/.post-wrapper {
    width: 700px;
  }
}
</style>