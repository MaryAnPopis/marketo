import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { connect } from 'react-redux'
import { Elements } from 'react-stripe-elements'
import StripeForm from '../components/StripeForm'

import Menu from '../components/Menu'
import Footer from '../components/Footer'
import OrderItem from '../components/OrderItem'
import colors from '../style/colors'
import Visa from '../img/cards/visa.svg'
import Mastercard from '../img/cards/mastercard.svg'
import JCB from '../img/cards/jcb.svg'
import Discover from '../img/cards/discover.svg'
import Diners from '../img/cards/diners.svg'
import Amex from '../img/cards/amex.svg'

import { getShoppingCart } from '../services'

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

export class Checkout extends Component {
  constructor() {
    super()
    this.state = {
      shoppigCart: [],
    }
  }

  componentDidMount() {
    const cart = getShoppingCart()
    this.setState({
      shoppigCart: cart,
    })
  }

  render() {
    const { classes, shoppingCartTotals } = this.props
    const { shoppigCart } = this.state

    return (
      <div>
        <Menu />
        <div className={classNames(classes.layout)}>
          <Style.MainTitle className="rubik">Checkout</Style.MainTitle>
          <Style.Container container>
            <Grid item xs={12} sm={12} md={12}>
              <Grid container>
                <Grid item xs={12} sm={12} md={12}>
                  <Style.Form>
                    <Style.Title className="rubik">YOUR ORDER</Style.Title>
                    <Style.Divider />
                  </Style.Form>
                </Grid>
              </Grid>
              <Grid container>
                <Grid item xs={6} sm={6} md={6}>
                  <Style.Form>
                    <Style.ProductTitle className="rubik">Product</Style.ProductTitle>
                    <Style.Divider />
                  </Style.Form>
                </Grid>
                <Grid item xs={6} sm={6} md={6}>
                  <Style.Form>
                    <Style.TotalTitle className="rubik">Total</Style.TotalTitle>
                    <Style.Divider />
                  </Style.Form>
                </Grid>
              </Grid>
              <Grid container>
                {shoppigCart.map(product => {
                  const total = product.quantity * product.price
                  return (
                    <OrderItem
                      key={product.id}
                      name={product.name}
                      quantity={` x ${product.quantity}`}
                      price={total}
                    />
                  )
                })}

                <OrderItem
                  name="Subtotal"
                  quantity=""
                  price={shoppingCartTotals.subtotal}
                  border="remove-border"
                  nameColor="greyColor"
                  nameWeigth="boldy"
                  priceColor="greyColor"
                />
                <OrderItem
                  name="Shipping"
                  quantity=""
                  price={shoppingCartTotals.shipping}
                  border="remove-border"
                  nameColor="greyColor"
                  nameWeigth="boldy"
                  priceColor="greyColor"
                />
                <OrderItem
                  name="Total"
                  quantity=""
                  price={shoppingCartTotals.total}
                  border="remove-border"
                  nameColor="greyColor"
                  nameWeigth="boldy"
                  priceColor="greyColor"
                />
              </Grid>
              <Style.Payment>
                <Grid container>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="">
                      <h3 className="greyColor boldy "> Credit Card (Stripe) </h3>
                      <small className="greyColor boldy ">
                        Pay with your credit card via Stripe.
                      </small>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <Style.IconContainer>
                      <Style.StripeIcon src={Visa} alt="" />
                      <Style.StripeIcon src={Mastercard} alt="" />
                      <Style.StripeIcon src={JCB} alt="" />
                      <Style.StripeIcon src={Discover} alt="" />
                      <Style.StripeIcon src={Diners} alt="" />
                      <Style.StripeIcon src={Amex} alt="" />
                    </Style.IconContainer>
                  </Grid>
                </Grid>

                <Elements>
                  <StripeForm />
                </Elements>
              </Style.Payment>
            </Grid>
          </Style.Container>
        </div>
        <Footer />
      </div>
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

export default connect(mapStateToProps)(withStyles(styles)(Checkout))
const Style = {}

Style.Container = styled(Grid)`
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
`

Style.StripeIcon = styled.img`
  max-width: 2rem;
  position: relative;
  height: auto;
  padding-left: 3px;
  margin: 0;
`

Style.IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  @media (max-width: 600px) {
    display: block;
    margin-bottom: 1rem;
  }
`

Style.MainTitle = styled.h1`
  font-weight: 300;
  font-size: 2rem;
`
Style.Title = styled.h2`
  font-weight: 400;
  font-size: 1.2rem;
`
Style.Payment = styled.div`
  background: ${colors.white};
  padding: 0.5rem 2rem;
`

Style.Form = styled.div`
  background: ${colors.lightGreyBg};
  padding: 0.5rem 2rem;
`

Style.Divider = styled.div`
  background-color: rgba(69, 73, 91, 0.08);
  width: 100%;
  border-radius: 4px;
  height: 0.1rem;
`

Style.ProductTitle = styled.h2`
  font-weight: 400;
  font-size: 1rem;
  color: ${colors.bgDark};
`

Style.TotalTitle = styled(Style.ProductTitle)`
  display: flex;

  justify-content: flex-end;
`
