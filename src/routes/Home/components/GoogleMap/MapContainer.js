import React, { Component } from 'react'

import { Loader } from 'semantic-ui-react'
import MapComponent from './MapComponent'
import styled from 'styled-components'

const MapContainer = styled.div`
  height: : 500px;
  width: 500px;
`

class GoogleMap extends Component {
  render() {
    return !this.props.loaded ? this.renderLoader() : this.renderContent()
  }

  renderLoader = () => {
    return <Loader active />
  }

  renderContent = () => {
    const { google } = this.props
    return (
      <MapContainer>
        <MapComponent google={google} />
      </MapContainer>
    )
  }
}

export default GoogleMap
