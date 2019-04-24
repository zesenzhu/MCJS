<template>
  <div id="Post">
    <div class="head">
      <span class="backBtn" @click="back">
        <span class="back"></span>发帖</span>
    </div>
    <div class="post_box">
      <div class="post_content">
        <div class="post_owner">
          <img class="owner_avatar" :src="'/'+post.avatar">
          <p class="owner_name">{{post.username}}</p>
          <p class="post_time">发表于{{addtime}}</p>
        </div>
        <div class="post_content">
          <p class="content_head">标题：{{post.content_head}}</p>
          <p class="content_text">内容：{{post.content_text}}</p>
        </div>
        <div class="imgBox">
          <img class="imgShow" v-for="(value,index) in post.content_img" v-bind:key="index"
               :src="'/'+post.content_img[index]">
        </div>
      </div>
      <div class="piece_handle">
        <div class="handle comment_handle">
          <i class="icon_comment"></i>
          <span class="num comment_num">{{comment_num}}</span>
        </div>
        <div class="handle " :class="{browse_handle:browse}" @click="browse_click">
          <i class="icon_browse"></i>
          <span class="num browse_num">{{browse_num}}</span>
        </div>
        <!--<div class="handle degrade_handle">
          <i class="icon_degrade"></i>
          <span class="num degrad_num">{{degrade_num}}</span>
        </div>-->


      </div>

      <div class="comment_box">
        <div class="comment_head">
          <span class="comment_tips">最新回复:{{comment_num}}条</span>

        </div>
        <div class="comment_content">
          <PostComment v-for="(comment,index) in comments" v-bind:key="index" :comment="comment"></PostComment>
          <p class="no_comment" v-show="comments == ''">还没人评论哦~<br/>赶紧占沙发吧</p>
        </div>
      </div>

    </div>
    <div class="reply_handle">
      <input v-model="commentReply" class="comment_input" placeholder="你想回复..." type="text" name="commentReply">
      <span class="reply" @click="replyComment">回复</span>
    </div>
  </div>
</template>

<script>
  import  PostComment from  '../components/forum/PostComment'
  export default {
    name: 'Post',
    components:{PostComment},
    template:{PostComment},
    data(){
      return {
        post: [],
        degrade_num: "0",
        browse_num: "0",
        comment_num: "0",
        browse:'',
        comments:[],
        commentReply:'',
        noClick:false
      }
    },

    //props:["post"],
    mounted(){
      let $this = this;
      this.$ajax.post('/forum/forum.php',
        {userId: sessionStorage.getItem('userId'), postId: $this.$route.params.postId, route: 'getPost'},
        function (res) {
          console.log(res)
          if (res.msg.code == 10200) {
            $this.post = res.msg["0"];
            $this.comments = res.msg["comment"];

            console.log(res.msg)
          } else if (res.msg.code == 10500) {
            $this.$Message(res.msg.msg)
          }
        })
//时间
      let date = new Date($this.post.addtime * 1000);
      $this.addtime = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
    ,
    methods: {
      back(){
        this.$router.go(-1);
      },
      browse_click(){
        let $this = this;
        let browse = !$this.browse;



        $this.$ajax.post('/forum/forum.php',{userId:sessionStorage.getItem('userId'),PostId:$this.post['id'],route:'changePostBrowse',browse:browse},function (res) {
            console.log(res)
            if(res.msg.code==10200){
              $this.browse = !$this.browse;
              if($this.browse){
                $this.browse_num++;
              }else{
                $this.browse_num--;
              }

            }
          },
          function (err) {

          })
      },
      replyComment(){
        let $this = this;
        if($this.noClick){
          $this.$Message("请勿重复操作~");
          return
        }
        if(!$this.commentReply){
          $this.$Message("回复不能为空哦~");
          return;
        }
        $this.noClick = true;
        this.$ajax.post('/forum/forum.php',
          {userId: sessionStorage.getItem('userId'), comment:$this.commentReply,postId: $this.$route.params.postId, route: 'addPostComment'},
          function (res) {
            console.log(res);
            $this.noClick = false;
            if (res.msg.code == 10200) {
              $this.commentReply = '';
              $this.comments = res.msg["comment"];
              $this.comment_num = res.msg["comment_num"];

              console.log(res.msg)
            } else if (res.msg.code == 10500) {
              $this.$Message(res.msg.msg)
            }
          },function (err) {
            $this.noClick = false;
          })
      }
    },
    watch: {
      post(val){
        console.log(val)
        let date = new Date(val.addtime * 1000),$this = this;
        this.addtime = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();


        if (val.degrade_num != null) {
          $this.degrade_num = parseInt(val.degrade_num);
        } else {
          $this.degrade_num = 0;
        }
        if (val.browse_num != null) {
          $this.browse_num = parseInt(val.browse_num);
        } else {
          $this.browse_num = 0;
        }
        if ($this.post.comment_num != null) {
          $this.comment_num = parseInt($this.post.comment_num);
        } else {
          $this.comment_num = 0;
        }

        //点赞
        $this.browse = val['browse'];
        console.log(val)
      }
    }

  }
</script>

<style lang="scss" scoped>
  #Post {
    position: relative;
    height: 100vh;
    background: #eee;
    width: 10rem;

  .head {
    width: 100%;
    height: 1.4rem;
    background: #7AC23C;
    position: relative;

  .backBtn {
    position: relative;
    line-height: 1.4rem;
    color: #fff;
    font-size: 0.5rem;
    display: inline-flex;
  }

  .back {
    position: relative;
    display: inline-block;
    left: 0;
    width: 1.4rem;
    height: 1.4rem;
    background: url("../assets/back.png") no-repeat center center;
    background-size: 0.8rem 0.8rem;
    z-index: 999;
  }

  }
  .post_box {
    position: relative;
    width: 100%;
    padding: 0.2rem;
    background: #fff;

    height: calc(100vh - 2.6rem);
    overflow: scroll;

  .post_owner {
    position: relative;
    overflow: auto;
    margin-bottom: 0.1rem;
    width: 9.6rem;

  .owner_avatar {
    float: left;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-right: 0.2rem;
  }

  .owner_name {

    line-height: 0.5rem;
    color: #000;
    font-size: 0.4rem;
    text-align: left;
  }

  .post_time {

    line-height: 0.5rem;
    color: #666;
    font-size: 0.3rem;
    text-align: left;
  }

  }

  .post_content {
    position: relative;
    margin: 0.2rem 0;
    width: 9.6rem;

  .content_head {
    position: relative;
    line-height: 1rem;
    text-align: left;
    color: #000;
    font-size: 0.5rem;
  }

  .content_text {
    position: relative;
    line-height: 0.7rem;
    text-align: left;
    color: #666;
    font-size: 0.5rem;
    margin-bottom: 0.3rem;
  }

  }
  .imgBox {
    position: relative;


    .imgShow{
      width: 9.6rem;
      margin-bottom: 0.2rem;
    }

  }
  .piece_handle {
    position: relative;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-end;

  .handle {
    margin: 0 0.2rem;
    height: 1rem;

  .icon_degrade {
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    overflow: auto;
    transform: rotateX(180deg);
    background: url("../assets/icon-browse.png") no-repeat center center;
    background-size: 0.5rem;
  }

  .icon_browse {
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    overflow: auto;
    background: url("../assets/icon-browse.png") no-repeat center center;
    background-size: 0.5rem;
  }

  .icon_comment {
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    overflow: auto;
    background: url("../assets/icon-reply.png") no-repeat center center;
    background-size: 0.5rem;
  }

  .num {
    position: relative;
    display: inline-block;
    line-height: 1rem;
    text-align: center;

    overflow: auto;
    font-size: 0.3rem;
    color: #666;
  }

  }

  .browse_handle {

  .icon_browse {
    background: url("../assets/icon-browse-active.png") no-repeat center center;
    background-size: 0.5rem;
  }

  .num {
    color: #7AC23C;
  }

  }
  }

  .comment_box{
    position: relative;
    width: 9.6rem;
    border: 1px #eee solid;


    .comment_head{
      position: relative;
      width: 100%;
      height: 1.4rem;
      padding: 0 0.2rem;

      .comment_tips{
        position: relative;
        line-height: 1.4rem;
        text-align: left;
        font-size: 0.5rem;
        color: #7AC23C;
      }
    }
  .no_comment{
    line-height: 0.8rem;
    text-align: center;
    color: #7AC23C;
    font-size: 0.4rem;
  }
  }

  }
  .reply_handle{
    position: fixed;
    bottom: 0;
    left: 50%;
    background: #fff;
    margin-left: -5rem;
    width: 10rem;
    height: 1.4rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;

    .comment_input{
      position: relative;
      width: 8rem;
      line-height: 1rem;
      height: 1rem;
      background: #eee;
      color: #000;
      font-size: 0.4rem;
      padding: 0 0.2rem;
    }
    .reply{
      width: 1.5rem;
      height: 1rem;
      line-height: 1rem;
      text-align: center;
      background: #7AC23C;
      font-size: 0.4rem;
      color: #fff;
      border-radius: 10px;
    }
  }
  }
</style>
