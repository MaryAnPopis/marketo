import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styled from 'styled-components'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import colors from '../style/colors'
import Label from '../components/Label'
import Loader from '../components/Loader'
import Input from '../components/Input'
import Menu from '../components/Menu'
import Button from '../components/Button'
import { emailRegex, formValid } from '../utils/formVerification'
import { post, saveLocalStorage } from '../services'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
})

const checkErrors = (formErrors, name, value) => {
  switch (name) {
    case 'password':
      formErrors.password = value.length < 6 ? 'minimum 6 charachaters required' : ''
      break
    case 'email':
      formErrors.email = emailRegex.test(value) && value.length > 0 ? '' : 'invalid email address'
      break
    default:
      break
  }
}

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      formErrors: {
        email: '',
        password: '',
      },
      redirect: false,
      fetchInProgress: false,
    }
  }

  handldeChange(e) {
    let formErrors = this.state.formErrors
    const { name, value } = e.target
    checkErrors(this.state.formErrors, name, value)
    this.setState({ formErrors, [name]: value })
  }

  handleSubmit(event) {
    // prevent the form submmiting on its own
    event.preventDefault()
    this.setState({
      fetchInProgress: true,
    })
    const emailUnder = this.state.email

    const data = {
      email: emailUnder.toLowerCase(),
      password: this.state.password,
    }

    if (formValid(this.state)) {
      post('user/login', data)
        .then(data => {
          const isValid = 'valid'
          if (data.hasOwnProperty(isValid)) {
            saveLocalStorage({ token: data.token, isLogged: false }, 'user') // Save the token to local storage
            // The user credentials are incorrect
            toast.error(data.message, {
              position: 'bottom-right',
              autoClose: 5000,
            })
          } else {
            saveLocalStorage({ data, isLogged: true }, 'user') // Save the token to local storage
            this.setState({ redirect: true })
          }
        })
        .catch(err => {
          // The user doesn't exist
          toast.error('The email or password is invalid', {
            position: 'bottom-right',
            autoClose: 5000,
          })
          this.setState({
            fetchInProgress: false,
          })
          console.log(err.status)
        })
    } else {
      this.setState({
        fetchInProgress: false,
      })
      toast.error('The email or password is invalid', {
        position: 'bottom-right',
        autoClose: 5000,
      })
    }
  }

  render() {
    const { classes } = this.props
    return (
      <main>
        {this.state.redirect ? (
          <Redirect to={`/profile`} />
        ) : (
          this.state.fetchInProgress && <Loader />
        )}
        <Menu />
        <ToastContainer />
        <Grid container className={classes.main}>
          <Style.Main>
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="mb-2">
                <Typography align="center" variant="h6">
                  Login
                </Typography>
                <Typography align="center" variant="subtitle1">
                  Don't have an account?{' '}
                  <Link to="/signup" className="primary-color">
                    Sign up
                  </Link>
                </Typography>
              </div>
              <div className="mb-2">
                <Label name="EMAIL *" for="email" />
                <Input
                  id="email"
                  type="text"
                  placeholder="jon@doe.com"
                  value={this.state.email}
                  name="email"
                  onChange={e => this.handldeChange(e)}
                />
                {this.state.formErrors.email.length > 0 && (
                  <small className="form-text text-danger ">{this.state.formErrors.email}</small>
                )}
              </div>
              <div className="mb-2">
                <Label name="PASSWORD *" for="password" />
                <Input
                  id="password"
                  type="password"
                  placeholder="*******"
                  value={this.state.password}
                  name="password"
                  onChange={e => this.handldeChange(e)}
                />
                {this.state.formErrors.password.length > 0 && (
                  <small className="form-text text-danger ">{this.state.formErrors.password}</small>
                )}
              </div>
              <Button name="Log in" size="100%" />
            </form>
          </Style.Main>
        </Grid>
      </main>
    )
  }
}

export default withStyles(styles)(Login)

const Style = {}

Style.Main = styled.div`
  background-color: ${colors.white};
  padding: 2rem 3rem;
`
