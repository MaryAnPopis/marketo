import React from 'react'
import { Route, Redirect } from 'react-router-dom'

import { loadLocalStorage } from '../services'

function validateSession() {
  const session = loadLocalStorage('user')
  let validate = false

  if (typeof session.isLogged == false) {
    validate = false
  } else {
    if (session !== null) {
      if (session.isLogged === true) {
        validate = true
      }
    }
  }

  return validate
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        validateSession() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  )
}

export default PrivateRoute
