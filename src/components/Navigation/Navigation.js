import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { LocalStorage } from '../../utils/LocalStorage'
import { Menu } from 'semantic-ui-react'
import { Nav } from './styles'

class Navigation extends Component {
  logout = () => {
    LocalStorage.deleteToken()
    this.props.history.push('/login')
  }

  render() {
    return this.props.auth ? this.renderUserNav() : this.renderVisitorNav()
  }

  renderVisitorNav = () => {
    return (
      <Nav pointing inverted fixed="top">
        <Link to="/">
          <Menu.Item link>Home</Menu.Item>
        </Link>
        <Link to="/register">
          <Menu.Item link>Register</Menu.Item>
        </Link>
        <Link to="/login">
          <Menu.Item link>Login</Menu.Item>
        </Link>
      </Nav>
    )
  }

  renderUserNav = () => {
    return (
      <div>
        <Menu pointing inverted fixed="top">
          <Link to="/">
            <Menu.Item link>Home</Menu.Item>
          </Link>
          <Link to="/editAccount">
            <Menu.Item link>Edit Account</Menu.Item>
          </Link>
          <Menu.Item link onClick={this.logout}>
            Logout
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}

export default Navigation
