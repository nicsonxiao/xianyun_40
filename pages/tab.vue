<template>
  <div class="postList">
    <div class="cate">
      <span
        class="cateItem"
        v-for="(item,index) in postList.name"
        :key="index"
        @click="handleClick(index)"
        :class="{active:current===index}"
      >{{item}}</span>
    </div>
      <ul v-if="current===0">
        <li v-for="(item,index) in postList.content.news" :key="index">{{item}}</li>
      </ul>
      <ul v-if="current===1">
        <li v-for="(item,index) in postList.content.sport" :key="index">{{item}}</li>
      </ul>
      <ul v-if="current===2">
        <li v-for="(item,index) in postList.content.play" :key="index">{{item}}</li>
      </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      postList: {
        name: ['新闻', '体育', '娱乐'],
        content: {
          news: ['新闻1', '新闻2', '新闻3'],
          sport: ['体育1', '体育2', '体育3'],
          play: ['娱乐1', '娱乐2', '娱乐3']
        }
      },
      current: 0
    }
  },
  methods: {
    handleClick(index) {
      this.current = index
    }
  }
}
</script>

<style lang="less" scoped>
.postList {
  width: 800px;
  margin: 100px auto;
  .cate {
    margin-bottom: 10px;
    .cateItem {
      font-size: 20px;
      margin-right: 10px;
      &.active {
        border-bottom: 2px solid red;
      }
    }
  }
}
</style>