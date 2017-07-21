import React, { Component } from 'react'

import GetUserProfile from '../queries/getUser'
import { Loader } from 'semantic-ui-react'
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
        ? <Loader active />
        : <ComposedComponent {...this.props} />
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
