<template>
    <div id="Community">
      <div >
        <PostPiece  v-for="(value,index) in posts" v-bind:key="index" :post="value">

        </PostPiece>
      </div>

      <p class="none" v-show="posts==''">
        你们学校的同学还没发帖哦</br>赶紧去占沙发吧
      </p>
    </div>
</template>

<script>
  import PostPiece from './PostPiece'
    export default {
        name: 'Community',
      components:{PostPiece},
      template:{PostPiece},
      data(){
          return{
            posts:['1']
          }
      },
      created(){
          let $this = this;
        this.$ajax.post('/forum/forum.php',
          {userId:sessionStorage.getItem('userId'),getNum:1,route:'getPostCommunity'},
          function (res) {
            console.log(res)
            if(res.code==10000){
              $this.posts= res.msg;

              console.log(res.msg)
            }
          },
          function (err) {

          })
      }

    }
</script>

<style lang="scss" scoped>
#Community{
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-flow: column ;
  justify-content: flex-start;
  align-items: center;
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
