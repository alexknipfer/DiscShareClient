import React, { Component } from 'react'

import Navigation from '../components/Navigation'
import styled from 'styled-components'

export default ComposedComponent => {
  const Container = styled.div`padding-top: 50px;`

  return class withDefaultLayout extends Component {
    render() {
      return (
        <Container>
          <Navigation {...this.props} />
          <ComposedComponent {...this.props} />
        </Container>
      )
    }
  }
}
