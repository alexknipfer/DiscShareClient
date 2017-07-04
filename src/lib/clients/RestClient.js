import axios from 'axios'

export class RestClient {
  static post(url, data) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, data)
        .then(result => {
          //console.log(result.data)
          resolve(result.data)
        })
        .catch(error => {
          //console.log(error.response.data)
          reject(error.response.data)
        })
    })
  }
}
