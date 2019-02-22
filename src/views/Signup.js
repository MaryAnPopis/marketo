import React, { Component } from 'react'
import styled from 'styled-components'
import { Redirect, Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import colors from '../style/colors'
import Label from '../components/Label'
import Input from '../components/Input'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { post } from '../services'
import Loader from '../components/Loader'
import { emailRegex, formValid } from '../utils/formVerification'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import withStyles from '@material-ui/core/styles/withStyles'

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
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

const checkErrors = (formErrors, name, value) => {
  switch (name) {
    case 'firstName':
      formErrors.firstName = value.length > 0 ? '' : 'you need to type in a name'
      break
    case 'lastName':
      formErrors.lastName = value.length > 0 ? '' : 'you need to type in a last name'
      break
    case 'address':
      formErrors.address = value.length > 0 ? '' : 'you need to type in an address'
      break
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

export class Signup extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      password: '',
      formErrors: {
        firstName: '',
        lastName: '',
        address: '',
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
    const data = {
      name: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      isAdmin: false,
    }

    if (formValid(this.state)) {
      post('user/signup', data)
        .then(data => {
          this.setState({ redirect: true })
        })
        .catch(err => {
          throw err
        })
    } else {
      this.setState({
        fetchInProgress: false,
      })
      toast.error('There is an error in your form!', {
        position: 'bottom-right',
        autoClose: 5000,
      })
    }
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        {this.state.redirect ? (
          <Redirect to={`/login`} />
        ) : (
          this.state.fetchInProgress && <Loader />
        )}
        <main>
          <ToastContainer />
          <Menu />
          <Grid container className={classes.main}>
            <Style.Main>
              <div className="mb-2">
                <Typography align="center" variant="h6">
                  Sign Up
                </Typography>
                <Typography align="center" variant="subtitle1">
                  Already have an account?{' '}
                  <Link to="/login" className="primary-color">
                    Login
                  </Link>
                </Typography>
              </div>
              <form onSubmit={e => this.handleSubmit(e)}>
                <div className="mb-2">
                  <Label name="NAME *" htmlFor="firstName" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Jon"
                    value={this.state.firstName}
                    name="firstName"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.firstName.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.firstName}
                    </small>
                  )}
                </div>
                <div className="mb-2">
                  <Label name="LAST NAME *" htmlFor="lastName" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    value={this.state.lastName}
                    name="lastName"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.lastName.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.lastName}
                    </small>
                  )}
                </div>
                <div className="mb-2">
                  <Label name="EMAIL *" htmlFor="email" />
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
                  <Label name="ADDRESS *" htmlFor="address" />
                  <Input
                    id="address"
                    type="text"
                    placeholder="70 Albany St.
                  Wellington, FL 33414"
                    value={this.state.address}
                    name="address"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.address.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.address}
                    </small>
                  )}
                </div>
                <div className="mb-2">
                  <Label name="PASSWORD *" htmlFor="password" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="*******"
                    value={this.state.password}
                    name="password"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.password.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.password}
                    </small>
                  )}
                </div>
                <Button name="Sign up" size="100%" />
              </form>
            </Style.Main>
          </Grid>
        </main>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Signup)
const Style = {}

Style.Main = styled.div`
  background-color: ${colors.white};
  padding: 2rem 3rem;
`
