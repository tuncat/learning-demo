let Vue
class Store{
  constructor(options) {
    this.$options = options
    const {mutations,actions,getters} = options
    this._mutations = mutations
    this._actions = actions
    this._getters = getters
    
    this._vm = new Vue({
      data(){
        return {
          $$state:options.state
        }
      },
      computed
    })
    this.commit = this.commit.bind(this)
    this.dispatch = this.dispatch.bind(this)

    this.getters = {}
    const computed = {}
    const store = this
    for (const key in this._getters) {
      computed[key] = store._getters[key](store.state)
      Object.defineProperty(store.getters,key,{
        get:()=>store._vm[key]
      })
    }
    console.log('computed',computed)

  }
  get state(){
    return this._vm._data.$$state
  }
  set state(v) {
    console.error('please use replaceState to reset state');
  }
  commit(type,payload){
    const entry = this._mutations[type]
    if(entry) {
      entry(this.state,payload)
    } else {
      console.error('mutation不存在');
    }
  }
  dispatch(type,payload) {
    const entry = this._actions[type]
    if(entry) {
      entry(this,payload)
    } else {
      console.error('action不存在');
    }
  }
}

function install(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      if(this.$options.store) {
        Vue.prototype.$store = this.$options.store
      }
    }
  })

}
export default{ install,Store }