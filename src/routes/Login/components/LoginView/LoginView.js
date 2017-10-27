import React, { Component } from 'react'

import DefaultLayout from '../../../../layouts/DefaultLayout'
import LoginForm from '../LoginForm'
import LoginFormValidator from '../../../../lib/Forms/FormValidation/Login'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'

@observer
class Login extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  render() {
    const { history } = this.props
    return (
      <DefaultLayout>
        {() => (
          <LoginForm
            detectValues={LoginFormValidator.detectValues}
            onSubmit={this.onSubmitForm}
            form={LoginFormValidator.form}
            onChange={LoginFormValidator.onFieldChange}
            history={history}
          />
        )}
      </DefaultLayout>
    )
  }
}

export default Login
