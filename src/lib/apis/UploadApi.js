import { RestClient } from '../clients/RestClient'

const post = (cmd, data) => {
  if (process.env.NODE_ENV === 'production') {
    return RestClient.post(
      `${process.env.REACT_APP_API}/api/upload/${cmd}`,
      data
    )
  } else {
    return RestClient.post(`/api/upload/${cmd}`, data)
  }
}

export class UploadApi {
  static uploadProfileImage(data) {
    console.log('DATA: ', data)
    return post('uploadProfileImage', data)
  }
}
