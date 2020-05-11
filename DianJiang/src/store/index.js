import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import payOrder from './modules/payOrder'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    payOrder
  },
  mutations: {
    //设置底部nav栏
    setFooterNav:function(state,type){
      state.footerActive = type;
    },
  },
  getters
})

export default store
