<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <!-- @change="handleAirport" -->
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            :label="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- @change="handleFlightTimes" -->
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
            :label="`${item.from}:00 - ${item.to}:00`"
            :value="`${item.from},${item.to}`"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- @change="handleCompany" -->
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            :label="item"
            v-for="(item,index) in data.options.company"
            :key="index"
            :value="item"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <!-- @change="handleAirSize" -->
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            v-for="(item,index) in flightSize"
            :key="index"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{filterData}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      //筛选，过滤
      airport: '', // 机场
      flightTimes: '', // 出发时间
      company: '', // 航空公司
      airSize: '', // 机型大小

      //飞机的大小
      flightSize: [
        { label: '大', value: 'L' },
        { label: '中', value: 'M' },
        { label: '小', value: 'S' }
      ]
    }
  },
  //计算（监听）属性,属性发生变化就会跟随重新计算，前提是要调用此方法
  computed: {
    //多个条件过滤
    filterData(){
      const arr=this.data.flights.filter(v=>{
          //默认每条数据都是符合条件
          let valid=true

          //起飞机场
          if(this.airport && v.org_airport_name!==this.airport){
            valid=false
          }

          //起飞时间
          if(this.flightTimes){
            //this.flightTimes起飞时间
            const [from,to]=this.flightTimes.split(',')
            //飞机出发时间
            const start=+v.dep_time.split(':')[0]
            if(start<from || start>=to){
              valid=false
            }
          }

          //公司
          if(this.company && v.airline_name!==this.company){
            valid=false
          }

          //飞机机型
          if(this.airSize && v.plane_size!==this.airSize){
            valid=false
          }

          return valid
      })

      this.$emit('setDataList',arr)
      return ""
    }
  },
  methods: {
    // 选择机场时候触发
    // handleAirport(value) {
    //   const arr = this.data.flights.filter(v => {
    //     return (v.org_airport_name = value)
    //   })
    //   this.$emit('setDataList', arr)
    // },

    // 选择出发时间时候触发
    // handleFlightTimes(value) {
    //   const [from, to] = value.split(',')
    //   const arr = this.data.flights.filter(v => {
    //     const start = v.dep_time.split(':')[0]
    //     return start >= +from && start < +to
    //   })
    //   this.$emit('setDataList', arr)
    // },

    // // 选择航空公司时候触发
    // handleCompany(value) {
    //   // 修改父组件中flightsData中的flights
    //   // 过滤后数组
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.airline_name
    //   })

    //   // 触发父组件的修改dataList的函数
    //   this.$emit('setDataList', arr)
    // },

    // // 选择机型时候触发
    // handleAirSize(value) {
    //   // console.log(value);
    //   const arr = this.data.flights.filter(v => {
    //     return value === v.plane_size
    //   })
    //   this.$emit('setDataList', arr)
    // },

    // 撤销条件时候触发
    handleFiltersCancel() {
      this.airport='', // 机场
      this.flightTimes='', // 出发时间
      this.company='', // 航空公司
      this.airSize=''// 机型大小
    }
  }
}
</script>

<style scoped lang="less">
.filters {
  margin-bottom: 20px;
}

.filters-top {
  > div {
    /deep/ .el-select {
      margin-left: 10px;
    }
  }
}

.filter-cancel {
  margin-top: 10px;
}
</style>