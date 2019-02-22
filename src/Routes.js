import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import Profile from './views/Profile'

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <Route component={Error} />
    </Switch>
  </main>
)

export default Routes
