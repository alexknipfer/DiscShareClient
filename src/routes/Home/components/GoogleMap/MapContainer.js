import React, { Component } from 'react'

import { Loader } from 'semantic-ui-react'
import MapComponent from './MapComponent'

class GoogleMap extends Component {
  render() {
    return !this.props.loaded ? this.renderLoader() : this.renderContent()
  }

  renderLoader = () => {
    return <Loader active />
  }

  renderContent = () => {
    const { google } = this.props
    return <MapComponent google={google} />
  }
}

export default GoogleMap
