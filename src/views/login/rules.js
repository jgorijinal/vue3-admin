export function validatePassword(rules, value, callback) {
  value.length < 6 ? callback(new Error('密码不能小于6位')) : callback()
}
