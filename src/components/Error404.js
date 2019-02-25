import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Error404 = () => {
  return (
    <Style.Wrapper>
      <Style.Error>
        <Style.Code>404</Style.Code>
        <h1>Oops... Page Not Found!</h1>
        <p>Try using the link below to go to main page of the site</p>
        <Link to="/" className="link-primary">
          Go to Home
        </Link>
      </Style.Error>
    </Style.Wrapper>
  )
}

export default Error404
const Style = {}

Style.Wrapper = styled.div`
  height: 100vh;
`

Style.Error = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

Style.Code = styled.strong`
  display: block;
  font-size: 11rem;
  line-height: 11rem;
  color: #333;
  margin-bottom: 1.2rem;
  text-shadow: 5px 5px 0px rgba(0, 0, 0, 0.6), 7px 7px 0px #3a6f00,
    7px 7px 0px rgba(204, 255, 0, 0.64), 10px 10px 0px #f44336;
  font-weight: 600;
  transform: rotate(-2deg);
`
