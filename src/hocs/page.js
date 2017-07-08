import flowRight from 'lodash/flowRight'
import withAuth from './withAuth'
import withDefaultLayout from './withDefaultLayout'
import withUser from './withUser'

export const pageWithDefaultLayout = flowRight(withAuth, withDefaultLayout)

export const pageWithUserData = flowRight(withAuth, withUser, withDefaultLayout)
