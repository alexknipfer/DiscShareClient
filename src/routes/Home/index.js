import Home from './Home'
import React from 'react'
import { pageWithDefaultLayout } from '../../hocs/page'

export default pageWithDefaultLayout(({ auth }) => {
  if (auth) {
    return <Home />
  } else {
    return <h3>You are not authorized to view this page</h3>
  }
})
