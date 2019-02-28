import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { Redirect } from 'react-router-dom'

import Menu from '../components/Menu'
import Footer from '../components/Footer'
import colors from '../style/colors'
import CartItem from '../components/CartItem'
import Button from '../components/Button'

import { validateSession } from '../services'

import Grid from '@material-ui/core/Grid'
import { withStyles } from '@material-ui/core/styles'

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
    marginTop: '3rem',
    minHeight: '100vh',
  },
})

export class Cart extends Component {
  constructor(props) {
    super(props)
    const cart = !this.props.shoppingCartTotals ? {} : this.props.shoppingCartTotals
    this.state = {
      subTotal: cart.subTotal,
      total: cart.total,
      shipping: cart.shipping,
      redirect: false,
    }
  }

  handleCheckout = () => {
    debugger
    if (!validateSession()) {
      this.setState({
        redirect: 'LOGIN',
      })
    } else {
      this.setState({
        redirect: 'CHECKOUT',
      })
    }
  }

  render() {
    const { classes, shoppingCart } = this.props

    if (this.state.redirect === 'LOGIN') {
      return <Redirect to={`/login`} />
    }
    if (this.state.redirect === 'CHECKOUT') {
      return <Redirect to={`/checkout`} />
    }

    return (
      <div>
        <Menu />
        <main className={classNames(classes.layout)}>
          <Grid container spacing={8}>
            <Grid container>
              <Style.SubTitleWrapper>
                <Grid item md={4}>
                  <Style.SubTitle>Product</Style.SubTitle>
                </Grid>
                <Grid item md={2}>
                  <Style.SubTitle>Price</Style.SubTitle>
                </Grid>
                <Grid item md={3}>
                  <Style.SubTitle>Quantity</Style.SubTitle>
                </Grid>
                <Grid item md={2}>
                  <Style.SubTitle>Total</Style.SubTitle>
                </Grid>
                <Grid item md={1}>
                  <div />
                </Grid>
              </Style.SubTitleWrapper>
            </Grid>
            {!shoppingCart ? (
              <div />
            ) : (
              shoppingCart.map(product => {
                return (
                  <CartItem
                    id={product.id}
                    src={product.image}
                    name={product.name}
                    price={product.price}
                    total={product.total}
                    quantity={product.quantity}
                  />
                )
              })
            )}
          </Grid>

          <Style.CheckoutWrapper container>
            <Grid item xs={12} sm={7} />
            <Grid item xs={12} sm={5}>
              <Style.AddInfo className="rubik">CART TOTALS</Style.AddInfo>
              <Style.Divider />
              <Style.Checkout>
                <Style.CheckoutSection container>
                  <Grid item xs={12} sm={6}>
                    <p>Subtotal: </p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <NumberFormat
                      value={
                        !this.props.shoppingCartTotals ? {} : this.props.shoppingCartTotals.subtotal
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </Grid>
                </Style.CheckoutSection>
                <Style.CheckoutSection container className="border-top-bottom">
                  <Grid item xs={12} sm={6}>
                    <p>Shipping: </p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <p>
                      FLAT RATE:{' '}
                      <NumberFormat
                        value={
                          !this.props.shoppingCartTotals
                            ? {}
                            : this.props.shoppingCartTotals.shipping
                        }
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </p>
                    <p>Estimate for</p>
                  </Grid>
                </Style.CheckoutSection>
                <Style.CheckoutSection container>
                  <Grid item xs={12} sm={6}>
                    <p>Total: </p>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <NumberFormat
                      value={
                        !this.props.shoppingCartTotals ? {} : this.props.shoppingCartTotals.total
                      }
                      displayType={'text'}
                      thousandSeparator={true}
                      prefix={'$'}
                    />
                  </Grid>
                </Style.CheckoutSection>
              </Style.Checkout>
              <Button name="Proceed to checkout" onClick={this.handleCheckout} />
            </Grid>
          </Style.CheckoutWrapper>
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shoppingCart: state.product.shoppingCart,
    shoppingCartTotals: state.product.shoppingCartTotals,
    loading: state.product.loading,
    error: state.product.error,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(Cart))

const Style = {}

Style.SubTitle = styled.h2`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${colors.fontDark};
`

Style.SubTitleWrapper = styled.div`
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgb(138, 142, 157, 0.2);
  @media (max-width: 960px) {
    display: none;
  }
`
Style.Checkout = styled.div`
  padding: 1.25rem;
  background-color: ${colors.white};
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
  margin-bottom: 1rem;
  color: ${colors.fontDark};
`
Style.CheckoutSection = styled(Grid)`
  padding: 1.25rem 0;
`

Style.CheckoutWrapper = styled(Grid)`
  margin-top: 2rem;
`
Style.Divider = styled.div`
  background-color: rgba(69, 73, 91, 0.08);
  width: 100%;
  border-radius: 4px;
  height: 0.1rem;
  margin-bottom: 1rem;
`
Style.AddInfo = styled.p`
  line-height: 1.6875rem;
  color: ${colors.black};
  font-size: 1rem;
  margin: 0.7rem 0;
`
