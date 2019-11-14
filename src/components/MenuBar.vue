<template>
  <div class="menuBar">
  <transition name="slide-up">
    <div class="menu_wrapper" v-show="isShow" :class="{'showBoxShadow':settingShow ||!isShow}">
      <div class="icon_wrapper">
        <span class="icon icon-more" @click="showSetting(3)"></span>
      </div>
      <div class="icon_wrapper">
        <span class="icon icon-progress" @click="showSetting(2)"></span>
      </div>
      <div class="icon_wrapper">
        <span class="icon icon-bright" @click="showSetting(1)"></span>
      </div>
      <div class="icon_wrapper" @click="showSetting(0)">
        <span class="icon">A</span>
      </div>
    </div>
  </transition>
  <transition name="slide-up">
    <div class="setting_wrapper" v-show="settingShow">
      <div class="setting" v-if="tag===0">
        <div class="preview" :style="{fontSize:fontSizeList[0].fontsize+'px'}">A</div>
        <div class="select">
          <div class="select_wrapper" v-for="(item,index) in fontSizeList" :key="index" @click="setFontSize(item)">
            <div class="line"></div>
            <div class="point_wrapper" v-show="item.fontsize === defaultFontSize">
              <div class="point">
                <div class="in_point"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
        </div>
        <div class="preview" :style="{fontSize:fontSizeList[fontSizeList.length-1].fontsize+'px'}">A</div>
      </div>
      <div class="settingTheme" v-else-if="tag ===1">
        <div class="setting-theme-item" v-for="(item,index) in themeList" :key="index" @click="setTheme(index)">
          <div class="Theme" :style="{background:item.style.body.background}" :class="{'no-boder':index===0}"></div>
          <div class="text" :class="{'selected':index===defaultTheme}">{{item.name}}</div>
        </div>
      </div>
      <div class="settingProgress" v-else-if="tag ===2">
        <div class="progress_wrapper">
          <input type="range" max="100" min="0" step="1"
                 @change="onProgressChange($event.target.value)"
                 @input = "onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress"
          />

        </div>
        <div class="text_wrapper">
          <span class="text">{{bookAvailable ? progress+"%" :"加载中。。。"}}</span>
        </div>
      </div>
    </div>
  </transition>
  <transition name="fade">
    <div class="content-mask"
         v-show="isShowContent"
         @click="hideContent()">
      <ContentView :isShowContent="isShowContent"
                   v-show="isShowContent"
                   :bookAvailable="bookAvailable" :navigation="navigation" @jumpTo="jumpTo">
      </ContentView>
    </div>
  </transition>
  </div>
</template>

<script>
  import ContentView from '@/components/Content'
  export default {
    name: "MenuBar",
    components:{
      ContentView
    },
    props:{
      isShow:{
        type:Boolean,
        default:false
      },
      fontSizeList:{
        type:Array
      },
      defaultFontSize:{
        type:Number
      },
      themeList:Array,
      defaultTheme:Number,
      bookAvailable:Boolean,
      navigation:Object
    },
    data(){
      return {
        settingShow:false,
        tag:0,
        progress:0,
        isShowContent:false
      }
    },
    methods:{
      hideContent(){
       this.isShowContent = false;
       this.settingShow = false
      },
      jumpTo(target){
        this.$emit('jumpTo',target)
      },
      showSetting(tag){
        this.tag=tag;
        if(tag ===3){
          this.settingShow = false;
          this.isShowContent = true;
        }
        else{
          this.settingShow = true;
        }
      },
      setFontSize(item){
        /*子传父*/
        this.$emit("setFontSize",item.fontsize);
      },
      setTheme(index){
        this.$emit("setTheme",index);
      },
      /*拖动进度条时触发事件*/
      onProgressInput(progress){
        this.progress = progress;
        this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
      },
      /*进度条松开后触发事件，根据进度条数值跳转到指定页面*/
      onProgressChange(progress){
        this.$emit('onProgressChange',progress)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '../assets/styles/global.scss';
  .menuBar{
    .menu_wrapper{
      position:absolute;
      bottom: 0;
      left:0;
      width:100%;
      height: px2rem(44);
      background-color: white;
      z-index: 101;
      box-shadow: 0 0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
      -webkit-box-shadow: 0 0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
      display: flex;
      display:-webkit-box;
      &.showBoxShadow{
        box-shadow:none;
        -webkit-box-shadow:none;
      }
      .icon_wrapper{
        flex:1;
        justify-content: center;
        @include center;
      }
    }
    .setting_wrapper{
      z-index: 100;
      position:absolute;
      left:0;
      bottom:px2rem(40);
      width:100%;
      height:px2rem(50);
      background-color: white;
      /*z-index:101;*/
      box-shadow: 0 0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
      -webkit-box-shadow: 0 0 px2rem(4) px2rem(4) rgba(0,0,0,.15);
      /*display:flex;*/
      .setting{
        display:flex;
        display:-webkit-box;
        height: 100%;
        .preview{
          flex: 0 0 px2rem(40);

          /*background-color: red;*/
          @include center;
        }
        .select{
          flex:1;
          display:flex;
          display:-webkit-box;
          .select_wrapper{
            align-items: center;
            flex:1;
            display: flex;
            display:-webkit-box;
            &:first-child{
              .line{
                &:first-child{
                  border-top:none;
                }
              }
            }
            &:last-child{
              .line{
                &:last-child{
                  border-top: none;
                }
              }
            }
            .line{
              flex:1;
              height:0;
              width: px2rem(16);
              border-top: px2rem(1) solid #ccc;
            }
            .point_wrapper{
              border-left: px2rem(1) solid #333333;
              height: px2rem(4);
              position:relative;
              .point{
                position:absolute;
                top:px2rem(-4);
                left:px2rem(-7);
                width:px2rem(10);
                height:px2rem(10);
                border:px2rem(1) solid #ccc;
                border-radius: 50%;
                /*align-items: center;*/
                @include center;
                /*position:relative;*/
                .in_point{
                  position:absolute;
                  left:px2rem(3);
                  width:px2rem(5);
                  height:px2rem(5);
                  border-radius: 50%;
                  background-color: black;
                  @include center;
                }
              }
            }
          }
        }

      }
      .settingTheme{
        display:flex;
        display:-webkit-box;
        height: 100%;
        .setting-theme-item{
          flex: 1;
          display: flex;
          display:-webkit-box;
          flex-direction: column;
          -webkit-flex-direction: column;
          padding: px2rem(5);
          .Theme{
            flex:1;
            box-sizing: border-box;
            &.no-boder{
              border:px2rem(1) solid #ccc;
            }
          }
          .text{
            flex:0 0 px2rem(25);
            color:#999;
            font-size: px2rem(14);
            @include center;
            &.selected{
              color:#333;
            }
          }
        }
      }
      .settingProgress{
        /*display:flex;*/
        width:100%;
        height: 100%;
        /*flex-direction: column;*/
        .progress_wrapper{
          width:100%;
          height:100%;
          flex:1;
          @include center;
          padding: 0 px2rem(30);
          box-sizing: border-box;
          -webkit-box-sizing: border-box;
          input[type="range"]{
            width:100%;
            -webkit-appearance: none;
            height:px2rem(2);
            background:-webkit-linear-gradient(#999,#999) no-repeat,#ddd;
            background-size: 0 100%;
            &:focus{
              outline:none;
            }
            &::-webkit-slider-thumb{
              -webkit-appearance: none;
              height:px2rem(20);
              width:px2rem(20);
              border-radius: 50%;
              background-color: white;
              box-shadow: 0 4px 4px 0 rgba(0,0,0,0.15);
              -webkit-box-shadow: 0 4px 4px 0 rgba(0,0,0,0.15);
              border:px2rem(1) solid #ddd;
            }
          }
        }
        .text_wrapper{
          position:absolute;
          bottom:0;
          left:0;
          width:100%;
          /*flex:0 0 px2rem(18);*/
          .text{
            font-size: px2rem(10);
            color:#333;
            @include center;
          }
        }
      }
    }
    .content-mask{
      position:absolute;
      top:0;
      left:0;
      z-index:101;
      background:rgba(51,51,51,.8);
      display:flex;
      display:-webkit-box;
      width:100%;
      height:100%;
    }
  }

</style>
