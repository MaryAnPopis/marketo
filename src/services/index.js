export const API_URL = 'http://localhost:8080/v1'

export const EMPTY_STATE = {
  featuredProducts: [],
  productsCurrentPage: [],
  productDetails: [{ images: [] }, { specs: [] }, { subCategories: [] }, { category: {} }],
}

export const saveLocalStorage = (state, key = 'state') => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(key, serializedState)
  } catch (err) {
    console.error('save state error on local storagee', err)
  }
}

export const loadLocalStorage = (key = 'state') => {
  try {
    const serializedState = localStorage.getItem(key)
    if (serializedState === null) {
      return { isExist: false }
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return { isExist: false }
  }
}

export const updateCartTotals = shoppingCart => {
  const myCurrentCart = shoppingCart
  const cart = !myCurrentCart ? [] : myCurrentCart
  let initialValue = 0
  let subtotal = 0
  let total = 0
  let shipping = 0
  subtotal = cart.reduce(function(total, currentValue) {
    return total + currentValue.total
  }, initialValue)

  if (subtotal > 500) {
    shipping = 70
  }
  if ((subtotal < 500) & (subtotal > 200)) {
    shipping = 40
  }
  if ((subtotal < 200) & (subtotal > 61)) {
    shipping = 20
  }
  if ((subtotal < 61) & (subtotal > 0)) {
    shipping = 5
  }

  total = subtotal + shipping
  const roundTotal = Math.round(total * 100) / 100
  const shoppingCartTotals = { subtotal: subtotal, total: roundTotal, shipping: shipping }

  return shoppingCartTotals
}

export const getShoppingCart = () => {
  let shoppingCart = []
  const key = 'cart'
  try {
    const cart = JSON.parse(localStorage.getItem(key))
    if (cart === null) {
      shoppingCart = []
    } else {
      shoppingCart = cart
    }
  } catch (err) {
    console.log(err)
  }
  return shoppingCart
}

export const saveToCart = product => {
  const key = 'cart'

  try {
    if (localStorage.getItem(key) === null) {
      let cart = []
      cart.push(product)
      localStorage.setItem(key, JSON.stringify(cart))
    } else {
      let getCart = JSON.parse(localStorage.getItem(key))
      getCart.push(product)
      localStorage.setItem(key, JSON.stringify(getCart))
    }
  } catch (err) {
    console.error('save state error on local storage', err)
  }
}

export const modifyShoppingCartLocal = (updatedProduct, type) => {
  const key = 'cart'
  let updatedShoppingCart = JSON.parse(localStorage.getItem(key))
  try {
    let getCart = JSON.parse(localStorage.getItem(key))
    let foundProduct = getCart.find(item => item.id === updatedProduct.id)
    let index = getCart.indexOf(foundProduct)
    switch (type) {
      case 'DELETE':
        getCart.splice(index, 1)
        break
      case 'UPDATE':
        getCart[index] = updatedProduct
        break
      default:
        getCart = updatedShoppingCart
        break
    }
    localStorage.setItem(key, JSON.stringify(getCart))
    updatedShoppingCart = JSON.parse(localStorage.getItem(key))
  } catch (err) {
    console.error('modify cart locally', err)
  }

  return updatedShoppingCart
}

export const getTotalCartItems = () => {
  let totalCartItems = -1
  const key = 'cart'
  try {
    const cart = JSON.parse(localStorage.getItem(key))
    if (cart === null) {
      totalCartItems = 0
    } else {
      totalCartItems = cart.length
    }
  } catch (err) {
    return { isExist: false }
  }
  return totalCartItems
}

export const post = (path, data) => {
  return fetch(`${API_URL}/${path}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}
export const getByParam = (path, param) => {
  return fetch(`${API_URL}/${path}/${param}`)
    .then(res => {
      return res.json()
    })
    .then(data => {
      return data
    })
    .catch(err => {
      throw err
    })
}
