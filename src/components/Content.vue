<template>
<transition name="slide-right">
  <div class="content_wrapper">
    <div class="content-item"  v-if="bookAvailable" v-for="(item,index) in navigation.toc" :key="index" @click="jumpTo(item.href)">
      <span class="text">{{item.label}}</span>
    </div>
    <div class="loading" v-else>加载中...</div>
  </div>
</transition>
</template>

<script>
  export default {
    name: "Content",
    props:{
      isShowContent:Boolean,
      bookAvailable:Boolean,
      navigation:Object
    },
    methods:{
      jumpTo(target){
        this.$emit('jumpTo',target);
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  .content_wrapper{
    height:100%;
    width:50%;
    display:flex;
    display:-webkit-box;
    flex-direction: column;
    z-index:101;
    .content-item{
      flex:0 0 px2rem(20);
      border:px2rem(1) solid #ccc;
      background-color: white;
      .text{
        color:#333;
        font-size: px2rem(14);
        @include center;
      }
    }
    .loading{
      @include center;
    }
  }
</style>
