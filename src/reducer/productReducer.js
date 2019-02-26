import {
  FETCH_PRODUCT_BEGIN,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAILURE,
  FETCH_PRODUCT_BY_CATEGORY_SUCCESS,
} from '../actions/productActions'

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
  loading: false,
  error: null,
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
