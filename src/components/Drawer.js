import React, { Component } from 'react'
import { connect } from 'react-redux'

import { withStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import Menu from '@material-ui/icons/MenuOutlined'
import ListItemText from '@material-ui/core/ListItemText'

import logo from '../img/logo.svg'
const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
}

export class CustomeDrawer extends Component {
  state = {
    left: false,
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  render() {
    const { classes, categories } = this.props

    const sideList = (
      <div className={classes.list}>
        <List>
          <img src={logo} alt="logo" />
          {categories.map((category, index) => (
            <ListItem a key={category.id}>
              <ListItemText>
                <a key={category.id} href={`/category/${category.id}`}>
                  {category.name}
                </a>
              </ListItemText>
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    )

    return (
      <div>
        <IconButton onClick={this.toggleDrawer('left', true)}>
          <Menu />
        </IconButton>
        <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </Drawer>
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

export default connect(mapStateToProps)(withStyles(styles)(CustomeDrawer))
