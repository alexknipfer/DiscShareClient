import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const httpUri = process.env.NODE_ENV
  ? process.env.REACT_APP_API
  : 'http://localhost:4000/graphql'

const client = new ApolloClient({
  link: new HttpLink({ uri: httpUri }),
  cache: new InMemoryCache()
})

export default client
