import axios from 'axios'

export class RestClient {
  static post(url, data) {
    axios.post(url, data).then(res => console.log(res.data))
  }
}
