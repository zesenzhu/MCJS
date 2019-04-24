<template>
    <div class="Client">
      <div class="showBox" ref="scroll">
        <Say v-for="(say,key) in mySay" :key="key" :say="say"></Say>
      </div>

      <div class="MyHandle">
        <input type="text" class="MyWord" v-model="MyWord">
        <input type="button" class="MySend" @click="send" v-bind:disabled="!MyWord" :class="{noWord:!MyWord}" value="发送">
      </div>
    </div>
</template>

<script>
  import Say from './Say'
    export default {
        name: 'Client',
      components:{Say},
      template:{Say},
      data(){
          return {
            MyWord:''
          }
      },
      computed:{
        mySay(){
          return this.$store.state.mySay;
        }
      },
      methods:{
        send(){
          let mySay = {type:'say',from_client_name:sessionStorage.getItem('username')},$this = this,time = new Date();
          mySay.content = $this.MyWord;
mySay.time = time.getFullYear() + '-' + time.getMonth() +  '-' + time.getDate() + ' ' + time.getHours() + ':' +time.getMinutes() + ':' + time.getSeconds();
          this.$store.commit('mySayHandle',{
            mySay:mySay
          });
          this.MyWord=="";
        }
      }

    }
</script>

<style lang="scss" scoped>
  .Client{
    position: relative;
    width: 7rem;
    height: 100%;
    background: #eee;
    overflow: scroll;
    display: inline-block;

  .showBox{
    position: absolute;
    width: 7rem;
    bottom: 1.4rem;
    max-height: calc(100% - 1.4rem);
    overflow: scroll;
  }
  .MyHandle{
    position: fixed;
    bottom: 1.2rem;
    right: 0;
    width: 7rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    height: 1.2rem;

  .MyWord{
    width: 5rem;
    height: 1rem;
    line-height: 1rem;
    padding: 0.2rem;
    border-radius: 10px;
    background: #fff;
    border: none;
    color: #000;
    font-size: 0.3rem;
    margin: 0 0.2rem;
  }

  .MySend{
    width: 1.5rem;
    height: 1rem;
    background: #7AC23C;
    color: #fff;
    font-size: 0.3rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 10px;
    border: none;
  }

  .noWord{
    background: #aaa;
    color: #fff;
  }
  }
  .client {
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    height: 1rem;
    border-bottom: 1px #666 solid;

  .img_client {
    width: 0.6rem;
    height: 0.6rem;
    position: relative;
    border-radius: 50%;

  }

  }
  }

</style>
