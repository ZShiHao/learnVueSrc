/* @flow */

import { toArray } from '../util/index'

export function initUse (Vue: GlobalAPI) {
 // Vue.use()的作用是注册插件
 // plugin是构造函数
  Vue.use = function (plugin: Function | Object) {
   // 创建_installedPlugins数组存放已经注册的插件
    const installedPlugins = (this._installedPlugins || (this._installedPlugins = []))// 直接创建一个空数组,存放安装过的插件
    // 如果存在这个插件了,直接返回Vue构造函数
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    // 将arguments从伪数组转换为数组,并将第一个参数除去
    const args = toArray(arguments, 1)
    // 将Vue放到数组的最前边
    args.unshift(this)
    if (typeof plugin.install === 'function') {
     // 将Vue作为参数传入install方法中
     // 插件必须有install方法
      plugin.install.apply(plugin, args)
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args)
    }
    // 将插件的构造函数放入数组中
    installedPlugins.push(plugin)
    return this
  }
}
