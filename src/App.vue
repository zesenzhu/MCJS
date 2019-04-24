<template>
  <div id="app">
    <div id="message" class="hide">sadasd</div>


    <router-view :register-host="host" v-if="isRouterAlive"></router-view>

  </div>
</template>

<script>
  import router from './router'
  export default {
    name: 'App',
    provide(){
      return {
        reload: this.reload,
        username:'',
        ws:''
      }
    },
    data() {
      return {
        isRouterAlive: true,
        host: "http://localhost/MKJS/php/register.php"
      }
    },
    beforeMount(){
      let $this = this;
      let token = localStorage.getItem("token");
      this.$http.post("/php/Token/check_token.php", {Btoken: token}, {emulateJSON: true}).then(function (res) {


        if (res.body.code != '10000') {
          router.push({path: '/Register'})
        } else {
        }
      }, function (res) {

      })
      console.log($this.$socketBaseUrl);

    },
    beforeCreate(){
      //token验证
      let $this = this;
      let token = localStorage.getItem("token");
      $this.$http.post("/php/Token/check_token.php", {Btoken: token}, {emulateJSON: true}).then(function (res) {
        console.log(res.body);
        if (res.body.code == '10000') {
          sessionStorage.setItem("username", res.body.username);
          sessionStorage.setItem("addtime", res.body.addtime);
          sessionStorage.setItem("mobilephone", res.body.mobilephone);
          sessionStorage.setItem("power", res.body.power);
          sessionStorage.setItem("userId", res.body.userId);

        } else {
          $this.$Message("token过期，请重新登录");
        }
      }, function (res) {
      })
    },
    mounted(){
//      $("body").on("click",function (e) {
//        console.log(e.target)
//      })
      this.connect();
    },
    methods: {
      //token验证
      checkToken: function () {
        let $this = this;
        let token = localStorage.getItem("token");
        $this.$http.post("/php/Token/check_token.php", {Btoken: token}, {emulateJSON: true}).then(function (res) {
          console.log(res.body);
          if (res.body.code == '10000') {
            sessionStorage.setItem("username", res.body.username);
            sessionStorage.setItem("addtime", res.body.addtime);
            sessionStorage.setItem("mobilephone", res.body.mobilephone);
            sessionStorage.setItem("power", res.body.power);
            sessionStorage.setItem("userId", res.body.userId);

          } else {
            $this.$Message("token过期，请重新登录");
          }
        }, function (res) {
        })
      },
      reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true;

        })
        console.log("reload")
      },
      // 连接服务端
      connect() {
        // 创建websocket
        let $this =this;
        this.ws = new WebSocket(this.$socketBaseUrl);
        // 当socket连接打开时，输入用户名
        this.ws.onopen = this.onopen;
        // 当有消息时根据消息类型显示不同信息
        this.ws.onmessage = this.onmessage;
        this.ws.onclose = function () {
          console.log("连接关闭，定时重连");
          //$this.connect();
        };
        this.ws.onerror = function () {
          console.log("出现错误");
        };
        this.$store.commit('wsHandle',{
          ws : $this.ws
        })
      },// 连接建立时发送登录信息
      onopen()
      {
        let $this=this;
        this.username = sessionStorage.getItem("username");

        // 登录
        var login_data = {"type":"login","client_name":this.username,"room_id":1};
        console.log("websocket握手成功，发送登录数据:" + login_data);


        //this.ws.send(login_data);
      },

      // 服务端发来消息时
      onmessage(e)
      {
        let client_list = this.$store.state.client_list;
        let chatUserMsg = this.$store.state.chatUserMsg;
        console.log(e.data);

        let $this= this;
        this.$store.commit('chatDataHandle',{
          chatData:e.data
        })
        var data = JSON.parse(e.data);

        switch (data['type']) {
          // 服务端ping客户端
          case 'ping':
            $this.ws.send('{"type":"pong"}');
            break;
          // 登录 更新用户列表
          case 'login':
            //{"type":"login","client_id":xxx,"client_name":"xxx","client_list":"[...]","time":"xxx"}

            if (data['client_list']) {
              $this.$set(client_list,data['room_id'],data['client_list']);
              //client_list[data['room_id']] = data['client_list'];
            }
            else {
              $this.$set(client_list[data['room_id']],data['client_id'],data['client_name']);
              //client_list[data['room_id']][data['client_id']] = data['client_name'];
            }

            console.log(chatUserMsg,client_list)
            for(let room in client_list ){
              for(let client in client_list[room]){
                if(!chatUserMsg||!chatUserMsg[client_list[room][client]]){
                  $this.$http.post('/php/chat/chat.php', {client_name: client_list[room][client], route: 'msg'}, {emulateJSON: true}).then(function (res) {
                    console.log(res.body);
                    chatUserMsg[client_list[room][client]] = res.body.msg;
                    chatUserMsg[client_list[room][client]]['client_id'] = client;
                    $this.$store.commit('client_listHandle',{
                      client_list:client_list,
                      chatUserMsg:chatUserMsg,
                    });
                    //console.log(data['client_name'] + "登录成功",this.$store.state.client_list);
                  }, function (res) {
                  });
                }
              }

            };
            $this.$store.commit("allSayHandle",{
              allSay:data
            })
            break;
          // 发言
          case 'say':
            $this.$store.commit("allSayHandle",{
              allSay:data
            })
/*
* content: "65645654654"
 from_client_id: "7f00000108fc00000002"
 from_client_name: "MKJS"
 time: "2019-04-15 21:08:22"
 to_client_id: "all"
 type: "say"
 */
            break;
          // 用户退出 更新用户列表
          case 'logout':
            //{"type":"logout","client_id":xxx,"time":"xxx"}
            console.log(client_list,data['from_client_id']);
//            delete client_list[data['from_room_id']][data['from_client_id']];
            //Object.defineProperty(client_list[data['from_room_id']],data['from_client_id'],{enumerable:false});
            //$this.$set(client_list,data['from_room_id'],client_list[data['from_room_id']]);
            client_list[data['from_room_id']][data['from_client_id']] = null;
            delete client_list[data['from_room_id']][data['from_client_id']];
            console.log(client_list);
            $this.$store.commit("allSayHandle",{
              allSay:data
            })
            $this.$store.commit('client_listHandle',{
              client_list:client_list,
              chatUserMsg:chatUserMsg,
            })
            //flush_client_list();
        }
      }
    }
  }

</script>

<style lang="scss">
  @import './takeout/reset.css';
  @import './takeout/common.css';

  .hide {
    display: none;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    color: #2c3e50;
    min-height: 100vh;
    overflow: hidden;

  #message {
    position: fixed;
    top: 50%;
    transform: translateX(-50%);
    transform: translateY(50%);
    background-color: rgba(151, 151, 151, 0.43);
    color: #fff;
    padding: 0.3rem;
    font-size: 0.5rem;
    max-width: 8rem;
    min-width: 2rem;
    border-radius: 10px;
    z-index: 9999999;
  }

  }


</style>
