import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactPaginate from 'react-paginate'

import { fetchProductByCategory } from '../actions/productActions'

import Menu from '../components/Menu'
import Loader from '../components/Loader'
import ProductCard from '../components/ProductCard'

import Grid from '@material-ui/core/Grid'
import classNames from 'classnames'
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
const MAX_PRODUCTS = 2
export class ProducList extends Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      currentPage: this.props.productPage.number,
    }
  }
  componentDidMount() {
    const idCategory = this.props.match.params.idCategory
    this.props.dispatch(fetchProductByCategory(idCategory, 0, MAX_PRODUCTS))
  }

  handlePageChange = page => {
    this.setState({
      currentPage: page.selected,
    })

    const idCategory = this.props.match.params.idCategory
    this.props.dispatch(fetchProductByCategory(idCategory, page.selected, MAX_PRODUCTS))
  }

  render() {
    const { productList, error, loading, classes, productPage } = this.props

    if (error) {
      return <div>Error! {error.message}</div>
    }

    if (loading) {
      return <Loader />
    }

    if (!productList) {
      return <Loader />
    } else {
      return (
        <div>
          <Menu />
          <div className={classNames(classes.layout)}>
            <Grid container spacing={24} justify="center" alignItems="center">
              {productList.map(product => {
                return (
                  <Grid item xs={12} sm={6} md={3}>
                    <ProductCard
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

            <ReactPaginate
              previousLabel={<li>porfa</li>}
              pageRangeDisplayed={2}
              marginPagesDisplayed={1}
              breakLabel="..."
              nextLabel={<li>porfa</li>}
              pageCount={productPage.totalPages}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => {
  return {
    productList: state.product.products.content,
    productPage: state.product.products,
    loading: state.product.loading,
    error: state.product.error,
  }
}

export default connect(mapStateToProps)(withStyles(styles)(ProducList))
