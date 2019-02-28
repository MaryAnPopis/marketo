import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_BEGIN,
  FETCH_SUBCATEGORIES_SUCCESS,
} from '../actions/categoryActions'

const INITIAL_STATE = {
  categories: [],
  subCategories: [],
  loading: false,
  error: null,
}

export default function product(state = INITIAL_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      }

    case FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        categories: action.payload.categories,
      }

    case FETCH_SUBCATEGORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        subCategories: action.payload.subCategories,
      }

    case FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        categories: [],
      }

    default:
      // ALWAYS have a default case in a reducer
      return state
  }
}
