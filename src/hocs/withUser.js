import React, { Component } from 'react'

import { AccountApi } from '../lib/apis/AccountApi'
import { LocalStorage } from '../utils/LocalStorage'

export default ComposedComponent => {
  return class withUser extends Component {
    state = {
      user: {}
    }

    async componentDidMount() {
      const token = LocalStorage.loadToken()
      if (token !== undefined) {
        const user = await AccountApi.getUserData({ token })
        this.setState({
          user: user
        })
      }
    }

    render() {
      const { user } = this.state.user
      return <ComposedComponent user={user} {...this.props} />
    }
  }
}
