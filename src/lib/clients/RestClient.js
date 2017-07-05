import axios from 'axios'

export class RestClient {
  static async post(url, data) {
    try {
      const result = await axios.post(url, data)
      return result.data
    } catch (error) {
      return error.response.data
    }
  }
}
