import {
  ApolloClient,
  ApolloProvider,
  createNetworkInterface
} from 'react-apollo'

import App from './routes/index'
import React from 'react'
import ReactDOM from 'react-dom'
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://localhost:4000/graphql'
  })
})

// eslint-disable-next-line
injectGlobal`
  body {
    background-color: #353D45;
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
