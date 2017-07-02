import axios from 'axios'

export class RestClient {
  static post(url, data) {
    axios.get(url).then(res => console.log(res.data))
  }
}
