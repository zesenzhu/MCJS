<template>
  <div id="main" class="main">
    <MainHead v-bind:isAccount="isAccount"></MainHead>
    <Swiper v-bind:pictureUrl="pictureUrl" v-bind:hasButton="hasButton" v-bind:hasScrollbar="hasScrollbar" v-bind:hasPagination="hasPagination" @message="Message"></Swiper>

    <CommonNav></CommonNav>
    <CenterNav></CenterNav>
    <p>{{userName}}</p>
    <p>{{addTime}}</p>
    <p>{{mobilePhone}}</p>
    <p>{{power}}</p>
    <p>{{userId}}</p>
    <CommonGoodsShow v-bind:goodsShowUrl="goodsShowUrl"></CommonGoodsShow>
  </div>
</template>

<script>
  // import MainHead from '../components/MainHead'
  import MainHead from "@/components/MainHead";
  import Swiper from "@/components/Swiper";
  import CommonNav from "@/components/common/CommonNav";
  import CenterNav from "@/components/home/CenterNav";
  import CommonGoodsShow from "@/components/common/CommonGoodsShow";

  let fromPath = '';
  export default {
    name: "Main",
    components: {MainHead,Swiper,CommonNav,CenterNav,CommonGoodsShow},
    // component: {MainHead},
    template: {MainHead,Swiper,CommonNav,CenterNav,CommonGoodsShow},
    created: function () {
      var $this = this;
      console.log($this);
      $this.checkToken();
    },
    /*beforeMount: function () {
      var $this = this;
      console.log($this);
      $this.checkToken();
    },*/
    mounted: function () {
      var $this = this;

    },

    beforeRouteEnter(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      fromPath = from.path;
      console.log(localStorage.getItem("token"));
      next();
    },
    beforeRouteUpdate(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建
      fromPath = from.path;
      console.log(localStorage.getItem("token"));
      next();
    },
    // mounted (){
    //
    // },
    data() {
      return {
        message: "xuxiao is boy",
        Token_host: "/php/Token/",
        userName: '1',
        addTime: '2',
        mobilePhone: '3',
        power: '4',
        isAccount: false,
        pictureUrl:"/php/picture/mainHome_swiper_1.php",
        goodsShowUrl: '/php/goods/mainShow.php',
        hasButton: false,
        hasScrollbar: false,
        hasPagination: true,
        userId:''
      }
    },
    methods: {
      checkToken: function () {
        let $this = this;
        let token = localStorage.getItem("token");
        $this.$http.post(this.Token_host + "check_token.php", {Btoken: token}, {emulateJSON: true}).then(function (res) {
          console.log(res.body);
          if (res.body.code == '10000') {
            sessionStorage.setItem("username", res.body.username);
            sessionStorage.setItem("addtime", res.body.addtime);
            sessionStorage.setItem("mobilephone", res.body.mobilephone);
            sessionStorage.setItem("power", res.body.power);
            sessionStorage.setItem("userId", res.body.userId);

            $this.userName = sessionStorage.getItem("username");
            $this.addTime = sessionStorage.getItem("addtime");
            $this.mobilePhone = sessionStorage.getItem("mobilephone");
            $this.power = sessionStorage.getItem("power");
            $this.userId = sessionStorage.getItem("userId");
            console.log(sessionStorage);
            $this.isAccount = true;
          } else {
            $this.Message("token过期，请重新登录");
            $this.isAccount = false;

          }
        }, function (res) {

        })
      },
      Message: function (text, time) {
        $("#message").text(text).removeClass("hide");
        setTimeout(function () {
          $("#message").addClass("hide")
        }, time ? time : 2000)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .main {
    width: 10rem;
    min-height: 100vh;
    padding-bottom: 1.4rem;
    /*background: #7AC23C;*/
  }
</style>
