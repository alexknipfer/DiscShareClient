import React, { Component } from 'react'

import DefaultLayout from '../../../../layouts/DefaultLayout'
import LoginForm from '../LoginForm'
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
      <DefaultLayout>{() => <LoginForm history={history} />}</DefaultLayout>
    )
  }
}

export default Login
