<template>
    <div id="LayerConfirm" :class="{hide:params.hide}">
      <div class="screen" @click="params.hide=params.screenHandle"></div>
      <div class="layer-box">
        <a class="close" v-on:click="params.hide=true"></a>
        <div class="layer-content">
          <p class="content">{{params.content}}</p>
          <div class="btn-group">
            <span class="btn-confirm" v-on:click="confirm()">确认</span>
            <span class="btn-cancel" v-on:click="params.hide=true">取消</span>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
  import $ from 'jquery'
    export default {
        name: 'LayerConfirm',
      data(){
          return{
            hide:true,
            params:{}
          }
      },
      inject:['reload'],
      beforeMount(){
        let $this =this;
        $this.params = $this.$store.state.layerConfirmParams
        console.log($this.params)
      },
      mounted(){
        //this.object(this.params);


      },
      methods:{
        object(params){
          let $this = this, object = params.handle;

          object = object ? typeof(object)== Object?object:$(object):null;

          console.log(params,params.handle,$(params.handle));
          $(object).on('click',function (e) {
            $this.hide = false;
            console.log(e.target);
          })
        },
        screenHandle(boolean){

        },
        confirm(){//确认后要做什么
          this.params.hide=true;
          if(this.params.confirm){
            this.params.confirm(this)
          }




        }
      },
      watch:{
        params(val){
          this.params = val;
        }
      }

    }
</script>

<style lang="scss" scoped>
  .hide{
    display: none!important;
  }
#LayerConfirm{
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

.screen{
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(153,153,153,0.5);
}


  .layer-box{
    position: absolute;
    width: 6rem;
    padding: 0.2rem;
    background: #fff;
    border-radius: 10px;

    .close{
      position: absolute;
      width: 0.6rem;
      height: 0.6rem;
      right: 0.2rem;
      top: 0.2rem;
      background: url("../../assets/icon-close.png")no-repeat center center;
      background-size: contain;
    }
    .layer-content{
      position: relative;
      margin: 0.6rem 0 0.2rem;

      .content{
        position: relative;
        line-height: 1rem;
        text-align: center;
        color: #7AC23C;
        font-size: 0.5rem;
        margin: 0.2rem 0;
      }
      .btn-group{
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-around;
        align-items: center;
        height: 1rem;
        width: 100%;
        span{
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
      .btn-confirm{

      }
    }
  }
}
</style>
