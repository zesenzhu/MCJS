<template>
  <div id="footerCommonNav">
    <router-link to="/Main" active-class="NavActive">
      <div class="icon-center">
        <i class="FC-HomeIcon" v-bind:class="'FC-HomeIconActive'"></i>
        <span class="FC-HomeFont" >首页</span>
      </div>
    </router-link>
    <router-link to="/Forum" active-class="NavActive">
      <div class="icon-center">
        <i class="FC-ForumIcon" v-bind:class="'FC-ForumIconActive'"></i>
        <span class="FC-ForumFont">论坛</span>
      </div>
    </router-link>
    <router-link to="/Chat" active-class="NavActive">
      <div class="icon-center">
        <i class="FC-ChatIcon" v-bind:class="'FC-ChatIconActive'"></i>
        <span class="FC-ChatFont">聊天室</span>
      </div>
    </router-link>
    <!--<a href="https://www.qiufengh.com/#/chat?roomId=room1">-->
      <!--<div class="icon-center">-->
        <!--<i class="FC-ChatIcon"></i>-->
        <!--<span class="FC-ChatFont">聊天室</span>-->
      <!--</div>-->
    <!--</a>-->
    <router-link to="/Cart" active-class="NavActive">
      <div class="icon-center">
        <i class="FC-CartIcon" v-bind:class="'FC-CartIconActive'"></i>
        <span class="FC-CartFont">购物车</span>
      </div>
    </router-link>
    <router-link to="/My" active-class="NavActive">
      <div class="icon-center">
        <i class="FC-MyIcon" v-bind:class="'FC-MyIconActive'"></i>
        <span class="FC-MyFont">我的</span>
      </div>
    </router-link>
  </div>
</template>

<script>
  export default {
    name: "CommonNav",
    data(){
      return {
        Path: '/Main',
      }
    },
    mounted(){
      console.log(this.$route.path);
    }
  }
</script>

<style lang="scss" scoped>
  #footerCommonNav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 10rem;
    height: 1.4rem;
    background-color: #fff;
    border-top: 1px #999 solid;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    z-index: 999;

    a {

    }
    .icon-center {
      width: 2rem;
      height: 1.4rem;
      display: flex;
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      i {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
      }
      .FC-HomeIcon {
        background: url("../../assets/fCommonHome.png") no-repeat center;
        background-size: contain;
      }
      .FC-ForumIcon {
        background: url("../../assets/fCommonForum.png") no-repeat center;
        background-size: contain;
      }
      .FC-ChatIcon {
        background: url("../../assets/fCommonChat.png") no-repeat center;
        background-size: contain;
      }
      .FC-CartIcon {
        background: url("../../assets/fCommonCart.png") no-repeat center;
        background-size: contain;
      }
      .FC-MyIcon {
        background: url("../../assets/fCommonMy.png") no-repeat center;
        background-size: contain;
      }



  span {
    color: #707070;
    font-size: 0.1rem;

  }


    }
  /*active*/
  .NavActive{
  .FC-HomeIconActive {
    background: url("../../assets/fCommonHomeActive.png") no-repeat center;
    background-size: contain;
  }
  .FC-HomeIconActive+span{
    color:#7ac23c;
  }
  .FC-ForumIconActive {
    background: url("../../assets/fCommonForumActive.png") no-repeat center;
    background-size: contain;
  }
  .FC-ForumIconActive+span{
    color:#7ac23c;
  }
  .FC-ChatIconActive {
    background: url("../../assets/fCommonChatActive.png") no-repeat center;
    background-size: contain;
  }
  .FC-ChatIconActive+span{
    color:#7ac23c;
  }
  .FC-CartIconActive {
    background: url("../../assets/fCommonCartActive.png") no-repeat center;
    background-size: contain;
  }
  .FC-CartIconActive+span{
    color:#7ac23c;
  }
  .FC-MyIconActive {
    background: url("../../assets/fCommonMyActive.png") no-repeat center;
    background-size: contain;
  }
  .FC-MyIconActive+span{
    color:#7ac23c;
  }


  }

  }
</style>
