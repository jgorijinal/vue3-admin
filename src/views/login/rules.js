import i18n from '@/i18n'
export function validatePassword(rules, value, callback) {
  value.length < 6 ? callback(new Error(i18n.global.t('msg.login.passwordRule'))) : callback()
}
