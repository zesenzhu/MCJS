<template>
<div class="goodsBottom">
<div class="gb-left">
  <span class="toComment" ><i class="icon-comment"></i><span>评论</span></span>
  <span class="toCollect"><i class="icon-collect" v-bind:class="{'icon-collect-active':collectActive}"></i><span>收藏</span></span>
  <span class="toMessage"><i class="icon-message"></i><span>私信</span></span>
</div>
  <div class="gb-right">
    <span class="addToCar">加入购物车</span>
    <span class="toBuy">购买</span>
  </div>

</div>
</template>

<script>
  import ModalsComment from "../modal/ModalsComment"
    export default {
        name: "GoodsBottom",
      components:{ModalsComment},
      template:{ModalsComment},
      props:["goodsCollect"],
      data(){
          return {
            layer1:'',
            collectActive:false
          }
      },
      watch:{
        goodsCollect:function (val) {
          if(this.goodsCollect == "1"){
            this.collectActive = true;
          }else if(this.goodsCollect == "0"){
            this.collectActive = false;
          }
          console.log(this.goodsCollect);
        }
      },
      mounted(){
          let $this = this,goodsId = this.$route.params.goods_id,userName = sessionStorage.getItem("username"),$toBuy = $(".toBuy");

        //立即购买
        $toBuy.on("click",function (e) {
          $("#BuyGoods").slideDown();
        })

        $(".toComment").on("click",function () {

          //this.$layer.alert("找不到对象！");
          $this.layer1 = $this.$layer.iframe({
            content: {
              content: ModalsComment, //传递的组件对象
              parent: $this,//当前的vue对象
              data:{}//props
            },
            area:['8rem'],
            title: '写评论',
            shade: true,//是否显示遮罩
            shadeClose: true,//点击遮罩是否关闭
          });
          window.layer1 = $this.layer1;
          console.log(window.layer1)
        });
        $(".toCollect").on("click",function (e) {
          $this.collectActive = !$this.collectActive;

          $this.$http.post(
            "/php/handle/buyerCollect.php",
            {goods_id:goodsId,userName:userName,collectActive:$this.collectActive},
            {emulateJSON: true}
          ).then(function (res) {

            let Body = res.body;
            console.log(Body);
            if(Body.code=="10000"){
              if($this.collectActive){
                this.$Message("收藏成功",3000);
              }else{
                this.$Message("取消收藏成功",3000);
              }


            }
          })
        })

      },
      methods:{
         toComment(){}
      }
    }
</script>

<style lang="scss" scoped>
.goodsBottom{
  position: fixed;
  bottom: 0;
  width: 10rem;
  height: 1.4rem;
  background: #fff;

  .gb-left{
    float: left;
    width: 50%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: flex-end;

    .toComment,.toCollect,.toMessage{
      position: relative;
      flex:1;
      text-align: center;
      height: 100%;
      color: #7ac23c;
      font-size: 0.3rem;
      span{
        line-height: 0.7rem;
      }
      i{
        display: inline-block;
        width: 100%;
        height: 0.4rem;
        position: relative;
        top: 0.2rem;

      }
      .icon-comment{
        background: url("../../assets/icon-comment.png")no-repeat center center;
        background-size: contain;
      }
      .icon-collect{
        background: url("../../assets/icon-collect.png")no-repeat center center;
        background-size: contain;
      }
      .icon-collect-active{
        background: url("../../assets/icon-collect-1.png")no-repeat center center;
        background-size: contain;
      }
      .icon-message{
        background: url("../../assets/icon-message.png")no-repeat center center;
        background-size: contain;
      }
    }

  }
  .gb-right{
    float: right;
    margin-right: 0.5rem;
    width: 4rem;
    height: 1.2rem;
    border-radius: 0.6rem;
    margin-top: 0.1rem;
    overflow: hidden;

    span{
      color: #fff;
      text-align: center;
      line-height: 1.2rem;
    }
    .addToCar{
      width: 50%;
      float: left;
      display: inline-block;
      background: rgba(122, 194, 60, 0.5);
    }
    .toBuy{
      width: 50%;
      display: inline-block;
      background: rgb(122, 194, 60);
    }
  }
}
</style>
