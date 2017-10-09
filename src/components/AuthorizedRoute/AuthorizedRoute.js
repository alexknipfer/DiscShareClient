import { Redirect, Route } from 'react-router-dom'

import { LocalStorage } from '../../utils/LocalStorage'
import PropTypes from 'prop-types'
import React from 'react'

const propTypes = {
  component: PropTypes.func,
  location: PropTypes.object
}

const AuthorizedRoute = ({ component: Component, ...rest }) => {
  const auth = LocalStorage.loadToken()
  return (
    <Route
      {...rest}
      render={props =>
        auth !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/unauthorized',
              state: { from: props.location }
            }}
          />
        )}
    />
  )
}

AuthorizedRoute.propTypes = propTypes

export default AuthorizedRoute
