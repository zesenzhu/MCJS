<template>
  <div id="app" >
    <div id="message" class="hide">sadasd</div>


  <router-view :register-host="host"></router-view>

  </div>
</template>

<script>

export default {
  name: 'App',

  data(){
    return {

      host: "http://localhost/MKJS/php/register.php"
    }
  }
}

</script>

<style lang="scss">
  @import './takeout/reset.css';
  @import './takeout/common.css';

  .hide{
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
  #message{
    position: absolute;
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
