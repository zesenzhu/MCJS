<template>
  <div id="SendPost">
    <div class="head">
      <span class="backBtn" @click="back">
        <span class="back"></span>发帖</span>
      <input type="button" value="发表" @click="sendPost" class="btn-send">
    </div>
    <div class="send_box">
      <div class="post_content">
        <input v-model.trim="post.head" name="head" type="text" maxlength="18" class="content_head" placeholder="标题(最多18个字)">
        <textarea class="content_text" name="text" cols="6" v-model.trim="post.text" placeholder="内容"></textarea>
        <div class="post_img_box">
          <div class="post_img_show" v-for="(src,index) in imgs" :key="index" @touchstart="touchstart"
               @touchmove="touchmove" @touchend="touchend">
            <img :src="src" class="img_show" :tag="index">
          </div>
          <div class="img_handle" v-show="!hideAdd">
            <input type="file" class="postImg" accept="image/*" name="img" multiple ref="postImg" @change="ImgSrc">
          </div>
        </div>
      </div>
    </div>
    <p>{{post}}</p>
  </div>
</template>

<script>
  export default {
    name: 'SendPost',
    data(){
      return {
        post: {},
        imgs: [],
        hideAdd: false,
        timeOutEvent: ''
      }
    },
    mounted(){

    },
    methods: {
      back(){
        this.$router.go(-1);
      },
      ImgSrc(e){
        let postImg = this.$refs.postImg, $this = this, badImg = '';
        let files = postImg.files;

        if (files.length > 9 || files.length + $this.imgs.length > 9) {
          $this.$Message("图片最多选择9张哦~");
          return;
        }


        for (let i = 0; i < files.length; i++) {
          if (files[i].size > 5 * 1024 * 1024) {//图片不能大于5M
            badImg += files[i].name + ' ';
            if (i == files.length - 1 && badImg != '') {
              $this.$Message(badImg + '大于5M,请重新选择图片')
            }
            continue;
          }
          var reader = new FileReader();
          reader.onload = function () {
            var result = this.result;  //图片base64字符串
            $this.imgs.push(result);
            //$this.haveImg = true
            //console.log($this.imgs)
          };
          reader.readAsDataURL(files[i]);//Base64
          if (i == files.length - 1 && badImg != '') {
            $this.$Message(badImg + '大于5M,请重新选择图片')
          }
        }
        console.log(badImg)


      },
      touchstart(e){
        let $this = this;
        $(e.target).parent().addClass("post_img_box_active");
        this.timeOutEvent = setTimeout(function () {
          //此处为长按事件-----在此显示遮罩层及删除按钮
          $this.deleteImg(e);
        }, 500);

      },
      touchmove(e){
        clearTimeout(this.timeOutEvent);
        this.timeOutEvent = 0;
        console.log("move")
        e.preventDefault();
      },
      touchend(e){
        clearTimeout(this.timeOutEvent);
        $(e.target).parent().removeClass("post_img_box_active");
        if (this.timeOutEvent != 0) {//点击
          //此处为点击事件----在此处添加跳转详情页
          console.log("click")
        }
        return false;
      },
      deleteImg(e){
        let index = $(e.target).attr("tag");
        this.imgs.splice(index, 1);

      },
      sendPost(){
        let $this = this;
        if(!this.post.head)
        {
          $this.$Message('标题不能为空');
          return
        }
        if(!this.post.text)
        {
          $this.$Message('内容不能为空');
          return
        }
        this.post.imgs = this.imgs;

        this.$ajax.post('/forum/forum.php',{userId:sessionStorage.getItem('userId'),post:$this.post,route:'sendPost'},function (res) {
          console.log(res)
          if(res.code==10000){
            $this.$router.push({ path: '/Forum/Community' })
          }
        },
        function (err) {

        })
      }
    },
    watch: {
      post(val){
        console.log(val)
      },
      imgs(val){
        if (val.length >= 9) {
          this.hideAdd = true
        } else {
          this.hideAdd = false
        }
        console.log(val, this.hideAdd)
      }
    }

  }
</script>

<style lang="scss" scoped>
  #SendPost {
    position: relative;
    width: 10rem;
    height: 100vh;

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

  .btn-send{
    position: absolute;
    right: 0.2rem;
    top:0.2rem;
    width: 2rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #7AC23C;
    font-size: 0.5rem;
    background: #fff;
    border-radius: 10px;
  }

  }

  .send_box {
    position: relative;
    width: 100%;
    height: calc(100% - 1.4rem);
    background: #fff;
    overflow: scroll;

  .post_content {
    position: relative;
    width: 100%;

    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    background: #fff;

  .content_head {
    position: relative;
    width: 9rem;
    height: 1rem;
    line-height: 1rem;
    margin: 0.2rem 0;
    padding: 0 0.2rem;
    font-size: 0.5rem;
    color: #666;
  }

  .content_text {
    position: relative;
    height: 6rem;
    line-height: 1rem;
    margin: 0.2rem 0;
    padding: 0 0.2rem;
    font-size: 0.5rem;
    color: #999;
    width: 9rem;
  }

  .post_img_box_active {
    transform: scale(1.1, 1.1);
    z-index: 999;
  }

  .post_img_box {
    position: relative;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    margin-bottom: 0.2rem;
    width: 9rem;

  .post_img_show {
    position: relative;
    display: inline-block;
    overflow: auto;
    width: 3rem;
    height: 3rem;

  .img_show {
    width: 3rem;
    height: 3rem;
  }

  }

  .img_handle {
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 3rem;
    background: #eee url("../assets/icon-addImg.png") no-repeat center center;
    background-size: 1.5rem 1.5rem;
    overflow: hidden;

  .postImg {
    position: absolute;
    width: 3rem;
    height: 3rem;
    opacity: 0;
  }

  }

  }
  }
  }
  }
</style>
