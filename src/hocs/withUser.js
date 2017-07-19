import React, { Component } from 'react'

import GetUserProfile from '../queries/getUser'
import { LocalStorage } from '../utils/LocalStorage'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

export default ComposedComponent => {
  class withUser extends Component {
    static propTypes = {
      loading: PropTypes.bool,
      getUser: PropTypes.object
    }
    render() {
      return <ComposedComponent {...this.props} />
    }
  }
  return graphql(GetUserProfile, {
    props: ({ data: { loading, getUser } }) => ({
      loading,
      getUser
    }),
    options: { variables: { accesstoken: LocalStorage.loadToken() } }
  })(withUser)
}
