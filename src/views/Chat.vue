<template>
  <div id="Chat">
    <p class="Chat_top">MK Chat</p>
    <div class="list">
      <router-link class="left" to="/Chat/toClient" active-class="list_active">私聊</router-link>
      <router-link class="right" to="/Chat/toRoom" active-class="list_active">群聊</router-link>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>

    <CommonNav></CommonNav>
  </div>
</template>

<script>
  import CommonNav from "@/components/common/CommonNav";
  export default {
    name: 'Chat',
    data(){
      return {
        list_active: true
      }
    },
    components: {CommonNav},
    template: {CommonNav},

    mounted(){

    },
    methods:{

    }

  }
</script>

<style lang="scss" scoped>
  #Chat {
    position: relative;
    width: 10rem;
    background: #eee;
    min-height: 100vh;

  .Chat_top {
    position: relative;
    line-height: 1.4rem;
    height: 1.4rem;
    text-align: center;
    font-size: 0.6rem;
    color: #7AC23C;
    background: #fff;
  }

  .list {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    height: 1rem;
    width: 100%;
    align-items: center;

  a {
    flex: 1;
    line-height: 1rem;
    text-align: center;
    color: #000;
    background: #eee;
    font-size: 0.4rem;
  }

  .list_active {
    color: #fff;
    background: #7AC23C;
  }

  }

  }
</style>
