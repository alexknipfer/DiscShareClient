import { BrowserRouter, Route, Switch } from 'react-router-dom'

import EditAccount from './EditAccount'
import Home from './Home'
import Login from './Login'
import React from 'react'
import Register from './Register'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/editAccount" component={EditAccount} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
