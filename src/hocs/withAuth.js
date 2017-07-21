import React, { Component } from 'react'

import { LocalStorage } from '../utils/LocalStorage'

export default ComposedComponent => {
  return class withAuth extends Component {
    state = {
      auth: false,
      token: null
    }

    componentWillMount() {
      const token = LocalStorage.loadToken()
      if (token !== null) {
        this.setState({
          auth: true,
          token: token
        })
      }
    }

    render() {
      return (
        <ComposedComponent
          auth={this.state.auth}
          token={this.state.token}
          {...this.props}
        />
      )
    }
  }
}
