import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import LoginIn from '@/views/LoginIn'
import Main from '@/views/Main'
import Product from '@/views/Product'
import Simple from '@/components/goods/Simple'
import Details from '@/components/goods/Details'
import toClient from '@/components/chat/toClient'
import toRoom from '@/components/chat/toRoom'
import Room from '@/components/chat/Room'
import Hot from '@/components/forum/Hot'
import Community from '@/components/forum/Community'
import MyPost from '@/components/forum/MyPost'
import Post from '@/views/Post'
import Confirm from '@/views/Confirm'
import Cart from '@/views/Cart'
import Chat from '@/views/Chat'
import My from '@/views/My'
import Forum from '@/views/Forum'
import Error from '@/views/Error'
import Success from '@/views/Success'
import MyMsg from "@/views/MyMsg";
import MyCollect from "@/views/MyCollect";
import MyPwd from "@/views/MyPwd";
import SendPost from "@/views/SendPost";
Vue.use(Router)

export default new Router({
  //mode: 'history',
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
      redirect:'/Forum/Hot',
      component: Forum,
      children: [
        {
          // 当 /user/:id/profile 匹配成功，
          // UserProfile 会被渲染在 User 的 <router-view> 中
          path: 'Hot',
          component: Hot
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'Community',
          component: Community
        },
        {
          // 当 /user/:id/posts 匹配成功
          // UserPosts 会被渲染在 User 的 <router-view> 中
          path: 'MyPost',
          component: MyPost
        }
      ]
    },
    {
      path: '/Chat',
      name: 'Chat',
      component: Chat,
      redirect:'/Chat/toRoom',
      children: [
        {
          // 当 /Chat/toClient 匹配成功，
          // toClient 会被渲染在 Chat 的 <router-view> 中
          path: 'toClient',
          name:'toClient',
          component: toClient
        },
        {
          // 当 /Chat/toRoom 匹配成功
          // toRoom 会被渲染在 User 的 <router-view> 中
          path: 'toRoom',
          name:'toRoom',
          component: toRoom,
          children:[
            {
              path: 'Room/:room_id',
              name:'Room',
              component: Room,
            }
          ]
        }
      ]
    },
    {
      path: '/Success',
      name: 'Success',
      component: Success,
      children: [

      ]
    },
    {
      path: '/MyMsg',
      name: 'MyMsg',
      component: MyMsg,
      children: [

      ]
    },
    {
      path: '/MyCollect',
      name: 'MyCollect',
      component: MyCollect,
      children: [

      ]
    },
    {
      path: '/MyPwd',
      name: 'MyPwd',
      component: MyPwd,
      children: [

      ]
    },
    {
      path: '/SendPost',
      name: 'SendPost',
      component: SendPost,
      children: [

      ]
    },
    {
      path: '/Post/:postId',
      name: 'Post',
      component: Post,
      children: [

      ]
    },
    {
      path:'*',
      component:Error
    }

  ]
})
