<template>
    <div id="ModalsCollect">
      <span :class="{toDelete:toDelete,toSelect:toSelect}" @click="deleteCollect"></span>
      <router-link class="cc-center" :to="'/Product/'+value.id+'/Simple'">
        <img class="cc-img" :src="'/'+value['thumb']">
        <p class="cc-name">{{value['name']}}</p>
        <p class="cc-region">学校：{{value['region']}}</p>
        <p class="cc-price">单价：￥{{value['price']}}</p>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: 'ModalsCollect',
      props:["MyKey","Message","value","toDelete"],
      data(){
          return {
            toSelect:false
          }
      },
    methods: {
      deleteCollect(){

        let $this = this;
        $this.toSelect = !$this.toSelect;

        $this.$store.commit("changeCollectHandle",{
          key:$this.value.id,boolean:$this.toSelect
        })

        console.log($this.$store.state.changeCollect)

      }
    }

    }
</script>

<style lang="scss" scoped>
  .hide{
    display: none;
  }
#ModalsCollect{
  position: relative;
  width: 9.6rem;
  min-height: 3rem;
  background: #fff;
  border-radius: 10px;
  margin-bottom: 0.2rem;
  padding: 0.5rem;

.toDelete{
  position: absolute;
  width: 0.4rem;
  height: 0.4rem;
  top: 0.1rem;
  right: 0.1rem;
  border: 1px #666 solid;
  border-radius: 50%;

}

.toSelect{

  background: url("../../assets/icon-select.png")no-repeat center center;
  background-size: contain;
}
.cc-center {
  position: relative;
  height: 2rem;
  overflow: hidden;
  display: inline-block;

  .cc-img {
    height: 2rem;
    width: 2rem;
    float: left;

  }

  .cc-name {
    float: right;
    display: inline-block;
    line-height: 0.6rem;
    width: 5.8rem;
    font-size: 0.4rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin-left: 0.2rem;
  }

  .cc-region {
    position: relative;
    bottom: 0;
    float: left;
    display: inline-block;
    line-height: 0.8rem;
    margin-left: 0.6rem;
    width: 3rem;
    font-size: 0.3rem;
    text-align: left;

  }

  .cc-price {
    position: relative;
    bottom: 0;
    float: right;
    display: inline-block;
    line-height: 0.8rem;
    margin-left: 0.2rem;
    width: 2rem;
    font-size: 0.3rem;
    text-align: left;
    color: red;

  }

  }

}
</style>
