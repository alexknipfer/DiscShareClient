import React, { Component } from 'react'

import CenteredLoader from '../components/Loader/CenteredLoader'
import GetUserProfile from '../queries/getUser'
import PropTypes from 'prop-types'
import { graphql } from 'react-apollo'

export default ComposedComponent => {
  class withUser extends Component {
    static propTypes = {
      loading: PropTypes.bool,
      getUser: PropTypes.object
    }
    render() {
      return this.props.loading
        ? <CenteredLoader active={this.props.loading} />
        : <ComposedComponent getUser={this.props.getUser} />
    }
  }
  return graphql(GetUserProfile, {
    props: ({ data: { loading, getUser } }) => ({
      loading,
      getUser
    }),
    options: ({ token }) => ({ variables: { accesstoken: token } })
  })(withUser)
}
