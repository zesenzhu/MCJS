import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import LoginIn from '@/views/LoginIn'
import Main from '@/views/Main'
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
    }
  ]
})
