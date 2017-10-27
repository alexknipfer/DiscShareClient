import DefaultLayout from '../../../../layouts/DefaultLayout'
import React from 'react'
import UnauthorizedCard from '../UnauthorizedCard'

const UnauthorizedView = props => {
  return <DefaultLayout>{() => <UnauthorizedCard {...props} />}</DefaultLayout>
}

export default UnauthorizedView
