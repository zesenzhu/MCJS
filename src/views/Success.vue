<template>
    <div id="Success">
      <p class="tips">支付成功</p>
      <router-link class="back" @click="back" to="/Main">{{second}}秒后跳回首页<br/>点击提前返回</router-link>
    </div>
</template>

<script>
    export default {
        name: 'Success',
      data(){
          return{
            second:5,
            Timer:''
          }
      },
      mounted(){
        let $this =this;
        this.Timer = setInterval(function () {
          $this.second--;
          if($this.second==0){
            $this.$router.push({path:"/Main"})
            clearInterval($this.Timer)
          }
        },1000)
      },
      beforeRouteUpdate(){
        this.second = 5;
      },
      methods:{
        back(){
          clearInterval(this.Timer)
        }
      }

    }
</script>

<style lang="scss" scope>
#Success{
  width: 100%;
  height: 100%;
  position: relative;

  .tips{
    line-height: 2rem;
    font-size: 0.8rem;
    color: #7AC23C;
    text-align: center;
  }
  .back{
    display: inline-block;
    width: 100%;
    text-align: center;
    color: #999;
    text-decoration: underline;
    font-size: 0.5rem;
    line-height: 0.8rem;
  }
}
</style>
