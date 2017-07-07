import flowRight from 'lodash/flowRight'
import withAuth from './withAuth'
import withDefaultLayout from './withDefaultLayout'

export const pageWithDefaultLayout = flowRight(withDefaultLayout, withAuth)
