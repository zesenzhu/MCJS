<template>
  <div id="LoginIn">
    <Header></Header>
    <Logo></Logo>

    <form v-on:submit.prevent="loginIn" class="LoginIn-box">
      <div class="form-content LI-username">
        <label>
          <span class="input-items">用户名：</span>
          <input type="text" name="username" maxlength="11" data-required="username" id="username" placeholder="请填写用户名"
                 class="LI-username">
        </label>
      </div>
      <div class="form-content LI-password">
        <label>
          <span class="input-items">密码：</span>
          <input type="password" name="password" data-required="password" id="password" placeholder="请填写密码"
                 class="LI-password">
        </label>
      </div>
      <div class="form-content LI-submit"><input class="btn-submit" v-bind:class="{'btn-disabled':!submitDisabled}"
                                                 disabled id="register-submit" type="submit" v-model="isLoginUp">
      </div>
    </form>
    <p class="Tip-change">不喜欢账密登录？
      <router-link class="font-colorG" to="/Register">可验证码登录</router-link>
    </p>
    <LoginWay></LoginWay>
  </div>
</template>

<script>
  import LoginWay from '../components/LoginWay'
  import Header from '../components/Header'
  import Logo from '../components/Logo'

  export default {
    name: "LoginIn",
    components: {LoginWay, Header, Logo},
    template: {LoginWay, Header, Logo},
    data() {
      return {
        submitDisabled: false,
        isLoginUp: "登录",
        fromPath: '',
        Login_host: "/php/register/",
      }
    },

    methods: {
      Message: function (text, time) {
        $("#message").text(text).removeClass("hide");
        setTimeout(function () {
          $("#message").addClass("hide")
        }, time ? time : 2000)
      },
      lisChange: function (e) {
        let userName = $("#username").val();
        let passWord = $("#password").val();
        if (passWord.length >= 6 && userName) {
          this.submitDisabled = true;
        } else {
          this.submitDisabled = false;
        }
        $("#register-submit").attr("disabled", !this.submitDisabled);
      },
      loginIn: function () {
        var $this = this;
        //发送 post 请求
        this.$http.post(this.Login_host + "LoginIn.php", {
          username: $("#username").val(),
          password: $("#password").val()
        }, {emulateJSON: true}).then(function (res) {
          $this.postRes = res.body;
          console.log(res);
          var ResMessage = res.body.message;
          console.log(res.body.code);
          if (res.body.code == 10000) {
            this.$router.push("/Main");
            localStorage.setItem("token", res.body.token);
          } else if (res.body.code == 10010) {
            $this.Message("密码错误，请重新输入");
            $("#username").val("");
            $("#password").val("");
          } else {
            $this.Message("该用户名不存在，请重新输入");
          }
          if (!$this.isAccount)
            $this.Message(ResMessage);
        }, function (res) {
          $this.postRes = res.status;
          console.log(res.status);
        });
      }
    },
    mounted: function () {
      let $this = this;
      $("input").on("focus change", function () {
        console.log("sadfsadasd");
        $this.lisChange();
      })
    }
  }
</script>

<style lang="scss" scoped>
  @import '../takeout/slide-unlock.css';

  #LoginIn {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }

  .LoginIn-box {
    position: relative;
    width: 8rem;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    border-radius: 10px;
    border: 5px solid #21ca2d;
    margin-top: 1rem;
    box-shadow: 10px 10px 5px #888888;
    box-sizing: border-box;
    padding: 1rem;
    .form-content {
      width: 6rem;
      height: 1rem;
      margin-top: 0.2rem;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;

      label {
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        .input-items {
          display: inline-block;
          width: 2rem;
          height: 1rem;
          line-height: 1rem;

          color: #fff;
          font-size: 0.3rem;
          padding-left: 0.5rem;
          box-sizing: border-box;
          background-color: #7AC23C;
          border-radius: 0.5rem 0 0 0.5rem;
        }

        input[type=password], input[type=text] {
          height: 1rem;
          width: 4rem;
          padding: 0.2rem;
          box-sizing: border-box;
          border-radius: 0 0.5rem 0.5rem 0;
          border: 1px solid #21ca2d;
        }

      }
      #mobileCode {
        width: 4rem;
        height: 1rem;
        padding: 0;
        padding-left: 0.5rem;
        box-sizing: border-box;
        border: 1px solid #21ca2d;
        border-radius: 0.5rem 0 0 0.5rem;
      }
      .btn {
        display: inline-block;
        border: none;
        width: 2rem;
        height: 1rem;
        background-color: #7AC23C;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        border-radius: 0 0.5rem 0.5rem 0;
        font-size: 0.3rem;
      }
      .btn-disabled {
        background-color: #cccccc !important;
      }
      .btn-submit {
        display: inline-block;
        width: 6rem;
        height: 1rem;
        background-color: #7AC23C;
        color: #fff;
        text-align: center;
        line-height: 1rem;
        border-radius: 0.5rem;
        font-size: 0.3rem;
      }

    }

    #register-verifier {
      margin: 0;
      margin-top: 0.2rem;
      width: 6rem;
      height: 1rem;
      box-sizing: border-box;

      #slider {
        margin: 0;
        width: 100%;
        height: 1rem;
        -webkit-border-radius: 0.5rem;
        -moz-border-radius: 0.5rem;
        border-radius: 0.5rem;

        #label {

          height: 1rem;
          line-height: 1rem;
          box-sizing: border-box;
          border: none !important;

        }
        #labelTip {
          line-height: 1rem;
        }
      }
    }
  }

  .Tip-change {
    margin-top: 1rem;
    text-align: center;
  }

  #label {
    font-family: "宋体";
  }
</style>
