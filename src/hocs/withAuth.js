import React, { Component } from 'react'

import { LocalStorage } from '../utils/LocalStorage'

let auth = { loggedIn: false }

export default ComposedComponent => {
  return class withAuth extends Component {
    componentWillMount() {
      const token = LocalStorage.loadToken()
      if (token !== null) {
        auth.loggedIn = true
      }
    }

    render() {
      return <ComposedComponent auth={auth.loggedIn} />
    }
  }
}
