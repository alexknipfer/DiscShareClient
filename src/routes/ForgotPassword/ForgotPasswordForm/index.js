import ForgotPasswordForm from './ForgotPasswordForm'
import SendResetPasswordEmailMutation from '../mutations/sendResetPasswordEmail'
import { graphql } from 'graphql'

export default graphql(SendResetPasswordEmailMutation, {
  props: ({ mutate }) => ({
    sendResetPasswordEmail: email => mutate({ variables: { email } })
  })
})(ForgotPasswordForm)
