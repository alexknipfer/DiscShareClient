import RegisterForm from './RegisterForm'
import RegisterMutation from '../../mutations/register'
import { graphql } from 'react-apollo'

export default graphql(RegisterMutation, {
  props: ({ mutate }) => ({
    register: (email, username, password) =>
      mutate({ variables: { email, username, password } })
  })
})(RegisterForm)
