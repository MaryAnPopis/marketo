import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import classNames from 'classnames'
import { withStyles } from '@material-ui/core/styles'

import Menu from './Menu'
import Footer from './Footer'
import Button from './Button'
import colors from '../style/colors'

const styles = theme => ({
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    marginTop: '3rem',
  },
})
export class CheckoutSuccess extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
    }
  }

  handleClick(e) {
    this.setState({
      redirect: true,
    })
  }

  render() {
    const { classes } = this.props
    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    return (
      <div>
        <Menu />
        <main className={classNames(classes.layout)}>
          <Style.Form>
            <Style.Title className="rubik">Thank you. Your order has been received.</Style.Title>
            <Button name="Return to shop" onClick={e => this.handleClick(e)} />
          </Style.Form>
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(CheckoutSuccess)
const Style = {}
Style.Form = styled.div`
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
  background: #fcfcfc;
  padding: 0.5rem 2rem;
`
Style.Title = styled.h2`
  font-weight: 300;
  font-size: 2rem;
`
