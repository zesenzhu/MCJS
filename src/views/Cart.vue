<template>
    <div id="Cart">
      <div class="C-head">
        <span class="CH-tips">购物车({{AllGoodsNum}})</span>
        <span class="CH-admin">管理</span>
      </div>
      <div class="container">
        <div class="container-top">
          <span class="CT-text-1">购物车</span>
          <span class="CT-text-2">共{{AllGoodsNum}}件宝贝</span>
          <span class="CH-admin">管理</span>
        </div>
        <div class="CartCard-box">
          <CartCard v-for="(good,index) in Message" :key="index" :MyKey ="index" :Message = 'Message'></CartCard>
        </div>
      </div>
      <CommonNav ></CommonNav>
    </div>
</template>

<script>
  import CommonNav from "@/components/common/CommonNav";
  import CartCard from "@/components/cart/CartCard";
    export default {
        name: "Cart",
      components:{CommonNav,CartCard},
      template:{CommonNav,CartCard},
      data(){
          return {
            Message:'',
            AllGoodsNum:''
          }
      },
      created(){
        let $this = this,
          userId = sessionStorage.getItem("userId");
        console.log(userId)
        $this.$http.post("/php/cart/getCart.php",{goods_buyer_id:userId},{emulateJSON: true}).then(function (res) {
          console.log(res.body);
          $this.Message = res.body.data;

          //购物车商品数
          $this.AllGoodsNum = $this.Message.length;
        })
      },
      beforeMount(){

      },
      mounted(){
          let $this = this;

          //距离顶部变化head透明度
        $(window).on("scroll",function (e) {
          let Opacity = $(window).scrollTop()/$(".C-head").height();
          $(".C-head").css("opacity",Opacity)
        })

      }
    }
</script>

<style lang="scss" scoped>
#Cart{
  position: relative;
  background: #eee;
  .C-head{
    height: 1.4rem;
    width: 10rem;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    background: #7ac23c;
    z-index: 999;
    opacity: 0;

    .CH-tips{
      position: relative;
      display: inline-block;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      color: #fff;
      font-size: 0.5rem;
      left: 50%;
      transform: translateX(-50%);
    }

    .CH-admin{
      position: absolute;
      display: inline-block;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      color: #fff;
      font-size: 0.5rem;
      right: 0.5rem
    }
  }
.container{
  min-height: 120vh;
  position: relative;
  width: 10rem;

  .container-top{
    position: relative;
    height: 3rem;
    background: #7ac23c;
    width: 10rem;

    .CT-text-1{
      position: absolute;
      color: #fff;
      font-size: 0.5rem;
      font-weight: bold;
      line-height: 1rem;
      left: 0.2rem;
    }

    .CT-text-2{
      position: absolute;
      color: #fff;
      font-size: 0.4rem;
      line-height: 1rem;
      left: 0.2rem;
      top: 1rem;
    }
    .CH-admin{
      position: absolute;
      display: inline-block;
      height: 1.4rem;
      line-height: 1.4rem;
      text-align: center;
      color: #fff;
      font-size: 0.5rem;
      right: 0.5rem
    }
  }
  .CartCard-box{
    position: relative;
    top: -1rem;
  }
}


}
</style>
