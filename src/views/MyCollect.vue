<template>
  <div id="MyCollect">
    <div class="head">
      <span class="backBtn" @click="back">
        <span class="back"></span>收藏夹</span>
      <span class="handle" @click="deleteCollect">{{!toDelete?"管理":"完成"}}</span>
    </div>
    <div class="center">
      <div v-if="collectMsg[0].id!=''" v-for="(value,key) in collectMsg" :key="key">
      <ModalsCollect  :MyKey="key"
                     :Message='collectMsg' :value="value" :toDelete="toDelete">
      </ModalsCollect>
      </div>
      <p v-else-if="collectMsg[0].id==''" class="noCollect">你还没收藏物品<br/>赶紧去收藏吧~</p>
    </div>
  </div>
</template>

<script>
  import ModalsCollect from "@/components/modal/ModalsCollect";
  export default {
    name: 'MyCollect',
    components: {ModalsCollect},
    template: {ModalsCollect},
    inject: ['reload'],
    data(){
      return {
        collectMsg: '',
        toDelete: false,
        deleteCollectAll: {},
        select: {}
      }
    },
    methods: {
      back(){
        this.$router.go(-1);
      },
      deleteCollect(){
        let $this = this, userId = sessionStorage.getItem("userId");
        if ($this.toDelete) {
          let deleteCollectAll = $this.$store.state.changeCollect, deleteAll = [];
          for (let key in deleteCollectAll) {
            console.log(key)
            if (deleteCollectAll[key]) {
              deleteAll.push(key);
            }
          }
          if (deleteAll) {
            $this.$http.post("/php/my/my.php",
              {deleteCollect: deleteAll, userId: userId, route: "changeCollect"},
              {emulateJSON: true}).then(function (response) {
                console.log(response);
                $this.$store.commit("changeCollectHandle", {
                  reset: true
                })

                console.log($this.$store.state.changeCollect)
                $this.reload();

              }, function (error) {
                $this.$Message(error);
              }
            )
          }

        } else {
          $this.toDelete = !$this.toDelete
        }


      }
    },
    created(){
      let $this = this,
        userId = sessionStorage.getItem('userId');
      //请求后台数据
      $this.$http.get('/php/my/my.php', {params: {userId: userId, route: 'msg'}}).then(function (res) {
        console.log(res.body)
        $this.collectMsg = res.body.msg.goodsCollectAll;
        $this.select = res.body.msg.goodsCollectAll;
      })
    },
    watch: {
      deleteCollectAll(val){
        this.deleteCollectAll = val;
        console.log("dda")
      }
    }

  }
</script>

<style lang="scss" scoped>


  #MyCollect {
    position: relative;
    width: 10rem;
    background: #eee;
    min-height: 100vh;

  .head {
    width: 100%;
    height: 1.4rem;
    position: relative;

  .handle {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    line-height: 1rem;
    text-align: center;
    height: 1rem;
    width: 1rem;

    font-size: 0.5rem;
    color: #7AC23C;
  }

  .backBtn {
    position: relative;
    line-height: 1.4rem;
    color: #666;
    font-size: 0.5rem;
    display: inline-flex;
  }

  .back {
    position: relative;
    display: inline-block;
    left: 0;
    width: 1.4rem;
    height: 1.4rem;
    background: url("../assets/confirmBack.png") no-repeat center center;
    background-size: 0.8rem 0.8rem;
    z-index: 999;
  }

  }
  .center {
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;

  }
  .noCollect{
    position: relative;
    margin-top: 5rem;
    color: #7AC23C;
    font-size: 0.7rem;
    text-align: center;
  }

  }
</style>
