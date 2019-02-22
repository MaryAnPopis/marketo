import React from 'react'
import styled from 'styled-components'

import colors from '../style/colors'

function Label(props) {
  return <Style.Label htmlFor={props.htmlFor}>{props.name}</Style.Label>
}

export default Label

const Style = {}

Style.Label = styled.label`
  font-weight: 400;
  line-height: 20px;
  color: ${colors.lightFont};
  letter-spacing: normal;
  margin-bottom: 15px;
  &:placeholder {
    color: ${colors.lightGrey};
  }
`
