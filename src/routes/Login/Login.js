import React, { Component } from 'react'

import LoginForm from './components/LoginForm'
import LoginStore from '../../stores/LoginStore'
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
        detectValues={LoginStore.detectValues}
        onSubmit={this.onSubmitForm}
        form={LoginStore.form}
        onChange={LoginStore.onFieldChange}
        history={history}
      />
    )
  }
}

export default Login
