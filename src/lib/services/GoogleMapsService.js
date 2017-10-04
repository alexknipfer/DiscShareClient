const loadGoogleMapsScript = () => {
  return new Promise(resolve => {
    const scriptId = 'google-maps'
    const scriptExists = document.getElementById(scriptId)

    if (!scriptExists) {
      const src = `//maps.googleapis.com/maps/api/js?key=${process.env
        .REACT_APP_GMAPS_API_KEY}&libraries=places`

      const script = document.createElement('script')
      script.src = src
      script.id = scriptId

      script.onload = () => {
        resolve()
      }

      document.head.appendChild(script)
    } else {
      resolve()
    }
  })
}

export default class GoogleMapsService {
  static mount() {
    return loadGoogleMapsScript()
  }
}
