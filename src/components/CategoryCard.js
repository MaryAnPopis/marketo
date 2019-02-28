import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Img from './Img'
import colors from '../style/colors'

class CategoryCard extends React.Component {
  render() {
    const { src, alt, sizeHeight, sizeWidth, categoryUrl, title, idCategory } = this.props
    return (
      <Style.CardWrapper idCategory={idCategory}>
        <Style.Thumnail>
          <Link to={categoryUrl}>
            <Img src={src} atl={alt} sizeWidth={sizeWidth} sizeHeight={sizeHeight} />
          </Link>
        </Style.Thumnail>
        <div>
          <Style.Title>
            <Link to={categoryUrl}>{title}</Link>
          </Style.Title>
        </div>
      </Style.CardWrapper>
    )
  }
}

CategoryCard.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  sizeWidth: PropTypes.string,
  sizeHeight: PropTypes.string,
  categoryUrl: PropTypes.string,
  title: PropTypes.string,
}

const mapStateToProps = state => {
  return {
    subCategories: state.categories.subCategories,
  }
}

export default connect(mapStateToProps)(CategoryCard)

const Style = {}

Style.Title = styled.h3`
  color: ${colors.primaryColor};
  font-weight: 500;
  font-size: 0.9rem;
`

Style.CardWrapper = styled.div`
  height: auto;
  background-color: ${colors.white};
  display: flex;
  flex-direction: row;
  padding: 1.875rem;
  box-shadow: inset -1px 0 0 0 #eff0f5;
  border: 0.2px solid ${colors.lightGrey};
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`

Style.Thumnail = styled.div`
  width: 7.75rem;
  height: 7.75rem;
  padding-right: 0.8rem;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 12rem;
    padding-bottom: 4rem;
  }
  @media (max-width: 599px) {
    width: 17rem;
    padding-bottom: 9rem;
  }

  @media (min-width: 1200px) {
    width: 40%;
    height: auto;
  }
`
