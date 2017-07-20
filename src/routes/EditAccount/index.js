import EditAccount from './EditAccount'
import { Loader } from 'semantic-ui-react'
import React from 'react'
import { pageWithUserData } from '../../hocs/page'

export default pageWithUserData(({ getUser, loading }) => {
  if (loading) {
    return <Loader active />
  } else {
    return <EditAccount user={getUser} />
  }
})
