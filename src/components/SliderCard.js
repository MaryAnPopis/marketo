import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'

import Img from './Img'

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

const SliderCard = props => {
  const { classes } = props
  return (
    <Style.BgImage>
      <Style.Card className={classNames(classes.layout)}>
        <Style.Content>
          <Style.H2>{props.productName}</Style.H2>
          <Style.ButtonLink>
            <Link to={props.url} className="btn">
              Shop Now
            </Link>
          </Style.ButtonLink>
        </Style.Content>
        <Img src={props.src} alt={props.alt} />
      </Style.Card>
    </Style.BgImage>
  )
}

SliderCard.propTypes = {
  productName: PropTypes.string,
  url: PropTypes.string,
  src: PropTypes.string,
  alt: PropTypes.string,
}

export default withStyles(styles)(SliderCard)

const Style = {}

Style.ButtonLink = styled.div`
  max-width: 100%;
  justify-content: flex-start;
  height: auto;
  @media (max-width: 768px) {
    width: 100%;
  }
`

Style.Card = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 2rem 0;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`
Style.Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 768px) {
    margin-bottom: 2rem;
  }
`

Style.H2 = styled.h2`
  font-size: 1.75rem;
  font-weight: 400;
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

Style.BgImage = styled.div`
  background-image: url('https://i.imgur.com/pyinjY0.jpg');
  background-repeat: no-repeat;
  background-size: auto;
  background-position: center bottom;
  margin-top: 0;
  margin-right: 0;
  margin-bottom: 0;
  margin-left: 0;
  padding-top: 56px;
  padding-right: 0;
  padding-bottom: 28px;
  padding-left: 0;
`
