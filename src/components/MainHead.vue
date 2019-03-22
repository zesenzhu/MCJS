<template>
  <div class="mainHead" v-on:scroll="listenScroll" v-bind:class="{'isScroll':scroll}">
    <input type="button" class="btn_dropMenu">
    <label class="MH_search">
      <span class="MH_search_font">MK</span>
      <input class="MH_search_input" type="text" disabled :placeholder='MH_searchPlaceHolder'>
    </label>
    <router-link v-if="!this.isAccount" class="noAccount" to="/loginIn">登录</router-link>

    <input v-if="this.isAccount" type="button" value="" class="isAccount">
  </div>
</template>

<script>
  export default {
    name: "MainHead",
    props: ['isAccount'],
    data() {
      return {
        MH_searchPlaceHolder: 'css世界',
        scroll: false,
      }
    },
    mounted: function () {
      console.log(this.isAccount);
      $(document).scroll(this.listenScroll)
    },
    methods:{
      listenScroll(){
        var top = document.documentElement.scrollTop || document.body.scrollTop;

        if(top>=150){
          this.scroll = true;
        }else{
          this.scroll = false;
        }
      }
    },
    computed:{

    }
  }
</script>

<style lang="scss" scoped>
  .mainHead {
    position: fixed;
    z-index: 999;
    top: 0rem;
    width: 10rem;
    padding: 0.2rem 0;
    height: 1.4rem;
    .btn_dropMenu {
      position: absolute;
      display: inline-block;
      width: 1.4rem;
      height: 1rem;
      background: transparent url("../assets/icon-menu.png") no-repeat center center;
      background-size: 0.8rem 0.7rem;
    }
    .MH_search {
      width: 7rem;
      position: absolute;
      height: 1rem;
      left: 1.4rem;
      padding: 0.1rem;
      display: flex;
      border-radius: 0.5rem;
      background-color: #fff;
      justify-content: center;
      align-items: center;

      .MH_search_font{
        font-size: 0.6rem;
        color: #7AC23C;
        font-family: 隶书;
        padding: 0 0.2rem;
        border-right: 2px solid #cdcdcd;
        margin-right: 0.2rem;
      }
      .MH_search_input{
        height: 0.8rem;
        padding-left: 0.8rem;
        width: 4rem;
        background: url("../assets/icon-search.png")no-repeat left center;
        background-size: 0.6rem 0.6rem;
        box-sizing: content-box;
      }
    }
    .noAccount {
      position: absolute;
      right: 0.2rem;
      background: transparent;
      background-size: 0.8rem 0.8rem;
      text-align: center;
      line-height: 1rem;
      font-size: 0.5rem;
      color: #7AC23C;
      height: 1rem;
      width: 1.4rem;
    }
    .isAccount {
      position: absolute;
      right: 0.2rem;
      background: transparent url("../assets/icon-user.png")no-repeat center center;
      background-size: 0.8rem 0.8rem;
      height: 1rem;
      width: 1.4rem;
    }
  }

  .isScroll {
    background-color: #7AC23C;
  }
</style>
