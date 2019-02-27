import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/DeleteOutlined'

import Input from '../components/Input'
import colors from '../style/colors'

class CartItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      quantity: this.props.quantity,
    }
  }

  handleClick = () => {
    console.log('hoal')
  }

  handldeChange(e) {
    const { name, value } = e.target

    this.setState({ [name]: value })
  }

  render() {
    return (
      <Style.Wrappper container>
        <Grid item xs={12} sm={12} md={1}>
          <Link to={`/product/${this.props.id}`}>
            <Style.Img src={this.props.src} alt={this.props.alt} />
          </Link>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Style.GridReponsive>
            <Link to={`/product/${this.props.id}`}>
              <Style.Name>{this.props.name}</Style.Name>
            </Link>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Style.GridReponsive>
            <Style.Price>{this.props.price}</Style.Price>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={3}>
          <Style.GridReponsive>
            <Style.QuantityMobile>
              <Style.Quantity
                type="number"
                value={this.state.quantity}
                onChange={e => this.handldeChange(e)}
                name="quantity"
              />
            </Style.QuantityMobile>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={2}>
          <Style.GridReponsive>
            <Style.Total>{this.props.total}</Style.Total>
          </Style.GridReponsive>
        </Grid>
        <Grid item xs={12} sm={12} md={1} className="move-bin">
          <IconButton aria-label="Delete" onClick={this.handleClick}>
            <Style.DeleteBtn />
          </IconButton>
        </Grid>
      </Style.Wrappper>
    )
  }
}

export default CartItem
const Style = {}

Style.GridReponsive = styled.div`
  @media (max-width: 960px) {
    display: flex;
    justify-content: flex-end;
    padding: 1rem 0;
  }
`

Style.DeleteBtn = styled(DeleteIcon)`
  &:hover {
    color: ${colors.danger};
  }
  @media (max-width: 960px) {
  }
`

Style.Quantity = styled(Input)`
  width: 4rem;
  text-align: center;
  font-size: 1.1rem;
  @media (max-width: 960px) {
    &:before {
      content: 'Price : ';
      color: ${colors.black};
    }
  }
`

Style.Wrappper = styled(Grid)`
  display: flex;
  align-items: center;
  border-bottom: 1.2px solid rgb(138, 142, 157, 0.3);
  padding: 1rem 0;
`

Style.Img = styled.img`
  max-width: 5.625rem;
  max-height: auto;
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.03);
  border-width: 1px;
  border-style: solid;
  border-color: #dddfe7;
`
Style.Name = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: ${colors.black};
  padding-left: 0.5rem;
  &:hover {
    color: ${colors.primaryColor};
  }
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Product:    ';
      color: ${colors.black};
    }
  }
`
Style.Price = styled(Style.Name)`
  font-size: 1.1rem;
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Price:    ';
      color: ${colors.black};
    }
  }
`
Style.Total = styled(Style.Name)`
  font-size: 1.1rem;
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Total:    ';
      color: ${colors.black};
    }
  }
`
Style.QuantityMobile = styled.div`
  @media (max-width: 960px) {
    color: ${colors.primaryColor};
    &:before {
      content: 'Quantity:    ';

      justify-content: flex-start;
      align-items: flex-start;
      color: ${colors.black};
    }
  }
`
