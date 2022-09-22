import store from '@/store'
function checkPermission(el, bindings) {
  // 获取绑定的值，此处为权限
  const arr = bindings.value // v-permission="['editor',''....]" 传入的必须是数组
  // 获取所有的功能指令
  const points = store.getters.userInfo.permission.points

  if (arr && arr instanceof Array) {
    // 如果是数组
    // 匹配对应的指令
    const hasPermission = points.some((item) => {
      return arr.includes(item)
    })
    // 如果无法匹配，则表示当前用户无该指令，那么删除对应的功能按钮
    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  } else {
    // eslint-disabled-next-line
    throw new Error('v-permission value is ["admin","editor"]')
  }
}
export default {
  mounted(el, bindings) {
    checkPermission(el, bindings)
  },
  updated(el, bindings) {
    checkPermission(el, bindings)
  }
}
