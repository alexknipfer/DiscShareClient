import EditAccount from './EditAccount'
import React from 'react'
import { pageWithUserData } from '../../hocs/page'

export default pageWithUserData(({ auth, user }) => {
  if (auth) {
    console.log('USER: ', user)
    return <EditAccount user={user} />
  } else {
    return <h3>You are not authorized to view this page</h3>
  }
})
