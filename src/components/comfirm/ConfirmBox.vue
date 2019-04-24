<template>
  <div id="ConfirmBox">
    <div class="head"><img class="owner-img" :src="'/'+ box.user_msg.avatar"><span class="owner">摊主:{{box.owner}}</span>
    </div>
    <div class="center">
      <img class="cc-img" :src="'/'+ box.thumb">
      <p class="cc-name">{{box.name}}</p>
      <p class="cc-region">学校：{{box.region}}</p>
      <p class="cc-num">*{{quantity}}</p>
      <p class="cc-price">单价：￥{{box.price}}</p>
    </div>
    <div class="others">
      <div class="way"><span class="tips">交易方式：</span><span class="select">私下协商</span></div>
    </div>
    <div class="footer">
      <p class="footer-0">
        <span class="footer-1">共{{quantity+box.unit}}</span>
        <span class="footer-2">小计：</span>
        <span class="footer-3">￥{{quantity*box.price}}</span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConfirmBox',
    props: ["box"],
    data(){
      return{
        quantity:''
      }
    },
    beforeMount(){
      let $this = this;
      if (this.$route.params["goods_id"] != 0) {
        this.quantity = this.$store.state.confirmGoodsDetails;
      }else{
        this.quantity = this.box.cart.quantity;
      }
      this.$store.commit("confirmGoodsNumHandle",{
        begin:false,
        num:$this.quantity,
        price:$this.quantity*this.box.price
      });

    },mounted(){
      let $this = this;

    }

  }
</script>

<style lang="scss" scope>
  #ConfirmBox {
    position: relative;
    width: 9.6rem;
    min-height: 3rem;
    background: #fff;
    border-radius: 10px;
    margin-top: 0.2rem;

  .head {
    position: relative;
    height: 1rem;
    width: 100%;
    padding: 0 0.2rem;

  .owner-img {
    width: 0.8rem;
    height: 0.8rem;
    top: 0.1rem;
    margin-right: 0.2rem;
    border-radius: 50%;
  }

  .owner {
    line-height: 1rem;
    font-size: 0.4rem;
    color: #7AC23C;
    display: inline-block;
  }

  }

  .center {
    position: relative;
    height: 2rem;
    overflow: hidden;
    display: inline-block;
    margin: 0.2rem 0;

  .cc-img {
    height: 2rem;
    width: 2rem;
    float: left;
    margin-left: 0.2rem;
  }

  .cc-name {
    float: right;
    display: inline-block;
    line-height: 0.6rem;
    width: 6.8rem;
    font-size: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-left: 0.2rem;
  }

  .cc-region {
    position: relative;
    bottom: 0;
    float: left;
    display: inline-block;
    line-height: 0.8rem;
    margin-left: 0.6rem;
    width: 3rem;
    font-size: 0.3rem;
    text-align: left;

  }

  .cc-price {
    position: relative;
    bottom: 0;
    float: right;
    display: inline-block;
    line-height: 0.8rem;
    margin-left: 0.2rem;

    font-size: 0.3rem;
    text-align: left;
    color: red;

  }

  .cc-num {
    position: relative;
    bottom: 0;
    float: right;
    display: inline-block;
    line-height: 0.8rem;
    margin-left: 0.2rem;
    width: 1rem;
    font-size: 0.3rem;
    text-align: left;
    color: #666;

  }

  }
  .others {
    position: relative;
    width: 100%;

  .way {
    position: relative;
    width: 100%;
    height: 1rem;
    margin: 0.2rem 0;

  .tips {
    line-height: 1rem;
    width: 3rem;
    text-align: right;
    font-size: 0.4rem;
    color: #000;
    display: inline-block;

  }

  .select {
    display: inline-block;
    line-height: 1rem;
    width: 6rem;
    text-align: left;
    font-size: 0.4rem;
    color: #999;
    padding-left: 0.2rem;
  }

  }
  }
  .footer {
    position: relative;
    height: 1rem;
    margin: 0.2rem 0;

  .footer-0 {
    text-align: right;
    padding-right: 0.2rem;
    line-height: 1rem;

  span {
    font-size: 0.4rem;
    line-height: 1rem;
  }

  .footer-1 {
    color: #999;
  }

  .footer-2 {
    color: #000;
  }

  .footer-3 {
    color: #7AC23C;
  }

  }
  }

  }
</style>
