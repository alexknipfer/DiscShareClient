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
    uri:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_API
        : 'http://localhost:4000/graphql'
  })
})

// eslint-disable-next-line
injectGlobal`
  body {
    background-color: #353D45;
    margin-left: 10px;
    margin-right: 10px;
  }
`

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
registerServiceWorker()
