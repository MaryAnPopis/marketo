import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import NumberFormat from 'react-number-format'
import Grid from '@material-ui/core/Grid'

import styled from 'styled-components'
import colors from '../style/colors'

export class AutoCompleteProduct extends Component {
  render() {
    const { name, price, imageSrc, alt, id } = this.props
    return (
      <Style.Container id={id}>
        <Style.Wrap>
          <Style.ImgContainer item xs={1} sm={1} md={1}>
            <Link to={`/product/${this.props.id}`}>
              <Style.Img src={imageSrc} alt={alt} />
            </Link>
          </Style.ImgContainer>
          <Grid item xs={11} sm={11} md={11}>
            <Style.TextContainer>
              <Link to={`/product/${this.props.id}`}>
                <Style.Name>{name}</Style.Name>
                <Style.Price>
                  <NumberFormat
                    value={price}
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                </Style.Price>
              </Link>
            </Style.TextContainer>
          </Grid>
        </Style.Wrap>
      </Style.Container>
    )
  }
}

export default AutoCompleteProduct
const Style = {}
Style.Container = styled.div`
  padding: 0.4rem 0 2rem;
  border-bottom: 1px solid ${colors.lightGrey};
  background-color: ${colors.white};
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.1);
`

Style.Wrap = styled.div`
  display: flex;
  flex-direction: row;
`

Style.Img = styled.img`
  max-width: 4.625rem;
  max-height: auto;
  border-width: 1px;
  border-style: solid;
  border-color: #dddfe7;
`
Style.ImgContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 1rem 0 0 1rem;
`

Style.TextContainer = styled.div`
  padding: 0 0.5rem;
`

Style.Name = styled.h3`
  font-weight: 400;
  margin-bottom: 0.3rem;
`

Style.Price = styled.p`
  color: ${colors.primaryColor};
`
