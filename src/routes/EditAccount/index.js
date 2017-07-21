import EditAccount from './EditAccount'
import React from 'react'
import { pageWithAuthAndUserData } from '../../hocs/page'

export default pageWithAuthAndUserData(props => <EditAccount {...props} />)
