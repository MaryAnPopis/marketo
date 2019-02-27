import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'
import { connect } from 'react-redux'

import Menu from '../components/Menu'
import Footer from '../components/Footer'
import colors from '../style/colors'
import CartItem from '../components/CartItem'
import Button from '../components/Button'

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
  render() {
    const { classes, shoppingCart } = this.props
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
          <Style.UpdateBtn container>
            <Grid item xs={12} sm={8} />
            <Grid item xs={12} sm={4}>
              <Button name="Update cart" />
            </Grid>
          </Style.UpdateBtn>
        </main>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    shoppingCart: state.product.shoppingCart,
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
  border-bottom: 1.2px solid rgb(138, 142, 157, 0.3);
  @media (max-width: 960px) {
    display: none;
  }
`
Style.UpdateBtn = styled(Grid)`
  margin-top: 2rem;
`
