<template>
<div v-bind:class="{LoginWay: isLoginWay }">
  <p class="LoginWay__title"><span></span>第三方登录<span></span></p>
  <div class="LoginBox">
    <a href="#" v-bind:class="{LoginQq: isLoginSm }"></a>
    <a href="#" v-bind:class="{LoginWb: isLoginWb }"></a>
    <a href="#" v-bind:class="{LoginWx: isLoginWx }"></a>
  </div>
</div>
</template>

<script>
    export default {
        name: "LoginWay",
      data() {
          return {
            isLoginPw: false,
            isLoginWx:true,
            isLoginWb:true,
            isLoginSm: true,
            isLoginWay: true,
          }
      }
    }
</script>

<style lang="scss" scoped>
.LoginWay{
  margin-top: 2rem;
  width: 10rem;
  min-height: 2rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  .LoginWay__title{
    height: 1rem;
    font-size: 0.3rem;
    color: #ccc;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    span{
      display: inline-block;
      width: 4rem;
      height: 0;
      border: none;
      border-top: 1px solid #cccccc;
    }
  }
  .LoginBox{
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    a{
      width: 1rem;
      height: 1rem;
      border-radius: 0.5rem;
      margin: 0.5rem;
    }
    .LoginPw{
      background: url("../assets/blog.png")no-repeat center;
      background-size: contain;
    }
    .LoginQq{
      background: url("../assets/qq.png")no-repeat center;
      background-size: contain;
    }
    .LoginWb{
      background: url("../assets/blog.png")no-repeat center;
      background-size: contain;
    }
    .LoginWx{
      background: url("../assets/weixin.png")no-repeat center;
      background-size: contain;
    }
  }

}
</style>
