import {
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  FETCH_CATEGORIES_BEGIN,
} from '../actions/categoryActions'

const INITIAL_STATE = {
  categories: [],
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
