import React, { Component } from 'react'
import styled from 'styled-components'
import { injectStripe, CardElement } from 'react-stripe-elements'
import jwtDecode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import uniqid from 'uniqid'
import colors from '../style/colors'
import Button from '../components/Button'
import Label from '../components/Label'
import ShoppingCartLoader from '../img/loader-shopping_cart.svg'

import {
  loadLocalStorage,
  post,
  cleanShoppingCartLocal,
  saveOrder,
  getShoppingCart,
} from '../services'
import { cleanShoppingCart } from '../actions/productActions'

export class StripeForm extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
      loading: false,
    }
  }
  handleSubmit = e => {
    e.preventDefault()
    const user = loadLocalStorage('user')
    const decodedToken = jwtDecode(user.data.token)
    const email = decodedToken.email
    const name = decodedToken.name
    const total = this.props.shoppingCartTotals.total
    this.props.stripe
      .createToken({ name: name, email: email })
      .then(({ token }) => {
        const stripePay = {
          token: token.id,
          name: name,
          email: email,
          amount: total,
        }
        this.setState({
          loading: true,
        })
        post('products/checkout-stripe', stripePay).then(payment => {
          const order = {
            id: uniqid(),
            name: name,
            email: email,
            total: total,
            receipt: payment.receipt,
          }

          saveOrder(order)
          if (payment.paid) {
            cleanShoppingCartLocal([])
            this.props.dispatch(cleanShoppingCart([]))
            this.setState({
              redirect: true,
              loading: false,
            })
          } else {
            toast.error('There was an error processing your payment!', {
              position: 'bottom-right',
              autoClose: 5000,
            })
          }
        })
      })
      .catch(e => {
        console.log('Invalid token', e)
      })
  }

  render() {
    const { redirect } = this.state
    if (redirect) {
      return <Redirect to="checkout-success" />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <ToastContainer />
        <Label name="CARD NUMBER *" />
        <Style.CardStripe />
        <Style.PayBtn>
          <Button
            name={
              this.state.loading ? <img src={ShoppingCartLoader} alt="loading" /> : 'Confirm order'
            }
          />
        </Style.PayBtn>
      </form>
    )
  }
}

const mapStateToProps = state => {
  return {
    shoppingCartTotals: state.product.shoppingCartTotals,
    loading: state.product.loading,
    error: state.product.error,
  }
}

export default connect(mapStateToProps)(injectStripe(StripeForm))

const Style = {}

Style.CardStripe = styled(CardElement)`
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: 1.5rem;
  line-height: 20px;
  color: ${colors.fontDark};
  letter-spacing: normal;
  padding: 0.9rem 1rem;
  border: solid 1px #dddfe7;
  outline: transparent;
  text-align: 'left';
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.03);
  &:focus {
    border: solid 1px ${colors.fontLight};
    -webkit-transition: all 150ms ease;
    transition: all 150ms ease;
  }

  &::placeholder {
    color: #aab7c4;
  }
  margin-bottom: 1.9rem;
`
Style.PayBtn = styled.div`
  padding-bottom: 1rem;
`
