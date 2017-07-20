import EditAccount from './EditAccount'
import { Loader } from 'semantic-ui-react'
import React from 'react'
import { pageWithAuth } from '../../hocs/page'

export default pageWithAuth(({ getUser, loading }) => {
  if (loading) {
    return <Loader active />
  } else {
    return <EditAccount user={getUser} />
  }
})
