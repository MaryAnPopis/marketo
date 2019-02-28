import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from '../style/colors'

class Input extends React.Component {
  constructor() {
    super()

    this.state = {
      disabled: '',
    }
  }

  render() {
    const props = this.props
    return (
      <InputComponent
        type={props.type}
        name={props.name}
        id={props.id}
        placeholder={props.placeholder}
        onChange={props.onChange}
        value={props.value}
        disabled={!props.isDisabled}
        borderState={props.borderState}
        className={props.className}
        min={props.min}
      />
    )
  }
}

Input.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
}

Input.defaultProps = {
  isDisabled: true, // true make the input not disabled
  borderState: {
    border: `solid 1px #DDDFE7`,
  },
}

export default Input

const InputComponent = styled.input`
  width: 93%;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  font-size: '1rem';
  line-height: 20px;
  color: ${colors.fontDark};
  letter-spacing: normal;
  padding: 0.9rem 1rem;
  border: ${props => props.borderState.border};
  outline: transparent;
  text-align: 'left';
  margin-top: 0.4rem;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.03);
  &:focus {
    border: solid 1px ${colors.fontLight};
  }
`
