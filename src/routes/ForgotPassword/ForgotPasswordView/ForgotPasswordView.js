import React from 'react'
import { observer } from 'mobx-react'

import ForgotPasswordForm from '../ForgotPasswordForm'

const ForgotPasswordView = observer(({ history }) => (
  <ForgotPasswordForm {...{ history }} />
))

export default ForgotPasswordView
