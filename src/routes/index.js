import '../sass/root.css'

import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Home from './Home'
import Login from './Register'
import React from 'react'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
