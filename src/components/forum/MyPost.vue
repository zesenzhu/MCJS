<template>
    <div id="MyPost">
      <MyPostPiece v-show="myPost!=''" v-for="(value,index) in myPost" v-bind:key="index" :post="value">

      </MyPostPiece>
      <p class="none" v-show="myPost==''">
        你还没发帖哦</br>赶紧去写吧~
      </p>
    </div>
</template>

<script>
  import MyPostPiece from './MyPostPiece'
    export default {
        name: 'MyPost',
      components:{MyPostPiece},
      template:{MyPostPiece},
      data(){
          return{
            myPost:['1']
          }
      },created(){
        let $this = this;
        this.$ajax.post('/forum/forum.php',
          {userId:sessionStorage.getItem('userId'),getNum:1,route:'getMyPost'},
          function (res) {
            console.log(res)
            if(res.code==10000){
              $this.myPost= res.msg;

              console.log(res.msg)
            }
          },
          function (err) {

          })
      }

    }
</script>

<style lang="scss" scoped>
  #MyPost{
    position: relative;
    width: 100%;
    height: 100%;
    background: #eee;

    .none{
      position: relative;
      width: 100%;
      top:50%;
      margin-top: -1.5rem;
      line-height: 1.5rem;
      color: #7AC23C;
      font-size: 0.6rem;
      text-align: center;
    }
  }
</style>
