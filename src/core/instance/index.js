import { initMixin } from './init'
import { stateMixin } from './state'
import { renderMixin } from './render'
import { eventsMixin } from './events'
import { lifecycleMixin } from './lifecycle'
import { warn } from '../util/index'

// vue实例的入口文件
// 向Vue原型对象上挂载属性和方法

// Vue的构造函数
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue) // 判断是否是通过new调用构造函数
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options) // 执行生命周期初始化流程
}

// 传入构造函数,分别调用这5个函数,作用是向Vue原型中挂载方法
// 挂载_init()方法
initMixin(Vue)

// 向Vue原型中挂载数据相关的3个方法:$watch,$set,$delete
// 和两个访问器属性,$data,$props
// Vue.prototype.$data=function(){return this._data}
// Vue.prototype.$props=function(){return this._props}
// Vue.prototype.$set=set
// Vue.prototype.$del=del
// Vue.prototype.$watch=function(){}
stateMixin(Vue)

// 挂载事件相关的四个方法
// Vue.prototype.$on=function(){}
// Vue.prototype.$once=function(){}
// Vue.prototype.$off=function(){}
// Vue.prototype.$emit=function(){}
eventsMixin(Vue)

// 挂载声明周期相关的三个方法
// Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {}
// Vue.prototype.$forceUpdate = function () {}
// Vue.prototype.$destroy = function () {}
lifecycleMixin(Vue)

// 挂载渲染相关的方法
renderMixin(Vue)
// Vue.prototype.$nextTick = function (fn: Function) {}
// Vue.prototype._render = function (): VNode {}
// Vue.prototype._s = _toString
// Vue.prototype._v = createTextVNode
// Vue.prototype._n = toNumber
// Vue.prototype._e = createEmptyVNode
// Vue.prototype._q = looseEqual
// Vue.prototype._i = looseIndexOf
// Vue.prototype._m = function(){}
// Vue.prototype._o = function(){}
// Vue.prototype._f = function resolveFilter (id) {}
// Vue.prototype._l = function(){}
// Vue.prototype._t = function(){}
// Vue.prototype._b = function(){}
// Vue.prototype._k = function(){}

export default Vue

