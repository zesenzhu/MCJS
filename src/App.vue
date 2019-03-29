<template>
  <div id="app">
    <div id="message" class="hide">sadasd</div>


    <router-view :register-host="host"></router-view>

  </div>
</template>

<script>
  import router from './router'
  export default {
    name: 'App',

    data() {
      return {

        host: "http://localhost/MKJS/php/register.php"
      }
    },
    beforeMount(){
      let $this = this;
      let token = localStorage.getItem("token");
      this.$http.post( "/php/Token/check_token.php", {Btoken: token}, {emulateJSON: true}).then(function (res) {


        if (res.body.code != '10000') {
          router.push({ path: '/Register' })
        }else{
        }
      }, function (res) {

      })



    },
    beforeCreate(){
      //token验证
      let $this = this;
      let token = localStorage.getItem("token");
      $this.$http.post("/php/Token/check_token.php", {Btoken: token}, {emulateJSON: true}).then(function (res) {
        console.log(res.body);
        if (res.body.code == '10000') {
          sessionStorage.setItem("username", res.body.username);
          sessionStorage.setItem("addtime", res.body.addtime);
          sessionStorage.setItem("mobilephone", res.body.mobilephone);
          sessionStorage.setItem("power", res.body.power);
          sessionStorage.setItem("userId", res.body.userId);

        } else {
          $this.Message("token过期，请重新登录");
        }
      }, function (res) {
      })
    },
    methods:{
      //token验证
      checkToken:function() {
    let $this = this;
    let token = localStorage.getItem("token");
    $this.$http.post("/php/Token/check_token.php", {Btoken: token}, {emulateJSON: true}).then(function (res) {
      console.log(res.body);
      if (res.body.code == '10000') {
        sessionStorage.setItem("username", res.body.username);
        sessionStorage.setItem("addtime", res.body.addtime);
        sessionStorage.setItem("mobilephone", res.body.mobilephone);
        sessionStorage.setItem("power", res.body.power);
        sessionStorage.setItem("userId", res.body.userId);

      } else {
        $this.Message("token过期，请重新登录");
      }
    }, function (res) {
    })
  }
    }
  }

</script>

<style lang="scss">
  @import './takeout/reset.css';
  @import './takeout/common.css';

  .hide {
    display: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    color: #2c3e50;
    min-height: 100vh;
    overflow: hidden;
    #message {
      position: fixed;
      top: 50%;
      transform: translateX(-50%);
      transform: translateY(50%);
      background-color: rgba(151, 151, 151, 0.43);
      color: #fff;
      padding: 0.3rem;
      font-size: 0.5rem;
      max-width: 8rem;
      min-width: 2rem;
      border-radius: 10px;
      z-index: 999;
    }
  }


</style>
