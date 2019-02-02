<template>
  <div class="Register">
    <Header></Header>
    <Logo></Logo>
  <form v-on:submit.prevent="checkCode" class="register-box">
    <div class="form-content register-mobile">
      <label>
        <span class="input-items">手机号：</span>
        <input type="tel" name="mobile" maxlength="11" data-required="mobile" id="mobile" placeholder="请填写手机号"
               class="register-mobile">
      </label>
    </div>
    <div id="register-verifier" class="form-content">
      <div id="slider">
        <div id="slider_bg"></div>
        <span id="label">>></span> <span id="labelTip">拖动滑块验证</span>
      </div>
    </div>
    <div v-if="show" class="form-content register-mobileCode">
      <input type="text" name="mobileCode" maxlength="6" v-model='mobileCode' data-required="mobileCode" id="mobileCode" placeholder="请填写6位验证码"
             class="register-mobileCode" v-on:change="lisFocusCode">
      <button id="register-sendCode" class="btn btn-send" v-bind:class="{'btn-disabled':sendDisabled}" v-on:click.prevent="sendMsm">获取验证码</button>
    </div>
    <div v-if="show" class="form-content register-mobileCode"><input class="btn-submit" v-bind:class="{'btn-disabled':!submitDisabled}"   disabled  id="register-submit" type="submit" v-model="isLoginUp" >
    </div>
  </form>
    <p class="Tip-change">已注册账号 ？ <router-link class="font-colorG" to="/LoginIn">请登录</router-link></p>
  <LoginWay></LoginWay>
  </div>
</template>

<script>
  import Slideunlock from '../takeout/jquery.slideunlock.js'
  import LoginWay from '../components/LoginWay'
  import Header from '../components/Header'
  import Logo from '../components/Logo'

  export default {
    name: "Register",
    props: ['registerHost'],
    components: {LoginWay,Header,Logo},
    template: {LoginWay,Header,Logo},
    data() {
      return {
        php_sessionId: '',
        isLoginUp: '注册',
        mobileCode: '',
        countdown: 60,
        sendDisabled: false,
        submitDisabled: false,
        oldMobile: null,
        nextStep: false,
        show: false,
        host: "http://localhost/MKJS/php/register/"
      }
    },
    mounted: function () {
      var $this = this;
      Slideunlock(jQuery, window, document);
      var slider = new SliderUnlock("#slider", {
        successLabelTip: "验证成功"
      }, function () {
        // $this.Message($this.show);
        if ($this.checkPhone("#mobile")) {
          if ($this.oldMobile != $("#mobile").val()) {
            $this.registerMobile();
            $this.oldMobile = $("#mobile").val();
          } else if ($this.oldMobile == $("#mobile").val()) {
            $this.Message("请输入新号码");
          }


        } else {
          $("#labelTip").html("拖动滑块验证");
          $("#labelTip").css("color", "#787878");
          $this.Message("手机号码有误，请重填");
        }
        slider.init();
      });
      slider.init();
    },
    methods: {
      checkPhone: function (ele) {
        var phone = $(ele).val();
        if (!(/^1[34578]\d{9}$/.test(phone))) {
          return false;
        } else {
          return true;
        }
      },
      registerMobile: function () {
        var $this = this;
        //发送 post 请求
        this.$http.post(this.host + "register.php", {Mobile: $("#mobile").val()},{emulateJSON:true}).then(function (res) {
          $this.postRes = res.body;
          console.log(res);
          var ResMessage = res.body.message;
          console.log(res.body.code);
          if (res.body.code == 10200) {
            if (res.body.data.code == 1) {
              $("#labelTip").html("拖动滑块验证");
              $("#labelTip").css("color", "#787878");
              $this.isLoginUp = '登录';
              $this.show = true;
            } else if (res.body.data.code == 2) {
              $this.show = true;
              $this.isLoginUp = '注册';
              console.log($this.show);
              return;
            }
          } else {
            $("#labelTip").html("拖动滑块验证");
            $("#labelTip").css("color", "#787878");
          }
          $this.Message(ResMessage);
        }, function (res) {
          $this.postRes = res.status;
          console.log(res.status);
        });

      },
      Message: function (text, time) {
        $("#message").text(text).removeClass("hide");
        setTimeout(function () {
          $("#message").addClass("hide")
        }, time ? time : 2000)
      },
      sendMsm: function (e) {
        var $this = this;
        var Cookie;
        //发送 post 请求
          this.$http.post(this.host + 'smsyzm.php', {Mobile: $("#mobile").val()},{emulateJSON:true}).then(function (res) {
            $this.php_sessionId = document.cookie;
            console.log($this.php_sessionId);
            if(res.body == null){
              var Data = res.bodyText;
              console.log(res);
              console.log(res.bodyText instanceof Object);
              var IndexOf = Data.indexOf('code');
              var Code = Data.substring(IndexOf + 7 ,IndexOf + 12);
              if(Code == '10000'||Code =='000000'){
                $this.isSetTime("#register-sendCode");
                // $this.php_sessionId =
              }else{
                $this.Message("验证码系统有误，请联系管理员");
                $("#register-sendCode").text("重试");
              }
            }else{
              var Data = res.body;
              console.log(res);
              console.log(res.body instanceof Object);

              if(Data.code == '000000'){
                $this.isSetTime("#register-sendCode");
              }else{
                $this.Message("验证码系统有误，请联系管理员");
                $("#register-sendCode").text("重试");
              }
            }

          }, function (res) {
          });
      },
      isSetTime: function (ele) {
        var $this = this;
        var $ele = ele instanceof Object ? ele : $(ele);
        //60秒倒计时
        if ($this.countdown == 0){
          $ele.attr("disabled",false);
          $this.sendDisabled = false;
          $ele.text("重新发送");
          $this.countdown = 60;
          return;
        }else{
          $this.sendDisabled = true;
          $ele.attr("disabled", true);
          $ele.text($this.countdown + "s");
          $this.countdown--;
        }
        setTimeout(function() {
            $this.isSetTime($ele) }
          ,1000)
      },
      checkCode: function () {
        var $this = this;
        var code = $("#mobileCode").val();
        console.log(code);
        $this.$http.post(this.host + "check.php",{Mobile: $("#mobile").val(),MobileCode: code},{emulateJSON: true}).then(function (res) {
          console.log(res.body);
          if(res.body.code == '10000'){
            $this.nextStep = true;

            this.$router.push("/Main");
            localStorage.setItem("token",res.body.token);
          }else{
            $this.Message("验证码有误，请重新输入");
            $this.mobileCode = '';
            $this.nextStep = false;
          }
        },function (res) {

        })
      },
      lisFocusCode: function (e) {
        let Code = this.mobileCode;
        if(Code.length == 6){
          this.submitDisabled = true;
        }else{
          this.submitDisabled = false;
        }
        $("#register-submit").attr("disabled",!this.submitDisabled);
      }
    }
  }

</script>

<style lang="scss" scoped>
  @import '../takeout/slide-unlock.css';
  .Register{
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
  }
  .register-box {
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

        input[type=tel], input[type=text] {
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
        background-color: #cccccc!important;
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
        #labelTip{
          line-height: 1rem;
        }
      }
    }
  }
.Tip-change{
  margin-top: 1rem;
  text-align: center;
}
  #label {
    font-family: "宋体";
  }
</style>
