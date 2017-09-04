import React, { Component } from 'react'

import LocationStore from '../../../../stores/LocationStore'
import ReactDOM from 'react-dom'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const MapContainer = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 200px;
`

@observer
class MapComponent extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (prevProps !== this.props.google) {
      this.loadMap()
    }
  }

  componentDidMount() {
    this.loadMap()
  }

  loadMap = () => {
    const { currentSelectedLocation } = LocationStore
    const { location } = currentSelectedLocation

    if (this.props && this.props.google) {
      const { google } = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      let zoom = 14
      let lat = location.lat
      let lng = location.lng
      const center = new maps.LatLng(lat, lng)
      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom
        }
      )
      this.map = new maps.Map(node, mapConfig)
    }
  }

  render() {
    return <MapContainer ref="map" />
  }
}

export default MapComponent
