import DefaultLayout from '../../../layouts/DefaultLayout'
import React from 'react'
import ResetPasswordForm from '../ResetPasswordForm'

const ResetPasswordView = ({ history }) => (
  <DefaultLayout>{() => <ResetPasswordForm {...{ history }} />}</DefaultLayout>
)

export default ResetPasswordView
