import { action, observable } from 'mobx'

class LocationStore {
  @observable
  selectedLocation = { location: { lat: 37.774929, lng: -122.419416 } }

  @action
  setLocation = location => {
    this.selectedLocation = { ...this.selectedLocation, location }
    console.log('SELECTED LOCATION: ', this.selectedLocation)
  }

  get currentSelectedLocation() {
    return this.selectedLocation
  }
}

export default new LocationStore()
