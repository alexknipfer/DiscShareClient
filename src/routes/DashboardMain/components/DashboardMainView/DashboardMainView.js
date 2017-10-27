import DashboardGrid from '../DashboardGrid'
import DefaultLayout from '../../../../layouts/DefaultLayout'
import React from 'react'

const DashboardMainView = () => {
  return (
    <DefaultLayout>{({ user }) => <DashboardGrid user={user} />}</DefaultLayout>
  )
}

export default DashboardMainView
