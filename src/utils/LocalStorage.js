import Cookies from 'js-cookie'

export class LocalStorage {
  static saveToken(token, options) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('accesstoken', token)
    } else {
      Cookies.set('accesstoken', token, options)
    }
  }
  static get loadToken() {
    if (typeof Storage !== 'undefined') {
      localStorage.getItem('accesstoken')
    } else {
      return Cookies.get('accesstoken')
    }
  }
}
