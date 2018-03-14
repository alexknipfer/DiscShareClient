import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter } from 'react-router-dom'
import { injectGlobal } from 'styled-components'

import client from '../../utils/apollo'
import Routes from '../../routes'

// eslint-disable-next-line
injectGlobal`
  body {
    background-color: #353D45;
    margin-left: 10px;
    margin-right: 10px;
  }
`

const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ApolloProvider>
)
