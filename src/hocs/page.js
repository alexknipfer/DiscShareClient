import flowRight from 'lodash/flowRight'
import withAuth from './withAuth'
import withDefaultLayout from './withDefaultLayout'
import withUser from './withUser'

export const pageWithDefaultLayout = flowRight(withDefaultLayout)

export const pageWithAuth = flowRight(withDefaultLayout, withAuth)

export const pageWithAuthAndUserData = flowRight(
  withDefaultLayout,
  withAuth,
  withUser
)
