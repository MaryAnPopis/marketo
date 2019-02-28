import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'

import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'

import Input from '../components/Input'
import colors from '../style/colors'

import {
  updateShoppingCart,
  deleteProductInShoppingCart,
  updateShoppingCartTotalsSuccess,
} from '../actions/productActions'
import { updateCartTotals } from '../services'
class CartItem extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      quantity: this.props.quantity,
      total: this.props.total,
    }

    this.shoppingCartTotals = this.shoppingCartTotals.bind(this)
  }

  deleteCartItem = () => {
    const product = { id: this.props.id }
    this.props.dispatch(deleteProductInShoppingCart(product))
  }

  updateTotal(e) {
    const { name, value } = e.target
    const { price, src, id } = this.props
    this.setState({ [name]: value })
    if (value <= 0) {
      this.setState({ quantity: 1 })
    } else {
      const newTotal = value * price
      const roundTotal = Math.round(newTotal * 100) / 100
      this.setState({ total: roundTotal })
    }
    //This is to round up the total in each product
    let roundTotalPlusProduct
    let quantityHelper
    let shoppingCartTotals
    if (value > this.state.quantity) {
      quantityHelper = Number(this.state.quantity) + 1
      roundTotalPlusProduct = Math.round((Number(this.state.total) + price) * 100) / 100
      shoppingCartTotals = this.shoppingCartTotals('SUM')
    } else {
      quantityHelper = Number(this.state.quantity) - 1
      roundTotalPlusProduct = Math.round((Number(this.state.total) - price) * 100) / 100
      shoppingCartTotals = this.shoppingCartTotals('RES')
    }
    const updatedProduct = {
      id: id,
      image: src,
      name: this.props.name,
      price: price,
      quantity: quantityHelper,
      total: roundTotalPlusProduct,
    }
    this.props.dispatch(updateShoppingCart(updatedProduct))

    this.props.dispatch(updateShoppingCartTotalsSuccess(shoppingCartTotals))
  }

  shoppingCartTotals(type) {
    // SHOPPING CART TOTALS
    const myCurrentCart = this.props.shoppingCart
    const cart = !myCurrentCart ? [] : myCurrentCart
    let initialValue = 0
    let sum = 0
    let subtotal = 0
    sum = cart.reduce(function(total, currentValue) {
      return total + currentValue.total
    }, initialValue)

    switch (type) {
      case 'SUM':
        subtotal = Math.round((sum + this.props.price) * 100) / 100
        break
      case 'RES':
        subtotal = Math.round((sum - this.props.price) * 100) / 100
        break
      default:
        break
    }

    const recalculate = updateCartTotals(myCurrentCart)

    const shoppingCartTotals = {
      subtotal: subtotal,
      total: recalculate.total,
      shipping: recalculate.shipping,
    }

    return shoppingCartTotals
  }

  render() {
    return (
      <Style.Wrappper container>
        <Grid item xs={12} sm={12} md={1}>
          <Link to={`/product/${this.props.id}`}>
            <Style.Img src={this.props.src} alt={this.props.alt} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Style.GridReponsive>
            <Link to={`/product/${this.props.id}`}>
              <Style.Name>{this.props.name}</Style.Name>
            </Link>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Style.GridReponsive>
            <Style.Price>
              <NumberFormat
                value={this.props.price}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </Style.Price>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Style.GridReponsive>
            <Style.QuantityMobile>
              <Style.Quantity
                type="number"
                value={this.state.quantity}
                onChange={e => this.updateTotal(e)}
                name="quantity"
                min="1"
              />
            </Style.QuantityMobile>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Style.GridReponsive>
            <Style.Total>
              <NumberFormat
                value={this.state.total}
                displayType={'text'}
                thousandSeparator={true}
                prefix={'$'}
              />
            </Style.Total>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={1} className="move-bin">
          <IconButton aria-label="Delete" onClick={this.deleteCartItem}>
            <Style.DeleteBtn />
          </IconButton>
        </Grid>
      </Style.Wrappper>
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

export default connect(mapStateToProps)(CartItem)

const Style = {}

Style.GridReponsive = styled.div`
  @media (max-width: 960px) {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
  }
`

Style.DeleteBtn = styled(DeleteIcon)`
  &:hover {
    color: ${colors.danger};
  }
  @media (max-width: 960px) {
  }
`

Style.Quantity = styled(Input)`
  width: 4rem;
  text-align: center;
  font-size: 1.1rem;
  @media (max-width: 960px) {
    &:before {
      content: 'Price : ';
      color: ${colors.black};
    }
  }
`

Style.Wrappper = styled(Grid)`
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgb(138, 142, 157, 0.2);
  padding: 1rem 0;
`

Style.Img = styled.img`
  max-width: 5.625rem;
  max-height: auto;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.03);
  border-width: 1px;
  border-style: solid;
  border-color: #dddfe7;
`
Style.Name = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.black};
  padding-left: 0.5rem;
  &:hover {
    color: ${colors.primaryColor};
  }
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Product:    ';
      color: ${colors.black};
    }
  }
`
Style.Price = styled(Style.Name)`
  font-size: 1.1rem;
  &:hover {
    color: ${colors.black};
  }
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Price:    ';
      color: ${colors.black};
    }
  }
`
Style.Total = styled(Style.Price)`
  font-size: 1.1rem;
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Total:    ';
      color: ${colors.black};
    }
  }
`
Style.QuantityMobile = styled.div`
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Quantity:    ';

      justify-content: flex-start;
      align-items: flex-start;
      color: ${colors.black};
    }
  }
`
