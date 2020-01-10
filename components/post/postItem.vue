<template>
  <div class="postItem">
    <div v-for="(item,index) in articleList" :key="index">
      <!-- 三张图以内，左右结构 -->
      <div v-if="item.images.length<3" class="item leRi">
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <img v-for="(item2,index) in item.images.slice(0,1)" :key="index" :src="item2" />
        </nuxt-link>
        <div class="right">
          <nuxt-link :to="`/post/detail?id=${item.id}`">
            <h4>{{item.title}}</h4>
          </nuxt-link>
          <div class="para">{{item.summary}}</div>
          <div class="bott">
            <div class="btLF">
              <i class="el-icon-location-outline">&nbsp;{{item.cityName}}</i>
              <nuxt-link to="#">
                by
                <img
                  class="bigImg"
                  :src="`${$axios.defaults.baseURL+item.account.defaultAvatar}`"
                />
                <span>{{item.account.nickname}}</span>
              </nuxt-link>
              <i class="el-icon-view">&nbsp;{{item.watch}}</i>
            </div>
            <span class="count">{{item.like===null?0:item.like}}赞</span>
          </div>
        </div>
      </div>
      <!-- 三张图，上下结构 -->
      <div class="item" v-if="item.images.length>=3">
        <nuxt-link :to="`/post/detail?id=${item.id}`">
          <h4>{{item.title}}</h4>
        </nuxt-link>
        <div class="para">{{item.summary}}</div>
        <div class="imgs">
          <nuxt-link
            :to="`/post/detail?id=${item.id}`"
            v-for="(item1,index) in item.images.slice(0,3)"
            :key="index"
          >
            <img :src="item1" />
          </nuxt-link>
        </div>
        <div class="bott">
          <div class="btLF">
            <i class="el-icon-location-outline">&nbsp;{{item.cityName}}</i>
            <nuxt-link to="#">
              by
              <img class="bigImg" :src="`${$axios.defaults.baseURL+item.account.defaultAvatar}`" />
              <span>{{item.account.nickname}}</span>
            </nuxt-link>
            <i class="el-icon-view">&nbsp;{{item.watch}}</i>
          </div>
          <span class="count">{{item.like===null?0:item.like}}赞</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['articleList']
}
</script>

<style lang="less" scoped>
.postItem {
  .item {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
  // 左右布局
  .leRi {
    display: flex;
    justify-content: space-between;
    /deep/ a > img {
      flex: 1;
      width: 220px;
      height: 150px;
      overflow: hidden;
      margin-right: 10px;
      &:hover {
        cursor: pointer;
      }
    }
    .right {
      width: 470px;
    }
  }
}
h4 {
  font-size: 18px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
    color: orange;
  }
}
.para {
  font-size: 14px;
  line-height: 1.5;
  height: 63px;
  text-overflow: ellipsis;
  margin-bottom: 15px;
  overflow: hidden;
}
.bott {
  display: flex;
  justify-content: space-between;
  > .btLF {
    // flex: 1;
    font-size: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /deep/a {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-right: 10px;
      > span {
        color: orange;
      }
    }
    > i:nth-child(1) {
      margin-right: 10px;
    }
    .bigImg {
      width: 16px;
      height: 16px;
      border-radius: 100px;
      margin: 5px;
    }
  }
}
.count {
  font-size: 16px;
  color: orange;
}

//上下布局
.topBott {
  border-bottom: 1px solid #eee;
}
.imgs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 15px 0;
  /deep/a>img {
    width: 220px;
    height: 150px;
    object-fit: cover;
    &:hover {
      cursor: pointer;
    }
  }
}
</style>