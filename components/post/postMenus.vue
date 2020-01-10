<template>
    <div class="menus-wrapper">
      <!-- 左侧导航栏 -->
      <!-- 左上导航 -->
      <div class="left-nav">
        <div class="top-nav">
          <!-- 导航大标题 -->
          <ul class="big-nav">
            <li
              v-for="(item,index) in cityList"
              :key="index"
              @mouseenter="handleShow(index)"
              @mouseleave="handleHide()"
              :class="{noBr:currentId===index}"
            >
              {{item.type}}
              <i class="el-icon-arrow-right"></i>
              <ul class="small-nav" v-if="currentId===index">
                <li v-for="(item,index) in item.children" :key="index">
                  <h4>{{index + 1}}</h4>
                  <span @click="handleCity(item.city)">{{item.city}}</span>
                  <span @click="handleCity(item.city)">{{item.desc}}</span>
                </li>
              </ul>
            </li>
          </ul>
          <!-- 导航小标题 -->
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      currentId: 5,
      cityList: []
    }
  },
  mounted() {
    //城市列表
    this.$axios({
      url: '/posts/cities'
    }).then(res => {
      // console.log(res)
      this.cityList = res.data.data
    })
  },
  methods: {
    //鼠标移入显示
    handleShow(index) {
      this.currentId = index
    },
    //鼠标移出隐藏
    handleHide(index) {
      this.currentId = index
    },
    //鼠标点击搜索
    handleCity(city){
      this.$emit('searchCity',city)
    }
  }
}
</script>

<style lang="less" scoped>
  .menus-wrapper {
    width: 260px;
    .left-nav {
      .top-nav {
        position: relative;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        .big-nav {
          > li {
            cursor: pointer;
            height: 40px;
            line-height: 40px;
            font-size: 14px;
            padding: 0 20px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            align-items: center;
            &.noBr {
              border-right: none;
            }
          }
        }
        .small-nav {
          // display: none;
          position: absolute;
          left: 259px;
          top: -1px;
          box-sizing: border-box;
          width: 350px;
          padding: 10px 20px;
          background: #fff;
          border: 1px solid #ddd;
          z-index: 2;
          > li {
            display: flex;
            font-size: 14px;
            align-items: center;
            line-height: 1.5;
            > h4 {
              font-size: 24px;
              color: #ffa500;
            }
            > span:nth-child(2) {
              color: orange;
              margin: 0 10px;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
            > span:nth-child(3) {
              color: #999;
              &:hover {
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
  }
</style>