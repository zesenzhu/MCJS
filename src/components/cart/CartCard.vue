<template>
  <div id="CartCard">
    <div class="cc-content">
      <div class="cc-header">

        <span class="header-handle">
        </span>
        <input class="cc-checkbox" type="checkbox">
      </div>
      <router-link class="cc-center" :to="'/Product/'+Message[MyKey]['goodsMsg'].id+'/Simple'">
        <img class="cc-img" :src="'http://www.zhuzesen.work/'+Message[MyKey]['goodsMsg']['thumb']">
        <p class="cc-name" >{{Message[MyKey]['goodsMsg']['name']}}</p>
        <p class="cc-region">学校：{{Message[MyKey]['goodsMsg']['region']}}</p>
      </router-link>
      <div class="cc-footer">
        <span class="cc-money"></span>
        <span class="quantityHandle">
          <span class="cc-reduce">-</span>
          <input type="number" v-model="quantity">
          <span class="cc-reduce">+</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "CartCard",
      props:["MyKey","Message"],
      data(){
          return{
            quantity:''
          }
      }
    }
</script>

<style lang="scss" scoped>
#CartCard{
  width: 9rem;
  height: 4rem;
  position: relative;
  left: 50%;
  margin-left: -4.5rem;
  background: #fff;
  border-radius: 0.2rem;
  margin-bottom: 0.5rem;
  overflow: hidden;

  .cc-content{
    position: relative;
    padding:0 0.2rem;

    .cc-header{
      position: relative;
      height: 1rem;
      padding: 0.2rem 0;
      .header-handle{
        position: relative;
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 50%;
        border: 2px #666 solid;


      }

      .cc-checkbox{
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        left: 0;
        top: 0.2rem;
        opacity: 0;


      }

      .cc-checkbox + .header-handle{
        background: #7ac23c;
      }

    }
    .cc-center{
      position: relative;
      height: 2rem;
      overflow: hidden;
      display: inline-block;

      .cc-img{
        height: 2rem;
        width: 2rem;
        float: left;
        margin-left: 0.2rem;
      }

      .cc-name{
        float: right;
        display: inline-block;
        line-height: 0.6rem;
        width: 5.8rem;
        font-size: 0.4rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        margin-left: 0.2rem;
      }
      .cc-region{
        position: absolute;
        bottom: 0;
        display: inline-block;
        line-height: 0.8rem;
        margin-left: 0.2rem;
        width: 6rem;
        font-size: 0.3rem;
        text-align: left;

      }
    }
    .cc-footer{
      position: relative;
      height: 1rem;
      width: 100%;

      .quantityHandle{
        position: relative;
      }
    }
  }
}
</style>
