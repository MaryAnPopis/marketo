import React, { Component } from 'react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import styled from 'styled-components'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Menu from '../components/Menu'
import Footer from '../components/Footer'
import SliderCard from '../components/SliderCard'
import CategoryCard from '../components/CategoryCard'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ProductCard from '../components/ProductCard'

const categories = [
  {
    id: 1,
    title: 'Camera & Photo',
  },
  {
    id: 2,
    title: 'Cell Phone',
  },
  {
    id: 3,
    title: 'Computer & Tablets',
  },
  {
    id: 4,
    title: 'TVs',
  },
  {
    id: 5,
    title: 'Video Games',
  },
  {
    id: 6,
    title: 'Books',
  },
]

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

export class Home extends Component {
  render() {
    const { classes } = this.props
    return (
      <div>
        <Menu />
        <Carousel
          showStatus={false}
          showThumbs={false}
          infiniteLoop
          autoPlay
          emulateTouch
          className="mb-1"
        >
          <div>
            <SliderCard
              src="https://mk0conjrri8axjmrl.kinstacdn.com/wp-content/uploads/sites/2/2018/05/google-home-slide-01.png"
              alt="Google Home image"
              productName="Google Home – Smart Speaker"
              url="/"
            />
          </div>
          <div>
            <SliderCard
              src="https://mk0conjrri8axjmrl.kinstacdn.com/wp-content/uploads/sites/2/2018/05/drone-slide-02.png"
              alt="Amazing Images & Video image"
              productName="Amazing Images & Video"
              url="/"
            />
          </div>
          <div>
            <SliderCard
              src="https://mk0conjrri8axjmrl.kinstacdn.com/wp-content/uploads/sites/2/2018/05/nest-home-slide-03.png"
              alt="Connect to Peace of Mind image"
              productName="Connect to Peace of Mind"
              url="/"
            />
          </div>
        </Carousel>
        <Style.ContainerCategory className={classNames(classes.layout)}>
          <Style.Category container spacing={0} justify="center">
            {categories.map(category => {
              return (
                <Grid item spacing-xs-8 sm={6} md={4} lg={4} key={category.id}>
                  <CategoryCard
                    key={category.id}
                    title={category.title}
                    src="https://mk0conjrri8axjmrl.kinstacdn.com/wp-content/uploads/sites/2/2018/06/cameras-category-418x418.jpg"
                    atl={`${category.title} image`}
                    sizeWidth="7.75rem"
                    sizeHeight="7.75rem"
                    categoryUrl={`/category/${category.id}`}
                  />
                </Grid>
              )
            })}
          </Style.Category>
        </Style.ContainerCategory>
        <div className={classNames(classes.layout)}>
          <Typography align="center" variant="h5" className={classes.productTitle}>
            Products
          </Typography>
          <div>
            <Grid container spacing={24} justify="center" alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/product/1"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/"
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <ProductCard
                  src="https://i.imgur.com/zMWz9Xa.jpg"
                  alt="computer imgage"
                  productName="HP 19' inches"
                  price="$200"
                  url="/"
                />
              </Grid>
            </Grid>
          </div>
        </div>
        <Footer />
      </div>
    )
  }
}

export default withStyles(styles)(Home)

const Style = {}

Style.ContainerCategory = styled.div`
  @media (max-width: 768px) {
    padding: 0;
  }
`

Style.Category = styled(Grid)`
  box-shadow: 0 8px 12px 0 rgba(69, 73, 91, 0.08);
  margin-bottom: 3rem;
`
