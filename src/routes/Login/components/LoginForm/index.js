import LoginForm from './LoginForm'
import LoginMutation from '../mutations/login'
import { graphql } from 'react-apollo'

export default graphql(LoginMutation, {
  props: ({ mutate }) => ({
    login: (username, password) => mutate({ variables: { username, password } })
  })
})(LoginForm)
