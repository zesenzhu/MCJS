<template>
    <div id="BuyGoods">
      <CommonScreen v-bind:parameter="ScreenParameter"></CommonScreen>
      <div class="content">
        <a class="close"></a>
        <div class="content-1">
          <p class="contentHead">立即购买</p>
          <div class="content-2">
            <img class="goods_thumb" >
            <span class="goods_price_buy"></span>
            <span class="goods_num"></span>
            <p class="goods_name"></p>
          </div>
          <div class="goods_handle">
            <span class="text">购买数量</span>
            <div class="handle_box">
              <span class="num_reduce" v-on:click="num==0?0:--num">-</span>
              <span class="show_num">{{num}}</span>
              <span class="num_add" v-on:click="num==Max?num:++num">+</span>
            </div>
          </div>
        </div>
        <router-link class="comfirm-btn" :class="{disabled:disabled}"   :to="'/Confirm/'+$route.params['goods_id']">确定</router-link>
      </div>
    </div>
</template>

<script>
  import CommonScreen from "../common/CommonScreen"
    export default {
        name: 'BuyGoods',
      template:{CommonScreen},
      components:{CommonScreen},
      props:[""],
      data(){
        return {
          ScreenParameter:{
            state:true,//组件状态，开或关
            shadowClose:true,//是否允许点击幕布关闭该组件
            parent:this//谁是父组件，this
          },
          productMessage:'',
          num:1,
          Max:'',
          disabled:false,
        }
      },
      watch:{
        num:function(val){
          if(val==0){
            this.disabled = true;
        }else{
          this.disabled = false
        }
        }
      },
      mounted(){
        let $close = $(".close"),$this =this,$BuyGoods = $("#BuyGoods");
        $close.on("click",function (e) {
          $BuyGoods.slideUp();
        })
        //用bus接受productMassage
        $this.$bus.on('ProductMassage', (data) => {
          $this.productMassage = data;
          $(".goods_thumb").attr("src","http://www.zhuzesen.work/"+ $this.productMassage.thumb);
          $(".goods_price_buy").html("￥"+$this.productMassage.price);
          $(".goods_num").html("库存："+$this.productMassage.quantity+"("+$this.productMassage.unit+")");
          $(".goods_name").html($this.productMassage.name);
          $this.Max = data.quantity;
          console.log($this.productMassage);
        });
        $(".comfirm-btn").on("click",function () {
          //跳确认名单组件时带上商品信息
          $this.$bus.emit("toConfirm",$this.productMassage);
          //跳转时带上信息

          $this.$store.commit("confirmGoodsDetailsHandle", {
            details: $this.num
          })

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
      padding-bottom: 1.5rem;

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
      width: 100%;
      .contentHead{
        width: 100%;
        line-height: 1rem;
        text-align: center;
        font-size: 0.4rem;
        color: #7AC23C;
      }
      .content-2{
        position: relative;
        width: 100%;
        min-height: 2rem;


        .goods_thumb{
          width: 2rem;
          height: 2rem;
          float: left;
          margin-left: 0.5rem;
        }
        .goods_price_buy{
          color: #7AC23C;
          font-size: 0.4rem;
          float: left;
          line-height: 1rem;
          width: 3rem;
          margin-left: 0.5rem;
        }
        .goods_num{
          color: #666;
          font-size: 0.4rem;
          float: left;
          line-height: 1rem;
          width: 3rem;
          margin-left: 0.5rem;
        }
        .goods_name{
          color: #7AC23C;
          font-size: 0.4rem;
          float: left;
          line-height: 1rem;
          width: 7.5rem;
          padding: 0 0.5rem;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      .goods_handle{
        border-top: 1px #333333 solid;
        border-bottom: 1px #333333 solid;
        height: 1.5rem;
        margin-top: 0.2rem;
        padding: 0.25rem 0 0 0;

        .text{
          line-height: 1rem;
          float: left;
          color: #333;
          font-size: 0.4rem;
          width: 3rem;
          margin-left: 0.5rem;

        }
        .handle_box{
          float: right;
          margin-right: 0.5rem;
          width: 3rem;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;

          .num_reduce,.num_add{
            width: 1rem;
            height: 1rem;
            color: #333333;
            background: #cccccc;
            line-height: 1rem;
            text-align: center;
            font-size: 0.4rem;
          }
          .show_num{
            width: 1rem;
            height: 1rem;
            color: #7AC23C;
            line-height: 1rem;
            text-align: center;
            font-size: 0.4rem;
          }
        }
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

  a.disabled {
    pointer-events: none;
    filter: alpha(opacity=50); /*IE滤镜，透明度50%*/
    -moz-opacity: 0.5; /*Firefox私有，透明度50%*/
    opacity: 0.5; /*其他，透明度50%*/
  }
</style>
