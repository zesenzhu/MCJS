<template>
  <div class="Room">
    <div class="tipBox">
      <transition name="list_on">
        <div class="list_box" v-if="list_show">
          <div v-for="(value,key) in client_list[Room]" class="client">
            <img class="img_client" :src="'/'+chatUserMsg[value]['avatar']">
            <p class="name">{{chatUserMsg[value]['username']}}</p>
          </div>
        </div>
      </transition>
      <span class="list_btn" @click="list_show = !list_show">在线列表</span>
    </div>

    <div class="showBox" ref="scroll">

      <Say v-for="(say,key) in allSay" :key="key" :say="say"></Say>
    </div>

    <div class="MyHandle">
      <input type="text" class="MyWord" v-model="MyWord">
      <input type="button" class="MySend" @click="send" v-bind:disabled="!MyWord" :class="{noWord:!MyWord}" value="发送">
    </div>
  </div>
</template>

<script>
  import Say from './Say'
  export default {
    name: 'Room',
    props: ["Room"],
    components: {Say},
    template: {Say},
    data(){
      return {
        username: '',
        ws: '',
        logout: false,
        client_list2: '',
        //client_list_room:'',
        chatData2: '',
        list_show: false,

        MyWord: ''

      }
    },
    mounted(){
      this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
    },
    computed: {
      client_list(){
        return this.$store.state.client_list;
      },
      client_list_room(){
        return this.client_list[this.room];
      },
      chatData(){
        return this.$store.state.chatData;
      },
      chatUserMsg(){
        return this.$store.state.chatUserMsg;
      },
      allSay(){

        return this.$store.state.allSay;
      }
    },
    watch: {
      client_list(val){
        //this.client_list2 = val;

        console.log(val)
      },
      chatUserMsg(val){
        console.log(val)
      },
      client_list_room(val){
        console.log(val)
      },
      chatData(val){
        console.log(this.$store.state.client_list, this.chatUserMsg);
        /*if(val.type=='login'){
         this.sayTip(val.client_name,val.type,val.time);
         console.log(this.chatUserMsg)
         console.log("login")
         }else if(val.type=='logout'){
         this.sayTip(val.from_client_name,val.type,val.time);
         console.log(this.chatUserMsg)
         console.log("logout")
         }*/
      },
      Room(val){
        this.$store.state.ws.send('{"type":"login","client_name":"' + sessionStorage.getItem("username") + '","room_id":"' + this.Room + '"}')
        console.log(val)
      },
      allSay(val){
        this.$nextTick(() => {
          this.$refs.scroll.scrollTop = this.$refs.scroll.scrollHeight
        })

      }
    },
    beforeRouteEnter(to, from, next){
      next((vm)=> {
        vm.$store.state.ws.send('{"type":"login","client_name":"' + sessionStorage.getItem("username") + '","room_id":"' + vm.Room + '"}')
      })
    },
    beforeRouteUpdate(to, from, next){
      console.log(this.$store.state.ws);
      this.$store.state.ws.send('{"type":"login","client_name":"' + sessionStorage.getItem("username") + '","room_id":"' + to.Room + '"}')
      next(function () {

      })
    },
    beforeRouteLeave(to, from, next){
      let $this = this;

      console.log("close");

      next()
    },
    mounted(){
      //this.connect(this.$route.params.room_id);
    },
    methods: {
      sayTip(client_name, type, time){
        let tip = '';
        if (type == "login") {
          tip = "加入房间";
        } else if (type = 'logout') {
          tip = "退出房间";
        }
        console.log(this.Room)

        let Html = `<div class="TipBox">
<p class="time" style="text-align: center">${time}</p>
<p class="tipContent" style="text-align: center">${client_name} ${tip}</p></div>`;
        $(".Room").append(Html);


      },
      say(client_name, type, time){

      },
      send(){
        this.$store.state.ws.send('{"type":"say","to_client_id":"all","to_client_name":"' + this.Room + '","content":"' + this.MyWord + '"}');
        this.MyWord = "";
      }

    }


  }
</script>

<style lang="scss" scoped>
  .Room {
    position: relative;
    width: 7rem;
    height: 100%;
    background: #eee;
    overflow: scroll;
    padding-top: 1rem;
    display: inline-block;

  .TipBox {
    width: 100%;
  }

  .time {
    text-align: center;
    font-size: 0.3rem;
    color: #000;
  }

  .tipContent {
    text-align: center;
    font-size: 0.3rem;
    color: #000;
  }

  .tipBox {
    position: absolute;
    right: 0;
    top: 0;
    width: 3rem;
    min-height: 1rem;
    z-index: 999;
  }

  .list_btn {
    display: inline-block;
    position: relative;
    right: 0;
    top: 0;
    width: 3rem;
    height: 1rem;
    text-align: center;
    line-height: 1rem;
    background: #7AC23C;
    color: #fff;
    font-size: 0.4rem;
    border-radius: 0 0 10px 10px;
  }

  .showBox {
    position: absolute;
    width: 7rem;
    bottom: 1.4rem;
    max-height: calc(100% - 2.4rem);
    overflow: scroll;
  }

  .MyHandle {
    position: fixed;
    bottom: 1.2rem;
    right: 0;
    width: 7rem;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    height: 1.2rem;

  .MyWord {
    width: 5rem;
    height: 1rem;
    line-height: 1rem;
    padding: 0.2rem;
    border-radius: 10px;
    background: #fff;
    border: none;
    color: #000;
    font-size: 0.3rem;
    margin: 0 0.2rem;
  }

  .MySend {
    width: 1.5rem;
    height: 1rem;
    background: #7AC23C;
    color: #fff;
    font-size: 0.3rem;
    text-align: center;
    line-height: 1rem;
    border-radius: 10px;
    border: none;
  }

  .noWord {
    background: #aaa;
    color: #fff;
  }

  }

  .list_box {
    position: relative;
    left: 100%;
    margin-left: -3rem;
    width: 3rem;
    height: 3rem;
    background: #fff;
    overflow: scroll;

  .client {
    position: relative;
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-around;
    align-items: center;
    height: 1rem;
    border-bottom: 1px #666 solid;

  .img_client {
    width: 0.6rem;
    height: 0.6rem;
    position: relative;
    border-radius: 50%;

  }

  }
  }

  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .list_on-enter-active {
    height: 3rem;
    transition: height 2s ease;
  }

  .list_on-leave-active {
    height: 0;
    transition: height 1s ease;
  }

  .list_on-enter
    /* .slide-fade-leave-active 用于 2.1.8 以下版本 */
  {
    height: 3rem;
    transition: height 1s ease;
  }

  .list_on-leave-to {

  }

  }
</style>
