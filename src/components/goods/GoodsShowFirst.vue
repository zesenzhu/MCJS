<template>
    <div class="GoodsShowFirst" >
      <router-link :to="'/Product/'+good.goods_id+'/Simple'">
        <div >
          <img class="goodsImg" :src="'http://www.zhuzesen.work/'+good.thumb">
          <p class="goodsName">{{good.name}}</p>
          <div class="goodsPriceBox">
            <span class="goodsPrice">{{'￥'+good.price}}</span>
            <span v-if="good.reduceprice" class="goodsPriceSub">{{good.reduceprice}}</span>
          </div>
        </div>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "GoodsShowFirst",
      props:["good"],
      mounted(){
          // console.log(this.good)
      }
    }
</script>

<style lang="scss" scoped>
.GoodsShowFirst{
  position: relative;
  width: 4.975rem;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;

  .goodsImg{
    width: 4.975rem;
    height: 4.975rem;

  }
  .goodsName{
    line-height: 0.35rem;
    /*height: 1.1rem;*/
    color: #333333;
    font-size: 0.3rem;
    padding: 0 0.1rem;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
  }

  .goodsPriceBox{
    height: 0.5rem;

    .goodsPrice{
      line-height: 0.5rem;
      color: red;
      font-size: 0.35rem;
    }

    .goodsPriceSub{
      border: 1px solid red ;
      height: 0.5rem;
      line-height: 0.5rem;
      color: red;
      font-size: 0.35rem;
    }
  }
}
</style>
