import { RestClient } from '../clients/RestClient'

const post = (cmd, data) => RestClient.post(`/api/account/${cmd}`, data)

export class AccountApi {
  static createAccount(data) {
    return post('register', data)
  }

  static loginWithUsername(data) {
    return post('loginWithUsername', data)
  }

  static getUserData(data) {
    return post('getUserData', data)
  }
}
