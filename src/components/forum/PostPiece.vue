<template>
  <div class="PostPiece">
    <router-link :to="{ name: 'Post', params: { postId: post.id }}">
      <div class="post_owner">
        <img class="owner_avatar" :src="'/'+post.avatar">
        <p class="owner_name">{{post.username}}</p>
        <p class="post_time">发表于{{addtime}}</p>
        <span class="owner_school">学校:{{post.school}}</span>
        <span class="owner_campus">校区:{{post.campus}}</span>
      </div>
      <div class="post_content">
        <p class="content_head">{{post.content_head}}</p>
        <p class="content_text">{{post.content_text}}</p>
      </div>
      <div class="imgBox"  :class="{imgOne:one,imgTwo:two,imgThree:three,imgMore:more}">
        <img class="imgShow" v-for="(value,index) in imgOld" v-bind:key="index" :src="'/'+imgOld[index]">
        <div v-show="more" class="more">+{{moreLength}}</div>
      </div>
    </router-link>
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

  </div>
</template>

<script>
  export default {
    name: 'PostPiece',
    props: ["post"],
    data(){
      return {
        addtime: '',
        none: false,
        one: false,
        two: false,
        three: false,
        more: false,
        moreLength: 0,
        degrade_num: "0",
        browse_num: "0",
        comment_num: "0",
        browse:''
      }
    },
    created(){
      console.log(this.post+"1")
    },
    mounted(){
      let $this = this;

      let date = new Date($this.post.addtime * 1000);
      $this.addtime = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      if (this.post.content_img == null) {
        $this.none = true;
      } else if (this.post.content_img.length == 1) {
        $this.one = true;
      } else if (this.post.content_img.length == 2) {
        $this.two = true;
      } else if (this.post.content_img.length == 3) {
        $this.three = true;
      } else if (this.post.content_img.length > 3) {
        this.moreLength = this.post.content_img.length - 3
        $this.more = true;
      }

      if ($this.post.degrade_num != null) {
        $this.degrade_num = parseInt($this.post.degrade_num);
      } else {
        $this.degrade_num = 0;
      }
      if ($this.post.browse_num != null) {
        $this.browse_num = parseInt($this.post.browse_num);
      } else {
        $this.browse_num = 0;
      }
      if ($this.post.comment_num != null) {
        $this.comment_num = parseInt($this.post.comment_num);
      } else {
        $this.comment_num = 0;
      }

      //点赞
      $this.browse = $this.post['browse'];


    },
    computed: {
      myPost(){
        return this.post;
      },
      imgOld(){
        return this.post.content_img;
      }


    },
    watch: {
      myPost(val){
        let $this = this;
        this.imgOld = val.content_img;
        let date = new Date(val.addtime * 1000);
        $this.addtime = date.getFullYear() + '年' + date.getMonth() + '月' + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        if (val.content_img == null) {
          $this.none = true;
        } else if (val.content_img.length == 1) {
          $this.one = true;
        } else if (val.content_img.length == 2) {
          $this.two = true;
        } else if (val.content_img.length == 3) {
          $this.three = true;
        } else if (val.content_img.length > 3) {
          this.moreLength = val.content_img.length - 3
          $this.more = true;
        }

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
    },
    methods: {
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
      }
    }

  }
</script>

<style lang="scss" scoped>
  .PostPiece {
    position: relative;
    width: 9.6rem;
    padding: 0.1rem;
    background: #fff;
    margin: 0.1rem 0 0;
    overflow: hidden;
    border-radius: 10px;

  .post_owner {
    position: relative;
    overflow: auto;
    margin-bottom: 0.1rem;
    width: 100%;

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

  .owner_school{
    position: absolute;
    top: 0;
    right: 0.5rem;
    width: 3rem;
    text-align: left;
    line-height: 0.5rem;
    color: #7AC23C;
    font-size: 0.3rem;
  }
  .owner_campus{
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 3rem;
    text-align: left;
    line-height: 0.5rem;
    color: #7AC23C;
    font-size: 0.3rem;
  }

  }

  .post_content {
    position: relative;
    margin: 0.2rem 0;
    width: 100%;

  .content_head {
    position: relative;
    line-height: 0.7rem;
    text-align: left;
    color: #000;
    font-size: 0.5rem;
  }

  .content_text {
    position: relative;
    line-height: 0.7rem;
    text-align: left;
    color: #666;
    display: -webkit-box;
    /*! autoprefixer: off */
    -webkit-box-orient: vertical;
    /* autoprefixer: on */
    -webkit-line-clamp: 2;
    overflow: hidden;
    font-size: 0.4rem;
  }

  }
  .imgBox {
    position: relative;
    overflow: auto;

  }

  .imgOne {

  .imgShow {
    width: 4.5rem;
  }

  }

  .imgTwo {

  .imgShow {
    width: 3rem;
    height: 3rem;
    margin-right: 0.2rem;
  }

  }

  .imgThree {
    flex-flow: row nowrap;
    justify-content: space-between;
    display: flex;

  .imgShow {
    width: 3rem;
    height: 3rem;
  }

  }
  .imgMore {
    flex-flow: row wrap;
    justify-content: space-between;
    overflow: hidden;
    height: 3rem;
    display: flex;

  .imgShow {
    width: 3rem;
    height: 3rem;

  }

  .more {
    position: absolute;
    width: 3rem;
    height: 3rem;
    right: 0;
    top: 0;
    background: #aaa;
    border-radius: 10px;
    opacity: 0.7;
    color: #fff;
    font-size: 1rem;
    display: inline-block;
    line-height: 3rem;
    text-align: center;
  }

  }

  .imgShow {
    position: relative;
    border-radius: 10px;

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
    background: url("../../assets/icon-browse.png") no-repeat center center;
    background-size: 0.5rem;
  }

  .icon_browse {
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    overflow: auto;
    background: url("../../assets/icon-browse.png") no-repeat center center;
    background-size: 0.5rem;
  }

  .icon_comment {
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 1rem;
    overflow: auto;
    background: url("../../assets/icon-reply.png") no-repeat center center;
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

  .browse_handle{
    .icon_browse{
      background: url("../../assets/icon-browse-active.png") no-repeat center center;
      background-size: 0.5rem;
    }

    .num{
      color: #7AC23C;
    }
  }
  }
  }
</style>
