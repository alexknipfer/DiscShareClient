import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AuthorizedRoute from '../components/AuthorizedRoute/'
import DashboardMain from './DashboardMain'
import DiscsDashboard from './DiscsDashboard'
import EditAccount from './EditAccount'
import ForgotPassword from './ForgotPassword'
import Home from './Home'
import Login from './Login'
import React from 'react'
import Register from './Register'
import ResetPassword from './ResetPassword'
import Unauthorized from './Unauthorized'

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgotPassword" component={ForgotPassword} />
        <Route exact path="/resetPassword" component={ResetPassword} />
        <AuthorizedRoute exact path="/dashboard" component={DashboardMain} />
        <Route path="/discsdashboard" component={DiscsDashboard} />
        <AuthorizedRoute
          exact
          path="/editAccount/:id"
          component={EditAccount}
        />
        <Route path="/unauthorized" component={Unauthorized} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
