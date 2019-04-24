<template>
  <div id="MyPwd">
    <div class="head">
      <span class="backBtn" @click="back">
        <span class="back"></span>修改密码</span>
    </div>
    <div class="handleBox">
      <p class="tips-top">系统初次生成密码为：123456</p>
      <div class="handle oldPwd">
        <span class="tips">旧密码：</span>
        <input type="password" name="oldPwd" v-model="oldPwd" placeholder="密码至少6位">
      </div>
      <div class="handle oldPwd">
        <span class="tips">新密码：</span>
        <input type="password" name="newPwd" v-model="newPwd" placeholder="密码至少6位">
      </div>
      <div class="handle oldPwd">
        <span class="tips">确认密码：</span>
        <input type="password" name="newPwdConfirm" v-model="newPwdConfirm" placeholder="密码至少6位">
      </div>

      <span class="confirm-btn" @click="changePwd">确认更改</span>
      <p class="tips-bottom">密码忘记了请联系管理员<br/>qq：1519406168</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'MyPwd',
    inject:['reload'],
    data(){
      return {
        newPwdConfirm:'',
        newPwd:'',
        oldPwd:''
      }
    },
    mounted(){

    },
    methods: {
      back(){
        this.$router.go(-1);
      },
      changePwd(){
        let $this = this,userId = sessionStorage.getItem('userId');;
        if($this.oldPwd.length < 6){
          $this.$Message("旧密码错误，请重新输入");
          $this.oldPwd = '';
        }else if($this.newPwd.length < 6 || $this.newPwdConfirm.length < 6){
          $this.$Message("新密码至少6位，请重新输入");
          $this.newPwd = '';
          $this.newPwdConfirm = '';
        }else if($this.newPwd != $this.newPwdConfirm){
          $this.$Message("确认密码不一致，请重新输入");
          $this.newPwdConfirm = '';
        }else{
          //请求后台数据
          $this.$http.post("/php/my/my.php",
            {userId:userId,route:"setPwd",oldPwd : $this.oldPwd,newPwd:$this.newPwd},
            {emulateJSON: true}).then(function (response) {
              console.log(response);
            if(response.body.msg.code == 10400){
              $this.$Message("旧密码不正确");
              $this.oldPwd = '';
            }else if(response.body.msg.code == 10200){
              $this.$Message("密码更改成功");
              setTimeout(function () {
                $this.reload();
              },3000)

            }else{
              $this.reload();
              $this.$Message("后台出错");
            }


            }, function (error) {
              $this.$Message(error);
            }
          )
        }
      }
    }

  }
</script>

<style lang="scss" scoped>
  #MyPwd {
    position: relative;
    width: 10rem;
    background: #eee;
    min-height: 100vh;

  .head {
    width: 100%;
    height: 1.4rem;
    position: relative;
    background: #fff;
    font-size: 0.5rem;
    color: #7AC23C;

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
  .handleBox {
    position: absolute;
    width: 9rem;
    min-height: 3rem;
    left: 0;
    right: 0;
    top: 50%;
    padding: 0.5rem;
    transform: translateY(-50%);
    margin: 0 auto;
    background: #fff;
    border-radius: 10px;

  .tips-top{
    line-height: 1rem;
    text-align: center;
    color: #7AC23C;
    font-size: 0.4rem;
    margin-bottom: 0.2rem;
  }
  .tips-bottom{
    margin-top: 1rem;
    line-height: 0.6rem;
    text-align: left;
    color: #000;
    font-size: 0.3rem;
    margin-bottom: 0.2rem;
  }
    .handle{
      position: relative;
      width: 100%;
      height: 1rem;
      margin: 0.2rem 0;


      .tips{
        position: relative;
        display: inline-block;
        width: 2.5rem;
        line-height: 1rem;
        text-align: left;
        color: #000;
        font-size: 0.4rem;
      }

      input[type=password]{
        width: 5rem;
        line-height: 1rem;
        position: relative;
        text-align: left;
        color: #000;
        font-size: 0.4rem;
        background: #eee;
        padding: 0 0.2rem;
      }
    }
  .confirm-btn{
    position: relative;
    display: inline-block;
    margin-top: 1rem;
    left: 50%;
    margin-left: -2rem;
    height: 1rem;
    line-height: 1rem;
    width: 4rem;
    color: #fff;
    font-size: 0.4rem;
    text-align: center;
    background: #7AC23C;
    border-radius: 10px;
  }
  }

  }

</style>
