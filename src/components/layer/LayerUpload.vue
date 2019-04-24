<template>
  <div id="LayerUpload" :class="{hide:params.hide}">
    <div class="screen" @click="params.hide=params.screenHandle"></div>
    <div class="layer-box">
      <a class="close" v-on:click="params.hide=true"></a>
      <div class="layer-content">
        <p class="content">{{params.content}}</p>
        <div class="upload">
          <div class="select">
            <img :src="ImgUrl" class="ImgShow" :class="{hide:!haveImg}">
              <input type="file" accept="image/*" name="myImg" id="myImg" class="btn-upload" @change="btnUploadFile()">
            </div>
        </div>
        <div class="btn-group">

          <span class="btn-confirm" v-on:click="confirm()">确认</span>
          <span class="btn-cancel" v-on:click="params.hide=true">取消</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'LayerUpload',
    data(){
      return {
        hide: true,
        params: {},
        myImg: '',
        ImgUrl:'',
        haveImg:false
      }
    },
    inject: ['reload'],
    beforeMount(){
      let $this = this;
      $this.params = $this.$store.state.layerUploadParams
      console.log($this.params)
    },
    methods: {
      object(params){
        let $this = this, object = params.handle;

        object = object ? typeof(object) == Object ? object : $(object) : null;

        console.log(params, params.handle, $(params.handle));
        $(object).on('click', function (e) {
          $this.hide = false;
          console.log(e.target);
        })
      },
      confirm(){//确认后要做什么
        if(!this.ImgUrl){
          this.$Message('你还没选择要上传的图片哦！')
        }else{
          this.params.hide = true;
          if (this.params.confirm) {
            this.params.confirm(this)
          }
        }

      },
      btnUploadFile(e){
        //获取图片
        var files = document.getElementById("myImg").files,$this = this;
        console.log(files[0])
        var file = files[0];
        // 接受 jpeg, jpg, png 类型的图片
        if (!/\/(?:jpeg|jpg|png)/i.test(file.type)){
          return;
        }
        var reader = new FileReader();
        reader.onload = function() {
          var result = this.result;  //图片base64字符串
          $this.ImgUrl = result;
          $this.haveImg = true
        };
        reader.readAsDataURL(file);    //Base64

      }
    }
  }
</script>

<style lang="scss" scoped>
  .hide {
    display: none !important;
  }

  #LayerUpload {
    width: 10rem;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 999999;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;

  .screen {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(153, 153, 153, 0.5);
  }

  .layer-box {
    position: absolute;
    width: 6rem;
    padding: 0.2rem;
    background: #fff;
    border-radius: 10px;

  .close {
    position: absolute;
    width: 0.6rem;
    height: 0.6rem;
    right: 0.2rem;
    top: 0.2rem;
    background: url("../../assets/icon-close.png") no-repeat center center;
    background-size: contain;
  }

  .layer-content {
    position: relative;
    margin: 0.6rem 0 0.2rem;

  .content {
    position: relative;
    line-height: 1rem;
    text-align: center;
    color: #7AC23C;
    font-size: 0.5rem;
    margin: 0.2rem 0;
  }

  .upload {
    position: relative;
    width: 100%;
    height: auto;

  .select {
    position: relative;
    width: 3rem;
    height: 3rem;
    left: 50%;
    margin-left: -1.5rem;
    border: 1px #999 dotted;
    background: url("../../assets/myImg.png")no-repeat center center;
    background-size: 2rem 2rem;
    margin-bottom: 1rem;
    overflow: hidden;

    .ImgShow{
      position: absolute;
      width: 3rem;
      height: 3rem;
    }

  }

  .btn-upload{
    position: absolute;
    width: 3rem;
    height: 3rem;
    opacity: 0;
  }

  }
  .btn-group {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    height: 1rem;
    width: 100%;

  span {
    position: relative;
    width: 2rem;
    display: inline-block;
    color: #fff;
    font-size: 0.4rem;
    line-height: 1rem;
    text-align: center;
    background: #7AC23C;
    border-radius: 10px;
  }

  }
  .btn-confirm {

  }

  }
  }
  }
</style>
