import React from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { withStyles } from '@material-ui/core/styles'
import { Carousel } from 'react-responsive-carousel'
import NumberFormat from 'react-number-format'
import { ToastContainer, toast } from 'react-toastify'
import { css } from 'glamor'
import { Redirect } from 'react-router-dom'

import Button from '../components/Button'
import Menu from '../components/Menu'
import colors from '../style/colors'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import Loader from '../components/Loader'

import CheckCircleOutlinedIcon from '@material-ui/icons/CheckCircleOutlined'
import Grid from '@material-ui/core/Grid'

import { fetchProduct, saveToShoppingCart } from '../actions/productActions'

const styles = theme => ({
  productTitle: {
    marginBottom: '3rem',
  },
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

class ProductDetails extends React.Component {
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
    const idProduct = this.props.match.params.idProduct
    this.props.dispatch(fetchProduct(idProduct))

    const isFound = this.state.shoppingCart.some(item => {
      return item.id === Number(idProduct)
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
    const { classes, productDetails, error, loading, relatedProducts } = this.props
    const { isInShoppingCart } = this.state
    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <Loader />
    }

    if (this.state.redirect) {
      return <Redirect to="/cart" />
    }

    if (!productDetails) {
      return <div />
    } else {
      return (
        <div>
          <Menu />
          {this.props.addToCartLoading && <ToastContainer />}
          <main className={classNames(classes.layout)}>
            <Grid container spacing={24}>
              <Grid item xs={12} sm={6} md={7}>
                <Style.Card>
                  <Style.CarouselProduct
                    showStatus={false}
                    infiniteLoop
                    autoPlay
                    emulateTouch
                    showIndicators={false}
                    showArrows={false}
                  >
                    {productDetails.images.map(image => {
                      return (
                        <div key={image.id}>
                          <img className="zoom" src={image.url} alt={`by ${productDetails.name}`} />
                        </div>
                      )
                    })}
                  </Style.CarouselProduct>
                </Style.Card>
              </Grid>
              <Grid item xs={12} sm={6} md={5}>
                <Style.Card>
                  <Style.Title className="mb-1 rubik">{productDetails.name}</Style.Title>
                  <div className="mb-1">
                    <Style.Tags>
                      Categories:{' '}
                      {productDetails.subCategories.map(category => {
                        return (
                          <Style.TagsDescription key={category.id}>
                            {category.name}
                          </Style.TagsDescription>
                        )
                      })}
                    </Style.Tags>
                    {/* {  <Style.Tags>
                      Tags: <Style.TagsDescription>HDMI, LED</Style.TagsDescription>
                    </Style.Tags>} */}
                    <Style.Tags>
                      Brand: <Style.TagsDescription>{productDetails.brand}</Style.TagsDescription>
                    </Style.Tags>
                  </div>

                  <Style.PriceWrapper>
                    <Style.Price>
                      <NumberFormat
                        value={productDetails.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        prefix={'$'}
                      />
                    </Style.Price>
                  </Style.PriceWrapper>
                  <Style.Divider />
                  <Style.AddInfo>{productDetails.additionalInfo}</Style.AddInfo>
                  <dl>
                    {productDetails.specs.map(spec => {
                      return <Style.Spec key={spec.id}>{spec.description}</Style.Spec>
                    })}
                  </dl>
                  <Style.Divider className="mb-2" />
                  {isInShoppingCart ? (
                    <Button
                      name={<CheckCircleOutlinedIcon className={classes.icon} />}
                      onClick={() => this.goToCart(productDetails.id)}
                    />
                  ) : (
                    <Button
                      onClick={() => this.addToShoppingCart(productDetails.id)}
                      name={'Add To Cart'}
                    />
                  )}
                </Style.Card>
              </Grid>
              <Grid item xs={12} sm={12} lg={12}>
                <Style.SubTitle className="rubik">Description</Style.SubTitle>
                <Style.DescriptionP className="mb-2">
                  {productDetails.description}
                </Style.DescriptionP>
              </Grid>
            </Grid>
            <Style.AddInfo className="rubik">RELATED PRODUCTS</Style.AddInfo>
            <Style.Divider />
            <Grid container spacing={24} justify="center" alignItems="center">
              {relatedProducts.map(product => {
                return (
                  <Grid item xs={12} sm={6} md={3} key={product.id}>
                    <ProductCard
                      productId={product.id}
                      src={product.image}
                      sizeWidth="14.375rem"
                      sizeHeight="14.375rem"
                      alt={product.name}
                      productName={product.name}
                      price={product.price}
                      url={`/product/${product.id}`}
                    />
                  </Grid>
                )
              })}
            </Grid>
          </main>
          <Footer />
        </div>
      )
    }
  }
}
const mapStateToProps = state => {
  return {
    productDetails: state.product.productDetails.product,
    relatedProducts: state.product.products.content,
    addToCartLoading: state.product.addToCartLoading,
    shoppingCart: state.product.shoppingCart,
    loading: state.product.loading,
    error: state.product.error,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ProductDetails))

const Style = {}

Style.Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
`

Style.SubTitle = styled.h2`
  font-weight: 300;
  color: ${colors.bgDark};
  font-size: 1.8rem;
`

Style.DescriptionP = styled.p`
  font-weight: 400;
  font-size: 1rem;
  line-height: 1.6875rem;
  color: ${colors.fontDark};
`

Style.Tags = styled.p`
  color: ${colors.fontDark};
  font-size: 0.8rem;
`
Style.TagsDescription = styled.span`
  color: ${colors.primaryColor};
  font-size: 0.8rem;
`

Style.Card = styled.div`
  background-color: ${colors.white};
  opacity: 1;
  transition: 0.25s ease-in-out 0s;
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
  padding: 1.3125rem;
`
Style.Img = styled.img`
  transition: transform 0.2s; /* Animation */
  &:hover {
    transform: scale(
      1.5
    ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
  }
`

Style.PriceWrapper = styled.div`
  background-color: ${colors.primaryColor};
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  display: inline-block;
`
Style.Price = styled.p`
  color: ${colors.white};
  font-weight: 400;
  font-size: 1.5rem;
`
Style.Divider = styled.div`
  background-color: ${colors.lightGrey};
  width: 100%;
  border-radius: 4px;
  height: 0.1rem;
  margin: 1rem 0;
`
Style.AddInfo = styled.p`
  line-height: 1.6875rem;
  color: ${colors.fontDark};
  font-size: 1rem;
  margin: 0.7rem 0;
`

Style.Spec = styled.dt`
  color: ${colors.fontDark};
  margin: 1rem 0;
`

Style.CarouselProduct = styled(Carousel)`
  @media (max-width: 768px) {
    max-height: 67rem;
  }

  @media (max-width: 457px) {
    max-height: 137rem;
  }
`
