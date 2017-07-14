export class LocalStorage {
  static saveToken(token) {
    localStorage.setItem('accesstoken', token)
  }
  static loadToken() {
    return localStorage.getItem('accesstoken')
  }
  static deleteToken() {
    return localStorage.removeItem('accesstoken')
  }
}
