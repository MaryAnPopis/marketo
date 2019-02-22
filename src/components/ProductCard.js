import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { withStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import Img from './Img'
import colors from '../style/colors'

import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

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

const ProductCard = props => {
  const { classes } = props
  return (
    <Style.Card>
      <Style.Image to={props.url} className="product_img">
        <Img src={props.src} alt={props.alt} />
      </Style.Image>
      <Typography align="center" variant="h6" className={classes.typography}>
        {props.productName}
      </Typography>
      <Typography align="center" variant="h6" className={classes.priceTitle}>
        Price
      </Typography>
      <Typography align="center" className={classes.price}>
        {props.price}
      </Typography>
      <IconButton aria-label="Shopping Cart">
        <ShoppingCartOutlinedIcon className={classes.icon} />
      </IconButton>
    </Style.Card>
  )
}

ProductCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  productName: PropTypes.string,
  price: PropTypes.string,
}

export default withStyles(styles)(ProductCard)

const Style = {}

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
  width: 14.375rem;
  height: 14.375rem;
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
