import axios from 'axios'

const S3Uploader = {
  async uploadFile(file, signedRequest) {
    const options = {
      headers: {
        'Content-Type': file.type
      }
    }

    await axios.put(signedRequest, file, options)
  }
}

export default S3Uploader