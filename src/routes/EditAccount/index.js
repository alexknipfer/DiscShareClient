import EditAccount from './EditAccount'
import { Loader } from 'semantic-ui-react'
import React from 'react'
import { pageWithUserData } from '../../hocs/page'

export default pageWithUserData(({ auth, user }) => {
  if (auth) {
    if (!user) {
      return <Loader active />
    } else {
      return <EditAccount user={user} />
    }
  } else {
    return <h3>You are not authorized to view this page</h3>
  }
})
