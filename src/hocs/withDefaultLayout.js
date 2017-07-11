import React, { Component } from 'react'

import Navigation from '../components/Navigation/Navigation'

export default ComposedComponent => {
  return class withDefaultLayout extends Component {
    render() {
      console.log(this.props)
      return (
        <div>
          <Navigation {...this.props} />
          <ComposedComponent {...this.props} />
        </div>
      )
    }
  }
}
