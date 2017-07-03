import { RestClient } from '../clients/RestClient'

const post = (cmd, data) => RestClient.post(`/api/account/${cmd}`, data)

export class AccountApi {
  static createAccount(accountFields) {
    return post('register', accountFields)
  }
}
