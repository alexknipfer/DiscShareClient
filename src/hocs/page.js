import flowRight from 'lodash/flowRight'
import withAuth from './withAuth'
import withDefaultLayout from './withDefaultLayout'
import withUser from './withUser'

export const pageWithUser = flowRight(withAuth, withUser, withDefaultLayout)
