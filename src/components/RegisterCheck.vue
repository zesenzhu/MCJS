<template>
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
</template>

<script>
    export default {
        name: "RegisterCheck"
    }
</script>

<style scoped>

</style>
