import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { Link, Redirect } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { css } from 'glamor'
import { connect } from 'react-redux'

import Img from './Img'
import colors from '../style/colors'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import { saveToShoppingCart } from '../actions/productActions'

const styles = theme => ({
  icon: {
    color: colors.primaryColor,
  },
  typography: {
    marginBottom: '1rem',
  },
  priceTitle: {
    color: `${colors.fontDark}`,
    fontWeight: 300,
  },
  price: {
    color: `${colors.primaryColor}`,
    fontWeight: 300,
    fontSize: '1rem',
  },
})

class ProductCard extends React.Component {
  constructor(props) {
    super(props)

    const cartFromProps = !this.props.shoppingCart ? [] : this.props.shoppingCart

    this.state = {
      shoppingCart: cartFromProps,
      redirect: false,
      isInShoppingCart: false,
    }
  }

  componentDidMount() {
    const isFound = this.state.shoppingCart.some(item => {
      return item.id === this.props.productId
    })
    this.setState({
      isInShoppingCart: isFound,
    })
  }

  addToShoppingCart(productId) {
    this.props.dispatch(saveToShoppingCart(productId))
    toast.success(`Product successfully added to your cart!  `, {
      className: css({
        background: '#29D094 !important',
      }),
      position: 'top-right',
      autoClose: 3000,
    })

    // Change the icon to Check
    this.setState({
      isInShoppingCart: true,
    })
  }

  goToCart() {
    this.setState({
      redirect: true,
    })
  }

  render() {
    const {
      classes,
      url,
      src,
      alt,
      sizeWidth,
      sizeHeight,
      productName,
      price,
      productId,
      addToCartLoading,
    } = this.props
    const { isInShoppingCart } = this.state
    if (this.state.redirect) {
      return <Redirect to="/cart" />
    }

    return (
      <Style.Card id={productId}>
        <div>
          {addToCartLoading && <ToastContainer />}
          <Style.Image to={url} className="product_img">
            <Img src={src} alt={alt} sizeWidth={sizeWidth} sizeHeight={sizeHeight} />
          </Style.Image>
          <Style.Title className={`rubik`}>{productName}</Style.Title>
          <Typography align="center" variant="h6" className={classes.priceTitle}>
            Price
          </Typography>
          <Typography align="center" className={classes.price}>
            ${price}
          </Typography>
          {isInShoppingCart ? (
            <IconButton
              aria-label="Shopping Cart"
              id={productId}
              onClick={() => this.goToCart(productId)}
            >
              <CheckCircleOutlinedIcon className={classes.icon} />
            </IconButton>
          ) : (
            <IconButton
              aria-label="Shopping Cart"
              id={productId}
              onClick={() => this.addToShoppingCart(productId)}
            >
              <ShoppingCartOutlinedIcon className={classes.icon} />
            </IconButton>
          )}
        </div>
      </Style.Card>
    )
  }
}

ProductCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    loading: state.product.loading,
    addToCartLoading: state.product.addToCartLoading,
    shoppingCart: state.product.shoppingCart,
    error: state.product.error,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ProductCard))

const Style = {}

Style.Title = styled.h6`
  white-space: nowrap;
  overflow: hidden;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: center;
  text-overflow: ellipsis;
  margin: 0.4rem;
`

Style.Card = styled.div`
  background-color: ${colors.white};
  padding: 1rem;
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
  @media (max-width: 890px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  @media (max-width: 457px) {
    padding-bottom: 1rem;
  }
`

Style.Image = styled(Link)`
  max-width: 14.375rem;
  max-height: 14.375rem;

  padding-bottom: 1rem;

  @media (max-width: 457px) {
    width: 70%;
    padding-bottom: 1rem;
  }

  @media (min-width: 1200px) {
    width: 90%;
    height: auto;
  }

  @media (min-width: 768px) {
    width: 90%;
    padding-bottom: 4rem;
  }
`
