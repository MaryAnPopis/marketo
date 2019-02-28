import React from 'react'

import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'
import styled from 'styled-components'
import jwtDecode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'

import Input from '../components/Input'
import Label from '../components/Label'
import Menu from '../components/Menu'
import Footer from '../components/Footer'
import Button from '../components/Button'
import { emailRegex, formValid } from '../utils/formVerification'

import LoaderIcon from '../img/loader-shopping_cart.svg'

import { getByParam, loadLocalStorage, put } from '../services'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
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
    case 'confirmPassword':
      formErrors.confirmPassword = value.length < 6 ? 'minimum 6 charachaters required' : ''
      break
    case 'newPassword':
      formErrors.newPassword = value.length < 6 ? 'minimum 6 charachaters required' : ''
      break
    case 'email':
      formErrors.email = emailRegex.test(value) && value.length > 0 ? '' : 'invalid email address'
      break
    default:
      break
  }
}

export class Profile extends React.Component {
  constructor() {
    super()
    this.state = {
      id: 0,
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
      fetchInProgress: false,
      token: '',
    }
  }

  handldeChange(e) {
    let formErrors = this.state.formErrors
    const { name, value } = e.target
    checkErrors(this.state.formErrors, name, value)
    this.setState({ formErrors, [name]: value })
  }

  componentDidMount() {
    const user = loadLocalStorage('user')
    const decodedToken = jwtDecode(user.data.token)
    const email = decodedToken.email

    getByParam('user/find-by-email', email).then(user => {
      this.setState({
        id: user.id,
        firstName: user.name,
        lastName: user.lastName,
        address: user.address,
        email: user.email,
        password: user.password,
        token: decodedToken,
      })
    })
  }

  handleSubmit(event) {
    // prevent the form submmiting on its own
    event.preventDefault()
    this.setState({
      fetchInProgress: true,
    })
    const data = {
      id: this.state.id,
      name: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      address: this.state.address,
      isAdmin: false,
    }

    if (formValid(this.state)) {
      put('user', data, this.state.token)
        .then(user => {
          this.setState({
            fetchInProgress: false,
          })
        })
        .catch(err => {
          console.log(err)
        })
    } else {
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
        <Menu />
        <ToastContainer />
        <div className={classNames(classes.layout)}>
          <Style.Tile className="rubik">Account details</Style.Tile>

          <form onSubmit={e => this.handleSubmit(e)}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6} md={6}>
                <Style.ControlForm>
                  <Label name="NAME *" htmlFor="firstName" />
                  <Style.CustomInput
                    id="firstName"
                    type="text"
                    value={this.state.firstName}
                    name="firstName"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.firstName.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.firstName}
                    </small>
                  )}
                </Style.ControlForm>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <Style.ControlForm>
                  <Label name="LAST NAME *" htmlFor="lastName" />
                  <Style.CustomInput
                    id="lastName"
                    type="text"
                    value={this.state.lastName}
                    name="lastName"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.lastName.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.lastName}
                    </small>
                  )}
                </Style.ControlForm>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Style.ControlForm>
                  <Label name="EMAIL ADDRESS *" htmlFor="email" />
                  <Style.LargeInput
                    id="email"
                    type="text"
                    value={this.state.email}
                    name="email"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.email.length > 0 && (
                    <small className="form-text text-danger ">{this.state.formErrors.email}</small>
                  )}
                </Style.ControlForm>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Style.ControlForm>
                  <Label name="ADDRESS *" htmlFor="address" />
                  <Style.LargeInput
                    id="address"
                    type="text"
                    value={this.state.address}
                    name="address"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.address.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.address}
                    </small>
                  )}
                </Style.ControlForm>
              </Grid>
            </Grid>
            {/* {         <Style.SubTitle className="rubik">PASSWORD CHANGE</Style.SubTitle>
            <Style.Divider />
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Style.ControlForm>
                  <Label name="NEW PASSWORD  *" htmlFor="newPassword" />
                  <Style.LargeInput
                    id="newPassword"
                    type="password"
                    placeholder="*********"
                    value={this.state.newPassword}
                    name="newPassword"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.newPassword.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.newPassword}
                    </small>
                  )}
                </Style.ControlForm>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <Style.ControlForm>
                  <Label name="CONFIRM NEW PASSWORD *" htmlFor="confirmPassword" />
                  <Style.LargeInput
                    id="confirmPassword"
                    type="password"
                    placeholder="*********"
                    value={this.state.confirmPassword}
                    name="confirmPassword"
                    onChange={e => this.handldeChange(e)}
                  />
                  {this.state.formErrors.confirmPassword.length > 0 && (
                    <small className="form-text text-danger ">
                      {this.state.formErrors.confirmPassword}
                    </small>
                  )}
                </Style.ControlForm>
              </Grid>
            </Grid>} */}
            <Grid container>
              <Grid item xs={12} sm={6} md={3}>
                <Style.ControlForm>
                  <Button
                    name={
                      this.state.fetchInProgress ? (
                        <img src={LoaderIcon} alt="loading" />
                      ) : (
                        'Save changes'
                      )
                    }
                  />
                </Style.ControlForm>
              </Grid>
            </Grid>
          </form>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Profile)
const Style = {}

Style.Tile = styled.h1`
  font-size: 1.3rem;
  font-weight: 400;
  margin-bottom: 2rem;
`
Style.SubTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 2rem;
`

Style.ControlForm = styled.div`
  margin-bottom: 1.8rem;
`

Style.CustomInput = styled(Input)`
  width: 93%;
`
Style.LargeInput = styled(Input)`
  width: 96%;
  @media (max-width: 960px) {
    width: 95%;
  }
`
Style.Divider = styled.div`
  background-color: rgba(69, 73, 91, 0.08);
  width: 100%;
  border-radius: 4px;
  height: 0.1rem;
  margin-bottom: 1rem;
`
