import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'
import React, { Component } from 'react'

import Navigation from '../components/Navigation/Navigation'
import styled from 'styled-components'

export default ComposedComponent => {
  const Container = styled.div`padding-top: 50px;`

  const client = new ApolloClient({
    networkInterface: createNetworkInterface({
      uri: 'http://localhost:4000/graphql'
    })
  })

  return class withDefaultLayout extends Component {
    render() {
      return (
        <ApolloProvider client={client}>
          <Container>
            <Navigation {...this.props} />
            <ComposedComponent {...this.props} />
          </Container>
        </ApolloProvider>
      )
    }
  }
}
