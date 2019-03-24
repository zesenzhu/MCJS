<template>
  <div class="Swiper">
    <div class="swiper-container">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="picture in pictures">
          <!--<a v-bind:href="picture.a_url" >-->
          <a>
            <img class="swiper-img" v-bind:src="picture.pictureUrl">
          </a>
        </div>

      </div>
      <!-- 如果需要分页器 -->
      <div v-if="this.hasPagination" class="swiper-pagination"></div>

      <!-- 如果需要导航按钮 -->
      <div v-if="this.hasButton" class="swiper-button-prev"></div>
      <div v-if="this.hasButton" class="swiper-button-next"></div>

      <!-- 如果需要滚动条 -->
      <div v-if="this.hasScrollbar" class="swiper-scrollbar"></div>
    </div>
  </div>
</template>

<script>
  import '../takeout/swiper.min.js'
  import Swiper from "swiper"

  export default {
    name: "Swiper",
    props: ['pictureUrl', 'hasButton', 'hasScrollbar', 'hasPagination','message'],
    data(){
      return{
        oldPictures:{0: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/1.jpg", a_url: "www.baidu.com"},
          1: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/2.jpg", a_url: "www.baidu.com"},
          2: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/3.jpg", a_url: "www.baidu.com"},
          3: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/4.jpg", a_url: "www.baidu.com"},
          4: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/5.jpg", a_url: "www.baidu.com"},
         /* 5: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/6.jpg", a_url: "www.baidu.com"},
          6: {pictureUrl: "http://www.zhuzesen.work/upload/img/swiper/7.jpg", a_url: "www.baidu.com"}*/},
        pictures: [],
        a_urls:[],
        i:0
      }
    },
    created(){
      this.$http.get(this.pictureUrl).then(function (res) {
        let body = res.body;
        if(body.code = '10000'){
          this.pictures = body.pictures;
        }else if(body.code = '10404'){
          console.log('数据库错误');
        }else{
          console.log('PHP有bug');
        }
      })

      if(this.pictures == ''){
        // this.$emit('message', this.pictures);
        this.pictures = this.oldPictures;

      }
    },
    mounted() {
      var mySwiper = new Swiper('.swiper-container', {
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
      console.log(mySwiper.pagination)
    }
  }
</script>

<style lang="scss" scoped>


  .swiper-container {
    width: 10rem;
    height: 5rem;

  }
  .swiper-pagination-bullet {
    width: 0.2rem;
    height: 0.2rem;
    display: inline-block;
    border-radius: 100%;
    background: rgba(158, 158, 158, 0.45);
    opacity: 0.2;
  }
  .swiper-pagination-bullet-active{
    background: #fff!important;
  }
  .swiper-slide{
    width: 10rem;
    height: 5rem;
    .swiper-img{
      width: 10rem;
      height: 5rem;
    }
  }


</style>
