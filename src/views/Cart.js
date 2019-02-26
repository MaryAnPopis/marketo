import React, { Component } from 'react'
import classNames from 'classnames'
import styled from 'styled-components'

import Menu from '../components/Menu'
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
  },
})

export class Cart extends Component {
  render() {
    const { classes } = this.props
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

            <CartItem
              src="https://mk0conjrri8axjmrl.kinstacdn.com/wp-content/uploads/sites/2/2013/06/google-pixelbook-img-03.jpg"
              name="Google Chromebook"
              price="$1000"
              total="$10000"
              quantity="10"
            />

            <CartItem
              src="https://mk0conjrri8axjmrl.kinstacdn.com/wp-content/uploads/sites/2/2013/06/google-pixelbook-img-03.jpg"
              name="Google Chromebook"
              price="$1000"
              total="$10000"
              quantity="10"
            />
          </Grid>
          <Grid container>
            <Grid item xs={12} sm={8} />
            <Grid item xs={12} sm={4}>
              <Button name="Update cart" />
            </Grid>
          </Grid>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Cart)

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
