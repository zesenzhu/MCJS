<template>
  <div class="CartCard">
    <div class="cc-content">
      <div class="cc-header">


        <input class="cc-checkbox" type="checkbox"  v-model="select">
        <span class="header-handle">
        </span>
      </div>
      <router-link class="cc-center" :to="'/Product/'+goodsMsg.id+'/Simple'">
        <img class="cc-img" :src="'http://www.zhuzesen.work/'+goodsMsg['thumb']">
        <p class="cc-name" >{{goodsMsg['name']}}</p>
        <p class="cc-region">学校：{{goodsMsg['region']}}</p>
        <p class="cc-price">单价：￥{{goodsMsg['price']}}</p>
      </router-link>
      <div class="cc-footer">
        <span class="cc-money">总价：￥{{allPrice}}</span>
        <span class="quantityHandle">
          <span class="cc-reduce" >-</span>
          <input type="number" class="cc-quantity" v-model="quantity">
          <span class="cc-add" >+</span>
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
            goodsQuantity:'',
            goods:'',
            goodsMsg:'',
            allPrice:'',
            select1:false,


          }
      },
      created(){
        let $this = this;
        $this.goods = $this.Message[$this.MyKey];
        $this.goodsMsg = $this.Message[$this.MyKey]['goodsMsg'];
        $this.quantity = $this.Message[$this.MyKey]['quantity'];
        $this.allPrice = $this.quantity*$this.goodsMsg['price'];
//        console.log($this.goods);
      },
      beforeMount(){
        let $this = this ;


      },
      mounted(){
        let $this = this ;
        //商品数变化
        $(this.$el).find(".cc-quantity").blur(function (e) {
          $this.checkQuantity($this.quantity);
        });
        $($this.$el).find(".cc-reduce").on("click",function (e) {
          $this.quantity--;
          $this.checkQuantity($this.quantity);
        });
        $($this.$el).find(".cc-add").on("click",function (e) {
          $this.quantity++;
          $this.checkQuantity($this.quantity);
        });




      },
      computed:{
        select:{
          // getter
          get: function () {
            console.log(this.select1,this.$store.state.cartGoodsSelect);
            if(this.select1 == false && this.$store.state.cartGoodsSelect == true){
              this.$store.commit('cartGoodsSelectAdverseHandle',{
                boolean:false
              });
              console.log(this.select1,this.$store.state.cartGoodsSelect);
            }
            this.selectAll(this.select1);
            return this.select1;
            //console.log("selectget");
          },
          // setter
          set: function (newValue) {
//            if(newValue==false){
//              this.$store.commit('cartGoodsSelectAll',{
//                boolean:newValue
//              });
//            }

            this.select1 = newValue;
            this.selectAll(newValue);
            //console.log("selectset"+this.select1);
          }

        },
        quantity:{
          get: function () {
            this.selectAll(this.select1);
            //console.log("quantityget");
            return this.goodsQuantity;
          },
          // setter
          set: function (newValue) {
            this.selectAll(this.select1);
            this.goodsQuantity = newValue;
            this.allPrice = this.goodsMsg['price']* newValue;
           //console.log(newValue);
          }
        },
        selectCenter(){
          return this.$store.state.cartGoodsSelect;
        }
      },
      methods:{
        checkQuantity(Quantity){
          let $this = this, userId = sessionStorage.getItem("userId"),
            goodsId = this.goods["goods_id"];
          console.log(Quantity,parseInt(this.goodsMsg["quantity"]))
          if(this.goodsMsg != ''){
            if(Quantity==''&&Quantity!=0){
              this.quantity = parseInt($this.Message[$this.MyKey]['quantity']);
              console.log(1)
            }else if(Quantity <= 0){
              this.quantity = 1;
              console.log(2)
            }else if(Quantity > parseInt(this.goodsMsg["quantity"])) {
              this.quantity = parseInt(this.goodsMsg["quantity"]);
              this.$Message("该商品卖家只有" + this.goodsMsg["quantity"] + this.goodsMsg["unit"] + "哦");
              console.log(3)
            }
                $this.$http.post("/php/cart/changeCartGoods.php",{quantity:$this.quantity,userId:userId,goodsId:goodsId},{emulateJSON: true}).then(function (res) {

                },function (err) {
                  //this.quantity = $this.Message[$this.MyKey]['quantity'];;
                  console.log(err)
                })

          }
        },
        selectAll(boolean){
          var $this = this;

          //console.log(boolean)
            this.$store.commit('cartGoodsHandle', {
              goodsId: $this.Message[$this.MyKey]['goods_id'],
              boolean:boolean
            });
          if(boolean){
            this.$store.commit('cartGoodsPriceHandle', {
              goodsId: $this.Message[$this.MyKey]['goods_id'],
              AllPrice:$this.allPrice
            });
          }else{
            this.$store.commit('cartGoodsPriceHandle', {
              goodsId: $this.Message[$this.MyKey]['goods_id'],
              AllPrice:0
            });
          }
          this.$store.commit('cartGoodsPriceAllHandle');
          //console.log($this.$store.state.cartGoods,$this.$store.state.cartGoodsPrice.__ob__.value["goodsId-2"], $this.$store.state.cartGoodsSelect);

        },

      },
      watch: {
        selectCenter(val){

          this.select = val;

        }
      }
    }
</script>

<style lang="scss" scoped>
.CartCard{
  width: 9rem;
  min-height: 4rem;
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
        z-index: 1;

      }

      .cc-checkbox{
        position: absolute;
        width: 0.6rem;
        height: 0.6rem;
        left: 0;
        top: 0.2rem;
        opacity: 0;
        z-index: 2;


      }

      .cc-checkbox:checked + .header-handle{
        background:  url(../../assets/icon-select.png)no-repeat center center;
        background-size: contain;

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
.cc-price{
  position: relative;
  bottom: 0;
  float: right;
  display: inline-block;
  line-height: 0.8rem;
  margin-left: 0.2rem;
  width: 2rem;
  font-size: 0.3rem;
  text-align: left;
  color: red;

}
    }
    .cc-footer{
      position: relative;
      height: 1rem;
      width: 100%;

    .cc-money{
      width: 3rem;
      position: relative;
      line-height: 1rem;
      text-align: left;
      font-size: 0.4rem;
      margin-left: 0.2rem;
      color: red;

    }

      .quantityHandle{
        position: relative;
        float: right;
        width: 2.4rem;
        height: 0.8rem;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        box-sizing: content-box;
        border: 1px #333 solid;


        span{
          width: 0.8rem;
          height: 0.8rem;
          display: inline-block;
          line-height: 0.8rem;
          text-align: center;
          font-size: 0.4rem;
          color: #999;

        }

        input{
          width: 0.8rem;
          line-height: 0.8rem;
          text-align: center;
          border-left: 1px #333 solid;
          border-right: 1px #333 solid;
        }
      }
    }
  }
}
</style>
