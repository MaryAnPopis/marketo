import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Img = props => {
  return (
    <Style.Icon sizeWidth={props.sizeWidth} sizeHeight={props.sizeHeight}>
      <Style.Img src={props.src} alt={props.alt} />
    </Style.Icon>
  )
}

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  sizeWidth: PropTypes.string,
  sizeHeight: PropTypes.string,
}

Img.defaultProps = {
  sizeWidth: {
    width: '38.8125rem',
  },
  sizeHeight: {
    height: '24.8125rem',
  },
}
export default Img

const Style = {}

Style.Icon = styled.div`
  max-width: ${props => props.sizeWidth.width};
  max-height: ${props => props.sizeHeight.height};
`
Style.Img = styled.img`
  width: 100%;
  height: 100%;
`
