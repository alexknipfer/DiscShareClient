import React, { Component } from 'react'

import GetUserProfile from '../queries/getUser'
import { LocalStorage } from '../utils/LocalStorage'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

export default ComposedComponent => {
  @observer
  class withAuth extends Component {
    @observable auth = false

    static propTypes = {
      loading: PropTypes.bool,
      getUser: PropTypes.object
    }

    componentWillMount() {
      const token = LocalStorage.loadToken()
      if (token !== null) {
        this.auth = true
      }
    }

    render() {
      return <ComposedComponent auth={this.auth} {...this.props} />
    }
  }
  return graphql(GetUserProfile, {
    props: ({ data: { loading, getUser } }) => ({
      loading,
      getUser
    }),
    options: { variables: { accesstoken: LocalStorage.loadToken() } }
  })(withAuth)
}
