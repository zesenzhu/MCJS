<template>
  <div v-bind:class="{TopBanner : isTopBanner }" >

    <router-link to="/Main" v-bind:class="{'TopBanner__to--first' : !isFirst,toHide: isFirst }"><i class="home-icon"></i>首页</router-link>
  </div>
</template>

<script>
    export default {
        name: "Header",
      data(){
          return{
            isFirst: false,
            isTopBanner: true,
          }
      }
    }
</script>

<style lang="scss" scoped>
  .TopBanner__to--first{
    position: relative;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 0.4rem;
    line-height: 1rem;
    margin-left: 0.4rem;

  .home-icon{
    display: inline-block;
    width: 0.4rem;
    height: 0.4rem;
    margin-right: 0.1rem;
    background: url("../assets/toFirst.png")no-repeat center;
    background-size: 0.4rem 0.4rem;
  }
  }
  .toHide{
    display: none;
  }
  .TopBanner{
    position: fixed;
    width: 10rem;
    height: 1rem;
    background-color: #7AC23C;
  }
</style>
