import React, { Component } from 'react'

import Navigation from '../components/Navigation/Navigation'

export default ComposedComponent => {
  return class withDefaultLayout extends Component {
    render() {
      return (
        <div>
          <Navigation />
          <ComposedComponent />
        </div>
      )
    }
  }
}
