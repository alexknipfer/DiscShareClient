import React, { Component } from 'react'

import { Loader } from 'semantic-ui-react'

class GoogleMap extends Component {
  render() {
    return !this.props.loaded ? this.renderLoader() : this.renderContent()
  }

  renderLoader = () => {
    return <Loader active />
  }

  renderContent = () => {
    return (
      <div>
        <h3>Map</h3>
      </div>
    )
  }
}

export default GoogleMap
