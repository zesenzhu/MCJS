// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import  Vue from 'vue'
import App from './App'
import router from './router'
import 'jquery'
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'
import 'swiper'
import 'lib-flexible'
import VueResource from 'vue-resource'
import './takeout/swiper.css';
import layer from 'vue-layer'
import VueBus from 'vue-bus';
import store from './store.js'
import $ from 'jquery'
import axios from 'axios'
import Axios from './axios/config.js'

//socket地址
var socketBaseUrl = process.env.SOCKET_HOST;

Vue.prototype.$socketBaseUrl = socketBaseUrl;


Vue.prototype.$ajax = Axios;


Vue.use(VueBus);


//axios.defaults.baseURL = process.env.API_HOST;


//把属性或方法放在vue原型里
Vue.prototype.$layer = layer(Vue);
Vue.prototype.$Message = Message;
  function  Message(text, time) {//text：内容，time：显示时间/毫秒
  clearTimeout(this.MessageTimer);
  $("#message").text(text).removeClass("hide");
  this.MessageTimer = setTimeout(function () {
    $("#message").text("").addClass("hide")
  }, time ? time : 2000);
};




Vue.config.productionTip = false
Vue.use(VueResource)

console.log($("body").css("font-size"));
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  axios,
  components: { App },
  template: '<App/>'
})

//
