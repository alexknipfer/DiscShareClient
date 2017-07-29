import { GoogleApiWrapper } from 'google-maps-react'

export default Component => {
  return GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GMAPS_KEY,
    version: '3.28'
  })(Component)
}
