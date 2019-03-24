<template>
  <div class="CenterNav">
    <div class="" v-for="picture in pictures">
      <router-link v-bind:to="picture.to">
        <img class="cn_img" v-bind:src="picture.pictureUrl">
      </router-link>
    </div>
  </div>

</template>

<script>
  export default {
    name: "CenterNav",
    data() {
      return {
        oldPictures: {
          0: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/1_cn_life.png",
            a_url: "www.baidu.com",
            list_name: "生活用品",
            to: '/life'
          },
          1: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/2_cn_book.png",
            a_url: "www.baidu.com",
            list_name: "学习书籍",
            to: '/life'
          },
          2: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/3_cn_tool.png",
            a_url: "www.baidu.com",
            list_name: "学习用具",
            to: '/life'
          },
          3: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/4_cn_first.png",
            a_url: "www.baidu.com",
            list_name: "二手畅销榜",
            to: '/life'
          },
          4: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/5_cn_second.png",
            a_url: "www.baidu.com",
            list_name: "一手好货",
            to: '/life'
          },
          5: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/6_cn_goods.png",
            a_url: "www.baidu.com",
            list_name: "MK超市",
            to: '/life'
          },
          6: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/7_cn_market.png",
            a_url: "www.baidu.com",
            list_name: "校园拼团",
            to: '/life'
          },
          7: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/8_cn_pingtuan.png",
            a_url: "www.baidu.com",
            list_name: "领券中心",
            to: '/life'
          },
          8: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/9_cn_lingquan.png",
            a_url: "www.baidu.com",
            list_name: "签到",
            to: '/life'
          },
          9: {
            pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/10_cn_qiandao.png",
            a_url: "www.baidu.com",
            list_name: "更多",
            to: '/life'
          },
           10: {pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/10_cn_qiandao.png", a_url: "www.baidu.com", list_name: "更多",to: '/life'},
           11: {pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/10_cn_qiandao.png", a_url: "www.baidu.com", list_name: "更多",to: '/life'}
        },
        pictures: [],
        a_urls: [],
        i: 0
      }
    },
    created(){
      /*this.$http.get(this.pictureUrl).then(function (res) {
        let body = res.body;
        if(body.code = '10000'){
          this.pictures = body.pictures;
        }else if(body.code = '10404'){
          console.log('数据库错误');
        }else{
          console.log('PHP有bug');
        }
      })*/

      if(this.pictures == ''){
        // this.$emit('message', this.pictures);
        this.pictures = this.oldPictures;
      }
      if(this.pictures[10]){
        let more = this.pictures.length - 10;
        let newPictures = {};
        for (let i = 0 ;i < 10;i++){
          if(i != 9)
          newPictures[i] = this.pictures[i];
          else newPictures[i] = {pictureUrl: "http://www.zhuzesen.work/upload/img/centerNav/10_cn_qiandao.png", a_url: "www.baidu.com", list_name: "更多",to: '/life'}
        }
        this.pictures = newPictures;
        console.log(this.pictures)
      }
    },
  }
</script>

<style lang="scss" scoped>
.CenterNav{
  position: relative;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
  width: 10rem;
  .cn_img{
    width: 2rem;
    height: 2rem;
    background-color: #fff;
  }
}
</style>
