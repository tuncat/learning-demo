let Vue = null;

class KVueRouter {
  constructor(options) {
    this.$options = options
    this.routeMap = {}
    options.routes.forEach(route=>{
      this.routeMap[route.path] = route
    })
    // 做成响应式的，current改变的时候，才会触发render方法再次执行
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this,'current',initial)
    window.addEventListener('hashchange',()=>{
      this.current = window.location.hash.slice(1)
    })
    window.addEventListener('load',()=>{
      this.current = window.location.hash.slice(1)
    })
  }
}

KVueRouter.install = function(_Vue) {
  Vue = _Vue

  Vue.mixin({
    beforeCreate() {
      // 这里的this指向根组件,在new Vue的时候进行挂载的$options.router，所以需要处理生命周期，在较早时候将route挂上
      if(this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })

  // <a href='#/about'>xxx</a>
  // <router-link to="/about"></router-link>
  Vue.component('router-link',{
    props:{
      to:String,
    },
    render(h){
      return h('a',{
        attrs:{
          href:'#'+this.to 
        },
      },this.$slots.default)
    }
  })
  // 需要拿到routes，怎么拿？是挂载的时候才传进来的
  Vue.component('router-view',{
    // 获取动态hash（how？监听hashchange），获取routes，渲染routes中的组件
    render(h) {
      const {routeMap, current} = this.$router
      const component = routeMap[current] ? routeMap[current].component : null
      return h(component)
    }
  })
}

export default KVueRouter;