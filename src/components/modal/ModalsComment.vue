<template>
    <div id="ModalsComment">
      <textarea class="commentBox" rows="10" cols="30" v-model="commentContent">{{commentContent}}</textarea>
      <span  class="commentSubmit" v-on:click="CommentSubmit()">提交评论</span>
    </div>
</template>

<script>

    export default {
        name: "ModalsComment",
      data(){
          return {
            commentContent:""
          }
      },
      mounted(){
          let $this = this;
          console.log($this.$bus)


      },
      methods:{
        CommentSubmit(){
          let $this = this,goodsId = this.$route.params.goods_id,userName = sessionStorage.getItem("username");
          //console.log(goodsId,userName,$this.commentContent)

          console.log(window.layer1);
          if(!this.commentContent){
            this.$Message("评论不能为空",3000);

          }else {
            this.$http.post(
              "/php/comment/addComment.php",
              {goods_id:goodsId,comment_ownerName:userName,commentContent:$this.commentContent},
              {emulateJSON: true}
              ).then(function (res) {

              let Body = res.body;
              console.log(Body);
              if(Body.code=="10000"){
                //window.comment = res.body.comment;
                let comments = Body.comment;
                $this.$bus.emit('updateComment',comments );
                $this.$layer.close(window.layer1 );
                this.$Message("评论成功",3000);

              }
            })
          }

        }
      }
    }
</script>

<style lang="scss" scoped>
  #ModalsComment{
    .commentBox{
      width: 7rem;
      height: 3rem;
      position: relative;
      border: 1px #000 solid;
      padding: 0.1rem;
    }
    .commentSubmit{
      position: relative;
      display: inline-block;
      width: 2rem;
      height: 1rem;
      line-height: 1rem;
      font-size: 0.3rem;
      color: #fff;
      left: 50%;
      margin-top: 0.5rem;
      margin-left: -1rem;
      background: #7ac23c;
      border-radius: 10px;
      text-align: center;
      z-index: 999;
    }
  }
</style>
