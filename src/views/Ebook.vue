<template>
  <div class="eBook">
    <titleBar :isShow="isShow"></titleBar>
    <div class="eBook_wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left" @click="nextPage()"></div>
        <div class="center" @click="show()"></div>
        <div class="right" @click="prevPage()"></div>
      </div>
    </div>
    <menuBar :isShow="isShow"
             :fontSizeList="fontSizeList"
             :defaultFontSize="defaultFontSize"
             @setFontSize="setFontSize"
             :themeList="themeList"
             :defaultTheme="defaultTheme"
             @setTheme="setTheme"
             :bookAvailable="bookAvailable"
             @onProgressChange="onProgressChange"
             :navigation="navigation"
             @jumpTo="jumpTo"
             ref="menubar">
    </menuBar>
  </div>
</template>

<script>
  import Epub from 'epubjs'
  import titleBar from '@/components/TitleBar'
  import menuBar from '@/components/MenuBar'
  const DOWNLOAD_URL = '/static/static/2018_Book_AgileProcessesInSoftwareEngine.epub';
  // import DOWNLOAD_URL from'@/static/2018_Book_AgileProcessesInSoftwareEngine.epub'
  export default {
    name: "Ebook",
    components:{
      titleBar,menuBar
    },
    data(){
      return {
        isShow : false,
        fontSizeList:[{fontsize:12},{fontsize:14},{fontsize:16},{fontsize:18},{fontsize:20}],
        defaultFontSize:16,
        themeList:[{
          name:'default',
          style:{
            body:{
              'color':'#000',
              'background':'#fff'
            }
          }
        },{
          name:'eye',
          style:{
            body:{
              'color':'#000',
              'background':'#ceeaba'
            }
          }
        },{
          name:'night',
          style:{
            body:{
              'color':'#fff',
              'background':'#000'
            }
          }
        },{
          name:'gold',
          style:{
            body:{
              'color':'#000',
              'background':'rgb(241,236,226)'
            }
          }
        }],
        defaultTheme:0,
        bookAvailable:true,
        defaultProgress:0,
        navigation:{}
      }
    },
    methods:{
      jumpTo(href){
        this.rendition.display(href);
        this.hideTitleAndMenu();
      },
      hideTitleAndMenu(){
        /*隐藏标题栏和菜单栏*/
        this.isShow = false;
        /*隐藏菜单栏弹出的设置栏*/
        this.$refs.menubar.showSetting();
        /*隐藏目录*/
        this.$refs.menubar.hideContent();
      },
      onProgressChange(progress){
        this.defaultProgress = progress;
        const percentage = progress/100;
        const location = percentage>0 ? this.book.locations.cfiFromPercentage(percentage):0 ;
        this.book.rendition.display(percentage);
      },
      setFontSize(fontSize){
        // console.log(fontSize);
        this.defaultFontSize = fontSize;
        if(this.themes){
          this.themes.fontSize(fontSize+'px');
        }
      },
      registerTheme(){
        this.themeList.forEach(theme=>{
          this.themes.register(theme.name,theme.style);
        })
      },
      setTheme(index){
        this.themes.select(this.themeList[index].name);
        this.defaultTheme = index;
      },
      showEpub(){
        this.book = new Epub(DOWNLOAD_URL);
        this.rendition = this.book.renderTo('read',{
          width:window.innerWidth,
          height:window.innerHeight
        });
        window.console.log(this.book);
        this.rendition.display();
        /*获取主题*/
        this.themes = this.rendition.themes;
        this.setFontSize(this.defaultFontSize);
        /*注册主题*/
        /*this.themes.register(name,styles)
        * this.themes.select(name)
        * */
        this.registerTheme();
        this.setTheme(this.defaultTheme);
        /*进度条设置
        * 获取Locations对象
        * 通过epubjs的钩子函数来实现 ready
        * */
        this.book.ready.then(()=>{
          console.log(this.book.navigation);
          this.navigation = this.book.navigation;
          return this.book.locations.generate();
        }).then(result=>{
          this.locations = this.book.locations;
        })
        this.onProgressChange(this.defaultProgress);
        /*导航栏*/

      },
      prevPage(){
        if(this.rendition){
          this.rendition.prev();
        }
      },
      nextPage(){
        if(this.rendition){
          this.rendition.next();
        }
      },
      show(){
        this.isShow = !this.isShow;
        // console.log(this.$refs.menubar);
        this.$refs.menubar.settingShow = false;
      },

    },
    mounted(){
      this.showEpub();
    }
  }
</script>

<style lang = "scss" scoped>
  @import '../assets/styles/global.scss';
  .eBook{
    position:relative;
    .eBook_wrapper{
      .mask{
        position:absolute;
        top:0;
        left:0;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex;
        display:-webkit-box;
        .left{
          flex: 0 0 px2rem(100);
          /*background-color: red;*/
        }
        .center{
          flex:1;
          /*background-color: blue;*/
        }
        .right{
          flex: 0 0 px2rem(100);
          /*background-color: orangered;*/
        }
      }
    }

  }
</style>
