import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = props => {
  return (
    <Style.Button
      id={props.id}
      onClick={props.onClick}
      className={`${props.className} btn`}
      size={props.size}
    >
      {props.name}
    </Style.Button>
  )
}

Button.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  size: PropTypes.string,
  onClick: PropTypes.func,
}

Button.defaultProps = {
  size: {
    width: '100%',
  },
}

export default Button

const Style = {}
Style.Button = styled.button`
  width: ${props => props.size.width};
  font-family: 'Rubik', sans-serif;
`
