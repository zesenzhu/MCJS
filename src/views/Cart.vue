<template>
  <div id="Cart">
    <div class="C-head">
      <span class="CH-tips">购物车({{AllGoodsNum}})</span>
      <span class="CH-admin" v-on:click="check_manage=!check_manage">{{check_manage?'管理':'完成'}}</span>
    </div>
    <div class="container">
      <div class="container-top">
        <span class="CT-text-1">购物车</span>
        <span class="CT-text-2">共{{AllGoodsNum}}件宝贝</span>
        <span class="CH-admin" v-on:click="check_manage=!check_manage">{{check_manage?'管理':'完成'}}</span>
      </div>
      <div class="CartCard-box">
        <CartCard v-if="AllGoodsNum" v-for="(good,index) in Message" :key="index" :MyKey="index"
                  :Message='Message'></CartCard>
        <div class="CartCard-box-no" v-if="!AllGoodsNum">
          <p>你的购物车为空哦~<br/>马上去选购自己的商品吧</p>
        </div>
      </div>
      <div></div>
    </div>
    <div class="checkOut" v-if="check_manage">
      <div class="co-allSelect">
        <!--<input class="co-checkbox" v-model='AllSelect' v-on:click="AllSelectHandle" type="checkbox">-->
        <span class="footer-handle" v-bind:class="{SelectState:AllSelect}" v-on:click="AllSelectHandle"></span>
        <span class="co-tips">全选</span>
      </div>
      <div class="co-handle">
        <span class="co-money">合计:<span>￥{{$store.state.cartGoodsPriceAll}}</span></span>
        <a class="co-btn" @click="coBtn">结算({{$store.state.cartGoodsSelectNum}})</a>
      </div>
    </div>
    <div class="manage" v-if="!check_manage">
      <div class="m-allSelect">
        <!--<input class="m-checkbox" v-model='AllSelect' v-on:click="AllSelectHandle" type="checkbox">-->
        <span class="m-footer-handle" v-bind:class="{SelectState:AllSelect}" v-on:click="AllSelectHandle"></span>
        <span class="m-tips">全选</span>
      </div>
      <div class="m-handle">
        <span class="m-money">清理</span></span>
        <a class="m-btn" v-on:click="mBtn(params)" id="m-btn">删除</a>
      </div>
    </div>
    <CommonNav></CommonNav>
    <LayerConfirm ></LayerConfirm>
  </div>
</template>

<script>
  import CommonNav from "@/components/common/CommonNav";
  import CartCard from "@/components/cart/CartCard";
  import LayerConfirm from "@/components/layer/LayerConfirm";
  import { mapGetters } from 'vuex'
  export default {
    name: "Cart",
    components: {CommonNav, CartCard,LayerConfirm},
    template: {CommonNav, CartCard,LayerConfirm},

    data(){
      return {
        Message: '',
        AllGoodsNum: '',
        AllSelect: false,
        AllSelect2: false,
        check_manage: true,
        admin_text: '管理',
        params: {
          content: '确定删除？',//文本内容
          handle: $('#m-btn'),//操作来源
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
                $this.$store.commit('cartGoodsSelectAll',{
                  boolean:false
                });
              $this.reload();
//              $this.$http.post("/php/cart/getCart.php", {goods_buyer_id: userId}, {emulateJSON: true}).then(function (res) {
//                console.log(res.body);
//                $this.Message = res.body.data;
//                //购物车商品数
//                $this.AllGoodsNum = $this.Message ? $this.Message.length : 0;
//                $this.$store.state.cartGoodsAll['msg'] = res.body.data;
//
//
//              },function (err) {
//                this.$Message(err)
//              })
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
    computed:{
      CartGoods(){
//        let a = this.$store.state.cartGoodsSelect;
//        return this.$store.state.cartGoods;
      },
      cartGoodsSelectAdverse(){
        let a = this.$store.state.cartGoodsSelect;
        console.log(this.$store.state.cartGoodsSelectAdverse)
        return this.$store.state.cartGoodsSelectAdverse
      }
    },
    created(){
      let $this = this,
        userId = sessionStorage.getItem("userId"),Mbtn = $("#m-btn");
      console.log($this.$store.state.cartGoodsAll['msg'])
      /*if($this.$store.state.cartGoodsAll['msg'] != undefined){
        $this.Message = $this.$store.state.cartGoodsAll['msg'];
        $this.AllGoodsNum = $this.Message ? $this.Message.length : 0;
      }else{*/
        $this.$http.post("/php/cart/getCart.php", {goods_buyer_id: userId}, {emulateJSON: true}).then(function (res) {
          console.log(res.body);
          $this.Message = res.body.data;
          //购物车商品数
          $this.AllGoodsNum = $this.Message ? $this.Message.length : 0;
          $this.$store.state.cartGoodsAll['msg'] = res.body.data;


        },function (err) {
          this.$Message(err)
        })
//      }

    },
    beforeMount(){
      //params传入
      let $this =this;
      this.$store.commit('layerConfirmParamsHandle',{
        params:$this.params
      })
      console.log($this.$store.state.layerConfirmParams)
    },
    mounted(){
      let $this = this;

      //距离顶部变化head透明度
      $(window).on("scroll", function (e) {
        let Opacity = $(window).scrollTop() / $(".C-head").height();
        $(".C-head").css("opacity", Opacity);
      });
      console.log($this.AllSelect)


//购物车总价
      //console.log($this.$store.getters.cartGoodsPriceAll)
    },
    methods:{
      mBtn(params){
        let cartGoods = this.$store.state.cartGoods,i= 0;
        console.log(this.$store.state.cartGoods)
        for(let k in cartGoods){
          if(cartGoods[k]){
            i++;
          }
        }
        if(i==0){
          this.$Message("你还没有选择宝贝哦!");
        }else{
          this.params.hide = false;
          console.log(this.params.hide)
        }

      },
      AllSelectHandle(){
        let $this = this;
        $this.AllSelect = !$this.AllSelect;
        this.$store.commit('cartGoodsSelectAll',{
          boolean:$this.AllSelect
        });

        //console.log($this.AllSelect,this.$store.state.cartGoodsSelect);
      },
      coBtn(){
        let cartGoods = this.$store.state.cartGoods,i= 0;
        console.log(this.$store.state.cartGoods)
        for(let k in cartGoods){
          if(cartGoods[k]){
            i++;
          }
        }
        if(i==0){
          this.$Message("你还没有选择宝贝哦!");
        }else{
          this.$router.push({path:'/confirm/0'});
        }
      }
    },
    watch:{
      params(val){
        this.$store.commit('layerConfirmParamsHandle',{
          params:val
        })
      },
      CartGoods(val){
//        let mySelect = true;
//        console.log(val)
//        for(var k in val){
//          console.log(val[k])
//          if(!val[k]){
//            mySelect = false;
//            break;
//          }else{
//            mySelect = true;
//          }
//        }
//
//          this.AllSelect = mySelect;
//
//        console.log(this.AllSelect)
      },
      cartGoodsSelectAdverse(val){
        this.AllSelect = val;
      }
    }
  }
</script>

<style lang="scss" scoped>
  #Cart {
    position: relative;
    width: 10rem;
    background: #eee;
    min-height: 100vh;

  .C-head {
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

  .CH-tips {
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

  .CH-admin {
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
  .container {
    min-height: 120vh;
    position: relative;
    width: 10rem;

  .container-top {
    position: relative;
    height: 3rem;
    background: #7ac23c;
    width: 10rem;

  .CT-text-1 {
    position: absolute;
    color: #fff;
    font-size: 0.5rem;
    font-weight: bold;
    line-height: 1rem;
    left: 0.2rem;
  }

  .CT-text-2 {
    position: absolute;
    color: #fff;
    font-size: 0.4rem;
    line-height: 1rem;
    left: 0.2rem;
    top: 1rem;
  }

  .CH-admin {
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
  .CartCard-box {
    position: relative;
    top: -1rem;
    min-height: 80vh;

  .CartCard-box-no {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    height: 80vh;
    width: 100%;

  p {
    text-align: center;
    color: #7AC23C;
    font-size: 0.5rem;
    line-height: 1rem;
  }

  }
  }

  }

  }

  .checkOut{
    position: fixed;
    width: 10rem;
    bottom: 1.4rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 1.6rem;
    background: #fff;
    border-top: 1px #999 solid;

  .footer-handle{
    position: relative;
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    left: 0;
    top: 0.15rem;
    border-radius: 50%;
    border: 2px #666 solid;
    overflow: hidden;
    z-index: 1;


  }

  .co-checkbox{
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0;
    top: 0.5rem;
    opacity: 0;
    z-index: 2;


  }

  .SelectState{
    background:  url(../assets/icon-select.png)no-repeat center center;
    background-size: contain;

  }

  .co-allSelect{
    height: 1.6rem;
    position: absolute;
    left: 0.2rem;

    .co-tips{
      position: relative;
      margin-left: 0.2rem;
      line-height: 1.6rem;
      text-align: center;
      color: #666;
      font-size: 0.4rem;
    }

  }

  .co-handle{
    position: absolute;
    top: 0;
    right: 0.2rem;
    width: 5rem;
    height: 1.6rem;


    .co-money{
      position: absolute;
      height: 1.6rem;
      line-height: 1.6rem;
      font-size: 0.4rem;
      color: #000;
      text-align: right;
      margin-right:0.2rem;
      span{
        color: #7AC23C;
      }
    }

  .co-btn{
    position: absolute;
    right: 0;
    top:0.2rem;
    height: 1.2rem;
    min-width: 2.5rem;
    line-height: 1.2rem;
    border-radius: 0.6rem;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
    background: #7AC23C;
  }
  }
  }

  .manage{
    position: fixed;
    width: 10rem;
    bottom: 1.4rem;
    left: 0;
    right: 0;
    margin: 0 auto;
    height: 1.6rem;
    background: #fff;
    border-top: 1px #999 solid;

  .m-footer-handle{
    position: relative;
    display: inline-block;
    width: 0.6rem;
    height: 0.6rem;
    left: 0;
    top: 0.15rem;
    border-radius: 50%;
    border: 2px #666 solid;
    overflow: hidden;
    z-index: 1;


  }

  .m-checkbox{
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    left: 0;
    top: 0.5rem;
    opacity: 0;
    z-index: 2;


  }

  .SelectState{
    background:  url(../assets/icon-select.png)no-repeat center center;
    background-size: contain;

  }

  .m-allSelect{
    height: 1.6rem;
    position: absolute;
    left: 0.2rem;

  .m-tips{
    position: relative;
    margin-left: 0.2rem;
    line-height: 1.6rem;
    text-align: center;
    color: #666;
    font-size: 0.4rem;
  }

  }

  .m-handle{
    position: absolute;
    top: 0;
    right: 0.2rem;
    width: 5rem;
    height: 1.6rem;


  .m-money{
    position: absolute;
    height: 1.6rem;
    line-height: 1.6rem;
    font-size: 0.4rem;
    color: #000;
    text-align: right;
    margin-right:0.2rem;
  span{
    color: #7AC23C;
  }
  }

  .m-btn{
    position: absolute;
    right: 0;
    top:0.2rem;
    height: 1.2rem;
    min-width: 2rem;
    line-height: 1.2rem;
    border-radius: 0.6rem;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
    background: #7AC23C;
  }
  }
  }
</style>
