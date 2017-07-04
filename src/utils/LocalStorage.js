import Cookies from 'js-cookie'

export class LocalStorage {
  static saveToken(token, options) {
    if (typeof Storage !== 'undefined') {
      localStorage.setItem('jwtToken', token)
    } else {
      Cookies.set('accesstoken', token, options)
    }
  }
}
