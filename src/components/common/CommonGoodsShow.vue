<template>
<div class="CommonGoodsShow">
<div class="goodBox" v-for="good in goods">
  <GoodsShowFirst  v-bind:good="good">

  </GoodsShowFirst>
</div>
</div>
</template>

<script>
  import GoodsShowFirst from '../goods/GoodsShowFirst'
    export default {
        name: "CommonGoodsShow",
      props:['goodsShowUrl'],
      components:{GoodsShowFirst},
      template:{GoodsShowFirst},
      data(){
          return{
            oldGoods:{0: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/1.jpg", a_url: "www.baidu.com"},
              1: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/2.jpg", a_url: "www.baidu.com"},
              2: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/3.jpg", a_url: "www.baidu.com"},
              3: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/4.jpg", a_url: "www.baidu.com"},
              4: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/5.jpg", a_url: "www.baidu.com"},
              /* 5: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/6.jpg", a_url: "www.baidu.com"},
               6: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/7.jpg", a_url: "www.baidu.com"}*/},
            goods: [],
            a_urls:[],
            i:0
          }
      },
      created(){
        this.$http.get(this.goodsShowUrl).then(function (res) {
          let body = res.body;
          if(body.code = '10000'){
            this.goods = body.goods;;
          }else if(body.code = '10010'){
            console.log('没有商品');
          }else{
            console.log('PHP有bug');
          }
        })

        if(this.goods == ''){
          // this.$emit('message', this.pictures);
          this.goods = this.oldGoods;

        }
      },
    }
</script>

<style lang="scss" scoped>
.CommonGoodsShow{
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  background-color: #cccccc;
  width: 10rem;
  min-height: 10rem;

  .goodBox{
    margin-bottom: 0.05rem;
    background-color: #fff;
  }
  .goodBox:nth-of-type(2n+1){
    margin-right: 0.025rem;
  }

  .goodBox:nth-of-type(2n){
    margin-left: 0.025rem;
  }
}
</style>
