<template>
  <div id="toRoom">
    <div class="table">
      <span class="room_list" @click="room=1" :class="{list_active:room==1}">房间1</span>
      <!--<span class="room_list" @click="room=2" :class="{list_active:room==2}">房间2</span>-->
      <!--<span class="room_list" @click="room=3" :class="{list_active:room==3}">房间3</span>-->
      <!--<span class="room_list" @click="room=4" :class="{list_active:room==4}">房间4</span>-->

    </div>
    <keep-alive>
      <Room v-if="room==1" :Room="1"></Room>
      <!--<Room2 v-else-if="room==2" :Room="2" :login="room_login"></Room2>-->
      <!--<Room3 v-else-if="room==3" :Room="3" :login="room_login"></Room3>-->
      <!--<Room4 v-else-if="room==4" :Room="4" :login="room_login"></Room4>-->
    </keep-alive>

  </div>
</template>

<script>
  import Room from '../chat/Room';
  import Room2 from '../chat/Room';
  import Room3 from '../chat/Room';
  import Room4 from '../chat/Room';
  export default {
    name: 'toRoom',
    components: {Room, Room2, Room3, Room4},
    template: {Room, Room2, Room3, Room4},
    data(){
      return {
        room: '',
        room_login: {
          1: false,
          2: false,
          3: false,
          4: false
        }
      }
    },
    mounted(){

    },
    watch: {
      room(val){
        let room = val,
          loginRoom = this.$store.state.loginRoom,
          $this = this,
          chatUserMsg = this.$store.state.chatUserMsg;
        if (!loginRoom[val]) {

          this.$http.post('/php/chat/chat.php', {
            obj: 'room_' + $this.room,
            route: 'chat'
          }, {emulateJSON: true}).then(function (res) {

            console.log(res.body.msg);
            let chatMsg = res.body.msg;
            delete chatMsg[chatMsg.length - 1];
            console.log(chatMsg);
            for (let i = 0; i < chatMsg.length - 1; i++) {

              $this.$http.post('/php/chat/chat.php', {
                client_name: chatMsg[i]['from_client_name'],
                route: 'msg'
              }, {emulateJSON: true}).then(function (res) {
                console.log(res.body);
                chatUserMsg[chatMsg[i]['from_client_name']] = res.body.msg;
                //chatUserMsg[chatMsg['from_client_name']]['client_id'] = chatMsg['from_client_id'];
                $this.$store.commit('client_listHandle', {
                  client_list: $this.$store.state.client_list,
                  chatUserMsg: chatUserMsg,
                });
                this.$store.commit('allSayHandle', {
                  allSay: chatMsg[i]
                })
                console.log(this.$store.state.allSay);
                if(!loginRoom[val]){
                  this.$store.state.ws.send('{"type":"login","client_name":"' + sessionStorage.getItem("username") + '","room_id":"' + val + '"}')
                  loginRoom[val] = true;
                  this.$store.commit('loginRoomHandle', {
                    loginRoom: loginRoom[val],
                    room: val
                  })
                }
              }, function (res) {
              });
            }
          })
        }
        //console.log(room)
      }
    }

  }
</script>

<style lang="scss" scoped>
  #toRoom {
    position: relative;
    width: 100%;
    height: calc(100vh - 3.8rem);
    display: flex;
    flex-flow: row nowrap;
    background: #fff;

  .table {
    position: relative;
    display: inline-block;
    width: 3rem;
    height: 100%;
    overflow: scroll;
    background: #fff;

  .room_list {

    display: inline-block;
    height: 1rem;
    line-height: 1rem;
    width: 100%;
    text-align: center;
    color: #000;
    background: #fff;
    font-size: 0.4rem;
  }

  .list_active {
    color: #7AC23C;
    background: #eee;
  }

  }
  }
</style>
