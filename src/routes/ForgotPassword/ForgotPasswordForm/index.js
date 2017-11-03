import ForgotPasswordForm from './ForgotPasswordForm'
import SendResetPasswordEmailMutation from '../mutations/sendResetPasswordEmail'
import { graphql } from 'react-apollo'

export default graphql(SendResetPasswordEmailMutation, {
  props: ({ mutate }) => ({
    sendResetPasswordEmail: email => mutate({ variables: { email } })
  })
})(ForgotPasswordForm)
