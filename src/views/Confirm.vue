<template>
  <div id="confirm">
    <div class="head"><span class="backBtn" @click="back"><span class="back"></span>确认订单</span></div>
    <ConfirmBox v-for="box in productMassage" v-bind:box="box" :key="box.id"></ConfirmBox>
    <div class="footer">
      <span class="tips">
        <span class="footer-1">共{{$store.state.confirmGoodsNum}}件</span>
        <span class="footer-2">合计：</span>
        <span class="footer-3">￥{{$store.state.confirmGoodsPrice}}</span>
      </span>
      <span class="confirmBtn" v-on:click="confirmBtn(params)" id="confirmBtn">提交订单</span>
    </div>
    <LayerConfirm ></LayerConfirm>
  </div>
</template>


<script>
  import ConfirmBox from '../components/comfirm/ConfirmBox'
  import LayerConfirm from "@/components/layer/LayerConfirm";
  export default {
    name: "Confirm",
    components: {ConfirmBox,LayerConfirm},
    template: {ConfirmBox,LayerConfirm},
    data(){
      return {
        productMassage: '',
        productPHP: '/php/goods/productConfirm.php',
        quantity:'',
        params: {
          content: '确定提交？',//文本内容
          handle: $('#confirmBtn'),//操作来源
          screen: true,//是否要幕布
          screenHandle: true,//点击幕布关闭弹层
          hide: true,//弹层显示状态
          confirm($this){//确认后要做什么
            let cartGoods = $this.$store.state.cartGoods, i = 0, deleteGoods = [], userId = sessionStorage.getItem("userId");
            for (let key in cartGoods) {
              if (cartGoods[key]) {
                deleteGoods[i] = key.split("-")[1];
                i++;
              }
            }
            $this.$http.post("/php/cart/changeCartGoods.php",
              {deleteGoods: deleteGoods, userId: userId},
              {emulateJSON: true}).then(function (response) {
                console.log(response);

              $this.$router.push({path:'/Success'})
              }, function (error) {
                $this.$Message(error);
              }
            )

//            $this.$ajax({url:"/php/cart/changeCartGoods.php",method: 'post',
//              data:{deleteGoods: deleteGoods, userId: userId}}).then(function (response) {
//                console.log(response);
//              }
//            ).catch(function (error) {
//              $this.$Message(error);
//            })

          }
        }
      }
    },
    beforeMount(){
      let $this = this, goodsId = '';
      this.goodsCheck();
      if (!$this.$store.state.confirmGoods) {
        if (!sessionStorage.getItem("confirmGoods")) {
          $this.$router.push({path: '/Main'});
        } else {
          goodsId = sessionStorage.getItem("confirmGoods")
        }
      } else {
        goodsId = $this.$store.state.confirmGoods;
      }

      if($this.$route.params['goods_id'] != 0 && !$this.$store.state.confirmGoodsDetails){
        $this.$router.push({path: '/Main'});
      }

      console.log(goodsId)
      let userName = sessionStorage.getItem("username");
      let userId = sessionStorage.getItem("userId");
      this.$http.post(this.productPHP, {
        goods_id: goodsId,
        username: userName,
        userId: userId
      }, {emulateJSON: true}).then(function (res) {
        let body = res.body;

        this.productMassage = body.goods;

      });


      //params传入
      this.$store.commit('layerConfirmParamsHandle',{
        params:$this.params
      })
      console.log($this.$store.state.layerConfirmParams)
    },
    methods: {
      confirmBtn(params){


          this.params.hide = false;
          console.log(this.params.hide)


      },
      goodsCheck(){
        console.log(this.$route.params["goods_id"]);
        if (this.$route.params["goods_id"] != 0) {
          this.$store.commit("confirmGoodsHandle", {
            Goods: this.$route.params["goods_id"]
          })
          this.quantity = this.$store.state.confirmGoodsDetails;
        } else {
          let goods = this.$store.state.cartGoods, goodsId = '';
          for (let key in goods) {
            if (goods[key] == true) {
              if (goodsId == '') {
                goodsId += key.split("-")[1];
              } else {
                goodsId += '-' + key.split("-")[1];
              }

            }
          }
          this.$store.commit("confirmGoodsHandle", {
            Goods: goodsId
          })
        }

        sessionStorage.setItem("confirmGoods", this.$store.state.confirmGoods)
        console.log(this.$store.state.confirmGoods)
      },
      back(){
        this.$router.go(-1);
        console.log(this.oldUrl);
      },
    },
    beforeRouteUpdate(to,from,next){
      this.$store.commit("confirmGoodsNumHandle",{
        begin:true
      })
      console.log(this.$store.state.confirmGoodsNum)
      next()
    }
    ,
    beforeRouteEnter(to,from,next){

      next(vm =>{
        vm.$store.commit("confirmGoodsNumHandle",{
          begin:true
        })
        console.log(vm.$store.state.confirmGoodsNum)
      })
    }
    ,
    computed: {
      goodsMsg(){
        return this.$store.state.confirmGoods;
      }
    },
    watch: {
      goodsMsg(val){

      }
    }


  }
</script>

<style lang="scss" scoped>
  #confirm {
    width: 10rem;
    min-height: 100vh;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    background: #eee;
    padding-bottom: 0.2rem;
    margin-bottom: 1.4rem;

  .head {
    width: 100%;
    height: 1.4rem;
    position: relative;

  .backBtn {
    position: relative;
    line-height: 1.4rem;
    color: #666;
    font-size: 0.5rem;
    display: inline-flex;
  }

  .back {
    position: relative;
    display: inline-block;
    left: 0;
    width: 1.4rem;
    height: 1.4rem;
    background: url("../assets/confirmBack.png") no-repeat center center;
    background-size: 0.8rem 0.8rem;
    z-index: 999;
  }

  }
  .footer {
    position: fixed;
    height: 1.4rem;
    width: 10rem;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    margin: 0 auto;

  .tips {
    line-height: 1.4rem;
    width: 6rem;
    text-align: right;
    position: relative;
  display: inline-block;

  span {
    font-size: 0.4rem;
    line-height: 1.4rem;
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
  .confirmBtn{
    position: relative;
    width: 3rem;
    height: 1rem;
    top:0.2rem;
    right: 0.2rem;
    float: right;

    display: inline-block;
    line-height: 1rem;
    text-align: center;
    border-radius: 0.5rem;
    color: #fff;
    font-size: 0.4rem;
    background: #7AC23C;

  }

  }

  }
</style>
