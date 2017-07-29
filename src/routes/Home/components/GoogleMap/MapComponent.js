import React, { Component } from 'react'

import { Loader } from 'semantic-ui-react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const MapContainer = styled.div`
  margin-top: 40px;
  width: 800px;
  height: 200px;
`

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
    if (this.props && this.props.google) {
      const { google } = this.props
      const maps = google.maps

      const mapRef = this.refs.map
      const node = ReactDOM.findDOMNode(mapRef)

      let zoom = 14
      let lat = 37.774929
      let lng = -122.419416
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
    return (
      <MapContainer ref="map">
        <Loader active />
      </MapContainer>
    )
  }
}

export default MapComponent
