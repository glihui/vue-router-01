// 安装这个插件， 这个插件应该依赖于Vue
import RouterView from "./components/view";
import RouterLink from "./components/link";

export let _Vue;
export default function install(Vue) { // Vue就是vue的构造函数， 外部Vue.use调用install时，会传入
   _Vue = Vue;
   // Vue,mixin 主要做了一件事：在所有组件上都增加了 _routerRoot 属性 
   // 通过Vue.mixin全局注入。 因为父子组件加载顺序是:父-beforeCreate => 子beforeCreate
   Vue.mixin({
     beforeCreate() {
         console.log(this.$options.name)
         if (this.$options.router) {  // 一开始只有根组件有router（main.js)
             this._routerRoot = this;
             this._router = this.$options.router;

            //  init()
            this._router.init(this) //初始化方法
            // 响应式数据变化 只要_route 变化 就会更新视图
            Vue.util.defineReactive(this, '_route', this._router.history.current);
         } else {
             // 获取父组件的_routerRoot,然后赋值给自己
             this._routerRoot = this.$parent && this.$parent._routerRoot;
         }
     }  
   })

   Object.defineProperty(Vue.prototype, '$route', {
       get() {
           return this._routerRoot._route
       }
   })
   Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router
        }
   })

   Vue.component('RouterView', RouterView)
}