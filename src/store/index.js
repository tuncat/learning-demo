import Vue from 'vue'
// import Vuex from 'vuex'
import Vuex from '../kstore/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    counter:0
  },
  mutations: {
    add(state) {
      state.counter++
    }
  },
  actions: {
    // 这里的上下文是什么
    add(ctx) {
      setTimeout(()=>{
        ctx.commit('add')
      },1000)
    }
  },
  modules: {
  },
  getters:{
    doubleCounter:state=>{
      return state.counter*2
    }
  }
})
