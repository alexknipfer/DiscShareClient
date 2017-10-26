import CenteredLoader from '../../components/CenteredLoader'
import GetUserProfile from '../../queries/getUser'
import { LocalStorage } from '../../utils/LocalStorage'
import Navigation from '../../components/Navigation'
import React from 'react'
import { graphql } from 'react-apollo'

const DefaultLayout = props => {
  const { children, loading, user } = props

  if (loading) return <CenteredLoader />
  else {
    return (
      <div>
        <Navigation {...props} />
        {children}
      </div>
    )
  }
}

export default graphql(GetUserProfile, {
  props: ({ data: { loading, getUser } }) => ({
    loading,
    user: getUser
  }),
  options: () => ({ variables: { accesstoken: LocalStorage.loadToken() } })
})(DefaultLayout)
