import DefaultLayout from '../../../../layouts/DefaultLayout'
import EditAccountForm from '../EditAccountForm'
import React from 'react'

const EditAccountView = () => {
  return (
    <DefaultLayout>
      {({ user }) => <EditAccountForm user={user} />}
    </DefaultLayout>
  )
}

export default EditAccountView
