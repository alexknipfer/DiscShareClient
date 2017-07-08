import React, { Component } from 'react'

class EditAccount extends Component {
  render() {
    const { user } = this.props
    console.log(user.username)
    return (
      <div>
        <h3>Edit Account</h3>
      </div>
    )
  }
}

export default EditAccount
