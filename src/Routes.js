import React from 'react'
import { Switch, Route } from 'react-router-dom'

import PrivateRoute from './components/PrivateRoute'
import Home from './views/Home'
import Login from './views/Login'
import Signup from './views/Signup'
import Profile from './views/Profile'
import ProductDetails from './views/ProductDetails'
import ProductList from './views/ProducList'
import Cart from './views/Cart'
import Checkout from './views/Checkout'
import CheckoutSuccess from './components/CheckoutSuccess'
import Error404 from './components/Error404'

const Routes = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/product/:idProduct" component={ProductDetails} />
      <Route exact path="/category/:idCategory" component={ProductList} />
      <Route exact path="/cart" component={Cart} />
      <PrivateRoute exact path="/profile" component={Profile} />
      <PrivateRoute exact path="/checkout" component={Checkout} />
      <PrivateRoute exact path="/checkout-success" component={CheckoutSuccess} />
      <Route component={Error404} />
    </Switch>
  </main>
)

export default Routes
