import DefaultLayout from '../../../layouts/DefaultLayout'
import ForgotPasswordForm from '../ForgotPasswordForm'
import React from 'react'
import { observer } from 'mobx-react'

const ForgotPasswordView = observer(({ history }) => {
  return (
    <DefaultLayout>
      {() => <ForgotPasswordForm history={history} />}
    </DefaultLayout>
  )
})

export default ForgotPasswordView
