import React, { Component } from 'react'

import Navigation from '../components/Navigation/Navigation'
import styled from 'styled-components'

export default ComposedComponent => {
  const Container = styled.div`
    padding: 50px;
    background-color: #c2dfe3;
    height: 100vh;
  `

  const isMobile = () => {
    return (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i)
    )
  }

  return class withDefaultLayout extends Component {
    render() {
      const mobileBrowser = isMobile()
      return (
        <Container>
          <Navigation isMobile={mobileBrowser} {...this.props} />
          <ComposedComponent {...this.props} />
        </Container>
      )
    }
  }
}
