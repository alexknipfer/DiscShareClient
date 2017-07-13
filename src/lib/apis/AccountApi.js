import { RestClient } from '../clients/RestClient'

const post = (cmd, data) => {
  if (process.env.NODE_ENV !== 'production') {
    return RestClient.post(`/api/account/${cmd}`, data)
  } else {
    return RestClient.post(
      `${process.env.REACT_APP_API}/api/account/${cmd}`,
      data
    )
  }
}

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

  static editAccount(data) {
    return post('editAccount', data)
  }
}
