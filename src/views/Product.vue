<template>
  <div class="Product">
    <GoodsDetailsHeader :to-path="toPath"></GoodsDetailsHeader>
    <router-view class="simple_details"></router-view>
  </div>
</template>

<script>
  import GoodsDetailsHeader from '../components/goods/GoodsDetailsHeader'

  export default {
    name: "Product",
    components: {GoodsDetailsHeader},
    template: {GoodsDetailsHeader},
    data() {
      return {
        productPHP: '/php/goods/productMassage.php',
        productMassage: '',
        toPath:'',
      }
    },
    created() {
      /*let goodsId = this.$route.params['goods_id'];
      console.log(this.$route.params['goods_id']);
      this.$http.get(this.productPHP, {params: {goods_id: goodsId}}).then(function (res) {
        let body = res.body;
        if (body.code = '10000') {
          this.productMassage = body.goods;
          console.log(this.productMassage);
        } else if (body.code = '10010') {
          console.log('没有商品');
        } else {
          console.log('PHP有bug');
        }
      });*/
    },
    mounted() {

    },
    beforeRouteUpdate(to, from, next) {
      // 在渲染该组件的对应路由被 confirm 前调用
      // 不！能！获取组件实例 `this`
      // 因为当钩子执行前，组件实例还没被创建



      this.toPath = to.path.split("/")[3];
      console.log(this.toPath);
      next(vm=>{
        vm.oldUrl = from.path;
      })
    },
  }
</script>

<style lang="scss" scoped>
  .Product {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

    .simple_details {
      margin-top: 1.4rem;
    }
  }
</style>
