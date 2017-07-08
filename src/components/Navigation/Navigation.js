import React, { Component } from 'react'

import { Link } from 'react-router-dom'
import { LocalStorage } from '../../utils/LocalStorage'
import { Menu } from 'semantic-ui-react'
import { Redirect } from 'react-router'

class Navigation extends Component {
  state = {
    toggleRedirect: false
  }

  logout = () => {
    LocalStorage.deleteToken()
    this.setState({ toggleRedirect: !this.state.toggleRedirect })
  }

  render() {
    return this.props.auth ? this.renderUserNav() : this.renderVisitorNav()
  }

  renderVisitorNav = () => {
    return (
      <div>
        <Menu pointing inverted fixed="top" className="nav-main">
          <Link to="/">
            <Menu.Item link className="nav-links">
              Home
            </Menu.Item>
          </Link>
          <Link to="/register">
            <Menu.Item link className="nav-links">
              Register
            </Menu.Item>
          </Link>
          <Link to="/login">
            <Menu.Item link className="nav-links">
              Login
            </Menu.Item>
          </Link>
        </Menu>
      </div>
    )
  }

  renderUserNav = () => {
    return (
      <div>
        <Menu pointing inverted fixed="top" className="nav-main">
          <Link to="/">
            <Menu.Item link className="nav-links">
              Home
            </Menu.Item>
          </Link>
          <Link to="/editAccount">
            <Menu.Item link className="nav-links">
              Edit Account
            </Menu.Item>
          </Link>
          <Menu.Item link className="nav-links" onClick={this.logout}>
            Logout
          </Menu.Item>
        </Menu>
        {this.state.toggleRedirect && <Redirect path to="/login" />}
      </div>
    )
  }
}

export default Navigation
