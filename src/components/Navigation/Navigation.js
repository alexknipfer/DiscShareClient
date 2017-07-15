import { Icon, Menu } from 'semantic-ui-react'
import React, { Component } from 'react'
import { action, observable } from 'mobx'

import { Link } from 'react-router-dom'
import { LocalStorage } from '../../utils/LocalStorage'
import MenuOverlay from '../MenuOverlay/MenuOverlay'
import { Nav } from './styles'
import { observer } from 'mobx-react'
import styled from 'styled-components'

const MobileMenuItem = styled(Menu.Item)`
  @media (min-width: 700px) {
    display: none !important;
  }
`

@observer
class Navigation extends Component {
  @observable showMenu = false

  logout = () => {
    LocalStorage.deleteToken()
    this.props.history.push('/login')
  }

  @action
  triggerMenu = () => {
    this.showMenu = !this.showMenu
  }

  render() {
    return this.props.auth ? this.renderUserNav() : this.renderVisitorNav()
  }

  renderVisitorNav = () => {
    return (
      <div>
        <MenuOverlay open={this.showMenu} triggerClose={this.triggerMenu} />
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
          <MobileMenuItem link position="right" onClick={this.triggerMenu}>
            <Icon name="bars" />
          </MobileMenuItem>
        </Nav>
      </div>
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
