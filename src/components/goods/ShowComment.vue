<template>
  <div class="goods-comment">
    <p class="comment-head">评论</p>

    <p v-if="myComment?!myComment:!comments" class="noComment">
      该商品还没有留言，赶紧抢先留言吧~~~~~~~
    </p>
    <div class="comment-main" v-else  v-for="comment in myComment?myComment:comments">
      <div class="comment-owner">
        <span class="head-img"><img :src="'http://www.zhuzesen.work/'+comment.avatar"></span>
        <div class="msg_2">
          <span class="commentMsg"><span class="Green">{{comment.comment_ownerName}}</span><span class="commment-label" v-if="comment.comment_ownerName=='root'">物品主人</span></span>
          <span class="commentMsg"><span class="Green">{{comment.school}}<span v-if="comment.campus">({{comment.campus}})</span></span></span>
        </div>
        <span class="comment-time">{{exChangeDate(comment.addTime)}}</span>
      </div>
      <div class="comment-show">
        <p class="show">留言：{{comment.comment}}</p>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
        name: "ShowComment",
      props:["comments"],
      data(){
          return {
            myComment:''
          }
      },
      watch:{

      },
      mounted(){
          let $this = this ;
        // 用$on事件来接收参数
        $this.$bus.on('updateComment', (data) => {
          console.log(data)
          $this.myComment = data;
        })

      }
      ,methods:{
          exChangeDate(date){
            //  商品信息
            let addTime = new Date(date*1000);
            let FullYear = addTime.getFullYear();
            let Month = addTime.getMonth();
            let Dates = addTime.getDate();
            let Hours = addTime.getHours();
            let Minutes = addTime.getMinutes();
            let Seconds = addTime.getSeconds();
            return FullYear+'年'+Month+'月'+Dates+'日  '+ Hours + ':'+Minutes;
          }
      }
    }
</script>

<style lang="scss" scoped>
  .goods-comment{
    position: relative;
    margin-top: 0.2rem;
    width: 100%;
    min-height: 2rem;
    background: #fff;

  .comment-head{
    line-height: 0.8rem;
    width: 100%;
    font-size: 0.6rem;
    padding-left: 0.5rem;
    color: #999;
    border-bottom: 1px #666 solid;
  }
  .comment-main{
    position: relative;
    padding: 0 0.5rem;
    box-sizing: content-box;
    border-bottom: 1px #000 solid;


  .comment-owner{
    position: relative;
    margin-top: 0.2rem;
    min-height: 1.5rem;

  .head-img{
    width: 1rem;
    height: 1rem;
    border-radius: 0.5rem;
    border: 1px #333 solid;
    float: left;
    overflow: hidden;
    margin-right: 0.5rem;
  img{
    width: 1rem;
    height: 1rem;
  }
  }

  .msg_2{
    float: left;
    height: 1rem;
    width: 6rem;

  .commentMsg{
    position: relative;
    display: inline-block;
    width: 100%;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.4rem;
    color: #000;

  .commment-label{
    display: inline-block;
    position: relative;
    height: 0.3rem;
    min-width: 1rem;
    font-size: 0.1rem;
    line-height: 0.3rem;
    color: #fff;
    background: #7AC23C;
    border-radius: 0.01rem;
    top: -0.1rem;
    right: -0.3rem;
    padding: 0.05rem;
    box-sizing: content-box;
  }
  }
  }

  .comment-time{
    color: #999;
    font-size: 0.3rem;
    line-height: 0.5rem;
    position: absolute;
    top: 0;
    right: 0;
  }
  }
  }
  .comment-show{
    position: relative;
    min-height: 1rem;
    border: 2px #7ac23c dashed;

    margin-bottom: 0.1rem;
    width: 100%;
  .show{
    color: #7AC23C;
    font-size: 0.4rem;
    line-height: 1rem;
  }
  }
  }
  .noComment{

    width: 100%;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
  }
  .Green{
    color: #7AC23C;
  }
</style>
