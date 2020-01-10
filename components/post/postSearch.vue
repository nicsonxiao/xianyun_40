<template>
  <div class="postSearch">
    <!-- 搜索栏部分 -->
    <div class="search">
      <input
        type="text"
        placeholder="请输入想去的地方，比如：'广州'"
        class="search-input"
        :value="city"
        ref="input"
      />
      <i class="el-icon-search" @click="handleCitys()"></i>
      <div class="recom">
        <span>推荐：</span>
        <span
          v-for="(item,index) in ['广州','上海','北京']"
          :key="index"
          @click="handleCity(item)"
        >{{item}}</span>
      </div>
    </div>
    <!-- 文章列表部分 -->
    <div class="content">
      <!-- 标题和写游记 -->
      <div class="title">
        <h4>推荐攻略</h4>
        <el-button type="primary" icon="el-icon-edit">写游记</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      citys: ''
    }
  },
  props: ['city'],
  watch: {
    city() {
      document.querySelector('.search-input').value = this.city
    }
  },
  methods: {
    //搜索按钮
    handleCitys(citys) {
      citys = document.querySelector('.search-input').value
      this.$emit('searchCity', citys)
    },
    //鼠标点击搜索
    handleCity(city) {
      this.$emit('searchCity', city)
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  position: relative;
  .search-input {
    width: 100%;
    box-sizing: border-box;
    height: 40px;
    line-height: 40px;
    border: 3px solid orange;
    padding: 0 20px;
    outline: none;
  }
  .el-icon-search {
    position: absolute;
    top: 8px;
    right: 15px;
    color: orange;
    font-size: 24px;
    font-weight: 700;
    cursor: pointer;
  }
  .recom {
    color: #666;
    font-size: 12px;
    padding: 10px 0;
    > span {
      margin-right: 5px;
      &:nth-child(2n):hover,
      &:nth-child(3):hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding: 0 0 10px;
  border-bottom: 1px solid #eee;
  > h4 {
    color: #ffa500;
    font-size: 18px;
    font-weight: normal;
    &::after {
      display: block;
      content: '';
      width: 72px;
      height: 2px;
      background: orange;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>