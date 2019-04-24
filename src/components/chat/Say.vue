<template>
    <div class="Say">
      <!--<img :src="'/'+">-->
      <div class="login" v-if="say.type=='login'">
        <p class="loginTime">{{say.time}}</p>
        <p class="loginName">{{say.client_name}} 加入房间</p>
      </div>
      <div class="login" v-else-if="say.type=='logout'">
        <p class="loginTime">{{say.time}}</p>
        <p class="loginName">{{say.client_name}} 退出房间</p>
      </div>
      <div class="say" v-else-if="say.type=='say'">
        <p class="loginTime">{{say.time}}</p>
        <div class="client_msg" >
          <img class="client_img" :class="{right: UserName==say.from_client_name}" :src="'/'+UserMsg[say.from_client_name]['avatar']">
          <div class="client_say" :class="{right: UserName==say.from_client_name}">
            <span class="client_name"v-show="UserName!=say.from_client_name">{{say.from_client_name}}</span>
            <div class="say_box"><p class="say_content">{{ say.content }}</p></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'Say',
      props:["chatUserMsg",'say'],
      computed:{
          UserMsg(){
            return this.$store.state.chatUserMsg;
          },
        UserName(){
            return sessionStorage.getItem('username');
        }
      },
      mounted(){
        console.log(this.UserName,this.say.from_client_name)
      }
    }
</script>

<style lang="scss" scoped>
.Say{
  position: relative;
  overflow: auto;
  width: 100%;

  .login{
    position: relative;
    width: 100%;
    height: 1.4rem;
  }

  .loginTime{
    position: relative;
    width: 100%;
    height: 0.5rem;
    color: #7AC23C;
    font-size: 0.3rem;
    line-height: 0.5rem;
    text-align: center;
  }

  .loginName{
    position: relative;
    width: 100%;
    height: 0.5rem;
    color: #000;
    font-size: 0.4rem;
    line-height: 0.5rem;
    text-align: center;
  }
.say{
  position: relative;
  width: 100%;

  .client_msg{
    padding: 0 0.2rem;
    min-height: 1rem;
    width: 100%;


    .client_img{
      float: left;
      width: 0.8rem;
      height: 0.8rem;
      border-radius: 50%;
    }

    .client_name{
      position: relative;
      color: #7AC23C;
      font-size: 0.3rem;
      line-height: 0.5rem;
      text-align: center;
      margin-left: 0.2rem;
    }


  }
.client_say{
  float: left;
}
.right{
  float: right !important;
}
.say_box{
  min-height: 1rem;
  padding: 0 0.2rem;
  background: #fff;
  margin-left: 0.4rem;
  margin-right: 0.4rem;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  border-radius: 10px;
  max-width: 5rem;

  .say_content{


    line-height: 1rem;
    text-align: left;
    color: #000;
    font-size: 0.4rem;

  }


}
}
}
</style>
