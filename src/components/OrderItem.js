import React from 'react'
import styled from 'styled-components'
import NumberFormat from 'react-number-format'
import { connect } from 'react-redux'

import colors from '../style/colors'

import Grid from '@material-ui/core/Grid'

function OrderItem(props) {
  return (
    <Style.Test container>
      <Grid item sm={12} md={12} lg={12}>
        <Style.Wrap>
          <Style.BorderBottom container className={props.border}>
            <Grid item sm={6} md={6} lg={6}>
              <p className={`${props.nameColor} ${props.nameWeigth}`}>
                {props.name} <Style.Quatity>{props.quantity} </Style.Quatity>
              </p>
            </Grid>
            <Grid item sm={6} md={6} lg={6}>
              <Style.Price className={props.priceColor}>
                <NumberFormat
                  value={Math.round(props.price * 100) / 100}
                  displayType={'text'}
                  thousandSeparator={true}
                  prefix={'$'}
                />
              </Style.Price>
            </Grid>
          </Style.BorderBottom>
        </Style.Wrap>
      </Grid>
    </Style.Test>
  )
}

const mapStateToProps = state => {
  return {
    shoppingCartTotals: state.product.shoppingCartTotals,
    loading: state.product.loading,
    error: state.product.error,
  }
}

export default connect(mapStateToProps)(OrderItem)

const Style = {}

Style.Test = styled(Grid)`
  @media (max-width: 598px) {
    display: block;
  }
`

Style.Wrap = styled.div`
  background: ${colors.lightGreyBg};
  padding: 0rem 2rem;
`

Style.Quatity = styled.span`
  font-weight: 600;
`

Style.Price = styled.p`
  color: ${colors.primaryColor};
  display: flex;
  justify-content: flex-end;
`
Style.BorderBottom = styled(Grid)`
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgba(69, 73, 91, 0.08);
  padding: 1.5rem 0;
`
