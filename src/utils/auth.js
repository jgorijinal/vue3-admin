import storage from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

// 获取 时间戳
export function getTimeStamp() {
  return storage.getItem(TIME_STAMP)
}

// 设置时间戳
export function setTimeStamp() {
  storage.setItem(TIME_STAMP, Date.now())
}

// 判断是否超时 true / false
export function isCheckTImeout() {
  // 当前时间
  const currentTime = Date.now()
  // 之前存的 时间戳
  const timeStamp = storage.getItem(TIME_STAMP)

  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
