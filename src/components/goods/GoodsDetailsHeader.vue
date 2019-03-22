<template>
    <div class="GoodsDetailsHeader">
      <span class="back" @click="back"></span>
      <div @click="getPath" class="center">
        <router-link @click="getPath" v-bind:class={productActive:Simple} :to="'/Product/'+goods_id+'/Simple'" replace>物品</router-link>
        <router-link @click="getPath" v-bind:class={productActive:Details} :to="'/Product/'+goods_id+'/Details'" replace>详情</router-link>
      </div>
      <!--<router-view></router-view>-->
    </div>
</template>

<script>
    export default {
        name: "GoodsDetailsHeader",
      data(){
          return{
            path:this.toPath,
            oldUrl:'',
            Simple: true,
            Details: false,
            goods_id:'222',
          }
      },
      props:["toPath"],
      mounted(){
        this.getPath();
        console.log(this.toPath);

      },
      methods:{
          back(){
            this.$router.go(-1);
            console.log(this.oldUrl);
          },
        getPath(){
          console.log(this.$route.path);
          let path = this.$route.path;
          let pathArray = path.split('/');
          let length = pathArray.length;
          this.path = pathArray[length-1];
          this.goods_id = pathArray[length-2];
          console.log(this.path,this.goods_id);

          console.log("Details:"+this.Details)

        },

      },
      watch:{
        path:function (val) {
          if(val == 'Simple'){
            this.Simple = true;
            this.Details = false;
          }else if(val == 'Details'){
            this.Details = true;
            this.Simple = false;
          }
          console.log(val)
        },
        $route(to,from){
          this.path = this.toPath;
          console.log(this.path)
        }

      }

    }
</script>

<style lang="scss" scoped>
.GoodsDetailsHeader{
  position: fixed;
  width: 10rem;
  height: 1.4rem;
  background-color: #7AC23C;
  z-index: 999;

  .back{
    position: absolute;
    left: 0;
    width: 1.4rem;
    height: 1.4rem;
    background: url("../../assets/back.png")no-repeat center center;
    background-size: 0.8rem 0.8rem;
    z-index: 999;
  }
  .center{
    width: 10rem;
    line-height: 1.4rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    a{
      line-height: 1.4rem;
      padding: 0 0.3rem;
      font-size: 0.5rem;
      color: #fff;
    }
    .productActive{
      font-size: 0.6rem;
    }
  }

}
</style>
