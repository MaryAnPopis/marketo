import React from 'react'
import styled from 'styled-components'

import colors from '../style/colors'

const Footer = () => {
  return (
    <Style.Footer>
      <p>© MARKETO 2019 | BY MARKETO.COM</p>
    </Style.Footer>
  )
}

export default Footer

const Style = {}

Style.Footer = styled.div`
  background-color: ${colors.bgDark};
  margin-top: 3rem;
  padding: 1.4rem 0;
  color: ${colors.fontDark};
  text-align: center;
  font-weight: 500;
`
