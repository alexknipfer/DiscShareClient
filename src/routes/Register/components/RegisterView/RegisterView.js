import React, { Component } from 'react'

import DefaultLayout from '../../../../layouts/DefaultLayout'
import PropTypes from 'prop-types'
import RegisterForm from '../RegisterForm'
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
      <DefaultLayout>
        {() => (
          <RegisterForm
            detectValues={RegisterStore.detectValues}
            form={RegisterStore.form}
            onChange={RegisterStore.onFieldChange}
            history={history}
          />
        )}
      </DefaultLayout>
    )
  }
}

export default Register
