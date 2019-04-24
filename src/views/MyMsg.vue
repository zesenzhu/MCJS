<template>
    <div id="MyMsg">
      <div class="head"><span class="backBtn" @click="back"><span class="back"></span>个人信息</span></div>
      <div class="center">
        <div class="form-container name-container">
          <span class="center-tips">权限:</span>
          <span class="power-show" >{{power}}</span>
        </div>
        <div class="form-container avatar" id="avatar-btn" v-on:click="myBtn(params)">
          <span class="center-tips">头像:</span>
          <img :src="'/'+msg.avatar" class="msgImg">
          <span class="icon-to"></span>
        </div>
        <div class="form-container name-container" >
          <span class="center-tips">用户名:</span>
          <input class="name-input" type="text" name="name" v-model="name">
        </div>

        <div class="form-container name-container" >
          <span class="center-tips">手机号码:</span>
          <input class="mobilephone-input" type="text" name="mobilephone" v-model="mobilephone">
        </div>
        <div class="form-container name-container" >
          <span class="center-tips">学校:</span>
          <input class="school-input" type="text" name="school" v-model="school">
        </div>
        <div class="form-container name-container" >
          <span class="center-tips">校区:</span>
          <input class="campus-input" type="text" name="campus" v-model="campus">
        </div>
        <div class="form-container name-container" >
          <span class="center-tips">地址:</span>
          <input class="address-input" type="text" name="address" v-model="address">
        </div>
        <div class="form-container name-container" >
          <span class="center-tips">性别:</span>

          <select name="sex" class="sex" v-model="sex" @click="sexHandle=!sexHandle">
            <option value="0">男</option>
            <option value="1">女</option>
          </select>
          <span :class="{sexHandle:sexHandle,sexHandleNo:!sexHandle}"></span>
        </div>
        <div class="form-container name-container" >
          <span class="center-tips">出生日期:</span>
          <input class="birthday-input" type="date" name="birthday" v-model="birthday">
        </div>
        <span class="change_btn" id="change-btn" @click="changeBtn(params2)">确认更改</span>
      </div>
      <LayerUpload></LayerUpload>
      <LayerConfirm ></LayerConfirm>
    </div>
</template>

<script>
  import LayerUpload from '../components/layer/LayerUpload.vue'
  import LayerConfirm from "@/components/layer/LayerConfirm";
    export default {
        name: 'MyMsg',
      components:{LayerUpload,LayerConfirm},
      template:{LayerUpload,LayerConfirm},
      data(){
          return{
            msg:'',
            name:'',
            power:'',
            school:'',
            campus:'',
            address:'',
            sex:'',
            age:'',
            birthday:'',
            mobilephone:'',
            sexHandle:false,
            params: {
              content: '更改头像',//文本内容
              handle: $('#avatar-btn'),//操作来源
              screen: true,//是否要幕布
              screenHandle: true,//点击幕布关闭弹层
              hide: true,//弹层显示状态
              confirm($this){//确认后要做什么
                let userId = sessionStorage.getItem("userId");

                $this.$http.post("/php/my/my.php",
                  {img: $this.ImgUrl, userId: userId,route:'changeImg'},
                  {emulateJSON: true}).then(function (response) {
                    console.log(response);
                    $this.reload();

                  }, function (error) {
                    $this.$Message(error);
                  }
                )
              }
            },
            params2: {
              content: '确定更改？',//文本内容
              handle: $('#change-btn'),//操作来源
              screen: true,//是否要幕布
              screenHandle: true,//点击幕布关闭弹层
              hide: true,//弹层显示状态
              confirm($this){//确认后要做什么
                let userId = sessionStorage.getItem("userId"),params = $this.$store.state.changeMsg;
                params.userId = userId;
                params.route = 'changeMsg';
                $this.$http.post("/php/my/my.php",
                  params,
                  {emulateJSON: true}).then(function (response) {
                    console.log(response);
                    $this.reload();

                  }, function (error) {
                    $this.$Message(error);
                  }
                )
              }
            },

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

          $this.name = $this.msg.username;
          $this.power = $this.msg.power;
          $this.mobilephone = $this.msg.mobilephone;
          $this.school = $this.msg.school;
          $this.campus = $this.msg.campus;
          $this.address = $this.msg.address;
          $this.sex = $this.msg.sex;
          if($this.msg.birthday==''){
            $this.birthday = ''
          }else{
            $this.birthday = $this.msg.birthday;
          }

        })
      },
      beforeMount(){
//params传入
        let $this =this;
        this.$store.commit('layerUploadParamsHandle',{
          params:$this.params
        });
        this.$store.commit('layerConfirmParamsHandle',{
          params:$this.params2
        })

      },
      methods:{
        back(){
          this.$router.go(-1);
        },
        myBtn(params){


          this.params.hide = false;

        },
        changeBtn(params){
          let $this = this;

          if($this.name == $this.msg.username  && $this.mobilephone == $this.msg.mobilephone && $this.school == $this.msg.school && $this.campus == $this.msg.campus && $this.address == $this.msg.address && $this.sex == $this.msg.sex && $this.birthday == $this.msg.birthday){
            this.$Message("你还没有修改信息哦!");
          }else if( !$this.birthday || !$this.name || !$this.mobilephone || !$this.school|| !$this.campus|| !$this.address|| !$this.sex){
            this.$Message("你修改信息不能为空哦!");
          }else{
            let params = {};
            params.username = $this.name;
            params.school = $this.school;
            params.campus = $this.campus;
            params.address = $this.address;
            params.sex = $this.sex;
            params.birthday = $this.birthday;
            params.mobilephone = $this.mobilephone;

            $this.$store.commit('changeMsgHandle',{
              msg:params
            })
            this.params2.hide = false;
            console.log(this.params2.hide)
          }

        },
      }

    }
</script>

<style lang="scss" scoped>
  #MyMsg{
    position: relative;
    width: 10rem;
    background: #eee;
    min-height: 100vh;


  .head {
    width: 100%;
    height: 1.4rem;
    position: relative;

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
  .center{
    .center-tips{
       margin-left: 0.2rem;
      position: relative;
      display: inline-block;
      color: #666;
      width: 2rem;
      font-size: 0.4rem;
      text-align: left;
      line-height: 1.4rem;
    }

    .power-show{
      position: relative;
      line-height: 1rem;
      width: 7rem;
      border: none;
      font-size: 0.4rem;
      padding-left: 0.2rem;
      color: #000;
    }
  .form-container{
    position: relative;
    height: 1.4rem;
    width: 100%;
    border-bottom: 1px #eee solid;
    background: #fff;


  input[type=text],
  .sex,
  input[type=date]{
      position: relative;
    display: inline-block;
      line-height: 1rem;
      width: 7.5rem;
      border: none;
      font-size: 0.4rem;
    background: #eee;
    padding-left: 0.2rem;
      color: #000;
    height: 1rem;

    /*很关键：将默认的select选择框样式清除*/
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;
    }
  }

  .msgImg{
    position: absolute;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    right: 1.2rem;
    top: 0.2rem;
  }

  .icon-to{
    position: absolute;
    right: 0.5rem;
    width: 0.5rem;
    height: 100%;
    background: url(../assets/icon-to.png)no-repeat center center;
    background-size: contain;

  }
  .change_btn{
    position: relative;
    top: 2rem;
    left: 50%;
    margin-left: -1.5rem;
    width: 3rem;
    height: 1rem;
    line-height: 1rem;
    text-align: center;
    color: #fff;
    font-size: 0.4rem;
    background: #7AC23C;
    border-radius: 10px;
    display: inline-block;
  }
  }

  .sexHandleNo{
    position: absolute;
    right: 0.5rem;
    width: 0.5rem;
    height: 100%;
    background: url(../assets/icon-to.png)no-repeat center center;
    background-size: contain;
  }
  .sexHandle{
    position: absolute;
    right: 0.5rem;
    width: 0.5rem;
    height: 100%;
    background: url(../assets/icon-bottom.png)no-repeat center center;
    background-size: contain;
  }

  }
</style>
