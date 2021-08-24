/* @flow */

import { ASSET_TYPES } from 'shared/constants'
import { isPlainObject, validateComponentName } from '../util/index'

export function initAssetRegisters (Vue: GlobalAPI) {
  /**
   * Create asset registration methods.
   */
  // Vue.component()注册全局组件或者获取组件
  // 注册组件就是将组件保存到Vue.options.components中去
  // tips:组件的本质就是Vue的子类,是一个构造函数
  ASSET_TYPES.forEach(type => {
    Vue[type] = function (
      id: string, // id就是组件名
      definition: Function | Object // 组件的option或者是组件的构造函数
    ): Function | Object | void {
      if (!definition) {
       // 如果没有definition,就是获取组件操作,直接从options中获取组件就行
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        // 有definition,就是注册组件
        if (process.env.NODE_ENV !== 'production' && type === 'component') {
          validateComponentName(id)
        }
        // 如果definition是一个option对象,则调用Vue.extend({})继承Vue,创建一个新的子类
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id // 定义中添加组件名name字段
          definition = this.options._base.extend(definition)
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition }
        }
        this.options[type + 's'][id] = definition // 保存到option中,完成注册组件
        return definition
      }
    }
  })
}
