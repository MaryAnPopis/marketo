import React, { Component } from 'react'
import classNames from 'classnames'

import Menu from '../components/Menu'
import CartItem from '../components/CartItem'

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
  },
})

export class Cart extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Menu />
        <main className={classNames(classes.layout)}>
          <Grid container spacing={24}>
            <table>
              <thead>
                <tr>
                  <th class="product-remove">&nbsp;</th>
                  <th class="product-thumbnail">&nbsp;</th>
                  <th class="product-name">Product</th>
                  <th class="product-price">Price</th>
                  <th class="product-quantity">Quantity</th>
                  <th class="product-subtotal">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <CartItem />
                  </td>
                </tr>
                <tr>
                  <td>
                    <CartItem />
                  </td>
                </tr>
              </tbody>
            </table>
          </Grid>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(Cart)
