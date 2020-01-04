<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件  子传父，父组件接收位置--> 
        <FlightsFilters :data="flightsData" @setDataList="setDataList"/> 

        <!-- 航班头部布局 -->
        <FlightsListHead />

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in dataList" :key="index" :data="item" />
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageIndex"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
      </div>
    </el-row>
  </section>
</template>

<script>
import moment from 'moment'
import FlightsListHead from '@/components/air/flightsListHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import FlightsFilters from '@/components/air/flightsFilters.vue'

export default {
  data() {
    return {
      flightsData: {
        flights:[],
        info: {},
        options:{},
        company:{}
      },
      // dataList: [],
      pageIndex: 1,
      pageSize: 5,
      total: 0
    }
  },
  components: {
    FlightsListHead,
    FlightsItem,
    FlightsFilters
  },
  mounted() {

    this.$axios({
      url: '/airs',
      params: this.$route.query //路由传参过来的5个参数（对象）
    }).then(res => {
      console.log(res)
      this.flightsData = res.data
      // this.dataList = this.flightsData.flights.slice(0, 5)
      this.total = this.flightsData.total
    })
  },
  computed: {
    //计算属性，只要dataList中的一个属性发生变化，就会重新计算
    dataList(){
      if(!this.flightsData.flights) return []

      return  this.flightsData.flights.slice(
        (this.pageIndex - 1) * this.pageSize,
        this.pageIndex * this.pageSize
      )
    }
  },
  methods: {
    //切换每页显示条数
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`)
      this.pageSize = val
      // this.dataList = this.flightsData.flights.slice(
      //   (this.pageIndex - 1) * this.pageSize,
      //   this.pageIndex * this.pageSize
      // )
    },
    //切换页码时触发
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      this.pageIndex = val
      // this.dataList = this.flightsData.flights.slice(
      //   (this.pageIndex - 1) * this.pageSize,
      //   this.pageIndex * this.pageSize
      // )
    },
    //子传父，父组件接收并触发的事件
    setDataList(arr){
        this.flightsData.flights=arr
    }
  }
}
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>