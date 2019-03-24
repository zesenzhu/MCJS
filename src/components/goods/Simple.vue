<template>
<div class="Simple">
    <p class="showTime">{{FullYear+'年'+Month+'月'+Dates+'日  '+ Hours + ':'+Minutes}}</p>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img in pictures">
        <!--<a v-bind:href="picture.a_url" >-->
          <img class="swiper-img" v-bind:src="'http://www.zhuzesen.work/'+img">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
  <div class="goods-msg">
    <div class="gm-1">
      <p class="goods-name">{{productMassage.name}}</p>
      <p class="gm-price">{{'￥'+productMassage.price}}</p>
    </div>
    <div class="author_msg" >
      <div class="author" v-if="productMassage.classify == 'books'">
        <span class="books-author">作者：<span class="Green">{{productMassage.book_author}}</span></span>
        <span class="author-list">|</span>
        <span class="books-press">出版社：<span class="Green">{{productMassage.book_press}}</span></span>
      </div>
      <router-link class="gm-details" :to="'/Product/'+goods_id+'/Details'" replace>更多介绍<span> > </span></router-link>
    </div>
    <div class="gm-bottom">
      <span class="gm-sellTime">上架期限：<span class="Green">{{productMassage.deadline}}天</span></span>
      <span class="gm-school ">上架区域：<span class="Green">{{productMassage.region}}<span v-if="productMassage.campus">{{'('+productMassage.campus+')'}}</span></span></span>
    </div>

  </div>

  <div class="owner_msg">
    <span class="head-img"><img :src="avatar"></span>
    <div class="msg_1">
      <span class="myMsg">主人：<span class="Green">{{owner.username}}</span></span>
      <span class="myMsg"><span class="Green">{{owner.school}}({{owner.campus}})</span></span>
    </div>
    <div class="msg-top"><span>物品：3件</span></div>
  </div>


    <ShowComment :comments="comment"></ShowComment>
  <BuyGoods v-bind:productMessage="productMassage"></BuyGoods>
  <GoodsBottom v-bind:goods-collect="goodsCollect"></GoodsBottom>
  <!--<Modals></Modals>-->
</div>

</template>

<script>
  import '../../takeout/swiper.min.js'
  import Swiper from "swiper"
  import GoodsBottom from "./GoodsBottom"
  import ShowComment from "./ShowComment"
  import BuyGoods from "./BuyGoods"
    export default {
        name: "Simple",
      components:{GoodsBottom,ShowComment,BuyGoods},
      template:{GoodsBottom,ShowComment,BuyGoods},
      props:[''],
      data(){
          return{
            goodsMassage:'',
            host:'',
            pictureUrl:'',
            productPHP: '/php/goods/productMassage.php',
            productMassage:'',
            FullYear:'',
            Month:'',
            Dates:'',
            Hours:'',
            Minutes:'',
            Seconds:'',
            hasButton:false,
            hasScrollbar:false,
            pictures:[],
            name:'',
            goods_id:222,
            sellTime:'',
            classify:'',
            avatar:"",
            owner:"",
            comment:'',
            goodsCollect:''


          }
      },
      methods:{
          mySwiper(){
            var goodsSwiper = new Swiper('.swiper-container', {
              loop: true,
              autoplay: {
                delay: 3000,
                stopOnLastSlide: false,
                disableOnInteraction: true,
              },
              observer:true,
              observeParents:true,
              observeSlideChildren:true,
              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                //type: 'fraction',
                //type : 'progressbar',
                //type : 'custom',
              },
              // 如果需要前进后退按钮
              nextButton: '.swiper-button-next',
              prevButton: '.swiper-button-prev',
              // 如果需要滚动条
              scrollbar: '.swiper-scrollbar',
            })
          }


      },
      computed:{
         /* PM:{
            get(){
              return this.productMassage.addtime*1000;
            }
          },*/
        /*FullYear:{
          get(){
            let addTime = new Date(this.productMassage.addtime*1000);
            return addTime.getFullYear();
          }
        },
        Month:{
            get(){
              let addTime = new Date(this.productMassage.addtime*1000);
              return addTime.getMonth();
            }
        },
        Dates:{
          get(){
            let addTime = new Date(this.productMassage.addtime*1000);
            return addTime.getDate();
          }
        },
        Hours:{
          get(){
            let addTime = new Date(this.productMassage.addtime*1000);
            return addTime.getHours();
          }
        },
        Minutes:{
          get(){
            let addTime = new Date(this.productMassage.addtime*1000);
            return addTime.getMinutes();
          }
        },
        Seconds:{
          get(){
            let addTime = new Date(this.productMassage.addtime*1000);
            return addTime.getSeconds();
          }
        },*/

      },
      watch:{

      },
      created() {

      },
      mounted(){
          let $this = this;
        let goodsId = this.$route.params['goods_id'];
        $this.goods_id = goodsId;
        let userName = sessionStorage.getItem("username");
        console.log(this.$route.params['goods_id']);
        this.$http.get(this.productPHP, {params: {goods_id: goodsId,username:userName}}).then(function (res) {
          let body = res.body;
          if (body.code = '10000') {
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

            $this.pictures.push($this.productMassage.img);
            $this.pictures.push($this.productMassage.thumb);
            $this.mySwiper();
            if(!$this.productMassage.selltime){
              $this.sellTime = 180;
            }else{
              $this.sellTime = $this.productMassage.selltime;
            }
            if(!$this.productMassage.user_msg){
              $this.avatar = "http://www.zhuzesen.work/upload/img/avatar/MK01.jpg";
            }else {
              $this.avatar = "http://www.zhuzesen.work/"+$this.productMassage.user_msg.avatar;
              $this.owner = $this.productMassage.user_msg;
              $this.comment = $this.productMassage.comment;
            }

          } else if (body.code = '10010') {
            console.log('没有商品');
          } else {
            console.log('PHP有bug');
          }
        });



      },

    }
</script>

<style lang="scss" scoped>
  .Simple{
    position: absolute;
    width: 10rem;
    top:-1.4rem;
    padding-top: 1.4rem;
    min-height: 100vh;
    background: #e9e9e9;
    margin-bottom: 1.4rem;
    .showTime{
      position: absolute;
      left: 0.5rem;
      top: 1.6rem;
      font-size: 0.2rem;
      z-index: 998;
      color: #666;
    }
    .swiper-container{
      background: #fff;
      padding-bottom: 0.2rem;
    }
    .swiper-img{
      position: relative;
      left: 50%;
      margin-top: 1rem;
      margin-left: -2rem;
      width: 4rem;
      height: 4rem;
    }
    .goods-msg{
      position: relative;
      background: #fff;
      .gm-1{
        position: relative;
        width: 7rem;
        left:0.5rem;
        margin-top: 0.2rem;
        .goods-name{
          position: relative;
          display: inline-block;
          line-height: 0.7rem;
          width: 7rem;
          font-size: 0.5rem;
          white-space: nowrap;
          overflow: hidden;text-overflow: ellipsis;
        }
        .gm-price{
          color: #7AC23C;
          font-size: 0.3rem;
          line-height: 0.4rem;
        }

      }
      .gm-details{
        color: #7AC23C;
        font-size: 0.3rem;
        line-height: 0.4rem;
        position: absolute;
        bottom: 0;
        right: 0.5rem;
        top: 0;
        span{
          color: #666;
        }
      }
      .gm-bottom{
        position: relative;
        height: 1rem;

        .gm-sellTime{
          float: left;
          text-align: left;
          padding-left: 0.5rem;
          line-height: 0.4rem;

          font-size: 0.25rem;
          color: #cccccc;
        }
        .gm-school{
          float: right;
          text-align: right;
          padding-right: 0.5rem;
          line-height: 0.4rem;

          font-size: 0.25rem;
          color: #cccccc;
        }
      }
    }
  }

.author_msg{
  position: relative;
  width: 100%;
  height: 0.5rem;
  padding: 0 0.5rem;

  .author{
    float: left;
  }
  .author-list{
    margin: 0 0.2rem;
    font-size: 0.4rem;
  }
  .book-author{
    float: left;

  }
}
.box-divide{
  width: 100%;
  height: 0.1rem;
  background: #7AC23C;
}
  .Green{
    color: #7AC23C;
  }
  .owner_msg{
    position: relative;
    width: 100%;
    min-height: 2rem;
    padding: 0.2rem 0.5rem;
    background: #fff;
    margin: 0.2rem 0;

    .head-img{
      float: left;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 0.75rem;
      border: 1px #333333 solid;
      overflow: hidden;

      img{
        width: 1.5rem;
        height: 1.5rem;
      }
    }
    .msg_1{
      float: left;
      height: 1.5rem;
      width: 5rem;
      margin-left: 0.5rem;

      .myMsg{
        display: inline-block;
        height: 0.75rem;
        width: 100%;
        line-height: 0.75rem;
        font-size: 0.3rem;
      }
    }
    .msg-top{
      position: absolute;
      top: 0;
      right: 0.5rem;
      span{
        line-height: 0.75rem;
      }
    }

  }


</style>
