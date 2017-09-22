import React, { Component } from 'react'

import LoginForm from './components/LoginForm'
import LoginFormValidator from '../../lib/Forms/FormValidation/Login'
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
      <LoginForm
        detectValues={LoginFormValidator.detectValues}
        onSubmit={this.onSubmitForm}
        form={LoginFormValidator.form}
        onChange={LoginFormValidator.onFieldChange}
        history={history}
      />
    )
  }
}

export default Login
