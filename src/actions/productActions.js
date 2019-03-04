import {
  API_URL,
  saveToCart,
  getTotalCartItems,
  loadLocalStorage,
  modifyShoppingCartLocal,
  updateCartTotals,
} from '../services'

export const INIT_STATE = 'INIT_STATE'
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS'
export const FETCH_PRODUCT_BY_CATEGORY_SUCCESS = 'FETCH_PRODUCT_BY_CATEGORY_SUCCESS'
export const SAVE_TO_SHOPPING_CART_SUCCESS = 'SAVE_TO_SHOPPING_CART_SUCCESS'
export const UPDATE_SHOPPING_CART_SUCCESS = 'UPDATE_SHOPPING_CART_SUCCESS'
export const UPDATE_SHOPPING_CART_TOTALS_SUCCESS = 'UPDATE_SHOPPING_CART_TOTALS_SUCCESS'
export const DELETE_PRODUCT_SHOPPING_CART_SUCCESS = 'DELETE_PRODUCT_SHOPPING_CART_SUCCESS'
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE'
export const FETCH_PRODUCT_BEGIN = 'FETCH_PRODUCT_BEGIN'
export const FETCH_PRODUCT_BY_ID_BEGIN = 'FETCH_PRODUCT_BY_ID_BEGIN'
export const CLEAN_SHOPPING_CART_BEGIN = 'CLEAN_SHOPPING_CART_BEGIN'
export const REDIRECT_TO_SHOPPING_CART = 'REDIRECT_TO_SHOPPING_CART'
export const FETCH_ALL_PRODUCTS = 'FETCH_ALL_PRODUCTS'

export const fetchProductsSuccess = product => ({
  type: FETCH_PRODUCT_SUCCESS,
  payload: { product },
})
export const cleanShoppingCart = shoppingCart => ({
  type: CLEAN_SHOPPING_CART_BEGIN,
  payload: { shoppingCart },
})
export const redirectToShoppingCart = () => ({
  type: REDIRECT_TO_SHOPPING_CART,
})

export const fetchProductsByCategorySuccess = products => ({
  type: FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
  payload: { products },
})
export const fetchAllProductsSuccess = products => ({
  type: FETCH_ALL_PRODUCTS,
  payload: { products },
})

export const saveToShoppingCartSuccess = (product, totalCartItems, cart, cartTotals) => ({
  type: SAVE_TO_SHOPPING_CART_SUCCESS,
  payload: { product },
  totalCartItems,
  cart,
  cartTotals,
})
export const updateShoppingCartSuccess = upadtedShoppingCart => ({
  type: UPDATE_SHOPPING_CART_SUCCESS,
  payload: { upadtedShoppingCart },
})
export const updateShoppingCartTotalsSuccess = cartTotals => ({
  type: UPDATE_SHOPPING_CART_TOTALS_SUCCESS,
  payload: { cartTotals },
})
export const deleteProductShoppingCartSuccess = (
  upadtedShoppingCart,
  totalCartItems,
  cartTotals
) => ({
  type: DELETE_PRODUCT_SHOPPING_CART_SUCCESS,
  payload: { upadtedShoppingCart },
  totalCartItems,
  cartTotals,
})

export const fetchProductsFailure = error => ({
  type: FETCH_PRODUCT_FAILURE,
  payload: { error },
})

export const fetchProductsBegin = () => ({
  type: FETCH_PRODUCT_BEGIN,
})
export const saveToShoppingCartBegin = () => ({
  type: FETCH_PRODUCT_BY_ID_BEGIN,
})

export const fetchProduct = id => {
  return dispatch => {
    dispatch(fetchProductsBegin())
    return fetch(`${API_URL}/products/${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        fetch(`${API_URL}/products/category/${json.category.id}?page=0&size=4`)
          .then(handleErrors)
          .then(res => res.json())
          .then(relatedProducts => {
            const product = {
              product: json,
              relatedProducts,
            }
            dispatch(fetchProductsSuccess(product))
            return json
          })

        return json
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  }
}
//  /products/category/${id}?page=${page}&size=${size}
// /products?page=${page}&size=${size}
export const fetchProductByCategory = (id, page, size) => {
  return dispatch => {
    dispatch(fetchProductsBegin())
    return fetch(`${API_URL}/products/category/${id}?page=${page}&size=${size}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsByCategorySuccess(json))
        return json
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  }
}

export const fetchAllProducts = (page, size) => {
  return dispatch => {
    dispatch(fetchProductsBegin())
    return fetch(`${API_URL}/products?page=${page}&size=${size}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchAllProductsSuccess(json))
        return json
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  }
}

export const saveToShoppingCart = id => {
  return dispatch => {
    dispatch(saveToShoppingCartBegin())
    return fetch(`${API_URL}/products/${id}`)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        const totalCartItems = getTotalCartItems() + 1
        const product = {
          id: json.id,
          image: json.images[0].url,
          name: json.name,
          price: json.price,
          quantity: 1,
          total: json.price,
        }
        saveToCart(product)
        const cart = loadLocalStorage('cart')
        const cartTotals = updateCartTotals(cart) // Update the subtotal and total of the shopping cart
        dispatch(saveToShoppingCartSuccess(product, totalCartItems, cart, cartTotals))
        return json
      })
      .catch(error => dispatch(fetchProductsFailure(error)))
  }
}

export const updateShoppingCart = updatedProduct => {
  const upadtedShoppingCart = modifyShoppingCartLocal(updatedProduct, 'UPDATE')

  return dispatch => {
    return dispatch(updateShoppingCartSuccess(upadtedShoppingCart))
  }
}

export const deleteProductInShoppingCart = productId => {
  const upadtedShoppingCart = modifyShoppingCartLocal(productId, 'DELETE')
  const cartItems = getTotalCartItems()
  const cartTotals = updateCartTotals(upadtedShoppingCart) // Update the subtotal and total of the shopping cart
  return dispatch => {
    return dispatch(deleteProductShoppingCartSuccess(upadtedShoppingCart, cartItems, cartTotals))
  }
}
export const updateShoppingCartTotals = shoppingCartTotals => {
  return dispatch => {
    return dispatch(updateShoppingCartTotalsSuccess(shoppingCartTotals))
  }
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText)
  }
  return response
}
