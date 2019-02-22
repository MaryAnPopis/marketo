import React, { Component } from 'react'
import styled from 'styled-components'

import colors from '../style/colors'

class Loader extends Component {
  render() {
    return (
      <Styles.Div>
        <Styles.SVG viewBox="0 0 100 100">
          <circle
            fill="none"
            stroke={`#232323`}
            strokeWidth={4}
            cx={50}
            cy={50}
            r={44}
            opacity={0.5}
          />
          <circle
            fill={`${colors.primaryColor}`}
            stroke={`${colors.primaryColor}`}
            strokeWidth={3}
            cx={8}
            cy={54}
            r={6}
          >
            <animateTransform
              attributeName="transform"
              dur="2s"
              type="rotate"
              from="0 50 48"
              to="360 50 52"
              repeatCount="indefinite"
            />
          </circle>
        </Styles.SVG>
      </Styles.Div>
    )
  }
}

export default Loader

const Styles = {}

Styles.Div = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`

Styles.SVG = styled.svg`
  width: 100px;
  height: 100px;
  display: block;
  margin: auto;
`
