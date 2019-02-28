import React, { Component } from 'react'
import styled from 'styled-components'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import MediaQuery from 'react-responsive'

import colors from '../style/colors'
import logo from '../img/logo.svg'
import Input from '../components/Input'
import { loadLocalStorage, logOut } from '../services'

import Popover from '@material-ui/core/Popover'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import classNames from 'classnames'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import Grid from '@material-ui/core/Grid'

import { fetchCategories } from '../actions/categoryActions'
import CustomeDrawer from '../components/Drawer'

const styles = theme => ({
  badge: {
    backgroundColor: colors.primaryColor,
    color: colors.white,
    top: '50%',
    right: -3,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing.unit,
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(1100 + theme.spacing.unit * 3 * 2)]: {
      width: 1100,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  icon: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  centerElements: {
    display: 'flex',
    alignItems: 'center',
  },
  linkMenus: {
    marginTop: '2rem',
    color: `${colors.fontLight}`,
  },
})

const validateProfile = () => {
  const session = loadLocalStorage('user')
  let isValid = false

  if (session != null) {
    isValid = true
  }

  return isValid
}

export class Menu extends Component {
  state = {
    anchorEl: null,
    isLogged: false,
    redirect: false,
  }

  componentDidMount() {
    this.props.dispatch(fetchCategories())
  }

  handleLogOut() {
    logOut()
    this.setState({
      redirect: true,
    })
  }

  handlePopoverOpen = event => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handlePopoverClose = () => {
    this.setState({ anchorEl: null })
  }
  handleCartClick = () => {
    this.props.history.push(`/cart`)
  }
  render() {
    const { classes, categories, cartItems } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    if (this.state.redirect) {
      return <Redirect to="/" />
    }
    let width = window.innerWidth
    return (
      <div>
        <Style.Container_User>
          <Style.LinkBar className={classNames(classes.layout)}>
            <Style.Link to="/">Home</Style.Link>
            <Style.Link to={validateProfile() ? '/profile' : '/login'}>My account</Style.Link>
          </Style.LinkBar>
        </Style.Container_User>
        <Style.ContainerMenu>
          <Style.Container className={classNames(classes.layout)}>
            <Grid container className={classes.centerElements}>
              <Grid item xs={12} sm>
                <MediaQuery query="(max-width: 800px)">
                  <CustomeDrawer />
                </MediaQuery>
                <MediaQuery query="(min-width: 801px)">
                  <Link to="/">
                    <Style.ContainerMenuLogo>
                      <Style.Img src={logo} alt="company logo" />
                    </Style.ContainerMenuLogo>
                  </Link>
                </MediaQuery>
              </Grid>
              <Grid item xs={11} sm={6}>
                <Input type="text" name="search" placeholder="Search products..." />
              </Grid>
              <Grid item xs={12} sm className={classes.icon}>
                <IconButton
                  aria-label="Cart"
                  onMouseEnter={this.handlePopoverOpen}
                  onMouseLeave={this.handlePopoverClose}
                  onClick={this.handleCartClick}
                >
                  <Badge
                    badgeContent={!cartItems ? 0 : cartItems}
                    classes={{ badge: classes.badge }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
                <div />
                {loadLocalStorage('user').isLogged ? (
                  <IconButton onClick={() => this.handleLogOut()}>
                    <ExitToAppIcon />
                  </IconButton>
                ) : (
                  <div />
                )}
                <Popover
                  id="mouse-over-popover"
                  className={classes.popover}
                  classes={{
                    paper: classes.paper,
                  }}
                  open={open}
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                  }}
                  onClose={this.handlePopoverClose}
                  disableRestoreFocus
                >
                  <Typography>I use Popover.</Typography>
                </Popover>
              </Grid>
            </Grid>
            <MediaQuery query="(min-width: 800px)">
              <div className={classes.linkMenus}>
                <Grid container>
                  {categories.map(category => {
                    return (
                      <Grid xs={12} item sm key={category.id}>
                        <a key={category.id} href={`/category/${category.id}`}>
                          {category.name}
                        </a>
                      </Grid>
                    )
                  })}
                </Grid>
              </div>
            </MediaQuery>
          </Style.Container>
        </Style.ContainerMenu>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories.categories,
    loading: state.product.loading,
    error: state.product.error,
    cartItems: state.product.cartItems,
  }
}

export default withRouter(connect(mapStateToProps)(withStyles(styles)(Menu)))

const Style = {}

Style.Img = styled.img`
  width: 100%;
  height: 100%;
`

Style.ContainerMenu = styled.div`
  height: auto;
  background-color: ${colors.white};
  -webkit-box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
  box-shadow: 0 2px 6px 0 rgba(69, 73, 91, 0.08);
  border-width: 0 0 1px;
  padding: 1rem 0rem;

  margin-bottom: 0.8rem;
`

Style.Container_User = styled(Style.ContainerMenu)`
  height: 0.7rem;
  border-bottom: 1px solid ${colors.lightGrey};
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 0rem;
`

Style.ContainerMenuLogo = styled.div`
  width: 8rem;
`

Style.Container = styled(Grid)``

Style.LinkBar = styled.div`
  display: flex;
  justify-content: flex-end;
`
Style.Link = styled(Link)`
  margin-left: 1rem;
`
