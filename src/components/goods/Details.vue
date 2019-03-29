<template>
  <div id="Details">
    <img class="img" :src="'http://www.zhuzesen.work/'+productMassage.img">
    <div class="Details_text">
      <p class="text-head">物品介绍</p>
      <p class="text-content" >{{productMassage.introduce}}</p>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Details",
      data(){
          return{
            productMassage:'',
            productPHP: '/php/goods/productMassage.php',
          }
      },
      beforeMount(){
        let $this = this;

    let goodsId = this.$route.params['goods_id'];
    $this.goods_id = goodsId;
    let userName = sessionStorage.getItem("username");
    this.$http.get(this.productPHP, {params: {goods_id: goodsId,username:userName}}).then(function (res) {
      let body = res.body;
      if (body.code == '10000') {
        this.productMassage = body.goods;

      } else if (body.code == '10010') {
        console.log('没有商品');
      } else {
        console.log('PHP有bug');
      }
    });
      }
    }
</script>

<style lang="scss" scoped>
#Details{
  position: relative;
  left: 50%;
  margin-left: -4.5rem;
  width: 9rem;
  line-height: 9rem;


  .img{
    width: 8rem;
    height: 8rem;
    position: relative;
    left: 50%;
    margin-left: -4rem;
    border: 2px #7ac23c dashed;
    box-sizing: content-box;
    margin-bottom: 0.2rem;
  }

  .Details_text{

    .text-head{
      position: relative;
      line-height: 1.5rem;
      width: 4rem;
      text-align: center;
      font-size: 0.7rem;
      color: #fff;
      font-weight: bold;
      left: 50%;
      margin-left: -2rem;
      background: #7ac23c;
      border-radius: 10px;
      margin-bottom: 0.2rem;
    }

    .text-content{
      line-height: 1rem;
      width: 100%;
      text-align: center;
      font-size: 0.4rem;
      color: #333;
    }
  }
}
</style>
