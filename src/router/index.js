import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import LoginIn from '@/views/LoginIn'
import Main from '@/views/Main'
import Product from '@/views/Product'
import Simple from '@/components/goods/Simple'
import Details from '@/components/goods/Details'
import Confirm from '@/views/Confirm'
import Cart from '@/views/Cart'
import My from '@/views/My'
import Forum from '@/views/Forum'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/loginIn',
      name: 'LoginIn',
      component: LoginIn
    },
    {
      path: '/Main',
      name: 'Main',
      component: Main
    },
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/Product/:goods_id',
      name: 'Product',
      component: Product,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'Simple',
          component: Simple
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'Details',
          component: Details
        }
      ]
    },
    {
      path: '/Confirm/:goods_id',
      name: 'Confirm',
      component: Confirm,
      children: [

      ]
    },
    {
      path: '/Cart',
      name: 'Cart',
      component: Cart,
      children: [

      ]
    },
    {
      path: '/My',
      name: 'My',
      component: My,
      children: [

      ]
    },
    {
      path: '/Forum',
      name: 'Forum',
      component: Forum,
      children: [

      ]
    },
  ]
})
