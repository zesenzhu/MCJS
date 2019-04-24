<template>
  <div id="My">
    <div class="head">
      <img :src="'/'+msg.avatar" class="avatar">
      <div class="msg">
        <p class="name">用户名：{{msg.username}}</p>
        <p class="power">权限：{{msg.power}}</p>
      </div>
    </div>
    <div class="handle">
      <div class="collect">
        <router-link to="/MyCollect" class="collectShow">收藏夹<span class="num">{{collect.length}}</span><span
          class="icon-to"></span></router-link>
      </div>
      <div class="setMsg">
        <router-link to="/MyMsg" class="setMsgShow">个人信息<span class="icon-to"></span></router-link>
      </div>
      <div class="setPwd">
        <router-link to="/MyPwd" class="setPwdShow">修改密码<span class="icon-to"></span></router-link>
      </div>
      <div class="marketMsg">
        <span class="marketMsgShow">版本信息<span class="msgShow">Version 1.0.1</span></span>
      </div>


    </div>
    <span class="exit" @click="exit">退出登录</span>
    <CommonNav></CommonNav>
  </div>
</template>

<script>
  import CommonNav from "@/components/common/CommonNav";

  export default {
    name: "My",
    components: {CommonNav},
    template: {CommonNav},
    data(){
      return {
        msg: '',
        collect: [],
      }
    },
    created(){
      let $this = this,
        userId = sessionStorage.getItem('userId');

      //请求后台数据
      $this.$http.get('/php/my/my.php', {params: {userId: userId, route: 'msg'}}).then(function (res) {
        console.log(res.body)
        $this.msg = res.body.msg;
        if($this.msg.goodsCollect==null){
          $this.collect = [];
        }else{
          $this.collect = $this.msg.goodsCollect.split('-');
        }

      })
    },
    methods:{
      exit(){
        localStorage.setItem("token",'');
        this.$router.push({path:"/LoginIn"})
      }
    }
  }
</script>

<style lang="scss" scoped>
  #My {
    position: relative;
    width: 10rem;
    background: #eee;
    min-height: 100vh;

  .head {
    position: relative;
    width: 100%;
    padding: 0.5rem;
    height: 3rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    background: #7AC23C;

  .avatar {
    position: relative;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .msg {
    position: relative;
    height: 2rem;
    padding-left: 0.5rem;
    width: 7rem;

  p {
    line-height: 1rem;
    font-size: 0.5rem;
    color: #fff;
    text-align: left;
  }

  .name {

  }

  }

  }
  .handle {
    position: relative;
    width: 100%;
    min-height: 1.4rem;
    margin-bottom: 1.4rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    background: #fff;

  div {
    position: relative;
    width: 95%;
    height: 1.4rem;
    border-bottom: 1px #999 solid;

  a {
    line-height: 1.4rem;
    display: inline-block;
    width: 100%;
    color: #666;
    font-size: 0.5rem;

  .icon-to {
    position: absolute;
    right: 0.5rem;
    width: 0.5rem;
    height: 100%;
    background: url(../assets/icon-to.png) no-repeat center center;
    background-size: contain;

  }

  }
  }
  .collect {

  .collectShow {
    line-height: 1.4rem;
    color: #666;
    font-size: 0.5rem;

  .num {
    position: relative;
    display: inline-block;
    width: 0.5rem;
    height: 0.5rem;
    line-height: 0.5rem;
    text-align: center;
    font-size: 0.3rem;
    background: #ddd;
    color: #7AC23C;
    border-radius: 50%;
    top: -0.3rem;
  }

  }
  }
  }

  .marketMsg{
    .marketMsgShow{
      line-height: 1.4rem;
      display: inline-block;
      width: 100%;
      color: #666;
      font-size: 0.5rem;

  .msgShow {
    position: absolute;
    right: 0.5rem;
    line-height: 1.4rem;
    color: #666;
    font-size: 0.4rem;


  }
    }
  }
  .exit{
    position: relative;
    margin-top: 2rem;
    width: 4rem;
    height: 1rem;
    line-height: 1rem;
    display: inline-block;
    color: #fff;
    font-size: 0.4rem;
    background: #7AC23C;
    border-radius: 10px;
    text-align: center;
    left: 50%;
    margin-left: -2rem;
  }
  }
</style>
