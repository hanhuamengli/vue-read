<template>
  <transition name="slide-down">
    <div class="title_wrapper" v-show="isShow">
      <div class="left">
        <span class="icon icon-back"></span>
      </div>
      <div class="right">
        <div class="icon_wrapper">
          <span class="icon icon-cart"></span>
        </div>
        <div class="icon_wrapper">
          <span class="icon icon-person"></span>
        </div>
        <div class="icon_wrapper">
          <span class="icon icon-share"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Title",
    props:{
      isShow:{
        type:Boolean,
        default:false
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  .title_wrapper{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    height: px2rem(44);
    background-color: white;
    z-index: 101;
    box-shadow: 0 0 px2rem(3) px2rem(3) rgba(0,0,0,.15);
    -webkit-box-shadow: 0 0 px2rem(3) px2rem(3) rgba(0,0,0,.15);
    display: flex;
    display:-webkit-box;
  .left{
    flex: 0 0 px2rem(60);
  }
  .right{
    flex:1;
    display: flex;
    display:-webkit-box;
    justify-content: flex-end;
  .icon_wrapper{
    /*flex:1;*/
    flex: 0 0 px2rem(40);
  @include center;
  }
  }

  }
</style>
