import React, { Component } from 'react'

import Navigation from '../components/Navigation/Navigation'
import styled from 'styled-components'

export default ComposedComponent => {
  const Container = styled.div`
    padding: 50px;
    background-color: #c2dfe3;
    height: 100vh;
  `

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
