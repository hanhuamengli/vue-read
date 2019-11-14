import Vue from 'vue'
import VueRouter from 'vue-router'

/*引入组件模块*/
import Ebook from '@/views/Ebook'

Vue.use(VueRouter);
let router = new VueRouter({
  routes:[{
    path:'/ebook',
    component:Ebook
  },{
    path:'/',
    redirect:'/ebook'
  }]


})

export default router
