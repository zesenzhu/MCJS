<template>
    <div id="toClient">
      <div class="client">
        <span class="client_1" @click="client='root'" :class="{list_active:client=='root'}">客服</span>
      </div>
      <keep-alive>
        <Client v-if="client=='root'" :Room="client" ></Client>
      </keep-alive>
    </div>
</template>

<script>
  import Client from '../chat/Client';
    export default {
        name: 'toClient',
      data(){
          return {
            client: 'root'
          }
      },
      components: {Client},
      template: {Client},

    }
</script>

<style lang="scss" scoped>
  #toClient{
    position: relative;
    width: 100%;
    height: calc(100vh - 3.8rem);
    background: #fff;

    .client{
      position: relative;
      float: left;
      height: 100%;
      overflow: scroll;
      background: #fff;
      width: 3rem;

      .client_1{
        position: relative;
        display: inline-block;
        line-height: 1rem;
        text-align: center;
        color: #000;
        background: #fff;
        font-size: 0.4rem;
        width: 100%;
      }
  .list_active{
    color: #7AC23C;
    background: #eee;
  }
    }
  }
</style>
