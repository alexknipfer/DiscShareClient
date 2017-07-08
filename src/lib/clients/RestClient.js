import axios from 'axios'

export class RestClient {
  static async post(url, data) {
    try {
      const result = await axios.post(url, data)
      console.log('RESULT: ', result.data)
      return result.data
    } catch (error) {
      throw new Error(error.response.data)
    }
  }
}
