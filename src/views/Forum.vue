<template>
  <div id="Forum">
    <div class="forum_top">FORUM</div>
    <div class="forum_box">
      <div class="forum_list">
        <router-link class="forum_link" to="/Forum/Hot" active-class="link_active">热点</router-link>
        <router-link class="forum_link" to="/Forum/Community" active-class="link_active">校园</router-link>
        <router-link class="forum_link" to="/Forum/MyPost" active-class="link_active">我的帖子</router-link>
      </div>
      <div class="forum_show">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>

      </div>
      <router-link class="sendPost" to="/SendPost"></router-link>
    </div>
    <CommonNav></CommonNav>
  </div>
</template>

<script>
  import CommonNav from "@/components/common/CommonNav";
  export default {
    name: "Forum",
    components: {CommonNav},
    template: {CommonNav},
  }
</script>

<style lang="scss" scoped>
  #Forum {
    position: relative;
    width: 10rem;
    height: calc(100vh - 1.4rem);

  .forum_top {
    position: relative;
    width: 100%;
    display: inline-block;
    height: 1.4rem;
    line-height: 1.4rem;
    text-align: center;
    color: #fff;
    font-size: 0.5rem;
    background: #7AC23C;
  }

  .forum_box {
    position: relative;
    height: calc(100% - 1.4rem);
    width: 100%;
    background: #eee;

  .forum_list {
    position: relative;
    height: 1rem;
    width: 100%;
    background: #fff;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;

  .forum_link {
    flex: 1;
    line-height: 1rem;
    text-align: center;
    color: #000;
    font-size: 0.4rem;
  }

  .link_active {
    background: #eee;
    color: #7AC23C;
  }

  }

  .forum_show {
    position: relative;
    width: 100%;
    height: calc(100% - 1rem);
    overflow: auto;
  }

  .sendPost{
    position: absolute;
    right: 0.5rem;
    top: 1.5rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: #7AC23C url(../assets/icon-send.png) no-repeat center center;
    background-size: 0.7rem 0.7rem;
  }

  }
  }
</style>
