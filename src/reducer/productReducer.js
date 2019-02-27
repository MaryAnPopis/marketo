import {
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
  SAVE_TO_SHOPPING_CART_SUCCESS,
  FETCH_PRODUCT_BY_ID_BEGIN,
  UPDATE_SHOPPING_CART_SUCCESS,
} from '../actions/productActions'

import { getShoppingCart } from '../services'
const localShoppingCart = getShoppingCart()
const INITIAL_STATE = {
  productDetails: {
    id: 0,
    name: ' ',
    price: 0,
    brand: '',
    description: '',
    additionalInfo: '',
    tags: [],
    category: {
      id: 0,
      name: '',
    },
    images: [],
    specs: [],
    subCategories: [
      {
        id: 0,
        name: ' ',
      },
    ],
  },
  products: [],
  product: {
    image: '',
    name: '',
    price: 0,
    quantity: 1,
    total: 0,
  },
  loading: false,
  error: null,
  addToCartLoading: false,
  shoppingCart: localShoppingCart,
  cartItems: 0,
}

export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_PRODUCT_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      }
    case FETCH_PRODUCT_BY_ID_BEGIN:
      return {
        ...state,
        addToCartLoading: true,
        error: null,
      }

    case FETCH_PRODUCT_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        productDetails: action.payload.product,
      }

    case FETCH_PRODUCT_BY_CATEGORY_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        products: action.payload.products,
      }

    case SAVE_TO_SHOPPING_CART_SUCCESS:
      return {
        ...state,
        addToCartLoading: false,
        product: action.payload.product,
        cartItems: action.totalCartItems,
        shoppingCart: action.cart,
      }
    case UPDATE_SHOPPING_CART_SUCCESS:
      return {
        ...state,
        shoppingCart: action.payload.upadtedShoppingCart,
      }

    case FETCH_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        productDetails: [],
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
