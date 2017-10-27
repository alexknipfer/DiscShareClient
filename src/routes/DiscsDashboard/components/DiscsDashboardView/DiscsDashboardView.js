import DefaultLayout from '../../../../layouts/DefaultLayout'
import DiscsDashboardGrid from '../DiscsDashboardGrid'
import React from 'react'

const DiscsDashboardView = props => {
  return (
    <DefaultLayout>{() => <DiscsDashboardGrid {...props} />}</DefaultLayout>
  )
}

export default DiscsDashboardView
