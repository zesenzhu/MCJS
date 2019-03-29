<template>
    <div id="confirm">
      确认订单<br/>{{productMassage}}
    </div>
</template>


<script>
    export default {
        name: "Confirm",
      data(){
          return{
            productMassage:'',
            goods_id:'',
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
            //获得是否收藏字段
            $this.goodsCollect = $this.productMassage.goodsCollect;
            console.log(this.productMassage);
            //  商品信息
            let addTime = new Date(this.productMassage.addtime*1000);
            this.FullYear = addTime.getFullYear();
            this.Month = addTime.getMonth();
            this.Dates = addTime.getDate();
            this.Hours = addTime.getHours();
            this.Minutes = addTime.getMinutes();
            this.Seconds = addTime.getSeconds();


          } else if (body.code == '10010') {
            console.log('没有商品');
          } else {
            console.log('PHP有bug');
          }
        });
      },



    }
</script>

<style lang="scss" scoped>
#confirm{
  width: 10rem;
  min-height: 100vh;
}
</style>
