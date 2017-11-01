import React, { Component } from 'react'

import DefaultLayout from '../../../../layouts/DefaultLayout'
import PropTypes from 'prop-types'
import RegisterForm from '../RegisterForm'
import { observer } from 'mobx-react'

@observer
class Register extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  render() {
    const { history } = this.props
    return (
      <DefaultLayout>{() => <RegisterForm history={history} />}</DefaultLayout>
    )
  }
}

export default Register
