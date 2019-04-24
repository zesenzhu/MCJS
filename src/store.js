/**
 * Created by Administrator on 2019/4/3.
 */
import Vue from 'vue' //引入vue
import Vuex from 'vuex' // 引入vuex
Vue.use(Vuex)  // 注册vuex
export default new Vuex.Store({ // 暴露与new vuex
  state: { // 相当于vue里data 存放整个项目的各个状态
    number: 0,

    //购物车
    cartGoodsSelect: false,//全选
    cartGoodsSelectAdverse: true,//全选相反
    cartGoodsPrice: {},//被选择的购物车商品价格
    cartGoods: {},//是否被选择的购物车商品
    cartGoodsPriceAll: 0,//被选择的购物车商品总价
    cartGoodsSelectNum: 0,//被选择的购物车商品数量
    cartGoodsAll: {},//储存购物车信息
    cartConfirm: {},//储存确认购买的信息
    layerConfirmParams: {},//确认弹层的参数
    layerUploadParams: {},//信息上传弹层的参数


    //支付页面
    confirmGoods: {},//支付商品
    confirmGoodsDetails: 0,//详情页过去所带的信息
    confirmGoodsNum: 0,//支付商品数量
    confirmGoodsPrice: 0,//支付商品价格

    //信息修改页面
    changeMsg:{},//信息修改信息
    changeCollect:{},

    //webSocket
    ws:'',
    client_list:{},
    chatData:'',
    chatUserMsg:{},
    allSay:[],
    mySay:[],
    loginRoom:{

    }
  },
  mutations: { //相当于vue里的methods放方法的，定义一些可以用来调用和修改state里的状态值
    cartGoodsSelectAll(state, payload){//对应
      "use strict";
      state.cartGoodsSelect = payload.boolean;
    },
    cartGoodsSelectAdverseHandle(state, payload){
      "use strict";
      state.cartGoodsSelectAdverse = payload.boolean;
    },
    cartGoodsHandle(state, payload){
      "use strict";
      state.cartGoods['goodsId-' + payload.goodsId] = payload.boolean;
    },
    cartGoodsPriceHandle(state, payload){
      "use strict";
      state.cartGoodsPrice['goodsId-' + payload.goodsId] = payload.AllPrice;
    },
    cartGoodsPriceAllHandle(state){
      var AllPrice = 0, num = 0;

      for (var variable in state.cartGoodsPrice.__ob__.value) {
        AllPrice += state.cartGoodsPrice[variable];
      }
      for (var key in state.cartGoods) {
        if (state.cartGoods[key]) {
          num += 1;
        }
      }
      state.cartGoodsSelectNum = num;
      state.cartGoodsPriceAll = AllPrice;


    },
    cartGoodsAllHandle(state, payload){
      "use strict";
      state.cartGoodsAll = payload.goodsMsg;
    },
    layerConfirmParamsHandle(state, payload){
      "use strict";
      state.layerConfirmParams = payload.params;
    },
    layerUploadParamsHandle(state, payload){
      "use strict";
      state.layerUploadParams = payload.params;
    },
    //支付页面
    confirmGoodsHandle(state,payload){
      "use strict";
      state.confirmGoods = payload.Goods;
    },
    confirmGoodsDetailsHandle(state,payload){
      "use strict";
      state.confirmGoodsDetails = payload.details;
    },
    confirmGoodsNumHandle(state,payload){
      "use strict";

      if(!payload.begin )//begin 为false表明还是同个订单
      {
        state.confirmGoodsNum += parseInt(payload.num);
        state.confirmGoodsPrice += payload.price;
      }

      else if(payload.begin ){
        state.confirmGoodsNum = 0;
        state.confirmGoodsPrice = 0;
      }
      console.log(state.confirmGoodsNum,state.confirmGoodsPrice,payload.begin,payload.price)
    },
    //信息修改
    changeMsgHandle(state,payload){
      "use strict";
      state.changeMsg = payload.msg;
    },
    changeCollectHandle(state,payload){
      "use strict";
      if(payload.reset){
        state.changeCollect = {}
      }else{
        state.changeCollect[payload.key] = payload.boolean;
      }

    },


    //webSocket
    wsHandle(state,payload){
      "use strict";
      state.ws = payload.ws
    },
    client_listHandle(state,payload){
      "use strict";
      state.client_list = payload.client_list;
      state.chatUserMsg = payload.chatUserMsg;
    },
    chatDataHandle(state,payload){
      "use strict";
      state.chatData = JSON.parse(payload.chatData);
    },
    allSayHandle(state,payload){
      "use strict";
      state.allSay.push(payload.allSay);
    },
   mySayHandle(state,payload){
      "use strict";
      state.mySay.push(payload.mySay);
    },
    loginRoomHandle(state,payload){
      "use strict";
      state.loginRoom[payload.room] = payload.loginRoom;
    }
  },


  getters: {
    selectGoodsNum(state){
      "use strict";
      var num = 0;
      for (var key in state.cartGoods) {
        if (state.cartGoods[key]) {
          num += 1;
        }
      }
      console.log(num)
      return num;
    }
  },
  cartGoodsSelectAll: {
    increment (context) {
      context.commit('cartGoodsSelectAll')
    }
  }
})
