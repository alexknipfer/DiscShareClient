import React, { Component } from 'react'

import PropTypes from 'prop-types'
import RegisterForm from './components/RegisterForm'
import RegisterStore from '../../stores/RegisterStore'
import { observer } from 'mobx-react'

@observer
class Register extends Component {
  static propTypes = {
    history: PropTypes.object
  }

  render() {
    const { history } = this.props
    return (
      <RegisterForm
        detectValues={RegisterStore.detectValues}
        form={RegisterStore.form}
        onChange={RegisterStore.onFieldChange}
        history={history}
      />
    )
  }
}

export default Register
