import EditAccount from './EditAccount'
import React from 'react'
import { pageWithUser } from '../../hocs/page'

export default pageWithUser(props => <EditAccount {...props} />)
