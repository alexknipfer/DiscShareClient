import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import App from './routes/index'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import React from 'react'
import ReactDOM from 'react-dom'
import { WebSocketLink } from 'apollo-link-ws'
import { getOperationAST } from 'graphql'
import { injectGlobal } from 'styled-components'
import registerServiceWorker from './registerServiceWorker'

const httpUri =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API
    : 'http://localhost:4000/graphql'

const wsUri = 'ws://localhost:4000/subscriptions'

const link = ApolloLink.split(
  operation => {
    const operationAST = getOperationAST(
      operation.query,
      operation.operationName
    )
    return !!operationAST && operationAST.operation === 'subscription'
  },
  new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true
    }
  }),
  new HttpLink({ uri: httpUri })
)

const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
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
