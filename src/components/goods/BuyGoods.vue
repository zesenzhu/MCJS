<template>
    <div id="BuyGoods">
      <CommonScreen v-bind:parameter="ScreenParameter"></CommonScreen>
      <div class="content">
        <a class="close"></a>
        <div class="content-1">
          <p class="contentHead">立即购买</p>
        </div>
        <span class="comfirm-btn">确定</span>
      </div>
    </div>
</template>

<script>
  import CommonScreen from "../common/CommonScreen"
    export default {
        name: 'BuyGoods',
      template:{CommonScreen},
      components:{CommonScreen},
      props:["productMessage"],
      data(){
        return {
          ScreenParameter:{
            state:true,//组件状态，开或关
            shadowClose:true,//是否允许点击幕布关闭该组件
            parent:this//谁是父组件，this
          }
        }
      },
      watch:{
        productMassage(val){
          console.log(val);
        }
      },
      mounted(){
        let $close = $(".close"),$this =this,$BuyGoods = $("#BuyGoods");
        console.log($this.productMassage);
        $close.on("click",function (e) {
          $BuyGoods.slideUp();
        })
      }
    }
</script>

<style lang="scss" scope>
  #BuyGoods{
    display: none;
    width: 10rem;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 1000;



    .content{
      background: #fff;
      position: absolute;
      bottom: 0;
      width: 100%;
      min-height: 4rem;

  .close{
    position: absolute;
    right: 0.2rem;
    top:0.2rem;
    width: 0.5rem;
    height: 0.5rem;
    background: url("../../assets/icon-close.png")no-repeat center center;
    background-size: contain;
  }
    .content-1{
      .contentHead{
        width: 100%;
        line-height: 1rem;
        text-align: center;
        font-size: 0.4rem;
        color: #7AC23C;
      }

    }
      .comfirm-btn{
        display: inline-block;
        width: 8rem;
        height: 1rem;
        line-height: 1rem;
        background: #7AC23C;
        color: #fff;
        font-size: 0.5rem;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0.2rem;
        margin: 0 auto;
        border-radius: 0.5rem;
        text-align: center;
      }
    }
  }
</style>
