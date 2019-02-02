<template>
  <div class="main"></div>
</template>

<script>
  let fromPath = '';
    export default {
        name: "Main",
      beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        fromPath = from.path;
        console.log(localStorage.getItem("token"));
        next();
      },
      beforeRouteUpdate (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当钩子执行前，组件实例还没被创建
        fromPath = from.path;
        console.log(localStorage.getItem("token"));
        next();
      },
      mounted (){

      },
      method:{
          checkToken:function(){

          }
      }
    }
</script>

<style lang="scss" scoped>
.main{
  width: 10rem;
  height: 10rem;
  background: #7AC23C;
}
</style>
